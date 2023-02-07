import {query, collection, onSnapshot , orderBy} from 'firebase/firestore';
import db from '../backend/DBFiresbase';


const getAvanceProduccion = (coleccion,  estado) => {
    const q = query(collection(db, coleccion ), orderBy("fechaRegistro", "asc"));

    onSnapshot(q, (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data()});
        });
        
        const produccion = docs.map(el => el.produccion ? el.produccion : 0)


        estado(produccion);
    });

    return (<>

    </>)
}

export default getAvanceProduccion