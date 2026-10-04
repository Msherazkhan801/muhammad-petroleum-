import { Tank, Dispenser, PurchaseInvoice, SaleInvoice, Transaction, CarriageVoucher, AccountLedger, AdminUser, Reminder, StickyNote } from './types';

export const INITIAL_TANKS: Tank[] = [
  {
    id: 'tank-1',
    name: 'Tank 01 - Super Petrol',
    fuelType: 'Petrol Super',
    capacityLtr: 50000,
    currentLtr: 32500,
    dipLevelMm: 1680,
    maxDipMm: 2500,
    waterDipMm: 12,
    temperatureC: 28.5,
    lastUpdated: '2026-10-04 13:30'
  },
  {
    id: 'tank-2',
    name: 'Tank 02 - High Speed Diesel',
    fuelType: 'High Speed Diesel (HSD)',
    capacityLtr: 60000,
    currentLtr: 44200,
    dipLevelMm: 1940,
    maxDipMm: 2600,
    waterDipMm: 8,
    temperatureC: 27.8,
    lastUpdated: '2026-10-04 13:30'
  },
  {
    id: 'tank-3',
    name: 'Tank 03 - Hi-Octane (HOBC)',
    fuelType: 'Hi-Octane (HOBC)',
    capacityLtr: 25000,
    currentLtr: 16800,
    dipLevelMm: 1420,
    maxDipMm: 2100,
    waterDipMm: 0,
    temperatureC: 29.1,
    lastUpdated: '2026-10-04 13:30'
  }
];

export const INITIAL_DISPENSERS: Dispenser[] = [
  { id: 'disp-1', name: 'Dispenser 01 - Bay 1 (Petrol)', tankId: 'tank-1', fuelType: 'Petrol Super', currentMeterReading: 894520.4, unitPrice: 286.50 },
  { id: 'disp-2', name: 'Dispenser 02 - Bay 1 (Diesel)', tankId: 'tank-2', fuelType: 'High Speed Diesel (HSD)', currentMeterReading: 1243100.8, unitPrice: 292.80 },
  { id: 'disp-3', name: 'Dispenser 03 - Bay 2 (Petrol)', tankId: 'tank-1', fuelType: 'Petrol Super', currentMeterReading: 654210.0, unitPrice: 286.50 },
  { id: 'disp-4', name: 'Dispenser 04 - Bay 2 (Hi-Octane)', tankId: 'tank-3', fuelType: 'Hi-Octane (HOBC)', currentMeterReading: 320145.2, unitPrice: 315.00 }
];

