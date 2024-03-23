import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../Links/config';
import { Link } from 'react-router-dom';
import { TariffContext } from '../../context/TariffContext';

const CheckBill = () => {
  const [accountNo, setAccountNo] = useState('');
  const [customerInfo, setCustomerInfo] = useState(null);
  const [error, setError] = useState(null);
  const [billAmount, setBillAmount] = useState(0);
  const { tariffCodes } = useContext(TariffContext);

  const handleAccountNoChange = (e) => {
    setAccountNo(e.target.value);
  };

  const handleCheckBill = async () => {
    try {
      const backendurl = `${config.backendUrl}/getcustomerdetail`;
      const response = await axios.post(backendurl, { accountNo });
      const { success, customer } = response.data;
      if (success) {
        setCustomerInfo(customer);
        calculateBillAmount();
      } else {
        setError('Something went wrong while checking the bill');
      }
    } catch (error) {
      console.error('Error checking bill:', error);
      setError('An error occurred while checking the bill');
    }
  };

  const calculateBillAmount = () => {
    if (!customerInfo) {
      return;
    }

    const tariffCode = tariffCodes.find(tariff => tariff.code === customerInfo.tariffType);
    if (!tariffCode) {
      return;
    }

    let totalUnitLeft = customerInfo.totalUnitLeft;
    let totalBillAmount = 0;

    for (let i = 0; i < tariffCode.units.length; i++) {
      if (totalUnitLeft <= 0) {
        break;
      }
      const unitsConsumed = Math.min(tariffCode.units[i], totalUnitLeft);
      totalBillAmount += unitsConsumed * tariffCode.price[i];
      totalUnitLeft -= unitsConsumed;
    }

    setBillAmount(totalBillAmount);
  };

  useEffect(() => {
    calculateBillAmount();
  }, [customerInfo]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Check Bill</h2>
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
        <button onClick={handleCheckBill} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Check Bill</button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {customerInfo && (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Account Information</h3>
            <p><span className="font-semibold">Account No:</span> {customerInfo.accountNo}</p>
            <p><span className="font-semibold">Name:</span> {customerInfo.name}</p>
            <p><span className="font-semibold">Total Unit Left:</span> {customerInfo.totalUnitLeft}</p>
            <p><span className="font-semibold">Bill Amount:</span> {billAmount}</p>
            <Link to="/paybill" className="mt-2 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Pay Bill</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckBill;
