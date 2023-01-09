import {query, collection, onSnapshot, orderBy} from 'firebase/firestore';
import db from '../backend/DBFiresbase';

const getListaProyectos = (coleccion,  estado) => {

    onSnapshot(query(collection(db,coleccion), orderBy("nombre", "asc")), (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });

        let lista = docs.map(el => el.nombre)
        estado(lista);
    });

}

export default getListaProyectos;