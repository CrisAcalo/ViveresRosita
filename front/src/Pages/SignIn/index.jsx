import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";

function SignIn() {
    const { logIn } = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await logIn(email, password);
            navigate("/");
        } catch (error) {
            console.error("Error en login:", error);
        }
    };

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="border-2 border-indigo-500 rounded-lg p-4 shadow-lg w-72 md:w-96">
                <h1 className="text-4xl font-bold text-indigo-500 text-center">Log In</h1>
                <form className="flex flex-col gap-4 mt-4">
                    <label className="flex flex-col gap-1">
                        <span className="text-indigo-500 text-lg">Email</span>
                        <input type="email" value={email} className="border-2 border-indigo-500 rounded-lg p-2" onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="text-indigo-500 text-lg">Password</span>
                        <input type="password" value={password} className="border-2 border-indigo-500 rounded-lg p-2" onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button type="button" className="bg-indigo-500 text-white rounded-lg p-2" onClick={handleLogin}>Log In</button>
                </form>
            </div>
            <p className="text-center mt-4">
                Don't have an account? <Link to="/sign-up" className="text-indigo-500 font-semibold ps-1">Sign Up</Link>
            </p>
        </div>
    );
}

export default SignIn;
