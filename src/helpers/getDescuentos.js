

export const getDescuentos = ( imponible, imposicion ) => {

    let descuento = 0;

    switch (imposicion) {
        case "salud":
            return  descuento = (parseInt(imponible) * 0.07).toFixed(3);
        
        case "cesantia":
            return descuento = (parseInt(imponible) *  0.03).toFixed(3);

        case "sis":
            return descuento = (parseInt(imponible) *  0.0154).toFixed(3);

        case "mutual":
            return descuento = (parseInt(imponible) * 0.0671).toFixed(3);
        default:
            break;
    }

    return descuento;
}
