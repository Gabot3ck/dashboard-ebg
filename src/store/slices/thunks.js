import { collection, onSnapshot, query} from "firebase/firestore";
import db from "../../backend/DBFiresbase";
import { setGastos, startLoadingGastos } from "./gastosSlice"


export const getGastos = () => {
    return async( dispacth, getState) => {
        dispacth( startLoadingGastos() );
        
        // Traer gastos de firestore
        const q = query(collection(db, "proyectos") );
        

        const getData = async () => {
            onSnapshot(q, (querySnapshot) => {
                    const docs = [];
            
                    querySnapshot.forEach((doc) => {
                        docs.push({...doc.data(), id:doc.id});
                    });

                    const precioTotal = docs.map(el => el.gastos);

                    let lista = [];

                    precioTotal.forEach( (array) => {
                        if(array.length){
                            array.map(el => lista.push( el))
                        }
                    })
                    
                    dispacth( setGastos({ gastos: lista }) );
            });
        }

        getData()

        
    }
}
