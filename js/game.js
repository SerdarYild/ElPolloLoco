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
 * Starts the game by initializing the level and setting up the game display and sound buttons.
 */
function startGame() {
    initLevel();
    showGameDisplay();
    showAudioBtns();
    showMobileBtns();
    showFullscreenBtn();
    document.getElementById('mainMenuContainer').classList.add('d-none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    playBackgroundMusic();
}

/**
 * This function hides the start screen.
 */
function showGameDisplay() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('btnPlay').classList.add('d-none');
    document.getElementById('controlGuide').classList.add('d-none');
}

/**
 * Displays the audio control buttons.
 */
function showAudioBtns() {
    document.getElementById('audioOff').classList.remove('d-none');
    document.getElementById('audioOn').classList.add('d-none');
}

/**
 * Checks if the current device supports touch input.
 * 
 * @returns {boolean} - Returns true if the device has touch capabilities, otherwise false.
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Displays or hides mobile control buttons based on whether the device supports touch input.
 */
function showMobileBtns() {
    let mobileButtonsLeft = document.getElementById('mobileButtonsLeft');
    let mobileButtonsRight = document.getElementById('mobileButtonsRight');

    if (isTouchDevice()) {
        mobileButtonsLeft.classList.remove('d-none');
        mobileButtonsRight.classList.remove('d-none');
    } else {
        mobileButtonsLeft.classList.add('d-none');
        mobileButtonsRight.classList.add('d-none');
    }
}

/**
 * Shows the button for fullscreen mode.
 */
function showFullscreenBtn() {
    let fullscreenButton = document.getElementById('openFullscreenIcon');

    if (fullscreenButton) {
        fullscreenButton.classList.remove('d-none');
    }
}

/**
 * Plays the background music with volume adjustment and looping.
 */
function playBackgroundMusic() {
    elpollolocoAudio.volume = 0.2;
    elpollolocoAudio.play();
    elpollolocoAudio.loop = true;   
}

/**
 * This function restarts the game.
 */
function restartGame() {
    document.getElementById('gameoverContainer').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('mainMenuContainer').classList.add('d-none');
    document.getElementById('audioOff').classList.remove('d-none');
    document.getElementById('audioOn').classList.remove('d-none');
    document.getElementById('openFullscreenIcon').classList.remove('d-none');
    closeFullscreen();
    clearAllIntervals();
    pauseGameSound();
    startGame();
    document.getElementById('canvas').classList.remove('d-none');
}

/**
 * This function goes back to the start screen.
 */
function returnMainMenu() {
    clearAllIntervals();
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('gameoverContainer').classList.add('d-none');
    document.getElementById('mainMenuContainer').classList.remove('d-none');
    document.getElementById('openFullscreenIcon').style.display = 'none';
    document.getElementById('closeFullscreenIcon').classList.add('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('btnPlay').classList.remove('d-none')
    document.getElementById('controlGuide').classList.remove('d-none')
    closeFullscreen();
    pauseGameSound();
}

/**
 * Shows the game over screen after a delay and pauses the game sound.
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
 * Shows the win screen after a delay and pauses the game sound.
 */
function showWinScreen() {
    setTimeout(() => {
        document.getElementById('winScreen').classList.remove('d-none');
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('audioOff').classList.add('d-none');
        document.getElementById('audioOn').classList.add('d-none');
        document.getElementById('openFullscreenIcon').classList.add('d-none');
        document.getElementById('closeFullscreenIcon').classList.add('d-none');
        document.getElementById('mobileButtonsLeft').classList.add('d-none');
        document.getElementById('mobileButtonsRight').classList.add('d-none');
        pauseGameSound();
    }, 1000);
}

/**
 * Pauses the game sound.
 */
function pauseGameSound() {
    elpollolocoAudio.pause();
    endbossAudio.pause();
}

/**
 * Adds a new interval to the list of intervals and executes the provided function at the specified time interval.
 * 
 * @param {Function} fn - The function to be executed at each interval.
 * @param {number} time - The time interval in milliseconds.
 */
function performInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * Clears all active intervals.
 */
function clearAllIntervals() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

/**
 * Enables fullscreen mode for the game container.
 */
function openFullscreen() {
    let canvasContainer = document.getElementById('canvasContainer');
    if (canvasContainer.requestFullscreen) {
        canvasContainer.requestFullscreen();
    } else if (canvasContainer.webkitRequestFullscreen) {
        canvasContainer.webkitRequestFullscreen();
    } else if (canvasContainer.msRequestFullscreen) {
        canvasContainer.msRequestFullscreen();
    }

    document.getElementById('openFullscreenIcon').classList.add('d-none');
    document.getElementById('closeFullscreenIcon').classList.remove('d-none');
}

/**
 * Exits fullscreen mode and updates the fullscreen icons.
 */
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
 * Mutes all game audio.
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

    document.getElementById('audioOff').classList.add('d-none');
    document.getElementById('audioOn').classList.remove('d-none');
    saveAudioSetting(false);
}

/**
 * Unmutes all game audio.
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
    bottleAudio.muted = false;
    throwAudio.muted = false;
    wonAudio.muted = true;

    document.getElementById('audioOn').classList.add('d-none');
    document.getElementById('audioOff').classList.remove('d-none');
    saveAudioSetting(true);
}

/**
 * Saves the current audio setting (enabled or muted) to localStorage.
 */
function saveAudioSetting(isAudioOn) {
    localStorage.setItem('audioEnabled', isAudioOn);
}

/**
 * Retrieves the stored audio setting from localStorage.
 */
function getAudioSetting() {
    return localStorage.getItem('audioEnabled') === 'true';
}

/**
 * Opens the control guide and hides the start screen.
 */
function openControlGuide() {
    let startScreen = document.getElementById('startScreen');
    let controlsContainer = document.getElementById('controlsContainer');
    let controlGuide = document.getElementById('controlGuide');
    let btnPlay = document.getElementById('btnPlay');
    let imprintContainer = document.getElementById('imprintContainer');
    
    if (startScreen) startScreen.classList.add('d-none');
    if (controlsContainer) controlsContainer.classList.remove('d-none');
    if (controlGuide) controlGuide.style.display = 'none'; 
    if (btnPlay) btnPlay.style.display = 'none';
    if (imprintContainer) imprintContainer.style.visibility = 'hidden';
}

/**
 * Closes the control guide and shows the start screen.
 */
function closeControls() {
    let startScreen = document.getElementById('startScreen');
    let controlsContainer = document.getElementById('controlsContainer');
    let controlGuide = document.getElementById('controlGuide');
    let btnPlay = document.getElementById('btnPlay');
    let imprintContainer = document.getElementById('imprintContainer');
    
    if (startScreen) startScreen.classList.remove('d-none');
    if (controlsContainer) controlsContainer.classList.add('d-none');
    if (controlGuide) controlGuide.style.display = 'block';
    if (btnPlay) btnPlay.style.display = 'block';
    if (imprintContainer) imprintContainer.style.visibility = 'visible';
}