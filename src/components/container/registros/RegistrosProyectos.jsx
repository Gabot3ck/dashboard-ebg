import FormRegistroProyectos from '../../pure/form/FormRegistroProyectos';
import {collection, doc, setDoc, onSnapshot, query, orderBy} from 'firebase/firestore';
import styles from './Registros.module.css';
import db from '../../../backend/DBFiresbase';
import moment from 'moment';
import {useState, useEffect} from 'react';


export default function RegistrosProyectos() {

    // Enviando datos a Firebase
    const setData = async (linkObjeto) => {

        const nuevoProyecto = doc(collection(db, "proyectos"));
        await setDoc(nuevoProyecto, linkObjeto);
    }

    // Obteniendo  datos de Firebase
    const [proyectos, setProyectos] = useState([]);

    const q = query(collection(db, "proyectos"), orderBy("fechaRegistro", "desc"));

    const getData = async () => {
    onSnapshot(q, (querySnapshot) => {
            const docs = [];
    
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            });
            setProyectos(docs);
        });
    }

    // Mostrando los datos en la interfaz
    useEffect(() => {
        getData();
        
    }, []);

    return (<>

        <div className={styles.WrapperContenedor} >
            <h1 className="" >Registros de Proyectos</h1>

            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                Registar Proyecto
            </button>

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

            {/* Se muestran los proyectos registrados */}
            <div className="table-responsive text-center mt-5" style={{overflowX: "scroll"}}>
                <table id="tablaProyectos" className="table table-sm table-bordered text-center" style={{minWidth: "120%"}}> 
                    <thead>
                        <tr className="table-secondary" style={{fontSize: ".9rem"}} >
                            <th>F. Inicia</th>
                            <th>F. Termina</th>
                            <th>Nombre</th>
                            <th>Presupuesto</th>
                            <th>Cliente</th>
                            <th>Área</th>
                            <th>Descripción</th>
                            <th>Dirección</th>
                            <th>Comuna</th>
                            <th>Región</th>
                        </tr>
                    </thead>

                    <tbody>
                        {proyectos.map((el,index) => {
                            return(
                                <tr key= {index}  className="table-warning" style={{fontSize: ".85rem"}}>
                                    <td>{moment(el.fechaInicio).format('DD-MM-YYYY')}</td>
                                    <td>{moment(el.fechaTermino).format('DD-MM-YYYY')}</td>
                                    <td>{el.nombre}</td>
                                    <td>$ {new Intl.NumberFormat('de-DE').format(el.presupuesto)}</td>
                                    <td>{el.cliente}</td>
                                    <td>{el.area}</td>
                                    <td>{el.descripcion}</td>
                                    <td >{el.direccion}</td>
                                    <td>{el.comuna}</td>
                                    <td>{el.region}</td>
                                </tr>
                                
                            )
                        })}

                    </tbody>

                </table>
            </div>
        </div>

        
    </>)
}
