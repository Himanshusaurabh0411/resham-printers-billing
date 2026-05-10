# Resham Printers Business Suite Architecture

## Current deployment

This project can run in two modes:

- Frontend: `index.html`, `styles.css`, `app.js`
- Static mode: browser `localStorage`, suitable for GitHub Pages preview
- Backend mode: `server.js` serves the website and `/api/state`, saving data in `data/store.json`
- Assets: no logo is displayed in the app or print layouts by request
- Deployment: GitHub Pages for static preview, or any Node host for backend storage

Because GitHub Pages only serves static files, the backend works when the app is hosted with Node.
The UI is built as a BUSY-inspired billing desk without copying BUSY's proprietary interface.

## Implemented modules

- Billing: GST invoice, simple bill, estimate, print/PDF through browser print, WhatsApp and email share links
- Masters: customer/supplier party master and item/service master with HSN/SAC, unit, GST, rate, barcode/SKU
- GST voucher entry: GSTIN state detection, intra/inter-state tax display, tax-inclusive/exclusive pricing, saved invoice print layouts
- Backend API: `GET /api/state`, `PUT /api/state`, `POST /api/state`, and `GET /api/health`
- Reports: monthly billing, GST collected, pending dues, payment-wise summaries, CSV export
- CRM: leads, follow-ups, expected value, assigned owner
- Roles: employee role records and active-user selection for UI-level access planning
- Analytics: billing trend, collection priority, GST summary, AI-style insight cards
- Notifications: CRM follow-ups and pending collection reminders
- AI workflows: browser voice command support where available, OCR placeholder ready for a cloud OCR service

## Production upgrade path

For true multi-device hosted use, secure login, employee permissions, API integrations, OCR, email delivery, and WhatsApp
Business sending, connect these services:

- Database: Supabase Postgres or Firebase Firestore
- Authentication: Supabase Auth, Firebase Auth, or Clerk
- File storage: Supabase Storage or Firebase Storage
- PDF generation: server function using Playwright/Puppeteer
- Email: Resend, SendGrid, or SMTP
- WhatsApp: Meta WhatsApp Business API
- OCR: Google Vision, Azure OCR, AWS Textract, or Tesseract.js worker
- AI insights: OpenAI API through a server endpoint, never directly from the browser

The frontend state shape in `app.js` is intentionally grouped by business domain so each collection can later become
a database table or collection without rewriting the whole UI.
