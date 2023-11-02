import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { ErrorPage } from './pages/ErrorPage.jsx';

import DarkModeProvider from './context/darkMode.jsx';

import { App } from './pages/App.jsx';
import { Login } from './pages/Login.jsx';
import { Schedule } from './pages/Schedule.jsx';
import { Overtime } from './pages/Overtime.jsx';
import { Employees } from './pages/Employees.jsx';

const isLogin = () => {
 localStorage.getItem('token') ? true : false;
};

const router = createBrowserRouter([
 {
  path: '/',
  element: <App />,
  errorElement: <ErrorPage />,
 },
 {
  path: '/auth/login',
  element: isLogin ? <Login /> : <Navigate to="/" />,
  errorElement: <ErrorPage />,
 },
 {
  path: '/dashboard/schedule',
  element: <Schedule />,
  errorElement: <ErrorPage />,
 },
 {
  path: '/dashboard/overtime',
  element: <Overtime />,
  errorElement: <ErrorPage />,
 },
 {
  path: '/dashboard/employees',
  element: <Employees />,
  errorElement: <ErrorPage />,
 },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
  <DarkModeProvider>
   {/* <PrimeReactProvider> */}
   <RouterProvider router={router} />
   {/* </PrimeReactProvider> */}
  </DarkModeProvider>
 </React.StrictMode>
);
