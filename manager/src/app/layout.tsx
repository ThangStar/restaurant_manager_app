'use client'
import Header from '@/component/Header/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import LeftSideBar from '@/component/LeftSideBar/LeftSideBar'
import { store } from '@/redux-store/store'
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react'
import Login from '@/component/Login/login'
import Messenger from '@/component/Messenger/messenger'
const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
  }

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const _token = localStorage.getItem("token");
    if (_token != null) {
      setToken(_token);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>restaurant | Starter</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
        />
        <link rel="stylesheet" href="/fonts/icons.css" />
        <link
          rel="stylesheet"
          href="/vendors/swiper/swiper-bundle.min.css"
        />
        <link rel="stylesheet" href="/css/styles.bundle.css" />
        <link
          rel="shortcut icon"
          href="https://realthemes.github.io/marketop/favicon.ico"
        />
        <link rel="stylesheet" href="/css/adminlte.min.css" />
        <link
          rel="stylesheet"
          href="/font-awesome/fontawesome-free/css/all.min.css"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </head>
      <body>
        <Provider store={store}>
          {token ? (
            <>
              <Messenger />
              <Header />
              {children}
              <LeftSideBar onLogout={() => logout()} />
            </>
          ) : (
            <Login />
          )}
        </Provider>
      </body>
    </html>
  )
}
