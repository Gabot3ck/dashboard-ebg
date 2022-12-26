import { query, collection, onSnapshot} from 'firebase/firestore';
import db from '../backend/DBFiresbase';

const getListaColeccion = (coleccion, estado) => {

    onSnapshot(query(collection(db,coleccion)), (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });

        let lista = docs.map(el => el.nombre)
        estado(lista);
    });

}

export default getListaColeccion;