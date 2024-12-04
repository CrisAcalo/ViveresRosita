import React from 'react';
import { Link, useNavigate } from "react-router-dom"
import { ShoppingCartContext } from "../../Context";
import Alerts from '../../Components/Alerts';

function SignIn() {

    const { users, setAuth, setGlobalAlert, logIn, email, setEmail, password, setPassword } = React.useContext(ShoppingCartContext);

    const navigate = useNavigate();

    const onLogin = () => {
        // const user = users.find(user => user.email == email);
        // if (!user) {
        //     setGlobalAlert({ type: 'error', messages: ['User not found'], duration: 2000 })
        // } else {
        //     if (user.password != password) {
        //         setGlobalAlert({ type: 'error', messages: ['Incorrect password'], duration: 3000 })
        //     } else {
        //         setAuth(user);
        //         setGlobalAlert({ type: 'success', messages: ['Welcome :D'], duration: 2000 });
        //         navigate('/');
        //     }
        // }

        logIn()
            .then(() => {
                navigate('/');
            });
    }

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            {/* {error &&
                <Alerts type={'error'}>
                    <p>{error}</p>
                </Alerts>
            } */}
            <div className='border-2 border-indigo-500 rounded-lg p-4 shadow-lg shadow-indigo-400/50 w-72 md:w-96'>
                <h1 className='text-4xl font-bold text-indigo-500 text-center'>Log In</h1>
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
                    <button type='button'
                        className='bg-indigo-500 text-white rounded-lg p-2'
                        onClick={() => { onLogin() }}
                    >Log In</button>
                </form>
            </div>
            <div>
                <p className='text-center mt-4'>Don't have an account?
                    <Link to='/sign-up' className='text-indigo-500 font-semibold ps-1'>Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default SignIn
