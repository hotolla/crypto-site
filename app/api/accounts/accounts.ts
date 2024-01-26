'use client';

import { AxiosRequestConfig } from 'axios';
import api from "@/app/api/api";

export const chargeAccount = (account: any, token: any, config?: AxiosRequestConfig) => {
  const authConfig = {
    ...config,
    headers: {
      ...config?.headers,
      'Authorization': `Bearer ${token}`
    }
  };

  console.log(authConfig.headers.Authorization)
  return api.post('/accounts', account, authConfig)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};
