import React, { useState } from "react";

const CategoryForm = ({ onSave, category }) => {
  const [name, setName] = useState(category?.name || "");
  const [image, setImage] = useState(category?.image || "");
  const [description, setDescription] = useState(category?.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, image, description });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col">
        <span className="text-gray-700">Nombre</span>
        <input
          type="text"
          className="border rounded-lg px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="flex flex-col">
        <span className="text-gray-700">Imagen (URL)</span>
        <input
          type="text"
          className="border rounded-lg px-3 py-2"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </label>

      <label className="flex flex-col">
        <span className="text-gray-700">Descripción</span>
        <textarea
          className="border rounded-lg px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>

      <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
        Guardar
      </button>
    </form>
  );
};

export default CategoryForm;
