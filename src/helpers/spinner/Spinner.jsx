import "./Spinner.css"

export default function Spinner() {
    return (<>
        <div className="wrapper_spinner d-flex justify-content-center align-items-center">
        <div className="spinner-border color_spinner " role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <span className="color_spinner mt-3">Loading...</span>
    </div>
    </>)
}