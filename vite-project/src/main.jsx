import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StoreProvider from './store/index.jsx'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Signup from './Signup.jsx'
import { Button } from './components/ListFunc/index.jsx'

import Forget from './Forget.jsx'
import { Otp } from './Otp.jsx'

import { Mainpath } from './components/Coms/Mainpath.jsx'
import AddEmployee from './components/AllEmployees/AddEmployee/AddEmployee.jsx'
import Allemployeesmall from './components/Coms/Allemployeesmall.jsx'
import Signin from './Signin.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signin" replace />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },

  {
    path: "/Homepage",
    element: <Button />,
    children: [
      {
        path: ":userId",
        element: <Mainpath />,
        children: [
          {
            path: ":employeeId",
            element: <Allemployeesmall /> // Component con của Allemployee
          }
        ]
      },
     
    ]
  },


  {
    path: "/forgetPass",
    element: <Forget />
  },
  {
    path: "/otp",
    element: <Otp />
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StoreProvider>

    <RouterProvider router={router} />

  </StoreProvider>,
)
//Test