export const INITIAL_ACCOUNTS: AccountLedger[] = [
  {
    id: 'acc-1',
    accountCode: 'ACC-1001',
    accountName: 'PSO Terminal Supply Co.',
    accountType: 'Supplier',
    phone: '+92 300 5544111',
    address: 'Machike Bulk Oil Depot, Sheikhupura',
    openingBalance: 12500000,
    totalPurchase: 33726610,
    totalSale: 0,
    totalRecovery: 0,
    totalPayments: 28000000,
    closingBalance: -18226610 // Payable
  },
  {
    id: 'acc-2',
    accountCode: 'ACC-1002',
    accountName: 'Shell Pakistan Ltd',
    accountType: 'Supplier',
    phone: '+92 301 8899222',
    address: 'Taru Jabba Oil Depot, Peshawar',
    openingBalance: 4200000,
    totalPurchase: 14500000,
    totalSale: 0,
    totalRecovery: 0,
    totalPayments: 12000000,
    closingBalance: -6700000
  },
  {
    id: 'acc-3',
    accountCode: 'ACC-2001',
    accountName: 'Buner Mining Transport Fleet',
    accountType: 'Customer',
    phone: '+92 345 9988771',
    address: 'Buner Industrial Area',
    openingBalance: 3500000,
    totalPurchase: 0,
    totalSale: 9800000,
    totalRecovery: 8500000,
    totalPayments: 0,
    closingBalance: 4800000 // Receivable
  },
  {
    id: 'acc-4',
    accountCode: 'ACC-2002',
    accountName: 'Pando Road Construction Works',
    accountType: 'Customer',
    phone: '+92 312 4455667',
    address: 'Swabi Ring Road Site Office',
    openingBalance: 1800000,
    totalPurchase: 0,
    totalSale: 7450000,
    totalRecovery: 6200000,
    totalPayments: 0,
    closingBalance: 3050000
  },
  {
    id: 'acc-5',
    accountCode: 'ACC-2003',
    accountName: 'Swabi Daewoo & Express Coach',
    accountType: 'Customer',
    phone: '+92 333 1122334',
    address: 'General Bus Stand, Swabi',
    openingBalance: 950000,
    totalPurchase: 0,
    totalSale: 9052450,
    totalRecovery: 8800000,
    totalPayments: 0,
    closingBalance: 1202450
  },
  {
    id: 'acc-6',
    accountCode: 'ACC-3001',
    accountName: 'Al-Madina Bowser Freight Carrier',
    accountType: 'Carriage Contractor',
    phone: '+92 300 7711223',
    address: 'Tanker Association GT Road, Nowshera',
    openingBalance: 450000,
    totalPurchase: 0,
    totalSale: 0,
    totalRecovery: 0,
    totalPayments: 1850000,
    closingBalance: -320000
  },
  {
    id: 'acc-7',
    accountCode: 'ACC-4001',
    accountName: 'Meezan Bank - Main Business A/C',
    accountType: 'Bank',
    phone: '0938-221144',
    address: 'Swabi Branch (PK29MEZN0012938475)',
    openingBalance: 8500000,
    totalPurchase: 0,
    totalSale: 0,
    totalRecovery: 24500000,
    totalPayments: 21000000,
    closingBalance: 12000000
  }
];

export const INITIAL_PURCHASES: PurchaseInvoice[] = [
  {
    id: 'pur-1',
    invoiceNo: 'PUR-2026-0891',
    date: '2026-10-01',
    supplier: 'PSO Terminal Supply Co.',
    tankId: 'tank-1',
    fuelType: 'Petrol Super',
    vehicleNo: 'TLX-4089',
    driverName: 'Gulzar Khan',
    driverPhone: '+92 302 4433221',
    grossLtr: 48000,
    invoiceRate: 282.50,
    totalAmount: 13560000,
    freightRatePerLtr: 3.50,
    freightDeduction: 168000,
    netPayable: 13392000,
    receivedDipLtr: 47920,
    shortageLtr: 80,
    status: 'Received',
    paymentStatus: 'Paid',
    remarks: 'Depot invoice matched with decanting dip report.'
  },
  {
    id: 'pur-2',
    invoiceNo: 'PUR-2026-0892',
    date: '2026-10-02',
    supplier: 'PSO Terminal Supply Co.',
    tankId: 'tank-2',
    fuelType: 'High Speed Diesel (HSD)',
    vehicleNo: 'TLZ-8821',
    driverName: 'Noor Muhammad',
    driverPhone: '+92 300 1199882',
    grossLtr: 40000,
    invoiceRate: 288.75,
    totalAmount: 11550000,
    freightRatePerLtr: 3.60,
    freightDeduction: 144000,
    netPayable: 11406000,
    receivedDipLtr: 39950,
    shortageLtr: 50,
    status: 'Received',
    paymentStatus: 'Paid',
    remarks: 'Standard allowable shortage applied.'
  },
  {
    id: 'pur-3',
    invoiceNo: 'PUR-2026-0893',
    date: '2026-10-03',
    supplier: 'Shell Pakistan Ltd',
    tankId: 'tank-3',
    fuelType: 'Hi-Octane (HOBC)',
    vehicleNo: 'PMA-3020',
    driverName: 'Sardar Ali',
    grossLtr: 20000,
    invoiceRate: 310.00,
    totalAmount: 6200000,
    freightRatePerLtr: 4.10,
    freightDeduction: 82000,
    netPayable: 6118000,
    receivedDipLtr: 19980,
    shortageLtr: 20,
    status: 'Received',
    paymentStatus: 'Paid',
    remarks: 'HOBC 97 RON high grade testing passed.'
  }
];

