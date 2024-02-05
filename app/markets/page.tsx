"use client"
import * as React from 'react';
import { PrivateRoute } from '@/app/modules/auth';
import { Currencies } from '@/app/components/currencies/Currencies';
import { CurrenciesProvider } from '@/app/components/currencies/CurrenciesProvider';

export default function Markets() {
  return (
    // <PrivateRoute>
      <CurrenciesProvider>
        <Currencies />
      </CurrenciesProvider>
    // </PrivateRoute>
  );
};
