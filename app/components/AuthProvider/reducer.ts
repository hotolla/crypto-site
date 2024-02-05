import { IAuthState, initialState } from './initialState';
import { Types } from './types';
import { ILoginPayload } from '@/app/components/AuthProvider/AuthProvider';

export type Action =
  | { type: Types.Login; payload: ILoginPayload }
  | { type: Types.Logout }

export const reducer = (state: IAuthState, action: Action) => {
  switch (action.type) {
    case Types.Login:
      return {
        ...state,
        ...action.payload,

        isAuthenticated: true
      };

    case Types.Logout:
      return initialState;

    default:
      return state;
  }
};
