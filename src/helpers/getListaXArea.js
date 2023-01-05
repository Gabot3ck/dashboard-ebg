import {query, collection, onSnapshot, where} from 'firebase/firestore';
import db from '../backend/DBFiresbase';

const getListaXArea = (coleccion, clave, valor, estado) => {

    onSnapshot(query(collection(db,coleccion), where(clave, "==", valor)), (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });

        let lista = docs.map(el => el.nombre)
        estado(lista);
    });

}

export default getListaXArea;