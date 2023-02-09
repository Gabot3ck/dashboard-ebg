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
import {useAuth} from '../../../context/authContext';
import { Saludo } from '../saludo/Saludo';
import { ResultadoRemodelaciones } from '../../container/principal/ResultadoRemodelaciones';
import { ResultadoOOCC } from '../../container/principal/ResultadoOOCC';
import { ResultadoLicitaciones } from '../../container/principal/ResultadoLicitaciones';
import { ResultadoMuebleria } from '../../container/principal/ResultadoMuebleria';
import { RegistroProduccion } from '../../container/registros/RegistroProduccion';
import { RegistroManoObra } from '../../container/registros/RegistroManoObra';
import "./Home.css";


export const Home = () => {

    const {user} = useAuth();


    return( <>
    <div className="Home">
        <nav className='HomeNavbar'>
            <Navbar/> 
        </nav>
        
        <header className='HomeHeader'>
            <Header />
        </header>

        <main className='HomeMain' >
            <Routes>
                {user.perfil === "Gerente" ? 
                <Route path="/" element={ <Resultado/>}/> : 
                <Route path="/" element={ <Saludo/>}/> 
                }
                <Route path="registros/gastos" element={<RegistroDeGastos/>}/>
                <Route path="registros/proveedores" element={<RegistroProveedores />}/>
                <Route path="registros/clientes" element={<RegistroClientes/>}/>
                <Route path="registros/contratistas" element={<RegistroContratistas/>}/>
                <Route path="registros/proyectos" element={<RegistrosProyectos />}/>
                <Route path="registros/ventas" element={<RegistrosVentas />}/>
                <Route path="registros/mano-de-obra" element={<RegistroManoObra />}/>
                <Route path="registros/produccion" element={<RegistroProduccion />}/>
                <Route path="reportes/proyectos" element={<ReportesProyectos/>}/>
                <Route path="resultados/remodelaciones" element={<ResultadoRemodelaciones />}/>
                <Route path="resultados/oocc" element={<ResultadoOOCC />}/>
                <Route path="resultados/licitaciones" element={<ResultadoLicitaciones />}/>
                <Route path="resultados/muebleria" element={<ResultadoMuebleria />}/>
            </Routes>
        </main>
    </div>
        
    </>)
}
