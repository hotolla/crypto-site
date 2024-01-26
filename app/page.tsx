"use client"

import { useCallback, useEffect, useState } from 'react';
import i18next from 'i18next';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Layout } from '@/app/components/Layout';
import { AuthProvider } from '../app/components/AuthProvider';
import { SessionProviders } from '@/app/components/SessionProviders';
import { PrivateRoute } from "@/app/modules/auth";
import { darkTheme, lightTheme } from "@/app/themes/themes";
import createEmotionCache from "@/app/themes/createEmotionCache";


const clientSideEmotionCache = createEmotionCache();
const isDarkThemeKey = 'isDarkTheme';
let item = false;

export default function Home ()   {

  const [ isDarkTheme, setIsDarkTheme ] = useState(item);
  const [ locale, setLocale ] = useState(i18next.language);

  const handleChangeTheme = useCallback(() => {
    setIsDarkTheme((isDarkTheme) => {
      if (typeof window !== 'undefined') localStorage.setItem(isDarkThemeKey, `${isDarkTheme}`);

      return !isDarkTheme;
    });
  }, []);

  useEffect(() => {
    item = localStorage.getItem(isDarkThemeKey) === 'false';
    // const handleLanguageChange = () => {
    //   setLocale(i18next.language);
    // };
    //
    // i18next.on('languageChanged', handleLanguageChange);

    // return () => {
    //   i18next.off('languageChanged', handleLanguageChange);
    // };
  }, []);
  return  (
    // <CacheProvider value={emotionCache}>
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />

      <LocalizationProvider adapterLocale={locale}>
          {/*<PrivateRoute>*/}
          {/*<SessionProviders>*/}
          {/*  <Layout isDarkTheme={isDarkTheme} onThemeToggle={handleChangeTheme}>*/}
          {/*    {children}*/}
          {/*  </Layout>*/}
          {/*  /!*</PrivateRoute>*!/*/}
          {/*</SessionProviders>*/}
      </LocalizationProvider>
    </ThemeProvider>
    // </CacheProvider>
  );
}
