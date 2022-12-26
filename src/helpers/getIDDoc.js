import {query, where, collection, onSnapshot} from 'firebase/firestore';
import db from '../backend/DBFiresbase';


const getIDDoc = (coleccion, nombre, estado) => {
    const q = query(collection(db, coleccion ), where("nombre", "==", nombre));

    onSnapshot(q, (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({id:doc.id});
        });
        let [{id}] = docs
        estado(id);
    });

}

export default getIDDoc;

