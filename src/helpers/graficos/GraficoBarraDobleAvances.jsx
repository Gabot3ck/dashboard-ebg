import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import getAvanceFacturado from '../getAvanceFacturado';
import getAvanceProduccion from '../getAvanceProduccion';
import getListaProyectos from '../getListaProyectos';


export const GraficoBarraDobleAvances = ({tipoArea}) => {

    const [listaProyectos, setListaProyectos] = useState([]);

    const [produccion, setProduccion ] = useState([]);
    const [facturado, setFacturado] = useState([]);

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
                formatter: function (val) {
                    return val + "%";
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
            name: '% Facturación',
            data: facturado,
        }, {
            name: '% Producción',
            data: produccion
        },
    ]

    useEffect(() => {
        
        getListaProyectos("proyectos", setListaProyectos);
        getAvanceProduccion("proyectos", setProduccion);
        getAvanceFacturado("proyectos", setFacturado);
    
    
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
