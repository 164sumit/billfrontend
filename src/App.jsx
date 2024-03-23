import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import NewCustomerRegistration from './components/NewCustomerRegistration/NewCustomerRegistration';
import EditCustomerRegistration from './components/EditCustomerRegistration/EditCustomerRegistration';
import TariffModification from './components/TariffModification/TariffModification';
import NewTariffCreation from './components/NewTariffCreation/NewTariffCreation';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { TariffProvider } from './context/TariffContext';
import BatchUpdate from './components/batchUpload/BatchUpdate';
import PayBill from './components/PayBill/PayBill';
import CheckBill from './components/CheckBill/CheckBill';
import BatchMail from './components/BatchMail/BatchMail';
import SignUpForm from './components/temp/SignUpForm';
import VirtualMeter from './components/VirtualMeter/VirtualMeter';
import GetData from './components/GetData/GetData';
import RedLight from './components/RedLight/RedLight';
import TariffTable from './components/TariffTable/TariffTable';
import Header from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
const App = () => {
  const [count, setCount] = useState(0)
  // const { isLoggedIn } = useContext(AuthContext);
  // const { setIsLoggedIn, seTUsername,isLoggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter >
      <AuthProvider>
        <TariffProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/paybill" element={<PayBill />} />
            <Route path="/checkbill" element={<CheckBill />} />
            <Route path="/SignUpForm" element={<SignUpForm />} />
            <Route path="/virtualmeter" element={<VirtualMeter />} />
            <Route path="/getdata" element={<GetData />} />
            <Route path="/RedLight" element={<RedLight />} />
            <Route path="/TariffTable" element={<TariffTable />} />
            <Route path="/Header" element={<Header />} />
            <Route element={<ProtectedRoute  />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/NewRegistration" element={<NewCustomerRegistration />} />
              <Route path="/updatecustomer" element={<EditCustomerRegistration />} />
              <Route path="/creationtariff" element={<NewTariffCreation />} />
              <Route path="/updatetariff" element={<TariffModification />} />
              <Route path="/batchUpdate" element={<BatchUpdate />} />
              <Route path="/BatchMail" element={<BatchMail />} />
              {/* <Route path='/me/update' element={<UpdateProfile />} /> */}



            </Route>
          </Routes>
        </TariffProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
