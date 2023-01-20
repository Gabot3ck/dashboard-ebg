import { query, collection, onSnapshot, orderBy} from 'firebase/firestore';
import db from '../backend/DBFiresbase';

const  getListaTotalGastos = (coleccion, estado ) => {
    onSnapshot(query(collection(db,coleccion), orderBy("fechaRegistro", "desc")), (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });

        const precioTotal = docs.map(el =>  el.gastos.length ? el.gastos : [0]);

        let lista = [];

        precioTotal.forEach( (array) => {

            if(array.length !== 0){
                array.length === 1 ? 
                array.map(gasto => lista.push( parseInt(gasto.valor))) :
                lista.push(array.map(gasto => parseInt(gasto.valor)).reduce((a,b) => a+b));
            } 
            
        })


        estado(lista);
    });

}




export default  getListaTotalGastos;