const botonAbrirCamara = document.querySelector("[data-video-boton]");
const video = document.querySelector("[data-video]");  //seleccionamos los elementos para poder abrir la camara
const campoCamara = document.querySelector("[data-camera]");

const botonTomarFoto = document.querySelector("[data-tomar-foto]");
const mensaje = document.querySelector("[data-mensaje]");
const canvas = document.querySelector("[data-video-canvas]");

const botonEnviar = document.querySelector("[data-enviar]");
let imgUrl = ""


botonAbrirCamara.addEventListener("click", async () => { //async y await funcionan de manera conjunta
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({ video: true, audio: false }) //el navegador tiene que esperar a que el usuario acepte el uso de la camara, entonces hacemos que la funcion sea asincrona

    botonAbrirCamara.style.display = "none";  //el boton lo ocultamos 
    campoCamara.style.display = "block";  //espacio para el video cuando aceptamos prender la camara
    video.srcObject = iniciarVideo;  //nos permite mostrar ese video en pantalla
});

botonTomarFoto.addEventListener("click", () => {
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height)
    imgUrl = canvas.toDataURL("image/jpeg");
    campoCamara.style.display = "none";
    mensaje.style.display = "block";

});

botonEnviar.addEventListener("click", () => {
    const recibirDatos = localStorage.getItem("registro")
    const convertirDatos = JSON.parse(recibirDatos)
    convertirDatos.img_url = imgUrl;

    localStorage.setItem("registro", JSON.stringify(convertirDatos))

    window.location.href = "./abrir-cuenta-form-3.html";

})