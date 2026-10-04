export type FuelType = 'Petrol Super' | 'High Speed Diesel (HSD)' | 'Hi-Octane (HOBC)' | 'Kerosene Oil' | 'CNG';

export interface Tank {
  id: string;
  name: string;
  fuelType: FuelType;
  capacityLtr: number;
  currentLtr: number;
  dipLevelMm: number;
  maxDipMm: number;
  waterDipMm: number;
  temperatureC: number;
  lastUpdated: string;
}

export interface Dispenser {
  id: string;
  name: string;
  tankId: string;
  fuelType: FuelType;
  currentMeterReading: number;
  unitPrice: number;
}

export interface PurchaseInvoice {
  id: string;
  invoiceNo: string;
  date: string;
  supplier: string; // e.g. PSO, Shell, Attock Petroleum, Total Parco
  tankId: string;
  fuelType: FuelType;
  vehicleNo: string; // Tanker Bowser No e.g. TLA-9921
  driverName: string;
  driverPhone?: string;
  grossLtr: number;
  invoiceRate: number; // PKR per LTR
  totalAmount: number; // PKR
  freightRatePerLtr: number;
  freightDeduction: number;
  netPayable: number;
  receivedDipLtr: number;
  shortageLtr: number;
  status: 'Received' | 'Pending' | 'In-Transit' | 'Cancelled';
  paymentStatus: 'Paid' | 'Partial' | 'Unpaid';
  remarks?: string;
}

export interface SaleInvoice {
  id: string;
  invoiceNo: string;
  date: string;
  time: string;
  customerName: string; // Account or Cash Customer
  accountId?: string;
  dispenserId: string;
  fuelType: FuelType;
  startMeter: number;
  endMeter: number;
  quantityLtr: number;
  unitRate: number;
  totalAmount: number;
  discountAmount?: number;
  netAmount: number;
  paymentMode: 'Cash' | 'Credit' | 'Bank Transfer' | 'POS Card';
  shift: 'Morning' | 'Evening' | 'Night';
  inchargeName: string;
}

export interface Transaction {
  id: string;
  voucherNo: string;
  date: string;
  type: 'Credit' | 'Debit';
  category: 'Recovery' | 'Payment' | 'Expense' | 'Transfer' | 'Carriage' | 'Salary';
  accountId: string;
  accountName: string;
  amount: number;
  paymentMethod: 'Cash' | 'Bank Online' | 'Cheque' | 'PayOrder';
  referenceNo?: string;
  description: string;
}

export interface CarriageVoucher {
  id: string;
  voucherNo: string;
  date: string;
  vehicleNo: string;
  driverName: string;
  sourceDepot: string; // e.g. Keamari Karachi, Machike Lahore, Taru Jabba
  destinationStation: string;
  fuelType: FuelType;
  loadedQtyLtr: number;
  deliveredQtyLtr: number;
  shortageLtr: number;
  freightRate: number;
  grossFreight: number;
  shortagePenalty: number;
  driverAdvance: number;
  tollAndOtherExpense: number;
  netFreightPayable: number;
  status: 'Pending' | 'Approved' | 'Paid' | 'Disputed';
}

export interface AccountLedger {
  id: string;
  accountCode: string;
  accountName: string;
  accountType: 'Customer' | 'Supplier' | 'Bank' | 'Expense' | 'Carriage Contractor' | 'Capital';
  phone?: string;
  address?: string;
  openingBalance: number;
  totalPurchase: number;
  totalSale: number;
  totalRecovery: number;
  totalPayments: number;
  closingBalance: number; // positive = receivable / debit, negative = payable / credit
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Manager' | 'Accountant' | 'Shift Incharge';
  isBlocked: boolean;
  lastActive: string;
  avatarUrl?: string;
}

export interface Reminder {
  id: string;
  title: string;
  date: string;
  category: 'Payment Due' | 'Tanker Arrival' | 'Inspection' | 'Tax Filing' | 'Stock Low';
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

export interface StickyNote {
  id: string;
  content: string;
  lastModified: string;
  color?: string;
}
