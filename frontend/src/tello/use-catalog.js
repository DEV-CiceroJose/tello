import { useEffect, useState } from "react";
import {
  collection,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { QUESTIONS } from "./questions";
export function isValidQuestion(q) {
  return (
    q &&
    typeof q.id === "string" &&
    ["enem", "pmpe"].includes(q.track) &&
    typeof q.subject === "string" &&
    typeof q.stem === "string" &&
    Array.isArray(q.options) &&
    q.options.length === 5 &&
    q.options.every((o) => typeof o === "string") &&
    Number.isInteger(q.answer) &&
    q.answer >= 0 &&
    q.answer < 5 &&
    typeof q.explanation === "string" &&
    [1, 2, 3].includes(q.difficulty)
  );
}
export function useCatalog(track, uid) {
  const [remote, setRemote] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    setRemote([]);
    setError(false);
    if (!uid || !isFirebaseConfigured) return;
    const load = async () => {
      const found = [];
      let cursor;
      do {
        const constraints = [where("track", "==", track), orderBy(documentId()), limit(250)];
        if (cursor) constraints.push(startAfter(cursor));
        const snapshot = await getDocs(query(collection(db, "telloQuestions"), ...constraints));
        found.push(
          ...snapshot.docs.map((d) => ({ ...d.data(), id: d.id })).filter(isValidQuestion),
        );
        cursor = snapshot.docs.length === 250 ? snapshot.docs.at(-1) : null;
      } while (cursor && active);
      if (active) setRemote(found);
    };
    load().catch(() => {
      if (active) setError(true);
    });
    return () => {
      active = false;
    };
  }, [track, uid]);
  const merged = new Map(QUESTIONS.filter((q) => q.track === track).map((q) => [q.id, q]));
  remote.forEach((q) => merged.set(q.id, q));
  return { questions: [...merged.values()], catalogError: error };
}
