import { useContext } from 'react';
import { AuthContext } from '@/app/components/AuthProvider/AuthProvider';

export const useAuth = () => {
  return useContext(AuthContext);
};
