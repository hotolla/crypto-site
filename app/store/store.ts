// @ts-ignore
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './currenciesSlice';

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer
  }
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

// export const useAppDispatch: () => AppDispatch = useDispatch
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

