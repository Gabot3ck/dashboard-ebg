import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import getListaProyectos from '../getListaProyectos';
import getListaTotalVentas from '../getListaTotalVentas';
import getListaTotalGastos from '../getTotalGastos';


export default function ProyectosVentasGastos() {

    const [nombreProyectos, setNombreProyectos] = useState([]);

    const[ventas, setVentas] = useState([]);
    const [gastos, setGastos] = useState([]);


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
            data: ventas,
        }, 
        {
            name: 'Gastos',
            data: gastos,
        }, 
    ];

    useEffect(() => {
        getListaProyectos("proyectos",setNombreProyectos);
        
        getListaTotalVentas("proyectos", setVentas);
        getListaTotalGastos("proyectos", setGastos);

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
