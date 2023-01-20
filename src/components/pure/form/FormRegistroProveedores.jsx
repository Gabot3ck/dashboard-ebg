import {useState} from 'react';
import moment from 'moment';


export default function FormRegistroProveedores({setData}) {

    const valoresIniciales = {
        razonSocial: "",
        suministro: "",
        web: "",
        celular: "",
        fono: "",
        formaPago: {
            tipoPago: "",
            diasPago: "",
        },
        datosTransferencia:{
            nombrePago:"",
            banco: "",
            cuenta: "",
            nCuenta: "",
            emailTransferencia:"",
        },
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
    const [tipoPago, setTipoPago] = useState("");
    const [diasPago, setDiasPago] = useState("");
    const [nombrePago, setNombrePago] = useState("");
    const [banco, setBanco] = useState("");
    const [cuenta, setCuenta] = useState("");
    const [nCuenta, setNCuenta] = useState("");
    const [emailTransferencia, setEmailTransferencia] = useState("");



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
            formaPago: {
                tipoPago: tipoPago,
                diasPago: diasPago,
            },
            datosTransferencia:{
                nombrePago: nombrePago,
                banco: banco,
                cuenta: cuenta,
                nCuenta: nCuenta,
                emailTransferencia: emailTransferencia,
            },
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
        setTipoPago("");
        setDiasPago("");
        setNombrePago("");
        setBanco("");
        setCuenta("");
        setNCuenta("");
        setEmailTransferencia("");
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
        id="formRegistroProveedores" 
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
                    id="nombreProveedor"
                    placeholder='Ejemplo: SODIMAC' />
            </div>

            <div className="col-md-6">
                <label className="form-label">Suministro</label>
                <input
                    onChange={handleInput}
                    name="suministro"
                    value={valores.suministro}
                    type="text" 
                    className="form-control" 
                    id="suministroProveedor"
                    placeholder='Ejemplo: Fierro y acero' />
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
                        id="celularProveedor" 
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
                        id="fonoProveedor" 
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
                    id="webProveedor" 
                    placeholder='Ejemplo: www.miweb.com'
                    />
            </div>

            <div className="col-md-6">
                <label className="form-label">Forma de Pago</label>
                <select 
                    className="form-select" 
                    id="formaPagoProveedor" 
                    onChange={e => setTipoPago(e.target.value)} 
                    name="tipoPago"
                    value={tipoPago}>
                    <option value="">Seleccione</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="Crédito">Crédito</option>
                    <option value="Cheque">Cheque</option>
                </select>
            </div>

            <div className="col-md-3">
                <label className="form-label">Días de pago:</label>
                <div className="input-group">
                    <input
                        onChange={e => setDiasPago(e.target.value)}
                        type="text"
                        inputMode="numeric" 
                        pattern="\d*" 
                        className="form-control" 
                        id="diasPago"
                        name="importeGasto"
                        value={diasPago}
                        maxLength="3" 
                        min="0"
                        />
                    <span className="input-group-text">días</span>
                </div>
            </div>


{/* //todo       ****  Datos  para la Transferencia  **** */}
            <label  className="form-label">Datos para transferencia bancaria</label>
            <div className="col-md-12">
                <label className="form-label">Nombre Completo</label>
                <input
                    onChange={e => setNombrePago(e.target.value)}
                    name="nombrePago"
                    value={nombrePago}
                    type="text" 
                    className="form-control" 
                    id="nombreTransferenciaProveedor" 
                    placeholder="Ejemplo: Juan Pérez García"
                    />
                    
            </div>

            <div className="col-md-4">
                <label className="form-label">Banco</label>
                <input
                    onChange={e => setBanco(e.target.value)}
                    name="banco"
                    value={banco}
                    type="text" 
                    className="form-control" 
                    id="bancoTransferenciaProveedor" 
                    placeholder="Ejemplo: Santander"
                    />
                    
            </div>

            <div className="col-md-4">
                <label className="form-label">Tipo de cuenta</label>
                <select 
                    className="form-select" 
                    id="cuentaPagoProveedor" 
                    onChange={e => setCuenta(e.target.value)} 
                    name="cuenta"
                    value={cuenta}>
                    <option value="">Seleccione</option>
                    <option value="Cuenta Corriente">Cuenta Corriente</option>
                    <option value="Cuenta Vista">Cuenta Vista</option>
                    <option value="Cuenta Rut">Cuenta Rut</option>
                    <option value="Cuenta Chequera Electrónica">Cuenta Chequera Electrónica</option>
                </select>
            </div>

            <div className="col-md-3">
                <label className="form-label">N° de cuenta:</label>
                <input
                    onChange={e => setNCuenta(e.target.value)}
                    type="text"
                    inputMode="numeric" 
                    pattern="\d*"
                    className="form-control" 
                    id="nCuentaProveedores"
                    name="nCuenta"
                    value={nCuenta}
                    placeholder='Ejemplo: 002587845200'
                    />
            </div>

            <div className="col-md-6">
                <label className="form-label">Email de transferencia :</label>
                <input
                    onChange={e => setEmailTransferencia(e.target.value)}
                    name="emailContacto"
                    value={emailTransferencia}
                    type="email" 
                    className="form-control" 
                    id="emailContactoProveedor"
                    placeholder='Ejemplo: contacto@gmail.com'
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
                    id="direccionProveedor"
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
                id="comunaProveedor" />
            </div>

            <div className="col-md-6">
                <label className="form-label">Región</label>
                <input
                    onChange={e => setRegion(e.target.value)}
                    name="region"
                    value={region} 
                    type="text" 
                    className="form-control" 
                    id="regionProveedor" />
            </div>
            
            
            
            <label  className="form-label">Datos del vendedor</label>

            <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input
                    onChange={e => setNombreContacto(e.target.value)}
                    name="nombreContacto"
                    value={nombreContacto} 
                    type="text" 
                    className="form-control" 
                    id="nombreContactoProveedor"
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
                    id="apellidoContactoProveedor"
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
                        id="cellContactoProveedor" 
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
                        id="fonoContactoProveedor" 
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
                    id="emailContactoProveedor"
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
