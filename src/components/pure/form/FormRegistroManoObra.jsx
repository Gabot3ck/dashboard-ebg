import {useState, useEffect} from 'react';
import moment from "moment";
import getDataCollection from '../../../helpers/getDataCollection';
import getIDDoc from '../../../helpers/getIDDoc';
import { getDataTrabajador } from '../../../helpers/getDataTrabajador';
import { getImposiciones } from '../../../helpers/getImposiciones';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import db from '../../../backend/DBFiresbase';
import { getDescuentos } from '../../../helpers/getDescuentos';
import Style from "./Form.module.css";
import getListaCostosMO from '../../../helpers/getListaCostosMO';





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

    const [gastosMO, setGastosMO] = useState([]);



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
                gratificacion: gratificacion,
                movilizacion: movilizacion,
                colacion: colacion,
                sueldo_base: sueldoBase,
                })
            }
        );

        setValores( {...valoresIniciales} )
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
        if( valores.dias_trabajados === "" )  return;

        setTotalImponible(
            sueldoBase + 
            gratificacion +
            (bonoSeguridad ? parseInt(bonoSeguridad) : 0) +
            (bonoAsistencia ? parseInt(bonoAsistencia) : 0) + 
            (valores.bono_produccion.trim().length > 1 ? parseInt(valores.bono_produccion) : 0) + 
            (valores.horas_extras.trim().length > 1 ? parseInt(valores.horas_extras) : 0) +
            (valores.horas_no_trabajadas.trim().length > 1 ? parseInt(valores.horas_no_trabajadas) : 0));

    },[ valores.dias_trabajados,
        valores.bono_produccion,
        valores.horas_extras,
        valores.horas_no_trabajadas,
        sueldoBase, 
        gratificacion, 
        bonoSeguridad,
        bonoAsistencia ]);



//todo   Calculo del NO Imponible
    useEffect(() => {
        if( valores.dias_trabajados === "" )  return;

        setTotalNoImponible(
            (movilizacion ?  parseInt(movilizacion) : 0) +
            (colacion ?  parseInt(colacion) : 0) +
            (valores.asig_herramientas.trim().length > 1 ? parseInt(valores.asig_herramientas) : 0) +
            (valores.aguinaldo.trim().length > 1 ? parseInt(valores.aguinaldo) : 0));

    },[ valores.dias_trabajados,
        valores.asig_herramientas,
        valores.aguinaldo,
        colacion,
        movilizacion ]);



//todo   Calculo de todas las imposiciones
    useEffect(() => {
        if(totalImponible === 0)  return;

        setAfp( (totalImponible * dataTrabajador.afp) );
        setSalud( getDescuentos(totalImponible, "salud"));
        setCesantia( getDescuentos(totalImponible, "cesantia") );
        setSis( getDescuentos(totalImponible, "sis") );
        setMutual( getDescuentos(totalImponible, "mutual") );
    },[totalImponible, dataTrabajador, ])


