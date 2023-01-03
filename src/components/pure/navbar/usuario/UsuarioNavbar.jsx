import { useAuth } from "../../../../context/authContext"
import styles from "./UsuarioNavbar.module.css"

export default  function UsuarioNavbar() {
    const {user} = useAuth();


    return (<>
        <section className="w-100">
            <p className={ styles.texto }> {user.nombre} {user.apellido} </p>
        </section>
    </>)
}
