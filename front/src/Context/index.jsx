import React from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { config } from "../../config/config";

const ShoppingCartContext = React.createContext();

const ShoppingCartProvider = ({ children }) => {

    //Manejar jsonWebToken en localstorage
    const {
        item: jsonWebToken,
        updateStorageItem: setJsonWebToken } = useLocalStorage('jsonWebToken', null);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const {
        item: users,
        updateStorageItem: setUsers } = useLocalStorage('users', []);

    const {
        item: auth,
        updateStorageItem: setAuth } = useLocalStorage('auth', {});

    const [globalAlert, setGlobalAlert] = React.useState({ type: '', messages: [], duration: null });

    //Shopping cart - contador del carrito de compra
    const [cartCounter, setCartCounter] = React.useState(0);
    //Shopping cart -Car Status
    const [carProducts, setCarProducts] = React.useState([]);
    //Product car - functions
    const updateCartCounter = () => {
        setCartCounter(carProducts.length);
    };

    //Product Detail - estado del detalle del producto (open/closed)
    const [productDetailStatus, setproductDetailStatus] = React.useState(false);
    //Product Detail - producto seleccionado para mostrar detalle
    const [productToShow, setProductToShow] = React.useState({});
    //Product Detail - functions
    const openProductDetail = () => {
        setproductDetailStatus(true);
        checkoutMenuStatus ? closeCheckoutMenu() : null;
    }
    const closeProductDetail = () => { setproductDetailStatus(false); }

    //Checkout - estado del detalle de la orden (open/closed)
    const [checkoutMenuStatus, setCheckoutMenuStatus] = React.useState(false);
    //Checkout - functions
    const openCheckoutMenu = () => {
        setCheckoutMenuStatus(true);
        productDetailStatus ? closeProductDetail() : null;
    }
    const closeCheckoutMenu = () => { setCheckoutMenuStatus(false); }
    const deleteProductFromCart = (id) => {
        setCarProducts(carProducts.filter(product => product.id != id));
    }
    //Checkout - Order
    const [order, setOrder] = React.useState([]);

    //All Orders
    const [orders, setOrders] = React.useState([]);

    //Status to search by title
    const [searchByTitle, setSearchByTitle] = React.useState('');

    //items - de la API
    const [items, setItems] = React.useState(null);
    //items - filtrados por busqueda de titulo
    const [filteredItems, setFilteredItems] = React.useState(null);

    //estado de categoria para filtrar productos en el Home
    const [categoryId, setCategoryId] = React.useState(0);

    //MODAL
    const [openModal, setOpenModal] = React.useState(false);

    React.useEffect(() => {
        try {
            fetch(`${config.domain}/api/v1/products?categoryId=${categoryId}`)
                .then((res) => res.json())
                .then((data) => { setItems(data); });
        } catch (error) {
            console.log('Error:', error);
        }
        return () => {
            setSearchByTitle('');
        }
    }, [categoryId]);

    React.useEffect(() => {
        if (items && searchByTitle) {
            const filteredItems = items.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchByTitle.toLowerCase()));
            setFilteredItems(filteredItems);
        } else {
            setFilteredItems(null);
        }
    }, [items, searchByTitle]);

    const logIn = async () => {
        try {
            const response = await fetch(`${config.domain}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setJsonWebToken(data.data.token);

                setGlobalAlert({ type: 'success', messages: ['Login successful'], duration: 4000 });
            } else {
                setGlobalAlert({ type: 'error', messages: [data.message], duration: 4000 });
            }
        } catch (error) {
            setGlobalAlert({ type: 'error', messages: ['Login failed'], duration: 4000 });
        }
    }


    //Desencriptar el jsonwebtoken
    React.useEffect(() => {
        if (jsonWebToken) {
            const payload = JSON.parse(atob(jsonWebToken.split('.')[1]));
            setAuth({ isAuthenticated: true, user: payload });
        }
    }, [jsonWebToken]);

    const [categories, setCategories] = React.useState([]);
    const getCategories = async () => {
        try {
            const response = await fetch(`${config.domain}/api/v1/categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': jsonWebToken
                }
            });

            const data = await response.json();

            if (response.ok) {
                setCategories(data);
            } else {
                setGlobalAlert({ type: 'error', messages: [data.message], duration: 4000 });
            }
        } catch (error) {
            setGlobalAlert({ type: 'error', messages: ['Error getting categories'], duration: 4000 });
        }
    }

    React.useEffect(() => {
        getCategories();
    }, []);

    return (
        <ShoppingCartContext.Provider value={{
            globalAlert,
            setGlobalAlert,
            updateCartCounter,
            cartCounter,
            setCartCounter,
            productDetailStatus,
            openProductDetail,
            closeProductDetail,
            productToShow,
            setProductToShow,
            carProducts,
            setCarProducts,
            checkoutMenuStatus,
            setCheckoutMenuStatus,
            openCheckoutMenu,
            closeCheckoutMenu,
            deleteProductFromCart,
            order,
            setOrder,
            searchByTitle,
            setSearchByTitle,
            items,
            setItems,
            filteredItems,
            setFilteredItems,
            categoryId,
            setCategoryId,
            users,
            setUsers,
            auth,
            setAuth,
            openModal,
            setOpenModal,
            logIn,
            email,
            setEmail,
            password,
            setPassword,
            jsonWebToken,
            setJsonWebToken,
            categories,
            getCategories,
            orders,
            setOrders
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export { ShoppingCartProvider, ShoppingCartContext }