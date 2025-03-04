import React, { useState } from "react";

const OrderForm = ({ onSave, users, products }) => {
    const [userId, setUserId] = useState("");
    const [orderItems, setOrderItems] = useState([]);

    const handleAddProduct = (productId) => {
        setOrderItems([...orderItems, { productId, quantity: 1 }]);
    };

    const handleChangeQuantity = (index, quantity) => {
        const updatedItems = [...orderItems];
        updatedItems[index].quantity = quantity;
        setOrderItems(updatedItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ userId, orderItems });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col">
                <span className="text-gray-700">Usuario</span>
                <select className="border rounded-lg px-3 py-2" value={userId} onChange={(e) => setUserId(e.target.value)} required>
                    <option value="">Seleccione un usuario</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </label>

            <label className="flex flex-col">
                <span className="text-gray-700">Productos</span>
                <div className="border rounded-lg p-2">
                    {products.map((product) => (
                        <div key={product.id} className="flex justify-between items-center p-2 border-b">
                            <span>{product.name} - ${product.price}</span>
                            <button type="button" className="bg-indigo-500 text-white px-2 py-1 rounded-lg hover:bg-indigo-600"
                                onClick={() => handleAddProduct(product.id)}>
                                Agregar
                            </button>
                        </div>
                    ))}
                </div>
            </label>

            {orderItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 border-b">
                    <span>Producto ID: {item.productId}</span>
                    <input type="number" min="1" value={item.quantity} className="border rounded-lg px-2 w-16"
                        onChange={(e) => handleChangeQuantity(index, parseInt(e.target.value))} />
                </div>
            ))}

            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
                Guardar Orden
            </button>
        </form>
    );
};

export default OrderForm;
