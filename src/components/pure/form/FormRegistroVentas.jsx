import {useState, useEffect} from 'react';
import moment from 'moment';
import { doc, arrayUnion, updateDoc } from 'firebase/firestore';
import db from '../../../backend/DBFiresbase';
import getDataCollection from "../../../helpers/getDataCollection";
import getIDDoc from "../../../helpers/getIDDoc.js";



export default function FormRegistroVentas() {

    //Se almacenan array de los proyectos para extraer sus nombres en las opciones del input select
    const [proyectos, setProyectos] = useState([]);


//todo  ****  Setting data a Firebase ***
    //Data del objeto a enviar
    const valoresIniciales = {
        factura: "",
        proyecto: "",
        tipoVenta: "",
        valor: "",
        fechaVenta: "",
        mesVenta: "",
        anioVenta: "",
        fechaRegistro: "",
        nOCAdicional:"",
    }

    const [valores, setValores] = useState(valoresIniciales);

    //fecha de Registro
    const [fechaRegistro, setFechaRegistro] = useState("");

    //Almacena el nombre de proyecto
    const [nombreProyecto, setNombreProyecto] = useState("");

    //Almacena el ID del proyecto
    const [id, setId] = useState("");




//todo **** F U N C I O N E S  ****

// ?  *** Capturar los valores de los inputs del Form  ***
    const handleInput = (e) => {
        const {name, value} = e.target;
        setValores({...valores, [name]:value});
    }


//?  *** Enviar la data a firebase
    const handleSubmit = (e) => {
        e.preventDefault();

        //Se capturan el mes y año de la fecha de la venta
        const mes = moment(valores.fechaVenta).format("MMMM");
        const anio = moment(valores.fechaVenta).format("YYYY");

        //Se envían los datos de la venta al proyecto correspondiente
        const nuevaVenta = doc(db, "proyectos", id);

        updateDoc(nuevaVenta,{ ventas: arrayUnion({...valores, fechaRegistro: fechaRegistro, anioVenta:anio, mesVenta:mes, proyecto:nombreProyecto })});

        //Se limpian los valores del formulario
        setValores({...valoresIniciales});
    }

    

//? *** Registar la fecha en la que se envía la venta ***
    const handleClick = () => {
        setFechaRegistro(moment().format('YYYY-MM-DD'));
    }


//todo   *** MOSTRANDO  DATA  DE LOS NOMBRES DE LOS PROYECTOS  DE  FIREBASE  ***
    useEffect(() => {

        // Trayendo los nombres de los proyectos de Firestore
        getDataCollection("proyectos", setProyectos);

        // Trayendo el ID del proyecto seleccionado
        const obtenerID = async () => {
            nombreProyecto !== "" && getIDDoc("proyectos", nombreProyecto, setId);
        }
        obtenerID();

    }, [nombreProyecto]);

    

    return (<>
        <form 
            className="row g-4 needs-validation mx-auto" 
            id="formRegistroVentas" 
            onSubmit={handleSubmit}
            autoComplete="off">

            <div className="col-md-7 mx-auto">
                <label className="form-label">Proyecto:</label>
                <select
                    onChange={ (e) => setNombreProyecto(e.target.value) }
                    className="form-select" 
                    id="inputProveedorGasto" 
                    name="proyecto"
                    value={nombreProyecto}>
                    <option value="">Seleccione</option>

                    {/* Se extraen los nombres de los proyectos */}
                        { proyectos.map((el, index) => {
                        return(
                            <option value={el.nombre} key={index}> {el.nombre} </option>
                        )
                        })}
                </select>
            </div>

            <div className="col-md-7 mx-auto">
                <label className="form-label">N° de Factura:</label>
                <input 
                    onChange={handleInput}
                    type="text"
                    className="form-control" 
                    id="inputFacturaVenta"
                    name="factura"
                    value={valores.factura} />
            </div>

            <div className="col-md-7 mx-auto">
                <label className="form-label">Tipo de Venta:</label>
                <select
                    onChange={handleInput}
                    className="form-select" 
                    id="inputProveedorGasto" 
                    name="tipoVenta"
                    value={valores.tipoVenta}>
                    <option value="">Seleccione</option>
                    <option value="Estado Pago">Estado Pago</option>
                    <option value="Pago Adicional">Pago Adicional</option>
                </select>
            </div>

            {(valores.tipoVenta === "Pago Adicional") &&
                <div className="col-md-7 mx-auto">
                    <label className="form-label">N° Orden de Compra:</label>
                    <input 
                        onChange={handleInput}
                        type="text"
                        className="form-control" 
                        id="nOCAdicionalVentas"
                        name="nOCAdicional"
                        value={valores.nOCAdicional} />
                </div>
            }

            <div className="col-md-7 mx-auto">
                <label className="form-label">Valor de Venta:</label>
                <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                    onChange={handleInput}
                    type="number" 
                    className="form-control" 
                    id="inputVentaProyecto"
                    name="valor"
                    value={valores.valor}
                    />
                    <span className="input-group-text">.00</span>
                </div>
            </div>


            <div className="col-md-7 mx-auto">
                <label className="form-label">Fecha de Venta:</label>
                <input
                    onChange={handleInput}
                    type="date" 
                    className="form-control" 
                    id="inputFechaInicioProyecto" 
                    name="fechaVenta"
                    value={valores.fechaVenta}
                />
            </div>

            <div className='col-6 mx-auto d-flex  justify-content-evenly '>
                <button
                    onClick={() => { handleClick()}}
                    className="btn btn-primary w-25" 
                    type="submit" >
                Registrar</button>

                <button 
                    type="button" 
                    className="btn btn-danger w-25" 
                    data-bs-dismiss="modal">
                Salir</button>
            </div>
        </form>
    </>)
}
