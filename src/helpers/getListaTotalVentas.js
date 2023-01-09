import { query, collection, onSnapshot, orderBy} from 'firebase/firestore';
import db from '../backend/DBFiresbase' ;

const  getListaTotalVentas = (coleccion, estado ) => {
    onSnapshot(query(collection(db,coleccion), orderBy("nombre", "asc")), (querySnapshot) => {
        const docs = [];
        // let suma = 0;

        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        });

        const precioTotal = docs.map(el => el.ventas);


        let lista = [];

        precioTotal.forEach( (array) => {

            if(array.length !== 0){
                array.length === 1 ? 
                array.map(venta => lista.push( parseInt(venta.valor))) :
                lista.push(array.map(venta => parseInt(venta.valor)).reduce((a,b) => a+b));
            } 
            
        })


        estado(lista);
    });

}




export default  getListaTotalVentas;