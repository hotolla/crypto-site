'use client'

import React, {PropsWithChildren, useContext} from 'react';
import { AuthContext } from "@/app/components/AuthProvider";
import { useRouter } from 'next/navigation';

export const PrivateRoute = ({ children } : PropsWithChildren) => {
  const { isAuthenticated} = useContext(AuthContext);
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/login');

    return null;
  }

  return children;
};
