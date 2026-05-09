# Resham Printers Billing

A first working billing and ledger website for Resham Printers.

## What works now

- Create GST invoices, simple bills, and estimates.
- Busy-style party/customer masters and item/service masters.
- Add printing services/items with HSN/SAC, unit, GST %, discounts, received amount, and pending amount.
- Inventory stock entries, valuation, barcode/SKU fields, and low-stock alerts.
- POS counter billing with scan/search cart, checkout bill, print/PDF, WhatsApp, and email actions.
- CRM leads, follow-ups, employee role records, notifications, and analytics insights.
- Browser AI desk with OCR/voice workflows ready for cloud AI integration.
- Print a clean A4 bill from the browser.
- Track money in and money out with payment methods.
- See customer ledger, pending dues, monthly reports, and CSV export.
- Upload the real logo later from Settings.
- Export/import JSON backups.

## How to open

Open `index.html` in a browser.

## Online storage

The app currently saves data in the browser so it works immediately without any server.
For true online shared storage across phones/computers, connect a cloud API endpoint in Settings,
or provide Firebase/Supabase/hosting details and the app can be wired to that database.

For free public hosting of this static version, GitHub Pages is the best first option after the
files are pushed to a GitHub repository.

## Files

- `index.html` - app structure
- `styles.css` - responsive design and print layout
- `app.js` - billing, ledger, reports, backup, and cloud-sync logic
- `assets/resham-logo.jpg` - Resham Printers logo/photo provided by the user
- `ARCHITECTURE.md` - implementation notes and cloud upgrade path
