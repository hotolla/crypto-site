"use client"
import { PrivateRoute } from '../../../../../crypto-exchange/src/modules/auth';
import * as React from 'react';
import { Currencies } from '../../../../../crypto-exchange/src/components/currencies/Currencies';
import { CurrenciesProvider } from '../../../../../crypto-exchange/src/components/currencies/CurrenciesProvider';

export default function Markets() {
  return (
    <PrivateRoute>
      <CurrenciesProvider>
        <Currencies />
      </CurrenciesProvider>
    </PrivateRoute>
  );
};
