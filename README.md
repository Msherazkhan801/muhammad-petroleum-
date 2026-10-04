# Muhammad Petroleum Management System (ERP & Logistics)

A modern, full-stack Next.js and Firebase ERP system engineered for retail petrol stations, fleet logistics, underground tank farm dip sensors, Bowser haulage tracking, and double-entry ledger accounting.

![Muhammad Petroleum Dashboard](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Firebase Firestore](https://img.shields.io/badge/Firebase-11.3-FFCA28?style=for-the-badge&logo=firebase)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)

---

## 🌟 Key Features

### 1. 📊 Executive Dashboard & Real-Time KPIs
- **Live Metric Cards**:
  - **S (Sales)**: Litres (LTR) & Amount (PKR) with trend badges and quick sale recording.
  - **P (Purchases)**: Litres (LTR) & Amount (PKR) with depot decanting entry triggers.
  - **T (Transactions)**: Credit & Debit ledger balance tracking.
  - **Tank Farm Stock**: Aggregate underground tank fill percentage with live gauge.
- **Purchase & Sale Analytics**: Dynamic 31-day throughput chart with LTR/PKR toggle and Bar/Area view.
- **Account Details Quick-Lookup**: Rapid ledger balance inspection with the `GO!` button.
- **Interactive Sticky Notes**: Shift handover operational diary with formatting tools and auto-save.
- **Admin & Shift Incharge Manager**: Role management with instant block/unblock toggles.
- **Reminder Management**: Scheduled task calendar with tanker arrival notifications and tax filing alerts.

### 2. 🛢️ Live Tank Farm & Ultrasonic Dip Calibration
- Visual 3D cylindrical storage tanks for **Super Petrol (92 RON)**, **High Speed Diesel (HSD)**, and **Hi-Octane (HOBC)**.
- Real-time animated liquid wave levels.
- Telemetry sensors: Physical Dip Height (mm), Water Bottom Dip (mm), Operating Temperature (°C), and Fill Percentage.
- Modal calibration utility for converting physical dip tape readings (mm) to calibrated volume (LTR).

### 3. 🧾 Invoices & Billing Management
- **New Purchases**: Decanting entry form with supplier selection (PSO, Shell, Total, Attock), bowser truck number, gross invoice LTR, freight rate deductions, and shortage tracking.
- **New Sales**: Digital nozzle dispenser meter logger (Start/End meter reading calculation), credit customer ledger billing, and walk-in cash slips.
- **Transactions**: Double-entry journal voucher logger for customer recovery, supplier payments, and pump operating expenses.
- **Invoice & Transaction Managers**: Searchable tables with printable receipt slips and filters.

### 4. 🚚 Bowser Freight & Carriage Logistics
- **(CV) Carriage Vouchers**: Haulage vouchers with route tracking (Keamari, Machike, Taru Jabba ➔ Swabi).
- **Shortage Claim Automation**: Difference calculation between depot loaded volume and station delivered volume with driver penalty deductions.
- **Driver Settlements**: Fuel advance, motorway tolls, and net freight payable reconciliations.

### 5. 📑 Comprehensive Reports Suite
- **Supervision & Daily Book (Roznamcha)**: Daily shift cash & bank register.
- **Trial Balance & Chart of Accounts**: Standard financial books.
- **Account Ledger**: Customer & supplier statements with running balance.
- **Stock & Dip Reports**: Tank level summaries and vehicle in-transit stock.
- **Profit & Loss Analysis**: Gross trading margin calculations.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript, React 19)
- **Styling**: Tailwind CSS with custom petrol cyber-industrial theme & Glassmorphism
- **Icons & Visuals**: Lucide React
- **Charts & Graphs**: Recharts
- **Database & Sync**: Firebase Firestore & Auth with offline fallback cache
- **Animation**: CSS wave keyframes & smooth transitions

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Msherazkhan801/muhammad-petroleum-.git
cd muhammad-petroleum-

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3005`) in your browser.

### Building for Production
```bash
npm run build
npm run start
```

---

## 🔒 Firebase Configuration (Optional)
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## 📄 License
Proprietary software for Muhammad Petroleum Service. All rights reserved.
