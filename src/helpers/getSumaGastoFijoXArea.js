import { query, collection, onSnapshot, where} from 'firebase/firestore';
import db from '../backend/DBFiresbase';

const  getSumaGastoFijoXArea = (coleccion, clave, valor, estado) => {
    onSnapshot(query(collection(db,coleccion), where(clave, "==", valor)), (querySnapshot) => {
        const docs = [];
        let suma = 0;

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });

        const [precioTotal] = docs.map(el => el.gastos);
            
            precioTotal.forEach((el) => {
                if(el.tipo === "Fijo"){
                    return suma += parseInt(el.valor);
                }
            });

        estado(suma);
    });

}

export default  getSumaGastoFijoXArea;