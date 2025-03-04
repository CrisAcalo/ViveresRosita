import React, { useEffect, useState } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../../api/categoriesApi";
import { useAdminUI } from "../../Context/AdminUIContext";
import Table from "../../Components/Table";
import Modal from "../../Components/Modal";
import CategoryForm from "../../Components/Forms/CategoryForm";

const Categories = () => {
  const { modal, setModal, setGlobalAlert } = useAdminUI();
  const [categories, setCategories] = useState([]);

  // Cargar categorías al iniciar
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      setGlobalAlert({ type: "error", messages: [error.message || "Error al obtener categorías"] });
    }
  };

  // Crear o editar una categoría
  const handleSaveCategory = async (categoryData) => {
    try {
      if (modal.type === "create") {
        await createCategory(categoryData);
        setGlobalAlert({ type: "success", messages: ["Categoría creada exitosamente"] });
      } else if (modal.type === "edit") {
        await updateCategory(modal.data.id, categoryData);
        setGlobalAlert({ type: "success", messages: ["Categoría actualizada exitosamente"] });
      }
      fetchCategories();
      setModal({ isOpen: false });
    } catch (error) {
      setGlobalAlert({ type: "error", messages: [error.message || "Error al guardar la categoría"] });
    }
  };

  // Eliminar una categoría
  const handleDeleteCategory = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
      try {
        await deleteCategory(id);
        setGlobalAlert({ type: "success", messages: ["Categoría eliminada exitosamente"] });
        fetchCategories();
      } catch (error) {
        setGlobalAlert({ type: "error", messages: [error.message || "Error al eliminar la categoría"] });
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Gestión de Categorías</h2>

      {/* Botón para abrir el modal de creación */}
      <button
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-indigo-600"
        onClick={() => setModal({ isOpen: true, type: "create" })}
      >
        + Agregar Categoría
      </button>

      {/* Tabla de Categorías */}
      <Table
        headers={["Imagen", "Nombre", "Descripción", "Acciones"]}
        data={categories.map((cat) => [
          <img src={cat.image} alt={cat.name} className="w-12 h-12 rounded-md object-cover" />,
          cat.name,
          cat.description,
          <div key={cat.id} className="flex gap-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              onClick={() => setModal({ isOpen: true, type: "edit", data: cat })}
            >
              Editar
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              onClick={() => handleDeleteCategory(cat.id)}
            >
              Eliminar
            </button>
          </div>,
        ])}
      />

      {/* Modal de Crear/Editar Categoría */}
      {modal.isOpen && (
        <Modal title={modal.type === "create" ? "Nueva Categoría" : "Editar Categoría"} onClose={() => setModal({ isOpen: false })}>
          <CategoryForm onSave={handleSaveCategory} category={modal.type === "edit" ? modal.data : null} />
        </Modal>
      )}
    </div>
  );
};

export default Categories;
