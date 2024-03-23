import React, { useState, useContext } from 'react';
import axios from 'axios';
import config from '../../Links/config';
import { useNavigate } from 'react-router-dom';
import { TariffContext } from '../../context/TariffContext';

const NewCustomerRegistration = () => {
    const [accountNo, setAccountNo] = useState('');
    const [name, setName] = useState('');
    const [tariffType, setTariffType] = useState('');
    const [electricMeterNo, setElectricMeterNo] = useState('');
    const [email, setEmail] = useState('');
    const { tariffCodes } = useContext(TariffContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const backendurl = `${config.backendUrl}/registercustomer`;
        try {
            const { data } = await axios.post(backendurl, {
                name,
                accountNo,
                tariffType,
                electricMeterNo,
                email
            });

            if (data.success) {
                alert(`Registration successful for customer ${name} with account no. ${accountNo}`);
                navigate("/dashboard");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error registering customer:", error);
            alert("An error occurred while registering the customer");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg lg:max-w-md">
                <h2 className="text-3xl font-bold mb-4">New Customer Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="accountNo" className="block text-gray-700">Account No:</label>
                        <input
                            type="text"
                            id="accountNo"
                            value={accountNo}
                            onChange={(e) => setAccountNo(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tariffType" className="block text-gray-700">Tariff Type:</label>
                        <select
                            id="tariffType"
                            value={tariffType}
                            onChange={(e) => setTariffType(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Select Tariff Type</option>
                            {tariffCodes.map(tariff => (
                                <option key={tariff._id} value={tariff.code}>{tariff.code}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="electricMeterNo" className="block text-gray-700">Electric Meter No:</label>
                        <input
                            type="text"
                            id="electricMeterNo"
                            value={electricMeterNo}
                            onChange={(e) => setElectricMeterNo(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

export default NewCustomerRegistration;
