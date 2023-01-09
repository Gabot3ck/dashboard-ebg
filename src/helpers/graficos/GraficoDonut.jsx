import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import getSumaGastoXTipo from "../getSumaGastoXTipo";


export default function GraficoDonut() {

    const [gastosFijos, setGastosFijos] = useState([]);
    const [gastosVariables, setGastosVariables] = useState([]);

    const options = {
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

    const series = [gastosFijos, gastosVariables];

    useEffect(() => {
        
        // getSumaQuerySimple("gastos", "tipo", "Fijo", setGastosFijos);
        // getSumaQuerySimple("gastos", "tipo", "Variable", setGastosVariables);
        getSumaGastoXTipo("proyectos","Fijo",setGastosFijos);
        getSumaGastoXTipo("proyectos","Variable",setGastosVariables);

    }, [] )


    return (<>
        <div className='w-75  d-flex flex-column align-items-center'>
            <div className='d-flex ' >
                <i className="bi bi-circle-fill me-2 " style={{color: "#008ffb", fontSize:".9rem" }} ></i>
                <p className='m-0 fw-bold' >Gastos Fijos: <span>${new Intl.NumberFormat('de-DE').format(gastosFijos)}</span>  </p>
            </div>
            <div className='d-flex' >
                <i className="bi bi-circle-fill me-2 "  style={{color: "#00e396", fontSize:".9rem" }}></i>
                <p className='m-0 fw-bold' >Gastos Variables: <span>${new Intl.NumberFormat('de-DE').format(gastosVariables)}</span>  </p>
            </div>
        </div>
        
        <Chart 
            options={options} 
            series={series} 
            type="donut" 
            width={350} 
            height={350}
        />
    </>)
}
