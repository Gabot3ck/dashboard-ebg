import {useState, useEffect} from 'react';
import moment from "moment";
import getDataCollection from '../../../helpers/getDataCollection';
import getIDDoc from '../../../helpers/getIDDoc';
import { getDataTrabajador } from '../../../helpers/getDataTrabajador';
import { getImposiciones } from '../../../helpers/getImposiciones';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import db from '../../../backend/DBFiresbase';
import { getDescuentos } from '../../../helpers/getDescuentos';




export const FormRegistroManoObra = () => {

    const valoresIniciales = {
        fechaRegistro:"",
        fechaGasto:"",
        mesGasto: "",
        anioGasto: "",
        proyecto:"",
        nombre_trabajador: "",
        dias_trabajados: "",
        horas_no_trabajadas:"",
        horas_extras:"",
        asig_herramientas:"",
        bono_produccion:"",
        aguinaldo:"",
        bono_asistencia:"",
        bono_seguridad:"",
        afp:"",
        prevision_salud:"",
        cesantia: "",
        mutual:"",
        sis:"",
        total_imponible:"",
        total_no_imponible:"",
        valor: "",
        concepto:"Mano de Obra",
        tipo:"Fijo",
    }

    //Variables para enviar
    const [valores, setValores] = useState(valoresIniciales);
    const [fechaRegistro, setFechaRegistro] = useState("");

    const [idTrabajador, setIdTrabajador] = useState("");
    const [nombreTrabajador, setNombreTrabajador] = useState("");
    const [dataTrabajador, setDataTrabajador] = useState({});
    const [sueldoBase, setSueldoBase] = useState(0);
    const [gratificacion, setGratificacion] = useState(0);
    const [bonoSeguridad, setBonoSeguridad] = useState(0);
    const [bonoAsistencia, setBonoAsistencia] = useState(0);
    const [colacion, setColacion] = useState(0);
    const [movilizacion, setMovilizacion] = useState(0);
    const [totalImponible, setTotalImponible] = useState(0);
    const [totalNoImponible, setTotalNoImponible] = useState(0);
    const [afp, setAfp] = useState(0);
    const [salud, setSalud] = useState(0);
    const [cesantia, setCesantia] = useState(0);
    const [sis, setSis] = useState(0);
    const [mutual, setMutual] = useState(0);

    const [idProyecto, setIdProyecto] = useState("");
    const [nombreProyecto, setNombreProyecto] = useState("");
    const [proyectos, setProyectos] = useState([]);
    const [trabajadores, setTrabajadores] = useState([]);




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
        const mes = moment(valores.fechaGasto).format("MMMM");
        const anio = moment(valores.fechaGasto).format("YYYY");

        // Enviando Data a Firebase
        const nuevoGasto = doc(db, "proyectos", idProyecto);


        updateDoc(nuevoGasto, 
            {gastos: arrayUnion({...valores,
                nombre_trabajador: nombreTrabajador, 
                fechaRegistro: fechaRegistro, 
                anioGasto:anio, 
                mesGasto:mes, 
                proyecto:nombreProyecto,
                bono_asistencia: bonoAsistencia,
                bono_seguridad: bonoSeguridad,
                afp: afp,
                prevision_salud: salud,
                cesantia: cesantia,
                mutual: mutual,
                sis: sis,
                total_imponible: totalImponible,
                total_no_imponible: totalNoImponible,
                valor: (parseInt(totalImponible) + parseInt(totalNoImponible) 
                + parseInt(afp) + parseInt(salud) + parseInt(sis) + parseInt(cesantia) + parseInt(mutual)),
                concepto:"Mano de Obra",
                tipo:"Fijo", 
                })
            }
        );

        setValores( {...valoresIniciales} )
    }

    //Obteniendo la suma del Total Imponible
    const  getCalculoDelImponible = () => {
        let suma = 
            parseInt(sueldoBase) +
            parseInt(gratificacion) + 
            (bonoSeguridad ? parseInt(bonoSeguridad) : 0) + 
            (bonoAsistencia ? parseInt(bonoAsistencia) : 0) + 
            (valores.bono_produccion.trim().length > 1 ? parseInt(valores.bono_produccion) : 0) + 
            (valores.horas_extras.trim().length > 1 ? parseInt(valores.horas_extras) : 0) - 
            (valores.horas_no_trabajadas.trim().length > 1 ? parseInt(valores.horas_no_trabajadas) : 0);

        setTotalImponible(suma.toFixed(0));
    }



    //Obteniendo la suma del Total  No Imponible
    const getCalculoDelNoImponible = () => {
        let suma = 
            (movilizacion ?  parseInt(movilizacion) : 0) +
            (colacion ?  parseInt(colacion) : 0) +
            (valores.asig_herramientas.trim().length > 1 ? parseInt(valores.asig_herramientas) : 0) +
            (valores.aguinaldo.trim().length > 1 ? parseInt(valores.aguinaldo) : 0);

        setTotalNoImponible(suma.toFixed(0));
    }

