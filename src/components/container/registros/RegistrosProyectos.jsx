import React from 'react'
import FormRegistroProyectos from '../../pure/form/FormRegistroProyectos';
import {collection, doc, setDoc} from 'firebase/firestore';
import styles from './Registros.module.css';
import db from '../../../backend/DBFiresbase';

export default function RegistrosProyectos() {

    // Enviando datos a Firebase
    const setData = async (linkObjeto) => {

        const nuevoProyecto = doc(collection(db, "proyectos"));
        await setDoc(nuevoProyecto, linkObjeto);
    }

    return (<>

        <div className={styles.WrapperContenedor} >
            <h1 className="" >Registros de Proyectos</h1>

            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                Registar Proyecto
            </button>
        </div>

        {/* Modal de Formulario de Registro de Proyectos */}
        <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-primary">
                            <h5 className="modal-title text-white" id="exampleModalLabel">Formulario de Registro de Proyectos</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <FormRegistroProyectos setData={setData} />
                        </div>
                    </div>
                </div>
            </div>
    </>)
}
