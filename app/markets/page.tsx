"use client"
// import { PrivateRoute } from '../../../../../crypto-exchange/src/modules/auth';
import * as React from 'react';
import { PrivateRoute } from "@/app/modules/auth";
import { CurrenciesProvider } from "@/app/components/currencies/CurrenciesProvider";
import { Currencies } from "@/app/components/currencies/Currencies";

export default function Markets() {
  return (
    // <PrivateRoute>
      <CurrenciesProvider>
        <Currencies />
      </CurrenciesProvider>
    // </PrivateRoute>
  );
};
