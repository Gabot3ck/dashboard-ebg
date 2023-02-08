import {query, collection, onSnapshot , orderBy} from 'firebase/firestore';
import db from '../backend/DBFiresbase';

const getAvanceFacturado = (coleccion,  estado) => {
    const q = query(collection(db, coleccion ), orderBy("fechaRegistro", "asc"));

    onSnapshot(q, (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data()});
        });

        let lista = []
        docs.forEach( (el) => {
            lista.push({
                presupuesto: parseInt(el.presupuesto), 
                ventas: el.ventas.length ? parseInt(el.ventas.map(venta => venta.valor).reduce((a,b) => a+b)) : 0,
                
            })
        })

        
        let avances = lista.map(el => (
            parseInt((( el.ventas  / el.presupuesto)*100).toFixed(2))
        ))

        estado(avances);
    });

    return (<>

    </>)
}

export default getAvanceFacturado