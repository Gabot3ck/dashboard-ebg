import {collection, doc, setDoc, onSnapshot, query, orderBy} from 'firebase/firestore';
import db from '../../../backend/DBFiresbase';
import FormRegistroClientes from '../../pure/form/FormRegistroClientes';
import styles from './Registros.module.css';
import {useState, useEffect} from 'react';
import moment from 'moment';

export default function RegistroClientes() {

    // Enviando datos a Firebase
    const setData = async (linkObjeto) => {
        const nuevoCliente = doc(collection(db, "clientes"));
        await setDoc(nuevoCliente, linkObjeto);
    }

    // Obteniendo  datos de Firebase
    const [clientes, setClientes] = useState([]);

    const q = query(collection(db, "clientes"), orderBy("fechaRegistro", "desc"));

    const getData = async () => {
    onSnapshot(q, (querySnapshot) => {
            const docs = [];
    
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            });
            setClientes(docs);
            // setTablaUsuarios(docs);
        });
    }

    // Mostrando los datos en la interfaz
    useEffect(() => {
        getData();
        
    }, []);

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

            {/* Se muestran los proyectos registrados */}
            <div className="table-responsive text-center mt-5" style={{overflowX: "scroll"}}>
                <table id="tablaProyectos" className="table table-sm table-bordered text-center" style={{minWidth: "120%"}}> 
                    <thead>
                        <tr className="table-secondary" style={{fontSize: ".9rem"}} >
                            <th>Razón Social</th>
                            <th>Suministro</th>
                            <th>Dirección</th>
                            <th>Comuna</th>
                            <th>Región</th>
                            <th>Contacto</th>
                            <th>Celular</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clientes.map((el,index) => {
                            return(
                                <tr key= {index}  className="table-warning" style={{fontSize: ".85rem"}}>
                                    <td>{el.razonSocial}</td>
                                    <td>{el.suministro}</td>
                                    <td>{el.ubicacion.direccion}</td>
                                    <td>{el.ubicacion.comuna}</td>
                                    <td>{el.ubicacion.region}</td>
                                    <td>{el.contacto.nombreContacto} {el.contacto.apellidoContacto}</td>
                                    <td >{el.contacto.cellContacto}</td>
                                    <td>{el.contacto.fonoContacto}</td>
                                    <td>{el.contacto.emailContacto}</td>
                                </tr>
                            )
                        })}

                    </tbody>

                </table>
            </div>

        </div>
    </>)
}
