import React from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { config } from "../../config/config";
import { login } from "../api/authApi";
import { getCategories as fetchCategories } from "../api/categoriesApi";
import { getProductsByCategory } from "../api/productsApi";

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
        if (items && searchByTitle) {
            const filteredItems = items.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchByTitle.toLowerCase()));
            setFilteredItems(filteredItems);
        } else {
            setFilteredItems(null);
        }
    }, [items, searchByTitle]);

    // Función para login
    const logIn = async (email, password) => {
        try {
            const data = await login({ email, password });

            setJsonWebToken(data.data.token);
            const payload = JSON.parse(atob(data.data.token.split('.')[1]));
            setAuth({ isAuthenticated: true, user: payload });
            // setAuth({ isAuthenticated: true, user: data.data.user });
            setGlobalAlert({ type: "success", messages: ["Login successful"], duration: 4000 });
        } catch (error) {
            setGlobalAlert({ type: "error", messages: error, duration: 4000 });
        }
    };

    const [categories, setCategories] = React.useState([]);
    // Cargar categorías desde API
    const getCategories = async () => {
        try {
            const data = await fetchCategories();
            setCategories(data);
        } catch (error) {
            setGlobalAlert({
                type: "error",
                messages: error,
                duration: 4000
            });
        }
    };

    React.useEffect(() => {
        if (jsonWebToken) {
            getCategories();
        }
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