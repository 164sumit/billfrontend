import React, { useContext, useState } from 'react';
import './EditCustomerRegistration.css';
import axios from 'axios';
import config from '../../Links/config';
import { useNavigate } from 'react-router-dom';
import { TariffContext } from '../../context/TariffContext';

const EditCustomerRegistration = () => {
    const [accountNo, setAccountNo] = useState('');
    const [name, setName] = useState('');
    const [tariffType, setTariffType] = useState('');
    const [electricMeterNo, setElectricMeterNo] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);
    const [email, setEmail] = useState('');
    const { tariffCodes } = useContext(TariffContext);
    const navigate = useNavigate();

    const handleSearchClick = async () => {
        try {
            const response = await axios.post(`${config.backendUrl}/getcustomerdetail`,{
                accountNo
            });
            const { success, customer } = response.data;
            if (success) {
                setName(customer.name);
                setTariffType(customer.tariffType);
                setElectricMeterNo(customer.electricMeterNo);
                setEmail(customer.email);
                setSearchClicked(true);
            } else {
                alert("Customer not found");
            }
        } catch (error) {
            console.error("Error fetching customer details:", error);
            alert("An error occurred while fetching customer details");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const backendurl = `${config.backendUrl}/updatecustomer`;
        try {
            const { data } = await axios.post(backendurl, {
                name,
                accountNo,
                tariffType,
                electricMeterNo,
                email
            });
            console.log(data);
            if (data.success) {
                alert(`Update successful for customer ${name} with account no. ${accountNo}`);
                navigate("/dashboard");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error updating customer:", error);
            alert("An error occurred while updating customer");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg lg:max-w-md">
                <h2 className="text-3xl font-bold mb-4">Edit Customer Registration</h2>
                <div className="search-section mb-4">
                    <input
                        type="text"
                        value={accountNo}
                        onChange={(e) => setAccountNo(e.target.value)}
                        placeholder="Enter Account No"
                        className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                    />
                    <button onClick={handleSearchClick} className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Search</button>
                </div>
                {searchClicked && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled // Disable input field
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
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditCustomerRegistration;
