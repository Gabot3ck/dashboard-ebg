import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import Logo from "./logo-ebg.png";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showMessageError } from "../../../helpers/ShowMessage";
import "./Login.css";



export const Login =  () => {

    const [user, setUser] = useState({
        usuario: "",
        password: "",
    })

    const {login} = useAuth();
    const navigate = useNavigate();

    const [focusEmail, setFocusEmail] = useState(false);
    const [focusPass, setFocusPass] = useState(false);


    

    const handleChange = ({target: {name, value}}) => 
        setUser({...user, [name]: value});
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await login(user.usuario, user.password);
            navigate("/home");

        } catch (error){
            
            if(error.code === "auth/wrong-password") {

                showMessageError("La contraseña es incorrecta");
                setFocusPass(true);
    
            } else if (error.code === "auth/user-not-found") {
    
                showMessageError("Usuario no registrado o incorrecto");
                setFocusEmail(true);
    
            } else if (error.code === "auth/invalid-email") {
    
                    showMessageError("Ingrese su email");
                    setFocusEmail(true);
    
            }  else if (error.code === "auth/internal-error") {
                showMessageError("Ingrese su contraseña");
                setFocusPass(true);

            } else if (error.code === "auth/to-many-requests"){
                showMessageError("Demasiados intentos fallidos, intente de nuevo en 3 min");
            } else {
                showMessageError(error.message);
            }
        }

    }

    useEffect( () => {
        let timerEmail = "";
        let timerPass = "";


        if(focusEmail){
            timerEmail = setTimeout(() => setFocusEmail(false), 3200);
        }

        if(focusPass){
            timerPass = setTimeout(() => setFocusPass(false), 3200);
        }

        return () => {
            clearTimeout(timerEmail);
            clearTimeout(timerPass);
        }

    }, [focusEmail, focusPass])


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
                            className={`form-control  ${focusEmail ? "foco" : ""}`} 
                            id="AuthEmail"
                            name="usuario"/>
                        <label className="form-label mt-1">EMAIL</label>
                    </div>

                    <div className="col-md-12">
                        <input
                            onChange={handleChange} 
                            type="password"
                            className={`form-control  ${focusPass ? "foco" : ""}`} 
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
