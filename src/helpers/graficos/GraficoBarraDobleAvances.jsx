import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import getAvanceProduccion from '../getAvanceProduccion';
import getListaProyectos from '../getListaProyectos';


export const GraficoBarraDobleAvances = ({tipoArea}) => {

    const [listaProyectos, setListaProyectos] = useState([]);

    const [produccion, setProduccion ] = useState([])

    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: true,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + "%";
            },
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: listaProyectos,
            labels: {
                style: {
                    fontSize: "15px",
                    fontWeight: "600",
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: "12px",
                    fontWeight: "600",
                },
            },
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                return ( new Intl.NumberFormat('de-DE').format(val) + `% `)
                }
            },
        }
    }

    const series = [
        {
            name: '% Producción',
            data: produccion,
        }, {
            name: '% Ventas',
            data: [76, 85, 10, 98, 87, 100, 91]
        },
    ]

    useEffect(() => {
        
        getListaProyectos("proyectos", setListaProyectos)
        getAvanceProduccion("proyectos", setProduccion)
    
    
    }, [tipoArea])
    

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
