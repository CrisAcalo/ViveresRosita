import { React, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import Alerts from '../../Components/Alerts';
import { config } from '../../../config/config';
import { registerUser } from "../../api/authApi";

const SignUp = () => {
    const { setGlobalAlert } = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [rolId, setRolId] = useState(3);

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setGlobalAlert({ type: "error", messages: ["Passwords do not match"] });
            return;
        }
        try {
            await registerUser({ name, email, password, phone, address, rolId });
            setGlobalAlert({ type: "success", messages: ["Register successful"], duration: 4000 });
            navigate("/sign-in");
        } catch (error) {
            setGlobalAlert({ type: "error", messages: error, duration: 4000 });
        }
    };


    return (
        <div id='sign-up-page' className='w-full flex flex-col justify-center items-center'>
            <div id='sign-up-form-container' className='border-2 border-indigo-500 rounded-lg p-4 shadow-lg shadow-indigo-400/50 w-full sm:w-4/5 max-w-[720px]'>
                <h1 id='sign-up-title' className='text-4xl font-bold text-indigo-500 text-center'>Sign Up</h1>
                <form id='sign-up-form' className='mt-4 flex flex-col gap-2'>
                    <div className='grid md:grid-cols-2 gap-2'>
                        <label id='name-label' className='flex flex-col gap-1'>
                            <span className='text-indigo-500 text-lg'>Name</span>
                            <input
                                id='name-input'
                                value={name}
                                type='text'
                                className='border-2 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30'
                                onInput={(e) => setName(e.target.value)} />
                        </label>
                        <label id='phone-label' className='flex flex-col gap-1'>
                            <span className='text-indigo-500 text-lg'>Phone</span>
                            <input
                                id='phone-input'
                                value={phone}
                                type='text'
                                className='border-2 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30'
                                onInput={(e) => setPhone(e.target.value)} />
                        </label>
                    </div>
                    <label id='address-label' className='flex flex-col gap-1'>
                        <span className='text-indigo-500 text-lg'>Address</span>
                        <input
                            id='address-input'
                            value={address}
                            type='text'
                            className='border-2 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30'
                            onInput={(e) => setAddress(e.target.value)} />
                    </label>
                    <div className='grid md:grid-cols-1 gap-2'>
                        <label id='email-label' className='flex flex-col gap-1'>
                            <span className='text-indigo-500 text-lg'>Email</span>
                            <input
                                id='email-input'
                                value={email}
                                type='email'
                                className='border-2 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30'
                                onInput={(e) => setEmail(e.target.value)} />
                        </label>
                        {/* <div className='flex flex-col gap-1'>
                            <span className='text-indigo-500 text-lg'>Are you a ...?</span>
                            <ul id='role-radio-group' className="items-center w-full text-sm font-medium text-indigo-900 bg-white border-2 border-indigo-500 rounded-lg sm:flex">

                                <li className="w-full border-indigo-500 sm:border-r-2">
                                    <div className="flex items-center ps-3">
                                        <input id="role-seller-radio" onInput={(e) => { setRolId(2) }} type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-indigo-100 border-indigo-300 focus:ring-blue-500 focus:ring-2 indigo-500" />
                                        <label for="role-seller-radio" className="w-full py-3 ms-2 text-sm font-medium text-indigo-500">Seller</label>
                                    </div>
                                </li>
                                <li className="w-full border-indigo-500">
                                    <div className="flex items-center ps-3">
                                        <input id="role-customer-radio" onInput={(e) => { setRolId(3) }} type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-indigo-100 border-indigo-300 focus:ring-blue-500 focus:ring-2 indigo-500" />
                                        <label for="role-customer-radio" className="w-full py-3 ms-2 text-sm font-medium text-indigo-500">Customer</label>
                                    </div>
                                </li>
                            </ul>

                        </div> */}
                    </div>
                    <div className='grid md:grid-cols-2 gap-2'>
                        <label id='password-label' className='flex flex-col gap-1'>
                            <span className='text-indigo-500 text-lg'>Password</span>
                            <input
                                id='password-input'
                                value={password}
                                type='password'
                                className='border-2 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30'
                                onInput={(e) => setPassword(e.target.value)} />
                        </label>
                        <label id='confirm-password-label' className='flex flex-col gap-1'>
                            <span className='text-indigo-500 text-lg'>Confirm Password</span>
                            <input
                                id='confirm-password-input'
                                value={confirmPassword}
                                type='password'
                                className='border-2 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30'
                                onInput={(e) => setConfirmPassword(e.target.value)} />
                        </label>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center">
                        <button type='button' className="bg-indigo-500 text-white rounded-lg p-2" onClick={handleRegister}>Sign Up</button>
                    </div>
                </form>
            </div>
            <div id='sign-in-link-container'>
                <p className='text-center mt-4'>You already have an account?
                    <Link id='sign-in-link' to='/sign-in' className='text-indigo-500 font-semibold ps-1'>Sign In</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp;