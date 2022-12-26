import {initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBh9CD38lMI-LI3Z3tT_8490sYNzaBg0hQ",
    authDomain: "dashboard---ebg.firebaseapp.com",
    projectId: "dashboard---ebg",
    storageBucket: "dashboard---ebg.appspot.com",
    messagingSenderId: "628824289854",
    appId: "1:628824289854:web:a15bea50ff2922df1a176f"
};

export const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default  db;

