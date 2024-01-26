import { IUserProfileState } from './initialState';
import { Types } from './types';

export type Action =
  | { type: Types.FetchIUsersProfiles; payload: IUserProfileState[]}

export const reducer = (state: IUserProfileState, { type, payload }: Action) => {
  switch (type) {
    case Types.FetchIUsersProfiles:
      return { ...state, usersProfiles: payload };

    default:
    return state;
  }
};
