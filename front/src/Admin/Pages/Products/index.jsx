import React, { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../../api/productsApi";
import { getCategories } from "../../../api/categoriesApi";
import { useAdminUI } from "../../Context/AdminUIContext";
import Table from "../../Components/Table";
import Modal from "../../Components/Modal";
import ProductForm from "../../Components/Forms/ProductForm";

const Products = () => {
    const { modal, setModal, setGlobalAlert } = useAdminUI();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // Cargar productos y categorías al iniciar
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            setGlobalAlert({ type: "error", messages: [error.message || "Error al obtener productos"] });
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            setGlobalAlert({ type: "error", messages: [error.message || "Error al obtener categorías"] });
        }
    };

    // Crear o editar un producto
    const handleSaveProduct = async (productData) => {
        try {
            if (modal.type === "create") {
                await createProduct(productData);
                setGlobalAlert({ type: "success", messages: ["Producto creado exitosamente"] });
            } else if (modal.type === "edit") {
                await updateProduct(modal.data.id, productData);
                setGlobalAlert({ type: "success", messages: ["Producto actualizado exitosamente"] });
            }
            fetchProducts();
            setModal({ isOpen: false });
        } catch (error) {
            setGlobalAlert({ type: "error", messages: [error.message || "Error al guardar el producto"] });
        }
    };

    // Eliminar un producto
    const handleDeleteProduct = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este producto?")) {
            try {
                await deleteProduct(id);
                setGlobalAlert({ type: "success", messages: ["Producto eliminado exitosamente"] });
                fetchProducts();
            } catch (error) {
                setGlobalAlert({ type: "error", messages: [error.message || "Error al eliminar el producto"] });
            }
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Gestión de Productos</h2>

            {/* Botón para abrir el modal de creación */}
            <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-indigo-600"
                onClick={() => setModal({ isOpen: true, type: "create" })}
            >
                + Agregar Producto
            </button>

            {/* Tabla de Productos */}
            <Table
                headers={["Imagen", "Nombre", "Descripción", "Precio", "Stock", "Categoría", "Acciones"]}
                data={products.map((product) => [
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-md object-cover" />,
                    product.name,
                    product.description,
                    `$${product.price}`,
                    product.stock,
                    categories.find((cat) => cat.id === product.categoryId)?.name || "N/A",
                    <div key={product.id} className="flex gap-2">
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                            onClick={() => setModal({ isOpen: true, type: "edit", data: product })}
                        >
                            Editar
                        </button>
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={() => handleDeleteProduct(product.id)}
                        >
                            Eliminar
                        </button>
                    </div>,
                ])}
            />

            {/* Modal de Crear/Editar Producto */}
            {modal.isOpen && (
                <Modal title={modal.type === "create" ? "Nuevo Producto" : "Editar Producto"} onClose={() => setModal({ isOpen: false })}>
                    <ProductForm onSave={handleSaveProduct} product={modal.type === "edit" ? modal.data : null} categories={categories} />
                </Modal>
            )}
        </div>
    );
};

export default Products;
