import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import PageLoading from "./PageLoading";
 
const ProtectedRoute = ({ children }) => {
    const [ user , isLoading ] = useAuthState(auth);

    // console.log("Check user in Private: ", user);
if (isLoading){
    console.log('Loading...');
     return <PageLoading/>
}

    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;

};

export default ProtectedRoute;