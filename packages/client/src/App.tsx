import React, { FC, useContext, useEffect } from 'react'
import { Context } from './index'
import { observer } from 'mobx-react-lite'
import AuthProvider from './auth/authProvider'
import Routes from './routes'

const App: FC = () => {

  const { store } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  return <AuthProvider>
    <Routes />
  </AuthProvider>
}

export default observer(App)
