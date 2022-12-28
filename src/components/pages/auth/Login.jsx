import { useState } from "react";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import Logo from "./logo-ebg.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";



export const Login =  () => {

    const [user, setUser] = useState({
        usuario: "",
        password: "",
    })

    const {login} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();

    const handleChange = ({target: {name, value}}) => 
        setUser({...user, [name]: value});
    

    const showMessage = (mensaje) => {
    
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("")

        try {

            await login(user.usuario, user.password);
            navigate("/");

        } catch (error){
            
            if(error.code === "auth/wrong-password") {

                showMessage("La contraseña es incorrecta");
                // validateInput(inputPass);
    
            } else if (error.code === "auth/user-not-found") {
    
                showMessage("Usuario no registrado o incorrecto");
                // validateInput(inputEmail);
    
            } else if (error.code === "auth/invalid-email") {
    
                    showMessage("Ingrese su email");
                    // validateInput(inputEmail);
    
            }  else if (error.code === "auth/internal-error") {
                showMessage("Ingrese su contraseña");
                // validateInput(inputPass);
            } else if (error.code === "auth/to-many-requests"){
                showMessage("Demasiados intentos fallidos, intente de nuevo en 3 min");
            } else {
                showMessage(error.message);
            }
        }

    }


    return (<>
        <div className="wrapperLogin">
        
            <div className="login">
                <div className="logo_login">
                    <img className="w-100 h-100" src={Logo} alt="Logo EBG" />
                </div>
                
                <form
                    onSubmit={handleSubmit}
                    id="FormAuth"
                    className="form_login row g-4">

                    <div className="col-md-12">
                        <input
                            onChange={handleChange}
                            type="email"
                            className="form-control" 
                            id="AuthEmail"
                            name="usuario"/>
                        <label className="form-label mt-1">EMAIL</label>
                    </div>

                    <div className="col-md-12">
                        <input
                            onChange={handleChange} 
                            type="password"
                            className="form-control" 
                            id="AuthPassword"
                            name="password"/>
                        <label className="form-label mt-1">PASSWORD</label>
                    </div>

                    <div className='col-6 mx-auto'>
                        <button className="btn btn-light">INGRESAR</button>
                    </div>
                    
                </form>
            </div>
            <ToastContainer/>
        </div>
    </>)
}
