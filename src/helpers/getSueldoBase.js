import { doc, getDoc} from 'firebase/firestore';
import db from '../backend/DBFiresbase';


export const getSueldoBase = async ( id , estado ) => {

    let data = []

    const docRef = doc(db, "colaboradores", id)
    const docSnap = await getDoc(docRef)

    docSnap.exists() && data.push(docSnap.data());

    const { sueldo_base } = data[0];

    estado( sueldo_base );
    
}
