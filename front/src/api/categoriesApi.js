import api from "./axiosConfig";

/**
 * Obtiene todas las categorías desde la API.
 * @returns {Promise<Array>} Lista de categorías.
 */
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    let errorMessages = ["Error al obtener categorias"];
    errorMessages.push(error.response.data.message);
    throw errorMessages || "Error al obtener categorías";
  }
};

/**
 * Obtiene una categoría específica por su ID.
 * @param {number} id - ID de la categoría a obtener.
 * @returns {Promise<Object>} Datos de la categoría.
 */
export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    let errorMessages = ["Error al obtener la categoría"];
    errorMessages.push(error.response.data.message);
    throw errorMessages || "Error al obtener la categoría";
  }
};

/**
 * Crea una nueva categoría en la API.
 * @param {Object} categoryData - Datos de la categoría a crear.
 * @returns {Promise<Object>} Categoría creada.
 */
export const createCategory = async (categoryData) => {
  try {
    const response = await api.post("/categories", categoryData);
    return response.data;
  } catch (error) {
    let errorrMessages = ["Error al crear categoría"];
    errorrMessages.push(error.response.data.message);
    throw errorrMessages || "Error al crear categoría";
  }
};

/**
 * Actualiza una categoría existente por su ID.
 * @param {number} id - ID de la categoría a actualizar.
 * @param {Object} categoryData - Datos a actualizar.
 * @returns {Promise<Object>} Categoría actualizada.
 */
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await api.patch(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    let errorMessages = ["Error al actualizar categoría"];
    errorMessages.push(error.response.data.message);
    throw errorMessages || "Error al actualizar categoría";
  }
};

/**
 * Elimina una categoría por su ID.
 * @param {number} id - ID de la categoría a eliminar.
 * @returns {Promise<Object>} Respuesta de eliminación.
 */
export const deleteCategory = async (id) => {
  try {
    await api.delete(`/categories/${id}`);
    return { message: "Categoría eliminada exitosamente" };
  } catch (error) {
    let errorMessages = ["Error al eliminar categoría"];
    errorMessages.push(error.response.data.message);
    throw errorMessages || "Error al eliminar categoría";
  }
};
