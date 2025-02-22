import { openDB } from 'idb';

// Function to open or create the IndexedDB
export async function openQuizDB() {
  return openDB('QuizDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('attempts')) {
        db.createObjectStore('attempts', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

// Function to save an attempt
export async function saveAttempt(attempt) {
  const db = await openQuizDB();
  await db.add('attempts', attempt);
}

// Function to get all attempts
export async function getAttempts() {
  const db = await openQuizDB();
  return db.getAll('attempts');
}

// Function to delete a specific attempt
export async function deleteAttempt(attemptId) {
  const db = await openQuizDB();
  await db.delete('attempts', attemptId);
}
