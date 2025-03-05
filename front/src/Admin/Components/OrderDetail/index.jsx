import React, { useState } from "react";

const OrderDetail = ({ onUpdate, order }) => {
    const [status, setStatus] = useState(order.state);
    const [showCarrierInfo, setShowCarrierInfo] = useState(false);

    const handleStatusChange = async (newStatus) => {
        onUpdate(order.id, newStatus);
        setStatus(newStatus);
    };

    const handleCancelOrder = async () => {
        if (window.confirm("¿Estás seguro de cancelar este pedido? Esta acción no se puede revertir.")) {
            onUpdate(order.id, "Cancelado");
            setStatus("Cancelado");
        }
    };

    if (!order) return <p className="text-gray-500">No hay información disponible</p>;

    return (
        <div className="space-y-4 relative">
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
            <div className="bg-gray-100 p-4 rounded-lg relative">
                <h4 className="text-lg font-semibold">Orden</h4>
                <p><strong>ID:</strong> {order.id}</p>
                <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

                {/* Información del Transportista con Tooltip */}
                <p>
                    <strong>Transportista:</strong>{" "}
                    {order.carrier ? (
                        <span
                            className="text-blue-600 cursor-pointer underline relative"
                            onMouseEnter={() => setShowCarrierInfo(true)}
                            onMouseLeave={() => setShowCarrierInfo(false)}
                        >
                            {order.carrier.name}
                            {showCarrierInfo && (
                                <div className="absolute left-0 top-[19px] w-64 bg-white p-3 border rounded-lg shadow-lg z-50"
                                    onMouseEnter={() => setShowCarrierInfo(true)}
                                    onMouseLeave={() => setShowCarrierInfo(false)}
                                >
                                    <h4 className="text-lg font-bold">{order.carrier.name}</h4>
                                    <p><strong>País:</strong> {order.carrier.country}</p>
                                    <p><strong>Teléfono:</strong> {order.carrier.phone}</p>
                                    <p><strong>Sitio web:</strong> <a href={order.carrier.website} target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline">Ver más</a></p>
                                </div>
                            )}
                        </span>
                    ) : (
                        <span className="text-gray-500">No asignado</span>
                    )}
                </p>

                {/* Selector de Estado */}
                <div className="mt-2">
                    <label className="font-bold">Estado del Pedido:</label>
                    {status !== "Cancelado" && status !== "Entregado" && (
                        <select
                            disabled={status === "Cancelado" || status === "Entregado"}
                            value={status}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full bg-white mt-1"
                        >
                            <option value="Pendiente">Pendiente</option>
                            <option value="Enviado">Enviado</option>
                            <option value="Entregado">Entregado</option>
                        </select>
                    )}
                    {status === "Cancelado" && (
                        <p className="text-red-500 font-extrabold">Pedido Cancelado</p>
                    )}
                    {status === "Entregado" && (
                        <p className="text-green-500 font-extrabold">Pedido Entregado</p>
                    )}
                </div>
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

            {/* Botón para Cancelar Pedido */}
            {
                status === "Pendiente" && (
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full"
                        onClick={handleCancelOrder}
                    >
                        Cancelar Pedido
                    </button>
                )
            }
        </div >
    );
};

export default OrderDetail;
