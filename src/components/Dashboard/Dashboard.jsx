import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const handleNewRegistration = () => {
    // Handle new registration logic
    console.log('New Registration');
  };

  const handleEditCustomer = () => {
    // Handle editing customer logic
    console.log('Edit Customer');
  };

  const handleTariffModification = () => {
    // Handle tariff modification logic
    console.log('Tariff Modification');
  };

  const handleTariffCreation = () => {
    // Handle tariff creation logic
    console.log('Tariff Creation');
  };

  const handleBulkEmail = () => {
    // Handle bulk email logic
    console.log('Bulk Email');
  };

  const handleBulkUpload = () => {
    // Handle bulk upload logic
    console.log('Bulk Upload');
  };

  const handleCheckBill = () => {
    // Handle check bill logic
    console.log('Check Bill');
  };

  const handlePayBill = () => {
    // Handle pay bill logic
    console.log('Pay Bill');
  };

  return (
    <div className="dashboard-container bg-gray-100 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Dashboard - MyApp</h1>
      <div className="button-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="dropdown relative" onMouseEnter={() => document.getElementById("customerDropdown").classList.add("show")} onMouseLeave={() => document.getElementById("customerDropdown").classList.remove("show")}>
          <button className="dropbtn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full focus:outline-none">Customer</button>
          <div className="dropdown-content bg-white shadow-md rounded-md p-2 absolute left-0 top-full w-full" id="customerDropdown">
            <Link to={"/NewRegistration"}><button onClick={handleNewRegistration} className="block w-full text-left py-2 hover:bg-gray-200">New Registration</button></Link>
            <Link to={"/updatecustomer"}><button onClick={handleEditCustomer} className="block w-full text-left py-2 hover:bg-gray-200">Edit Existing Customer</button></Link>
          </div>
        </div>
        <div className="dropdown relative" onMouseEnter={() => document.getElementById("tariffDropdown").classList.add("show")} onMouseLeave={() => document.getElementById("tariffDropdown").classList.remove("show")}>
          <button className="dropbtn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full focus:outline-none">Tariff Plan</button>
          <div className="dropdown-content bg-white shadow-md rounded-md p-2 absolute left-0 top-full w-full" id="tariffDropdown">
            <Link to={"/updatetariff"}><button onClick={handleTariffModification} className="block w-full text-left py-2 hover:bg-gray-200">Modification</button></Link>
            <Link to={"/creationtariff"}><button onClick={handleTariffCreation} className="block w-full text-left py-2 hover:bg-gray-200">Creation</button></Link>
          </div>
        </div>
        <div className="dropdown relative" onMouseEnter={() => document.getElementById("utilitiesDropdown").classList.add("show")} onMouseLeave={() => document.getElementById("utilitiesDropdown").classList.remove("show")}>
          <button className="dropbtn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full focus:outline-none">Utilities</button>
          <div className="dropdown-content bg-white shadow-md rounded-md p-2 absolute left-0 top-full w-full" id="utilitiesDropdown">
            <Link to={"/BatchMail"}><button onClick={handleBulkEmail} className="block w-full text-left py-2 hover:bg-gray-200">Bulk Email</button></Link>
            <Link to={"/batchUpdate"}><button onClick={handleBulkUpload} className="block w-full text-left py-2 hover:bg-gray-200">Bulk Upload</button></Link>
            <Link to={"/checkbill"}><button onClick={handleCheckBill} className="block w-full text-left py-2 hover:bg-gray-200">Check Bill</button></Link>
            <Link to={"/paybill"}><button onClick={handlePayBill} className="block w-full text-left py-2 hover:bg-gray-200">Pay Bill</button></Link>
            <Link to={"/virtualmeter"}><button className="block w-full text-left py-2 hover:bg-gray-200">Virtual Meter</button></Link> {/* Added */}
            <Link to={"/getdata"}><button className="block w-full text-left py-2 hover:bg-gray-200">Get Meter Data</button></Link> {/* Added */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
