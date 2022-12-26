import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import getListaColeccion from '../getListaColeccion';
import getSumaQuerySimple from '../getSumaQuerySimple';


export default function ProyectosVentasGastos() {

    const [nombreProyectos, setNombreProyectos] = useState([]);

    const [ventasEnelCasinoEstadio, setVentasEnelCasinoEstadio] = useState(0);
    const [ventasAltosPolo, setVentasAltosPolo] = useState(0);
    const [ventas10Julio, setVentas10Julio] = useState(0);
    

    const [gastosEnelCasinoEstadio, setGastosEnelCasinoEstadio] = useState(0);
    const [gastosAltosPolo, setGastosAltosPolo] = useState(0);
    const [gastos10Julio, setGastos10Julio] = useState(0);
    



    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: nombreProyectos,
            labels: {
                style: {
                    fontSize: "15px",
                    fontWeight: "600",
                },
            }
        },
        yaxis: {
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
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                return (`$ ` + new Intl.NumberFormat('de-DE').format(val) )
                }
            },
        },
    };

    const series = [
        {
            name: 'Ventas',
            data: [ventasEnelCasinoEstadio, ventasAltosPolo, ventas10Julio],
        }, 
        {
            name: 'Gastos',
            data: [gastosEnelCasinoEstadio, gastosAltosPolo, gastos10Julio],
        }, 
    ];

    useEffect(() => {
        getListaColeccion("proyectos",setNombreProyectos);

        getSumaQuerySimple("ventas", "proyecto", "ENEL Casino Estadio", setVentasEnelCasinoEstadio);
        getSumaQuerySimple("ventas", "proyecto", "Altos del Polo", setVentasAltosPolo);
        getSumaQuerySimple("ventas", "proyecto", "10 de Julio", setVentas10Julio);
        

        getSumaQuerySimple("gastos", "proyecto", "ENEL Casino Estadio", setGastosEnelCasinoEstadio);
        getSumaQuerySimple("gastos", "proyecto", "Altos del Polo", setGastosAltosPolo);
        getSumaQuerySimple("gastos", "proyecto", "10 de Julio", setGastos10Julio);
        

    }, []);

    return (<>

    <Chart 
        options={options}
        series={series}
        type="bar"
        width={650}
        height={450}
    />
    </>)
}
