import React, { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../auth/authProvider'
import { Context } from '../index'

const Logout: FC = () => {
  // const authContext = useAuth()
  const navigate = useNavigate()

  const { store } = useContext(Context)
  
  const handleLogout = () => {
    store.logout()
    // authContext?.setToken('')
    navigate('/', { replace: true })
  }

  return <>
    Logout Page
    <button onClick={handleLogout}>Logout</button>
  </>
}

export default Logout
