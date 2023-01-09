import {query, collection, onSnapshot, where, orderBy} from 'firebase/firestore';
import db from '../backend/DBFiresbase';

const getListaXArea = (coleccion, clave, valor, estado) => {

    onSnapshot(query(collection(db,coleccion), where(clave, "==", valor), orderBy("fechaRegistro", "desc")), (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });

        let lista = docs.map(el => el.nombre)
        estado(lista);
    });

}

export default getListaXArea;