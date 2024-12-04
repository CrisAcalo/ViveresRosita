import React from 'react';
import { ShoppingCartProvider } from '../../Context';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import MyAccount from '../MyAccount';
import MyOrder from '../MyOrder';
import MyOrders from '../MyOrders';
import SignIn from '../SignIn';
import NotFound from '../NotFound';
import Navbar from '../../Components/Navbar';
import Layout from '../../Components/Layout';
import SignUp from '../SignUp';
import CheckoutSideMenu from '../../Components/CheckSideMenu';
import RequireAuth from '../../Components/RequireAuth';
import NotAuth from '../../Components/NotAuth';
import './App.css';

const AppRoutes = () => {
  let routes = useRoutes([
    {
      path: '/',
      element: <RequireAuth />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/category/:catName', element: <Home /> },
        { path: '/my-account', element: <MyAccount /> },
        { path: '/my-order', element: <MyOrder /> },
        { path: '/my-order/:id', element: <MyOrder /> },
        { path: '/my-orders', element: <MyOrders /> },
        { path: '/my-orders/last', element: <MyOrder /> },
      ]
    },
    {
      path: '/',
      element: <NotAuth />,
      children: [
        { path: '/sign-in', element: <SignIn /> },
        { path: '/sign-up', element: <SignUp /> },
      ]
    },
    { path: '/*', element: <NotFound /> },
  ]);
  return routes;
}

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <Navbar></Navbar>
        <Layout>
          <AppRoutes />
        </Layout>
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
