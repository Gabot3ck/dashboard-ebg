import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const showMessageError = (mensaje) => {
    
    toast.error(`${mensaje}`, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
}

