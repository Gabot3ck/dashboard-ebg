import { query, collection, onSnapshot} from 'firebase/firestore';
import db from '../backend/DBFiresbase';

const getDataCollection = (coleccion, estado) => {

    onSnapshot(query(collection(db,coleccion)), (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });
        estado(docs);
    });
}

export default getDataCollection