import { useEffect, useState } from "react";
import {collection, doc, onSnapshot, query, orderBy, updateDoc, getDoc} from 'firebase/firestore';
import db from "../../../backend/DBFiresbase";
import styles from "./Registros.module.css";



export const RegistroProduccion = () => {

    const [proyectos, setProyectos] = useState([]);
    const [idProyecto, setIDProyecto] = useState("");
    const [value, setValue] = useState("");
    const [nombre, setNombre] = useState("");

    // Obteniendo  datos de Firebase
    const q = query(collection(db, "proyectos"), orderBy("fechaRegistro", "asc"));

    const getData = async () => {
        onSnapshot(q, (querySnapshot) => {
            const docs = [];

            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            });
            setProyectos(docs);
        });
    }

    //Obteniendo ID
    const getId = (id) => {
        setIDProyecto(id)
    }


    //Obteniendo el valor del input
    const handleInput = (e) => {
        const { value } = e.target;
        setValue(value);
    }

    //Obteniendo nombre de proyecto con ID
    const getNombre =  (nombre) => {
        setNombre(nombre)
    }

    //Envío de formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const nuevoAvance = doc(db, "proyectos", idProyecto);
        updateDoc(nuevoAvance, { produccion: value} )
        setValue("");
        setNombre("")
    }



    useEffect(() => {
        getData();
        getId();
        getNombre();
    
    }, [])
    

    return (<>
        <h2 className="text-center">% de Avance de Producción</h2>

        <div className={`container w-100 px-5  text-center ${styles.wrapper_produccion}`}>
            <ul className="w-100  p-0 ">
                <li className="py-2 gap-4 text-center fw-bold mb-2 rounded-1 d-flex justify-content-center align-items-center">
                    <p className={ styles.index }>#</p>
                    <p className={ styles.proyecto }>Proyecto</p>
                    <p className={ styles.avance }>% Avance</p>
                    <p className={ styles.boton }>Actualizar</p>
                </li>
                {
                    proyectos.map((proyecto, index) => (
                        <li 
                            className="py-2 gap-4 text-center fw-bold h5 rounded-1 d-flex justify-content-center align-items-center" 
                            key={ proyecto.id }>
                            <p className={`m-0 fw-semibold ${styles.index}`}> { index + 1 }.-</p>
                            <p className={`m-0 fw-semibold ${styles.proyecto}`}>{ proyecto.nombre }: </p>
                            <p className={`m-0 fw-semibold ${styles.avance}`}>{ proyecto.produccion ?  proyecto.produccion : 0} %</p>  
                            <button 
                                className={`btn btn-primary py-1 ${styles.boton}`}
                                onClick={() => { getId(proyecto.id); getNombre(proyecto.nombre)} }
                                type="button" 
                                data-bs-toggle="modal" 
                                data-bs-target="#modalProduccion">
                                <i className="bi bi-pencil"></i>
                            </button>

                            {/* Modal de Formulario de Registro de Proyectos */}
                            <div className="modal fade" id="modalProduccion"  aria-labelledby="modalProduccionLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                                    <div className="modal-content">
                                        <div className="modal-header bg-primary">
                                            <h5 className="modal-title text-white" id="modalProduccionLabel">Registro Avance de Producción</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form 
                                                className="row g-4"
                                                onSubmit={ handleSubmit }>

                                                <div className="col-md-7 w-75 mx-auto">
                                                    <label className="form-label mb-3">{ nombre }</label>
                                                    <div className="input-group d-flex justify-content-center">
                                                        <input 
                                                            type="text" 
                                                            placeholder="Ingrese % de avance..."
                                                            onChange={ handleInput }
                                                            value={ value }
                                                            />
                                                        <span className="input-group-text">%</span>
                                                    </div>
                                                </div>

                                                <div className="col-md-7 mx-auto">
                                                    <button className="btn btn-primary "  data-bs-dismiss="modal">Enviar</button>
                                                </div>
                                                
                                            </form>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
            
        </div>
        
    </>)
}
