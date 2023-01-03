import moment from "moment/moment";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import styles from "./Header.module.css";


export default function Header() {

    const { logout } = useAuth();


    const handleLogout = async () => {
        await logout()
    }

    return (<>
        <div className= {styles.WrapperHeader} >
            <div>
                <Link to="/home" className="btn btn-danger" >Ir a Inicio</Link>
            </div>
            <div className="d-flex align-items-center justify-content-between w-50 ">
                <p className="m-0">{moment().format("DD MMM YY")} </p>
                
                <button
                    onClick={handleLogout}
                    className="btn btn-danger">
                    Cerrar sesión
                </button>
            </div>
            
        </div>
    </>)
}
