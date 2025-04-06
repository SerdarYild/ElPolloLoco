class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    levelEndX = 4110;

    /**
     * Initializes the game world with various game objects.
     * 
     * @param {object[]} enemies - An array of enemy objects.
     * @param {object} endboss - The endboss object.
     * @param {object[]} clouds - An array of cloud objects.
     * @param {object[]} backgroundObjects - An array of background objects.
     * @param {object[]} coins - An array of coin objects.
     * @param {object[]} bottles - An array of bottle objects.
     */
    constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}