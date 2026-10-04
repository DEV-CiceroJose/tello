// Run with Application Default Credentials or GOOGLE_APPLICATION_CREDENTIALS.
// This script never accepts or prints a private credential in the frontend.
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { QUESTIONS } from '../../frontend/src/tello/questions.js';
const projectId = process.env.GOOGLE_CLOUD_PROJECT || 'tello-31768';
const dryRun = process.argv.includes('--dry-run');
if (dryRun) {
 console.log(JSON.stringify({projectId,collection:'telloQuestions',questions:QUESTIONS.length,byTrack:Object.fromEntries([...new Set(QUESTIONS.map(q=>q.track))].map(track=>[track,QUESTIONS.filter(q=>q.track===track).length]))},null,2));
} else {
 initializeApp({credential:applicationDefault(),projectId});
 const db=getFirestore();
 // Stable identifiers make repeated publication idempotent.
 for(let index=0;index<QUESTIONS.length;index+=400){
  const batch=db.batch();
  for(const question of QUESTIONS.slice(index,index+400)) batch.set(db.collection('telloQuestions').doc(question.id),question);
  await batch.commit();
 }
 console.log(`Publicado: ${QUESTIONS.length} questões autorais em ${projectId}/telloQuestions.`);
}
