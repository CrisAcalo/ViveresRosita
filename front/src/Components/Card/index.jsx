import React from "react";
import { ShoppingCartContext } from "../../Context";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/solid";

const Card = (data) => {
    const { updateCartCounter,
        openProductDetail,
        setProductToShow,
        carProducts,
        setCarProducts,
        openCheckoutMenu,
        deleteProductFromCart
    } = React.useContext(ShoppingCartContext);

    const onClickCard = (product) => {
        openProductDetail();
        setProductToShow(product);
    }

    const addProductsToCart = (e, productData) => {
        e.stopPropagation();
        openCheckoutMenu();
        if (!isProductInCart) {
            setCarProducts((carProducts) => [...carProducts, productData]);
        } else {
            deleteProductFromCart(productData.id);
        }
    }

    const [isProductInCart, setIsProductInCart] = React.useState(false);

    React.useEffect(() => {
        carProducts.find((product) => product.id === data.data.id)
            ? setIsProductInCart(true) : setIsProductInCart(false);

        
    }, [carProducts]);

    return (
        <div className='
        bg-white cursor-pointer w-56 h-max rounded-lg shadow-lg border
        shadow-gray-900/10 hover:shadow-indigo-500/30 ease-in duration-100'
            onClick={() => onClickCard(data.data)}>
            <figure className='relative mb-2 w-full h-4/5'>
                <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-2'>
                    {data.data.category.name}
                </span>
                <img
                    className="object-cover w-full h-full rounded-lg"
                    src={data.data.image}
                    alt={data.data.name} />

                <button className={`
                    absolute top-0 right-0 flex justify-center items-center
                    w-8 h-8 rounded-full m-2 p-1
                    ${isProductInCart ? 'text-white bg-indigo-800' : 'text-indigo-500 bg-white'}`}
                    onClick={(e) => { addProductsToCart(e, data.data) }}
                >
                    {isProductInCart ? <CheckIcon className="h-6 w-6" /> : <PlusIcon className="h-6 w-6" />}
                </button>
            </figure>
            <p className="flex justify-between px-4 mb-2">
                <span
                    className="text-sm font-light">
                    {data.data.name}
                </span>
                <span
                    className="text-sm font-semibold text-indigo-500">
                    ${data.data.price}
                </span>
            </p>
        </div>
    );
}

export default Card;