import { useEffect, useState } from "react";

export const useDataPersonal = () => {

    const [dataTrabajador, setDataTrabajador] = useState({})
    const [sueldoBase, setSueldoBase] = useState(0);
    const [sueldo, setSueldo] = useState(0);
    const [horasNoTrabajadas, setHorasNoTrabajadas] = useState("");
    const [gratificacion, setGratificacion] = useState(0);
    

    return (
    <div>useDataPersonal</div>
)
}
