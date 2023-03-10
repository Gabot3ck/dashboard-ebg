import {query, collection, onSnapshot, where, orderBy} from 'firebase/firestore';
import db from '../backend/DBFiresbase';

const  getListaTotalGastosXArea = (coleccion, clave, valor, estado ) => {
    onSnapshot(query(collection(db,coleccion), orderBy("fechaRegistro", "asc"),where(clave, "==", valor)), (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });

        const precioTotal = docs.map(el => el.gastos.length ? el.gastos : [0]);


        let lista = [];

        precioTotal.forEach( (array) => {

            if(array.length){
                if(array.length === 1){
                    array.map(gasto => lista.push( parseInt(gasto.valor)))
                    
                }
                
                if(array.length !== 1){
                    lista.push(array.map(gasto => parseInt(gasto.valor)).reduce((a,b) => a+b));
                }
            }
            
        })

        estado(lista);
    });

}




export default  getListaTotalGastosXArea;