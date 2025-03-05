import { NavLink } from "react-router-dom";
import React from "react";
import { ShoppingCartContext } from "../../Context";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
    const { auth,
        setAuth,
        cartCounter,
        updateCartCounter,
        carProducts,
        openCheckoutMenu,
        setCarProducts,
        closeProductDetail,
        closeCheckoutMenu,
        setOrder,
        jsonWebToken,
        setJsonWebToken,
        setGlobalAlert,
        getCategories
    } = React.useContext(ShoppingCartContext);
    const activeStyle = 'underline underline-offset-4';

    React.useEffect(() => {
        updateCartCounter();
    }, [carProducts]);

    const onLogOut = () => {
        setAuth({});
        setCarProducts([]);
        setOrder({});
        closeProductDetail();
        closeCheckoutMenu();
        setJsonWebToken(null);
        localStorage.removeItem('jsonWebToken');
        localStorage.removeItem('auth');
    }

    return (
        <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 font-light text-indigo-500 bg-white shadow-md'>
            <ul className="flex items-center gap-3 ">
                <li className="font-semibold text-lg text-indigo-500">
                    <NavLink to='/'>
                        CriStore
                    </NavLink>
                </li>
            </ul>
            <ul className="flex items-center gap-3">
                {auth && Object.entries(auth).length > 0 &&
                    <>
                        <li className="text-gray-400 font-normal">
                            {auth.email}
                        </li>
                        <li>
                            <NavLink
                                to='/my-orders'
                                className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                                MyOrders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/my-account'
                                className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                                My Account
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                id="logOutLink"
                                to='/sign-in'
                                className={({ isActive }) => (isActive ? activeStyle : undefined)}
                                onClick={() => onLogOut()}>
                                Log Out
                            </NavLink>
                        </li>
                        <li className="flex font-medium">
                            <button className="flex" onClick={() => { openCheckoutMenu() }}>
                                <ShoppingCartIcon className="h-6 w-6" />
                                <p>{cartCounter}</p>
                            </button>
                        </li>
                    </>

                }

                {auth && Object.entries(auth).length > 0 && auth.user.rol.id === 1 &&
                    <li>
                        <NavLink to='/admin' className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-600 transition"
                        >
                            <span className="hidden md:inline">Dashboard</span> {/* Oculta texto en móviles */}
                        </NavLink>
                    </li>
                }

                {!auth || Object.entries(auth).length == 0 &&
                    <>
                        <li>
                            <NavLink
                                to='/sign-in'
                                className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                                Log In
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to='/sign-up'
                                className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                                Sign Up
                            </NavLink>
                        </li>
                    </>
                }
            </ul>
        </nav>
    );

}

export default Navbar;