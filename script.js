// -----------------------------------------------------
// index.html
// -----------------------------------------------------

const TIEMPOS = [1, 2, 3];
const MODO = ['libre', 'easy-mode', 'hard-mode', 'palabra-themat', 'terminacion'];
const BEATS = ['boom-bap', 'trap', 'drill', 'jazz-boom-bap', 'west-coast'];

function irRandom() {
    const tiempo = TIEMPOS[Math.floor(Math.random() * TIEMPOS.length)];
    const tematica = MODO[Math.floor(Math.random() * MODO.length)];
    const beat = BEATS[Math.floor(Math.random() * BEATS.length)];
    localStorage.setItem('freestyle_tiempo', tiempo);
    localStorage.setItem('freestyle_modo', tematica);
    localStorage.setItem('freestyle_beat', beat);
    localStorage.setItem('freestyle_challenge', 'random');
    location.href = 'contador.html';
}

function irReto() {
    const tiempo = TIEMPOS[Math.floor(Math.random() * TIEMPOS.length)];
    const tematica = MODO[Math.floor(Math.random() * MODO.length)];
    const beat = BEATS[Math.floor(Math.random() * BEATS.length)];
    localStorage.setItem('freestyle_tiempo', tiempo);
    localStorage.setItem('freestyle_modo', tematica);
    localStorage.setItem('freestyle_beat', beat);
    localStorage.setItem('freestyle_challenge', 'reto');
    location.href = 'contador.html';
}

// -----------------------------------------------------
// elegirEstilo.html
// -----------------------------------------------------

function preparado() {
    const tiempo = document.getElementById('tiempo').value;
    const tematica = document.getElementById('modo').value;
    const beat = document.getElementById('beat').value;
    localStorage.setItem('freestyle_tiempo', tiempo);
    localStorage.setItem('freestyle_modo', tematica);
    localStorage.setItem('freestyle_beat', beat);
    localStorage.setItem('freestyle_challenge', 'manual');
}

// -----------------------------------------------------
// contador.html
// -----------------------------------------------------

const challenge = localStorage.getItem('freestyle_challenge');

const beatKey = localStorage.getItem('freestyle_beat') || 'boom-bap';
document.getElementById('beatTag').textContent = 'BEAT: ' + (BEAT_NAMES[beatKey] || beatKey).toUpperCase();

const minutos = parseInt(localStorage.getItem('freestyle_tiempo') || '1', 10);
const total = minutos * 60;
let remaining = total;

const timeNum = document.getElementById('timeNum');

function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
}

let lastTitle = '';
function nextTitleIntro() {
    let l;
    do { l = TITLE_INTRO[Math.floor(Math.random() * TITLE_INTRO.length)]; } while (l === lastTitle);
    lastTitle = l;
    document.getElementById('titleIntro').textContent = l;    
}

if (challenge === 'manual') {
    nextTitleIntro();
    setInterval(nextTitleIntro, 2800);
    document.getElementById('resumenIntro').classList.add('oculto');
} else {
    document.getElementById('titleIntro').classList.add('oculto');
}

const modoResumen = localStorage.getItem('freestyle_modo');
const tiempoResumen = localStorage.getItem('freestyle_tiempo');
const beatResumen = localStorage.getItem('freestyle_beat');

document.getElementById('resumenBeat').textContent = beatResumen;
document.getElementById('resumenTiempo').textContent = tiempoResumen + ' min';
if (modoResumen === 'palabra-themat' ) {
    document.getElementById('resumenModo').textContent = 'temática';
} else if (modoResumen === 'terminacion' ) {
    document.getElementById('resumenModo').textContent = 'terminación';
} else {
    document.getElementById('resumenModo').textContent = modoResumen;
}

