import ItemMenuRegistros from "./menus/ItemMenuRegistros";
import ItemMenuReportes from "./menus/ItemMenuReportes";
import ItemMenuVerDatos from "./menus/ItemMenuVerDatos";
import {useAuth} from '../../../context/authContext';

export default function MenuContainer() {
    const {user} = useAuth();

    return (<>
        <div className="accordion accordion-flush w-100" id="accordionFlushExample">
            <ItemMenuRegistros titulo="Registro de Datos" idFlush="flush1"/>
            {user.perfil === "Gerente" && <ItemMenuReportes titulo="Reporte de Datos" idFlush="flush2"/>}
            {user.perfil === "Gerente" && <ItemMenuVerDatos titulo="Vista de Datos" idFlush="flush3"/>}
        </div>
    </>)
}