let level1;

function initLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
        ],

        [
            new Endboss(level1),
        ],

        [
            new Cloud('img/5_background/layers/4_clouds/1.png', 100),
            new Cloud('img/5_background/layers/4_clouds/1.png', 500),
            new Cloud('img/5_background/layers/4_clouds/2.png', 1000),
            new Cloud('img/5_background/layers/4_clouds/2.png', 1500),
            new Cloud('img/5_background/layers/4_clouds/1.png', 2000),
            new Cloud('img/5_background/layers/4_clouds/1.png', 2500),
            new Cloud('img/5_background/layers/4_clouds/2.png', 3000),
            new Cloud('img/5_background/layers/4_clouds/2.png', 3500),
            new Cloud('img/5_background/layers/4_clouds/1.png', 4000),
            new Cloud('img/5_background/layers/4_clouds/1.png', 4500),
        ],

        [
            new BackgroundObject('img/5_background/layers/air.png', -819),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -819),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -819),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -819),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 819),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 819),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 819),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 819),

            new BackgroundObject('img/5_background/layers/air.png', 819 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 819 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 819 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 819 * 2),

            new BackgroundObject('img/5_background/layers/air.png', 819 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 819 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 819 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 819 * 3),

            new BackgroundObject('img/5_background/layers/air.png', 819 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 819 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 819 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 819 * 4),

            new BackgroundObject('img/5_background/layers/air.png', 819 * 5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 819 * 5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 819 * 5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 819 * 5),

            new BackgroundObject('img/5_background/layers/air.png', 819 * 6),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 819 * 6),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 819 * 6),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 819 * 6),

            new BackgroundObject('img/5_background/layers/air.png', 819 * 7),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 819 * 7),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 819 * 7),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 819 * 7),
        ],

        [
            new Coin('img/8_coin/coin_1.png'),
            new Coin('img/8_coin/coin_1.png'),
            new Coin('img/8_coin/coin_1.png'),
            new Coin('img/8_coin/coin_1.png'),
            new Coin('img/8_coin/coin_1.png'),
            new Coin('img/8_coin/coin_1.png'),
            new Coin('img/8_coin/coin_1.png'),
            new Coin('img/8_coin/coin_1.png'),
            new Coin('img/8_coin/coin_1.png'),
            new Coin('img/8_coin/coin_1.png'),
            new Coin('img/8_coin/coin_1.png'),
            new Coin('img/8_coin/coin_1.png'),
            new Coin('img/8_coin/coin_1.png'),
            new Coin('img/8_coin/coin_1.png'),
            new Coin('img/8_coin/coin_1.png'),
            new Coin('img/8_coin/coin_1.png'),
            new Coin('img/8_coin/coin_1.png'),
        ],

        [
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 350),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 350),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 350),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 350),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 350),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 350),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 350),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 350),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 350),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 350),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 350),
        ],
    );
}