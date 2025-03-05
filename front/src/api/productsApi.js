import api from "./axiosConfig";

/**
 * Obtiene la lista de productos desde la API.
 * @returns {Promise<Array>} Lista de productos.
 */
export const getProducts = async () => {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al obtener productos"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al obtener productos";
    }
};

/**
 * Obtiene un producto específico por su categoryId.
 * @param {number} id - ID dela categoria.
 * @returns {Promise<Array>} Lista de productos.
 */

export const getProductsByCategory = async (id) => {
    try {
        const response = await api.get(`/api/v1/products?categoryId=${id}`);
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al obtener productos"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al obtener productos";
    }
}



/**
 * Obtiene un producto específico por su ID.
 * @param {number} id - ID del producto a obtener.
 * @returns {Promise<Object>} Datos del producto.
 */
export const getProductById = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al obtener el producto"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al obtener el producto";
    }
};

/**
 * Crea un nuevo producto en la API.
 * @param {Object} productData - Datos del producto a crear.
 * @returns {Promise<Object>} Producto creado.
 */
export const createProduct = async (productData) => {
    try {
        const response = await api.post("/products", productData);
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al crear producto"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al crear producto";
    }
};

/**
 * Actualiza un producto existente por su ID.
 * @param {number} id - ID del producto a actualizar.
 * @param {Object} productData - Datos a actualizar.
 * @returns {Promise<Object>} Producto actualizado.
 */
export const updateProduct = async (id, productData) => {
    try {
        const response = await api.patch(`/products/${id}`, productData);
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al actualizar producto"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al actualizar producto";
    }
};

/**
 * Elimina un producto por su ID.
 * @param {number} id - ID del producto a eliminar.
 * @returns {Promise<Object>} Respuesta de eliminación.
 */
export const deleteProduct = async (id) => {
    try {
        await api.delete(`/products/${id}`);
        return { message: "Producto eliminado exitosamente" };
    } catch (error) {
        let errorMessages = ["Error al eliminar producto"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al eliminar producto";
    }
};
