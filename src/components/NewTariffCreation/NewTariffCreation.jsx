import React, { useState } from 'react';
import axios from 'axios';
import config from '../../Links/config';
import { useNavigate } from 'react-router-dom';

const NewTariffCreation = () => {
    const [code, setCode] = useState('');
    const [unit1, setUnit1] = useState('');
    const [price1, setPrice1] = useState('');
    const [unit2, setUnit2] = useState('');
    const [price2, setPrice2] = useState('');
    const [unit3, setUnit3] = useState('');
    const [price3, setPrice3] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const backendurl = `${config.backendUrl}/createtariff`;

        try {
            const { data } = await axios.post(backendurl, {
                code,
                units: [unit1, unit2, unit3],
                price: [price1, price2, price3]
            });

            if (data.tariff) {
                alert("Tariff creation successful");
                navigate("/dashboard");
            } else {
                alert("Tariff code not found");
            }
        } catch (error) {
            console.error("Error fetching tariff details:", error);
            alert("An error occurred while fetching tariff details");
        }
    };
    
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg lg:max-w-md">
                {/* <h2 className="text-3xl font-bold mb-4">Tariff Creation</h2> */}
                <h2 className="text-3xl font-bold mb-4">Tariff Creation</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        {/* <label htmlFor="code" className="block text-gray-700">Tariff Code Name:</label> */}
                        <label htmlFor="code" className="block text-gray-700">Tariff Code Name:</label>
                        <input
                            type="text"
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="unit1" className="block text-gray-700">Unit 1:</label>
                        <input
                            type="text"
                            id="unit1"
                            value={unit1}
                            onChange={(e) => setUnit1(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                            required
                        />
                        <label htmlFor="price1" className="block text-gray-700">Price 1:</label>
                        <input
                            type="text"
                            id="price1"
                            value={price1}
                            onChange={(e) => setPrice1(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="unit2" className="block text-gray-700">Unit 2:</label>
                        <input
                            type="text"
                            id="unit2"
                            value={unit2}
                            onChange={(e) => setUnit2(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                            required
                        />
                        <label htmlFor="price2" className="block text-gray-700">Price 2:</label>
                        <input
                            type="text"
                            id="price2"
                            value={price2}
                            onChange={(e) => setPrice2(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="unit3" className="block text-gray-700">Unit 3:</label>
                        <input
                            type="text"
                            id="unit3"
                            value={unit3}
                            onChange={(e) => setUnit3(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                            required
                        />
                        <label htmlFor="price3" className="block text-gray-700">Price 3:</label>
                        <input
                            type="text"
                            id="price3"
                            value={price3}
                            onChange={(e) => setPrice3(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default NewTariffCreation;
