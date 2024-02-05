import { ReactNode, useReducer, createContext, useRef, useEffect } from 'react';
import { reducer } from './reducer';
import { initialUserProfileState, IUserProfileState } from './initialState';

interface IUsersProfilesProviderProps {
  children: ReactNode;
}

interface IUsersProfilesValue extends IUserProfileState {
  fetchUsersProfiles: () => void;
}

export const UsersProfilesContext = createContext<IUsersProfilesValue>({
  ...initialUserProfileState,

  fetchUsersProfiles: () => {}
});

export const UserProvider = ({ children }: IUsersProfilesProviderProps) => {
  const [ state, dispatch ] = useReducer(reducer, initialUserProfileState);
  const fetchUsersProfilesAbortController = useRef(new AbortController());

  const fetchUsersProfiles = () => {
    // currenciesApi.fetchCurrencies()
    //   .then(({ data }: { data: ICurrency[] }) => {
    //     dispatch({ type: Types.FetchCurrencies, payload: data.map(({
    //       id,
    //       symbol,
    //       name,
    //       priceUsd,
    //       changePercent24Hr,
    //       volumeUsd24Hr,
    //       marketCapUsd
    //     }) => ({
    //       id,
    //       symbol,
    //       name,
    //       priceUsd,
    //       changePercent24Hr,
    //       volumeUsd24Hr,
    //       marketCapUsd
    //     })) });
    //   });
  };

  const providerValue = {
    ...state,

    fetchUsersProfiles
  };
  
  useEffect(() => {
    fetchUsersProfiles();
    return () => {
      fetchUsersProfilesAbortController.current.abort();
    };
  }, []);

  return (
    <UsersProfilesContext.Provider value={providerValue}>
      {children}
    </UsersProfilesContext.Provider>
  );
};