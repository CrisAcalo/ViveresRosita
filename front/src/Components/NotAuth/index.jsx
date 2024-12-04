import React from "react";
import { ShoppingCartContext } from "../../Context";
import { Navigate, Outlet } from "react-router-dom";
const NotAuth = () => {
    const { auth } = React.useContext(ShoppingCartContext);
    if (Object.entries(auth).length > 0) {
        return <Navigate to='/' />
    }
    return <Outlet />;
}

export default NotAuth;