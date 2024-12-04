import React from "react";
import { ShoppingCartContext } from "../../Context";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const { auth } = React.useContext(ShoppingCartContext);
    if (!auth || Object.entries(auth).length == 0) {
        return <Navigate to='/sign-in' />
    }
    return <Outlet />;
}

export default RequireAuth;