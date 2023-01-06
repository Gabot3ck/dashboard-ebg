import moment from "moment/moment";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";


export default function Header() {



    return (<>
        <div className= {styles.WrapperHeader} >
            <div>
                <Link to="/home" className="btn btn-danger" >Ir a Inicio</Link>
            </div>
            <div className="d-flex align-items-center justify-content-between w-50 ">
                <Link to="/home/resultados/oocc" className="text-white" >OOCC</Link>
                <Link to="/home/resultados/remodelaciones" className="text-white" >Remodelaciones</Link>
                <Link to="/home/resultados/licitaciones" className="text-white" >Licitaciones</Link>
                <Link to="/home/resultados/muebleria" className="text-white" >Mueblería</Link>
                <p className="m-0">{moment().format("DD MMM YY")} </p>
            </div>
            
        </div>
    </>)
}
