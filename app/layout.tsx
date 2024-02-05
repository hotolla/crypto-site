"use client"
import React from 'react';
import Head from 'next/head';
import { MainLayout } from '@/components/MainLayout';
import { AuthProvider } from '@/components/AuthProvider';
import { SessionProviders } from '@/components/SessionProviders';

export default function RootLayout({
   children
 }: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
    <Head>
      <title>Crypto exchange</title>
      <meta name="description" content="The Crypto exchange built with App Router." />
    </Head>
      <body>
        <SessionProviders>
          <AuthProvider>
            <MainLayout>{children}</MainLayout>
          </AuthProvider>
        </SessionProviders>
      </body>
    </html>
  )
}
