// -----------------------------------------------------
// index.html
// -----------------------------------------------------

const TIEMPOS = [1, 2, 3];
const BEATS = ['boom-bap', 'trap', 'drill', 'jazz-boom-bap', 'west-coast'];

function irRandom() {
    const tiempo = TIEMPOS[Math.floor(Math.random() * TIEMPOS.length)];
    const tematica = Math.random() < 0.5 ? 'libre' : 'palabras';
    const beat = BEATS[Math.floor(Math.random() * BEATS.length)];
    localStorage.setItem('freestyle_tiempo', tiempo);
    localStorage.setItem('freestyle_tematica', tematica);
    localStorage.setItem('freestyle_beat', beat);
    location.href = 'contador.html';
}

function irReto() {
    const tiempo = TIEMPOS[Math.floor(Math.random() * TIEMPOS.length)];
    const beat = BEATS[Math.floor(Math.random() * BEATS.length)];
    localStorage.setItem('freestyle_tiempo', tiempo);
    localStorage.setItem('freestyle_tematica', 'palabras');
    localStorage.setItem('freestyle_beat', beat);
    location.href = 'contador.html';
}

// -----------------------------------------------------
// elegirEstilo.html
// -----------------------------------------------------


function preparado() {
    const tiempo = document.getElementById('tiempo').value;
    const tematica = document.getElementById('tematica').value;
    const beat = document.getElementById('beat').value;
    localStorage.setItem('freestyle_tiempo', tiempo);
    localStorage.setItem('freestyle_tematica', tematica);
    localStorage.setItem('freestyle_beat', beat);
}

// -----------------------------------------------------
// contador.html
// -----------------------------------------------------

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

function tick() {
    timeNum.textContent = formatTime(remaining);

    if (remaining <= 0) {
        clearInterval(interval);
        fadeOutAndStop(1000);
        setTimeout(() => { location.href = 'final.html'; }, 1200);
        return;
    }
    remaining--;
}

// rotación de palabras random

const tematica = localStorage.getItem('freestyle_tematica') || 'libre';

let lastWord = '';
function nextWord() {
    let w;
    do { w = WORDS[Math.floor(Math.random() * WORDS.length)]; } while (w === lastWord);
    lastWord = w;
    document.getElementById('wordDisplay').textContent = w;
}

function empezarRondaDespuesDeIntro() {
    setTimeout(() => {
        document.querySelector('.vinyl-wrap').classList.remove('oculto');

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
    const pasos = 20;
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