import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import getSumaGastos from '../getSumaGastos';
import getSumaGastosXConcepto from '../getSumaGastosXConcepto';



export default function GraficoTipoGastos() {

    const [valorEquipos, setValorEquipos] = useState(0);
    const [valorMateriales, setValorMateriales] = useState(0);
    const [valorHerramientas, setValorHerramientas] = useState(0);
    const [valorManoObra, setValorManoObra] = useState(0);
    const [valorCombustible, setValorCombustible] = useState(0);
    const [valorArriendos, setValorArriendos] = useState(0);
    const [valorEPP, setValorEPP] = useState(0);
    const [valorMantenimiento, setValorMantenimiento] = useState(0);
    const [valorFletes, setValorFletes] = useState(0);
    const [valorEscombro, setValorEscombro] = useState(0);
    const [valorServicios, setValorServicios] = useState(0);
    const [valorCapacitaciones, setValorCapacitaciones] = useState(0);
    const [valorExamenesMed, setValorExamenesMed] = useState(0);
    const [valorAlojamientos, setValorAlojamientos] = useState(0);
    const [valorViaticos, setValorViaticos] = useState(0);
    const [valorContratistas, setValorContratistas] = useState(0);
    const [valorContabilidad, setValorContabilidad] = useState(0);
    const [valorHosting, setValorHosting] = useState(0);
    const [valorOtros, setValorOtros] = useState(0);

    const [gastosTotal, setGastosTotal] = useState(0);



    const options = {
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
                    // fontWeight: 500,
                },
                formatter: function (val) {
                    return (`$ ` + new Intl.NumberFormat('de-DE').format(val) );
                },
            },
            xaxis: {
                categories: ['Equipos', 'Materiales', 'Herramientas', "Mano de Obra" ,'Combustible', 'Arriendos', 'EPPs', 'Mantenimientos',
                    'Fletes', 'Retiro de escombro', 'Servicios', "Capacitaciones", "Exámenes médicos", "Alojamientos",
                    "Viáticos", "Contratistas", "Contabilidad", "Hosting", "Otros",
                ],
                labels: {
                    style: {
                        fontSize: "15px",
                        fontWeight: "600",
                    },
                    formatter: function (val) {
                        return (`$ ${new Intl.NumberFormat('de-DE').format(val / 1000000)}M`);
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
                y: {
                    formatter: function (val) {
                        return ( val !== 0  ?  `${((val / gastosTotal)*100).toFixed(2)}%` : 0);
                    },
                },
            }
            
        }

    const series = [
            {
                name: "Gasto",
                data: [valorEquipos, valorMateriales, valorHerramientas, valorManoObra, valorCombustible, valorArriendos, 
                    valorEPP, valorMantenimiento, valorFletes, valorEscombro, valorServicios, valorCapacitaciones,
                    valorExamenesMed, valorAlojamientos, valorViaticos, valorContratistas, valorContabilidad, 
                    valorHosting, valorOtros],  
            },
        ]

    

    useEffect( () => {

        // getTotalSuma("gastos", setGastosTotal);
        getSumaGastos("proyectos", setGastosTotal)

        getSumaGastosXConcepto("proyectos",  "Equipos", setValorEquipos);
        getSumaGastosXConcepto("proyectos",  "Materiales", setValorMateriales);
        getSumaGastosXConcepto("proyectos",  "Herramientas", setValorHerramientas);
        getSumaGastosXConcepto("proyectos",  "Mano de Obra", setValorManoObra);
        getSumaGastosXConcepto("proyectos",  "Combustible", setValorCombustible);
        getSumaGastosXConcepto("proyectos",  "Arriendos", setValorArriendos);
        getSumaGastosXConcepto("proyectos",  "EPPs", setValorEPP);
        getSumaGastosXConcepto("proyectos",  "Mantenimientos", setValorMantenimiento);
        getSumaGastosXConcepto("proyectos",  "Fletes", setValorFletes);
        getSumaGastosXConcepto("proyectos",  "Retiro de escombro", setValorEscombro);
        getSumaGastosXConcepto("proyectos",  "Servicios", setValorServicios);
        getSumaGastosXConcepto("proyectos",  "Capacitaciones", setValorCapacitaciones);
        getSumaGastosXConcepto("proyectos",  "Exámenes médicos", setValorExamenesMed);
        getSumaGastosXConcepto("proyectos",  "Alojamientos", setValorAlojamientos);
        getSumaGastosXConcepto("proyectos",  "Viáticos", setValorViaticos);
        getSumaGastosXConcepto("proyectos",  "Contratistas", setValorContratistas);
        getSumaGastosXConcepto("proyectos",  "Servicio Contabilidad", setValorContabilidad);
        getSumaGastosXConcepto("proyectos",  "Hosting", setValorHosting);
        getSumaGastosXConcepto("proyectos",  "Otros", setValorOtros);
        


    }, [gastosTotal]);

    

    return (<>
        <Chart 
            options={options}
            series={series} 
            type="bar" 
            width={750} 
            height={450}
        />
    </>)
}
