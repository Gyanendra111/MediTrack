import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Placeholder for Firebase Admin SDK initialization
// The user will need to provide a serviceAccountKey.json file
// and point to it via FIREBASE_SERVICE_ACCOUNT env variable.

let db;

try {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : null;

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin initialized successfully');
  } else {
    console.warn('Firebase Service Account not found. Running with limited functionality.');
    // Initialize with dummy if needed for dev or wait for user
  }
} catch (error) {
  console.error('Error initializing Firebase Admin:', error.message);
}

db = admin.apps.length ? admin.firestore() : null;

export { admin, db };
