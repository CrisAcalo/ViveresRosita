import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import Alerts from '../../Components/Alerts';
import { config } from '../../../config/config';

const SignUp = () => {

    const { setGlobalAlert, jsonWebToken } = React.useContext(ShoppingCartContext);

    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [rolId, setRolId] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();

    const registerUser = async () => {
        if (loading) { return; }
        if (password != confirmPassword) {
            setGlobalAlert({ type: 'error', messages: ['Passwords do not match'] })
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`${config.domain}/api/v1/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': jsonWebToken
                },
                body: JSON.stringify({ name, email, password, phone, address, rolId })
            });

            const data = await response.json();

            setLoading(false);
            if (response.ok) {
                setGlobalAlert({ type: 'success', messages: ['Register successful'], duration: 4000 });
                navigate('/sign-in');
            } else {
                setGlobalAlert({ type: 'error', messages: [data.message], duration: 4000 });
            }
        } catch (error) {
            setLoading(false);
            setGlobalAlert({ type: 'error', messages: ['Register failed'], duration: 4000 });
        }
    }

    return (
        <div id='sign-up-page' className='w-full flex flex-col justify-center items-center'>
            <div id='sign-up-form-container' className='border-2 border-indigo-500 rounded-lg p-4 shadow-lg shadow-indigo-400/50 w-72 md:w-96'>
                <h1 id='sign-up-title' className='text-4xl font-bold text-indigo-500 text-center'>Sign Up</h1>
                <form id='sign-up-form' className='flex flex-col gap-4 mt-4'>
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
                    <label id='address-label' className='flex flex-col gap-1'>
                        <span className='text-indigo-500 text-lg'>Address</span>
                        <input
                            id='address-input'
                            value={address}
                            type='text'
                            className='border-2 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30'
                            onInput={(e) => setAddress(e.target.value)} />
                    </label>
                    <label id='email-label' className='flex flex-col gap-1'>
                        <span className='text-indigo-500 text-lg'>Email</span>
                        <input
                            id='email-input'
                            value={email}
                            type='email'
                            className='border-2 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30'
                            onInput={(e) => setEmail(e.target.value)} />
                    </label>
                    <ul id='role-radio-group' className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input id="role-seller-radio" onInput={(e) => { setRolId(2) }} type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label for="role-seller-radio" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Seller</label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input id="role-customer-radio" onInput={(e) => { setRolId(3) }} type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label for="role-customer-radio" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Customer</label>
                            </div>
                        </li>
                    </ul>
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
                    <button
                        id='sign-up-button'
                        type='button'
                        className='bg-indigo-500 text-white rounded-lg p-2'
                        onClick={() => registerUser()}>Sign Up</button>
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