import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getGastos } from "../../../store/slices/thunks";
import FormRegistroDeGastos from "../../pure/form/FormRegistroDeGastos"
import moment from "moment";
import getDataCollection from '../../../helpers/getDataCollection';
import styles from "./Registros.module.css"



export default function RegistroDeGastos() {

    // const [busqueda, setBusqueda]= useState("");
    const [tablaUsuarios, setTablaUsuarios]= useState([]);

    // const [resultados, setResultados] = useState([]);
    // const [filtroTipoGasto, setFiltroTipoGasto] = useState("");
    // const [filtroProyecto, setFiltroProyecto] = useState("");


    // Obteniendo  todos los gatos de los proyectos con Redux
    const dispacth= useDispatch();
    const { gastos= [] } = useSelector( state => state.gastos )

    useEffect(() => {
        dispacth( getGastos() );
    }, [])


    //Clonando los gastos traídos desde Redux
    const [cloneGastos, setCloneGastos] = useState(gastos);
    const [tipoGasto, setTipoGasto] = useState("");
    const [proyecto, setProyecto] = useState("");


    const handleChange = (e, setState)=>{
        const {value} = e.target;
        setState(value);
        // filtrar(e.target.value);
    }

    const gastosFiltrados = cloneGastos.filter(el => {

        return (
            (!tipoGasto || el.tipo === tipoGasto) &&
            (!proyecto || el.proyecto === proyecto)
        );
    });
    useEffect(() => {
        setCloneGastos(gastos)
    }, [gastos])
    
    

    // Mostrando los datos en la interfaz
    const [proyectos, setProyectos] = useState([]);

    useEffect(() => {
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
                            <FormRegistroDeGastos />
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
                            <th>Gasto</th>
                            <th>
                                <select
                                    onChange={ (e) => handleChange(e, setTipoGasto) }
                                    className="form-select" 
                                    id="inputTipo" 
                                    name="tipo"
                                    value={ tipoGasto }
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
                                    onChange={(e) => handleChange(e, setProyecto)}
                                    className="form-select" 
                                    id="inputProyecto" 
                                    name="proyecto"
                                    value={ proyecto }
                                    data-index="5">
                                    <option value="">Proyecto</option>
                                    { proyectos.map((el, index) => {
                                        return(
                                        <option value={el.nombre} key={index}> {el.nombre} </option>
                                        )
                                    })}
                                </select>
                            </th>
                            <th>Proveedor</th>
                            <th>Factura</th>
                            <th>Forma de pago</th>
                            <th>Cuenta</th>
                            <th>Registro</th>
                        </tr>
                    </thead>

                    <tbody>
                        {gastosFiltrados.map((el,index) => {
                            return(
                                <tr key= {index}  className="table-warning" style={{fontSize: ".85rem"}}>
                                    <td>{moment(el.fechaGasto).format('DD-MM-YYYY')}</td>
                                    <td>$ {new Intl.NumberFormat('de-DE').format(el.valor)}</td>
                                    <td>{el.tipo}</td>
                                    <td>{el.concepto}</td>
                                    <td>{el.descripcion}</td>
                                    <td>{el.proyecto}</td>
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
