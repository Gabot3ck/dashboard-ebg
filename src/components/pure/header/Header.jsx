import moment from "moment/moment"
import { Link } from "react-router-dom"
import { firebaseApp } from "../../../backend/DBFiresbase"
import { getAuth, signOut } from "firebase/auth";
import styles from "./Header.module.css"

const auth = getAuth(firebaseApp);


export default function Header() {

    return (<>
        <div className= {styles.WrapperHeader} >
            <div>
                <Link to="/" className="btn btn-danger" >Ir a Inicio</Link>
            </div>
            <div className="d-flex align-items-center justify-content-between w-50 ">
                <p className="m-0">{moment().format("DD MMM YY")} </p>
                <button
                    onClick={() => signOut(auth)}
                    className="btn btn-danger">
                    Cerrar sesión
                </button>
            </div>
            
        </div>
    </>)
}
