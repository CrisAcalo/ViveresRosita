import api from "./axiosConfig";

/**
 * Obtiene todos los pedidos desde la API.
 * @returns {Promise<Array>} Lista de pedidos.
 */
export const getOrders = async () => {
    try {
        const response = await api.get("/orders");
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al obtener pedidos"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al obtener pedidos";
    }
};

/**
 * Obtiene el último pedido registrado.
 * @returns {Promise<Object>} Datos del último pedido.
 */
export const getLastOrder = async () => {
    try {
        const response = await api.get("/orders/last");
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al obtener el último pedido"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al obtener el último pedido";
    }
};

/**
 * Obtiene un pedido específico por su ID.
 * @param {number} id - ID del pedido a obtener.
 * @returns {Promise<Object>} Datos del pedido.
 */
export const getOrderById = async (id) => {
    try {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al obtener el pedido"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al obtener el pedido";
    }
};

/**
 * Crea un nuevo pedido en la API.
 * @param {Object} orderData - Datos del pedido a crear.
 * @returns {Promise<Object>} Pedido creado.
 */
export const createOrder = async (orderData) => {
    try {
        const response = await api.post("/orders", orderData);
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al crear pedido"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al crear pedido";
    }
};

/**
 * Elimina un pedido por su ID.
 * @param {number} id - ID del pedido a eliminar.
 * @returns {Promise<Object>} Respuesta de eliminación.
 */
export const deleteOrder = async (id) => {
    try {
        await api.delete(`/orders/${id}`);
        return { message: "Pedido eliminado exitosamente" };
    } catch (error) {
        let errorMessages = ["Error al eliminar pedido"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al eliminar pedido";
    }
};

/**
 * Actualiza el estado de un pedido por su ID.
 * @param {number} id - ID del pedido a actualizar.
 * @param {string} status - Nuevo estado del pedido.
 * @returns {Promise<Object>} Pedido actualizado.
 */
export const updateOrderStatus = async (id, state) => {
    try {
        const response = await api.patch(`/orders/${id}`, { state });
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al actualizar el estado"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al actualizar el estado";
    }
}