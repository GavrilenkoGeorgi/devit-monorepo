import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../provider/authProvider'

export const ProtectedRoute = () => {
  const authContext = useAuth()

  // Check if the user is authenticated
  if (!authContext?.token) {
    return <Navigate to="/login" />
  }
  // If authenticated, render the child routes
  return <Outlet />
}
