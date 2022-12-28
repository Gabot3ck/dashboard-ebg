import { createContext, useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import {firebaseApp} from '../backend/DBFiresbase';

const auth = getAuth(firebaseApp);

export const authContext = createContext();


export const useAuth = () => {
    const context = useContext(authContext)
    if(!context) throw new Error("No tiene auth de Provider");
    return context
}


export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Iniciar sesión
    const login = (usuario, password) => 
        signInWithEmailAndPassword(auth, usuario, password) ;
    

    // Cerrar sesión
    const logout = () => signOut(auth)

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
    }, [])
    

    return (
        <authContext.Provider value={{ login, user, logout, loading }}>
            {children}
        </authContext.Provider>
    )
}