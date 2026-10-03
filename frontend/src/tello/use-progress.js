import { useCallback, useEffect, useRef, useState } from "react";
import { doc, getDoc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { emptyProgress, normalizeProgress } from "./engine";
const cacheKey = (uid, track) => `tello:v1:${uid || "local"}:${track}`;
export function readCache(storage, key) {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
export function useProgress(uid, track) {
  const [progress, setProgress] = useState(emptyProgress);
  const [status, setStatus] = useState("loading");
  const [ready, setReady] = useState(false);
  const stateRef = useRef(null);
  const queue = useRef(Promise.resolve());
  const generation = useRef(0);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const generationId = ++generation.current;
    let active = true;
    setReady(false);
    setStatus("loading");
    const key = cacheKey(uid, track);
    const cached = readCache(localStorage, key);
    const data = normalizeProgress(cached?.data);
    stateRef.current = {
      data,
      revision: cached?.revision || 0,
      key,
      uid,
      track,
      blocked: false,
      generationId,
    };
    setProgress(data);
    const load = async () => {
      if (!uid) {
        if (active) {
          setReady(true);
          setStatus("local");
        }
        return;
      }
      try {
        const snapshot = await getDoc(doc(db, "users", uid, "telloStates", track));
        if (!active) return;
        let revision = snapshot.data()?.revision || 0;
        let cloud = normalizeProgress(snapshot.data()?.data);
        if (cached?.dirty) {
          if (revision !== (cached.revision || 0)) {
            stateRef.current.blocked = true;
            setStatus("conflict");
            setReady(true);
            return;
          }
          await runTransaction(db, async (transaction) => {
            const ref = doc(db, "users", uid, "telloStates", track);
            const current = await transaction.get(ref);
            if ((current.data()?.revision || 0) !== revision) throw new Error("CONFLICT");
            transaction.set(ref, { data, revision: revision + 1, updatedAt: serverTimestamp() });
          });
          cloud = data;
          revision++;
        }
        if (!active) return;
        stateRef.current = { data: cloud, revision, key, uid, track, blocked: false, generationId };
        setProgress(cloud);
        localStorage.setItem(key, JSON.stringify({ data: cloud, revision, dirty: false }));
        setStatus("synced");
      } catch (error) {
        if (active) {
          stateRef.current.blocked = true;
          setStatus(error.message === "CONFLICT" ? "conflict" : "offline");
        }
      } finally {
        if (active) setReady(true);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [uid, track, retry]);
  const update = useCallback((updater) => {
    const current = stateRef.current;
    if (!current) return;
    const data = typeof updater === "function" ? updater(current.data) : updater;
    if (JSON.stringify(data).length > 750000) {
      setStatus("full");
      return;
    }
    current.data = data;
    setProgress(data);
    try {
      localStorage.setItem(
        current.key,
        JSON.stringify({ data, revision: current.revision, dirty: !!current.uid }),
      );
    } catch {
      setStatus("storage-error");
      return;
    }
    if (!current.uid) {
      setStatus("local");
      return;
    }
    if (current.blocked) return;
    setStatus("saving");
    // Persist every keystroke locally, but batch cloud writes for draft editing.
    clearTimeout(current.saveTimer);
    current.saveTimer = setTimeout(() => {
      queue.current = queue.current
        .catch(() => {})
        .then(async () => {
          if (current.blocked) return;
          const data = current.data;
          try {
            const ref = doc(db, "users", current.uid, "telloStates", current.track);
            await runTransaction(db, async (transaction) => {
              const snapshot = await transaction.get(ref);
              if ((snapshot.data()?.revision || 0) !== current.revision)
                throw new Error("CONFLICT");
              transaction.set(ref, {
                data,
                revision: current.revision + 1,
                updatedAt: serverTimestamp(),
              });
            });
            current.revision++;
            localStorage.setItem(
              current.key,
              JSON.stringify({
                data: current.data,
                revision: current.revision,
                dirty: current.data !== data,
              }),
            );
            if (generation.current === current.generationId && current.data === data)
              setStatus("synced");
          } catch (error) {
            current.blocked = true;
            if (generation.current === current.generationId)
              setStatus(error.message === "CONFLICT" ? "conflict" : "offline");
          }
        });
    }, 700);
  }, []);
  return { progress, update, status, ready, retry: () => setRetry((r) => r + 1) };
}
