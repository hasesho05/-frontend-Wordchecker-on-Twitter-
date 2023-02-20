import Head from 'next/head';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCathe';
import '../styles/globals.css'
import {
  RecoilRoot
} from 'recoil';
import apiAccess from '../api/api';
import { useEffect, useState } from 'react';
const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [request, setRequest] = useState({
    isSignedIn: false,
    user: {
      id: 0,
      username: "",
      icon: "",
    }
  })

  const getAuth = (token: string | null) => {
    const payload = {
      token: token
    }
    const funcSuccess = (response: any) => {
      setRequest({
        isSignedIn: true,
        user: {
          id: response.data.data.id,
          username: response.data.data.username,
          icon: response.data.data.user_icon,
        }
      })
    }
    const funcError = (error: any) => {
      console.log(error)
    }
    apiAccess("AUTHORIZATION", funcSuccess, funcError, payload)
  }

  useEffect(() => {
    var token = localStorage.getItem('token')
    console.log(token);
    
    getAuth(token)
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <RecoilRoot>
            <Component {...pageProps} request={request} />
          </RecoilRoot>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App