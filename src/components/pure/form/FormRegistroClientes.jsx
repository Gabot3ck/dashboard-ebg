import {useState} from 'react';
import moment from 'moment';



export default function FormRegistroClientes({setData}) {

    const valoresIniciales = {
        razonSocial: "",
        suministro: "",
        web: "",
        celular: "",
        fono: "",
        ubicacion: {
            direccion: "",
            comuna: "",
            region: "",
        },
        contacto: {
            nombreContacto: "",
            apellidoContacto: "",
            emailContacto: "",
            cellContacto: "",
            fonoContacto: "",
        },
        fechaRegistro: "",
    }

    const [valores, setValores] = useState(valoresIniciales);
    const [fechaRegistro, setFechaRegistro] = useState("");
    const [direccion, setDireccion] = useState("");
    const [comuna, setComuna] = useState("");
    const [region, setRegion] = useState("");
    const [nombreContacto, setNombreContacto] = useState("");
    const [apellidoContacto, setApellidoContacto] = useState("");
    const [emailContacto, setEmailContacto] = useState("");
    const [cellContacto, setCellContacto] = useState("");
    const [fonoContacto, setFonoContacto] = useState("");


    const handleInput = (e) => {
        const {name, value} = e.target;
        setValores({...valores, [name]:value});
        }
    
    const handleSubmit = (e) => {
    e.preventDefault();
    const mes = moment(valores.fecha).format("MMMM");
    const anio = moment(valores.fecha).format("YYYY");

    //Envianda el registro del formulario a Firebase
    setData({
        ...valores, 
        fechaRegistro: fechaRegistro, 
        mes: mes, 
        anio: anio,
        ubicacion:{
            direccion: direccion,
            comuna: comuna,
            region: region,
        },
        contacto:{
            nombreContacto: nombreContacto,
            apellidoContacto: apellidoContacto,
            emailContacto: emailContacto,
            cellContacto: cellContacto,
            fonoContacto: fonoContacto,

        }
    });
    setValores({...valoresIniciales,});
    setDireccion("");
    setComuna("");
    setRegion("");
    setNombreContacto("");
    setApellidoContacto("");
    setEmailContacto("");
    setCellContacto("");
    setFonoContacto("");
    }
    

    const handleClick = () => {
    setFechaRegistro(moment().format('YYYY-MM-DD HH:mm:ss'));
    }

    return (<>

        <form 
            className="row g-4"
            id="formRegistroClientes" 
            onSubmit={handleSubmit}
            autoComplete="off">
            
{/* //?       ****  Datos  generales  **** */}
            <label  className="form-label">Datos</label>

            <div className="col-md-6">
                <label className="form-label">Razón Social</label>
                <input
                    onChange={handleInput}
                    name="razonSocial"
                    value={valores.razonSocial}
                    type="text" 
                    className="form-control" 
                    id="nombreCliente"
                    placeholder='Ejemplo: ENEL' />
            </div>

            <div className="col-md-6">
                <label className="form-label">Suministro</label>
                <input
                    onChange={handleInput}
                    name="suministro"
                    value={valores.suministro}
                    type="text" 
                    className="form-control" 
                    id="suministroCliente"
                    placeholder='Ejemplo: Energía Eléctrica' />
            </div>

            <div className="col-md-6">
                <label className="form-label">Celular</label>
                <div className="input-group">
                    <span className="input-group-text">+56</span>
                    <input
                        onChange={handleInput}
                        name="celular"
                        value={valores.celular}
                        type="tel" 
                        className="form-control" 
                        id="celularCliente" 
                        maxLength="9"
                        placeholder='Ejemplo: 993325588'
                        />
                </div>
            </div>

            <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <div className="input-group">
                    <span className="input-group-text">+56</span>
                    <input
                        onChange={handleInput}
                        name="fono"
                        value={valores.fono}
                        type="tel" 
                        className="form-control" 
                        id="fonoCliente" 
                        maxLength="10"
                        placeholder='Ejemplo: 228501589'
                        />
                </div>
            </div>

            <div className="col-md-12">
                <label className="form-label">Sitio Web</label>
                <input
                    onChange={handleInput}
                    name="web"
                    value={valores.web}
                    type="text"
                    className="form-control"   
                    id="webCliente" 
                    placeholder='Ejemplo: www.miweb.com'
                    />
            </div>


{/* //?       ****  Datos  de  ubicación  **** */}
            <label  className="form-label">Ubicación</label>

            <div className="col-md-6">
                <label className="form-label">Dirección</label>
                <input
                    onChange={e => setDireccion(e.target.value) }
                    name="direccion"
                    value={direccion}
                    type="text" 
                    className="form-control" 
                    id="direccionCliente"
                    placeholder='Ejemplo: Av. El Parrón 345' />
            </div>

            <div className="col-md-6">
                <label className="form-label">Comuna</label>
                <input
                onChange={e => setComuna(e.target.value)}
                name="comuna"
                value={comuna} 
                type="text" 
                className="form-control" 
                id="comunaCliente" />
            </div>

            <div className="col-md-6">
                <label className="form-label">Región</label>
                <input
                    onChange={e => setRegion(e.target.value)}
                    name="region"
                    value={region} 
                    type="text" 
                    className="form-control" 
                    id="regionCliente" />
            </div>


{/* //?        ****  Datos  deL vendedor  **** */}
            <label  className="form-label">Datos del vendedor</label>

            <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input
                    onChange={e => setNombreContacto(e.target.value)}
                    name="nombreContacto"
                    value={nombreContacto} 
                    type="text" 
                    className="form-control" 
                    id="nombreContactoCliente"
                    placeholder='Ejemplo: Juan' />
            </div>

            <div className="col-md-6">
                <label className="form-label">Apellido</label>
                <input
                    onChange={e => setApellidoContacto(e.target.value)}
                    name="apellidoContacto"
                    value={apellidoContacto} 
                    type="text" 
                    className="form-control" 
                    id="apellidoContactoCliente"
                    placeholder='Ejemplo: Pérez' />
            </div>

            <div className="col-md-6">
                <label className="form-label">Celular</label>
                <div className="input-group">
                    <span className="input-group-text">+56</span>
                    <input
                        onChange={e => setCellContacto(e.target.value)}
                        name="cellContacto"
                        value={cellContacto} 
                        type="tel" 
                        className="form-control" 
                        id="cellContactoCliente" 
                        maxLength="9"
                        placeholder='Ejemplo: 993325588'
                        />
                </div>
                
            </div>

            <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <div className="input-group">
                    <span className="input-group-text">+56</span>
                    <input
                        onChange={e => setFonoContacto(e.target.value)}
                        name="fonoContacto"
                        value={fonoContacto}
                        type="tel" 
                        className="form-control" 
                        id="fonoContactoCliente" 
                        maxLength="10"
                        placeholder='Ejemplo: 228501589'
                        />
                </div>
                
            </div>

            <div className="col-md-8">
                <label className="form-label">Email</label>
                <input
                    onChange={e => setEmailContacto(e.target.value)}
                    name="emailContacto"
                    value={emailContacto}
                    type="email" 
                    className="form-control" 
                    id="emailContactoCliente"
                    placeholder='Ejemplo: contacto@gmail.com' />
            </div>
            

            <div className="col-6 mx-auto  d-flex justify-content-around">
                <button
                onClick={handleClick} 
                type="submit" 
                className="btn btn-primary w-25">
                Registrar</button>

                <button 
                type="submit" 
                className="btn btn-danger w-25"
                data-bs-dismiss="modal">
                Salir</button>
            </div>
        </form>
    </>)
}
