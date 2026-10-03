import { useEffect, useState } from "react";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
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
    getDocs(query(collection(db, "telloQuestions"), where("track", "==", track), limit(500)))
      .then((snapshot) => {
        if (active)
          setRemote(snapshot.docs.map((d) => ({ ...d.data(), id: d.id })).filter(isValidQuestion));
      })
      .catch(() => {
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
