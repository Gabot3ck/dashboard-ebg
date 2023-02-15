import {useState, useEffect} from 'react';
import moment from "moment";
import getDataCollection from '../../../helpers/getDataCollection';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import db from '../../../backend/DBFiresbase';
import getIDDoc from '../../../helpers/getIDDoc.js';


export default function FormRegistroDeGastos() {


  const valoresIniciales = {
    factura: "",
    fechaGasto: "",
    valor: "",
    proveedor: "",
    tipo: "",
    concepto: "",
    proyecto: "",
    formaPago: "",
    cuenta: "",
    descripcion: "",
    fechaRegistro: "",
    mesGasto:"",
    anioGasto:""
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

  //Enviando Data
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Se capturan el mes y año de la fecha de la venta
    const mes = moment(valores.fechaGasto).format("MMMM");
    const anio = moment(valores.fechaGasto).format("YYYY");

    //Se envían los datos de la venta al proyecto correspondiente
    const nuevoGasto = doc(db, "proyectos", id);

    //Enviando Data a Firebase
    updateDoc(nuevoGasto, {gastos: arrayUnion({...valores, fechaRegistro: fechaRegistro, anioGasto:anio, mesGasto:mes, proyecto:nombreProyecto })});
    

    //Se limpian los valores del formulario
    setValores({...valoresIniciales});
  }


  const handleClick = () => {
    setFechaRegistro(moment().format('YYYY-MM-DD HH:mm:ss'));
  }

  // Obteniendo  datos de Firebase (proveedores y proyectos)
  const [proveedores, setProveedores] = useState([]);
  const [proyectos, setProyectos] = useState([]);

  
  
  
  // Mostrando los datos en la interfaz
    useEffect(() => {

      // Obteniendo  datos de Firebase (proveedores y proyectos)
      getDataCollection("proveedores",setProveedores)
      getDataCollection("proyectos",setProyectos)

      // Trayendo el ID del proyecto seleccionado
      const obtenerID = async () => {
        nombreProyecto !== "" && getIDDoc("proyectos", nombreProyecto, setId);
    }
    obtenerID();

  }, [nombreProyecto]);


    return (<>

        <form 
          className="row g-4 needs-validation" 
          id="formRegistroGastos" 
          onSubmit={handleSubmit}
          autoComplete="off">

          <div className="col-md-6">
              <label className="form-label">N° de Factura:</label>
              <input 
                onChange={handleInput}
                type="text"
                className="form-control" 
                id="inputFacturaGasto"
                name="factura"
                value={valores.factura} />
          </div>

          <div className="col-md-6">
              <label className="form-label">Fecha del gasto:</label>
              <input
              onChange={handleInput}
              type="date" 
              className="form-control" 
              id="inputFechaGasto" 
              name="fechaGasto"
              value={valores.fechaGasto}
              />
          </div>

          <div className="col-md-4">
            <label className="form-label">Valor neto del gasto:</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                onChange={handleInput}
                type="text"
                inputMode='numeric'
                pattern= "\d*" 
                className="form-control" 
                id="inputImporteGasto"
                name="valor"
                value={valores.valor}
                step="0.01" 
                min="0"
                />
              <span className="input-group-text">.00</span>
            </div>
          </div>


          <div className="col-md-4">
            <label className="form-label">Proveedor:</label>
            <select
            onChange={handleInput}
            className="form-select" 
            id="inputProveedorGasto" 
            name="proveedor"
            value={valores.proveedor}>
              <option  value="">Seleccione</option>
                { proveedores.map((el, index) => {
                  return(
                    <option value={el.razonSocial} key={index}> {el.razonSocial} </option>
                  )
                })}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Tipo:</label>
            <select 
            className="form-select" 
            id="validationCustom05" 
            onChange={handleInput}
            name="tipo"
            value={valores.tipo}>
              <option value="">Seleccione</option>
              <option value="Fijo">Fijo</option>
              <option value="Variable">Variable</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Concepto:</label>
            <select 
            className="form-select"
            id="validationCustom12" 
            onChange={handleInput} 
            name="concepto"
            value={valores.concepto}>
              <option value="">Seleccione</option>
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
          </div>

          <div className="col-md-4">
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

          <div className="col-md-4">
            <label className="form-label">Forma de pago:</label>
            <select 
            className="form-select" 
            id="validationCustom09" 
            onChange={handleInput} 
            name="formaPago"
            value={valores.formaPago}>
              <option value="">Seleccione</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Cheque">Cheque</option>
              <option value="Cuenta por cobrar">Cuenta por cobrar</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Cuenta:</label>
            <select 
            className="form-select" 
            id="validationCustom10" 
            onChange={handleInput} 
            name="cuenta"
            value={valores.cuenta}>
              <option value="">Seleccione</option>
              <option value="Cuenta Corriente">Cuenta Corriente</option>
              <option value="Cuenta Rut">Cuenta Rut</option>
            </select>
          </div>

          <div className="col-md-8">
            <label className="form-label">Descripción:</label>
            <textarea 
            onChange={handleInput}
            className="form-control" 
            placeholder="Ingrese una descripción aquí" 
            id="validationCustom11" 
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
