import {useState, useEffect} from 'react';
import moment from "moment";
import getDataCollection from '../../../helpers/getDataCollection';



export const FormRegistroManoObra = () => {

    const valoresIniciales = {
        trabajador: "",
        dias: "",
        saldo: "",
        nombreProyecto: "",
        fechaRegistro:"",
        fechaActividad:"",
        mesActividad: "",
        anioActividad: "",
    }

    const [valores, setValores] = useState(valoresIniciales);

    const [fechaRegistro, setFechaRegistro] = useState("");

    const [proyectos, setProyectos] = useState([]);
    const [nombreProyecto, setNombreProyecto] = useState("");
    const [trabajadores, setTrabajadores] = useState([]);
    const [nombreTrabajador, setNombreTrabajador] = useState("");


    // ?  *** Capturar los valores de los inputs del Form  ***
    const handleInput = (e) => {
        const {name, value} = e.target;
        setValores({...valores, [name]:value});
    }


    const handleClick = () => {
        setFechaRegistro(moment().format('YYYY-MM-DD HH:mm:ss'));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        alert(nombreProyecto)
    }


    useEffect(() => {
        getDataCollection("proyectos", setProyectos);
        getDataCollection("colaboradores", setTrabajadores);

    },[])



    return (<>
        <form 
            className="row g-4 needs-validation" 
            id="formRegistroGastos" 
            onSubmit={handleSubmit}
            autoComplete="off">

            <div className="container w-100 d-flex justify-content-around mt-5">
                <div className="col-md-3 text-center">
                    <label className="form-label">Fecha de actividad:</label>
                    <input
                    onChange={handleInput}
                    type="date" 
                    className="form-control w-75 mx-auto" 
                    id="inputFechaManoObra" 
                    name="fechaGasto"
                    value={valores.fechaGasto}
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
                    name="trabajador"
                    value={nombreTrabajador}>
                    <option value="">Seleccione</option>
                    { trabajadores.map((el, index) => {
                        return(
                            <option value={`${el.nombre} ${el.apellido_paterno}`} key={index}> {`${el.nombre} ${el.apellido_paterno}`} </option>
                        )
                        })}
                    </select>
                </div>

                <div className="col-md-3 text-center">
                    <label className="form-label">Días trabajados:</label>
                    <div className="input-group w-75 mx-auto" >
                        <input
                            className="form-control "
                            type="text" 
                            placeholder='Ejm: 30'/>
                        <span className="input-group-text">días</span>
                    </div>
                    
                </div>

            </div>


{/* //todo  ******   Contribuciones Adicionales  ******/}
            <div className="container w-100 d-flex justify-content-around my-5">
                <div className="col-md-3 text-center">
                    <label className="form-label">Horas extras:</label>
                    <div className="input-group w-75 mx-auto" >
                        <span className="input-group-text">$</span>
                        <input
                            className="form-control "
                            type="text" 
                            placeholder='Ejm: 50000'/>
                        <span className="input-group-text">.00</span>
                    </div>
                </div>

                <div className="col-md-3 text-center">
                    <label className="form-label">Asignación Herramienta:</label>
                    <div className="input-group w-75 mx-auto" >
                        <span className="input-group-text">$</span>
                        <input
                            className="form-control "
                            type="text" 
                            placeholder='Ejm: 200000'/>
                        <span className="input-group-text">.00</span>
                    </div>
                </div>

                <div className="col-md-3 text-center">
                    <label className="form-label">Bono Producción:</label>
                    <div className="input-group w-75 mx-auto" >
                        <span className="input-group-text">$</span>
                        <input
                            className="form-control "
                            type="text" 
                            placeholder='Ejm: 200000'/>
                        <span className="input-group-text">.00</span>
                    </div>
                </div>

                <div className="col-md-3 text-center">
                    <label className="form-label">Aguinaldo:</label>
                    <div className="input-group w-75 mx-auto" >
                        <span className="input-group-text">$</span>
                        <input
                            className="form-control "
                            type="text" 
                            placeholder='Ejm: 100000'/>
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
