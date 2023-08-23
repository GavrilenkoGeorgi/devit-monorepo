import React, { FC, useContext, useEffect } from 'react'
import { Context } from './store'
import { observer } from 'mobx-react-lite'
import AuthProvider from './auth/authProvider'
import Routes from './routes'
import Navigation from './pages/components/Navigation'
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

  return <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Navigation />
      <Routes />
      <ReactQueryDevtools />
    </AuthProvider>
  </QueryClientProvider>
}

export default observer(App)
