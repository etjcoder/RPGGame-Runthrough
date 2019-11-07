$(document).ready(function () {

    var heroes = [
        {
            name: "Goku",
            HP: 100,
            attack: "Kamehameha",
            attackPower: 25,
            image: "assets/images/goku150.jpg"
        },
        {
            name: "Gohan",
            HP: 80,
            attack: "Masenko",
            attackPower: 35,
            image: "assets/images/gohan150.png"
        },
        {
            name: "Vegeta",
            HP: 90,
            attack: "Final Flash",
            attackPower: 30,
            image: "assets/images/vegeta150.png"
        }
    ]

    var enemies = [
        {
            name: "Frieza",
            HP: 120,
            attack: "Evil Ray",
            attackPower: 15,
            image: "assets/images/frieza150.png"
        },
        {
            name: "Cell",
            HP: 110,
            attack: "Super Kamehameha",
            attackPower: 25,
            image: "assets/images/cell150.jpg"
        },
        {
            name: "Majin Buu",
            HP: 150,
            attack: "Death ball",
            attackPower: 30,
            image: "assets/images/buu150.jpeg"
        }
    ]


    var currentHero = ""
    var currentEnemy = ""
    var currentEnemyAttackPower = 0;
    var currentHeroHP = 100
    var currentEnemyHP = 100
    var heroReady = false;
    var enemyReady = false;
    var battleBegun = false;
    var enemiesDefeated = 0


    $(".hero-btn").on("click", function () {
        console.log($(this).val())
        heroName = $(this).val()

        if (heroName === "Goku") {
            console.log("You've chosen Goku as your hero")
            renderActiveHero(heroes[0])
        } else if (heroName === "Gohan") {
            console.log("You've chosen Gohan as your hero")
            renderActiveHero(heroes[1])
        } else if (heroName === "Vegeta") {
            console.log("You've chosen Vegeta as your hero")
            renderActiveHero(heroes[2])
        }

    })

    var renderHeroes = function () {

        for (i = 0; i < heroes.length; i++) {

            $(`#hero-${i}-name`).text(heroes[i].name)
            $(`#hero-${i}-hp`).text(heroes[i].HP)
            $(`#hero-${i}-attack`).text(heroes[i].attack)
            $(`#hero-${i}-attackpower`).text(heroes[i].attackpower)

        }


    }

    var renderEnemies = function () {

        for (i = 0; i < enemies.length; i++) {


            $(`#enemy-${i}-name`).text(enemies[i].name)
            $(`#enemy-${i}-hp`).text(enemies[i].HP)
            $(`#enemy-${i}-attack`).text(enemies[i].attack)
            $(`#enemy-${i}-attackpower`).text(enemies[i].attackpower)

        }
    }

    var renderActiveHero = function (hero) {

        $("#activehero-name").text(hero.name)
        $("#activehero-hp").text(hero.HP)
        $("#activehero-image").attr("src", hero.image)
        $("#hero-atk").attr("value", hero.attackPower)

        currentHero = hero.name;
        currentHeroHP = hero.HP;
        heroReady = true;

        renderActiveEnemy(enemies[enemiesDefeated])

    }

    var renderActiveEnemy = function (enemy) {

        $("#activeenemy-name").text(enemy.name)
        $("#activeenemy-hp").text(enemy.HP)
        $("#activeenemy-image").attr("src", enemy.image)

        currentEnemy = enemy.name;
        currentEnemyHP = enemy.HP;
        currentEnemyAttackPower = enemy.attackPower
        enemyReady = true;

        battleStart()

    }

    var battleStart = function () {
        if (enemyReady && heroReady) {

            console.log("Begin Battle!")
            battleBegun = true
            //Render Scoreboard
        }
        else {
            console.log("Both players aren't ready!")
        }
    }

    $("#hero-atk").on("click", function () {

        if (battleBegun) {

            console.log(`Attacked with ${$(this).val()} Attack Power!`)
            currentEnemyHP -= $(this).val()
            $("#activeenemy-hp").text(currentEnemyHP)
            enemyTurn()
        } else {
            console.log("Battle hasn't begun yet")
        }
    })

    var enemyTurn = function () {

        if (currentEnemyHP > 0) {
            var enemyAttackPower = parseInt(currentEnemyAttackPower) - Math.floor(Math.random() * Math.floor(currentEnemyAttackPower))
            console.log("Enemy attacked with: " + enemyAttackPower)
            currentHeroHP -= enemyAttackPower
            $("#activehero-hp").text(currentHeroHP)
            if (currentHeroHP < 1) {
                console.log("You've Lost!!")
                alert("YOU'VE LOST!!!")
            }
        } else {
            console.log("You've won!")
            enemiesDefeated++

            if (enemiesDefeated === 3) {
                console.log(" YOU'VE WON!! ")
                alert("Game over, you win!!")

            } else {
                renderActiveEnemy(enemies[enemiesDefeated])
            }
        }


    }

    renderHeroes()
    renderEnemies()

})