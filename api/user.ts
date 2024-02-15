import axios, { AxiosRequestConfig } from 'axios';
import { IUser } from '@/modules/users';

export const fetchUser = (id: IUser['id'], config?: AxiosRequestConfig) => {
  return axios.get(`/user/${id}`, config).then(({ data }) => {
    return data;
  });
};

