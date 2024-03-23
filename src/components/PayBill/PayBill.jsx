import React, { useState } from 'react';
import axios from 'axios';
import config from '../../Links/config';

const PayBill = () => {
  const [accountNo, setAccountNo] = useState('');

  const handleAccountNoChange = (e) => {
    setAccountNo(e.target.value);
  };

  const handlePayBill = async () => {
    try {
      const backendurl = `${config.backendUrl}/PayBill`;
      const response = await axios.post(backendurl, { accountNo });
      const { success } = response.data;
      if (success) {
        alert('Bill paid successfully');
      } else {
        alert('Something went wrong while paying the bill');
      }
    } catch (error) {
      console.error('Error paying bill:', error);
      alert('An error occurred while paying the bill');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Pay Bill</h2>
        <div className="mb-4">
          <label htmlFor="accountNo" className="block text-gray-700">Account Number:</label>
          <input
            type="text"
            id="accountNo"
            value={accountNo}
            onChange={handleAccountNoChange}
            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button onClick={handlePayBill} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Pay Bill</button>
      </div>
    </div>
  );
};

export default PayBill;
