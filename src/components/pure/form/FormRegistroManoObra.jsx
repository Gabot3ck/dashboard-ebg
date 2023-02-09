import {useState, useEffect} from 'react';
import moment from "moment";
import getDataCollection from '../../../helpers/getDataCollection';



export const FormRegistroManoObra = () => {

    const valoresIniciales = {
        trabajador: "",
        dias: "",
        saldo: "",
        nombreProyecto: "",
    }

    const [valores, setValores] = useState(valoresIniciales);

    const [fechaRegistro, setFechaRegistro] = useState("");

    const [proyectos, setProyectos] = useState([]);
    const [nombreProyecto, setNombreProyecto] = useState("");


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

    },[])



    return (<>
        <form 
            className="row g-4 needs-validation" 
            id="formRegistroGastos" 
            onSubmit={handleSubmit}
            autoComplete="off">

            <div className="col-md-3">
                <label className="form-label">Proyecto:</label>
                <select 
                className="form-select" 
                id="validationCustom08" 
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

            <div className="col-md-3">
                <input
                    className="form-control"
                    type="text" 
                    placeholder='Ejm: 30'
                    />
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
