import React from 'react'
import auth from "app_component/authentication/auth";
import { useHistory } from "react-router";
 const ProtectedRoutes= ({children})=> {
    const history = useHistory();
    const navigateToLogin = () => {
        history.push("/login");
    }
  
    return(<>
        {
            auth.isAuthenticated() ?  children : navigateToLogin()
        }
    </>)

}

export default ProtectedRoutes