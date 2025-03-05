import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import OrdersCard from "../../Components/OrdersCard";
import { ShoppingCartContext } from "../../Context";
import { getOrders } from "../../api/ordersApi"; // Importamos la API centralizada

function MyOrders() {
  const { jsonWebToken, setGlobalAlert } = useContext(ShoppingCartContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders(jsonWebToken);
      if (data) {
        setOrders(data);
      } else {
        throw new Error("No se encontraron órdenes.");
      }
    } catch (error) {
      setGlobalAlert({ type: "error", messages: [error.message], duration: 4000 });
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="my-4">
        <h2 className="text-3xl font-bold text-indigo-500">My Orders</h2>
      </div>
      <div className="flex w-full justify-center gap-4 p-4 flex-wrap">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Link
              key={order.id}
              to={`/my-order/${order.id}`}
              className="flex justify-center mb-3 bg-indigo-100/10
                rounded-lg w-1/2 min-w-72 max-w-xl p-3 shadow-lg shadow-indigo-300/30 border-2 border-indigo-500
                hover:bg-indigo-50/50"
            >
              <OrdersCard
                id={order.id}
                date={new Date(order.createdAt).toLocaleDateString()}
                totalPrice={order.orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}
                totalProducts={order.orderItems.length}
                state={order.state} // Nuevo: Agregar estado
                carrier={order.carrier?.name || "No asignado"} // Nuevo: Mostrar transportista
              />
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No tienes órdenes registradas.</p>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
