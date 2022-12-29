import Navbar from '../../pure/navbar/Navbar';
import Header from '../../pure/header/Header';
import {Route, Routes} from 'react-router-dom';
import RegistroDeGastos from '../../container/registros/RegistrosDeGastos';
import RegistroProveedores from '../../container/registros/RegistroProveedores';
import Resultado from '../../container/principal/Resultado';
import RegistrosVentas from '../../container/registros/RegistrosVentas';
import RegistrosProyectos from '../../container/registros/RegistrosProyectos';
import RegistroClientes from '../../container/registros/RegistroClientes';
import RegistroContratistas from '../../container/registros/RegistroContratistas';
import ReportesProyectos from '../../container/reportes/ReportesProyectos';
import "./Home.css";


export const Home = ({ user }) => {
    
    return( <>
    <div className="Home">
        <nav className='HomeNavbar'>
        {user.perfil === "Gerente" && <Navbar/>}
        </nav>
        
        <header className='HomeHeader'>
            <Header />
        </header>

        <main className='HomeMain' >
            <Routes>
                <Route path="/" element={ <Resultado/>}/>
                <Route path="/registros/gastos" element={<RegistroDeGastos/>}/>
                <Route path="/registros/proveedores" element={<RegistroProveedores />}/>
                <Route path="registros/clientes" element={<RegistroClientes/>}/>
                <Route path="registros/contratistas" element={<RegistroContratistas/>}/>
                <Route path="/registros/proyectos" element={<RegistrosProyectos />}/>
                <Route path="/registros/ventas" element={<RegistrosVentas />}/>
                <Route path="reportes/proyectos" element={<ReportesProyectos/>}/>
            </Routes>
        </main>
    </div>
        
    </>)
}
