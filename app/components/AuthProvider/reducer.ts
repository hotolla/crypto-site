import { IUser } from '@/app/modules/users';
import { IAuthState, initialState } from './initialState';
import { Types } from './types';

export type Action =
  | { type: Types.Login; payload: IUser }
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
