const panelPuntuacion = document.getElementsByClassName("panelPuntuacion");
const panelAciertos = document.getElementsByClassName("panelAciertos");
const panelTiempo = document.getElementsByClassName("panelTiempo");
const panelDescubiertas = document.getElementsByClassName("panelDescubiertas");
const botonJugar = document.getElementById("botonJugar");
const botonReinicio = document.getElementById("botonReinicio");

botonJugar.addEventListener("click", () => volverALaPaginaInicio());
botonReinicio.addEventListener("click", () => volverALaPaginaInicio());

for (let i = 0; i < panelPuntuacion.length; i++) {
    panelPuntuacion[i].textContent = localStorage.getItem("puntuacion");
}

for (let i = 0; i < panelAciertos.length; i++) {
    panelAciertos[i].textContent = localStorage.getItem("aciertos");
}

for (let i = 0; i < panelTiempo.length; i++) {
    panelTiempo[i].textContent = localStorage.getItem("tiempo");
}

for (let i = 0; i < panelDescubiertas.length; i++) {
    panelDescubiertas[i].textContent = localStorage.getItem("descubiertas");
}



function volverALaPaginaInicio(){

    window.open("index.html", "_self");

}