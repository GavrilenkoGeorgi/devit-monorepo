import React, { FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { AuthContext } from './authContext'

type AuthProviderProps = { // this doesn't belong here
  children: ReactNode
}

const AuthProvider:FC<AuthProviderProps> = ({ children }) => {

  const [token, setToken_] = useState(localStorage.getItem('token'))

  const setToken = (newToken: string) => {
    setToken_(newToken)
  }

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      localStorage.setItem('token',token)
    } else {
      delete axios.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
    }
  }, [token])

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  )

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
