import React, { FC, useContext, useEffect } from 'react'
import { Context } from './index'
import { observer } from 'mobx-react-lite'
import AuthProvider from './auth/authProvider'
import Routes from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const App: FC = () => {

  const { store } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  return <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Routes />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </AuthProvider>
}

export default observer(App)
