
import ItemSubmenu from "./ItemSubmenu";
import "./Submenu.css"


export default function SubmenuRegistros() {

    return (<>

        <ul className="wrapper_SubmenuContainer">
            <ItemSubmenu titulo="Gastos" ruta="/registros/gastos"/>
            <ItemSubmenu titulo="Proveedores" ruta="/registros/proveedores"/>
            <ItemSubmenu titulo="Clientes" ruta="registros/clientes"/>
            <ItemSubmenu titulo="Contratistas" ruta="registros/contratistas"/>
            <ItemSubmenu titulo="Proyectos" ruta="/registros/proyectos"/>
            <ItemSubmenu titulo="Ventas" ruta="/registros/ventas"/>
        </ul>

    </>)
}
