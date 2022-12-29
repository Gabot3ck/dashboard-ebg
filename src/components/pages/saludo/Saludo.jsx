import Logo from "../../../assets/images/logo ebg.png";

export const Saludo = () => {
    return (<>
        <div className="container pt-4 mx-auto gap-4 d-flex flex-column justify-content-center align-items-center">
            <h2>Bienvenido a:</h2>
            <img  className="w-25" src={Logo} alt="Logo EBG" />
            <h2>Plataforma Digital</h2>
        </div>
    </>)
}
