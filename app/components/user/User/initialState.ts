import { IUser } from '@/app/modules/users';

export interface IUserProfile extends IUser {
  balance: number,
  purchasedCurrency: string,
  soldCurrency: string
}

export interface IUserProfileState {
  usersProfiles: IUserProfile[];
}
export const initialUserProfileState: IUserProfileState = {
  usersProfiles: []
};
