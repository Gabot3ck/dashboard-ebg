import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import getListaColeccion from '../getListaColeccion';
import getSumaQuerySimple from '../getSumaQuerySimple';


export default function ProyectosVentasGastos() {

    const [nombreProyectos, setNombreProyectos] = useState([]);

    const [ventasEnelCasinoEstadio, setVentasEnelCasinoEstadio] = useState(0);
    const [ventasEnelProvidencia, setVentasEnelProvidencia] = useState(0);
    

    const [gastosEnelCasinoEstadio, setGastosEnelCasinoEstadio] = useState(0);
    const [gastosEnelProvidencia, setGastosEnelProvidencia] = useState(0);
    



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
            data: [ventasEnelCasinoEstadio, ventasEnelProvidencia],
        }, 
        {
            name: 'Gastos',
            data: [gastosEnelCasinoEstadio, gastosEnelProvidencia],
        }, 
    ];

    useEffect(() => {
        getListaColeccion("proyectos",setNombreProyectos);

        getSumaQuerySimple("ventas", "proyecto", "ENEL Casino Estadio", setVentasEnelCasinoEstadio);
        getSumaQuerySimple("ventas", "proyecto", "Altos del Polo", setVentasEnelProvidencia);
        

        getSumaQuerySimple("gastos", "proyecto", "ENEL Casino Estadio", setGastosEnelCasinoEstadio);
        getSumaQuerySimple("gastos", "proyecto", "Altos del Polo", setGastosEnelProvidencia);
        

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
