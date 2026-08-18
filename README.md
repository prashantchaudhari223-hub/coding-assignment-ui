# Pharmacy Inventory UI (Phase 2 — Angular)

Standalone-component Angular 17 app that consumes the Phase 1 .NET Core API.

## Structure

```
src/app/
├── models/medicine.model.ts               // TS interfaces matching the API DTOs
├── services/medicine.service.ts            // HttpClient wrapper for /api/medicines
├── components/
│   ├── medicine-list/                      // Grid + search + color coding
│   └── medicine-add/                       // Add-medicine form
├── app.component.ts                        // Shell / header
├── app.routes.ts
└── app.config.ts                           // HttpClient + Router providers
```

## Prerequisites

- [Node.js 18+](https://nodejs.org/) and npm
- Phase 1 API running on `http://localhost:5117` (see the backend README)

## Step-by-step: run the UI

1. Unzip the project, then open a terminal in the `pharmacy-inventory-ui` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm start
   ```
4. Open `http://localhost:4200` in your browser. The app calls the API at
   `http://localhost:5117/api` (set in `src/environments/environment.ts`) — make sure
   the API is running first, or you'll see a "could not load medicines" banner.

## What it does

- **Grid**: lists FullName, Brand, Expiry Date, Quantity, Price (Notes intentionally excluded).
- **Color coding**: row is red if the medicine expires in under 30 days, yellow if quantity < 10
  (the API computes `isExpiringSoon` / `isLowStock`, the component just maps them to CSS classes).
- **Search**: debounced (300ms) search box that queries `GET /api/medicines?search=...` across
  name, brand and notes.
- **Add medicine**: reactive form at the top of the page that POSTs to `/api/medicines` and
  refreshes the grid on success.

## Build for production

```bash
npm run build
```
Output goes to `dist/pharmacy-inventory-ui`. Update `src/environments/environment.prod.ts`
if the API is hosted somewhere other than a relative `/api` path.
