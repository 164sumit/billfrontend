import React, { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';
import RedLight from '../RedLight/RedLight';

const VirtualMeter = () => {
  const [electricMeterNo, setElectricMeterNo] = useState('');
  const [currentConsumeedUnit, setCurrentConsumeedUnit] = useState('');
  const [isBlinking, setIsBlinking] = useState(false);

  const handleElectricMeterNoChange = (event) => {
    setElectricMeterNo(event.target.value);
  };

  const handleUnitsConsumedChange = (event) => {
    setCurrentConsumeedUnit(event.target.value);
  };

  const socket = useMemo(
    () =>
      io('http://localhost:4001', {
        withCredentials: true,
      }),
    []
  );

  useEffect(() => {
    socket.on('send', () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200); // Blink for 200ms
      socket.emit('message', { electricMeterNo, currentConsumeedUnit });
    });

    return () => {
      socket.off('send');
    };
  }, [electricMeterNo, currentConsumeedUnit, socket]);

  return (
    <div className="max-w-md mx-auto relative">
      <h2 className="text-2xl font-bold mb-4">Virtual Meter</h2>
      <div className="bg-gray-200 p-4 rounded-lg shadow-md relative">
        <RedLight className="absloute top-4 right-4" />
        <div className="mb-4">
          <label htmlFor="electricMeterNo" className="block text-sm font-medium text-gray-700">Electric Meter No:</label>
          <input
            type="text"
            id="electricMeterNo"
            value={electricMeterNo}
            onChange={handleElectricMeterNoChange}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <label htmlFor="unitsConsumed" className="block text-sm font-medium text-gray-700">Units Consumed:</label>
          <input
            type="number"
            id="unitsConsumed"
            value={currentConsumeedUnit}
            onChange={handleUnitsConsumedChange}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
      </div>
    </div>
  );
};

export default VirtualMeter;
