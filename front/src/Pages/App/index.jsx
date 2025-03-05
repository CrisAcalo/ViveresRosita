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
import AdminRoutes from '../../Admin/Routes/AdminRoutes';
import AdminLayout from '../../Admin/';
import Dashboard from '../../Admin/Pages/Dashboard';
import Categories from '../../Admin/Pages/Categories';
import Products from '../../Admin/Pages/Products';
import Orders from '../../Admin/Pages/Orders';
import Users from '../../Admin/Pages/Users';
import './App.css';

const AppRoutes = () => {
  let routes = useRoutes([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Layout>
            <RequireAuth />
          </Layout>
          <CheckoutSideMenu />
        </>
      ),
      children: [
        { path: '/', element: <Home /> },
        { path: '/category/:catName', element: <Home /> },
        { path: '/my-account', element: <MyAccount /> },
        { path: '/my-order', element: <MyOrder /> },
        { path: '/my-order/:id', element: <MyOrder /> },
        { path: '/my-orders', element: <MyOrders /> },
        { path: '/my-order/last', element: <MyOrder /> },
      ]
    },
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Layout>
            <NotAuth />
          </Layout>
          <CheckoutSideMenu />
        </>
      ),
      children: [
        { path: '/sign-in', element: <SignIn /> },
        { path: '/sign-up', element: <SignUp /> },
      ]
    },
    {
      path: '/admin/*',
      element: <AdminLayout />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "categories", element: <Categories /> },
        { path: "products", element: <Products /> },
        { path: "orders", element: <Orders /> },
        { path: "users", element: <Users /> },
      ]
    },
    { path: '/*', element: <NotFound /> },
  ]);
  return routes;
};


const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;

