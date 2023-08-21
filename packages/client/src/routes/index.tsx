import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useAuth } from '../provider/authProvider'
import { ProtectedRoute } from './ProtectedRoute'

import Login from '../pages/Login'
import Logout from '../pages/Logout'

const Routes = () => {
  const routesForPublic = [
    {
      path: '/feed',
      element: <h1>Feed page</h1>
    },
    {
      path: '/login',
      element: <Login />
    }
  ]

  const routesForAuthenticatedOnly = [
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

  const routesForNotAuthenticatedOnly = [
    {
      path: '/',
      element: <h1>'routesForNotAuthenticatedOnly'</h1>,
    }
  ]

  const authContext = useAuth()

  // Route configurations go here
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!authContext?.token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ])

  return <RouterProvider router={router} />
}

export default Routes
