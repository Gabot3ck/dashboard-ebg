import {collection, doc, setDoc} from 'firebase/firestore';
import db from '../../../backend/DBFiresbase';
import FormRegistroClientes from '../../pure/form/FormRegistroClientes';
import styles from './Registros.module.css';

export default function RegistroClientes() {

    // Enviando datos a Firebase
    const setData = async (linkObjeto) => {

        const nuevoCliente = doc(collection(db, "clientes"));
        await setDoc(nuevoCliente, linkObjeto);
    }


    return (<>
        <div className={styles.WrapperContenedor} >
            <h1 className="" >Registro de Clientes</h1>

            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                Registar Cliente
            </button>

            {/* Modal de Formulario de Registro de Clientes */}
            <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-primary">
                            <h5 className="modal-title text-white" id="exampleModalLabel">Formulario de registro de clientes</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <FormRegistroClientes setData={setData}/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>)
}
