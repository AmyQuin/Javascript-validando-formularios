export default function esMayorDeEdad(campo) {
    const fechaNacimiento = new Date(campo.value);
    validarEdad(fechaNacimiento)
    console.log(validarEdad(fechaNacimiento));

}

function validarEdad(fecha) {
    const fechaActual = new Date();
    const fechaMas18 = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate()); //estamos especificando que la persona debe ser mayor de edad de la fecha actual

    return fechaActual >= fechaMas18;
}