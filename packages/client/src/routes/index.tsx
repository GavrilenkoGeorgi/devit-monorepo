import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useAuth } from '../provider/authProvider'
import { ProtectedRoute } from './ProtectedRoute'

import Login from '../pages/Login'
import Logout from '../pages/Logout'

const Routes = () => {

  const publicRoutes = [
    {
      path: '/feed',
      element: <h1>Feed page</h1>
    },
    {
      path: '/login',
      element: <Login />
    }
  ]

  const authOnlyRoutes = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <div>Admin Root</div>
        },
        {
          path: '/logout',
          element: <Logout />
        }
      ]
    }
  ]

  const noAuthRoutes = [
    {
      path: '/',
      element: <h1>noAuthRoutes</h1>,
    }
  ]

  const authContext = useAuth()

  // Compile routes into this:
  const router = createBrowserRouter([
    ...publicRoutes,
    ...(!authContext?.token ? noAuthRoutes : []), // token check looks strange
    ...authOnlyRoutes,
  ])

  return <RouterProvider router={router} />
}

export default Routes
