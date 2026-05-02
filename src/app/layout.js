"use client";

import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { Sidebar } from "@/components/Sidebar";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  return (
    <html lang="en">
      <body className="bg-linear-to-br from-slate-50 via-slate-100 to-primary-50 text-slate-900 antialiased">
        <ToastProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main key={pathname} className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
