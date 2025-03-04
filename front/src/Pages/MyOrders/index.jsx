import React from "react";
import { Link } from "react-router-dom";
import OrdersCard from "../../Components/OrdersCard";
import { ShoppingCartContext } from "../../Context";

function MyOrders() {

  const { jsonWebToken, setGlobalAlert, order, setOrder } = React.useContext(ShoppingCartContext);

  React.useEffect(async () => {

    try {
      const response = await fetch('http://localhost:3000/api/v1/orders/', {
        headers: {
          'auth-token': jsonWebToken
        }
      });

      const data = await response.json();

      if (response.ok) {
        setOrder(data);
      } else {
        setGlobalAlert({ type: 'error', messages: [data.message], duration: 4000 });
      }
    } catch (error) {
      console.log(error);
      setGlobalAlert({ type: 'error', messages: ['Error getting orders'], duration: 4000 });
    }

  }, []);

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="my-4">
        <h2 className="text-3xl font-bold text-indigo-500">My Orders</h2>
      </div>
      <div className="flex w-full justify-center gap-4 p-4 flex-wrap">
        {order &&
          order.map((order) => (
            <Link key={order.id} to={`/my-order/${order.id}`}
              className="flex justify-center mb-3 bg-indigo-100/10
              rounded-lg w-1/2 min-w-72 max-w-xl p-3 shadow-lg shadow-indigo-300/30 border-2 border-indigo-500
            hover:bg-indigo-50/50">
              <OrdersCard
                id={order.id}
                date={order.date}
                totalPrice={order.totalPrice}
                totalProducts={order.totalProducts} />
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default MyOrders