import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-white text-lg font-bold">Bill System</Link>
        <button className="lg:hidden text-white" onClick={() => setShowMenu(!showMenu)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <nav className={`lg:flex flex-col lg:flex-row items-center ${showMenu ? 'block' : 'hidden'} lg:ml-4`}>
        <ul className="lg:flex space-x-4">
          <li>
            <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
          </li>
          <li>
            <Link to="/checkbill" className="text-white hover:text-gray-300">Check Bill</Link>
          </li>
          <li>
            <Link to="/virtualmeter" className="text-white hover:text-gray-300">Virtual Meter</Link>
          </li>
          <li>
            <Link to="/tarifftable" className="text-white hover:text-gray-300">Tariff Table</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
