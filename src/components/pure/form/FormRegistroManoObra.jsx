import {useState, useEffect} from 'react';
import moment from "moment";
import getDataCollection from '../../../helpers/getDataCollection';
import getIDDoc from '../../../helpers/getIDDoc';
import { getDataTrabajador } from '../../../helpers/getDataTrabajador';
import { getImposiciones } from '../../../helpers/getImposiciones';



export const FormRegistroManoObra = () => {

    const valoresIniciales = {
        nombre_trabajador: "",
        dias: "",
        sueldo: "",
        fecha_registro:"",
        fecha_actividad:"",
        mes_actividad: "",
        anio_actividad: "",
        horas_extras:"",
        asig_herramientas:"",
        bono_produccion:"",
        aguinaldo:"",
        proyecto:""
    }

    //Variables para enviar
    const [valores, setValores] = useState(valoresIniciales);

    const [fechaRegistro, setFechaRegistro] = useState("");

    const [proyectos, setProyectos] = useState([]);
    const [nombreProyecto, setNombreProyecto] = useState("");
    const [trabajadores, setTrabajadores] = useState([]);
    const [nombreTrabajador, setNombreTrabajador] = useState("");
    const [idTrabajador, setIdTrabajador] = useState("");
    const [sueldoBase, setSueldoBase] = useState(0);
    const [sueldo, setSueldo] = useState(0);
    const [horasNoTrabajadas, setHorasNoTrabajadas] = useState("");
    const [gratificacion, setGratificacion] = useState(0);
    const [dataTrabajador, setDataTrabajador] = useState({})


// todo  *** Capturar los valores de los inputs del Form  ***
    const handleInput = (e) => {
        const {name, value} = e.target;
        setValores({...valores, [name]:value});
    }


    const handleClick = () => {
        setFechaRegistro(moment().format('YYYY-MM-DD HH:mm:ss'));
        
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        //Se capturan el mes y año de la fecha de la venta
        const mes = moment(valores.fecha_actividad).format("MMMM");
        const anio = moment(valores.fecha_actividad).format("YYYY");


        alert(` Fecha: ${valores.fecha_actividad} 
                Proyecto: ${nombreProyecto}
                Trabajador: ${nombreTrabajador}
                Días trabaj: ${valores.dias}
                Sueldo: ${valores.sueldo}
                Horas extras: ${valores.horas_extras}
                Asig. Herram: ${valores.asig_herramientas}
                Bono Produc: ${valores.bono_produccion}
                Aguinaldo: ${valores.aguinaldo}
                Fecha registro: ${fechaRegistro}
                Mes: ${mes}
                Año: ${anio}
                ID: ${idTrabajador}
                Sueldo Base: ${ sueldoBase }
                Sueldo: ${ sueldo }
                Hrs No Trabaj: ${ horasNoTrabajadas }
                Gratificacion: ${ gratificacion }`)

        setValores( {...valoresIniciales} )
        setHorasNoTrabajadas("")
    }


    useEffect(() => {
        getDataCollection("proyectos", setProyectos);
        getDataCollection("colaboradores", setTrabajadores);
    },[])


    useEffect(() => {
        if(nombreTrabajador === "") return;

        getIDDoc("colaboradores", nombreTrabajador, setIdTrabajador )
        getDataTrabajador(idTrabajador, setDataTrabajador);
        setSueldoBase(dataTrabajador.sueldo_base);
        setGratificacion(dataTrabajador.gratificacion_legal)
        
    }, [nombreTrabajador, idTrabajador, dataTrabajador])



    useEffect(() => {
        if(nombreTrabajador === "") return;
        setSueldo( getImposiciones(parseInt(valores.dias), sueldoBase))

    },[nombreTrabajador, sueldoBase, valores.dias])

    return (<>
        <form 
            className="row g-4 needs-validation" 
            id="formRegistroGastos" 
            onSubmit={ handleSubmit }
            autoComplete="off">

            <div className="container w-100 d-flex justify-content-around mt-5">
                <div className="col-md-3 text-center">
                    <label className="form-label">Fecha de actividad:</label>
                    <input
                    onChange={ handleInput }
                    type="date" 
                    className="form-control w-75 mx-auto" 
                    id="inputFechaManoObra" 
                    name="fecha_actividad"
                    value={valores.fecha_actividad}
                    />
                </div>

                <div className="col-md-3 text-center">
                    <label className="form-label">Proyecto:</label>
                    <select 
                    className="form-select w-75 mx-auto" 
                    id="proyectoManoObra" 
                    onChange={(e) => setNombreProyecto(e.target.value)} 
                    name="proyecto"
                    value={nombreProyecto}>
                    <option value="">Seleccione</option>
                    { proyectos.map((el, index) => {
                        return(
                            <option value={el.nombre} key={index}> {el.nombre} </option>
                        )
                        })}
                    </select>
                </div>

                <div className="col-md-3 text-center">
                    <label className="form-label">Colaborador:</label>
                    <select 
                    className="form-select w-75 mx-auto" 
                    id="trabajadorManoObra" 
                    onChange={(e) => setNombreTrabajador(e.target.value)} 
                    name="nombre_trabajador"
                    value={nombreTrabajador}>
                    <option value="">Seleccione</option>
                    { trabajadores.map((el, index) => {
                        return(
                            <option value={el.nombre} key={index}> {el.nombre} </option>
                        )
                        })}
                    </select>
                </div>

                <div className="col-md-3 text-center">
                    <label className="form-label">Días trabajados:</label>
                    <div className="input-group w-75 mx-auto" >
                        <input
                            className="form-control "
                            name='dias'
                            type="text"
                            onChange={ handleInput }
                            value={ valores.dias }
                            placeholder='Ejm: 30'/>
                        <span className="input-group-text">días</span>
                    </div>
                    
                </div>

            </div>

{/* //todo  ******   Horas No Trabajadas ******/ }

            <div className="container w-100 d-flex justify-content-around py-4">
                <div className="col-md-3 text-center">
                    <label className="form-label">Horas no trabajadas:</label>
                    <div className="input-group w-75 mx-auto" >
                        <span className="input-group-text">$</span>
                        <input
                            onChange={ (e) => setHorasNoTrabajadas(e.target.value) }
                            value={ horasNoTrabajadas }
                            className="form-control "
                            type="text" 
                            name='horas_no_trabajadas'
                            placeholder='Ejm: 4'/>
                        <span className="input-group-text">hrs.</span>
                    </div>
                </div>
            </div>



{/* //todo  ******   Contribuciones Adicionales  ******/ }
            <div className="container w-100 d-flex justify-content-around my-3">
                <div className="col-md-3 text-center">
                    <label className="form-label">Horas extras:</label>
                    <div className="input-group w-75 mx-auto" >
                        <span className="input-group-text">$</span>
                        <input
                            onChange={ handleInput }
                            value={ valores.horas_extras }
                            className="form-control "
                            type="text" 
                            name='horas_extras'
                            placeholder='Ejm: 50000'/>
                        <span className="input-group-text">.00</span>
                    </div>
                </div>

                <div className="col-md-3 text-center">
                    <label className="form-label">Asignación Herramienta:</label>
                    <div className="input-group w-75 mx-auto" >
                        <span className="input-group-text">$</span>
                        <input
                            onChange={ handleInput }
                            className="form-control "
                            type="text"
                            name='asig_herramientas'
                            value={ valores.asig_herramientas }
                            placeholder='Ejm: 200000'/>
                        <span className="input-group-text">.00</span>
                    </div>
                </div>

                <div className="col-md-3 text-center">
                    <label className="form-label">Bono Producción:</label>
                    <div className="input-group w-75 mx-auto" >
                        <span className="input-group-text">$</span>
                        <input
                            onChange={ handleInput }
                            className="form-control "
                            type="text"
                            name='bono_produccion'
                            value={ valores.bono_produccion } 
                            placeholder='Ejm: 200000'/>
                        <span className="input-group-text">.00</span>
                    </div>
                </div>

                <div className="col-md-3 text-center">
                    <label className="form-label">Aguinaldo:</label>
                    <div className="input-group w-75 mx-auto" >
                        <span className="input-group-text">$</span>
                        <input
                            onChange={ handleInput }
                            className="form-control "
                            type="text"
                            name='aguinaldo' 
                            placeholder='Ejm: 100000'
                            value={ valores.aguinaldo }/>
                        <span className="input-group-text">.00</span>
                    </div>
                </div>

            </div>

            <div className='col-6 mx-auto d-flex  justify-content-evenly '>
                    <button
                        onClick={() => { handleClick()}}
                        className="btn btn-primary w-25" 
                        type="submit" >
                        Registrar
                    </button>
                </div>

        </form>

    </>)
}
