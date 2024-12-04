import React from 'react';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ShoppingCartContext } from '../../Context';

const OrderCard = (props) => {
    const { id, title, imgUrl, price, allowDelete } = props;
    const { deleteProductFromCart } = React.useContext(ShoppingCartContext);
    const trashButtonOnClick = () => {
        deleteProductFromCart(id);
    };

    return (
        <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center gap-2'>
                <figure className='w-20 h-20'>
                    <img className='w-full h-full rounded-lg object-cover' src={imgUrl} alt={title} />
                </figure>
                <p className='text-sm font-light w-36'>{title}</p>
            </div>
            <div className='flex items-center gap-2'>
                <p className='text-indigo-500 text-lg font-semibold'>${price}</p>
                {
                    allowDelete &&
                    <button className='m-2 text-gray-500 hover:rotate-90 hover:animate-wiggle hover:text-red-500 ease-linear duration-100'
                        onClick={() => { trashButtonOnClick(id) }}>
                        <TrashIcon className='h-6 w-6' />
                    </button>
                }
            </div>
        </div>
    );
}

export default OrderCard;