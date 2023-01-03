import ItemSubmenu from "./ItemSubmenu";
import "./Submenu.css"


export default function SubmenuRegistros() {

    return (<>

        <ul className="wrapper_SubmenuContainer">
            <ItemSubmenu titulo="Reporte de Gastos"/>
            <ItemSubmenu titulo="Plan Anual"/>
            <ItemSubmenu titulo="Calendario de Pagos"/>
            <ItemSubmenu titulo="Reporte estratégico"/>
            <ItemSubmenu titulo="Reporte de Proyectos" ruta="reportes/proyectos"/>
        </ul>

    </>)
}