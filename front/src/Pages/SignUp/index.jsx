import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import Alerts from '../../Components/Alerts';

const SignUp = () => {

    const { users, setUsers, setGlobalAlert } = React.useContext(ShoppingCartContext);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const navigate = useNavigate();

    const onSignUp = () => {
        // const user = users.find(user => user.email == email);
        // if (!email || !password || !confirmPassword) {
        //     setGlobalAlert({ type: 'error', messages: ['All fields are required'] })
        //     return;
        // }
        // if (user) {
        //     setGlobalAlert({ type: 'error', messages: ['User already exists'] })
        // } else {
        //     if (password != confirmPassword) {
        //         setGlobalAlert({ type: 'error', messages: ['Passwords do not match'] })
        //     } else {
        //         setUsers([...users, { id: uuidv4(), email, password }]);
        //         setGlobalAlert({ type: 'success', messages: ['Sign In please :D'] })
        //         navigate('/sign-in');
        //     }
        // }
    }

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='border-2 border-indigo-500 rounded-lg p-4 shadow-lg shadow-indigo-400/50 w-72 md:w-96'>
                <h1 className='text-4xl font-bold text-indigo-500 text-center'>Sign Up</h1>
                <form className='flex flex-col gap-4 mt-4'>
                    <label className='flex flex-col gap-1'>
                        <span className='text-indigo-500 text-lg'>Email</span>
                        <input
                            value={email}
                            type='email'
                            className='border-2 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30'
                            onInput={(e) => setEmail(e.target.value)} />

                    </label>
                    <label className='flex flex-col gap-1'>
                        <span className='text-indigo-500 text-lg'>Password</span>
                        <input
                            value={password}
                            type='password'
                            className='border-2 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30'
                            onInput={(e) => setPassword(e.target.value)} />

                    </label>
                    <label className='flex flex-col gap-1'>
                        <span className='text-indigo-500 text-lg'>Confirm Password</span>
                        <input
                            value={confirmPassword}
                            type='password'
                            className='border-2 border-indigo-500 rounded-lg p-2 focus:outline-0 shadow-md shadow-indigo-400/30'
                            onInput={(e) => setConfirmPassword(e.target.value)} />
                    </label>
                    <button
                        type='button'
                        className='bg-indigo-500 text-white rounded-lg p-2'
                        onClick={() => onSignUp()}>Sign Up</button>
                </form>
            </div>

            <div>
                <p className='text-center mt-4'>You already have an account?
                    <Link to='/sign-in' className='text-indigo-500 font-semibold ps-1'>Sign In</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp;