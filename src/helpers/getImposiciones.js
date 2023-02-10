

export const getImposiciones = (dias, sueldoBase) => {

    let sueldo = (dias * sueldoBase)/30

    return sueldo.toFixed(0);

}
