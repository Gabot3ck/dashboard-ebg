import { query, collection, onSnapshot, orderBy } from 'firebase/firestore';
import db from '../backend/DBFiresbase';

const getListaCostosMO = ( coleccion, estado ) => {


    onSnapshot(query(collection(db,coleccion), orderBy("fechaRegistro","desc")), (querySnapshot) => {
        const docs = [];

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });

        const gastos = docs.map(el => el.gastos);

        let lista = [];

        gastos.forEach( (gasto) => {
            
            gasto?.map(el => el.concepto === "Mano de Obra" && lista.unshift(el));
            
        })
        estado(lista);
    });
}
export default getListaCostosMO;