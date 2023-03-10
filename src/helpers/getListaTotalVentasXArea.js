import { query, collection, onSnapshot, where, orderBy} from 'firebase/firestore';
import db from '../backend/DBFiresbase';

const  getListaTotalVentasXArea = (coleccion, clave, valor, estado ) => {
    onSnapshot(query(collection(db,coleccion), orderBy("fechaRegistro", "asc"),where(clave, "==", valor)), (querySnapshot) => {
        const docs = [];
        // let suma = 0;

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });

        const precioTotal = docs.map(el => el.ventas.length ? el.ventas : [0]);


        let lista = [];

        precioTotal.forEach( (array) => {

            if(array.length !== 0){
                array.length === 1 ? 
                array.map(gasto => lista.push( parseInt(gasto.valor))) :
                lista.push(array.map(gasto => parseInt(gasto.valor)).reduce((a,b) => a+b));
            } 
            
        })


        estado(lista);
    });

}




export default  getListaTotalVentasXArea;