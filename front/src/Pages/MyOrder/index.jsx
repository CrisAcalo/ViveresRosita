import React from "react";
import { Link, useParams } from "react-router-dom";
import OrderCard from "../../Components/OrderCard";
import { ShoppingCartContext } from "../../Context";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

function MyOrder() {
    const { id } = useParams();

    const { order } = React.useContext(ShoppingCartContext);
    const orderToShow = id ? order.filter(order => order.id === id)[0] : order.slice(-1)[0];
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
                            <th colspan="2">Details</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-bold text-indigo-500">ID:</td>
                                <td className="font-light text-sm">{orderToShow.id}</td>
                            </tr>
                            <tr>
                                <td className="font-bold text-indigo-500">Date:</td>
                                <td>{orderToShow.date}</td>
                            </tr>
                            <tr>
                                <td className="font-bold text-indigo-500">Total Products:</td>
                                <td>{orderToShow.totalProducts}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-indigo-500 my-3">Products</h3>
                    {order.length > 0 &&
                        orderToShow.products.map(product =>
                        (<OrderCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            imgUrl={product.images[0]}
                            price={product.price}
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
                            ${orderToShow.totalPrice}
                        </span>
                    </p>
                </div>

            </div>
        </>
    )
}

export default MyOrder
