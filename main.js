//Contenido a mostrar al usuario y para que escoja
function mostrarTema(idTema) {
    // Obtener todos los temas
    var temas = document.querySelectorAll('.contenido-tema');
    
    // Eliminar la clase 'activo' de todos los temas
    for (var i = 0; i < temas.length; i++) {
        temas[i].classList.remove('activo');
    }

    // Añadir la clase 'activo' al tema seleccionado
    var temaSeleccionado = document.getElementById(idTema);
    if (temaSeleccionado) {
        temaSeleccionado.classList.add('activo');
    }

    // Quitar la clase 'active' de todos los items
    var items = document.querySelectorAll('.items');
    for (var i = 0; i < items.length; i++) {
    items[i].classList.remove('active');
    }

    // Agregar la clase 'active' al item seleccionado
    var opcionActiva = document.getElementById('option_' + idTema);
    if (opcionActiva) {
    opcionActiva.classList.add('active');
    }
}



//Sección de Medidas de Tendencia Central
function calcularTendenciaCentral() {
    // Obtener los datos ingresados por el usuario y convertirlos en un array de números
    var datos = document.getElementById("datos").value.split(',').map(Number);

    // Calcular media, mediana y moda
    var media = calcularMedia(datos);
    var mediana = calcularMediana(datos);
    // ... (aquí podrías añadir otros cálculos como la moda)

    // Mostrar los resultados
    document.getElementById("resultado").innerHTML = 
        "Media: " + media + "<br>" +
        "Mediana: " + mediana + "<br>";
}

function calcularMedia(datos) {
    var total = 0;
    for(var i = 0; i < datos.length; i++) {
        total += datos[i];
    }
    return total / datos.length;
}

function calcularMediana(datos) {
    datos.sort(function(a, b) {
        return a - b;
    });

    var mitad = Math.floor(datos.length / 2);

    if(datos.length % 2)
        return datos[mitad];
    else
        return (datos[mitad - 1] + datos[mitad]) / 2.0;
}

/* Sección de Distribución de Bernoulli */
function calcularBernoulli() {
    // Obtener el valor de p desde el input
    var p = document.getElementById('prob').value;

    // Convertir a número flotante
    p = parseFloat(p);

    // Validar la entrada
    if(isNaN(p) || p <= 0 || p >= 1) {
        alert('Por favor, introduce un número válido para "p" entre 0 y 1 (sin incluir 0 y 1).');
        return;
    }

    // Calcular la probabilidad de fracaso (q)
    var q = 1 - p;

    // Crear el mensaje con los resultados
    var mensaje = 'Probabilidad de éxito (p): ' + p + '<br>' + 'Probabilidad de fracaso (q): ' + q;

    // Mostrar el resultado
    document.getElementById('resultadoBernoulli').innerHTML = mensaje;
}


/* Sección de Distribución de Poisson */

function calcularPoisson() {
    // Obtener los valores de λ y k
    var rate = document.getElementById('rate').value;
    var numEvents = document.getElementById('numEvents').value;

    // Convertir a números
    rate = parseFloat(rate);
    numEvents = parseInt(numEvents);

    // Validar las entradas
    if(isNaN(rate) || isNaN(numEvents) || rate < 0 || numEvents < 0) {
        alert('Por favor, introduce valores válidos. La tasa (λ) y el número de eventos (k) deben ser números no negativos.');
        return;
    }

    // Calcular factorial de k
    var factorial = 1;
    for (var i = 1; i <= numEvents; i++) {
        factorial *= i;
    }

    // Calcular la probabilidad usando la fórmula de la distribución de Poisson
    var probabilidad = Math.pow(rate, numEvents) * Math.exp(-rate) / factorial;

    // Mostrar el resultado
    document.getElementById('resultadoPoisson').innerHTML = 'Probabilidad = ' + probabilidad;
}


/* Sección de Distribución Binomial */