//todo Obteniendo datos de los costos de Firebase
    useEffect(() => {
        getListaCostosMO("proyectos", setGastosMO);
    }, []);


    return (<>
        <div className={ `pb-4 rounded-bottom px-4 ${ Style.wrapper_formManoObra }` }>
            <form 
                className="row g-4 needs-validation" 
                id="formRegistroGastos" 
                onSubmit={ handleSubmit }
                autoComplete="off">

                <div className={`container w-100 d-flex justify-content-between mt-5 flex-wrap`}>
                
                    <div className={`d-flex flex-column align-items-center px-1 ${Style.wrapper_input} `}>
                        <label className={ `form-label mb-0 ${ Style.labelForm }` }>Fecha de actividad:</label>
                        <input
                        onChange={ handleInput }
                        type="date" 
                        className={ `form-control py-1 ${ Style.labelForm } `} 
                        id="inputFechaManoObra" 
                        name="fechaGasto"
                        value={valores.fechaGasto}
                        />
                    </div>

                    <div className={`d-flex flex-column align-items-center px-1 ${Style.wrapper_input}`}>
                        <label className={ `form-label mb-0 ${ Style.labelForm }` }>Colaborador:</label>
                        <select 
                        className={ `form-select py-1 ${ Style.labelForm } `} 
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


                    <div className={`d-flex flex-column align-items-center px-1 ${Style.wrapper_input}`}>
                        <label className={ `form-label mb-0 ${ Style.labelForm }` }>Días trabajados:</label>
                        <div className={ `input-group  mx-auto ${ Style.inputSmall }`} >
                            <input
                                className={ `form-control py-1 ${ Style.labelForm } `}
                                name='dias_trabajados'
                                type="text"
                                onChange={ handleInput }
                                value={ valores.dias_trabajados }
                                placeholder='Ejm: 30'/>
                            <span className={ `input-group-text py-1 px-2 ${ Style.labelForm } `}>días</span>
                        </div>
                    </div>

                    <div className={`d-flex flex-column align-items-center px-1 ${Style.wrapper_input} ${Style.inputLarge}`}>
                        <label className={ `form-label mb-0 ${ Style.labelForm }` }>Proyecto:</label>
                        <select 
                        className={ `form-select py-1 ${ Style.labelForm } `} 
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

                </div>


                <div className={`container w-100 d-flex justify-content-between mt-5 flex-wrap`}>

                    <div className={`d-flex flex-column align-items-center px-1 ${Style.wrapper_input} ${Style.inputLarge}`}>
                        <label className={ `form-label mb-0 ${ Style.labelForm }` }>Horas no trabajadas:</label>
                        <div className="input-group mx-auto" >
                            <span className={ `input-group-text py-1 px-1 ${ Style.labelForm } `}>$</span>
                            <input
                                onChange={  handleInput }
                                value={ valores.horas_no_trabajadas }
                                className={ `form-control py-1 ${ Style.labelForm } `} 
                                type="text" 
                                name='horas_no_trabajadas'
                                placeholder='Ejm: 12000'/>
                            <span className={ `input-group-text py-1 px-1 ${ Style.labelForm } `}>.00</span>
                        </div>
                    </div>

                    <div className={`d-flex flex-column align-items-center px-1 ${Style.wrapper_input} ${Style.inputLarge}`}>
                        <label className={ `form-label mb-0 ${ Style.labelForm }` }>Horas extras:</label>
                        <div className="input-group  mx-auto" >
                            <span className={ `input-group-text py-1 px-1 ${ Style.labelForm } `}>$</span>
                            <input
                                onChange={ handleInput }
                                value={ valores.horas_extras }
                                className={ `form-control py-1 ${ Style.labelForm } `} 
                                type="text" 
                                name='horas_extras'
                                placeholder='Ejm: 50000'/>
                            <span className={ `input-group-text py-1 px-1 ${ Style.labelForm } `}>.00</span>
                        </div>
                    </div>

                    <div className={`d-flex flex-column align-items-center px-1 ${Style.wrapper_input} ${Style.inputLarge}`}>
                        <label className={ `form-label mb-0 ${ Style.labelForm }` }>Asig. Herramienta:</label>
                        <div className="input-group mx-auto" >
                            <span className={ `input-group-text py-1 px-1 ${ Style.labelForm } `}>$</span>
                            <input
                                onChange={ handleInput }
                                className={ `form-control py-1 ${ Style.labelForm } `} 
                                type="text"
                                name='asig_herramientas'
                                value={ valores.asig_herramientas }
                                placeholder='Ejm: 200000'/>
                            <span className={ `input-group-text py-1 px-1 ${ Style.labelForm } `}>.00</span>
                        </div>
                    </div>

                    <div className={`d-flex flex-column align-items-center px-1 ${Style.wrapper_input} ${Style.inputLarge}`}>
                        <label className={ `form-label mb-0 ${ Style.labelForm }` }>Bono Producción:</label>
                        <div className="input-group mx-auto" >
                            <span className={ `input-group-text py-1 px-1 ${ Style.labelForm } `}>$</span>
                            <input
                                onChange={ handleInput }
                                className={ `form-control py-1 ${ Style.labelForm } `} 
                                type="text"
                                name='bono_produccion'
                                value={ valores.bono_produccion } 
                                placeholder='Ejm: 200000'/>
                            <span className={ `input-group-text py-1 px-1 ${ Style.labelForm } `}>.00</span>
                        </div>
                    </div>

                    <div className={`d-flex flex-column align-items-center px-1 ${Style.wrapper_input} ${Style.inputLarge}`}>
                        <label className={ `form-label mb-0 ${ Style.labelForm }` }>Aguinaldo:</label>
                        <div className="input-group mx-auto" >
                            <span className={ `input-group-text py-1 px-1 ${ Style.labelForm } `}>$</span>
                            <input
                                onChange={ handleInput }
                                className={ `form-control py-1 ${ Style.labelForm } `} 
                                type="text"
                                name='aguinaldo' 
                                placeholder='Ejm: 100000'
                                value={ valores.aguinaldo }/>
                            <span className={ `input-group-text py-1 px-1 ${ Style.labelForm } `}>.00</span>
                        </div>
                    </div>

                </div>


                <div className='col-6 mx-auto d-flex  justify-content-evenly mt-5'>
                    <button
                        onClick={() => { handleClick()}}
                        className="btn btn-primary w-25" 
                        type="submit" >
                        Registrar
                    </button>
                </div>

            </form>
        </div>

        <p className={ `mt-5 fs-5 fw-bold p-2 mb-0 rounded-1 ${Style.titulo_manoObra}` } >
            Resultados
        </p>

        <div className={`w-100 pb-4 rounded-bottom px-4 ${ Style.wrapper_formManoObra }`}>
            <div className="table-responsive text-center mt-5" style={{overflowX: "scroll"}}>
                <table id="tablaCostosMO" className="table table-sm table-bordered text-center" style={{minWidth: "100%"}}> 
                    <thead>
                        <tr className="table-primary" style={{fontSize: ".9rem"}} >
                            <th>Fecha</th>
                            <th>Proyecto</th>
                            <th>Colaborador</th>
                            <th>Costo Mano de Obra</th>
                        </tr>
                    </thead>

                    <tbody>
                        {gastosMO.map((el,index) => {
                            return(
                                <tr key= {index}  className="table-warning" style={{fontSize: ".85rem"}}>
                                    <td>{moment(el.fechaRegistro).format('YYYY-MM-DD')}</td>
                                    <td>{el.proyecto}</td>
                                    <td>{el.nombre_trabajador}</td>
                                    <td>$ { Intl.NumberFormat('de-DE').format(el.valor) }</td>
                                </tr>
                            )
                        })}

                    </tbody>

                </table>
            </div>
        </div>
    </>)
}
