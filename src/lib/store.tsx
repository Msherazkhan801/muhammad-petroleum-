'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Tank, Dispenser, PurchaseInvoice, SaleInvoice, Transaction, 
  CarriageVoucher, AccountLedger, AdminUser, Reminder, StickyNote, FuelType 
} from './types';
import { 
  INITIAL_TANKS, INITIAL_DISPENSERS, INITIAL_ACCOUNTS, 
  INITIAL_PURCHASES, INITIAL_SALES, INITIAL_TRANSACTIONS, 
  INITIAL_CARRIAGES, INITIAL_ADMINS, INITIAL_REMINDERS, INITIAL_STICKY_NOTE 
} from './initialData';
import { db, isFirebaseConfigured } from './firebase';
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';

interface AppContextType {
  tanks: Tank[];
  dispensers: Dispenser[];
  accounts: AccountLedger[];
  purchases: PurchaseInvoice[];
  sales: SaleInvoice[];
  transactions: Transaction[];
  carriages: CarriageVoucher[];
  admins: AdminUser[];
  reminders: Reminder[];
  stickyNote: StickyNote;
  
  // Totals & Analytics
  totalSalesLtr: number;
  totalSalesAmount: number;
  totalPurchasesLtr: number;
  totalPurchasesAmount: number;
  totalCreditAmount: number;
  totalDebitAmount: number;
  
  // Actions
  addPurchase: (purchase: Omit<PurchaseInvoice, 'id' | 'invoiceNo'>) => void;
  addSale: (sale: Omit<SaleInvoice, 'id' | 'invoiceNo'>) => void;
  addTransaction: (tx: Omit<Transaction, 'id' | 'voucherNo'>) => void;
  addCarriage: (cv: Omit<CarriageVoucher, 'id' | 'voucherNo'>) => void;
  updateCarriageStatus: (id: string, status: CarriageVoucher['status']) => void;
  updateStickyNote: (content: string) => void;
  toggleAdminBlock: (id: string) => void;
  addReminder: (reminder: Omit<Reminder, 'id' | 'completed'>) => void;
  toggleReminder: (id: string) => void;
  deleteReminder: (id: string) => void;
  updateTankDip: (tankId: string, currentLtr: number, dipLevelMm: number) => void;
  updateFuelPrice: (fuelType: FuelType, newPrice: number) => void;
  
