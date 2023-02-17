

export const getDescuentos = ( imponible, imposicion ) => {

    let descuento = 0;

    switch (imposicion) {
        case "salud":
            return  descuento = (parseInt(imponible) * 0.07).toFixed(0);
        
        case "cesantia":
            return descuento = (parseInt(imponible) *  0.03).toFixed(0);

        case "sis":
            return descuento = (parseInt(imponible) *  0.0154).toFixed(0);

        case "mutual":
            return descuento = (parseInt(imponible) * 0.0671).toFixed(0);
        default:
            break;
    }

    return descuento;
}
