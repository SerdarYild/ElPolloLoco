document.addEventListener('DOMContentLoaded', (event) => {
    function checkOrientation() {
        if (window.innerHeight > window.innerWidth) {
            document.getElementById('mobileOrientationWarning').style.display = 'block';
        } else {
            document.getElementById('mobileOrientationWarning').style.display = 'none';
        }
    }

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('load', checkOrientation);

    document.getElementById('mobileMoveLeft').addEventListener('click', function() {
        character.mobileMoveLeft();
    });

    document.getElementById('mobileMoveRight').addEventListener('click', function() {
        character.mobileMoveRight();
    });

    document.getElementById('mobileJump').addEventListener('click', function() {
        character.mobileJump();
    });

    document.getElementById('mobileThrowBottle').addEventListener('click', function() {
        character.mobileThrowBottle();
    });

    // Initiale Orientierung überprüfen
    checkOrientation();
});