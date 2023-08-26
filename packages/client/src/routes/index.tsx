import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useAuth } from '../auth/authProvider'
import { ProtectedRoute } from './ProtectedRoute'

import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Users from '../pages/Users'
import Admin from '../pages/Admin'
import Feed from '../pages/Feed'
import MainPage from '../pages/MainPage'
import Register from '../pages/Register'

const Routes = () => {

  const publicRoutes = [
    {
      path: '/',
      element: <MainPage/>
    },
    {
      path: '/feed',
      element: <Feed />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ]

  const authOnlyRoutes = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/users',
          element: <Users />
        },
        {
          path: '/admin',
          element: <Admin />
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
      path: '/feed',
      element: <h1>Main page</h1>,
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
