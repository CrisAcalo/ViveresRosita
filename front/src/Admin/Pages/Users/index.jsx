import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../../../api/usersApi";
import { getRoles } from "../../../api/rolesApi";
import { useAdminUI } from "../../Context/AdminUIContext";
import Table from "../../Components/Table";
import Modal from "../../Components/Modal";
import UserForm from "../../Components/Forms/UserForm";

const Users = () => {
    const { modal, setModal, setGlobalAlert } = useAdminUI();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);

    // Cargar usuarios y roles al iniciar
    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            setGlobalAlert({ type: "error", messages: [error.message || "Error al obtener usuarios"] });
        }
    };

    const fetchRoles = async () => {
        try {
            const data = await getRoles();
            setRoles(data);
        } catch (error) {
            setGlobalAlert({ type: "error", messages: [error.message || "Error al obtener roles"] });
        }
    };

    // Crear o editar usuario
    const handleSaveUser = async (userData) => {
        try {
            if (modal.type === "create") {
                await createUser(userData);
                setGlobalAlert({ type: "success", messages: ["Usuario creado exitosamente"] });
            } else if (modal.type === "edit") {
                await updateUser(modal.data.id, userData);
                setGlobalAlert({ type: "success", messages: ["Usuario actualizado exitosamente"] });
            }
            fetchUsers();
            setModal({ isOpen: false });
        } catch (error) {
            setGlobalAlert({ type: "error", messages: [error.message || "Error al guardar el usuario"] });
        }
    };

    // Eliminar usuario
    const handleDeleteUser = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
            try {
                await deleteUser(id);
                setGlobalAlert({ type: "success", messages: ["Usuario eliminado exitosamente"] });
                fetchUsers();
            } catch (error) {
                setGlobalAlert({ type: "error", messages: [error.message || "Error al eliminar el usuario"] });
            }
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Gestión de Usuarios</h2>

            {/* Botón para abrir el modal de creación */}
            <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-indigo-600"
                onClick={() => setModal({ isOpen: true, type: "create" })}
            >
                + Agregar Usuario
            </button>

            {/* Tabla de Usuarios */}
            <Table
                headers={["Nombre", "Email", "Teléfono", "Dirección", "Rol", "Acciones"]}
                data={users.map((user) => [
                    user.name,
                    user.email,
                    user.phone,
                    user.address,
                    user.rol?.name || "Desconocido",
                    <div key={user.id} className="flex gap-2">
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                            onClick={() => setModal({ isOpen: true, type: "edit", data: user })}
                        >
                            Editar
                        </button>
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={() => handleDeleteUser(user.id)}
                        >
                            Eliminar
                        </button>
                    </div>,
                ])}
            />

            {/* Modal de Crear/Editar Usuario */}
            {modal.isOpen && (
                <Modal title={modal.type === "create" ? "Nuevo Usuario" : "Editar Usuario"} onClose={() => setModal({ isOpen: false })}>
                    <UserForm onSave={handleSaveUser} user={modal.type === "edit" ? modal.data : null} roles={roles} />
                </Modal>
            )}
        </div>
    );
};

export default Users;
