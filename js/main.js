import esUnCuil from "./validar-cuil.js";
import esMayorDeEdad from "./validar-edad.js";
import { tiposError, mensajes } from "./customeErrors.js";

const campoDeFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]")
formulario.addEventListener("submit", (e) => {
    e.preventDefault(); //vamos evitar que el formulario se recargo cuando apretamso el boton enviar

    const listaRespuestas = {
        nombre: e.target.elements["nombre"].value,
        email: e.target.elements["email"].value,
        identificacion: e.target.elements["identificacion"].value,
        cuil: e.target.elements["cuil"].value,
        fecha_nacimiento: e.target.elements["fecha_nacimiento"].value,
    }
    localStorage.setItem("registro", JSON.stringify(listaRespuestas)) //va a convertir nuestro objeto a un formato json el cual sera guardado en nuestro navegador
    window.location.href = "./abrir-cuenta-form-2.html"
})


campoDeFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificarCampo(campo))
    campo.addEventListener("invalid", evento => evento.preventDefault())
});


function verificarCampo(campo) {
    let mensaje = ""
    campo.setCustomValidity(""); //esto elimina el error cuando nosotros ponemos un campo valido

    if (campo.name == "cuil" && campo.value.length >= 11) {
        esUnCuil(campo)
    }
    if (campo.name == "fecha_nacimiento" && campo.value != "") {
        esMayorDeEdad(campo)
    }
    //console.log(campo.validity);
    tiposError.forEach(error => {
        if (campo.validity[error]) { //por cada uno de esos errores nosotros los verificamos con validity
            mensaje = mensajes[campo.name][error] //si es true los mensajes es igual nombre del campo(valuemissing) y el error (ya sea identificacion, nombre, fecha...)
            console.log(mensaje); //imprimimos el mensaje que nos envia
        }
    })                  //campo es un array
    const mensajeError = campo.parentNode.querySelector(".mensaje-error")
    const validarInputCheck = campo.checkValidity() //corroboramos si es true o no
    if (!validarInputCheck) {
        mensajeError.textContent = mensaje //si no es valido el mensaje error en su propiedad textcontent contenga el mensaje personalizado
    } else {
        mensajeError.textContent = "" //si no, que se quede vacio
    }



}
