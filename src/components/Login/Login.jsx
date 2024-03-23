import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import config from '../../Links/config';

const Login = () => {
    const { setIsLoggedIn, seTUsername,isLoggedIn } = useContext(AuthContext); // Access setIsLoggedIn from context
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // State to track loading state
    const backendurl = config.backendUrl + "/loginuser";
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true when form is submitted
        try {
            const { data } = await axios.post(backendurl, {
                username,
                password
            });
            console.log(data);
            if (data.success) {
                setIsLoggedIn(true);
                // console.log(isLoggedIn);
                setUsername(username); // Set isLoggedIn to true upon successful login
                navigate("/dashboard");
            } else {
                // Alert with error message from backend
                alert(data.message || "Invalid username or password");
            }
        } catch (error) {
            // Handle network errors or unexpected errors
            console.error('Error:', error.response ? error.response.data.message : error.message);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false); // Reset loading state when request completes
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 shadow-xl">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-center text-3xl font-bold text-gray-800 mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input id="username" name="username" type="text" autoComplete="username" required value={username} onChange={(e) => setUsername(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Username" />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Password" />
                    </div>
                    <div>
                        <button type="submit" disabled={loading} className={`w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            {loading ? 'Loging In...' : 'Login '}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
