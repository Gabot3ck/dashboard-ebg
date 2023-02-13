

export const getImposiciones = (dias, montoBase) => {

    let sueldo = (parseInt(dias) * montoBase)/30;

    return sueldo.toFixed(0);

}
