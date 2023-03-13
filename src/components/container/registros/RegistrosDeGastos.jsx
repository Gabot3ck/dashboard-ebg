import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getGastos } from "../../../store/slices/thunks";
import FormRegistroDeGastos from "../../pure/form/FormRegistroDeGastos"
import moment from "moment";
import getDataCollection from '../../../helpers/getDataCollection';
import styles from "./Registros.module.css"

//Cantidad de items para paginación de gastos de Mnao de Obra
const ITEMS_NAVEGACION = 10;

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
    const [anio, setAnio] = useState("");
    const [mes, setMes] = useState("");
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

    useEffect(() => {
        setCloneGastos(gastos)
    }, [gastos])


//todo Generando los gastos filtrados
    const gastosFiltrados = cloneGastos.filter(el => {

        return (
            (!tipoGasto || el.tipo === tipoGasto) &&
            (!proyecto || el.proyecto === proyecto) &&
            (!conceptoGasto || el.concepto === conceptoGasto) &&
            (!proveedor || el.proveedor === proveedor) &&
            (!anio || el.anioGasto === anio) &&
            (!mes || el.mesGasto === mes)
        );
    });


//? Mostrando los datos en el formulario
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

//? Separando los datos traídos de Firebase
    useEffect(() => {
        setItems([...gastosFiltrados].splice(0, ITEMS_NAVEGACION))
        setCurrentPage(0);
    },[tipoGasto, proyecto, conceptoGasto, proveedor, anio, mes, cloneGastos])


//todo Funciones de Navegación
    const nextHandler = () => {
        const totalElementos = gastosFiltrados.length;

        const nextPage = currentPage + 1;
        const firstIndex = nextPage * ITEMS_NAVEGACION;

        if(firstIndex >= totalElementos) return;

        setItems([...gastosFiltrados].splice(firstIndex, ITEMS_NAVEGACION));
        setCurrentPage(nextPage);
    }



    const prevHandler = () => {
        const prevPage = currentPage - 1;
        
        if(prevPage < 0) return;

        const firstIndex = prevPage * ITEMS_NAVEGACION;

        setItems([...gastosFiltrados].splice(firstIndex, ITEMS_NAVEGACION));
        setCurrentPage(prevPage);
    }


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

            <div className={`mx-auto w-50 gap-5  d-flex justify-content-center my-3`}>
                <button
                    onClick={ prevHandler }
                    className={`btn btn-success ${styles.btnNav}`}>
                    <i className="bi bi-caret-left-fill"></i>Atrás
                </button>
                <h5>Página { currentPage + 1 }</h5>
                <button
                    onClick={ nextHandler } 
                    className={`btn btn-success ${styles.btnNav}`}>
                    Siguiente<i className="bi bi-caret-right-fill"></i>
                </button>
            </div>

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
            <form className='w-50 mx-auto d-flex justify-content-between mt-4 align-items-center' action="">
                <div className=''>
                    <p className='m-0 '>Total: $ { new Intl.NumberFormat('de-DE').format(precioGastoTotal) }</p>
                </div>
                <div className='w-25 d-flex align-items-center gap-1'>
                    <label htmlFor="inputAnio">Anio:</label>
                    <select
                        onChange={ (e) => handleChange(e, setAnio) }
                        className="form-select" 
                        id="inputAnio" 
                        name="anio"
                        value={ anio }>
                        <option className="text-center"  value="">Año</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                    </select>
                </div>
                <div className=' d-flex align-items-center gap-1'>
                    <label htmlFor="inputMes">Mes:</label>
                    <select
                        onChange={ (e) => handleChange(e, setMes) }
                        className="form-select" 
                        id="inputMes" 
                        name="mes"
                        value={ mes }>
                        <option className="text-center"  value="">Seleccione</option>
                        <option value="January">Enero</option>
                        <option value="February">Febrero</option>
                        <option value="March">Marzo</option>
                        <option value="April">Abril</option>
                        <option value="May">Mayo</option>
                        <option value="June">Junio</option>
                        <option value="July">Julio</option>
                        <option value="August">Agosto</option>
                        <option value="September">Septiembre</option>
                        <option value="October">Octubre</option>
                        <option value="November">Noviembre</option>
                        <option value="December">Diciembre</option>
                    </select>
                </div>
            </form>
            
            <div className="table-responsive text-center mt-4" style={{overflowX: "scroll"}}>
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
                        {items.map((el,index) => {
                            
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
                                    <td>{el.fechaRegistro}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    </>)
}
