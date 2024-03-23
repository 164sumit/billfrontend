import React, { useContext } from 'react'
import {Outlet,Navigate} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';

function ProtectedRoute() {
    const { setIsLoggedIn, seTUsername,isLoggedIn } = useContext(AuthContext);
    if(!isLoggedIn){
        return(
            <Navigate to="/login" />

        )
    }

  return (
    <div>
        <Outlet/>
      
    </div>
  )
}

export default ProtectedRoute
