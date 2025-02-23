
/*  
    /// OBJETO CARTA ///
    Funciones/Métodos:
        - seleccionar -> Lo que hace es mostrarse y ocultarse
        - bloquear -> Se bloquea haciendola imposible de clickar
        - esIgualACarta -> Esta compara la carta enviada consigo misma (parecido a un comparator)
        - mostrarCarta -> Lo que hace esta es mostrar su contenido o ocultarlo, aqui es donde se coloca el cambio de imagenes (dorso y cara)
*/
class Carta {

    /* 
        /// Constructor de Carta ///
            - Objeto div para poder referenciar
            - Se establecen clase y valor
            - Se pone oculta y se desbloquea
            - Se asignan los listeners para que cuando se cliquen se llame al metodo correspondiente
    */
    constructor(contenido) {
        this.objetoCarta = document.createElement('div');
        this.objetoCarta.className = 'carta';
        this._contenido = contenido;
        this.valorCarta = contenido;
        this.objetoCarta.textContent = contenido;
        this.seMuestra = false;
        this.estaBloqueada = false;
        this.asignarListeners();
        this.mostrarCarta(this.seMuestra);
    }

    get contenido() {
        return this._contenido;
    }

    asignarListeners() {
        this.objetoCarta.addEventListener("click", () => mC.seleccionarCarta(this));
    }

    seleccionar() {
        //console.log(`Carta ${this.contenido} clickeada`);
        this.seMuestra = !this.seMuestra;
        this.objetoCarta.classList.toggle('seleccionada', this.seMuestra);
        this.mostrarCarta(this.seMuestra);
    }

    desbloquear(){
        this.estaBloqueada = false;
        this.objetoCarta.classList.remove('bloqueada');
        console.log(this.objetoCarta.className);
    }

    bloquear() {
        this.estaBloqueada = true;
        this.objetoCarta.classList.toggle('bloqueada', this.estaBloqueada);
    }

    esIgualACarta(cartab) {
        return this.contenido === cartab.contenido;
    }

    mostrarCarta(mostrar) {
        if (mostrar) {
            this.objetoCarta.textContent = this.contenido;
        } else {
            this.objetoCarta.textContent = '';
        }
    }
}

/*  
    /// OBJETO VIDA ///
    Funciones/Métodos:
        - eliminar -> se elimina la vida del dom
*/
class Vida {
    /* 
        /// Constructor de Carta ///
            - Objeto div para poder referenciar
            - Se establecen clase y valor
            - Se pone oculta y se desbloquea
            - Se asignan los listeners para que cuando se cliquen se llame al metodo correspondiente
    */    
    constructor() {
        this.elemento = document.createElement('img');
        this.elemento.src = 'images/corazon.png';
        this.elemento.classList.add('vida');
    }

    eliminar() {
        this.elemento.classList.add('borrar')
        setTimeout(() => {
            if (this.elemento.parentNode) {
                this.elemento.parentNode.removeChild(this.elemento);
            }
        },750)
    }
}

/*  
    /// MANAGER DE CARTAS ///
    Se encarga de:
        - El Manager casi principal, solo que lo he separado para mejor lectura
        - Crear las cartas
        - Barajar las cartas
        - Ubicar las cartas en el DOM
        - Detectar cuando se selecciona una
        - Conteo de parejas (cuantas faltan)
*/
class ManagerCartas {
    
    constructor() {
        this.cartaA = null;
        this.cartaB = null;
        this.tiempoPareja = 10;
        this.listaCartas = [];
        this.contenedor = document.getElementById('contenedorCartas');
    }

    // Función para crear cartas
    crearCartas(num) {
        this.contenedor.innerHTML = '';
        const cantidad = num;
        this.listaCartas = [];

        if (!cantidad || cantidad <= 0) {
            alert('Debes ingresar un número válido mayor a 0');
            return;
        }

        //const fragmento = document.createDocumentFragment();

        // Crear parejas de cartas
        for (let i = 1; i <= cantidad; i++) {
            const carta1 = new Carta(i);
            const carta2 = new Carta(i);

            this.listaCartas.push(carta1);
            this.listaCartas.push(carta2);
        }

        this.barajarCartas(this.listaCartas);

        //Crear las cartas con cierto retraso
        for (let i = 0; i < this.listaCartas.length; i++) {
            setTimeout(() => {
                this.contenedor.appendChild(this.listaCartas[i].objetoCarta);
                this.listaCartas[i].bloquear();
            }, i * 100); 
        }

        setTimeout(() => {
            this.listaCartas.forEach(carta => {
                carta.desbloquear();
            });
            mT.iniciarTemporizador();
        }, this.listaCartas.length * 100);
        
        //this.contenedor.appendChild(fragmento);
        //console.log(this.listaCartas);
        this.parejasActuales = 0;
        this.parejasTotales = cantidad;
    }

    // Función para barajar cartas
    barajarCartas(cartas) {
        for (let i = cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
        }
        console.log('Cartas barajadas');
    }

