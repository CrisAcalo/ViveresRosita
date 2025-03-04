import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import Dashboard from "../Pages/Dashboard";
import Categories from "../Pages/Categories";
import Products from "../Pages/Products";
import Orders from "../Pages/Orders";
import Users from "../Pages/Users";
import AdminLayout from "../index"; // Importamos la estructura del Dashboard

const AdminRoutes = () => {
  const { auth } = useContext(ShoppingCartContext);

  // Redirige si el usuario no está autenticado o no es admin
  if (!auth.isAuthenticated || auth.user?.rol.id !== 1) {
    return <Navigate to="/" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
