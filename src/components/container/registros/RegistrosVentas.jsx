import FormRegistroVentas from '../../pure/form/FormRegistroVentas';
import styles from "./Registros.module.css";
// import CardVistaProyectos from '../../../models/CardVistaProyectos';


export default function RegistrosVentas() {

    return (<>

        <div className={styles.WrapperContenedor} >
            <h1 className="" >Registros de Ventas</h1>

            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                Registar Venta
            </button>

        </div>


        {/* Modal de Formulario de Registro de Ventas */}
        <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-primary">
                            <h5 className="modal-title text-white" id="exampleModalLabel">Formulario de Registro de Ventas</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <FormRegistroVentas/>
                        </div>
                    </div>
                </div>
            </div>
    </>)
}
