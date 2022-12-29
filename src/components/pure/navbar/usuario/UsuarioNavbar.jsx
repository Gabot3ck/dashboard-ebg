import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../../../../backend/DBFiresbase";
import { useAuth } from "../../../../context/authContext"
import styles from "./UsuarioNavbar.module.css"

export default  function UsuarioNavbar() {
    const {user} = useAuth();
    const [data, setData] = useState({});

    const getDataUser = async () => {
        const usuario = await getDoc(doc(db, "usuarios", user.uid))
        setData({...usuario.data()})
    }
    

    useEffect( () => {
        getDataUser()
    }, [])


    return (<>
        <section className="w-100">
            <p className={ styles.texto }> {data.nombre} {data.apellido} </p>
        </section>
    </>)
}
