import type { Metadata } from "next";
import "./globals.css";
import Web3Provider from "@/context/Web3Provider";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "DAO Talent Hub V5",
  description: "Contratación Global Riesgo Cero",
};

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="bg-black min-h-screen flex flex-col font-sans antialiased text-gray-200">
        <NextIntlClientProvider messages={messages}>
          <Web3Provider>
            <NavBar />
            <main className="flex-1">{children}</main>
            <Footer />
          </Web3Provider>
        </NextIntlClientProvider>
        <Toaster theme="dark" />
      </body>
    </html>
  );
}
