import FormRegistroVentas from '../../pure/form/FormRegistroVentas';
import styles from "./Registros.module.css";
import {useState, useEffect} from 'react';
import {collection, onSnapshot, query, orderBy} from 'firebase/firestore';
import db from '../../../backend/DBFiresbase';
import moment from 'moment';



export default function RegistrosVentas() {

    // Obteniendo  datos de Firebase
    const [ventas, setVentas] = useState([]);

    const q = query(collection(db, "proyectos"), orderBy("fechaRegistro", "desc"));

    const getData = async () => {
    onSnapshot(q, (querySnapshot) => {
            const docs = [];
    
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            });

            const precioTotal = docs.map(el => el.ventas);

            let lista = [];

            precioTotal.forEach( (array) => {

                if(array.length){
                    array.map(el => lista.push( el))
                }
                
            })

            setVentas(lista);
        });
    }
    // Mostrando los datos en la interfaz
    useEffect(() => {
        getData();
    }, []);


    return (<>

        <div className={styles.WrapperContenedor} >
            <h1 className="" >Registros de Ventas</h1>

            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                Registar Venta
            </button>


            {/* Modal de Formulario de Registro de Ventas */}
            <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-primary">
                                <h5 className="modal-title text-white" id="exampleModalLabel">Formulario de Registro de Ventas</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <FormRegistroVentas/>
                            </div>
                        </div>
                    </div>
            </div>

            {/* Se muestran los gastos registrados */}
            <div className="table-responsive text-center mt-5" style={{overflowX: "scroll"}}>
                    <table id="tablaGastos" className="table table-sm table-bordered text-center" style={{minWidth: "120%", width: "contain" }}> 
                        <thead>
                            <tr className="table-secondary" style={{fontSize: ".9rem"}} >
                                <th>Fecha</th>
                                <th>Venta</th>
                                <th>Descripción</th>
                                <th>Proyecto</th>
                                <th>Cliente</th>
                                <th>Factura</th>
                                <th>Registro</th>
                            </tr>
                        </thead>

                        <tbody>
                            {ventas.map((el,index) => {
                                return(
                                    <tr key= {index}  className="table-warning" style={{fontSize: ".85rem"}}>
                                        <td>{moment(el.fechaGasto).format('DD-MM-YYYY')}</td>
                                        <td>$ {new Intl.NumberFormat('de-DE').format(el.valor)}</td>
                                        <td>{el.descripcion}</td>
                                        <td>{el.proyecto}</td>
                                        <td>{el.cliente}</td>
                                        <td>{el.factura}</td>
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
