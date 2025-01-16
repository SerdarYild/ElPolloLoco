let canvas;
let world;
let keyboard = new Keyboard();
let audioBackgroundMusicInGame = new Audio('audio/elpolloloco.mp3');
let audioWalkCharacter = new Audio('audio/running.mp3');
let audioJumpCharacter = new Audio('audio/jump.mp3');
let audioHurtCharacter = new Audio('audio/character_hurt.mp3');
let audioGameLost = new Audio('audio/gameover.mp3');
let audioCoinCollected = new Audio('audio/coin.mp3');
let audioBottleCollected = new Audio('audio/bottle.mp3');
let audioThrowBottle = new Audio('audio/throw.mp3');
let audioGameWin = new Audio('audio/win.mp3');
let audioDeadChicken = new Audio('audio/chicken_small.mp3');
let audioBackgroundMusicEndboss = new Audio('audio/endboss.mp3');
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
    audioBackgroundMusicInGame.volume = 0.2;
    audioBackgroundMusicInGame.play();
    audioBackgroundMusicInGame.loop = true;   
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
    resetBackgroundMusic();
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
    resetBackgroundMusic();
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
        resetBackgroundMusic();
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
        resetBackgroundMusic();
    }, 1000);
}

/**
 * This Function stop Sound.
 * 
 */
function resetBackgroundMusic() {
    audioBackgroundMusicInGame.pause();
    audioBackgroundMusicEndboss.pause();
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
    audioBackgroundMusicEndboss.muted = true;
    audioBackgroundMusicInGame.muted = true;
    audioDeadChicken.muted = true;
    audioWalkCharacter.muted = true;
    audioJumpCharacter.muted = true;
    audioHurtCharacter.muted = true;
    audioGameLost.muted = true;
    audioCoinCollected.muted = true;
    audioBottleCollected.muted = true;
    audioThrowBottle.muted = true;
    audioGameWin.muted = true;
}

/**
 * This Function turn Sound on.
 * 
 */
function unmuteAllGameAudio() {
    audioBackgroundMusicEndboss.muted = false;
    audioBackgroundMusicInGame.muted = false;
    audioDeadChicken.muted = false;
    audioWalkCharacter.muted = false;
    audioJumpCharacter.muted = false;
    audioHurtCharacter.muted = false;
    audioGameLost.muted = false;
    audioCoinCollected.muted = false;
    audioBottleCollected.muted = false;
    audioThrowBottle.muted = false;
    audioGameWin.muted = true;
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