import MenuContainer from "../menu/MenuContainer";
import Logo from "./logo/Logo";
import styles from "./Navbar.module.css";
import CerrarSesion  from "./sesion/CerrarSesion";
import UsuarioNavbar from "./usuario/UsuarioNavbar";

export default function Navbar() {
    return (<>
        <nav className= {styles.Navbar} >
            <Logo/>
            <UsuarioNavbar />
            <MenuContainer />
            <CerrarSesion />
        </nav>
    </>)
        
}
