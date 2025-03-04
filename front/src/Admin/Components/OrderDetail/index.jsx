import React from "react";

const OrderDetail = ({ order }) => {
    if (!order) return <p className="text-gray-500">No hay información disponible</p>;

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-indigo-600">Detalles de la Orden</h3>

            {/* Información del Usuario */}
            <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="text-lg font-semibold">Usuario</h4>
                <p><strong>Nombre:</strong> {order.user?.name}</p>
                <p><strong>Email:</strong> {order.user?.email}</p>
                <p><strong>Teléfono:</strong> {order.user?.phone}</p>
                <p><strong>Dirección:</strong> {order.user?.address}</p>
            </div>

            {/* Información de la Orden */}
            <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="text-lg font-semibold">Orden</h4>
                <p><strong>ID:</strong> {order.id}</p>
                <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Lista de Productos */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold">Productos</h4>
                {order.orderItems && order.orderItems.length > 0 ? (
                    <table className="w-full mt-2 border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-indigo-500 text-white">
                                <th className="p-2 border">Imagen</th>
                                <th className="p-2 border">Producto</th>
                                <th className="p-2 border">Cantidad</th>
                                <th className="p-2 border">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.orderItems.map((item) => (
                                <tr key={item.id} className="border">
                                    <td className="p-2 border">
                                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-md" />
                                    </td>
                                    <td className="p-2 border">{item.product.name}</td>
                                    <td className="p-2 border text-center">{item.quantity}</td>
                                    <td className="p-2 border">${item.product.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No hay productos en esta orden.</p>
                )}
            </div>
        </div>
    );
};

export default OrderDetail;
