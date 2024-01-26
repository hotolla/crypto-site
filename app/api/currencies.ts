import axios, { AxiosRequestConfig } from 'axios';
import { ICurrency } from '@/app/components/currencies/types';

export const fetchCurrencies = (config?: AxiosRequestConfig) => {
  return axios.get('https://api.coincap.io/v2/assets', config).then(({ data }) => {
    return data;
  });
};

// export const fetchCurrencies = () => {
//   return fetch('https://api.coincap.io/v2/assets')
//   // return fetch(`${process.env.REACT_APP_FREE_CRYPTO_CURRENCY_API_URL}`)
//     .then((response) => response.json());
// };

export const fetchCurrency = (id: ICurrency['id'], cofig?: AxiosRequestConfig) => {
  return axios.get(`https://api.coincap.io/v2/assets/${id}`, cofig).then(({ data }) => {
    return data;
  });
};

// export const fetchCurrency = (id: ICurrency['id']) => {
//   return fetch(`https://api.coincap.io/v2/assets/${id}`)
//     .then((response) => response.json());
// };

export const fetchCurrencyCandles = (id: ICurrency['id'], config?: AxiosRequestConfig) => {
  return axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=7',config)
    .then(({ data }) => {
      return data;
  });
};

// export const fetchCurrencyCandles = (id: ICurrency['id']) => {
//   return fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=7`)
//     .then((response) => response.json());
// };
