import { Link } from "react-router-dom";

export default function ItemSubmenu({titulo,ruta}) {

    return (<>

        <li className="liSubmenu" >
            <Link className="dropdown-item" to={ruta}>{titulo}</Link>
        </li>

    </>)

}
