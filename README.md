# MediTrack2 - Expiry Intelligence Platform

## Live Modules
- Professional dashboard with workflow-first layout
- OCR scanner with multi-format expiry parsing
- Credits and rewards exchange journey
- Same-salt recommendation section
- Nearby pharmacies and emergency hospitals
- Application review section
- Email and notification center
- Future roadmap section (doctor consult and verification)

## Quick Start
1. Install dependencies: npm install
2. Start development server: npm run dev -- --host
3. Open: http://localhost:3000

## Build and Validate
- Lint: npm run lint
- Production build: npm run build
- Preview build: npm run preview

## Important Manual Setup
- Fill authentication/database config in src/firebase.js
- Follow the complete checklist in MANUAL_FILL_REPORT.md

## OCR Workflow
1. Select category and optional product name.
2. Capture with camera or upload image.
3. Parse expiry from formats such as Up to, Valid till, Best before, Expiry, and Exp.

## Notes
- The UI is production-style and integration-ready.
- API integration placeholders are intentionally left blank for manual setup.
