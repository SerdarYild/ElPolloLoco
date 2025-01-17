class Endboss extends MovableObject {
    x = 4800;
    y = 95;
    width = 310;
    height = 340;
    speed = 15;
    hadFirstContact = false;
    intervalIds = [];
    offset = {
        top: 100,
        bottom: 50,
        left: 40,
        right: 40,
    };

    IMAGES_BOSS_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_BOSS_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    imagesAttackEndboss = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    imagesHurtEndboss = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    imagesDeadEndboss = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_BOSS_WALK);
        this.loadImages(this.IMAGES_BOSS_ALERT);
        this.loadImages(this.imagesAttackEndboss);
        this.loadImages(this.imagesHurtEndboss);
        this.loadImages(this.imagesDeadEndboss);
        this.animate();
    }

    /**
     * This function animates the Endboss.
     */
    animate() {
        let i = 0;
        performInterval(() => {
            this.playEndboss(i);
            i++;
            if (this.hasReached()) {
                i = 0;
                this.hadFirstContact = true;
                this.playBackgroundMusic();
            }
        }, 120);
    }

    /**
     * This function plays the Endboss with different animations.
     * 
     * @param {number} i - The current number for playing the intro animation of the Endboss. 
     */
    playEndboss(i) {
        if (i < 20) {
            this.playAnimationMo(this.IMAGES_BOSS_ALERT);
        } else if (!this.isDead() && !this.isHurt() && this.fightBegins()) {
            this.playAnimationMo(this.IMAGES_BOSS_WALK);
            this.moveLeft();
        } else if (this.isHurt()) {
            this.playAnimationMo(this.imagesHurtEndboss);
        } else if (this.isDead()) {
            this.playAnimationMo(this.imagesDeadEndboss);
            setTimeout(() => {
                this.winGame();
            }, 1000);
        }
        this.enterRageMode();
    }

    /**
     * This function shows the game over screen after the Endboss is defeated.
     */
    winGame() {
        wonAudio.play();
        clearAllIntervals();
        pauseGameSound();
        showWinScreen();
    }

    /**
     * This function plays the Endboss background music during the boss fight.
     */
    playBackgroundMusic() {
        endbossAudio.volume = 0.2;
        endbossAudio.play();
        endbossAudio.loop = true;
        elpollolocoAudio.pause();
    }

    /**
     * This function doubles the movement speed of the Endboss.
     */
    enterRageMode() {
        if (this.shouldRage()) {
            this.doubleSpeed();
        }
    }

    /**
     * This function triggers the intro animation of the Endboss.
     * 
     * @returns {boolean} Returns true or false, depending on whether the character is close enough to the Endboss.
     */
    hasReached() {
        return world.character.x > 4000 && !this.hadFirstContact;
    }

    /**
     * This function starts the boss fight.
     * 
     * @returns {boolean} Returns true or false, depending on whether the character is close enough to the Endboss.
     */
    fightBegins() {
        return world.character.x > world.level.endboss[0].x - 1000;
    }

    shouldRage() {
        return world.level.endboss[0].energy < 50;
    }

    doubleSpeed() {
        world.level.endboss[0].speed = 30;
    }

    isHurt() {
        return this.isHurtEndboss();
    }
}