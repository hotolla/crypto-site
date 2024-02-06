'use client';

import { AxiosRequestConfig } from 'axios';
import { api } from '@/api';

export const chargeAccount = (account: any, config?: AxiosRequestConfig) => {
  return api.post('/accounts', account)
    .then(({ data }) => {
      console.log(account)

      return data
    })
    .catch((error) => {
      throw error;
    });
};

// export const chargeAccount = (account: any, token: any, config?: AxiosRequestConfig) => {
//   const authConfig = {
//     ...config,
//     headers: {
//       ...config?.headers,
//       'Authorization': `Bearer ${token}`
//     }
//   };

//   return api.post('/accounts', account, authConfig)
//     .then(({ data }) => data)
//     .catch((error) => {
//       throw error;
//     });
// };