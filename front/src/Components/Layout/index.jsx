import React, { useEffect, useState } from "react";
import { ShoppingCartContext } from "../../Context";
import Alerts from "../Alerts";

const Layout = (props) => {
    const { globalAlert } = React.useContext(ShoppingCartContext);
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        setShowAlert(true);
        if (globalAlert && globalAlert.duration) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, globalAlert.duration);

            return () => clearTimeout(timer); // Cleanup the timer on component unmount
        }
    }, [globalAlert]);

    return (
        <div className="flex flex-col items-center mt-20">
            {globalAlert && globalAlert.messages.length > 0 && showAlert &&
                <Alerts type={globalAlert.type} messages={globalAlert.messages}>
                    {
                        globalAlert.messages.map((message, index) => (
                            <p key={index}>{message}</p>
                        ))
                    }
                </Alerts>
            }
            {props.children}
        </div>
    );
}

export default Layout;