function calcularBinomial() {
    // Obtener valores
    var trials = document.getElementById('trials').value;
    var successProbability = document.getElementById('successProbability').value;
    var successNumber = document.getElementById('successNumber').value;

    // Convertir a números
    trials = parseInt(trials);
    successProbability = parseFloat(successProbability);
    successNumber = parseInt(successNumber);

    // Validaciones básicas
    if(isNaN(trials) || trials < 0) {
        alert('Por favor, introduce un número válido de ensayos (mayor o igual a 0).');
        return;
    }

    if(isNaN(successProbability) || successProbability < 0 || successProbability > 1) {
        alert('Por favor, introduce una probabilidad válida (entre 0 y 1).');
        return;
    }
    
    if(isNaN(successNumber) || successNumber < 0) {
        alert('Por favor, introduce un número válido de éxitos (mayor o igual a 0).');
        return;
    }

    if(successNumber > trials) {
        alert('El número de éxitos no puede ser mayor que el número de ensayos.');
        return;
    }

    // Calcular factorial
    function factorial(num) {
        var result = 1;
        for(var i = num; i > 1; i--) {
            result *= i;
        }
        return result;
    }

    // Calcular combinación
    var combination = factorial(trials) / (factorial(successNumber) * factorial(trials - successNumber));

    // Calcular la probabilidad binomial
    var binomialProbability = combination * Math.pow(successProbability, successNumber) * Math.pow(1 - successProbability, trials - successNumber);

    // Mostrar el resultado
    document.getElementById('resultadoBinomial').innerHTML = 'Probabilidad = ' + binomialProbability;
}

/* Distribución Normal */

function calcularNormal() {
    // Obtener valores
    var mean = document.getElementById('mean').value;
    var stddev = document.getElementById('stddev').value;
    var xValue = document.getElementById('xValue').value;

    // Convertir a números
    mean = parseFloat(mean);
    stddev = parseFloat(stddev);
    xValue = parseFloat(xValue);

    // Validaciones básicas
    if(isNaN(mean) || isNaN(stddev) || isNaN(xValue) || stddev <= 0) {
        alert('Por favor, introduce valores válidos.');
        return;
    }

    // Calcular la probabilidad utilizando la función de densidad de probabilidad
    function normalProbabilityDensity(x) {
        const exponent = Math.exp(-0.5 * Math.pow((x - mean) / stddev, 2));
        return (1 / (stddev * Math.sqrt(2 * Math.PI))) * exponent;
    }

    var probabilityDensity = normalProbabilityDensity(xValue);

    // Mostrar el resultado
    document.getElementById('resultadoNormal').innerHTML = 'Resultado: Densidad de Probabilidad = ' + probabilityDensity;
}

/* Sección del Teorema de Bayes */

function calcularTeoremaBayes() {
    // Obtener los valores ingresados
    var probA = document.getElementById('probA').value;
    var probBGivenA = document.getElementById('probBGivenA').value;
    var probB = document.getElementById('probB').value;

    // Convertir a números flotantes
    probA = parseFloat(probA);
    probBGivenA = parseFloat(probBGivenA);
    probB = parseFloat(probB);

    // Validaciones básicas
    if(isNaN(probA) || isNaN(probBGivenA) || isNaN(probB)) {
        alert('Por favor, introduce valores válidos.');
        return;
    }

    // Calcular P(A|B) usando el teorema de Bayes
    var probAGivenB = (probBGivenA * probA) / probB;

    // Mostrar el resultado
    document.getElementById('resultadoTeoremaBayes').innerHTML = 'Resultado: P(A|B) = ' + probAGivenB;
}

/* Reiniciadores de cálculos */
// Función para reiniciar el cálculo de Tendencia Central
function reiniciarTendenciaCentral() {
    document.getElementById("datos").value = "";
    document.getElementById("resultado").innerHTML = "";
}

// Para Bernoulli
function reiniciarBernoulli() {
    document.getElementById("prob").value = "";
    document.getElementById("resultadoBernoulli").innerHTML = "";
}

// Para Poisson
function reiniciarPoisson() {
    document.getElementById("rate").value = "";
    document.getElementById("numEvents").value = "";
    document.getElementById("resultadoPoisson").innerHTML = "";
}

// Para Binomial
function reiniciarBinomial() {
    document.getElementById("trials").value = "";
    document.getElementById("successProbability").value = "";
    document.getElementById("successNumber").value = "";
    document.getElementById("resultadoBinomial").innerHTML = "";
}

// Para Normal
function reiniciarNormal() {
    document.getElementById("mean").value = "";
    document.getElementById("stddev").value = "";
    document.getElementById("xValue").value = "";
    document.getElementById("resultadoNormal").innerHTML = "";
}

// Para Bayes
function reiniciarBayes() {
    document.getElementById("probA").value = "";
    document.getElementById("probBGivenA").value = "";
    document.getElementById("probB").value = "";
    document.getElementById("resultadoTeoremaBayes").innerHTML = "";
}