import React, { createContext, useState, useContext } from "react";

// Crear contexto
const AdminUIContext = createContext();

export const AdminUIProvider = ({ children }) => {
    // Estado para controlar el Sidebar (abierto/cerrado en móviles)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Estado para controlar los Modales de CRUD (crear/editar categorías, productos, etc.)
    const [modal, setModal] = useState({
        isOpen: false,
        type: null, // Tipo de modal: 'create', 'edit'
        data: null, // Datos a editar si es un modal de edición
    });

    return (
        <AdminUIContext.Provider value={{ isSidebarOpen, setIsSidebarOpen, modal, setModal }}>
            {children}
        </AdminUIContext.Provider>
    );
};

// Hook para usar el contexto
export const useAdminUI = () => useContext(AdminUIContext);
