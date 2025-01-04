let canvas;
let world;
let keyboard = new Keyboard();
let audioBackgroundMusicInGame = new Audio('audio/elpolloloco.mp3');
let audioWalkCharacter = new Audio('audio/running.mp3');
let audioJumpCharacter = new Audio('audio/jump.mp3');
let audioHurtCharacter = new Audio('audio/pepe_hurt.mp3');
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

    setTimeout(() => {
        initLevel();
        hideElementsInStartScreen();
        showSoundBtns();
        showFullscreenBtn();
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard);
        playBackgroundMusic();
    }, 1000);
}

/**
 * This function hides the start screen.
 * 
 */
function hideElementsInStartScreen() {
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
    document.getElementById('audioOnIcon').classList.remove('d-none');
    document.getElementById('audioOffIcon').classList.remove('d-none');
}

/**
 * This Function show the Button for Fullscreen.
 * 
 */
function showFullscreenBtn() {
    const fullscreenButton = document.getElementById('openFullscreenIcon');

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
    document.getElementById('gameOverScreenContainer').classList.add('d-none');
    document.getElementById('winScreenContainer').classList.add('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('audioOffIcon').classList.remove('d-none');
    document.getElementById('audioOnIcon').classList.remove('d-none');
    document.getElementById('openFullscreenIcon').classList.remove('d-none');
    closeFullscreen();
    clearAllIntervals();
    resetBackgroundMusic();
    startGame();
    document.getElementById('canvas').classList.remove('d-none');
}

/**
 * This Function go back to Start screen.
 * 
 */
function goBackToStartScreen() {
    clearAllIntervals();
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('gameOverScreenContainer').classList.add('d-none');
    document.getElementById('winScreenContainer').classList.add('d-none');
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
        document.getElementById('gameOverScreenContainer').classList.remove('d-none');
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('audioOffIcon').classList.add('d-none');
        document.getElementById('audioOnIcon').classList.add('d-none');
        document.getElementById('openFullscreenIcon').classList.add('d-none');
        document.getElementById('exitFullscreenIcon').classList.add('d-none');
        resetBackgroundMusic();
    }, 1500);
}

/**
 * This Function show the Win Screen.
 * 
 */
function showWinScreen() {
    setTimeout(() => {
        document.getElementById('winScreenContainer').classList.remove('d-none');
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('audioOffIcon').classList.add('d-none');
        document.getElementById('audioOnIcon').classList.add('d-none');
        document.getElementById('openFullscreenIcon').classList.add('d-none');
        document.getElementById('exitFullscreenIcon').classList.add('d-none');
        resetBackgroundMusic();
    }, 1500);
}

/**
 * This Function stop Sound.
 * 
 */
function resetBackgroundMusic() {
    audioBackgroundMusicInGame.currentTime = 0;
    audioBackgroundMusicInGame.pause();
    audioBackgroundMusicEndboss.currentTime = 0;
    audioBackgroundMusicEndboss.pause();
}

function setStopableInterval(fn, time) {
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
    addStylesForFullScreen();
}

/**
 * This Function add Styles for Fullscreen.
 * 
 */
function addStylesForFullScreen() {
    document.getElementById('openFullscreenIcon').classList.add('d-none');
    document.getElementById('exitFullscreenIcon').classList.remove('d-none');
    document.getElementById('canvas').classList.add('canvasFullScreen');
    document.getElementById('winScreenContainer').classList.add('winScreenContainerFullScreen', 'winScreenContainerFullScreenh2', 'imgTrophyContainerFullScreenimg');
    document.getElementById('gameOverScreen').classList.add('gameOverScreenFullScreen');
}

/**
 * This function close the Fullscreen.
 * 
 */
function closeFullscreen() {
    let gameContainer = document.getElementById('gameContainer');
    if (gameContainer.requestFullscreen) {
        gameContainer.requestFullscreen();
    } else if (gameContainer.webkitRequestFullscreen) {
        gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) { 
        gameContainer.msRequestFullscreen();
    }
    addStylesForFullScreen();
}

/**
 * This Function remove Styles for Normal Screen.
 * 
 */
function removeStylesForFullScreen() {
    document.getElementById('openFullscreenIcon').classList.remove('d-none');
    document.getElementById('exitFullscreenIcon').classList.add('d-none');
    document.getElementById('canvas').classList.remove('canvasFullScreen');
    document.getElementById('winScreenContainer').classList.remove('winScreenContainerFullScreen', 'winScreenContainerFullScreenh2', 'imgTrophyContainerFullScreenimg');
    document.getElementById('gameOverScreen').classList.remove('gameOverScreenFullScreen');
}

/**
 * This Function mute Sound.
 * 
 */
function turnSoundOff() {
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
}

/**
 * This Function turn Sound on.
 * 
 */
function turnSoundOn() {
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
}

/**
 * This Function ist for the Steering Menu.
 * 
 */
function openControlGuide() {
    const startScreen = document.getElementById('startScreen');
    const controlsContainer = document.getElementById('controlsContainer');
    const btnPlay = document.getElementById('btnPlay');
    const audioOffIcon = document.getElementById('audioOffIcon');
    const audioOnIcon = document.getElementById('audioOnIcon');
    const controlGuides = document.getElementById('controlGuides');
    const arrowBackGameControlls = document.getElementById('arrowBackGameControlls');

    if (startScreen) startScreen.classList.add('d-none');
    if (controlsContainer) controlsContainer.classList.remove('d-none');
    if (btnPlay) btnPlay.classList.add('d-none');
    if (audioOffIcon) audioOffIcon.classList.add('d-none');
    if (audioOnIcon) audioOnIcon.classList.add('d-none');
    if (controlGuides) controlGuides.classList.add('d-none');
    if (arrowBackGameControlls) arrowBackGameControlls.classList.remove('d-none');
}


/**
 * This Function close the Steering Menu.
 *
 */
function closeSteeringMenu() {
    document.getElementById('controlsContainer').classList.add('d-none');
    document.getElementById('arrowBackGameControlls').classList.add('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('btnPlay').classList.remove('d-none');
    document.getElementById('audioOffIcon').classList.remove('d-none');
    document.getElementById('audioOnIcon').classList.add('d-none');
    document.getElementById('controlGuide').classList.remove('d-none');
}