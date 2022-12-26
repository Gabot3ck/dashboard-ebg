import logo from "../../../../assets/images/ebg-logo-navbar.png"
import styles from "./Logo.module.css"

export default function Logo() {
    return (<>
        <div className= {styles.logo}>
            <img className="w-75 h-100" src= { logo } alt="logotipo EBG"/>
        </div>
    </>)
}
