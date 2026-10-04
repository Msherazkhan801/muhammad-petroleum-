'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import NewPurchaseModal from './NewPurchaseModal';
import NewSaleModal from './NewSaleModal';
import NewTransactionModal from './NewTransactionModal';
import CarriageVoucherModal from './CarriageVoucherModal';
import ManageInvoicesModal from './ManageInvoicesModal';
import ManageTransactionsModal from './ManageTransactionsModal';
import ReportViewerModal from './ReportViewerModal';
import SettingsModal from './SettingsModal';
import CalibrateDipModal from './CalibrateDipModal';

export default function ModalContainer() {
  const { activeModal } = useApp();

  if (!activeModal) return null;

  switch (activeModal) {
    case 'new_purchase':
      return <NewPurchaseModal />;
    case 'new_sale':
      return <NewSaleModal />;
    case 'new_transaction':
      return <NewTransactionModal />;
    case 'manage_invoices':
      return <ManageInvoicesModal />;
    case 'manage_transactions':
      return <ManageTransactionsModal />;
    case 'carriage_voucher':
    case 'carriage_form':
    case 'list_carriage_vouchers':
    case 'carriages_bills':
    case 'pending_carriages':
    case 'approved_carriages':
    case 'carriages_approval':
    case 'truck_expenses':
    case 'carriages_revenue':
    case 'carriages_trial_balance':
    case 'create_company_bill':
    case 'manage_shortages':
      return <CarriageVoucherModal />;
    case 'settings':
    case 'settings_firebase':
      return <SettingsModal />;
    case 'calibrate_dip':
      return <CalibrateDipModal />;
    default:
      if (activeModal.startsWith('report_')) {
        return <ReportViewerModal />;
      }
      return null;
  }
}
