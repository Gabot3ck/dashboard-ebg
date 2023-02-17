

export const getDescuentos = ( imponible, imposicion ) => {

    let porcentaje = 0;
    let descuento = 0;

    switch (imposicion) {
        case "salud":
            porcentaje = 0.07;
            return  descuento = (imponible * porcentaje).toFixed(0);
        
        case "cesantia":
            porcentaje = 0.03;
            return descuento = (imponible * porcentaje).toFixed(0);

        case "sis":
            porcentaje = 0.0154;
            return descuento = (imponible * porcentaje).toFixed(0);

        case "mutual":
            porcentaje = 0.0671;
            return descuento = (imponible * porcentaje).toFixed(0);
        default:
            break;
    }




    return descuento;
}
