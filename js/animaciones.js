/* =====================================================================
   XPFit · animaciones
   Este archivo hace tres cosas:
     1. Vigila cuándo cada elemento entra en pantalla (IntersectionObserver)
     2. Les pone la clase "visible", y el CSS hace el movimiento
     3. Escribe el título grande letra a letra (máquina de escribir)
   ===================================================================== */

// "DOMContentLoaded" = la página ya está cargada y podemos buscar elementos.
document.addEventListener("DOMContentLoaded", function () {

  // ¿La persona ha pedido menos movimiento en su sistema? (true / false)
  var menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* ---------------------------------------------------------------
     PASO 1 · Crear el "vigilante"
     IntersectionObserver avisa cada vez que un elemento entra o sale
     de la pantalla. Cuando entra, le añadimos la clase "visible".
     --------------------------------------------------------------- */
  var vigilante = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {                 // ¿está en pantalla ahora?
        entrada.target.classList.add("visible");    // activa la animación del CSS
        vigilante.unobserve(entrada.target);        // ya no hace falta vigilarlo: solo anima una vez
      }
    });
  }, {
    threshold: 0.15   // se activa cuando se ve el 15 % del elemento
  });


  /* ---------------------------------------------------------------
     PASO 2 · Títulos de sección (H2): efecto skewIn
     En el HTML llevan el atributo data-skew. Aquí solo los vigilamos.
     --------------------------------------------------------------- */
  document.querySelectorAll("[data-skew]").forEach(function (titulo) {
    vigilante.observe(titulo);
  });


  /* ---------------------------------------------------------------
     PASO 3 · Otros bloques: fadeInUp con retraso escalonado
     Los elementos con data-fade suben y aparecen. Para que no salgan
     todos a la vez, el 1.º espera 0 ms, el 2.º 120 ms, el 3.º 240 ms...
     (contando solo entre hermanos, es decir, dentro del mismo padre).
     --------------------------------------------------------------- */
  document.querySelectorAll("[data-fade]").forEach(function (bloque) {

    // Hermanos con data-fade dentro del mismo padre
    var hermanos = Array.prototype.filter.call(
      bloque.parentElement.children,
      function (el) { return el.hasAttribute("data-fade"); }
    );
    var posicion = hermanos.indexOf(bloque);        // 0, 1, 2...

    bloque.style.transitionDelay = (posicion * 120) + "ms";   // el retraso escalonado
    vigilante.observe(bloque);
  });


  /* ---------------------------------------------------------------
     PASO 4 · Máquina de escribir
     El elemento lleva data-maquina y el texto final dentro.
     Lo vaciamos, ponemos un cursor "|" y vamos añadiendo letras.
     --------------------------------------------------------------- */
  document.querySelectorAll("[data-maquina]").forEach(function (titulo) {

    var textoFinal = titulo.textContent.trim();     // guardamos el texto original

    // Si prefiere menos movimiento: dejamos el texto completo, sin teclear.
    if (menosMovimiento) { return; }

    titulo.textContent = "";                        // vaciamos el título

    var letras = document.createElement("span");    // aquí irán las letras
    var cursor = document.createElement("span");    // y aquí el cursor
    cursor.className = "cursor";                    // el CSS lo hace parpadear
    cursor.textContent = "|";
    titulo.appendChild(letras);
    titulo.appendChild(cursor);
    titulo.setAttribute("aria-label", textoFinal);  // los lectores de pantalla leen el texto entero

    function teclear() {
      var i = 0;
      var reloj = setInterval(function () {
        i = i + 1;
        letras.textContent = textoFinal.slice(0, i);   // las primeras i letras
        if (i >= textoFinal.length) {
          clearInterval(reloj);                        // terminado: paramos el reloj
        }
      }, 110);                                         // una letra cada 110 ms
    }

    // Empezamos a teclear solo cuando el título entra en pantalla.
    var vigilanteMaquina = new IntersectionObserver(function (entradas) {
      if (entradas[0].isIntersecting) {
        teclear();
        vigilanteMaquina.disconnect();                 // solo una vez
      }
    }, { threshold: 0.5 });
    vigilanteMaquina.observe(titulo);
  });


  /* ---------------------------------------------------------------
     PASO 5 · Carrusel del equipo
     Qué hace: marca UNA ficha como "activa" (el CSS la amplía) y la
     centra en pantalla. Se cambia de ficha de 4 formas:
       a) botones anterior / siguiente
       b) clic en una ficha
       c) flechas del teclado (con el carrusel enfocado)
       d) deslizando con el dedo o el ratón (la ficha más cercana
          al centro pasa a ser la activa)
     --------------------------------------------------------------- */
  var pista = document.querySelector(".carrusel-pista");

  if (pista) {   // solo si existe el carrusel en esta página

    // Lista con todas las fichas, y un número con la que está activa.
    var cartas = Array.prototype.slice.call(pista.querySelectorAll(".entrenador"));
    var actual = 0;

    // 5.1 Marca la ficha número i como activa (quita la marca a las demás).
    function activar(i) {
      // Math.max / Math.min impiden salirnos de la lista (0 ... última).
      actual = Math.max(0, Math.min(cartas.length - 1, i));
      cartas.forEach(function (carta, n) {
        carta.classList.toggle("activa", n === actual);   // true = pone la clase, false = la quita
      });
    }

    // 5.2 Desliza la pista para que la ficha i quede centrada.
    function centrar(i) {
      var carta = cartas[i];
      var izquierda = carta.offsetLeft - (pista.clientWidth - carta.offsetWidth) / 2;
      pista.scrollTo({ left: izquierda, behavior: menosMovimiento ? "auto" : "smooth" });
    }

    // 5.3 Hace las dos cosas: activar y centrar.
    function ir(i) {
      activar(i);
      centrar(actual);
    }

    // 5.4 Botones anterior (-1) y siguiente (+1). El valor está en data-dir.
    document.querySelectorAll(".carrusel-btn").forEach(function (boton) {
      boton.addEventListener("click", function () {
        ir(actual + Number(boton.getAttribute("data-dir")));
      });
    });

    // 5.5 Clic en una ficha: la seleccionamos
    // (salvo si el clic fue en el enlace "Ver ficha", que debe navegar).
    cartas.forEach(function (carta, n) {
      carta.addEventListener("click", function (evento) {
        if (evento.target.closest("a")) { return; }
        ir(n);
      });
    });

    // 5.6 Flechas izquierda / derecha del teclado.
    pista.addEventListener("keydown", function (evento) {
      if (evento.key === "ArrowRight") { evento.preventDefault(); ir(actual + 1); }
      if (evento.key === "ArrowLeft")  { evento.preventDefault(); ir(actual - 1); }
    });

    // 5.7 Al deslizar a mano: la ficha más cercana al centro se activa.
    // requestAnimationFrame evita hacer cálculos de más mientras se desliza.
    var esperando = false;
    pista.addEventListener("scroll", function () {
      if (esperando) { return; }
      esperando = true;
      window.requestAnimationFrame(function () {
        esperando = false;
        var centro = pista.scrollLeft + pista.clientWidth / 2;   // punto central visible
        var mejor = 0;
        var distanciaMejor = Infinity;
        cartas.forEach(function (carta, n) {
          var centroCarta = carta.offsetLeft + carta.offsetWidth / 2;
          var distancia = Math.abs(centro - centroCarta);
          if (distancia < distanciaMejor) { distanciaMejor = distancia; mejor = n; }
        });
        if (mejor !== actual) { activar(mejor); }   // solo activa, sin volver a centrar
      });
    });

    // 5.8 Estado inicial: empezamos por la ficha del CENTRO de la lista.
    // Math.floor(3 / 2) = 1, es decir, la segunda ficha (la del medio).
    // Funciona igual si algún día hay 5 fichas (sería la tercera).
    var inicio = Math.floor(cartas.length / 2);
    activar(inicio);

    // Y desplazamos la pista hasta ella AL INSTANTE (sin animación), para que
    // al cargar o actualizar la página ya aparezca centrada.
    var izquierdaInicio = cartas[inicio].offsetLeft - (pista.clientWidth - cartas[inicio].offsetWidth) / 2;
    pista.scrollTo({ left: izquierdaInicio, behavior: "auto" });
  }


  /* ---------------------------------------------------------------
     PASO 6 · Avatar que evoluciona con los XP
     Al mover el deslizador, calculamos en qué etapa estás y cambiamos:
     el número de XP, la barra, el nombre de la etapa, el aspecto del
     avatar (clase etapa-N) y cuál de las 4 tarjetas se resalta.
     --------------------------------------------------------------- */
  var control = document.getElementById("xp-control");

  if (control) {   // solo si existe la sección Avatar

    // Las etapas, de menor a mayor. "desde" = XP necesarios (valores de ejemplo).
    var etapas = [
      { nombre: "Novato",   desde: 0 },
      { nombre: "Aprendiz", desde: 150 },
      { nombre: "Guerrero", desde: 400 },
      { nombre: "Leyenda",  desde: 800 }
    ];
    var xpMaximo = Number(control.max);                         // 1000

    var visor    = document.getElementById("avatar-visor");     // contiene el avatar
    var nombreEl = document.getElementById("avatar-etapa");
    var nivelEl  = document.getElementById("avatar-nivel");
    var valorEl  = document.getElementById("xp-valor");
    var rellenoEl = document.getElementById("xp-relleno");
    var textoEl  = document.getElementById("xp-texto");
    var tarjetas = document.querySelectorAll(".etapas li");

    // 6.1 Se ejecuta cada vez que cambia el deslizador.
    function actualizarAvatar() {
      var xp = Number(control.value);

      // 6.2 ¿En qué etapa estamos? Recorremos la lista y nos quedamos con
      // la última cuyo "desde" ya hemos alcanzado.
      var indice = 0;
      etapas.forEach(function (etapa, n) {
        if (xp >= etapa.desde) { indice = n; }
      });

      // 6.3 Textos y barra.
      valorEl.textContent = xp;
      nombreEl.textContent = etapas[indice].nombre;
      nivelEl.textContent = "Nivel " + (Math.floor(xp / 100) + 1);   // 1 nivel cada 100 XP (ejemplo)
      rellenoEl.style.width = (xp / xpMaximo * 100) + "%";

      // 6.4 Mensaje: cuánto falta para la siguiente etapa.
      var siguiente = etapas[indice + 1];
      if (siguiente) {
        textoEl.textContent = "Te faltan " + (siguiente.desde - xp) + " XP para ser " + siguiente.nombre + ".";
      } else {
        textoEl.textContent = "¡Etapa máxima! Eres una Leyenda.";
      }

      // 6.5 Cambiamos la clase del avatar (etapa-1, etapa-2...) y el CSS hace el resto.
      visor.className = "avatar-visor etapa-" + (indice + 1);

      // 6.6 Resaltamos la tarjeta de la etapa actual.
      tarjetas.forEach(function (tarjeta, n) {
        tarjeta.classList.toggle("activa", n === indice);
      });
    }

    control.addEventListener("input", actualizarAvatar);   // "input" = cada vez que mueves el deslizador
    actualizarAvatar();                                    // y una vez al cargar la página
  }


  /* ---------------------------------------------------------------
     PASO 7 · Parallax del hero
     Calculamos "p" = cuánto has avanzado por la portada (0 = arriba,
     1 = final) y se lo pasamos al CSS como variable (--p). El CSS se
     encarga de mover las capas y de hacer aparecer el texto.
     --------------------------------------------------------------- */
  var hero = document.querySelector(".hero");
  var heroPista = document.querySelector(".hero-pista");
  var heroEscena = document.querySelector(".hero-escena");

  if (hero && heroPista && heroEscena) {

    if (menosMovimiento) {
      // Si la persona pide menos movimiento: portada normal, sin parallax.
      hero.classList.add("sin-parallax");
    } else {

      // 7.1 Calcula p y lo guarda en --p.
      function actualizarHero() {
        var caja = heroPista.getBoundingClientRect();           // posición de la portada en pantalla
        var recorrido = heroPista.offsetHeight - window.innerHeight;   // scroll total disponible
        var p = -caja.top / recorrido;                          // cuánto hemos bajado (0 a 1)
        p = Math.max(0, Math.min(1, p));                        // lo limitamos entre 0 y 1
        heroEscena.style.setProperty("--p", p.toFixed(4));      // se lo damos al CSS

        // Cuando el texto ya se ve, permitimos pulsar el botón.
        hero.classList.toggle("contenido-visible", p > 0.15);
      }

      // 7.2 Escuchamos el scroll (y el cambio de tamaño). requestAnimationFrame
      // hace el cálculo una sola vez por fotograma, para que vaya fluido.
      var heroEsperando = false;
      function alScroll() {
        if (heroEsperando) { return; }
        heroEsperando = true;
        window.requestAnimationFrame(function () {
          heroEsperando = false;
          actualizarHero();
        });
      }
      window.addEventListener("scroll", alScroll, { passive: true });   // passive = no frena el scroll
      window.addEventListener("resize", alScroll);

      actualizarHero();   // y una vez al cargar (por si la página ya está algo bajada)
    }
  }

});
