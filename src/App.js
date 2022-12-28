import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { useState } from "react";
import { Login } from "./components/pages/auth/Login";
import { firebaseApp } from "./backend/DBFiresbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Home } from "./components/pages/home/Home";
import { AuthProvider } from './context/authContext';
import './App.css';


const auth = getAuth(firebaseApp);


function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
    } else {
      setUser(null);
    }
  });


  return (<>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
              }/>
              <Route path="login" element={<Login />}/>
            </Routes>
        </AuthProvider>
      </BrowserRouter>
        
            
  </>)
}

export default App;
