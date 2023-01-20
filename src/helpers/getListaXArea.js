import {query, collection, onSnapshot, where, orderBy} from 'firebase/firestore';
import db from '../backend/DBFiresbase';

const getListaXArea = (coleccion, clave, valor, estado) => {

    onSnapshot(query(collection(db,coleccion), orderBy("fechaRegistro", "asc"), where(clave, "==", valor)), (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });

        let lista = docs.map(el => el.nombre)
        estado(lista);
    });

}

export default getListaXArea;