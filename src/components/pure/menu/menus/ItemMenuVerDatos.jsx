import SubmenuVerDatos from "../subMenus/SubmenuVerDatos";
import "./ItemMenu.css";


export default function ItemMenuVerDatos({titulo, idFlush }) {
    return (<>
        <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                    <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target={`#${idFlush}`} aria-expanded="false" aria-controls="flush-collapseOne">
                        {titulo}
                    </button>
                </h2>
                <div id={idFlush} className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body p-0">
                        <SubmenuVerDatos />
                    </div>
                </div>
        </div>
    </>)
}