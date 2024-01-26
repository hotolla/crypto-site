"use client"
import React from "react";
import Head from "next/head";
import { MainLayout } from "@/app/components/MainLayout";
import { AuthProvider } from '@/app/components/AuthProvider';

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
      <AuthProvider>
        <MainLayout>{children}</MainLayout>
      </AuthProvider>
      </body>
    </html>
  )
}
