# Resham Printers Business Suite Architecture

## Current deployment

This project is a static GitHub Pages app:

- Frontend: `index.html`, `styles.css`, `app.js`
- Persistence: browser `localStorage`
- Assets: local logo image and SVG fallback
- Deployment: GitHub Pages from the `main` branch

Because GitHub Pages only serves static files, the current version does not have a real backend process,
server database, secure authentication, or private API secrets. The UI is built to behave like a premium
BUSY / Zoho Books / Tally-style business suite while staying free to host.

## Implemented modules

- Billing: GST invoice, simple bill, estimate, print/PDF through browser print, WhatsApp and email share links
- Masters: customer/supplier party master and item/service master with HSN/SAC, unit, GST, rate, barcode/SKU
- Inventory: stock in/out/adjustment, valuation, low/negative stock alerts
- POS: scan/search cart, fast checkout, POS invoice creation
- Accounting: money-in/money-out register, ledger, pending payments, monthly reports, CSV export
- CRM: leads, follow-ups, expected value, assigned owner
- Roles: employee role records and active-user selection for UI-level access planning
- Analytics: cashflow, profit/loss, method-wise reports, AI-style insight cards
- Notifications: stock alerts, CRM follow-ups, pending collection reminders
- AI workflows: browser voice command support where available, OCR placeholder ready for a cloud OCR service

## Production upgrade path

For true multi-device use, secure login, employee permissions, API integrations, OCR, email delivery, and WhatsApp
Business sending, add a backend layer:

- Database: Supabase Postgres or Firebase Firestore
- Authentication: Supabase Auth, Firebase Auth, or Clerk
- File storage: Supabase Storage or Firebase Storage
- PDF generation: server function using Playwright/Puppeteer
- Email: Resend, SendGrid, or SMTP
- WhatsApp: Meta WhatsApp Business API
- OCR: Google Vision, Azure OCR, AWS Textract, or Tesseract.js worker
- AI insights: OpenAI API through a server endpoint, never directly from the browser

The frontend state shape in `app.js` is intentionally grouped by business domain so each localStorage collection can
later become a database table or collection without rewriting the whole UI.
