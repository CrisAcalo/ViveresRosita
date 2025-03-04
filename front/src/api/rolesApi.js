import api from "./axiosConfig";

/**
 * Obtiene la lista de roles desde la API.
 * @returns {Promise<Array>} Lista de roles.
 */
export const getRoles = async () => {
    try {
        const response = await api.get("/roles");
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al obtener roles"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al obtener roles";
    }
};

/**
 * Obtiene un rol específico por su ID.
 * @param {number} id - ID del rol a obtener.
 * @returns {Promise<Object>} Datos del rol.
 */
export const getRoleById = async (id) => {
    try {
        const response = await api.get(`/roles/${id}`);
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al obtener el rol"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al obtener el rol";
    }
};

/**
 * Crea un nuevo rol en la API.
 * @param {Object} roleData - Datos del rol a crear.
 * @returns {Promise<Object>} Rol creado.
 */
export const createRole = async (roleData) => {
    try {
        const response = await api.post("/roles", roleData);
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al crear rol"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al crear rol";
    }
};

/**
 * Actualiza un rol existente por su ID.
 * @param {number} id - ID del rol a actualizar.
 * @param {Object} roleData - Datos a actualizar.
 * @returns {Promise<Object>} Rol actualizado.
 */
export const updateRole = async (id, roleData) => {
    try {
        const response = await api.patch(`/roles/${id}`, roleData);
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al actualizar rol"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al actualizar rol";
    }
};

/**
 * Elimina un rol por su ID.
 * @param {number} id - ID del rol a eliminar.
 * @returns {Promise<Object>} Respuesta de eliminación.
 */
export const deleteRole = async (id) => {
    try {
        await api.delete(`/roles/${id}`);
        return { message: "Rol eliminado exitosamente" };
    } catch (error) {
        let errorMessages = ["Error al eliminar rol"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al eliminar rol";
    }
};
