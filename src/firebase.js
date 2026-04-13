import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebasePlaceholderValues = new Set([
  'your-api-key',
  'your-auth-domain',
  'your-project-id',
  'your-storage-bucket',
  'your-messaging-sender-id',
  'your-app-id',
  'your-measurement-id',
]);

const isPlaceholderValue = (value) => {
  const normalized = value.toLowerCase().replace(/[\s_]+/g, '-');
  const withoutHereSuffix = normalized.replace(/-here$/, '');
  return (
    /^<.+>$/.test(value) ||
    /^(changeme|replace-me|null|undefined)$/.test(normalized) ||
    firebasePlaceholderValues.has(normalized) ||
    firebasePlaceholderValues.has(withoutHereSuffix)
  );
};

const normalizeEnvValue = (value) => {
  if (typeof value !== 'string') return '';
  const normalized = value.trim();
  if (!normalized) return '';
  return isPlaceholderValue(normalized) ? '' : normalized;
};

const measurementId = normalizeEnvValue(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID);

const firebaseConfig = {
  apiKey: normalizeEnvValue(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: normalizeEnvValue(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: normalizeEnvValue(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: normalizeEnvValue(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: normalizeEnvValue(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: normalizeEnvValue(import.meta.env.VITE_FIREBASE_APP_ID),
  ...(measurementId ? { measurementId } : {}),
};

const optionalKeys = new Set(['measurementId']);
const missingFirebaseKeys = Object.entries(firebaseConfig)
  .filter(([key, value]) => !optionalKeys.has(key) && !value)
  .map(([key]) => key);

export const hasFirebaseConfig = missingFirebaseKeys.length === 0;

let app = null;
let auth = null;
let db = null;
let functions = null;

if (hasFirebaseConfig) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  functions = getFunctions(app);
} else {
  console.warn(
    `Firebase config is missing (${missingFirebaseKeys.join(', ')}). Set VITE_FIREBASE_* variables (Vercel: Project Settings -> Environment Variables) and redeploy.`
  );
}

export { app, auth, db, functions };
