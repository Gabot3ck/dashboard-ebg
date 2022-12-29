import ItemSubmenu from "./ItemSubmenu";
import {useAuth} from '../../../../context/authContext';
import "./Submenu.css"


export default function SubmenuRegistros() {

    const {user} = useAuth();

    return (<>

        <ul className="wrapper_SubmenuContainer">
            <ItemSubmenu titulo="Gastos" ruta="/registros/gastos"/>
            <ItemSubmenu titulo="Proveedores" ruta="/registros/proveedores"/>
            <ItemSubmenu titulo="Clientes" ruta="registros/clientes"/>
            <ItemSubmenu titulo="Contratistas" ruta="registros/contratistas"/>
            {user.perfil === "Gerente" && <ItemSubmenu titulo="Proyectos" ruta="/registros/proyectos"/>}
            {user.perfil === "Gerente" && <ItemSubmenu titulo="Ventas" ruta="/registros/ventas"/> }
        </ul>

    </>)
}
