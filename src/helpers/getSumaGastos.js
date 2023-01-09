import { query, collection, onSnapshot } from 'firebase/firestore';
import db from '../backend/DBFiresbase';

const  getSumaGastos = (coleccion, estado) => {
    onSnapshot(query(collection(db,coleccion)), (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });

        const precioTotal = docs.map(el => el.gastos);

        let lista = [];

        precioTotal.forEach( (array) => {

            if(array.length){
                lista.push(array.map(gasto => parseInt(gasto.valor)).reduce((a,b) => a+b))
            }
            
        })

        estado(lista.length ? lista.reduce((a,b) => a+b) : 0);
    });

}

export default  getSumaGastos;


