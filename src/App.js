import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/pure/navbar/Navbar';
import Header from './components/pure/header/Header';
import RegistroDeGastos from "./components/container/registros/RegistrosDeGastos";
import RegistroProveedores from "./components/container/registros/RegistroProveedores";
import Resultado from "./components/container/principal/Resultado";
import RegistrosVentas from "./components/container/registros/RegistrosVentas";
import RegistrosProyectos from "./components/container/registros/RegistrosProyectos";
import RegistroClientes from "./components/container/registros/RegistroClientes";
import RegistroContratistas from "./components/container/registros/RegistroContratistas";


import './App.css';
import TestSet from "./helpers/TestSet";
import ReportesProyectos from "./components/container/reportes/ReportesProyectos";
import { useState } from "react";
import { Login } from "./components/pages/auth/Login";
import { firebaseApp } from "./backend/DBFiresbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";


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
    {
      user ?
        (
          <div className='App w-100' >
      
            <BrowserRouter>
              <nav className='AppNavbar'>
                <Navbar/>
              </nav>

              <header className='AppHeader'>
                <Header />
              </header>

              <main className='AppMain' >
                <Routes>
                  <Route path="/" element={<Resultado/>}/>
                  <Route path="/registros/gastos" element={<RegistroDeGastos/>}/>
                  <Route path="/registros/proveedores" element={<RegistroProveedores />}/>
                  <Route path="registros/clientes" element={<RegistroClientes/>}/>
                  <Route path="registros/contratistas" element={<RegistroContratistas/>}/>
                  <Route path="/registros/proyectos" element={<RegistrosProyectos />}/>
                  <Route path="/registros/ventas" element={<RegistrosVentas />}/>
                  <Route path="reportes/proyectos" element={<ReportesProyectos/>}/>
                  <Route path="/test" element= {<TestSet />} />
                </Routes>
              </main>
            </BrowserRouter>
      
          </div>
        ) :
      <Login />
    }

    
  </>)
}

export default App;
