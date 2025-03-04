import api from "./axiosConfig";

/**
 * Inicia sesión en la API y obtiene un token.
 * @param {Object} credentials - Credenciales de usuario (email y password).
 * @returns {Promise<Object>} Datos del usuario y token de autenticación.
 */
export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    let errorMessages = ["Error al iniciar sesión"];
    errorMessages.push(error.response?.data?.message);
    throw errorMessages || "Error al iniciar sesión";
  }
};

/**
 * Registra un nuevo usuario en la API.
 * @param {Object} userData - Datos del usuario a registrar.
 * @returns {Promise<Object>} Datos del usuario registrado.
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    let errorMessages = ["Error al registrar usuario"];
    errorMessages.push(error.response?.data?.message);
    throw errorMessages || "Error al registrar usuario";
  }
};

/**
 * Cierra sesión eliminando el token del almacenamiento local.
 */
export const logout = () => {
  localStorage.removeItem("jsonWebToken");
};
