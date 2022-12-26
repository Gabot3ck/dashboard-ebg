import {collection, onSnapshot, query} from 'firebase/firestore';
import moment from 'moment';
import {useEffect, useState} from 'react';
import db from '../backend/DBFiresbase';
import "./CardVistaProyectos.css";


export default function CardVistaProyectos() {

    //? GETTING  DATA  DE  FIREBASE
    const [proyectos, setProyectos] = useState([]);
    const [ventaTotal, setVentaTotal] = useState(0);
    const [ventaExtra, setVentaExtra] = useState(0);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [saldo, setSaldo] = useState(0)
    const [ciento, setCiento] = useState(0);


    // Obteniendo los proyectos de firebase
    const q = query(collection(db, "proyectos"));

    const getData = async () => {
        
    onSnapshot(q, (querySnapshot) => {
            const docs = [];
    
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            });

            setProyectos(docs);
            let ventaProyecto = docs.map(el => parseInt(el.precioVenta) )

            let ventasTodas =  docs.some(el => el.ventas) ?  docs.map(el =>  el.ventas) : 0;

            let ventasExtras = ventasTodas[0].some(el => el.tipoVenta === "Pago Extra") ?
            ventasTodas[0].filter(el => el.tipoVenta === "Pago Extra") 
            : 0;

            let ventaActual = ventasTodas !== 0 ? ventasTodas[0].map(el => parseInt(el.valor)).reduce((a,b) => a+b) : 0;

            let totalExtras = ventasExtras ? ventasExtras.map(el => parseInt(el.valor)).reduce((a,b) => a+b) : 0;
            
            let precioTotal = 0;

            totalExtras ?
                precioTotal = (ventaProyecto.concat(totalExtras)).reduce((a,b) => a+b):
                precioTotal = ventaProyecto ;

            let saldo = precioTotal - ventaActual
            let x100Venta = ((ventaActual / precioTotal)* 100).toFixed(2);
            
            
            setVentaTotal(ventaActual);
            setVentaExtra(totalExtras);
            setPrecioTotal(precioTotal);
            setSaldo(saldo);
            setCiento(x100Venta);
        });
    }

    //Obteniendo ventas de los proyectos de firebase


    useEffect(() => {
        getData();
    }, [])
    

    return (<>

        <div className="container wrapperVistaProyectos mt-4 text-center" >
            <h4>Proyectos</h4>
            
            {proyectos.map((el, index) => {
                return(
                    <div className="cardProyectos my-5" key={ index }>

                        <div className="titulos d-flex justify-content-center mb-3" >
                            <div className='d-flex me-4' >
                                <p className='me-2' >Proyecto: </p>
                                <p> "{el.nombre}" </p>
                            </div>
                            <div className='d-flex ms-4'>
                                <p className='me-2' >Costo: </p>
                                <p> $ { new Intl.NumberFormat('de-DE').format(el.precioVenta)} </p>
                            </div>
                        </div>

                        <div className="importes" >
                            <div className='wrapperTable' >
                                <p className='mb-2' >Estados Pagos</p>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Fecha de Venta</th>
                                            <th scope="col">Importe</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {el.ventas.map((venta,index) =>{
                                            return(
                                                (venta.tipoVenta === "Estado Pago") &&
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{moment(venta.fechaVenta).format("DD-MM-YY")}</td>
                                                        <td>$ {new Intl.NumberFormat('de-DE').format(venta.valor)}</td>
                                                    </tr>
                                            )
                                        })}
                                        
                                    </tbody>
                                </table>
                            </div>

                            <div className='wrapperTable'>
                                <p className='mb-2' >Pagos Extras</p>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Monto</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {el.ventas.map((venta,index) =>{
                                                return(
                                                    (venta.tipoVenta === "Pago Extra") &&
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{moment(venta.fechaVenta).format("DD-MM-YY")}</td>
                                                            <td>$ {new Intl.NumberFormat('de-DE').format(venta.valor)}</td>
                                                        </tr>
                                                )
                                            })}
                                    </tbody>
                                </table>
                            </div>

                        </div>

                        <div className="resultados mt-2" >
                            <div>
                                <p>Venta Proyecto</p>
                                <p>$ {new Intl.NumberFormat('de-DE').format(precioTotal)}</p>
                            </div>
                            <div>
                                <p>Venta Extras</p>
                                <p>$ {new Intl.NumberFormat('de-DE').format(ventaExtra)}</p>
                            </div>
                            <div>
                                <p>Total Venta Actual</p>
                                <p>$ {new Intl.NumberFormat('de-DE').format(ventaTotal)}</p>
                            </div>
                            <div>
                                <p>% Venta Actual</p>
                                <p> {ciento} %</p>
                            </div>
                            <div>
                                <p>Importe por Cobrar</p>
                                <p>$ {new Intl.NumberFormat('de-DE').format(saldo)}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </>)
}
