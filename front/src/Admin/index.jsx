import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import DashboardHeader from "./Components/DashboardHeader";
import { AdminUIProvider, useAdminUI } from "./Context/AdminUIContext"; // Importamos el contexto
import { ShoppingCartContext } from "../Context";
import Alerts from "../Components/Alerts";
import { Navigate } from "react-router-dom";

const AdminLayout = () => {
    const { auth } = React.useContext(ShoppingCartContext);

    // Redirige si el usuario no está autenticado o no es admin
    if (!auth.isAuthenticated || auth.user.rol.id !== 1) {
        return <Navigate to="/" replace />;
    }

    const { globalAlert } = React.useContext(ShoppingCartContext);
    const [showAlert, setShowAlert] = React.useState(true);
    // const { modal } = useAdminUI();

    React.useEffect(() => {
        setShowAlert(true);
        let duration = globalAlert ? globalAlert.duration ? globalAlert.duration : 4000 : 4000;
        if (globalAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, duration);

            return () => clearTimeout(timer); // Cleanup the timer on component unmount
        }
    }, [globalAlert]);

    return (
        <AdminUIProvider>
            <div className="flex h-screen bg-gray-100 w-full">
                <div className="flex flex-col items-center mt-20 fixed mx-auto top-0 left-0 right-0 z-[200] w-max">
                    {globalAlert && globalAlert.messages.length > 0 && showAlert &&
                        <Alerts type={globalAlert.type} messages={globalAlert.messages}>
                            {/* {
                        globalAlert.messages.map((message, index) => (
                            <p className="inline" key={index}>{message}</p>
                        ))
                    } */}
                        </Alerts>
                    }
                </div>
                {/* Sidebar */}
                <Sidebar />

                {/* Contenido principal */}
                <div className="flex flex-col flex-1 w-full sm:w-9/12 overflow-y-auto h-screen">
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
