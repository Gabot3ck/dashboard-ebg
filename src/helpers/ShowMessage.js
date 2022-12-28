import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const showMessage = (mensaje) => {
    
    toast.error(`${mensaje}`, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
}

export default showMessage;