import React from "react";
import { useAdminUI } from "../../Context/AdminUIContext";
import { useContext } from "react";
import { ShoppingCartContext } from "../../../Context/";
import { useNavigate } from "react-router-dom";
import { Bars3Icon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

const DashboardHeader = () => {
  const { setIsSidebarOpen } = useAdminUI();
  const { auth, setAuth } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jsonWebToken");
    setAuth({ isAuthenticated: false, user: null });
    navigate("/sign-in");
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center border-b">
      {/* Botón para abrir Sidebar en móviles */}
      <button className="md:hidden p-2 text-indigo-500" onClick={() => setIsSidebarOpen((prev) => !prev)}>
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Título de la página (puedes hacer dinámico si lo deseas) */}
      <h1 className="text-xl font-semibold text-indigo-600">Dashboard</h1>

      {/* Usuario y botón de logout */}
      <div className="flex items-center gap-4">
        <span className="text-gray-700">Bienvenido, <strong>{auth?.user?.name || "Admin"}</strong></span>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-600 transition"
          onClick={handleLogout}>
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
