import React from "react";
import { useAdminUI } from "../../Context/AdminUIContext";
import { useContext } from "react";
import { ShoppingCartContext } from "../../../Context/";
import { useNavigate } from "react-router-dom";
import { Bars3Icon, ArrowRightOnRectangleIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const DashboardHeader = () => {
  const { setIsSidebarOpen } = useAdminUI();
  const navigate = useNavigate();

  const { auth,
    setAuth,
    setCarProducts,
    closeProductDetail,
    closeCheckoutMenu,
    setOrder,
    setJsonWebToken,
  } = React.useContext(ShoppingCartContext);

  const handleLogout = () => {
    setAuth({});
    setCarProducts([]);
    setOrder({});
    closeProductDetail();
    closeCheckoutMenu();
    setJsonWebToken(null);
    
    localStorage.removeItem('jsonWebToken');
    localStorage.removeItem('auth');
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center border-b">
      {/* Botón para abrir Sidebar en móviles */}
      <button className="md:hidden p-2 text-indigo-500" onClick={() => setIsSidebarOpen((prev) => !prev)}>
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Título de la página (dinámico si se desea) */}
      <h1 className="text-xl font-semibold text-indigo-600">Dashboard</h1>

      {/* Contenedor de Usuario y Logout */}
      <div className="flex items-center gap-4">
        {/* En pantallas grandes, muestra el nombre del usuario */}
        <div className="hidden md:flex items-center gap-2">
          <UserCircleIcon className="w-6 h-6 text-gray-500" />
          <span className="text-gray-700">Bienvenido, <strong>{auth?.user?.name || "Admin"}</strong></span>
        </div>

        {/* En pantallas pequeñas, solo muestra el icono del usuario */}
        <div className="md:hidden">
          <UserCircleIcon className="w-6 h-6 text-gray-500" />
        </div>

        {/* Botón de Logout */}
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-600 transition"
          onClick={handleLogout}>
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span className="hidden md:inline">Logout</span> {/* Oculta texto en móviles */}
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
