//GLOBALS

//your stats
var yourcharacter;
var yourtotalhp = 0;
var currenthp = 0;
var yourbaseap = 0;
var currentap = 0;

//character data
var characters = {
    demo: {
        srcpath: "assets/images/demofull.png",
        enemystats: [0, 0],
        isEnemy: true
    },
    heavy: {
        srcpath: "assets/images/heavyfull.png",
        enemystats: [0, 0],
        isEnemy: true
    },
    medic: {
        srcpath: "assets/images/medicfull.png",
        enemystats: [0, 0],
        isEnemy: true
    },
    pyro: {
        srcpath: "assets/images/pyrofull.png",
        enemystats: [0, 0],
        isEnemy: true
    },
    sniper: {
        srcpath: "assets/images/sniperfull.png",
        enemystats: [0, 0],
        isEnemy: true
    },
    solider: {
        srcpath: "assets/images/soldierfull.png",
        enemystats: [0, 0],
        isEnemy: true
    },
    spy: {
        srcpath: "assets/images/spyfull.png",
        enemystats: [0, 0],
        isEnemy: true
    },
    scout: {
        srcpath: "assets/images/scoutmebadedit.png",
        enemystats: [0, 0],
        isEnemy: true
    },
    engineer: {
        srcpath: "assets/images/engineerfull.png",
        enemystats: [0, 0],
        isEnemy: true
    }
};
var theEnemies; //Array of the names of the enemy characters
var totalEnemyHealth = 0;
var totalEnemyDamage = 0;

//HTML Elements
var gameSpace = $("#gameSpace");
var enemies;

// FUNCTIONS

// Takes number of hp cp pairs to generate and generates aray of array pairs
function generateCharacterStats(characters) {
    totalEnemyHealth = 0;
    totalEnemyDamage = 0;
    var stats = [];
    for (var i = 0; i < characters; i++) {
        var statPair = [0, 0]; //hp,cp
        var hp = 100 - Math.floor(Math.random() * 50);
        var cp = Math.floor(Math.pow(125 - hp, 0.5));
        totalEnemyHealth += hp;
        totalEnemyDamage += cp;
        statPair = [hp, cp];
        stats.push(statPair);
    }
    return stats;
}
// initial generate your stat pair
function genYourStats() {
    yourtotalhp = totalEnemyDamage * 5;
    yourbaseap = Math.floor(
        Math.pow(totalEnemyHealth / (Math.random() * totalEnemyDamage), 0.5)
    );
    console.log(totalEnemyDamage);
    console.log(totalEnemyHealth);
    console.log(yourbaseap);
    console.log(yourtotalhp);

    currenthp = yourtotalhp;
    currentap = yourbaseap;
}

//re generate stats and display
function refreshPageStats() {}

//Set up Game Function
//Start game character selection
//Set up hp, attack power and counter attack power
function initRPG() {
    //Display choose a character prompt
    //Display Character Choices
    var enemies = $("<div>");
    enemies.addClass("enemies");
    gameSpace.append(enemies);
    var theEnemies = Object.keys(characters);

    //get enemy stats
    var enemyStats = generateCharacterStats(theEnemies.length);

    //GENERATE IMAGES and add character stats
    for (var i = 0; i < theEnemies.length; i++) {
        var charname = theEnemies[i];
        characters[charname]["stats"] = enemyStats[i];
        var characterImg = $("<img />", {
            data_name: charname,
            src: characters[charname]["srcpath"],
            alt: charname
        });
        characterImg.addClass("characterImgs");
        if (i == 0) {
            characterImg.addClass("selectedCharacter");
        }
        characterImg.appendTo(enemies);
    }

    //Clicky image zoom
    $(".characterImgs").on("click", function() {
        $(".selectedCharacter").removeClass("selectedCharacter");
        $(this).addClass("selectedCharacter");
    });

    //Create confirm character button
    var confirmCharacterButton = $("<button>");
    confirmCharacterButton.text("Confirm Character and Begin");
    confirmCharacterButton.attr("id", "confirmCharacter");
    confirmCharacterButton.css("margin", "50px");
    confirmCharacterButton.click(function() {
        // turn off click stuff
        confirmCharacterButton.off("click");
        confirmCharacterButton.remove();
        $(".characterImgs").off("click");
        // create your character
        yourcharacter = $(".selectedCharacter").attr("data_name");
        characters[yourcharacter].isEnemy = false;
        // gen stats
        genYourStats();
        //start the game
        playGame();
    });
    gameSpace.append(confirmCharacterButton);
}

function playGame() {
    gameSpace.empty();
    var enemies = $("<div>");
    enemies.addClass("enemies");
    gameSpace.append(enemies);
    var theEnemies = Object.keys(characters);

    //get enemy stats
    var enemyStats = generateCharacterStats(theEnemies.length);

    //GENERATE IMAGES and add character stats
    for (var i = 0; i < theEnemies.length; i++) {
        var charname = theEnemies[i];
        if (charname != yourcharacter) {
            characters[charname]["stats"] = enemyStats[i];
            var characterImg = $("<img />", {
                data_name: charname,
                src: characters[charname]["srcpath"],
                alt: charname
            });
            characterImg.addClass("battleCharacterImgs");
            characterImg.appendTo(enemies);
        }
    }
    enemies.css({ width: "400px", display: "block", float: "right" });
    $("#gameSpace").append(enemies);

    // battlefield i'm drunk lol
    var battleSpace = $("<opponentSpace>");
    battleSpace.attr("id", "battleSpace");
    $("#gameSpace").append(battleSpace);
    //opponenet space
    var opponenet = $("<div>");
    opponenet.css({ display: "block", float: "right" });
    opponenet.text("RAWR");
    battleSpace.append(opponenet);
    //your space
    var yourspace = $("<div>");
    yourspace.attr("id", "yourSpace");
    yourspace.css({ display: "block", float: "left" });
    yourspace.text(yourcharacter);
    battleSpace.append(yourspace);
    //move characters around
}

// Basic interaction click stuff
// INLINE SCRIPT
$(document).ready(function() {
    initRPG();
});
