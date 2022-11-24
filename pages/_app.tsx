import type { ReactElement, ReactNode } from 'react';

import '@/assets/styles/global.scss';
import { AuthProvider } from '@/contexts/AuthGuard';
import { CacheProvider, EmotionCache } from '@emotion/react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import createEmotionCache from 'src/createEmotionCache';
import ThemeProvider from 'src/theme/ThemeProvider';
import Script from 'next/script';
import Maintenance from '@/layouts/Maintenace';
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface TokyoAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
  pageProps: any;
}

function TokyoApp(props: TokyoAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Aura Viet</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <AuthProvider>
        <SidebarProvider>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
              <Script
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=G-QKWZFM4WFR`}
              />

              <Script strategy="lazyOnload" id="">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-QKWZFM4WFR');
        `}
              </Script>
              {process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'false' ? (
                getLayout(<Component {...pageProps} />)
              ) : (
                <Maintenance />
              )}
            </LocalizationProvider>
          </ThemeProvider>
        </SidebarProvider>
      </AuthProvider>
    </CacheProvider>
  );
}

export default TokyoApp;
