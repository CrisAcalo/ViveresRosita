import React from 'react';
import { ShoppingCartContext } from '../../Context'
import { XMarkIcon } from '@heroicons/react/24/solid';
import './style.css'

const ProductDetail = () => {
    const { closeProductDetail, productDetailStatus, productToShow } = React.useContext(ShoppingCartContext);

    return (
        <aside
            className={
                `${productDetailStatus ? 'right-0' : 'right--full'}
            product-detail w-full flex flex-col bg-white fixed shadow-lg 
            shadow-gray-900/20 border border-gray-200 rounded-lg
            ease-linear duration-100`}
        >
            <div className='flex justify-between items-center'>
                <h2 className='text-lg font-semibold p-4'>Product Detail</h2>
                <button className='m-2 text-gray-500 hover:rotate-90 hover:text-indigo-500 ease-linear duration-100 '
                    onClick={closeProductDetail}>
                    <XMarkIcon className='h-8 w-8' />
                </button>
            </div>
            <figure>
                <img
                    className='object-cover w-full h-80'
                    src={productToShow.images ? productToShow.images[0] : ''}
                    alt={productToShow.title} />
                <figcaption className='p-4'>
                    <p className='text-lg font-bold text-indigo-500'>${productToShow.price}</p>
                    <h3 className='text-lg font-semibold'>{productToShow.title}</h3>
                    <p className='text-sm font-light text-justify'>{productToShow.description}</p>
                </figcaption>
            </figure>
        </aside>
    )
}

export default ProductDetail;