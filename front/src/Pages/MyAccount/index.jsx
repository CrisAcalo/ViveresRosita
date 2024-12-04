import React from "react";
import {useNavigate} from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { Modal } from "../../Components/Modal";
import { ChevronRightIcon, TrashIcon } from "@heroicons/react/24/outline";

function MyAccount() {
    const navigate = useNavigate();
    const { auth, setAuth, users, setUsers, setGlobalAlert, openModal, setOpenModal } = React.useContext(ShoppingCartContext);

    const [newEmail, setNewEmail] = React.useState('');
    React.useEffect(() => { setNewEmail(auth.email); }, [auth]);

    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = React.useState('');
    const [accordionStatus, setAccordionStatus] = React.useState(false);

    const onUpdate = () => {
        const user = users.find(user => user.email == newEmail);
        if (!newEmail || !currentPassword) {
            setGlobalAlert({ type: 'error', messages: ['Current password and email are required'] })
            return;
        }
        if (auth.password != currentPassword) {
            setGlobalAlert({ type: 'error', messages: ['Incorrect password'] })
            return;
        }
        
        if (user) {
            setGlobalAlert({ type: 'error', messages: ['Email already exists'] })
        } else {
            if (newPassword != newPasswordConfirm) {
                setGlobalAlert({ type: 'error', messages: ['Passwords do not match'] })
            } else {
                let newUser = {};
                const newPasswordUpdate = newPassword ? newPassword : auth.password;
                const newUsers = users.map(user => {
                    if (user.id == auth.id) {
                        return newUser = { ...user, email: newEmail, password: newPasswordUpdate }
                    }
                    return user;
                });
                setUsers(newUsers);
                setAuth(newUser);
                setCurrentPassword('');
                setNewEmail('');
                setNewPassword('');
                setNewPasswordConfirm('');
                setGlobalAlert({ type: 'success', messages: ['Data updated successfully'], duration: 3000 });
            }
        }
    }

    const onDelete = () => {
        const newUsers = users.filter(user => user.id != auth.id);
        setUsers(newUsers);
        setAuth({});
        setOpenModal(false);
        setGlobalAlert({ type: 'success', messages: ['Account deleted successfully'], duration: 3000 });
        navigate('/sign-in');
    }

    return (
        <>
            {openModal && (
                <Modal title="CAUTION!">
                    <p className="text-red-500 font-semibold">
                        If you delete your account, all information associated with the account will be deleted and will not be available
                    </p>
                    <div className="flex justify-around mt-4">
                        <button
                            className="rounded-lg px-2 py-1 bg-red-100 text-red-500 border-2 border-red-500 font-bold text-md"
                            onClick={() => onDelete()}>
                            Confirm
                        </button>
                        <button
                            className="rounded-lg px-2 py-1 
                            bg-indigo-100 text-indigo-500 border-2 border-indigo-500 
                            font-bold text-md
                            shadow-md shadow-indigo-400/50"
                            onClick={() => { setOpenModal(false) }}>
                            Cancel
                        </button>
                    </div>
                </Modal>
            )}


            <div className="w-full flex flex-col justify-center items-center">
                <div className="border-2 border-indigo-500 rounded-lg p-4 shadow-lg shadow-indigo-400/50 w-72 md:w-96">
                    <h1 className="text-4xl font-bold text-indigo-500 text-center">My Account</h1>
                    <form className="flex flex-col gap-4 mt-4">
                        <label className="flex flex-col gap-1">
                            <span className="text-indigo-500 text-lg">Email</span>
                            <p className="border-2 bg-indigo-100 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30">
                                {auth.email}
                            </p>
                        </label>
                    </form>
                </div>
                {/* Delete Account */}
                <div className="w-72 md:w-96 mt-4">
                    <div className={`
                    flex justify-between items-center border-2 border-indigo-500 bg-indigo-500 
                    text-white px-4 py-2 cursor-pointer ${accordionStatus ? 'rounded-t-lg' : 'rounded-lg'}`}
                        onClick={() => { setAccordionStatus(!accordionStatus) }}>
                        <p className="text-center">Advanced Options</p>
                        <ChevronRightIcon className={`w-6 h-6 ${accordionStatus ? 'rotate-90' : null} ease-linear duration-75`} />
                    </div>
                    {accordionStatus &&
                        <div className="border-2 border-indigo-200 rounded-b-lg p-4">
                            <form className="flex flex-col gap-2">
                                <h1 className="text-lg font-bold text-indigo-500 m-0 p-0 text-center">Update Data</h1>
                                <label className="flex flex-col gap-1">
                                    <span className="text-indigo-500 text-lg">Current Password</span>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="border-2 bg-indigo-100 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30"
                                    />
                                </label>
                                <label className="flex flex-col gap-1">
                                    <span className="text-indigo-500 text-lg">New Email</span>
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        className="border-2 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30"
                                    />
                                </label>
                                <label className="flex flex-col gap-1">
                                    <span className="text-indigo-500 text-lg">New Password</span>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="border-2 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30"
                                    />
                                </label>
                                <label className='flex flex-col gap-1'>
                                    <span className='text-indigo-500 text-lg'>Confirm Password</span>
                                    <input
                                        value={newPasswordConfirm}
                                        type='password'
                                        className='border-2 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30'
                                        onChange={(e) => setNewPasswordConfirm(e.target.value)} />
                                </label>
                                <button
                                    type='button'
                                    onClick={() => onUpdate()}
                                    className="bg-indigo-500 text-white rounded-lg p-2 font-bold">Save</button>
                            </form>

                            <div className="flex flex-col">
                                <h1 className="text-lg font-bold text-red-500 m-0 p-0 text-center my-4">Delete Account</h1>
                                <button
                                    className="bg-red-500 text-white rounded-lg p-1 flex justify-between gap-2 w-max"
                                    onClick={() => { setOpenModal(true) }}>
                                    <TrashIcon className="w-4 h-6" />
                                    Delete Account
                                </button>
                                <p className="text-red-400 font-semibold mt-3">
                                    Caution! All information associated with the account will be deleted</p>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}

export default MyAccount
