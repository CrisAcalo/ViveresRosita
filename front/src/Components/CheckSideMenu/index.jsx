import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context'
import { XMarkIcon } from '@heroicons/react/24/solid';
import OrderCard from '../OrderCard';
import { totalPrice } from '../../Utils';
import { createOrder } from '../../api/ordersApi';
import './style.css'

const CheckoutSideMenu = () => {
    const {
        closeCheckoutMenu,
        checkoutMenuStatus,
        carProducts,
        setCarProducts,
        setGlobalAlert,
        auth } = React.useContext(ShoppingCartContext);


    const navigate = useNavigate();

    const newOrder = async () => {
        try {
            const orderToAdd = {
                userId: auth.user.id,
                orderItems: [
                    ...carProducts.map(product => ({
                        productId: product.id,
                        quantity: 1
                    }))
                ]
            }
            const response = await createOrder(orderToAdd);

            setCarProducts([]);
            closeCheckoutMenu();
            navigate('/my-order/last');
            setGlobalAlert({ type: 'success', messages: ['Order added successfully'], duration: 4000 });

        } catch (error) {
            console.log(error);
            setGlobalAlert({ type: 'error', messages: error, duration: 4000 });
        }
    }

    return (
        <aside
            className={
                `${checkoutMenuStatus ? 'right-0' : 'right--full'}
            checkout-side-menu w-full flex flex-col bg-white fixed shadow-lg 
            shadow-gray-900/20 border-0 rounded-lg
            ease-linear duration-100`}
        >
            <div className='flex justify-between items-center'>
                <h2 className='text-lg font-semibold p-4'>My order</h2>
                <button className='m-2 text-gray-500 hover:rotate-90 hover:text-indigo-500 ease-linear duration-100 '
                    onClick={closeCheckoutMenu}>
                    <XMarkIcon className='h-8 w-8' />
                </button>
            </div>
            <div className='flex flex-col px-4 overflow-y-scroll flex-1'>
                {
                    carProducts.map(product =>
                    (<OrderCard
                        key={product.id}
                        id={product.id}
                        title={product.name}
                        imgUrl={product.image}
                        price={product.price}
                        allowDelete={true}
                    />)
                    )
                }
            </div>
            <div className='bottom-0 flex flex-col w-full border-t border-indigo-500'>
                <div className='px-4 py-2'>
                    <p className='flex gap-2 justify-between items-center text-lg'>
                        <span className='font-medium text-indigo-500'>
                            Total Price:
                        </span>
                        <span className='font-bold text-xl'>
                            ${totalPrice(carProducts)}
                        </span>
                    </p>
                </div>
            </div>
            <button className='bg-indigo-500 text-white w-full h-12 rounded-b-lg font-bold text-lg'
                onClick={() => newOrder()}>
                Checkout
            </button>
        </aside>
    )
}

export default CheckoutSideMenu;