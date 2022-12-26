import "./CardImportes.css";

export default function CardImportes({importe, nombre, fondo, iva , asunto, display}) {
    return (<>
        <div 
            className={`card text-white bg-${fondo} col-4`} 
            style={{maxWidth: "16rem", height:"150px", maxHeight:"170px"}}>

            <div className="card-header bg-transparent  text-start  fs-6" 
                style={{maxHeight:"170px"}}>
            {nombre}
            </div>

            <div className=" mx-3 my-2">
                <p className="card-title fs-4 fw-bold" >$ {importe}</p>
            </div>

            <div className={`${display} w-100 fuente_iva`}  >
                <p className='m-0 ms-3 me-3 fw-bold' >{asunto}</p>
                <p className='m-0' >$ {iva}</p>
            </div>

        </div>
    </>)
}
