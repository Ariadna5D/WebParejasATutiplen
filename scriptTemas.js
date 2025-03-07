class ManagerTemas{

constructor(){
    this.elementosTema = [];
    
    let elementosli = document.getElementsByTagName("li");
    for (let i = 0; i < elementosli.length; i++) {
        this.elementosTema.push(elementosli[i]);
    }
    
    let elementosbutton = document.getElementsByTagName("button");
    for (let i = 0; i < elementosbutton.length; i++) {
        this.elementosTema.push(elementosbutton[i]);
    }
    
    let elementosheader = document.getElementsByTagName("header");
    for (let i = 0; i < elementosheader.length; i++) {
        this.elementosTema.push(elementosheader[i]);
    }
    
    let elementosnav = document.getElementsByTagName("nav");
    for (let i = 0; i < elementosnav.length; i++) {
        this.elementosTema.push(elementosnav[i]);
    }
    
    let elementosmain = document.getElementsByTagName("main");
    for (let i = 0; i < elementosmain.length; i++) {
        this.elementosTema.push(elementosmain[i]);
    }
    
    let elementosfooter = document.getElementsByTagName("footer");
    for (let i = 0; i < elementosfooter.length; i++) {
        this.elementosTema.push(elementosfooter[i]);
    }

    let ventanas = document.getElementsByClassName("ventana");
    for (let i = 0; i < ventanas.length; i++) {
        this.elementosTema.push(ventanas[i]);
    }

    document.getElementById("botonTema").addEventListener("click", () => this.cambiarModoDiaNoche())
    this.modoOscuroActivo = true;

    // Para que se mantenga el tema en el que estaba
    if(localStorage.getItem("temaOscuro") === "false"){
        this.cambiarModoDiaNoche();
    }
}

cambiarModoDiaNoche(){

    for (let i = 0; i < this.elementosTema.length; i++) {
        this.elementosTema[i].classList.toggle("light");
        this.modoOscuroActivo = !this.modoOscuroActivo;
        localStorage.setItem("temaOscuro", this.modoOscuroActivo);
    }
    //console.log(this.modoOscuroActivo)
}

}

const mTemas = new ManagerTemas();