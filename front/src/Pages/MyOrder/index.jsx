import React from "react";
import { Link, useParams } from "react-router-dom";
import OrderCard from "../../Components/OrderCard";
import { totalPriceOrder } from "../../Utils";
import { ShoppingCartContext } from "../../Context";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

function MyOrder() {
    const { id } = useParams();

    const { order, setOrder, setGlobalAlert, jsonWebToken } = React.useContext(ShoppingCartContext);

    React.useEffect(() => {
        if (id) {
            getOrder(id);
        } else {
            getLastOrder();
        }
    }, []);

    const getLastOrder = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/orders/last', {
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
    }

    const getOrder = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/orders/${id}`, {
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
    }

    return (
        <>
            <div className="flex items-center w-80 gap-2 my-6">
                <Link to={'/my-orders'} className="p-0">
                    <ChevronLeftIcon className="h-8 w-8 text-indigo-500" />
                </Link>
                <h1 className="text-lg font-semibold">My Orders</h1>
            </div>
            <div className='flex flex-col w-80 border-2 border-indigo-500 rounded-lg px-4 py-2 shadow-lg shadow-indigo-200'>
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
                                <td>{order.date}</td>
                            </tr>
                            <tr>
                                <td className="font-bold text-indigo-500">Total Products:</td>
                                <td>{order.orderItems && order.orderItems.length}</td>
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
    )
}

export default MyOrder
