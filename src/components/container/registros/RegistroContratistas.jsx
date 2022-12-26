import {collection, doc, setDoc} from 'firebase/firestore';
import db from '../../../backend/DBFiresbase';
import FormRegistroContratistas from '../../pure/form/FormRegistroContratistas';
import styles from "./Registros.module.css"

export default function RegistroContratistas() {

     // Enviando datos a Firebase
    const setData = async (linkObjeto) => {

        const nuevoContratista = doc(collection(db, "contratistas"));
        await setDoc(nuevoContratista, linkObjeto);
    }

    return (<>
        <div className={styles.WrapperContenedor} >
            <h1 className="" >Registro de Contratistas</h1>

            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                Registar Contratista
            </button>

            {/* Modal de Formulario de Registro de Contratistas */}
            <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-primary">
                            <h5 className="modal-title text-white" id="exampleModalLabel">Formulario de Registro de Contratistas</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <FormRegistroContratistas setData={setData}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
