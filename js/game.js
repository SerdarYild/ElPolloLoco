let canvas;
let world;
let keyboard = new Keyboard();
let elpollolocoAudio = new Audio('audio/elpolloloco.mp3');
let runningAudio = new Audio('audio/running.mp3');
let jumpAudio = new Audio('audio/jump.mp3');
let hurtAudio = new Audio('audio/character_hurt.mp3');
let gameoverAudio = new Audio('audio/gameover.mp3');
let coinAudio = new Audio('audio/coin.mp3');
let bottleAudio = new Audio('audio/bottle.mp3');
let throwAudio = new Audio('audio/throw.mp3');
let wonAudio = new Audio('audio/win.mp3');
let chickenAudio = new Audio('audio/chicken_small.mp3');
let endbossAudio = new Audio('audio/endboss.mp3');
let intervalIds = [];

/**
 * This function start the Game.
 * 
 */
function startGame() {
    initLevel();
    showGameDisplay();
    showSoundBtns();
    showFullscreenBtn();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    playBackgroundMusic();
}

/**
 * This function hides the start screen.
 * 
 */
function showGameDisplay() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('btnPlay').classList.add('d-none');
    document.getElementById('controlGuide').classList.add('d-none');
}

/**
 * This Function show the Buttons for Sound.
 * 
 */
function showSoundBtns() {
    document.getElementById('audioOn').classList.remove('d-none');
    document.getElementById('audioOff').classList.remove('d-none');
}

/**
 * This Function show the Button for Fullscreen.
 * 
 */
function showFullscreenBtn() {
    let fullscreenButton = document.getElementById('openFullscreenIcon');

    if (fullscreenButton) {
        fullscreenButton.classList.remove('d-none');
    }
}

/**
 * This Function Play Backgroundmusic.
 * 
 */
function playBackgroundMusic() {
    elpollolocoAudio.volume = 0.2;
    elpollolocoAudio.play();
    elpollolocoAudio.loop = true;   
}

/**
 * This Function restart the Game.
 * 
 */
function restartGame() {
    closeFullscreen();

    document.getElementById('gameoverContainer').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('audioOff').classList.remove('d-none');
    document.getElementById('audioOn').classList.remove('d-none');
    document.getElementById('openFullscreenIcon').classList.remove('d-none');

    clearAllIntervals();
    pauseGameSound();
    startGame();

    document.getElementById('canvas').classList.remove('d-none');
}

/**
 * This Function go back to Start screen.
 * 
 */
function returnMainMenu() {
    clearAllIntervals();
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('gameoverContainer').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('btnPlay').classList.remove('d-none');
    document.getElementById('controlGuide').classList.remove('d-none');
    document.getElementById('openFullscreenIcon').classList.add('d-none');
    closeFullscreen();
    pauseGameSound();
}

/**
 * This Function show the Gameover Screen.
 * 
 */
function showGameOverScreen() {
    setTimeout(() => {
        document.getElementById('gameoverContainer').classList.remove('d-none');
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('audioOff').classList.add('d-none');
        document.getElementById('audioOn').classList.add('d-none');
        document.getElementById('openFullscreenIcon').classList.add('d-none');
        document.getElementById('closeFullscreenIcon').classList.add('d-none');
        pauseGameSound();
    }, 1000);
}

/**
 * This Function show the Win Screen.
 * 
 */
function showWinScreen() {
    setTimeout(() => {
        document.getElementById('winScreen').classList.remove('d-none');
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('audioOff').classList.add('d-none');
        document.getElementById('audioOn').classList.add('d-none');
        document.getElementById('openFullscreenIcon').classList.add('d-none');
        document.getElementById('closeFullscreenIcon').classList.add('d-none');
        pauseGameSound();
    }, 1000);
}

/**
 * This Function stop Sound.
 * 
 */
function pauseGameSound() {
    elpollolocoAudio.pause();
    endbossAudio.pause();
}

function performInterval(fn, time) {
    intervalIds.push(setInterval(fn, time));
}

/**
 * This Function clear the Intervals.
 * 
 */
function clearAllIntervals() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

/**
 * This function is for the Fullscreen Mode.
 * 
 */
function openFullscreen() {
    let gameContainer = document.getElementById('gameContainer');
    if (gameContainer.requestFullscreen) {
        gameContainer.requestFullscreen();
    } else if (gameContainer.webkitRequestFullscreen) {
        gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) {
        gameContainer.msRequestFullscreen();
    }

    document.getElementById('openFullscreenIcon').classList.add('d-none');
    document.getElementById('closeFullscreenIcon').classList.remove('d-none');
}

function closeFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
    } else if (document.msFullscreenElement) {
        document.msExitFullscreen();
    }
    
    document.getElementById('closeFullscreenIcon').classList.add('d-none');
    document.getElementById('openFullscreenIcon').classList.remove('d-none');
}

/**
 * This Function mute Sound.
 * 
 */
function muteAllGameAudio() {
    endbossAudio.muted = true;
    elpollolocoAudio.muted = true;
    chickenAudio.muted = true;
    runningAudio.muted = true;
    jumpAudio.muted = true;
    hurtAudio.muted = true;
    gameoverAudio.muted = true;
    coinAudio.muted = true;
    bottleAudio.muted = true;
    throwAudio.muted = true;
    wonAudio.muted = true;
}

/**
 * This Function turn Sound on.
 * 
 */
function unmuteAllGameAudio() {
    endbossAudio.muted = false;
    elpollolocoAudio.muted = false;
    chickenAudio.muted = false;
    runningAudio.muted = false;
    jumpAudio.muted = false;
    hurtAudio.muted = false;
    gameoverAudio.muted = false;
    coinAudio.muted = false;
    audioBottleCobottleAudiollected.muted = false;
    throwAudio.muted = false;
    wonAudio.muted = true;
}

/**
 * This Function ist for the Steering Menu.
 * 
 */
function openControlGuide() {
    let startScreen = document.getElementById('startScreen');
    let controlsContainer = document.getElementById('controlsContainer');
    let controlGuide = document.getElementById('controlGuide');
    let btnPlay = document.getElementById('btnPlay');
    
    if (startScreen) startScreen.classList.add('d-none');
    if (controlsContainer) controlsContainer.classList.remove('d-none');
    if (controlGuide) controlGuide.style.display = 'none'; 
    if (btnPlay) btnPlay.style.display = 'none';
}

function closeControls() {
    let startScreen = document.getElementById('startScreen');
    let controlsContainer = document.getElementById('controlsContainer');
    let controlGuide = document.getElementById('controlGuide');
    let btnPlay = document.getElementById('btnPlay');
    
    if (startScreen) startScreen.classList.remove('d-none');
    if (controlsContainer) controlsContainer.classList.add('d-none');
    if (controlGuide) controlGuide.style.display = 'block';
    if (btnPlay) btnPlay.style.display = 'block';
}