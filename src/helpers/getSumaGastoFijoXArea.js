import { query, collection, onSnapshot, where} from 'firebase/firestore';
import db from '../backend/DBFiresbase';

const  getSumaGastoFijoXArea = (coleccion, clave, valor, estado) => {
    onSnapshot(query(collection(db,coleccion), where(clave, "==", valor)), (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });

        const precioTotal = docs.map(el => el.gastos);
            
        let lista = [];

        precioTotal.forEach( (array) => {

            if(array.length){
                if(array.length === 1){
                    array.map(gasto => gasto.tipo === "Fijo" && lista.push( parseInt(gasto.valor)))
                    
                }
                
                if(array.length !== 1){
                    lista.push(array.map(gasto => gasto.tipo === "Fijo" &&  parseInt(gasto.valor)).reduce((a,b) => a+b));
                }
            }
            
        })

        estado(lista.reduce((a,b) => a+b));
    });

}

export default  getSumaGastoFijoXArea;