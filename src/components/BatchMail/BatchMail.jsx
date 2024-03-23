import React, { useState } from 'react';
import axios from 'axios';
import config from '../../Links/config';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';

const BatchMail = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [uploading, setUploading] = useState(false); // New state to track uploading status

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || uploading) { // Prevent upload if already uploading or no file selected
      return;
    }
    setUploading(true); // Set uploading status to true

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      const url=config.backendUrl;
      try {
        const { data } = await axios.post(`${url}/batchmail`, {jsonData});
        setResponse(data);
        alert('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('An error occurred while uploading the file');
      } finally {
        setUploading(false); // Reset uploading status to false
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const createExcelSheet = (data, fileName) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, fileName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const handleDownload = (data, fileName) => {
    createExcelSheet(data, fileName);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg lg:max-w-md">
        <h2 className="text-3xl font-bold mb-4">Batch Mail</h2>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="mb-4" />
        <button onClick={handleUpload} disabled={!file || uploading} className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {response && (
          <div className="mt-4">
            {/* <h3 className="font-bold">Response:</h3>
            <p>Success: {response.success ? 'Yes' : 'No'}</p>
            <div>
              <p className="font-bold">Successfully Sent Mail:</p>
              <ul>
                {response.successfullySentMail.map((mail, index) => (
                  <li key={index}>
                    <div>
                      <p>Electric Meter No: {mail.electricMeterNo}</p>
                      <p>Email: {mail.email}</p>
                      <p>Account No: {mail.accountNo}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold">Not Sent Mail:</p>
              <ul>
                {response.notSentMail.map((mail, index) => (
                  <li key={index}>
                    <div>
                      <p>Electric Meter No: {mail.electricMeterNo}</p>
                      <p>Email: {mail.email}</p>
                      <p>Account No: {mail.accountNo}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div> */}
            <button onClick={() => handleDownload(response.successfullySentMail, 'successfullySentMail')} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Download Successfully Sent Mail</button>
            <button onClick={() => handleDownload(response.notSentMail, 'notSentMail')} className="mt-4 ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Download Not Sent Mail</button>
          </div>
        )}
        <Link to={"/batchUpdate"} className="block text-center mt-4 underline">Go to BatchUpdate</Link>
      </div>
    </div>
  );
};

export default BatchMail;
