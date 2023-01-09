import { query, collection, onSnapshot } from 'firebase/firestore';
import db from '../backend/DBFiresbase';

const  getSumaManoObra = (coleccion, estado) => {
    onSnapshot(query(collection(db,coleccion)), (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });

        const precioTotal = docs.map(el => el.gastos);

        let lista = [];

        precioTotal.forEach( (array) => {

            if(array.length){
                lista.push(array.map(gasto => gasto.concepto === "Mano de Obra" ? parseInt(gasto.valor) : 0).reduce((a,b) => a+b))
            }
            
        })

        estado(lista.length ? lista.reduce((a,b) => a+b) : 0);
    });

}

export default  getSumaManoObra;