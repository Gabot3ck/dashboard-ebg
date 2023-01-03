import { createContext, useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import {firebaseApp} from '../backend/DBFiresbase';
import {doc, getDoc} from 'firebase/firestore';
import db from '../backend/DBFiresbase';

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
    const login = (usuario, password) => {
        return signInWithEmailAndPassword(auth, usuario, password);
    };


    // Cerrar sesión
    const logout = () => {
        setUser(null);
        signOut(auth);
    }


    useEffect(() => {

        const getPerfil = async (uid) => {
            const docRef = await (getDoc(doc(db, `usuarios/${uid}`)))
            const dataPerfil = docRef.data();
            return dataPerfil;
        }


        onAuthStateChanged(auth, (usuarioFirebase) => {
            if (usuarioFirebase) {
                setLoading(false);

                setUser(getPerfil(usuarioFirebase.uid)
                    .then(data => {
                        const userData = {
                            uid: usuarioFirebase.uid,
                            perfil: data.perfil,
                            nombre: data.nombre,
                            apellido: data.apellido,
                        }
                        setUser(userData);
                    }))
                
            } else {
                setUser(null);
            }
        });
    }, [])
    

    return (
        <authContext.Provider value={{ login, user, logout, loading }}>
            {children}
        </authContext.Provider>
    )
}