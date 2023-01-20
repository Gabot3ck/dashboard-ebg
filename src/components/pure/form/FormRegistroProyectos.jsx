import {useState, useEffect} from 'react';
import moment from 'moment';
import getDataCollection from '../../../helpers/getDataCollection';

export default function FormRegistroProyectos({setData}) {
    const valoresIniciales = {
        nombre: "",
        presupuesto: "",
        cliente: "",
        fechaInicio: "",
        fechaTermino: "",
        direccion: "",
        comuna: "",
        region:"",
        nDoc:"",
        tipoDoc:"",
        mesInicio: "",
        mesTermino: "",
        anioInicio: "",
        anioTermino: "",
        fechaRegistro: "",
        descripcion: "",
        estado: "ejecución",
        area:"",
        ventas:[],
        gastos:[],
    }

    const [valores, setValores] = useState(valoresIniciales);
    const [fechaRegistro, setFechaRegistro] = useState("");


    // ALmacenando los  datos de Firebase (proveedores)
    const [clientes, setClientes] = useState([]);

    //Captura de los valores del formulario
    const handleInput = (e) => {
        const {name, value} = e.target;
        setValores({...valores, [name]:value});
    }

    //Enviando los datos del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        setData({...valores, fechaRegistro: fechaRegistro});
        setValores({...valoresIniciales});
    }

    //Capturando la fecha del registro
    const handleClick = () => {
        setFechaRegistro(moment().format('YYYY-MM-DD HH:mm:ss'));
    }

    // Mostrando los datos en la interfaz
    useEffect(() => {
        getDataCollection("clientes",setClientes)
    }, []);


    return (<>
        <form 
            className="row g-4 needs-validation" 
            id="formRegistroProyectos" 
            onSubmit={handleSubmit}
            autoComplete="off">

            <div className="col-md-6">
                <label className="form-label">Nombre del proyecto:</label>
                <input 
                onChange={handleInput}
                type="text"
                className="form-control" 
                id="inputNombreProyecto"
                name="nombre"
                value={valores.nombre} />
            </div>

            <div className="col-md-6">
                <label className="form-label">Presupuesto del proyecto:</label>
                <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                    onChange={handleInput}
                    type="text" 
                    className="form-control" 
                    id="inputVentaProyecto"
                    name="presupuesto"
                    value={valores.presupuesto}
                    inputMode="numeric"
                    pattern="\d*"
                    />
                    <span className="input-group-text">.00</span>
                </div>
            </div>

            <div className="col-md-4">
                <label className="form-label">Cliente:</label>
                <select
                    onChange={handleInput}
                    className="form-select" 
                    id="inputClienteProyecto" 
                    name="cliente"
                    value={valores.cliente}>
                    <option  value="">Seleccione</option>
                        { clientes.map((el, index) => {
                        return(
                            <option value={el.razonSocial} key={index}> {el.razonSocial} </option>
                        )
                        })}
                </select>
            </div>

            <div className="col-md-4">
                <label className="form-label">N° Doc. Contractual</label>
                <input
                    onChange={handleInput}
                    type="text" 
                    className="form-control" 
                    id="nDocProyecto" 
                    name="nDoc"
                    value={valores.nDoc}
                />
            </div>

            <div className="col-md-4">
                <label className="form-label">Tipo de Doc. Contractual</label>
                <select
                    onChange={handleInput}
                    className="form-select"
                    id="tipoDocProyecto"
                    name="tipoDoc"
                    value={valores.tipoDoc}>
                    <option value="">Seleccione</option>
                    <option value="Orden de Compra">Orden de Compra</option>
                    <option value="Contrato">Contrato</option>
                </select>
            </div>


            <div className="col-md-4">
                <label className="form-label">Fecha de inicio:</label>
                <input
                onChange={handleInput}
                type="date" 
                className="form-control" 
                id="inputFechaInicioProyecto" 
                name="fechaInicio"
                value={valores.fechaInicio}
                />
            </div>

            <div className="col-md-4">
                <label className="form-label">Fecha de término:</label>
                <input
                onChange={handleInput}
                type="date" 
                className="form-control" 
                id="inputFechaTerminoProyecto" 
                name="fechaTermino"
                value={valores.fechaTermino}
                />
            </div>

            <div className="col-md-4">
                <label className="form-label">Área del proyecto</label>
                <select
                    onChange={handleInput}
                    className="form-select"
                    id="areaProyecto"
                    name="area"
                    value={valores.area}>
                    <option value="">Seleccione</option>
                    <option value="OOCC">OOCC</option>
                    <option value="Remodelaciones">Remodelaciones</option>
                    <option value="Licitaciones">Licitaciones</option>
                    <option value="Muebleria">Mueblería</option>
                </select>
            </div>


{/* //todo       ****  Datos  de  ubicación  **** */}
            <label  className="form-label">Ubicación</label>

            <div className="col-md-4">
                <label className="form-label">Dirección</label>
                <input
                    onChange={handleInput}
                    name="direccion"
                    value={valores.direccion}
                    type="text" 
                    className="form-control" 
                    id="direccionProyecto"
                    placeholder='Ejemplo: Av. El Parrón 345' />
            </div>

            <div className="col-md-4">
                <label className="form-label">Región</label>
                <input
                    onChange={handleInput}
                    name="region"
                    value={valores.region} 
                    type="text" 
                    className="form-control" 
                    id="regionProyecto" />
            </div>

            <div className="col-md-4">
                <label className="form-label">Comuna</label>
                <input
                onChange={handleInput}
                name="comuna"
                value={valores.comuna} 
                type="text" 
                className="form-control" 
                id="comunaProyecto" />
            </div>

            <div className="col-md-10">
                <label className="form-label">Descripción:</label>
                <textarea 
                    onChange={handleInput}
                    className="form-control" 
                    placeholder="Ingrese una descripción aquí" 
                    id="descripcionProyecto" 
                    name="descripcion"
                    value={valores.descripcion}
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