    //Selecciona una carta
    seleccionarCarta(carta) {

        if(carta.estaBloqueada){
            return;
        }
        if(this.cartaA === carta){
            return;
        }

        else if (this.cartaA === null){ 
            this.cartaA = carta;
            carta.seleccionar();
            console.log(carta);
        } 
        else if (this.cartaB === null) {
            this.cartaB = carta;
            //console.log(carta);
            carta.seleccionar();
                
            //Esperar un tiempo ////////////////////////////
            if (this.cartaA.esIgualACarta(this.cartaB)) {
                console.log("¡SON IGUALES!");
                this.cartaA.bloquear();
                this.cartaB.bloquear();
                mT.anadirTiempo(this.tiempoPareja)
                this.parejasActuales++;
                this.cartaA = null;
                this.cartaB = null;

                // pongo mayor igual por si hay algun tipo de error
                if(this.parejasActuales >= this.parejasTotales){
                    mG.ganar();
                }
            }
            else{
                console.log("¡NO SON IGUALES!");
                setTimeout(() => {
                    this.cartaA.seleccionar();
                    this.cartaB.seleccionar();
                    this.cartaA = null;
                    this.cartaB = null;
                    mV.perderVida();
                    }, 1500);
            }
            
        }
    }

}

/*  
    /// MANAGER DE VIDAS ///
    Se encarga de:
        - Crear las vidas deseadas
        - Destruir la vida correspondiente
        - Añadir vidas
*/
class ManagerVidas{
    constructor(){
        this.vidas = [];
        this.contenedorVidas = document.getElementById('contenedorVidas');
    }
    
    inicializarVidas(num) {
        this.vidas = [];
        this.contenedorVidas.innerHTML = '';
        const cantidad = num;

        for (let i = 0; i < cantidad; i++) {
            let vida = new Vida();
            this.vidas.push(vida);
            this.contenedorVidas.appendChild(vida.elemento);
        }
    }

    perderVida() {
        if (this.vidas.length > 0) {
            let vida = this.vidas.pop();
            vida.eliminar();
        }
        if (this.vidas.length <= 0) {
            mG.perder();
        }
    }
}

/*  
    /// MANAGER DE TEMPORIZADOR ///
    Se encarga de:
        - Crear el cronómetro
        - Lo ubica en el DOM
        - Va restando tiempo cada segundo
*/
class ManagerTemporizador{
    
    constructor(){
        this.temporizadorElement = document.getElementById('tiempo');
    }

    inicializarTiempo(num){
        this.tiempoRestante = num;
    }
    
    iniciarTemporizador() {
        this.minutos= Math.floor(this.tiempoRestante / 60);
        this.segundos = this.tiempoRestante - this.minutos * 60;
        
        if (this.minutos<10) {
            this.minutos = '0' + this.minutos;
        }
        if (this.segundos<10) {
            this.segundos = '0' + this.segundos;
        }

        this.temporizadorElement.textContent = `${this.minutos}:${this.segundos}`;

        // Actualizar el temporizador cada segundo
        this.intervalo = setInterval(() => {
            this.tiempoRestante--; 
            this.minutos= Math.floor(this.tiempoRestante / 60);
            this.segundos = this.tiempoRestante - this.minutos * 60;
            
            if (this.minutos<10) {
                this.minutos = '0' + this.minutos;
            }
            if (this.segundos<10) {
                this.segundos = '0' + this.segundos;
            }
            
            this.temporizadorElement.textContent = `${ this.minutos}:${this.segundos}`;

            // Verificar si el tiempo llegó a cero
            if (this.tiempoRestante <= 0) {
                mG.perder();
            }
        }, 1000);
    }

    detenerTemporizador() {
        clearInterval(this.intervalo); // Detener el intervalo
    }

    anadirTiempo(tiempo){
        this.tiempoRestante += tiempo;
        this.temporizadorElement.textContent = this.tiempoRestante;
    }
}

/*  
    /// MANAGER DE JUEGO ///
    Se encarga de:
        - Empezar la partida
        - Evento Ganar
        - Evento Perder
        - 
*/
class ManagerGame{

    constructor(){
        this.vGanar = document.getElementById("ventanaGanar");
        this.vPerder = document.getElementById("ventanaPerder");
        this.vJugar = document.getElementById("ventanaEmpezar");
        this.botones = document.getElementsByClassName("botonJugar");
        
        this.botonEmpezar = document.getElementById("botonEmpezar");
        this.inputVidas = document.getElementById("inputVidas");
        this.inputCartas = document.getElementById("inputCartas");
        this.inputTiempo = document.getElementById("inputTiempo")


        for (let i = 0; i < this.botones.length; i++) {
            this.botones[i].addEventListener("click", () => this.prepararJuego());
        }

        this.botonEmpezar.addEventListener("click", () => this.empezarJuego());
        
    }

    ganar(){
        console.log("HAS GANADO!")
        mT.detenerTemporizador();
        this.vGanar.classList.toggle('abrir')
    }

    perder(){
        console.log("HAS PERDIDO!")
        mT.detenerTemporizador();
        mC.listaCartas.forEach(carta => carta.bloquear())
        this.vPerder.classList.toggle('abrir')
    }

    prepararJuego(){
        this.vGanar.classList.toggle('abrir',false);
        this.vPerder.classList.toggle('abrir',false);
        this.vJugar.classList.toggle('abrir',true);


        
    }

    empezarJuego(){
        mC.crearCartas(parseInt(this.inputCartas.value));
        mV.inicializarVidas(parseInt(this.inputVidas.value));
        mT.inicializarTiempo(parseInt(this.inputTiempo.value));
        this.vJugar.classList.toggle('abrir',false);
    }

}

const mC = new ManagerCartas();
const mV = new ManagerVidas();
const mT = new ManagerTemporizador();
const mG = new ManagerGame();

mG.prepararJuego();






