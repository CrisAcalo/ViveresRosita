import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import Dashboard from "../Pages/Dashboard";
import Categories from "../Pages/Categories";
import Products from "../Pages/Products";
import Orders from "../Pages/Orders";
import Users from "../Pages/Users";

const AdminRoutes = () => {
  const { auth } = useContext(ShoppingCartContext);

  if (!auth.isAuthenticated || auth.user?.rol.id !== 1) {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/products" element={<Products />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
};

export default AdminRoutes;
