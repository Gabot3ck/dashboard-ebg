import { query, collection, onSnapshot} from 'firebase/firestore';
import db from '../backend/DBFiresbase';

const getTotalSuma = (coleccion, estado) => {

    onSnapshot(query(collection(db,coleccion)), (querySnapshot) => {
        const docs = [];
        let suma = 0;

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });

        const precioTotal = docs.map(el => el.valor);
            
        precioTotal.forEach((el) => {
            return suma += parseInt(el);
        });

        estado(suma);
    });
}

export default getTotalSuma