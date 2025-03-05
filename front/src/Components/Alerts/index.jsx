import React, { useEffect } from "react";
import { ShoppingCartContext } from "../../Context";

const Alerts = (props) => {
    const styles = {
        success: 'border-green-500 text-green-500 bg-green-100',
        error: 'border-red-500 text-red-500 bg-red-100',
        warning: 'border-yellow-500 text-yellow-500 bg-yellow-100',
        info: 'border-blue-500 text-blue-500 bg-blue-100'
    };

    const { globalAlert, setGlobalAlert } = React.useContext(ShoppingCartContext);
    let duration = globalAlert.duration || 4000;

    useEffect(() => {
        const timer = setTimeout(() => setGlobalAlert(null), duration);
        return () => clearTimeout(timer);
    }, [duration, setGlobalAlert]);

    return (
        <div className={`relative border-2 font-bold rounded-lg p-4 w-72 md:w-96 mb-4 ${styles[props.type]}`}>
            {/* Botón para cerrar alerta */}
            <button
                className="absolute top-2 right-2"
                onClick={() => setGlobalAlert(null)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm5 11.414l-1.414 1.414L10 11.414 6.414 15 5 13.586 8.586 10 5 6.414 6.414 5 10 8.586 13.586 5 15 6.414 11.414 10 15 13.586 13.586 15 10 11.414z" clipRule="evenodd" />
                </svg>
            </button>

            {props.messages.map((message, index) => (
                <p className="block" key={index}>{message}</p>
            ))}

            {/* Barra de progreso en la parte inferior */}
            <div
                className="absolute bottom-0 left-0 h-1 bg-current transition-all"
                style={{ width: "100%", animation: `progress ${duration}ms linear forwards` }}
            ></div>

            {/* Agregar la animación CSS */}
            <style>
                {`
                    @keyframes progress {
                        from { width: 100%; }
                        to { width: 0%; }
                    }
                `}
            </style>
        </div>
    );
}

export default Alerts;
