'use client'

import { PropsWithChildren, createContext, useEffect, useReducer } from 'react';
import { initialState, IAuthState } from './initialState';
import { reducer } from './reducer';
import { Types } from './types';
import { IUser } from '@/modules/users';

export interface ILoginPayload {
  user: IUser,
  token: string | null
}

interface IAuthProviderValues extends IAuthState {
  isAuthenticated: boolean;
  login: (payload: ILoginPayload) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthProviderValues>({
  ...initialState,

  login: () => {},
  logout: () => {}
});

export const localStorageKey = 'auth';

export const AuthProvider = ({ children } : PropsWithChildren) => {
  const [ state, dispatch ] = useReducer(reducer, initialState, () => {
    if (typeof window !== 'undefined') {
      const localStorageData = JSON.parse(localStorage?.getItem(localStorageKey) || '{}');

      return localStorageData || initialState;
    }

    return initialState;
  });

  const login = (payload: ILoginPayload) => {
    dispatch({ type: Types.Login, payload: payload,  });
  };

  const logout = () => {
    dispatch({ type: Types.Logout });
  };

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [ state ]);

  return (
    <AuthContext.Provider
      value={{
        ...state,

        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
