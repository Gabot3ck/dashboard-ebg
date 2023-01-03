import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext"


export const ProtectedRoute = ({children}) => {
    const {user} = useAuth();

    // if (loading) return <p>loading</p>;
    if(!user){
        return <Navigate to="/" />;
    } 

    return <>{children}</>;

}