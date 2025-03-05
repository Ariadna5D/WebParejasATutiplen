class ManagerTemas{

constructor(){
    this.elementosTema = [];
    Array.from(document.getElementsByTagName("li")).forEach(element => this.elementosTema.push(element));
    Array.from(document.getElementsByTagName("header")).forEach(element => this.elementosTema.push(element));
    Array.from(document.getElementsByTagName("nav")).forEach(element => this.elementosTema.push(element));
    Array.from(document.getElementsByTagName("main")).forEach(element => this.elementosTema.push(element));
    Array.from(document.getElementsByTagName("footer")).forEach(element => this.elementosTema.push(element));
    Array.from(document.getElementsByTagName("button")).forEach(element => this.elementosTema.push(element));
    Array.from(document.getElementsByClassName("ventana")).forEach(element => this.elementosTema.push(element));
    
    document.getElementById("botonTema").addEventListener("click", () => this.cambiarModoDiaNoche())
}

cambiarModoDiaNoche(){
    this.elementosTema.forEach(element => element.classList.toggle("light"));
}

}

const mTemas = new ManagerTemas();