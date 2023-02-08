import { useEffect, useState } from "react";
import {collection, doc, setDoc, onSnapshot, query, orderBy, limit, updateDoc} from 'firebase/firestore';
import db from "../../../backend/DBFiresbase";
export const RegistroProduccion = () => {

    
    const [proyectos, setProyectos] = useState([]);
    const [idProyecto, setIDProyecto] = useState("");
    const [value, setValue] = useState("")

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

    const getId = (id) => {
        setIDProyecto(id)
    }

    const handleInput = (e) => {
        const { value } = e.target;
        setValue(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const nuevoAvance = doc(db, "proyectos", idProyecto);
        updateDoc(nuevoAvance, { produccion: value} )
        setValue("");

    }

    useEffect(() => {
        getData();
        getId();
    
    }, [])
    

    return (<>
        <h1 className="text-center">Avance de % Producción</h1>

        <div className="container w-100 px-3">
            <ul>
                {
                    proyectos.map((proyecto, index) => (
                        <li 
                            className="w-100 d-flex gap-3 my-3 py-2 align-items-center justify-content-start" 
                            key={ proyecto.id }>
                            <p className="m-0 fw-semibold "> { index + 1 }.-</p>
                            <p className="m-0 fw-semibold ">{ proyecto.nombre }: </p>
                            <p className=" m-0 ">{ proyecto.produccion ?  proyecto.produccion : 0} %</p>  
                            <button 
                                className="btn btn-success py-1"
                                onClick={() => getId(proyecto.id) }
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
                                                action=""
                                                onSubmit={ handleSubmit }>
                                                <input 
                                                    type="text" 
                                                    placeholder="Ingrese el % de producción..."
                                                    onChange={ handleInput }
                                                    value={ value }
                                                    />
                                                <button className="btn btn-primary">Enviar</button>
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
