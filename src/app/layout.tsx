import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/store';
import Header from '@/components/layout/Header';
import ModalContainer from '@/components/modals/ModalContainer';
import Toast from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: 'Muhammad Petroleum Management System | ERP & Logistics Automation',
  description: 'Complete petroleum station ERP system with real-time fuel inventory, decanting dip calibration, carriage haulage tracking, and double-entry accounting.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#07101e] text-slate-100 antialiased flex flex-col font-sans">
        <AppProvider>
          <Header />
          <main className="flex-1 max-w-[1720px] w-full mx-auto p-4 sm:p-6">
            {children}
          </main>
          <ModalContainer />
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}
