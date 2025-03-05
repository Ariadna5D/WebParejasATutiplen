const panelPuntuacion = document.getElementById("panelPuntuacion");
const panelAciertos = document.getElementById("panelAciertos");
const panelTiempo = document.getElementById("panelTiempo");
const botonJugar = document.getElementById("botonJugar");

botonJugar.addEventListener("click", () => volverALaPaginaInicio())


panelPuntuacion.textContent = localStorage.getItem("puntuacion");
panelAciertos.textContent = localStorage.getItem("aciertos");
panelTiempo.textContent = localStorage.getItem("tiempo");




function volverALaPaginaInicio(){

    window.open("index.html", "_self");

}