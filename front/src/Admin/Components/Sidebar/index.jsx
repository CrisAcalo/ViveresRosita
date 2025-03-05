import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAdminUI } from "../../Context/AdminUIContext";
import {
    HomeIcon,
    CubeIcon,
    UsersIcon,
    ClipboardDocumentListIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/solid";

const Sidebar = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useAdminUI();
    const location = useLocation();

    // Cerrar Sidebar cuando se selecciona un elemento del menú
    const handleNavClick = () => {
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    // Detectar cambios de tamaño de ventana para ajustar visibilidad del Sidebar
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsSidebarOpen(true); // Mostrar en pantallas grandes
            } else {
                setIsSidebarOpen(false); // Ocultar en pantallas pequeñas
            }
        };

        // Ejecutar la función una vez al montar el componente
        handleResize();

        // Agregar event listener para detectar cambios en el tamaño de la ventana
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [setIsSidebarOpen]);

    // Clases dinámicas para resaltar la ruta activa
    const getNavLinkClass = (path) =>
        `flex items-center gap-2 p-3 rounded-lg text-white hover:bg-indigo-600 ${location.pathname === path ? "bg-indigo-500" : ""
        }`;

    return (
        <>
            {/* Botón para abrir/cerrar el Sidebar en móviles */}
            <button
                className="z-[60] fixed top-4 left-4 p-2 bg-indigo-500 text-white rounded-lg md:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed h-screen z-50 inset-y-0 left-0 bg-indigo-700 text-white w-64 p-6 transition-transform duration-200 ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"
                    } md:translate-x-0 md:static`}
            >
                <h2 className="text-xl font-bold mb-6 mt-10">Admin Panel</h2>

                <nav className="flex flex-col gap-2">
                    <Link to="/admin" className={getNavLinkClass("/admin/dashboard")} onClick={handleNavClick}>
                        <HomeIcon className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link to="/admin/categories" className={getNavLinkClass("/admin/categories")} onClick={handleNavClick}>
                        <CubeIcon className="w-5 h-5" />
                        Categorías
                    </Link>
                    <Link to="/admin/products" className={getNavLinkClass("/admin/products")} onClick={handleNavClick}>
                        <CubeIcon className="w-5 h-5" />
                        Productos
                    </Link>
                    <Link to="/admin/orders" className={getNavLinkClass("/admin/orders")} onClick={handleNavClick}>
                        <ClipboardDocumentListIcon className="w-5 h-5" />
                        Órdenes
                    </Link>
                    <Link to="/admin/users" className={getNavLinkClass("/admin/users")} onClick={handleNavClick}>
                        <UsersIcon className="w-5 h-5" />
                        Usuarios
                    </Link>
                    {/* Pagina E commerce */}
                    <Link to="/" className={getNavLinkClass("/admin/e-commerce")} onClick={handleNavClick}>
                        
                        E-commerce
                    </Link>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
