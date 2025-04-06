/**
 * Checks the screen orientation and displays a warning if the device is in portrait mode.
 */
function checkOrientation() {
    let warningElement = document.getElementById('mobileOrientationWarning');
    
    if (warningElement) {
        let isPortrait = window.matchMedia("(orientation: portrait)").matches;
        
        if (isPortrait) {
            warningElement.style.display = 'flex';
        } else {
            warningElement.style.display = 'none';
        }
    }
}

/**
 * Event listener for screen changes.
 */
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

window.addEventListener('load', checkOrientation);
document.addEventListener('DOMContentLoaded', checkOrientation);