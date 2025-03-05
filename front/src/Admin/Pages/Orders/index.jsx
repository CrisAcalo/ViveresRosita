import React, { useEffect, useState, useContext } from "react";
import { getOrders, getOrderById, createOrder, deleteOrder, updateOrderStatus } from "../../../api/ordersApi";
import { getUsers } from "../../../api/usersApi";
import { getProducts } from "../../../api/productsApi";
import { useAdminUI } from "../../Context/AdminUIContext";
import Table from "../../Components/Table";
import Modal from "../../Components/Modal";
import OrderForm from "../../Components/Forms/OrderForm";
import OrderDetail from "../../Components/OrderDetail";
import { ShoppingCartContext } from "../../../Context";

const Orders = () => {
    const { modal, setModal } = useAdminUI();
    const { setGlobalAlert } = useContext(ShoppingCartContext);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    // Cargar órdenes, usuarios y productos al iniciar
    useEffect(() => {
        fetchOrders();
        fetchUsers();
        fetchProducts();
    }, []);

    const handleUpdateState = async (id, state) => {
        try {
            await updateOrderStatus(id, state);
            setGlobalAlert({ type: "success", messages: [`Estado cambiado a ${state}`] });
            fetchOrders();
        } catch (error) {
            setGlobalAlert({ type: "error", messages: error });
        }
    }

    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            setGlobalAlert({ type: "error", messages: error, duration: 4000 });
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            setGlobalAlert({ type: "error", messages: error, duration: 4000 });
        }
    };

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            setGlobalAlert({ type: "error", messages: error, duration: 4000 });
        }
    };

    // Crear una orden
    const handleSaveOrder = async (orderData) => {
        try {
            await createOrder(orderData);
            setGlobalAlert({ type: "success", messages: ["Orden creada exitosamente"] });
            fetchOrders();
            setModal({ isOpen: false });
        } catch (error) {
            setGlobalAlert({ type: "error", messages: error, duration: 4000 });
        }
    };

    // Eliminar una orden
    const handleDeleteOrder = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta orden?")) {
            try {
                await deleteOrder(id);
                setGlobalAlert({ type: "success", messages: ["Orden eliminada exitosamente"] });
                fetchOrders();
            } catch (error) {
                setGlobalAlert({ type: "error", messages: error, duration: 4000 });
            }
        }
    };

    // Ver detalles de una orden
    const handleViewOrder = async (id) => {
        try {
            const order = await getOrderById(id);
            setModal({ isOpen: true, type: "view", data: order });
        } catch (error) {
            setGlobalAlert({ type: "error", messages: error, duration: 4000 });
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Gestión de Órdenes</h2>

            {/* Botón para abrir el modal de creación */}
            <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-indigo-600"
                onClick={() => setModal({ isOpen: true, type: "create" })}
            >
                + Crear Orden
            </button>

            {/* Tabla de Órdenes */}
            <Table
                headers={["ID", "Usuario", "Fecha", "Transportista", "Estado", "Acciones"]}
                data={orders.map((order) => [
                    order.id,
                    order.user?.name || "Desconocido",
                    new Date(order.createdAt).toLocaleDateString(),
                    order.carrier?.name || "Desconocido",
                    order.state,
                    <div key={order.id} className="flex gap-2">
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                            onClick={() => handleViewOrder(order.id)}
                        >
                            Ver Detalles
                        </button>
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={() => handleDeleteOrder(order.id)}
                        >
                            Eliminar
                        </button>
                    </div>,
                ])}
            />

            {/* Modal de Crear Orden */}
            {modal.isOpen && modal.type === "create" && (
                <Modal title="Nueva Orden" onClose={() => setModal({ isOpen: false })}>
                    <OrderForm onSave={handleSaveOrder} users={users} products={products} />
                </Modal>
            )}

            {/* Modal de Ver Detalles de la Orden */}
            {modal.isOpen && modal.type === "view" && (
                <Modal title="Detalles de la Orden" onClose={() => setModal({ isOpen: false })}>
                    <OrderDetail onUpdate={handleUpdateState} order={modal.data} />
                </Modal>
            )}
        </div>
    );
};

export default Orders;
