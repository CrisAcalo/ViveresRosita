import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { Modal } from "../../Components/Modal";
import { ChevronRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import { updateUser, deleteUser } from "../../api/usersApi"; // API centralizada

function MyAccount() {
    const navigate = useNavigate();
    const { auth,
        setAuth,
        setGlobalAlert,
        openModal,
        setOpenModal,
        jsonWebToken,
        setCarProducts,
        closeProductDetail,
        closeCheckoutMenu,
        setJsonWebToken,
        setOrder
    } = useContext(ShoppingCartContext);

    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [accordionStatus, setAccordionStatus] = useState(false);

    useEffect(() => {
        setNewEmail(auth?.user?.email || '');
    }, [auth]);

    const onUpdate = async () => {
        if (!currentPassword) {
            setGlobalAlert({ type: "error", messages: ["Se requiere contraseña actual"], duration: 3000 });
            return;
        }

        if (newPassword && newPassword !== newPasswordConfirm) {
            setGlobalAlert({ type: "error", messages: ["Las contraseñas no coinciden"], duration: 3000 });
            return;
        }

        try {
            const updatedUser = await updateUser(auth.user.id, {
                email: newEmail,
                password: newPassword || undefined
            });

            if (updatedUser) {
                setAuth({ isAuthenticated: true, user: updatedUser.data });
                setCurrentPassword('');
                setNewPassword('');
                setNewPasswordConfirm('');
                setGlobalAlert({ type: "success", messages: ["Datos actualizados"], duration: 3000 });
            }
        } catch (error) {
            setGlobalAlert({ type: "error", messages: [error.message], duration: 3000 });
        }
    };

    const onDelete = async () => {
        try {

            setAuth({});
            setCarProducts([]);
            setOrder({});
            closeProductDetail();
            closeCheckoutMenu();
            setJsonWebToken(null);
            localStorage.removeItem('jsonWebToken');
            localStorage.removeItem('auth');

            await deleteUser(auth.user.id, jsonWebToken);
            setOpenModal(false);
            setGlobalAlert({ type: "success", messages: ["Cuenta eliminada"], duration: 3000 });
            navigate("/sign-in");
        } catch (error) {
            setGlobalAlert({ type: "error", messages: [error.message], duration: 3000 });
        }
    };

    return (
        <>
            {openModal && (
                <Modal title="¡CUIDADO!">
                    <p className="text-red-500 font-semibold">
                        Si eliminas tu cuenta, toda la información será borrada permanentemente.
                    </p>
                    <div className="flex justify-around mt-4">
                        <button
                            className="rounded-lg px-2 py-1 bg-red-100 text-red-500 border-2 border-red-500 font-bold text-md"
                            onClick={onDelete}
                        >
                            Confirmar
                        </button>
                        <button
                            className="rounded-lg px-2 py-1 bg-indigo-100 text-indigo-500 border-2 border-indigo-500 font-bold text-md shadow-md shadow-indigo-400/50"
                            onClick={() => setOpenModal(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </Modal>
            )}

            <div className="w-full flex flex-col justify-center items-center">
                <div className="border-2 border-indigo-500 rounded-lg p-4 shadow-lg shadow-indigo-400/50 w-72 md:w-96">
                    <h1 className="text-4xl font-bold text-indigo-500 text-center">Mi Cuenta</h1>
                    <form className="flex flex-col gap-4 mt-4">
                        <label className="flex flex-col gap-1">
                            <span className="text-indigo-500 text-lg">Email</span>
                            <p className="border-2 bg-indigo-100 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30">
                                {auth?.user?.email}
                            </p>
                        </label>
                    </form>
                </div>

                {/* Opciones Avanzadas */}
                <div className="w-72 md:w-96 mt-4">
                    <div
                        className={`flex justify-between items-center border-2 border-indigo-500 bg-indigo-500 
                        text-white px-4 py-2 cursor-pointer ${accordionStatus ? "rounded-t-lg" : "rounded-lg"}`}
                        onClick={() => setAccordionStatus(!accordionStatus)}
                    >
                        <p className="text-center">Opciones Avanzadas</p>
                        <ChevronRightIcon className={`w-6 h-6 ${accordionStatus ? "rotate-90" : ""} ease-linear duration-75`} />
                    </div>
                    {accordionStatus && (
                        <div className="border-2 border-indigo-200 rounded-b-lg p-4">
                            <form className="flex flex-col gap-2">
                                <h1 className="text-lg font-bold text-indigo-500 m-0 p-0 text-center">Actualizar Datos</h1>
                                <label className="flex flex-col gap-1">
                                    <span className="text-indigo-500 text-lg">Contraseña Actual</span>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="border-2 bg-indigo-100 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30"
                                    />
                                </label>
                                <label className="flex flex-col gap-1">
                                    <span className="text-indigo-500 text-lg">Nuevo Email</span>
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        className="border-2 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30"
                                    />
                                </label>
                                <label className="flex flex-col gap-1">
                                    <span className="text-indigo-500 text-lg">Nueva Contraseña</span>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="border-2 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30"
                                    />
                                </label>
                                <label className="flex flex-col gap-1">
                                    <span className="text-indigo-500 text-lg">Confirmar Contraseña</span>
                                    <input
                                        type="password"
                                        value={newPasswordConfirm}
                                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                                        className="border-2 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30"
                                    />
                                </label>
                                <button
                                    type="button"
                                    onClick={onUpdate}
                                    className="bg-indigo-500 text-white rounded-lg p-2 font-bold"
                                >
                                    Guardar
                                </button>
                            </form>

                            <div className="flex flex-col">
                                <h1 className="text-lg font-bold text-red-500 m-0 p-0 text-center my-4">Eliminar Cuenta</h1>
                                <button
                                    className="bg-red-500 text-white rounded-lg p-1 flex justify-between gap-2 w-max"
                                    onClick={() => setOpenModal(true)}
                                >
                                    <TrashIcon className="w-4 h-6" />
                                    Eliminar Cuenta
                                </button>
                                <p className="text-red-400 font-semibold mt-3">
                                    ¡Cuidado! Esta acción es irreversible.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default MyAccount;
