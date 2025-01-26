class World {
    character = new Character();
    maxBottlesToThrow = 0;
    level = level1;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    intervalIds = [];
    throwableObject = [];
    statusbarIconEndboss = new StatusbarIconEndboss();
    statusbarHealth = new StatusbarHealth();
    statusbarCoin = new StatusbarCoin();
    statusbarBottle = new StatusbarBottle();
    statusbarEndbossHealth = new StatusbarEndbossHealth();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkCollisionsBottle();
        this.startGameLoop();
    }

    /** * This Function check if the Throwing Bottle is activate. */
    checkThrowObjects() {
        if (this.keyboard.d && this.character.canThrowBottle && this.maxBottlesToThrow > 0) {
            let bottle = new ThrowableObject(this.character.x, this.character.y, this.character.otherDirection);
            this.throwableObject.push(bottle);
            throwAudio.play();
            this.maxBottlesToThrow--;
            this.character.reduceProgressbarBottleThroughThrow();
            this.statusbarBottle.setPercentage(this.character.progessBottleBar);
        }
    }

    /**
     * This Function draw all in the Canvas.
     * 
     */
    draw() {
        this.clearCanvas();
        this.ctx.save();
        this.ctx.translate(this.cameraX, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.cameraX, 0);

        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoin);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarEndbossHealth);
        this.addToMap(this.statusbarIconEndboss);
        this.ctx.translate(this.cameraX, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.ctx.translate(-this.cameraX, 0);
    }

    gameLoop() {
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }

    startGameLoop() {
        this.gameLoop();
    }

    /**
     * This Function Clear Canvas.
     * 
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * This Function add the objects from the Arrays   
     * 
     * @param {string} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * This Function add the MovableObject
     * 
     * @param {string} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * function connects the world with the character class
     * 
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * functions check collisions for various game objects
     *  
     */
    checkCollisions() {
        performInterval(() => {
            this.checkCollisionsChicken();
            this.checkCollisionsEndboss();
            this.checkCollectedCoins();
            this.checkCollectedBottles();
        }, 1000 / 25);
    }

    /**
     * This Function are for the Collisions with the Throwing Bottle.
     */
    checkCollisionsBottle() {
        performInterval(() => {
            this.checkThrowObjects();
            this.checkCollisionWithBottleEndboss();
        }, 230);
    }

    /**
     * This Function are for the Collisions with the Chicken Enemies.
     * 
     */
    checkCollisionsChicken() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && !this.character.isHurtCharacter()) {
                if (this.character.isAboveGround()) {
                    this.jumpAndKillChicken(enemy);
                } else {
                    this.character.hitCharacter()
                    this.statusbarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
     * This function is when we jumped on the chicken.
     * 
     * @param {string} enemy 
     */
    jumpAndKillChicken(enemy) {
        enemy.chickenKilled();
        this.character.speedY = 30;
        chickenAudio.play();
        chickenAudio.volume = 0.3
        setTimeout(() => {
            this.deleteCurrentEnemy(enemy);
        }, 500);
    }

    enemyHitByBottle(enemy, bottle) {
        enemy.chickenKilled();
        chickenAudio.play();
        chickenAudio.volume = 0.3;
        this.deleteCurrentEnemy(enemy);
        this.removesBottleFromArray(bottle);
    }    

    /**
     * This Function Check Collisions with the Endboss.
     * 
     */
    checkCollisionsEndboss() {
        this.level.endboss.forEach(endboss => {
            if (this.character.isColliding(endboss)) {
                this.character.hitCharacter();
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * This Function collect the Coins.
     * 
     */
    checkCollectedCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isCollected(coin)) {
                this.coinCollected(coin);
                this.character.raiseProgressbarCoin();
                coinAudio.play();
                this.statusbarCoin.setPercentage(this.character.progessCoinBar);
            }
        });
    }

    /**
     * This Function Check the index in the coins Array.
     * 
     * @param {string} coin 
     */
    coinCollected(coin) {
        let i = this.level.coins.indexOf(coin);
        this.level.coins.splice(i, 1);
    }

    /**
     * This Function collect the Bottle.
     * 
     */
    checkCollectedBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isCollected(bottle)) {
                this.bottleCollected(bottle);
                this.character.raiseProgressbarBottle();
                bottleAudio.play();
                this.statusbarBottle.setPercentage(this.character.progessBottleBar);
            }
        });
    }

    /**
    * This Function Check the index in the bottles Array.
    * 
    * @param {string} bottle 
    */
    bottleCollected(bottle) {
        let i = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(i, 1);
        this.maxBottlesToThrow++;
    }

    /**
    * This Function Check the Collisions if the Bottle hit the Endboss. 
    */
    checkCollisionWithBottleEndboss() {
        this.throwableObject.forEach((bottle) => {
            this.level.endboss.forEach(endboss => {
                if (bottle.isColliding(endboss)) {
                    endboss.hitEndboss(endboss.energy);
                    this.playEndbossSound();
                    this.statusbarEndbossHealth.setPercentage(world.level.endboss[0].energy);
                    setTimeout(() => {
                        this.removesBottleFromArray(bottle);
                    }, 180);
                }
            });
        });
    }  

    playEndbossSound() {
        chickenAudio.volume = 0.3;
        chickenAudio.play();
    }

    /**
        * This Function mirror the Character.   
        * 
        * @param {string} mo - This is the MovableObject for example Character Class or Endboss Class.
        */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * This Function turn around the Character.   
     * 
     * @param {string} mo 
     */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

    /**
     * This Function clear the current enemy from the Array.
     * 
     * @param {string} enemy 
     */
    deleteCurrentEnemy(enemy) {
        let i = this.level.enemies.indexOf(enemy);
        this.level.enemies.splice(i, 1);
    }

    /**
    * This Function clear the current throwing Bottle from the Array.
    * 
    * @param {string} bottle - This is the Current bottle from the Array. 
    */
    removesBottleFromArray(bottle) {
        let i = this.throwableObject.indexOf(bottle);
        this.throwableObject.splice(i, 1);
    }
}