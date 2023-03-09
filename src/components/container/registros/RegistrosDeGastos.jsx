import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getGastos } from "../../../store/slices/thunks";
import FormRegistroDeGastos from "../../pure/form/FormRegistroDeGastos"
import moment from "moment";
import getDataCollection from '../../../helpers/getDataCollection';
import styles from "./Registros.module.css"



export default function RegistroDeGastos() {

//todo  Obteniendo  todos los gatos de los proyectos con Redux
    const dispacth= useDispatch();
    const { gastos= [] } = useSelector( state => state.gastos )

    useEffect(() => {
        dispacth( getGastos() );
    }, [])
//todo FIN  Obteniendo  todos los gatos de los proyectos con Redux ***


//todo  Clonando los gastos traídos desde Redux *****
    const [ cloneGastos, setCloneGastos ] = useState(gastos);
    const [ tipoGasto, setTipoGasto ] = useState("");
    const [ conceptoGasto, setConceptoGasto ] = useState("");
    const [ proyecto, setProyecto ] = useState("");
    const [ proveedor, setProveedor ] = useState("");
    const [ precioGastoTotal, setPrecioGastoTotal ] = useState(0);

    //Capturando los valores de los inputs del form
    const handleChange = (e, setState)=>{
        const {value} = e.target;
        setState(value);
    }

    const gastosFiltrados = cloneGastos.filter(el => {

        return (
            (!tipoGasto || el.tipo === tipoGasto) &&
            (!proyecto || el.proyecto === proyecto) &&
            (!conceptoGasto || el.concepto === conceptoGasto) &&
            (!proveedor || el.proveedor === proveedor)
        );
    });


    useEffect(() => {
        setCloneGastos(gastos)
    }, [gastos])


    useEffect(() => {
        setPrecioGastoTotal(gastosFiltrados.reduce((acc, el) => acc + parseInt(el.valor), 0 ));
    }, [gastosFiltrados])
    
    
//todo ******** Fin Clonando los gastos traídos desde Redux *****



//todo  Mostrando los datos en la interfaz  *****
    const [proyectos, setProyectos] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        getDataCollection("proyectos",setProyectos);
    }, []);

    useEffect(() => {
        getDataCollection("proveedores",setProveedores);
    }, []);

//todo FIN   Mostrando los datos en la interfaz  *****


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
                                    value={ tipoGasto }>
                                    <option className="text-center"  value="">Tipo</option>
                                    <option value="Fijo">Fijo</option>
                                    <option value="Variable">Variable</option>
                                </select>
                            </th>
                            <th>
                                <select
                                    onChange={(e) => handleChange(e, setConceptoGasto)}
                                    className="form-select" 
                                    id="inputConceptoProyecto" 
                                    name="concepto"
                                    value={ conceptoGasto }
                                    data-index="5">
                                    <option value="">Concepto</option>
                                    <option value="Equipos">Equipos</option>
                                    <option value="Materiales">Materiales</option>
                                    <option value="Herramientas">Herramientas</option>
                                    <option value="Combustible">Combustible</option>
                                    <option value="Arriendos">Arriendos</option>
                                    <option value="EPPs">EPPs</option>
                                    <option value="Mantenimientos">Mantenimientos</option>
                                    <option value="Fletes">Fletes</option>
                                    <option value="Retiro de escombro">Retiro de escombro</option>
                                    <option value="Servicios">Servicios</option>
                                    <option value="Capacitaciones">Capacitaciones</option>
                                    <option value="Exámenes médicos">Exámenes médicos</option>
                                    <option value="Alojamientos">Alojamientos</option>
                                    <option value="Viáticos">Viáticos</option>
                                    <option value="Contratistas">Contratistas</option>
                                    <option value="Servicio Contabilidad">Contabilidad</option>
                                    <option value="Hosting">Hosting</option>
                                    <option value="Otros">Otros</option>
                                </select>
                            </th>
                            <th>
                                <select
                                    onChange={(e) => handleChange(e, setProyecto)}
                                    className="form-select" 
                                    id="inputProyecto" 
                                    name="proyecto"
                                    value={ proyecto }>
                                    <option value="">Proyecto</option>
                                    { proyectos.map((el, index) => {
                                        return(
                                        <option value={el.nombre} key={index}> {el.nombre} </option>
                                        )
                                    })}
                                </select>
                            </th>
                            <th>
                                <select
                                    onChange={(e) => handleChange(e, setProveedor)}
                                    className="form-select" 
                                    id="inputProveedor" 
                                    name="proveedor"
                                    value={ proveedor }>
                                    <option value="">Proveedor</option>
                                    { proveedores.map((el) => {
                                        return(
                                        <option value={el.razonSocial} key={el.razonSocial}> {el.razonSocial} </option>
                                        )
                                    })}
                                    </select>
                            </th>
                            <th>Factura</th>
                            <th>Forma de pago</th>
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
                                    <td>{el.proyecto}</td>
                                    <td>{el.proveedor}</td>
                                    <td>{el.factura}</td>
                                    <td>{el.formaPago}</td>
                                    <td >{el.fechaRegistro}</td>
                                </tr>
                            )
                        })}
                    </tbody>

                    <tr>
                        <td>Total:</td>
                        <td>${ new Intl.NumberFormat('de-DE').format(precioGastoTotal) }</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                </table>
            </div>
        </div>

    </>)
}
