import React, { createContext, useState, useEffect, useContext } from 'react';
import { TariffContext } from '../../context/TariffContext';




const TariffTable = () => {
  const { tariffCodes } = useContext(TariffContext);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Sr. No</th>
            <th className="px-4 py-2">Tariff Name</th>
            <th className="px-4 py-2">Units</th>
            <th className="px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {tariffCodes?.map((tariff, index) => (
            <tr key={tariff._id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{tariff.code}</td>
              <td className="border px-4 py-2">{tariff.units.join(', ')}</td>
              <td className="border px-4 py-2">{tariff.price.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TariffTable;