function tick() {
    timeNum.textContent = formatTime(remaining);
    document.querySelector('#titleIntro').classList.add('oculto');

    if (remaining <= 0) {
        clearInterval(interval);
        document.querySelector('body').classList.add('finalizando');
        document.querySelector('.vinyl-wrap').classList.add('finalizando');
        document.querySelector('.vinyl-wrap').classList.remove('latiendo');
        document.querySelector('.word-box').classList.add('oculto');

        const TIEMPO_EXTRA_SEGUNDOS = 8;

        setTimeout(() => {
            fadeOutAndStop(4000);
            setTimeout(() => { location.href = 'final.html'; }, 1200);
        }, TIEMPO_EXTRA_SEGUNDOS * 1000);

        return;
    }
    remaining--;
}

// rotación de palabras random

const tematica = localStorage.getItem('freestyle_modo') || 'libre';

let lastWord = '';
function nextWord() {
    let w;
    do { w = WORDS[Math.floor(Math.random() * WORDS.length)]; } while (w === lastWord);
    lastWord = w;
    document.getElementById('wordDisplay').textContent = w;
}

let lastTermination = '';
function nextTermination() {
    let t;
    do { t = TERMINATIONS[Math.floor(Math.random() * TERMINATIONS.length)]; } while (t === lastTermination);
    lastTermination = t;
    document.getElementById('wordDisplay').textContent = t;
}

function empezarRondaDespuesDeIntro() {
    setTimeout(() => {
        document.querySelector('.vinyl-wrap').classList.remove('oculto');
        document.querySelector('.beat-tag').classList.remove('oculto');
        document.getElementById('resumenIntro').classList.add('oculto');

        const circleEl = document.querySelector('.vinyl-wrap');
        circleEl.classList.remove('oculto');

        const bpm = beatElegido.bpm || 90;
        const duracionLatido = 60 / bpm;
        circleEl.style.animationDuration = duracionLatido + 's';
        circleEl.classList.add('latiendo');

        if (tematica === 'easy-mode') {
            document.querySelector('.word-box').classList.remove('oculto');
            nextWord();
            setInterval(nextWord, 10000);
        }
        else if (tematica === 'hard-mode') {
            document.querySelector('.word-box').classList.remove('oculto');
            nextWord();
            setInterval(nextWord, 5000);
        }
        else if (tematica === 'palabra-themat') {
            document.querySelector('.word-box').classList.remove('oculto');
            let y;
            y = THEMATIC_WORDS[Math.floor(Math.random() * THEMATIC_WORDS.length)];
            document.getElementById('wordDisplay').textContent = y;
            setTimeout(y);
        }
        else if (tematica === 'terminacion') {
            document.querySelector('.word-box').classList.remove('oculto');
            nextTermination();
            setInterval(nextTermination, 20000);
        }

        tick();
        interval = setInterval(tick, 1000);

    }, beatElegido.intro * 1000);
}

// sonar el beat de fondo

const opcionesDeEsteEstilo = BEAT_FILES[beatKey] || BEAT_FILES['boom-bap'];
const beatElegido = opcionesDeEsteEstilo[Math.floor(Math.random() * opcionesDeEsteEstilo.length)];

const audio = new Audio(beatElegido.src);
audio.loop = true;
audio.volume = 1;

audio.play().then(empezarRondaDespuesDeIntro).catch(() => {
    document.addEventListener('click', () => {
        audio.play();
        empezarRondaDespuesDeIntro();
    }, { once: true });
});

function fadeOutAndStop(duracionMs) {
    const pasos = 30;
    const tiempoPorPaso = duracionMs / pasos;
    const bajarPorPaso = audio.volume / pasos;
    let contador = 0;
    const fadeInterval = setInterval(() => {
        contador++;
        audio.volume = Math.max(0, audio.volume - bajarPorPaso);
        if (contador >= pasos) {
            clearInterval(fadeInterval);
            audio.pause();
        }
    }, tiempoPorPaso);
}

// -----------------------------------------------------
// final.html
// -----------------------------------------------------

if (challenge === 'random' || challenge === 'reto') {
    document.getElementById('otro').classList.add('oculto');
}