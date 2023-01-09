import { query, collection, onSnapshot } from 'firebase/firestore';
import db from '../backend/DBFiresbase';

const  getSumaVentas = (coleccion, estado) => {
    onSnapshot(query(collection(db,coleccion)), (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });

        const precioTotal = docs.map(el => el.ventas);

        let lista = [];

        precioTotal.forEach( (array) => {

            if(array.length){
                lista.push(array.map(venta => parseInt(venta.valor)).reduce((a,b) => a+b))
            }
            
        })

        estado(lista.length ? lista.reduce((a,b) => a+b) : 0);
    });

}

export default  getSumaVentas;