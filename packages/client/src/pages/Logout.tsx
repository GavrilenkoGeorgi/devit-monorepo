import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../provider/authProvider'

const Logout = () => {
  const authContext = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    authContext?.setToken('')
    navigate('/', { replace: true })
  }

  setTimeout(() => {
    handleLogout()
  }, 3 * 1000)

  return <>Logout Page</>
}

export default Logout
