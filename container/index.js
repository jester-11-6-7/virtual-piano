const PIANOKEY = document.querySelectorAll('.piano-button');
const PIANO = document.querySelector('.piano');
const BTNCONTAINER = document.querySelector('.btn-container');
const BTN = document.querySelectorAll('.btn');
const FULLSCREEN = document.querySelector('.full-screen');


// state for one press
let prev, next;

// audio
const playAudio = (src) => {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
};

// notes || latters
const handleChangeNotes = (event) => {
    BTN.forEach((elem) => {
        elem.classList.remove('btn-active');
        event.target.classList.add('btn-active');
        if (event.target.classList.contains('btn-letters')) {
            PIANOKEY.forEach((elem) => {
                elem.classList.add('letter');
            });
        }
        if (event.target.classList.contains('btn-notes')) {
            PIANOKEY.forEach((elem) => {
                elem.classList.remove('letter');
            });
        }
    });
};

// mouse event
const start = (event) => {
    event.target.classList.add('active');
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
};
const stop = (event) => {
    event.target.classList.remove('active');
};

const startCurrespond = (event) => {
    if (event.target.classList.contains('piano-button')) {
        event.target.classList.add('active');
        const note = event.target.dataset.note;
        const src = `assets/audio/${note}.mp3`;
        playAudio(src);
    }

    PIANOKEY.forEach((elem) => {
        elem.addEventListener('mouseover', start);
        elem.addEventListener('mouseout', stop);
    });
};

const stopCurrespond = (event) => {
    PIANOKEY.forEach((elem) => {
        elem.classList.remove('active');
        elem.removeEventListener('mouseover', start);
        elem.removeEventListener('mouseout', stop);
    });
};

// fullscreen
const fullScreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    };
};

const handleKeyDown = (event) => {
    const keyEvent = event.code;
    prev = keyEvent;
    PIANOKEY.forEach((elem) => {
        const dataLetter = elem.dataset.letter;
        if (keyEvent === `Key${dataLetter}` && prev !== next) {
            next = `Key${dataLetter}`;
            elem.classList.add('active');
            const note = elem.dataset.note;
            const src = `assets/audio/${note}.mp3`;
            playAudio(src);
        }
    })
};
const handleKeyUp = (event) => {
    PIANOKEY.forEach((elem) => {
        if (elem.classList.contains('active')) {
            elem.classList.remove('active');
            prev = null;
            next = null;
        };
    });
};

// mouse events
PIANO.addEventListener('mousedown', startCurrespond, false);
PIANO.addEventListener('mouseup', stopCurrespond);
// global key events
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
// notes || latters
BTNCONTAINER.addEventListener('click', handleChangeNotes);
// fullscreen
FULLSCREEN.addEventListener('click', fullScreen);