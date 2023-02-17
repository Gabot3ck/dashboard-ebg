import { FormRegistroManoObra } from "../../pure/form/FormRegistroManoObra"
import styles from "./Registros.module.css"

export const RegistroManoObra = () => {
    return (<>

        <div className={` d-flex flex-column align-items-start  `} >
            <h1 className={ `fs-5 fw-bold p-2 mb-0 rounded-1 ${styles.titulo_manoObra}` } >Mano de Obra</h1>
            <FormRegistroManoObra/>
        </div>
        
    </>)
}
