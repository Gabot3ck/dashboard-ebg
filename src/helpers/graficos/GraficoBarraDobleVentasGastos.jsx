import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import getListaTotalGastosXArea from '../getListaTotalGastosXArea';
import getListaTotalVentasXArea from '../getListaTotalVentasXArea';
import getListaXArea from '../getListaXArea';


export default function GraficoBarraDobleVentasGastos({tipoArea}) {

    const [listaProyectos, setListaProyectos] = useState([]);
    const [ventas, setVentas] = useState([]);
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
            categories: listaProyectos,
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

        getListaXArea("proyectos", "area", tipoArea, setListaProyectos);
        getListaTotalVentasXArea("proyectos", "area", tipoArea, setVentas);
        getListaTotalGastosXArea("proyectos", "area", tipoArea, setGastos);
        
    }, [tipoArea]);

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