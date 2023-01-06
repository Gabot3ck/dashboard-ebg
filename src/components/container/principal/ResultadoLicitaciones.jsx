import {useEffect, useState} from 'react';
import CardImportes from '../../../models/CardImportes';
import getSumaVentasXArea from '../../../helpers/getSumaVentasXArea';
import getSumaGastosXArea from '../../../helpers/getSumaGastosXArea';
import getSumaPresupuestoXArea from '../../../helpers/getSumaPresupuestoXArea';
import getSumaManoObraXArea from '../../../helpers/getSumaManoObraXArea';
import GraficoDonutTipoGastos from '../../../helpers/graficos/GraficoDonutTipoGastos';
import GraficoBarraConceptoGastos from '../../../helpers/graficos/GraficoBarraConceptoGastos';
import GraficoBarraDobleVentasGastos from '../../../helpers/graficos/GraficoBarraDobleVentasGastos';


export const ResultadoLicitaciones = () => {
    // todo  ---- GETTING DATA DE FIREBASE  -----
    const [gastos, setGastos ] = useState(0);
    const [ventas, setVentas] = useState(0);
    const [manoObra, setManoObra] = useState(0);
    const [porCobrar, setPorCobrar ] = useState(0);


    useEffect(() => {
        getSumaVentasXArea("proyectos","area","Licitaciones",setVentas);
        getSumaGastosXArea("proyectos","area","Licitaciones",setGastos);
        getSumaPresupuestoXArea("proyectos","area","Licitaciones",setPorCobrar);
        getSumaManoObraXArea("proyectos", "area", "Licitaciones", setManoObra );
    }, []);


    return (<>
        <div className='container bg-light w-100'>
            
            <h1 className='text-center' >Resultados Licitaciones</h1>
            
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
                    <GraficoDonutTipoGastos tipoArea="Licitaciones"/>
                    <GraficoBarraConceptoGastos tipoArea="Licitaciones"/>
                    <GraficoBarraDobleVentasGastos tipoArea="Licitaciones"/>
                </div>
                
            </div>
            
        </div>
    </>)
}