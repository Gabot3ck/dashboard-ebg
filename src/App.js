import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { useState } from "react";
import { Login } from "./components/pages/auth/Login";
import { firebaseApp } from "./backend/DBFiresbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Home } from "./components/pages/home/Home";
import { AuthProvider } from './context/authContext';
import {doc, getDoc} from 'firebase/firestore';
import db from './backend/DBFiresbase';
import './App.css';


const auth = getAuth(firebaseApp);


function App() {
  const [user, setUser] = useState(null);

  const getPerfil = async (uid) => {
    const docRef = await (getDoc(doc(db, `usuarios/${uid}`)))
    const dataPerfil = docRef.data().perfil;
    return dataPerfil;
}

const setUserWithFirebaseAndRol = (usuarioFirebase) => {
    getPerfil(usuarioFirebase.uid)
            .then(perfil => {
                const userData = {
                    uid: usuarioFirebase.uid,
                    perfil: perfil,
                }
                setUser(userData);
                console.log(userData);
            })
}

onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {

        if(!user){
            setUserWithFirebaseAndRol(usuarioFirebase)
        }
    } else {
        setUser(null);
    }
});


  return (<>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
              <Route path="/*" element={
                <ProtectedRoute>
                  <Home user={user}/>
                </ProtectedRoute>
              }/>
              <Route path="/login" element={<Login />}/>
            </Routes>
        </AuthProvider>
      </BrowserRouter>
        
            
  </>)
}

export default App;
