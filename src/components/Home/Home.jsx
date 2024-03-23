import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="container mx-auto h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-8">Online Electric Bill System</h1>
            <div className="flex space-x-4">
                <Link to={"/login"}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600" onClick={() => console.log("Login button clicked")}>Login</button>
                </Link>
                <Link to={"/signup"}>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600" onClick={() => console.log("Signup button clicked")}>Signup</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
