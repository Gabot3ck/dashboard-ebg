import {query, where, collection} from 'firebase/firestore';
import {useState, useEffect} from 'react';
import db from '../../../backend/DBFiresbase';
import getOnSnapshot from '../../../helpers/getOnSnapshot';
import getDataCollection from '../../../helpers/getDataCollection';
import moment from 'moment';
import Chart from "react-apexcharts";
import "./ReportesProyectos.css";


export default function VentasProyectos() {

    //Capturando el valor del Input select para pasarlo a la consulta de DB de firebase
    const [nombre, setNombre] = useState("");

    //Haciendo la consulta para valores de las opciones del input select
    const q = query(collection(db,"proyectos"), where("nombre", "==" , nombre) );


    //Data de todos los valores del proyecto seleccionado
    const [dataProyecto, setDataProyecto] = useState([]);

    //Getting data del nombre del Proyecto
    const [proyectos, setProyectos] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        
        getOnSnapshot(q,setDataProyecto)
    }



// todo ***  Mostrando  data  ***
    useEffect(() => {
        getDataCollection("proyectos",setProyectos)
    }, [])


    return (<>
        <div className="container w-100 bg-secondary mt-3 text-center py-4">
            <h2 >Informe de Proyectos</h2>

            <form
            className="row g-4 needs-validation  d-flex flex-column align-items-center -justify-content-center mt-3" 
            id="formRegistroGastos" 
            onSubmit={handleSubmit}>

                <div className="col-md-4">
                    <label className="form-label">Proyecto:</label>
                    <select 
                    onChange= {(e) => setNombre( e.target.value)}
                    className="form-select" 
                    id="sel" 
                    name="proveedor"
                    value={nombre}>
                        <option value="" >Seleccione</option>
                        {
                            proyectos.map((el, index) => {
                                return(
                                    <option value={el.nombre} key={index} >{el.nombre}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <button 
                    className='btn btn-success w-25 mx-auto '>
                    Buscar
                </button>
            </form>

                {dataProyecto.map( (el,index) => {
                    const [objProyecto] = dataProyecto

                    let precioProyecto = objProyecto.presupuesto.length !== 0 ? parseInt(objProyecto.presupuesto) : 0
                    let ventasTodas =  objProyecto.ventas.length !== 0 ?  
                        objProyecto.ventas.map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;
                    let ventasAdicionales = objProyecto.ventas.filter(el => el.tipoVenta === "Pago Adicional").length !== 0
                        ? objProyecto.ventas.filter(el => el.tipoVenta === "Pago Adicional").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0
                    
                    let deuda = precioProyecto -  (ventasTodas - ventasAdicionales)
                    let porcentaje = (( ventasTodas  / precioProyecto)* 100).toFixed(2);


// todo    *****  Datos para los gráficos   ****
                    // Datos para el Donut de los gastos fijos y variables
                    let gastosFijos = objProyecto.gastos.filter(el => el.tipo === "Fijo").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.tipo === "Fijo").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;
                    let gastosVariables = objProyecto.gastos.filter(el => el.tipo === "Variable").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.tipo === "Variable").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    const optionsDonut = {
                        labels: ["Gastos Fijos", "Gastos Variables"],
                        plotOptions: {
                            chart: {
                                width: 380,
                                type: "donut",
                            },
                            pie: {
                                expandOnClick: false,
                                startAngle: -90,
                                endAngle: 270,
                                donut: {
                                    size: "50px",
                                    labels: {
                                        show: true,
                                        name: {
                                            show: true,
                                            color: "black",
                                        },
                                        value: {
                                            color: "black",
                                            fontSize: '20px',
                                            fontWeight: 600,
                                            formatter: function (val) {
                                                return ("$" + new Intl.NumberFormat('de-DE').format(val)) 
                                            }
                                        },
                                        total: {
                                            show: true,
                                            showAlways: false,
                                            label: 'Total',
                                            fontSize: '20px',
                                            fontWeight: 600,
                                            color: "black",
                                            formatter: function (w) {
                                                return ( "$" + new Intl.NumberFormat('de-DE').format( w.globals.seriesTotals.reduce((a, b) =>  a + b , 0)) ) 
                                            }
                                        },
                                    },
                                },
                            },
                        },
                        dataLabels: {
                            style: {
                                fontSize: "22px",
                            },
                            dropShadow: {
                                enabled: false,
                            },
                        },
                        legend: {
                            show: false,
                            position: 'top',
                            fontSize: '16px',
                            fontWeight: 600,
                            horizontalAlign: 'center',
                            onItemClick: {
                                toggleDataSeries: false,
                            },
                        },
                        tooltip: {
                            style: {
                                fontSize: '16px',
                            },
                            y: {
                                formatter: function (val) {
                                    return ("$" + new Intl.NumberFormat('de-DE').format(val)) 
                                },
                            },
                        },
                    };

                    const seriesDonut = [gastosFijos, gastosVariables];


                    // Datos de los gastos por concepto
                    let valorEquipos= objProyecto.gastos.filter(el => el.concepto === "Equipos").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Equipos").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorMateriales= objProyecto.gastos.filter(el => el.concepto === "Materiales").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Materiales").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorHerramientas= objProyecto.gastos.filter(el => el.concepto === "Herramientas").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Herramientas").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorManoObra = objProyecto.gastos.filter(el => el.concepto === "Mano de Obra").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Mano de Obra").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorCombustible= objProyecto.gastos.filter(el => el.concepto === "Combustible").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Combustible").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorArriendos = objProyecto.gastos.filter(el => el.concepto === "Arriendos").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Arriendos").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorEPP= objProyecto.gastos.filter(el => el.concepto === "EPPs").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "EPPs").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorMantenimiento= objProyecto.gastos.filter(el => el.concepto === "Mantenimientos").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Mantenimientos").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorFletes= objProyecto.gastos.filter(el => el.concepto === "Fletes").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Fletes").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorEscombro= objProyecto.gastos.filter(el => el.concepto === "Retiro de escombro").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Retiro de escombro").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorServicios= objProyecto.gastos.filter(el => el.concepto === "Servicios").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Servicios").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorCapacitaciones= objProyecto.gastos.filter(el => el.concepto === "Capacitaciones").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Capacitaciones").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorExamenesMed= objProyecto.gastos.filter(el => el.concepto === "Exámenes médicos").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Exámenes médicos").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorAlojamientos= objProyecto.gastos.filter(el => el.concepto === "Alojamientos").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Alojamientos").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorViaticos= objProyecto.gastos.filter(el => el.concepto === "Viáticos").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Viáticos").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorContratistas= objProyecto.gastos.filter(el => el.concepto === "Contratistas").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Contratistas").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorContabilidad= objProyecto.gastos.filter(el => el.concepto === "Servicio Contabilidad").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Servicio Contabilidad").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorHosting= objProyecto.gastos.filter(el => el.concepto === "Hosting").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Hosting").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    let valorOtros= objProyecto.gastos.filter(el => el.concepto === "Otros").length !== 0 ?  
                        objProyecto.gastos.filter(el => el.concepto === "Otros").map(el => parseInt(el.valor)).reduce((a,b) => a+b) 
                        : 0;

                    const seriesConceptoGasto = [
                        {
                            name: "Gasto",
                            data: [valorEquipos, valorMateriales, valorHerramientas, valorManoObra, valorCombustible, valorArriendos, 
                            valorEPP, valorMantenimiento, valorFletes, valorEscombro, valorServicios, valorCapacitaciones,
                            valorExamenesMed, valorAlojamientos, valorViaticos, valorContratistas, valorContabilidad, 
                            valorHosting, valorOtros],
                        },
                    ]

                    const optionsConceptoGasto = {
                        chart: {
                            type: 'bar',
                            height: 350,
                        },
                        plotOptions: {
                            bar: {
                                borderRadius: 4,
                                horizontal: true,
                            },
                        },
                        dataLabels: {
                            enabled: true,
                            style: {
                                fontSize: "13px",
                            },
                            formatter: function (val) {
                                return (`$ ${new Intl.NumberFormat('de-DE').format(val)}`);
                            },
                        },
                        xaxis: {
                            categories: ['Equipos', 'Materiales', 'Herramientas',"Mano de Obra", 'Combustible', 'Arriendos', 'EPPs', 'Mantenimientos',
                                'Fletes', 'Retiro de escombro', 'Servicios', "Capacitaciones", "Exámenes médicos", "Alojamientos",
                                "Viáticos", "Contratistas", "Contabilidad", "Hosting", "Otros",
                            ],
                            labels: {
                                style: {
                                    fontSize: "15px",
                                    fontWeight: "600",
                                },
                                formatter: function (val) {
                                    return (`$ ${new Intl.NumberFormat('de-DE').format(val / 1000000)}M`) 
                                },
                            },
                        },
                        yaxis: {
                            labels: {
                                style: {
                                    fontSize: "15px",
                                },
                            },
                        },
                        tooltip: {
                            enabled: false,
                        }
                    }

                    return(
                        <div className="container wrapperVistaProyectos mt-4 text-center py-4" key={index} >
                            <div className="cardProyectos">

                                <div className="titulos d-flex justify-content-center mb-3" >
                                    <div className='d-flex me-4' >
                                        <p className='me-2' >Proyecto: </p>
                                        <p> {el.nombre} </p>
                                    </div>
                                    <div className='d-flex ms-4'>
                                        <p className='me-2' >Presupuesto: </p>
                                        <p> $ { new Intl.NumberFormat('de-DE').format(el.presupuesto)} </p>
                                    </div>
                                </div>

                                <div className="importes" >
                                    <div className='wrapperTable' >
                                        <p className='mb-2' >Estados Pagos</p>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Fecha de Venta</th>
                                                    <th scope="col">Importe</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {el.ventas.map((venta,index) =>{
                                                    return(
                                                        (venta.tipoVenta === "Estado Pago") &&
                                                            <tr key={index}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{moment(venta.fechaVenta).format("DD-MM-YY")}</td>
                                                                <td>$ {new Intl.NumberFormat('de-DE').format(venta.valor)}</td>
                                                            </tr>
                                                    )
                                                })}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">Total</th>
                                                    <th scope="col">${new Intl.NumberFormat('de-DE').format( ventasTodas - ventasAdicionales)}</th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>

                                    <div className='wrapperTable'>
                                        <p className='mb-2' >Ventas Adicionales</p>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Fecha</th>
                                                    <th scope="col">Monto</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {el.ventas.map((venta,index) =>{
                                                    return(
                                                        (venta.tipoVenta === "Pago Adicional") &&
                                                            <tr key={index}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{moment(venta.fechaVenta).format("DD-MM-YY")}</td>
                                                                <td>$ {new Intl.NumberFormat('de-DE').format(venta.valor)}</td>
                                                            </tr>
                                                    )
                                            })}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col-2">Total</th>
                                                    <th scope="col">${new Intl.NumberFormat('de-DE').format(ventasAdicionales)}</th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>

                                <div className="resultados mt-2" >
                                    <div>
                                        <p>Venta Estado Pagos</p>
                                        <p>$ {new Intl.NumberFormat('de-DE').format(ventasTodas - ventasAdicionales)}</p>
                                    </div>
                                    <div>
                                        <p>Venta Adicional</p>
                                        <p>$ {new Intl.NumberFormat('de-DE').format(ventasAdicionales)}</p>
                                    </div>
                                    <div>
                                        <p>Total Venta Actual</p>
                                        <p>$ {new Intl.NumberFormat('de-DE').format(ventasTodas)}</p>
            
                                    </div>
                                    <div>
                                        <p>% Venta Actual</p>
                                        <p> {isNaN(porcentaje) ? 0 : porcentaje} %</p>
                                    </div>
                                    <div>
                                        <p>Importe por Cobrar</p>
                                        <p>$ {new Intl.NumberFormat('de-DE').format(deuda)}</p>
                                    </div>
                                </div>

                            </div>
                        
                            <div className='w-50 mx-auto my-5 d-flex flex-column align-items-center'>
                                <div className='w-75  d-flex flex-column align-items-center'>
                                    <div className='d-flex ' >
                                        <i className="bi bi-circle-fill me-2 " style={{color: "#008ffb", fontSize:".9rem" }} ></i>
                                        <p className='m-0 fw-bold' >Gastos Fijos: <span>${new Intl.NumberFormat('de-DE').format(gastosFijos)}</span>  </p>
                                    </div>
                                    <div className='d-flex' >
                                        <i className="bi bi-circle-fill me-2 "  style={{color: "#00e396", fontSize:".9rem" }}></i>
                                        <p className='m-0 fw-bold' >Gastos Variables: <span>${new Intl.NumberFormat('de-DE').format(gastosVariables)}</span>  </p>
                                    </div>
                                    <Chart 
                                        options={optionsDonut} 
                                        series={seriesDonut} 
                                        type="donut" 
                                        width={350} 
                                        height={350}
                                    />
                                    <Chart 
                                        options={optionsConceptoGasto}
                                        series={seriesConceptoGasto} 
                                        type="bar" 
                                        width={750} 
                                        height={450}
                                    />
                                </div>

                            </div>
                            
                    </div>
                    )
                })}
        </div>
    </>)
}
