import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import getSumaGastosXArea from '../getSumaGastosXArea';
import getSumaGastoXAreaYConcepto from '../getSumaGastosXAreaYConcepto';


export default function GraficoBarraConceptoGastos({tipoArea}) {

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
                    return (`$ ` + new Intl.NumberFormat('de-DE').format(val) )
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

        getSumaGastosXArea("proyectos", "area", "Remodelaciones", setGastosTotal);

        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Equipos", setValorEquipos);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Materiales", setValorMateriales);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Herramientas", setValorHerramientas);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Mano de Obra", setValorManoObra);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Combustible", setValorCombustible);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Arriendos", setValorArriendos);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "EPPs", setValorEPP);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Mantenimientos", setValorMantenimiento);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Fletes", setValorFletes);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Retiro de escombro", setValorEscombro);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Servicios", setValorServicios);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Capacitaciones", setValorCapacitaciones);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Exámenes médicos", setValorExamenesMed);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Alojamientos", setValorAlojamientos);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Viáticos", setValorViaticos);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Contratistas", setValorContratistas);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Servicio Contabilidad", setValorContabilidad);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Hosting", setValorHosting);
        getSumaGastoXAreaYConcepto("proyectos", "area", tipoArea, "Otros", setValorOtros);

    }, [tipoArea]);

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