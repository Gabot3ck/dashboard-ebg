import ItemSubmenu from "./ItemSubmenu";
import "./Submenu.css"


export default function SubmenuVerDatos() {

    return (<>

        <ul className="wrapper_SubmenuContainer">
            <ItemSubmenu titulo="Envíos"/>
            <ItemSubmenu titulo="Saldo de Clientes"/>
            <ItemSubmenu titulo="Ventas por Cobrar"/>
            <ItemSubmenu titulo="Estado de Resultados"/>
            <ItemSubmenu titulo="Utilidad"/>
        </ul>

    </>)
}