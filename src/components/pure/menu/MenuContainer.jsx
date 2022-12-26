import ItemMenuRegistros from "./menus/ItemMenuRegistros";
import ItemMenuReportes from "./menus/ItemMenuReportes";
import ItemMenuVerDatos from "./menus/ItemMenuVerDatos";

export default function MenuContainer() {
    return (<>
        <div className="accordion accordion-flush w-100" id="accordionFlushExample">
            <ItemMenuRegistros titulo="Registro de Datos" idFlush="flush1"/>
            <ItemMenuReportes titulo="Reporte de Datos" idFlush="flush2"/>
            <ItemMenuVerDatos titulo="Vista de Datos" idFlush="flush3"/>
        </div>
    </>)
}