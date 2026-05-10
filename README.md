# Resham Printers Billing

BUSY-inspired billing and GST website for Resham Printers.

## What works now

- Create GST invoices, simple bills, and estimates.
- Busy-style party/customer masters and item/service masters.
- Add printing services/items with HSN/SAC, unit, GST %, discounts, received amount, and pending amount.
- BUSY-style sales voucher entry with GSTIN-based tax handling, tax-inclusive/exclusive pricing, print/PDF, WhatsApp, and email actions.
- Resham Printers bill format matching the supplied sample PDF: original/duplicate copy, billed/shipped blocks, dispatch references, item discount columns, GST summary, bank details, and terms.
- Separate E-Way Bill field with a Rs. 50,000 value warning instead of mixing E-Way details into every normal bill.
- CRM leads, follow-ups, employee role records, notifications, and analytics insights.
- Browser AI desk with OCR/voice workflows ready for cloud AI integration.
- Print a clean A4 bill from the browser.
- See pending customer dues, GST summaries, method-wise billing reports, and billing CSV export.
- Export/import JSON backups.
- Run the included backend server for online-style API storage at `/api/state`.

## How to open

Open `index.html` in a browser.

For backend storage on the same computer:

```sh
npm start
```

Then open `http://localhost:3000`.

## Online storage

The app still keeps a browser backup so it works immediately.
When served by `server.js`, it also syncs data through the `/api/state` backend and stores it in `data/store.json`.
For multi-device hosted use, deploy the same backend to a Node-capable host or provide Firebase/Supabase details.

For free public hosting of this static version, GitHub Pages is the best first option after the
files are pushed to a GitHub repository.

## Files

- `index.html` - app structure
- `styles.css` - responsive design and print layout
- `app.js` - billing, GST reports, backup, and backend-sync logic
- `server.js` - static web server and JSON API backend
- `package.json` - backend start/check scripts
- `ARCHITECTURE.md` - implementation notes and cloud upgrade path
