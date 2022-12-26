// import moment from 'moment';
import FormRegistroProveedores from '../../pure/form/FormRegistroProveedores';
import styles from "./Registros.module.css"
import {collection, doc, setDoc} from 'firebase/firestore';
import db from '../../../backend/DBFiresbase';


export default function RegistroProveedores() {

     // Enviando datos a Firebase
    const setData = async (linkObjeto) => {

        const nuevoProveedor = doc(collection(db, "proveedores"));
        await setDoc(nuevoProveedor, linkObjeto);
    }

    return (<>
        <div className={styles.WrapperContenedor} >
            <h1 className="" >Registro de Proveedores</h1>

            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                Registar Proveedor
            </button>

            {/* Modal de Formulario de Registro de Proveedores */}
            <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-primary">
                            <h5 className="modal-title text-white" id="exampleModalLabel">Formulario de Registro de Proveedores</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <FormRegistroProveedores setData={setData}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
