# MediTrack2 Manual Fill Report

This report lists all places where you should fill real credentials, API URLs, or business rules. The current code is intentionally wired with UI-ready placeholders so you can complete integrations later.

## 1. Core Auth and Database
- File: src/firebase.js
- What to fill: firebaseConfig object
- Required values: apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId
- Source: Firebase Console -> Project Settings -> Your apps -> Web SDK config

## 2. OCR and Smart Categorization
- File: src/components/ScanFlow.jsx
- What exists now: local OCR via Tesseract with multiple expiry patterns (Up to, Valid till, Best before, Expiry, Exp)
- What to fill for AI categorization: API endpoint and model key in scan handler after OCR text extraction
- Suggested placeholder comment location: below scannedData creation in scanOCR

## 3. Review Moderation API
- File: src/components/Reviews.jsx
- What to fill: endpoint URL, auth header token, and POST payload for:
  - fetching live reviews
  - moderation queue
  - verified purchase checks

## 4. Notification and Email Reminder API
- File: src/components/Notifications.jsx
- What to fill: backend endpoints for channel settings and reminder jobs
- Reminder defaults currently shown in UI:
  - Medicines: 7 days before expiry
  - Grocery: 2 days before expiry
  - Cosmetics/Other: 3 days before expiry
- Optional user override should be added in backend + profile settings

## 5. Nearby Pharmacy and Hospital APIs
- File: src/components/Nearby.jsx
- What to fill:
  - map/geolocation provider API
  - places search endpoint
  - emergency ward metadata source
  - review aggregation endpoint

## 6. Recommendation Engine API
- File: src/components/Recs.jsx
- What to fill:
  - same-salt substitution endpoint
  - pricing comparison data source
  - confidence score field for recommendation ranking

## 7. Credits, Rewards, and Exchange Settlement
- File: src/components/Credits.jsx
- What to fill:
  - reward ledger endpoint
  - exchange verification endpoint for tie-up stores
  - subscription discount redemption endpoint
- Business rule target already reflected in UI: discount up to 30%

## 8. Future Doctor Ecosystem
- File: src/components/Roadmap.jsx
- What to fill in future implementation:
  - doctor onboarding (document + live photo validation)
  - appointment booking APIs
  - service availability APIs (home visit, slots)

## 9. Backend Scaffold You Should Add Next
- Added folder: backend/
- Added files:
  - backend/src/server.js
  - backend/src/routes/placeholders.js
  - backend/.env.example
- What to do now:
  - create backend/.env from backend/.env.example
  - fill all blank values
  - replace 501 placeholder responses with real service logic
- Required env placeholders:
  - FIREBASE_PROJECT_ID=
  - SMTP_HOST=
  - SMTP_PORT=
  - SMTP_USER=
  - SMTP_PASS=
  - MAPS_API_KEY=
  - RECOMMENDER_API_KEY=
  - PAYMENT_API_KEY=

## 10. Fast Completion Sequence (5-Hour Plan)
1. Hour 1: finalize frontend flow and forms, verify all pages render.
2. Hour 2: configure Firebase auth + Firestore basic collections.
3. Hour 3: add backend endpoints for notifications, reviews, rewards.
4. Hour 4: connect map and recommendation APIs with fallback dummy data.
5. Hour 5: test full user journey, patch blockers, prepare demo script.

## 11. Manual Update Notes
- Keep all secrets out of source files; use environment variables.
- For free-first development, start with dummy endpoints returning static JSON.
- Replace each placeholder incrementally and test after every integration.