export const INITIAL_SALES: SaleInvoice[] = [
  {
    id: 'sal-1',
    invoiceNo: 'SAL-2026-1044',
    date: '2026-10-01',
    time: '08:00 - 16:00',
    customerName: 'Buner Mining Transport Fleet',
    accountId: 'acc-3',
    dispenserId: 'disp-2',
    fuelType: 'High Speed Diesel (HSD)',
    startMeter: 1235100.8,
    endMeter: 1239100.8,
    quantityLtr: 4000,
    unitRate: 292.80,
    totalAmount: 1171200,
    netAmount: 1171200,
    paymentMode: 'Credit',
    shift: 'Morning',
    inchargeName: 'Tariq Khan'
  },
  {
    id: 'sal-2',
    invoiceNo: 'SAL-2026-1045',
    date: '2026-10-01',
    time: '16:00 - 00:00',
    customerName: 'Retail Walk-in Customers',
    dispenserId: 'disp-1',
    fuelType: 'Petrol Super',
    startMeter: 882520.4,
    endMeter: 890520.4,
    quantityLtr: 8000,
    unitRate: 286.50,
    totalAmount: 2292000,
    netAmount: 2292000,
    paymentMode: 'Cash',
    shift: 'Evening',
    inchargeName: 'Farhan Ullah'
  },
  {
    id: 'sal-3',
    invoiceNo: 'SAL-2026-1046',
    date: '2026-10-02',
    time: '08:00 - 16:00',
    customerName: 'Swabi Daewoo & Express Coach',
    accountId: 'acc-5',
    dispenserId: 'disp-2',
    fuelType: 'High Speed Diesel (HSD)',
    startMeter: 1239100.8,
    endMeter: 1243100.8,
    quantityLtr: 4000,
    unitRate: 292.80,
    totalAmount: 1171200,
    netAmount: 1171200,
    paymentMode: 'Credit',
    shift: 'Morning',
    inchargeName: 'Tariq Khan'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    voucherNo: 'VR-2026-0501',
    date: '2026-10-01',
    type: 'Credit',
    category: 'Recovery',
    accountId: 'acc-3',
    accountName: 'Buner Mining Transport Fleet',
    amount: 4500000,
    paymentMethod: 'Bank Online',
    referenceNo: 'TXN-MEZ-99218',
    description: 'Ledger recovery received for September 2026 supply'
  },
  {
    id: 'tx-2',
    voucherNo: 'VR-2026-0502',
    date: '2026-10-02',
    type: 'Debit',
    category: 'Payment',
    accountId: 'acc-1',
    accountName: 'PSO Terminal Supply Co.',
    amount: 14000000,
    paymentMethod: 'PayOrder',
    referenceNo: 'PO-88271-PSO',
    description: 'Advance payorder against fuel loading tanker dispatch'
  },
  {
    id: 'tx-3',
    voucherNo: 'VR-2026-0503',
    date: '2026-10-03',
    type: 'Credit',
    category: 'Recovery',
    accountId: 'acc-4',
    accountName: 'Pando Road Construction Works',
    amount: 3200000,
    paymentMethod: 'Cheque',
    referenceNo: 'CHQ-HBL-44102',
    description: 'Received against diesel bulk sales for highway project'
  },
  {
    id: 'tx-4',
    voucherNo: 'VR-2026-0504',
    date: '2026-10-03',
    type: 'Debit',
    category: 'Carriage',
    accountId: 'acc-6',
    accountName: 'Al-Madina Bowser Freight Carrier',
    amount: 350000,
    paymentMethod: 'Cash',
    referenceNo: 'CV-9912',
    description: 'Bowser haulage freight advance + toll reimbursement'
  }
];

