import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import DashboardHeader from "./Components/DashboardHeader";
import { AdminUIProvider } from "./Context/AdminUIContext"; // Importamos el contexto

const AdminLayout = () => {
    return (
        <AdminUIProvider>
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <Sidebar />

                {/* Contenido principal */}
                <div className="flex flex-col flex-1">
                    <DashboardHeader />

                    {/* Contenido dinámico */}
                    <div className="p-6 overflow-y-auto h-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </AdminUIProvider>
    );
};

export default AdminLayout;
