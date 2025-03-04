import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Modal = ({ title, children, onClose }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