export const INITIAL_CARRIAGES: CarriageVoucher[] = [
  {
    id: 'cv-1',
    voucherNo: 'CV-2026-0210',
    date: '2026-10-01',
    vehicleNo: 'TLX-4089',
    driverName: 'Gulzar Khan',
    sourceDepot: 'Machike Bulk Oil Depot, Sheikhupura',
    destinationStation: 'Muhammad Petroleum Station, Swabi',
    fuelType: 'Petrol Super',
    loadedQtyLtr: 48000,
    deliveredQtyLtr: 47920,
    shortageLtr: 80,
    freightRate: 3.50,
    grossFreight: 168000,
    shortagePenalty: 22600,
    driverAdvance: 50000,
    tollAndOtherExpense: 12000,
    netFreightPayable: 107400,
    status: 'Approved'
  },
  {
    id: 'cv-2',
    voucherNo: 'CV-2026-0211',
    date: '2026-10-02',
    vehicleNo: 'TLZ-8821',
    driverName: 'Noor Muhammad',
    sourceDepot: 'Taru Jabba Oil Depot, Peshawar',
    destinationStation: 'Muhammad Petroleum Station, Swabi',
    fuelType: 'High Speed Diesel (HSD)',
    loadedQtyLtr: 40000,
    deliveredQtyLtr: 39950,
    shortageLtr: 50,
    freightRate: 3.60,
    grossFreight: 144000,
    shortagePenalty: 14437,
    driverAdvance: 40000,
    tollAndOtherExpense: 8000,
    netFreightPayable: 97563,
    status: 'Approved'
  },
  {
    id: 'cv-3',
    voucherNo: 'CV-2026-0212',
    date: '2026-10-04',
    vehicleNo: 'TLA-9921',
    driverName: 'Hamidullah',
    sourceDepot: 'Keamari Terminal, Karachi',
    destinationStation: 'Muhammad Petroleum Station, Swabi',
    fuelType: 'Petrol Super',
    loadedQtyLtr: 50000,
    deliveredQtyLtr: 49910,
    shortageLtr: 90,
    freightRate: 7.20,
    grossFreight: 360000,
    shortagePenalty: 25785,
    driverAdvance: 120000,
    tollAndOtherExpense: 24000,
    netFreightPayable: 238215,
    status: 'Pending'
  }
];

export const INITIAL_ADMINS: AdminUser[] = [
  {
    id: 'adm-1',
    name: 'Admin (Director)',
    email: 'admin@muhammadpetroleum.com',
    role: 'Super Admin',
    isBlocked: false,
    lastActive: 'Active Now'
  },
  {
    id: 'adm-2',
    name: 'Tariq Khan',
    email: 'tariq.incharge@muhammadpetroleum.com',
    role: 'Shift Incharge',
    isBlocked: false,
    lastActive: '10 mins ago'
  },
  {
    id: 'adm-3',
    name: 'Farhan Ullah',
    email: 'farhan.finance@muhammadpetroleum.com',
    role: 'Accountant',
    isBlocked: false,
    lastActive: '1 hour ago'
  },
  {
    id: 'adm-4',
    name: 'Bilal Ahmad',
    email: 'bilal.fleet@muhammadpetroleum.com',
    role: 'Manager',
    isBlocked: false,
    lastActive: 'Yesterday'
  }
];

export const INITIAL_REMINDERS: Reminder[] = [
  {
    id: 'rem-1',
    title: 'PSO Tanker 40,000 Ltr Decanting at 04:00 PM',
    date: '2026-10-04',
    category: 'Tanker Arrival',
    priority: 'High',
    completed: false
  },
  {
    id: 'rem-2',
    title: 'Swabi Daewoo Coach Ledger Recovery Due (PKR 1.2M)',
    date: '2026-10-07',
    category: 'Payment Due',
    priority: 'High',
    completed: false
  },
  {
    id: 'rem-3',
    title: 'OGRA Dip Sensor Calibration & Water Check',
    date: '2026-10-12',
    category: 'Inspection',
    priority: 'Medium',
    completed: false
  },
  {
    id: 'rem-4',
    title: 'Monthly Fuel Sales Tax Filing (PRA / FBR)',
    date: '2026-10-15',
    category: 'Tax Filing',
    priority: 'Medium',
    completed: false
  }
];

export const INITIAL_STICKY_NOTE: StickyNote = {
  id: 'note-1',
  content: `All ledger clear 4 September 2026
Buner and Pando ledger clear 4 Sep
PSO Tanker scheduled dispatch at 04:00 PM from Taru Jabba
Dip calibration completed with OGRA inspector
Check diesel filter separator on Dispenser 02 before evening shift.`,
  lastModified: '03-10-2026 03:06 PM'
};
