import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../../../backend/DBFiresbase";
import Logo from "./logo-ebg.png";
import "./Login.css";

const auth = getAuth(firebaseApp);


export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password);

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
                            onChange={(e) => {setEmail(e.target.value)}}
                            type="email"
                            className="form-control" 
                            id="AuthEmail"
                            name="usuario"/>
                        <label className="form-label mt-1">EMAIL</label>
                    </div>

                    <div className="col-md-12">
                        <input
                            onChange={(e) => {setPassword(e.target.value)}} 
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
        </div>
    </>)
}
