import {query, where, collection , doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import db from '../backend/DBFiresbase';
// import APIRegionesChile from './APIRegionesChile';
import getDataCollection from './getDataCollection';
import getIDDoc from './getIDDoc';
import getOnSnapshot from './getOnSnapshot';



export default function TestSet() {

    //Capturando el valor del Input select para pasarlo a la consulta de DB de firebase
    const [nombre, setNombre] = useState("");

    //Haciendo la consulta para valores de las opciones del input select
    const q = query(collection(db,"tests"), where("nombre", "==" , nombre) );


    //Guardando los valores de la collecion Tests de Firebase
    const [test, setTest] = useState([]);

    //Getting data de nombre de Proyectos en Test
    const [proyectos, setProyectos] = useState([]);

    //Getting el id de un documento con una consulta a la lista y al nombre del proyecto
    const [id, setId] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        getOnSnapshot(q,setTest)
        getIDDoc("proyectos",nombre, setId);
    }

//todo ***  Trayendo ID de un proyecto de Firebase ***
const enviarVenta = () => {
    const nuevaVenta = doc(db, "proyectos", id);

    updateDoc(nuevaVenta,{ ventas: arrayUnion({nombre: "nueva venta", precio: 1000000 })})
    console.log(`Venta enviada al proyecto ${nombre}`);
}



// todo ***  Mostrando  data  ***
    useEffect(() => {
        getDataCollection("tests",setProyectos);
    }, [])
    

    return (<>

        
        
        <form
            className="row g-4 needs-validation d-flex flex-column align-items-center -justify-content-center mt-3" 
            id="formRegistroGastos" 
            onSubmit={handleSubmit}>

            <div className="col-md-4">
                <label className="form-label">Proyecto:</label>
                <select 
                onChange= {(e) => setNombre( e.target.value)}
                className="form-select" 
                id="sel" 
                name="proveedor"
                value={nombre}>
                    <option value="" >Seleccione</option>
                    {
                        proyectos.map((el, index) => {
                            return(
                                <option value={el.nombre} key={index} >{el.nombre}</option>
                            )
                        })
                    }
                </select>
            </div>

            <button className='btn btn-success w-25 mx-auto '>Buscar</button>

        </form>
        <button 
        className='btn btn-primary w-25 mx-auto '
        onClick={enviarVenta} >Enviar Venta
        </button>

        {
            test.map((el,index) => {
                
                return(
                    <div key={index} >
                        <p>Nombre del Proyecto: {el.nombre}</p>
                        <p>Costo: {el.valor}</p>
                        <p>Cliente: {el.cliente}</p>
                    </div>
                )
            } )
        }

        {/* <APIRegionesChile /> */}


    </>)
}
