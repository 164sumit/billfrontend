import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import config from '../../Links/config';

const GetData = () => {
  const [responseData, setResponseData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    try {
      setIsFetching(true); // Set fetching state to true
      const response = await axios.get(config.backendUrl+"/getdata");
      setResponseData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsFetching(false); // Set fetching state to false after request completes
    }
  };

  const createExcelFile = () => {
    if (!responseData || !responseData.meterdata) return;

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(responseData.meterdata);
    XLSX.utils.book_append_sheet(wb, ws, 'meterdata');
    XLSX.writeFile(wb, 'meterdata.xlsx');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Get Data</h2>
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isFetching ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
        onClick={fetchData}
        disabled={isFetching}
      >
        {isFetching ? 'Fetching...' : 'Fetch Data'}
      </button>
      {responseData && (
        <div className="mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={createExcelFile}
          >
            Download Excel
          </button>
          <h3 className="text-lg font-semibold mb-2">Response Data</h3>
          <pre className="bg-gray-100 p-4 rounded-md">{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default GetData;
