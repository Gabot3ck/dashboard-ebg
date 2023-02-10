import { doc, getDoc} from 'firebase/firestore';
import db from '../backend/DBFiresbase';


export const getDataTrabajador = async ( id , estado ) => {

    let data = []

    const docRef = doc(db, "colaboradores", id)
    const docSnap = await getDoc(docRef)

    docSnap.exists() && data.push(docSnap.data());


    estado( data[0] );
    
}
