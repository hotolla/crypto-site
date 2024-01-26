import { AxiosRequestConfig } from 'axios';
import { api } from '@/app/api/api';

export interface IUserProfileData {
  name?: string | null,
  email?: string | null,
  password?: string | null,
  balance: number | null,
  purchasedCurrency: string | null,
  soldCurrency: string | null
}

export const updateUserProfile = (user: IUserProfileData, config?: AxiosRequestConfig) => {
  return api.post('/userProfile', user, config).then(({ data }) => {
    return data;
  }).catch((data) => {
    throw data;
  });
};