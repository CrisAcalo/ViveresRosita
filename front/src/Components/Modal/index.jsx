import React from 'react';
import ReactDOM from 'react-dom';
import { ShoppingCartContext } from "../../Context";
import { XMarkIcon } from '@heroicons/react/16/solid';

function Modal(props) {

    const { setOpenModal } = React.useContext(ShoppingCartContext);
    const text = props.title ? props.title : 'Modal Title';

    return ReactDOM.createPortal(
        <>
            <div className="fixed top-0 right-0 w-full h-full z-50 bg-black/30 backdrop-blur-sm">
            </div>
            <div className="fixed top-0 right-0 w-full h-full z-50 flex justify-center items-center">
                <div className="flex flex-col bg-white rounded-lg w-72 md:w-96">
                    <div className="flex px-4 py-2 justify-between border-b-2 border-b-indigo-100">
                        <h3 className='font-bold text-2xl text-indigo-500'>{text}</h3>
                        <button
                            onClick={() => { setOpenModal(false) }}>
                            <XMarkIcon className='h-8 w-8 text-indigo-300' />
                        </button>
                    </div>
                    <div className="p-4">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
        ,
        document.getElementById('modal')
    );
}

export { Modal };