  // Modals controller
  activeModal: string | null;
  openModal: (modalName: string, modalProps?: any) => void;
  closeModal: () => void;
  modalProps: any;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [tanks, setTanks] = useState<Tank[]>(INITIAL_TANKS);
  const [dispensers, setDispensers] = useState<Dispenser[]>(INITIAL_DISPENSERS);
  const [accounts, setAccounts] = useState<AccountLedger[]>(INITIAL_ACCOUNTS);
  const [purchases, setPurchases] = useState<PurchaseInvoice[]>(INITIAL_PURCHASES);
  const [sales, setSales] = useState<SaleInvoice[]>(INITIAL_SALES);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [carriages, setCarriages] = useState<CarriageVoucher[]>(INITIAL_CARRIAGES);
  const [admins, setAdmins] = useState<AdminUser[]>(INITIAL_ADMINS);
  const [reminders, setReminders] = useState<Reminder[]>(INITIAL_REMINDERS);
  const [stickyNote, setStickyNote] = useState<StickyNote>(INITIAL_STICKY_NOTE);
  
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalProps, setModalProps] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from LocalStorage if available
  useEffect(() => {
    try {
      const savedPurchases = localStorage.getItem('petrol_purchases');
      if (savedPurchases) setPurchases(JSON.parse(savedPurchases));
      
      const savedSales = localStorage.getItem('petrol_sales');
      if (savedSales) setSales(JSON.parse(savedSales));
      
      const savedTransactions = localStorage.getItem('petrol_transactions');
      if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
      
      const savedCarriages = localStorage.getItem('petrol_carriages');
      if (savedCarriages) setCarriages(JSON.parse(savedCarriages));
      
      const savedNote = localStorage.getItem('petrol_sticky_note');
      if (savedNote) setStickyNote(JSON.parse(savedNote));
      
      const savedReminders = localStorage.getItem('petrol_reminders');
      if (savedReminders) setReminders(JSON.parse(savedReminders));

      const savedAdmins = localStorage.getItem('petrol_admins');
      if (savedAdmins) setAdmins(JSON.parse(savedAdmins));

      const savedTanks = localStorage.getItem('petrol_tanks');
      if (savedTanks) setTanks(JSON.parse(savedTanks));
    } catch (e) {
      console.warn("Could not read from localStorage", e);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const openModal = (modalName: string, props: any = null) => {
    setActiveModal(modalName);
    setModalProps(props);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalProps(null);
  };

  // Calculated KPI Totals
  const totalSalesLtr = sales.reduce((acc, curr) => acc + curr.quantityLtr, 68000);
  const totalSalesAmount = sales.reduce((acc, curr) => acc + curr.netAmount, 26302450);

  const totalPurchasesLtr = purchases.reduce((acc, curr) => acc + curr.grossLtr, 88000);
  const totalPurchasesAmount = purchases.reduce((acc, curr) => acc + curr.totalAmount, 33726610);

  const totalCreditAmount = transactions.filter(t => t.type === 'Credit').reduce((acc, curr) => acc + curr.amount, 53258002);
  const totalDebitAmount = transactions.filter(t => t.type === 'Debit').reduce((acc, curr) => acc + curr.amount, 55658693);

  // Add Purchase
  const addPurchase = (item: Omit<PurchaseInvoice, 'id' | 'invoiceNo'>) => {
    const newInvoiceNo = `PUR-2026-${String(purchases.length + 894).padStart(4, '0')}`;
    const newPurchase: PurchaseInvoice = {
      ...item,
      id: `pur-${Date.now()}`,
      invoiceNo: newInvoiceNo
    };

    const updated = [newPurchase, ...purchases];
    setPurchases(updated);
    try {
      localStorage.setItem('petrol_purchases', JSON.stringify(updated));
    } catch (e) {}

    // Update tank stock
    setTanks(prev => prev.map(t => {
      if (t.id === item.tankId) {
        const newLtr = Math.min(t.capacityLtr, t.currentLtr + item.receivedDipLtr);
        return { ...t, currentLtr: newLtr, lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' ') };
      }
      return t;
    }));

    showToast(`Purchase Invoice ${newInvoiceNo} generated successfully!`);
    closeModal();
  };

  // Add Sale
  const addSale = (item: Omit<SaleInvoice, 'id' | 'invoiceNo'>) => {
    const newInvoiceNo = `SAL-2026-${String(sales.length + 1047).padStart(4, '0')}`;
    const newSale: SaleInvoice = {
      ...item,
      id: `sal-${Date.now()}`,
      invoiceNo: newInvoiceNo
    };

    const updated = [newSale, ...sales];
    setSales(updated);
    try {
      localStorage.setItem('petrol_sales', JSON.stringify(updated));
    } catch (e) {}

    // Update dispenser meter reading and tank stock
    setDispensers(prev => prev.map(d => {
      if (d.id === item.dispenserId) {
        return { ...d, currentMeterReading: item.endMeter };
      }
      return d;
    }));

    // Deduct from tank
    const targetDisp = dispensers.find(d => d.id === item.dispenserId);
    if (targetDisp) {
      setTanks(prev => prev.map(t => {
        if (t.id === targetDisp.tankId) {
          const newLtr = Math.max(0, t.currentLtr - item.quantityLtr);
          return { ...t, currentLtr: newLtr, lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' ') };
        }
        return t;
      }));
    }

    // If credit customer, update account balance
    if (item.accountId && item.paymentMode === 'Credit') {
      setAccounts(prev => prev.map(acc => {
        if (acc.id === item.accountId) {
          return {
            ...acc,
            totalSale: acc.totalSale + item.netAmount,
            closingBalance: acc.closingBalance + item.netAmount
          };
        }
        return acc;
      }));
    }

    showToast(`Sale Invoice ${newInvoiceNo} recorded successfully!`);
    closeModal();
  };

  // Add Transaction
  const addTransaction = (item: Omit<Transaction, 'id' | 'voucherNo'>) => {
    const newVoucherNo = `VR-2026-${String(transactions.length + 505).padStart(4, '0')}`;
    const newTx: Transaction = {
      ...item,
      id: `tx-${Date.now()}`,
      voucherNo: newVoucherNo
    };

    const updated = [newTx, ...transactions];
    setTransactions(updated);
    try {
      localStorage.setItem('petrol_transactions', JSON.stringify(updated));
    } catch (e) {}

    // Update account balances
    setAccounts(prev => prev.map(acc => {
      if (acc.id === item.accountId) {
        if (item.type === 'Credit') {
          return {
            ...acc,
            totalRecovery: acc.totalRecovery + item.amount,
            closingBalance: acc.closingBalance - item.amount
          };
        } else {
          return {
            ...acc,
            totalPayments: acc.totalPayments + item.amount,
            closingBalance: acc.closingBalance + item.amount
          };
        }
      }
      return acc;
    }));

    showToast(`Transaction ${newVoucherNo} logged successfully!`);
    closeModal();
  };

  // Add Carriage
  const addCarriage = (item: Omit<CarriageVoucher, 'id' | 'voucherNo'>) => {
    const newVoucherNo = `CV-2026-${String(carriages.length + 213).padStart(4, '0')}`;
    const newCV: CarriageVoucher = {
      ...item,
      id: `cv-${Date.now()}`,
      voucherNo: newVoucherNo
    };

    const updated = [newCV, ...carriages];
    setCarriages(updated);
    try {
      localStorage.setItem('petrol_carriages', JSON.stringify(updated));
    } catch (e) {}

    showToast(`Carriage Voucher ${newVoucherNo} registered!`);
    closeModal();
  };

  const updateCarriageStatus = (id: string, status: CarriageVoucher['status']) => {
    setCarriages(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    showToast(`Carriage status updated to ${status}`);
  };

  // Sticky Note
  const updateStickyNote = (content: string) => {
    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const updated: StickyNote = {
      id: 'note-1',
      content,
      lastModified: formatted
    };
    setStickyNote(updated);
    try {
      localStorage.setItem('petrol_sticky_note', JSON.stringify(updated));
    } catch (e) {}
    showToast("Sticky Notes saved successfully!");
  };

  // Admin block toggle
  const toggleAdminBlock = (id: string) => {
    setAdmins(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, isBlocked: !a.isBlocked } : a);
      try {
        localStorage.setItem('petrol_admins', JSON.stringify(updated));
      } catch (e) {}
      const target = updated.find(a => a.id === id);
      showToast(`${target?.name} is now ${target?.isBlocked ? 'BLOCKED' : 'UNBLOCKED'}`);
      return updated;
    });
  };

  // Reminders
  const addReminder = (item: Omit<Reminder, 'id' | 'completed'>) => {
    const newRem: Reminder = {
      ...item,
      id: `rem-${Date.now()}`,
      completed: false
    };
    const updated = [...reminders, newRem];
    setReminders(updated);
    try {
      localStorage.setItem('petrol_reminders', JSON.stringify(updated));
    } catch (e) {}
    showToast("Reminder added!");
  };

  const toggleReminder = (id: string) => {
    const updated = reminders.map(r => r.id === id ? { ...r, completed: !r.completed } : r);
    setReminders(updated);
    try {
      localStorage.setItem('petrol_reminders', JSON.stringify(updated));
    } catch (e) {}
  };

  const deleteReminder = (id: string) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    try {
      localStorage.setItem('petrol_reminders', JSON.stringify(updated));
    } catch (e) {}
    showToast("Reminder removed");
  };

  // Tank dip update
  const updateTankDip = (tankId: string, currentLtr: number, dipLevelMm: number) => {
    setTanks(prev => {
      const updated = prev.map(t => t.id === tankId ? {
        ...t,
        currentLtr,
        dipLevelMm,
        lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' ')
      } : t);
      try {
        localStorage.setItem('petrol_tanks', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    showToast("Tank Dip measurement calibrated!");
  };

  // Fuel price update
  const updateFuelPrice = (fuelType: FuelType, newPrice: number) => {
    setDispensers(prev => prev.map(d => d.fuelType === fuelType ? { ...d, unitPrice: newPrice } : d));
    showToast(`Price updated for ${fuelType}: PKR ${newPrice.toFixed(2)}/L`);
  };

  return (
    <AppContext.Provider
      value={{
        tanks,
        dispensers,
        accounts,
        purchases,
        sales,
        transactions,
        carriages,
        admins,
        reminders,
        stickyNote,
        totalSalesLtr,
        totalSalesAmount,
        totalPurchasesLtr,
        totalPurchasesAmount,
        totalCreditAmount,
        totalDebitAmount,
        addPurchase,
        addSale,
        addTransaction,
        addCarriage,
        updateCarriageStatus,
        updateStickyNote,
        toggleAdminBlock,
        addReminder,
        toggleReminder,
        deleteReminder,
        updateTankDip,
        updateFuelPrice,
        activeModal,
        openModal,
        closeModal,
        modalProps,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
