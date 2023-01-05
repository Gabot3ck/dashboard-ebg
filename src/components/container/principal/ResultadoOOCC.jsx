import {useEffect, useState} from 'react';
import CardImportes from '../../../models/CardImportes';
import GraficoDonut from '../../../helpers/graficos/GraficoDonut';
import GraficoTipoGastos from '../../../helpers/graficos/GraficoTipoGastos';
import ProyectosVentasGastos from '../../../helpers/graficos/GraficoProyectosVentasGastos';
import {Link} from 'react-router-dom';
import getSumaVentasXArea from '../../../helpers/getSumaVentasXArea';
import getSumaGastosXArea from '../../../helpers/getSumaGastosXArea';
import getSumaPresupuestoXArea from '../../../helpers/getSumaPresupuestoXArea';
import getSumaManoObraXArea from '../../../helpers/getSumaManoObraXArea';


export const ResultadoOOCC = () => {
    // todo  ---- GETTING DATA DE FIREBASE  -----
    const [gastos, setGastos ] = useState(0);
    const [ventas, setVentas] = useState(0);
    const [manoObra, setManoObra] = useState(0);
    const [porCobrar, setPorCobrar ] = useState(0);


    useEffect(() => {
        getSumaVentasXArea("proyectos","area","OOCC",setVentas);
        getSumaGastosXArea("proyectos","area","OOCC",setGastos);
        getSumaPresupuestoXArea("proyectos","area","OOCC",setPorCobrar);
        getSumaManoObraXArea("proyectos", "area", "OOCC", setManoObra );
    }, []);


    return (<>
        <div className='container bg-light w-100'>
            <div className='w-100 d-flex justify-content-evenly'>
                <Link to="/home" className='btn btn-success' >Total</Link>
                <Link to="resultados/oocc">OOCC</Link>
                <Link to="/resultados/remodelaciones">Remodelaciones</Link>
                <Link to="/resultados/licitaciones">Licitaciones</Link>
            </div>
            <h1 className='text-center' >Resultados OOCC</h1>
            
            <div className="w-100 d-flex justify-content-around mt-4">

                <CardImportes nombre="Ventas" 
                importe={new Intl.NumberFormat('de-DE').format(ventas)} 
                fondo="primary"
                asunto="IVA:"
                iva={ new Intl.NumberFormat('de-DE').format(ventas * (19/100))}
                display="d-flex"
                />

                <CardImportes nombre="Gastos" 
                importe={new Intl.NumberFormat('de-DE').format(gastos)} 
                fondo="danger" 
                asunto="IVA:"
                iva={ new Intl.NumberFormat('de-DE').format((gastos - manoObra) * (19/100))}
                display="d-flex"
                />

                <CardImportes nombre="Ganancias" 
                importe={new Intl.NumberFormat('de-DE').format(ventas - gastos)} 
                fondo="success"
                asunto="IVA:"
                iva={new Intl.NumberFormat('de-DE').format((ventas * (19/100)) - (gastos * (19/100))) }
                display="d-flex" />

                <CardImportes nombre="Por facturar" 
                importe={new Intl.NumberFormat('de-DE').format(porCobrar - ventas)} 
                fondo="info"
                asunto="IVA:"
                iva={new Intl.NumberFormat('de-DE').format((ventas * (19/100)) - (gastos * (19/100))) }
                display="d-none"/>
            </div>

            <div className='w-100 mx-auto my-5 d-flex flex-column text-center ' style={{background: "#d1d2d1"}} >
                <h4 className='m-0' >Total Gastos Netos</h4>
                <div className='w-50 mx-auto my-5 d-flex flex-column align-items-center'>
                    <GraficoDonut />
                    <GraficoTipoGastos/>
                    <ProyectosVentasGastos/>
                </div>
                
            </div>
            
        </div>
    </>)
}