import React from 'react'

export default function ReporteAnual() {
    return (<>
        <table className="table table-sm table-bordered text-center" style={{ width: "120px" }}> 
                        <thead>
                            <tr className="table-secondary" style={{fontSize: ".9rem"}} >
                                <th>Mes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-light d-flex flex-column" style={{fontSize: ".9rem"}} >
                                <th>Enero</th>
                                <th>Febrero</th>
                                <th>Marzo</th>
                                <th>Abril</th>
                                <th>Mayo</th>
                                <th>Junio</th>
                                <th>Julio</th>
                                <th>Agosto</th>
                                <th>Septiembre</th>
                                <th>Octubre</th>
                                <th>Noviembre</th>
                                <th>Diciembre</th>
                            </tr>
                        </tbody>
                </table>
    </>)
}
