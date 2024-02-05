"use client"
import * as React from 'react';
// import { PrivateRoute } from '@/modules/auth';
import { CurrenciesProvider } from '@/components/currencies/CurrenciesProvider';
import { Currencies } from '@/components/currencies/Currencies';

export default function Markets() {
  return (
    // <PrivateRoute>
      <CurrenciesProvider>
        <Currencies />
      </CurrenciesProvider>
    // </PrivateRoute>
  );
};
