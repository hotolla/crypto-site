import { ICurrencyCode } from '@/app/components/currencies/types';
import axios, { AxiosRequestConfig } from 'axios';

export const fetchExchangeRates = (config?: AxiosRequestConfig) => {
  return axios.get(
    `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.NEXT_PUBLIC_FREE_CURRENCY_API_KEY}`,
    config
  ).then(({ data }) => {
    return data;
  });
};

// export const fetchExchangeRates = (config?: AxiosRequestConfig) => {
//   return axios.get(
//   `https://api.freecurrencyapi.com/v1/latest?apikey=u4fOT74Ev0O5E3p2LGKWNQF5cy6CTnKykEG4QaZR&currencies=EUR`,
//   config).then(({ data}) => {
//   return data;
//   })
// };


// export const fetchExchangeRates = () => {
//   return fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=u4fOT74Ev0O5E3p2LGKWNQF5cy6CTnKykEG4QaZR`)
//     .then((response) => response.json());
// };

// export const fetchExchangeRates = (config?: AxiosRequestConfig) => {
//   return fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=u4fOT74Ev0O5E3p2LGKWNQF5cy6CTnKykEG4QaZR&`
//     + new URLSearchParams(config?.params)
//     ).then((response) => response.json());
// };