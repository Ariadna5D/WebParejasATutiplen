// Devuelve una parte de la carta
function getCardSkin(num){
    let image = '';
    
    switch (num){
        case 0: image = 'images/c_sunmoon.jpg';
            break;
        case 1: image = 'images/c_front.jpg';
            break;
        default: image = 'images/c_back.jpg';
            break;
    }

    return image;
}

// Devuelve un icono en funcion al numero que le pongas
function getIcon(num){
    let image = '';
    switch (num){
        case 0: image = null;
            break;
        case 1: image = 'images/i_runa1.png';
            break;
        case 2: image = 'images/i_runa3.png';
            break;
        case 3: image = 'images/i_runa5.png';
            break;
        case 4: image = 'images/i_runa7.png';
            break;
        case 5: image = 'images/i_runa2.png';
            break;
        case 6: image = 'images/i_runa4.png';
            break;
        default: image = 'images/i_runa6.png';
            break;
    }

    return image;
}

function playSound(num){
    let sound = '';
    switch (num){
        case 0: sound = new Audio("sounds/s_crearCarta.ogg");
            break;
        case 1: sound = new Audio("sounds/s_emparejado.wav");
            break;
        case 2: sound = new Audio("sounds/s_noEmparejado.wav");
            break;
        case 3: sound = new Audio("sounds/s_hoverCarta.wav");
            break;
        case 4: sound = new Audio("sounds/s_voltearCarta.wav");
            break;
        case 5: sound = new Audio("sounds/s_perderVida.wav");
            break;
        case 6: sound = new Audio("sounds/s_perderVida.wav");
            break;
        default: sound = new Audio("sounds/s_crearCarta.ogg");
            break;
    }

    sound.play();
}

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
    constructor(id1,id2) {
        this.objetoCarta = document.createElement('div');
        this.objetoCarta.className = 'carta';
        
        this.cartaDorso = document.createElement('img');
        this.cartaDorso.src = getCardSkin(0);
        this.cartaDorso.classList.add('dorso');

        this.cartaCara = document.createElement('div');
        this.cartaCara.classList.add('cara');

        if(id1 != 0){
            this.img1 = document.createElement('img');
            this.img1.src = getIcon(id1);
            this.cartaCara.appendChild(this.img1);
        }

        if(id2 != 0){
            this.img2 = document.createElement('img');
            this.img2.src = getIcon(id2);
            this.cartaCara.appendChild(this.img2);
        }
        

        // Añadir ambas imágenes al contenedor de la carta
        this.objetoCarta.appendChild(this.cartaDorso);
        this.objetoCarta.appendChild(this.cartaCara);

        this.valorCarta = "" + id1 + id2;
        //this.objetoCarta.textContent = contenido;
        this.seMuestra = false;
        this.estaBloqueada = false;
        this.asignarListeners();
        this.mostrarCarta(this.seMuestra);
        
    }

    asignarListeners() {
        this.objetoCarta.addEventListener("click", () => mC.seleccionarCarta(this));
        this.objetoCarta.addEventListener("mouseenter", () => {
            playSound(3);
        });
    }

    // MOSTRAR COMO SELECCIONADA
    seleccionar() {
        //console.log(`Carta ${this.contenido} clickeada`);
        this.seMuestra = !this.seMuestra;
        this.objetoCarta.classList.toggle('seleccionada', this.seMuestra);
        this.mostrarCarta(this.seMuestra);
        playSound(0);
    }

    // DESBLOQUEAR LA CARTA (AHORA ES CLICKABLE)
    desbloquear(){
        this.estaBloqueada = false;
        this.objetoCarta.classList.remove('bloqueada');
    }

    // BLOQUEAR LA CARTA (AHORA NO ES CLICKABLE)
    bloquear() {
        this.estaBloqueada = true;
        this.objetoCarta.classList.toggle('bloqueada', this.estaBloqueada);
    }

    // FUNCION PARECIDA AL COMPARE TO DE JAVA
    esIgualACarta(cartab) {
        console.log("Esta Carta es: " + this.valorCarta + " Esta otra es: " + cartab.valorCarta);
        return this.valorCarta === cartab.valorCarta;
    }

    // MUESTRA LA CARTA
    mostrarCarta(mostrar) {
        this.objetoCarta.classList.toggle('mostrar', mostrar);
    }

    // ANIMACION DE FALLO
    feedbackFallo(){
        this.objetoCarta.classList.toggle('fallo',true)
        setInterval(() => {
            this.objetoCarta.classList.toggle('fallo',false)
        }, 200);
        
    }

    // ANIMACION DE APARECER
    feedbackAparecer(){
        this.objetoCarta.classList.toggle('aparecer',true)
        setInterval(() => {
            this.objetoCarta.classList.toggle('aparecer',false)
        }, 1000);
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
        this.elemento.src = 'images/corazon2.png';
        this.elemento.classList.add('vida');
        
    }

    // Hace su animacion y se elimina del dom
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
        //Carta A y carta B son las cartas que se seleccionan para hacer pareja
        this.cartaA = null;
        this.cartaB = null;

        // Tiempo que se añade si se completa una pareja
        this.tiempoPareja = 0;
        // Puntos que se añaden al completar la pareja
        this.puntosPareja = 100;

        //Las cartas totales
        this.listaCartas = [];
        this.contenedor = document.getElementById('contenedorCartas');
    }
    
    // Función para crear cartas
    crearCartas(num) {
        this.cartaA = null;
        this.cartaB = null;
        this.contenedor.innerHTML = '';
        const cantidad = num;
        this.listaCartas = [];
        let id1 = 0;
        let id2 = 1;
        const maxIcons = 6;
        
        //const fragmento = document.createDocumentFragment();

        // Crear parejas de cartas
        for (let i = 1; i <= cantidad; i++) {
            if(id1 > maxIcons){
                id1=0;
                id2=1;
            }
            if(id2 > maxIcons){
                id2 = 1;
                id1 ++;
            }
            const carta1 = new Carta(id2,id1);
            const carta2 = new Carta(id2,id1);
            id2++;

            this.listaCartas.push(carta1);
            this.listaCartas.push(carta2);
        }

        this.barajarCartas(this.listaCartas);

        //Crear las cartas con cierto retraso para hacer la animacion en cascada
        for (let i = 0; i < this.listaCartas.length; i++) {
            setTimeout(() => {
                let espacioCarta = document.createElement('div');
                espacioCarta.classList.add("espacioCarta")
                espacioCarta.appendChild(this.listaCartas[i].objetoCarta);
                this.contenedor.appendChild(espacioCarta)
                this.listaCartas[i].bloquear();
                this.listaCartas[i].feedbackAparecer();
            
            }, i * 100); 
        }

        setTimeout(() => {
            this.listaCartas.forEach(carta => {
                carta.mostrarCarta(true);
            });
        }, this.listaCartas.length * 100);

        setTimeout(() => {
            this.listaCartas.forEach(carta => {
                carta.mostrarCarta(false);
                carta.desbloquear();
            });
            mT.iniciarTemporizador();
        }, this.listaCartas.length * 100 + 3500);
        
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
                mG.anadirPuntos(this.puntosPareja);
                mG.acierto();
                
            }
            else{
                console.log("¡NO SON IGUALES!");
                setTimeout(() => {
                    this.cartaA.seleccionar();
                    this.cartaB.seleccionar();
                    this.cartaA.feedbackFallo();
                    this.cartaB.feedbackFallo();
                    this.cartaA = null;
                    this.cartaB = null;
                    mG.fallo();
                    }, 1500);
            }
            
        }
        playSound(4);
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
    
    // Crea un Array de vidas
    inicializarVidas(num) {
        
        this.vidas = [];
        this.contenedorVidas.innerHTML = '';
        const cantidad = num;

        for (let i = 0; i < cantidad; i++) {
            setTimeout(() => {
                let vida = new Vida();
                this.vidas.push(vida);
                this.contenedorVidas.appendChild(vida.elemento);
                
            }, i * 150); 
        }        
    }

    // Destruye la última vida del array
    perderVida() {
        if (this.vidas.length > 0) {
            let vida = this.vidas.pop();
            vida.eliminar();
        }
        if (this.vidas.length <= 0) {
            mG.perder();
        }
    }

    // Añade tantas vidas como se desee
    anadirVidas(num) {
        for (let i = 0; i < num; i++) {
            let vida = new Vida();
            this.vidas.push(vida);
            this.contenedorVidas.appendChild(vida.elemento);
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

    // iNICIALIZA/PREPARA EL TEMPORIZADOR
    inicializarTiempo(num){
        this.tiempoRestante = num;
        this.actualizarTemporizador(this.tiempoRestante)
    }
    
    // INICIA EL TEMPORIZADOR
    iniciarTemporizador() {
        
        // Solo si está el juego activo
        if(mG.estaElJuegoActivo === true){
            // Actualizar el temporizador cada segundo
            this.intervalo = setInterval(() => {
                this.tiempoRestante--; 
                this.actualizarTemporizador(this.tiempoRestante)

                // Verificar si el tiempo llegó a cero
                if (this.tiempoRestante <= 0 && mG.estaElJuegoActivo === true) {
                    this.tiempoRestante = 0;
                    mG.perder();
                }
            }, 1000);
        }
    }

    // TRASLADAR A UI
    actualizarTemporizador(tiempo){
        
        // En esencia esto es para cambiar el formato y que se vea adecuadamente en la UI
        let minutos = Math.floor(tiempo / 60);
        let segundos = tiempo - minutos * 60;

        if (minutos<10) {
            minutos = '0' + minutos;
        }
        if (segundos<10) {
            segundos = '0' + segundos;
        }
        if(tiempo <= 0){
            mG.perder();
        }

        this.temporizadorElement.textContent = `${ minutos}:${segundos}`;
    }

    // DETIENE EL INTERVALO
    detenerTemporizador() {
        clearInterval(this.intervalo); // Detener el intervalo
        
    }

    // AÑADE TIEMPO AL TEMPORIZADOR
    anadirTiempo(tiempo){
        this.tiempoRestante += tiempo;
        this.actualizarTemporizador(this.tiempoRestante)
    }
}

/*  
    /// MANAGER DE JUEGO ///
    Se encarga de:
        - Empezar la partida
        - Evento Ganar
        - Evento Perder
        - Llevar la puntuación y estadísticas
*/
class ManagerGame{

    constructor(){
        //VENTANAS
        this.vGanar = document.getElementById("ventanaGanar");
        this.vPerder = document.getElementById("ventanaPerder");
        this.vJugar = document.getElementById("ventanaEmpezar");
        this.botones = document.getElementsByClassName("botonJugar");
        
        for (let i = 0; i < this.botones.length; i++) {
            this.botones[i].addEventListener("click", () => this.prepararJuego());
        }

        // INPUT DE AJUSTES
        this.inputVidas = document.getElementById("inputVidas");
        this.inputCartas = document.getElementById("inputCartas");
        this.inputTiempo = document.getElementById("inputTiempo")
        this.botonEmpezar = document.getElementById("botonEmpezar");
        this.botonEmpezarPredefinida = document.getElementById("botonEmpezarPredefinida");
        this.checkBoxAbrurPestana = document.getElementById("abrirPestana");
        this.abrirPestanaAlFinalizar = false;

        this.alertaVidas = document.getElementById("alertaVidas");
        this.alertaCartas = document.getElementById("alertaCartas");
        this.alertaTiempo = document.getElementById("alertaTiempo");

        this.botonEmpezar.addEventListener("click", () => this.empezarJuego());
        this.botonEmpezarPredefinida.addEventListener("click", () => this.empezarJuegoPorDefecto());
        document.getElementById("botonReinicio").addEventListener("click", () => this.reiniciar());

        // ELEMENTOS UI
        this.panelPuntuacion = document.getElementById("puntuacion");
        this.panelDescubiertas = document.getElementById("descubiertas");
        this.panelAciertos = document.getElementById("aciertos");

        // VENTANAS PUNTUACION FINAL
        this.panelesAciertosFinal = document.getElementsByClassName("scoreAciertosFinal")
        this.panelesTiempoFinal = document.getElementsByClassName("scoreTiempoFinal");
        this.panelesPuntuacionFinal = document.getElementsByClassName("scorePuntuacionFinal");

        let estaElJuegoActivo = false;

    }

    // Este método se invoca al ganar la partida, te manda a la pantalla de victoria
    ganar(){
        console.log("HAS GANADO!");
        this.vGanar.classList.toggle('abrir');
        this.cerrarPartida();

        if(this.abrirPestanaAlFinalizar){
            window.open("victoria.html", "_blank");
        }
    }

    // Este método se invoca al perder la partida, te manda a la pantalla de derrota
    perder(){
        console.log("HAS PERDIDO!");
        mC.listaCartas.forEach(carta => carta.bloquear());
        this.vPerder.classList.toggle('abrir');

        this.cerrarPartida();
        
        if(this.abrirPestanaAlFinalizar){
            window.open("derrota.html", "_blank");
        }
        
    }
    
    // Este metodo reinicia la partida inmediatamente
    reiniciar(){
        this.cerrarPartida();
        this.prepararJuego();
    }

    // Cierra la partida, para evitar reptir código, detiene el tiempo y actualiza estadísticas
    cerrarPartida(){

        mT.detenerTemporizador();
        this.estaElJuegoActivo = false;
        this.actualizarPantallaFinPartida();
        localStorage.setItem("puntuacion", this.puntuacion);
        localStorage.setItem("tiempo", mT.temporizadorElement.textContent);
        localStorage.setItem("aciertos", this.panelAciertos.textContent);
        localStorage.setItem("descubiertas", this.panelDescubiertas.textContent);
        
    }

    // Este método prepara el juego, es decir, pone los valores a 0, y abre el panel de ajustes de partida
    prepararJuego(){
        this.vGanar.classList.toggle('abrir',false);
        this.vPerder.classList.toggle('abrir',false);
        this.vJugar.classList.toggle('abrir',true);
        this.fallos = 0;
        this.aciertos = 1;
        this.parejasActuales = 0;
        this.puntuacion = 0;

    }

    // Está conectado activamente con el anterior método, inicia una partida PERSONALIZADA con los valores de ajustes
    empezarJuego(){
        this.sonValoresValidos = true;

        // Que el numero no sea 0 o negativo o esté vacío
        if(parseInt(this.inputVidas.value) <= 0 || !this.inputVidas.value){
            this.alertaVidas.textContent = "No es un numero Válido!"
            this.sonValoresValidos=false;
        }
        else{
            this.alertaVidas.textContent = " "
        }
        if(parseInt(this.inputCartas.value) <= 0 || !this.inputCartas.value){
            this.alertaCartas.textContent = "No es un numero Válido!"
            this.sonValoresValidos=false;
        }
        else{
            this.alertaCartas.textContent = " "
        }
        if(parseInt(this.inputTiempo.value) <= 0 || !this.inputTiempo.value){
            this.alertaTiempo.textContent = "No es un numero Válido!"
            this.sonValoresValidos=false;
        }
        else{
            this.alertaTiempo.textContent = " "
        }

        if(this.sonValoresValidos == true){
            mC.crearCartas(parseInt(this.inputCartas.value));
            mV.inicializarVidas(parseInt(this.inputVidas.value));
            mT.inicializarTiempo(parseInt(this.inputTiempo.value));
            this.parejasTotales = parseInt(this.inputCartas.value);

            this.vJugar.classList.toggle('abrir',false);
            this.actualizar();
            this.estaElJuegoActivo= true;
            this.abrirPestanaAlFinalizar = this.checkBoxAbrurPestana.checked;
        }
    }

    // Es similar a "empezarJuego" pero este con unos valores predefinidos
    empezarJuegoPorDefecto(){
        mC.crearCartas(6);
        mV.inicializarVidas(6);
        mT.inicializarTiempo(120);
        this.parejasTotales = 6;

        this.vJugar.classList.toggle('abrir',false);
        this.actualizar();
        this.estaElJuegoActivo= true;
        this.abrirPestanaAlFinalizar = false;
    }

    // Método para aumentar la puntuacion
    anadirPuntos(cantidad){
        this.puntuacion += cantidad;
    }

    // Método para llevar seguimiento de los aciertos
    acierto(){
        playSound(1);
        this.parejasActuales ++;
        this.actualizar();
        if(this.parejasActuales >= this.parejasTotales){
            this.ganar();
        }
        this.aciertos++;
    }

    // Método para llevar seguimiento de los fallos
    fallo(){
        playSound(2);
        this.fallos ++;
        this.actualizar();
        mV.perderVida();
    }

    // Actualiza las estadísticas en pantalla
    actualizar(){
        this.panelPuntuacion.textContent = mG.puntuacion;
        this.panelDescubiertas.textContent = mG.parejasActuales + "/" + mG.parejasTotales;
        
        if(this.aciertos === 0 && this.fallos === 0){
            this.panelAciertos.textContent = "100%";
        }
        else{
            this.panelAciertos.textContent = Math.round(this.aciertos / (this.fallos + this.aciertos) * 100) + "%";
        }
    }

    // Actualiza las estadisticas a local storage (para que no se pierda en otra pestaña) y las ventanas emergentes
    actualizarPantallaFinPartida(){
        for (let i = 0; i < this.panelesAciertosFinal.length; i++) {
            this.panelesAciertosFinal[i].textContent = this.panelAciertos.textContent;
        }

        for (let i = 0; i < this.panelesPuntuacionFinal.length; i++) {
            this.panelesPuntuacionFinal[i].textContent = this.puntuacion;
        }

        for (let i = 0; i < this.panelesTiempoFinal.length; i++) {
            this.panelesTiempoFinal[i].textContent = mT.temporizadorElement.textContent;
        }
    }

}


const mC = new ManagerCartas();
const mV = new ManagerVidas();
const mT = new ManagerTemporizador();
const mG = new ManagerGame();
mG.prepararJuego();






