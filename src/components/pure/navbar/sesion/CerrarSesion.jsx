import {useAuth} from '../../../../context/authContext';
import "./CerrarSesion.css";

const CerrarSesion = () => {

    const { logout } = useAuth();


    const handleLogout = async () => {
        await logout()
    }

    return (<>
        <div className="w-100">
            <button
                onClick={handleLogout}
                className="btn texto">
                <i className="bi bi-power me-2 btn btn-danger"></i>
                Cerrar sesión
            </button>
        </div>
    </>)
}
export default CerrarSesion;        