import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../provider/authProvider'

const Login = () => {
  const navigate = useNavigate()

  const authContext = useAuth()

  const handleLogin = () => {
    authContext?.setToken('this is a test token')
    navigate('/', { replace: true })
  }

  setTimeout(() => {
    handleLogin()
  }, 3 * 1000)

  return <>Login Page</>
}

export default Login
