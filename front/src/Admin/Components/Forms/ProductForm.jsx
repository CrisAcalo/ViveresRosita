import React, { useState } from "react";

const ProductForm = ({ onSave, product, categories }) => {
    const [name, setName] = useState(product?.name || "");
    const [description, setDescription] = useState(product?.description || "");
    const [price, setPrice] = useState(product?.price || "");
    const [stock, setStock] = useState(product?.stock || "");
    const [image, setImage] = useState(product?.image || "");
    const [categoryId, setCategoryId] = useState(product?.categoryId || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, description, price, stock, image, categoryId });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col">
                <span className="text-gray-700">Nombre</span>
                <input type="text" className="border rounded-lg px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>

            <label className="flex flex-col">
                <span className="text-gray-700">Descripción</span>
                <textarea className="border rounded-lg px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>

            <label className="flex flex-col">
                <span className="text-gray-700">Precio</span>
                <input type="number" className="border rounded-lg px-3 py-2" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </label>

            <label className="flex flex-col">
                <span className="text-gray-700">Stock</span>
                <input type="number" className="border rounded-lg px-3 py-2" value={stock} onChange={(e) => setStock(e.target.value)} required />
            </label>

            <label className="flex flex-col">
                <span className="text-gray-700">Imagen (URL)</span>
                <input type="text" className="border rounded-lg px-3 py-2" value={image} onChange={(e) => setImage(e.target.value)} required />
            </label>

            <label className="flex flex-col">
                <span className="text-gray-700">Categoría</span>
                <select className="border rounded-lg px-3 py-2" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    <option value="">Seleccione una categoría</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </label>

            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
                Guardar
            </button>
        </form>
    );
};

export default ProductForm;
