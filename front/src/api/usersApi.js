import api from "./axiosConfig";

/**
 * Obtiene la lista de usuarios desde la API.
 * @returns {Promise<Array>} Lista de usuarios.
 */
export const getUsers = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al obtener usuarios"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al obtener usuarios";
    }
};

/**
 * Obtiene un usuario específico por su ID.
 * @param {number} id - ID del usuario a obtener.
 * @returns {Promise<Object>} Datos del usuario.
 */
export const getUserById = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al obtener el usuario"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al obtener el usuario";
    }
};

/**
 * Crea un nuevo usuario en la API.
 * @param {Object} userData - Datos del usuario a crear.
 * @returns {Promise<Object>} Usuario creado.
 */
export const createUser = async (userData) => {
    try {
        const response = await api.post("/users", userData);
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al crear usuario"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al crear usuario";
    }
};

/**
 * Actualiza un usuario existente por su ID.
 * @param {number} id - ID del usuario a actualizar.
 * @param {Object} userData - Datos a actualizar.
 * @returns {Promise<Object>} Usuario actualizado.
 */
export const updateUser = async (id, userData) => {
    try {
        const response = await api.patch(`/users/${id}`, userData);
        return response.data;
    } catch (error) {
        let errorMessages = ["Error al actualizar usuario"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al actualizar usuario";
    }
};

/**
 * Elimina un usuario por su ID.
 * @param {number} id - ID del usuario a eliminar.
 * @returns {Promise<Object>} Respuesta de eliminación.
 */
export const deleteUser = async (id) => {
    try {
        await api.delete(`/users/${id}`);
        return { message: "Usuario eliminado exitosamente" };
    } catch (error) {
        let errorMessages = ["Error al eliminar usuario"];
        errorMessages.push(error.response?.data?.message);
        throw errorMessages || "Error al eliminar usuario";
    }
};