//todo   Obteniendo lista de Proyectos 
    useEffect(() => {
        getDataCollection("proyectos", setProyectos);
    },[]);



//todo   Obteniendo lista de Colaboradores 
    useEffect(() => {
        getDataCollection("colaboradores", setTrabajadores);
        
    },[]);


//todo   Obteniendo ID del Proyecto
    useEffect(() => {
        if(nombreProyecto === "") return;
        getIDDoc("proyectos", nombreProyecto, setIdProyecto);
    },[nombreProyecto]);


//todo   Obteniendo ID del Trabajador
    useEffect(() => {
        if(nombreTrabajador === "") return;
        getIDDoc("colaboradores", nombreTrabajador, setIdTrabajador )
    },[nombreTrabajador]);

//todo   Obteniendo Data del trabajador desde Firestore
    useEffect(() => {
        if(idTrabajador === "") return;
        getDataTrabajador(idTrabajador, setDataTrabajador);
    },[idTrabajador]);


//todo   Calculando sueldo base, gratificación y bonos
    useEffect(() => {
        if(Object.keys(dataTrabajador).length === 0) return;

        setSueldoBase( getImposiciones( valores.dias_trabajados, dataTrabajador.sueldo_base ));
        setGratificacion( getImposiciones( valores.dias_trabajados, dataTrabajador.gratificacion_legal ));
        setBonoSeguridad( getImposiciones( valores.dias_trabajados, dataTrabajador.bono_seguridad ));
        setBonoAsistencia( getImposiciones( valores.dias_trabajados, dataTrabajador.bono_asistencia ));
        setColacion( getImposiciones( valores.dias_trabajados, dataTrabajador.colacion));
        setMovilizacion( getImposiciones( valores.dias_trabajados, dataTrabajador.movilizacion));

    },[ dataTrabajador,  valores.dias_trabajados ])



//todo   Calculo del Imponible
    useEffect(() => {
        if(valores.dias_trabajados ==="")  return;

        getCalculoDelImponible();
    },[ dataTrabajador, 
        valores.dias_trabajados, 
        valores.bono_produccion,
        valores.horas_extras,
        valores.horas_no_trabajadas ]);



//todo   Calculo del NO Imponible
    useEffect(() => {
        if(valores.dias_trabajados ==="")  return;

        getCalculoDelNoImponible();
    },[ dataTrabajador, 
        valores.dias_trabajados,
        valores.asig_herramientas,
        valores.aguinaldo ])



//todo   Calculo de todas las imposiciones
    useEffect(() => {
        if(totalImponible === 0)  return;

        setAfp( (totalImponible * dataTrabajador.afp).toFixed(0) );
        setSalud( getDescuentos(totalImponible, "salud"));
        setCesantia( getDescuentos(totalImponible, "cesantia") );
        setSis( getDescuentos(totalImponible, "sis") );
        setMutual( getDescuentos(totalImponible, "mutual") );
    },[totalImponible, dataTrabajador, ])



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
                            name='dias_trabajados'
                            type="text"
                            onChange={ handleInput }
                            value={ valores.dias_trabajados }
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
                            onChange={  handleInput }
                            value={ valores.horas_no_trabajadas }
                            className="form-control "
                            type="text" 
                            name='horas_no_trabajadas'
                            placeholder='Ejm: 12000'/>
                        <span className="input-group-text">.00</span>
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
