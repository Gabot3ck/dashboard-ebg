import {onSnapshot} from 'firebase/firestore';

const getOnSnapshot = (query, estado) => {

    onSnapshot(query, (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });
        estado(docs);
    });
}

export default getOnSnapshot