import FormRegistroDeGastos from "../../pure/form/FormRegistroDeGastos"
import styles from "./Registros.module.css"
import {collection, onSnapshot, doc, setDoc, query, orderBy, deleteDoc} from 'firebase/firestore';
import {useState, useEffect} from 'react';
import moment from "moment";
import db from "../../../backend/DBFiresbase"
import getDataCollection from '../../../helpers/getDataCollection';
import Swal from "sweetalert2";

export default function RegistroDeGastos() {

    const [busqueda, setBusqueda]= useState("");
    const [tablaUsuarios, setTablaUsuarios]= useState([]);

    
    // Enviando datos a Firebase
    const setData = async (linkObjeto) => {

        const nuevoGasto = doc(collection(db, "gastos"));
        await setDoc(nuevoGasto, linkObjeto);
    }


    // Obteniendo  datos de Firebase
    const [gastos, setGastos] = useState([]);

    const q = query(collection(db, "gastos"), orderBy("fechaRegistro", "desc"));

    const getData = async () => {
    onSnapshot(q, (querySnapshot) => {
            const docs = [];
    
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            });
            setGastos(docs);
            setTablaUsuarios(docs);
        });
    }

    const handleChange = (e)=>{
        const {value} = e.target;
        setBusqueda(value);
        filtrar(e.target.value);
    }

    const filtrar=(terminoBusqueda )=>{
        let  resultadosBusqueda = tablaUsuarios.filter((el) => {
            if(
                (el.tipo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || 
                el.proyecto.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()))
            ){
                return el;
            }
        });
        setGastos(resultadosBusqueda);
    }

    // Obteniendo  datos de Firebase (proyectos)
    const [proyectos, setProyectos] = useState([]);



    // Mostrando los datos en la interfaz
    useEffect(() => {
        getData();
        
        getDataCollection("proyectos",setProyectos)
    }, []);

    

    return (<>

        <div className={styles.WrapperContenedor} >
            <h1 className="" >Registros de  Gastos</h1>

            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                Registar Gasto
            </button>

            {/* Modal de Formulario de Registro de Gastos */}
            <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-primary">
                            <h5 className="modal-title text-white" id="exampleModalLabel">Formulario de Registro de Gastos</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <FormRegistroDeGastos setData={setData}/>
                        </div>
                    </div>
                </div>
            </div>


            <div className="table-responsive text-center mt-5" style={{overflowX: "scroll"}}>
                <table id="tablaGastos" className="table table-sm table-bordered text-center" style={{minWidth: "120%", width: "contain" }}> 
                    <thead>
                        <tr className="table-secondary" style={{fontSize: ".9rem"}} >
                            <th>Fecha</th>
                            <th>Gasto</th>
                            <th>
                                <select
                                    onChange={handleChange}
                                    className="form-select" 
                                    id="inputTipo" 
                                    name="tipo"
                                    value={busqueda}
                                    data-index="2">
                                    <option className="text-center"  value="">Tipo</option>
                                    <option value="Fijo">Fijo</option>
                                    <option value="Variable">Variable</option>
                                </select>
                            </th>
                            <th>Concepto</th>
                            <th>Descripción</th>
                            <th>
                                <select
                                    onChange={handleChange}
                                    className="form-select" 
                                    id="inputProyecto" 
                                    name="proyecto"
                                    value={busqueda}
                                    data-index="5">
                                    <option value="">Seleccione</option>
                                    { proyectos.map((el, index) => {
                                        return(
                                        <option value={el.nombre} key={index}> {el.nombre} </option>
                                        )
                                    })}
                                </select>
                            </th>
                            <th>Cantidad</th>
                            <th>Proveedor</th>
                            <th>Factura</th>
                            <th>Forma de pago</th>
                            <th>Cuenta</th>
                            <th>Registro</th>
                        </tr>
                    </thead>

                    <tbody>
                        {gastos.map((el,index) => {
                            return(
                                <tr key= {index}  className="table-warning" style={{fontSize: ".85rem"}}>
                                    <td>{moment(el.fechaGasto).format('DD-MM-YYYY')}</td>
                                    <td>$ {new Intl.NumberFormat('de-DE').format(el.valor)}</td>
                                    <td>{el.tipo}</td>
                                    <td>{el.concepto}</td>
                                    <td>{el.descripcion}</td>
                                    <td>{el.proyecto}</td>
                                    <td >{el.cantidad}</td>
                                    <td>{el.proveedor}</td>
                                    <td>{el.factura}</td>
                                    <td>{el.formaPago}</td>
                                    <td>{el.cuenta}</td>
                                    <td >{el.fechaRegistro}</td>
                                </tr>
                                
                            )
                        })}

                    </tbody>

                </table>
            </div>
        </div>

    </>)
}
