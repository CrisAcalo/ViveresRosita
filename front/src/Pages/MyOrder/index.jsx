import React from "react";
import { Link, useParams } from "react-router-dom";
import OrderCard from "../../Components/OrderCard";
import { totalPriceOrder } from "../../Utils";
import { ShoppingCartContext } from "../../Context";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { getOrderById, getLastOrder } from "../../api/ordersApi"; // Importamos la API centralizada

function MyOrder() {
    const { id } = useParams();
    const { order, setOrder, setGlobalAlert, jsonWebToken } = React.useContext(ShoppingCartContext);
    const [showCarrierInfo, setShowCarrierInfo] = React.useState(false);

    React.useEffect(() => {
        if (id) {
            fetchOrder(id);
        } else {
            fetchLastOrder();
        }
    }, []);

    const fetchLastOrder = async () => {
        try {
            const data = await getLastOrder(jsonWebToken);
            setOrder(data);
        } catch (error) {
            setGlobalAlert({ type: "error", messages: [error.message], duration: 4000 });
        }
    };

    const fetchOrder = async (id) => {
        try {
            const data = await getOrderById(id, jsonWebToken);
            setOrder(data);
        } catch (error) {
            setGlobalAlert({ type: "error", messages: [error.message], duration: 4000 });
        }
    };

    return (
        <>
            <div className="flex items-center w-80 gap-2 my-6">
                <Link to={'/my-orders'} className="p-0">
                    <ChevronLeftIcon className="h-8 w-8 text-indigo-500" />
                </Link>
                <h1 className="text-lg font-semibold">My Orders</h1>
            </div>
            <div className='flex flex-col w-80 sm:w-1/2 lg:w-2/5 xl:w-1/3 border-2 border-indigo-500 rounded-lg px-4 py-2 shadow-lg shadow-indigo-200'>
                <div className="w-full">
                    <table className="w-full">
                        <thead className="text-xl text-indigo-500">
                            <tr>
                                <th colSpan="2">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-bold text-indigo-500">ID:</td>
                                <td className="font-light text-sm">{order.id}</td>
                            </tr>
                            <tr>
                                <td className="font-bold text-indigo-500">Date:</td>
                                <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</td>
                            </tr>
                            <tr>
                                <td className="font-bold text-indigo-500">Total Products:</td>
                                <td>{order.orderItems?.length || 0}</td>
                            </tr>
                            <tr>
                                <td className="font-bold text-indigo-500">State:</td>
                                <td className={`font-bold ${order.state === "Cancelado" ? "text-red-500" : "text-green-500"}`}>
                                    {order.state || "N/A"}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-bold text-indigo-500">Carrier:</td>
                                <td>
                                    {order.carrier ? (
                                        <span href={order.carrier.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 cursor-pointer underline relative"

                                            onMouseEnter={() => setShowCarrierInfo(true)}
                                            onMouseLeave={() => setShowCarrierInfo(false)}>
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
                                        "No asignado"
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-indigo-500 my-3">Products</h3>
                    {order.orderItems && order.orderItems.length > 0 &&
                        order.orderItems.map(item =>
                        (<OrderCard
                            key={item.id}
                            id={item.id}
                            title={item.product.name}
                            imgUrl={item.product.image}
                            price={item.product.price}
                            allowDelete={false}
                        />)
                        )
                    }
                </div>

                <div className='px-4 py-2'>
                    <p className='flex gap-2 justify-between items-center text-lg'>
                        <span className='font-bold text-indigo-500'>
                            Total Price:
                        </span>
                        <span className='font-bold text-xl'>
                            ${order.orderItems && totalPriceOrder(order.orderItems)}
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
}

export default MyOrder;
