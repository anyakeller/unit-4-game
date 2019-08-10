//GLOBALS

//your stats
var yourcharacter;
var yourtotalhp = 0;
var currenthp = 0;
var yourbaseap = 0;
var currentap = 0;

//general stats
var enemies_defeated = 0;

//character data
//[hp,cp]
var characters = {
    DEMO: {
        srcpath: "assets/images/demofull.png",
        enemystats: [0, 0],
        isEnemy: true
    },
    HEAVY: {
        srcpath: "assets/images/heavyfull.png",
        enemystats: [0, 0],
        isEnemy: true
    },
    MEDIC: {
        srcpath: "assets/images/medicfull.png",
        enemystats: [0, 0],
        isEnemy: true
    },
    PYRO: {
        srcpath: "assets/images/pyrofull.png",
        enemystats: [0, 0],
        isEnemy: true
    },
    SNIPER: {
        srcpath: "assets/images/sniperfull.png",
        enemystats: [0, 0],
        isEnemy: true
    },
    SOLDIER: {
        srcpath: "assets/images/soldierfull.png",
        enemystats: [0, 0],
        isEnemy: true
    },
    SPY: {
        srcpath: "assets/images/spyfull.png",
        enemystats: [0, 0],
        isEnemy: true
    },
    SCOUT: {
        srcpath: "assets/images/scoutmebadedit.png",
        enemystats: [0, 0],
        isEnemy: true
    },
    ENGINEER: {
        srcpath: "assets/images/engineerfull.png",
        enemystats: [0, 0],
        isEnemy: true
    }
};
var theEnemies; //Array of the names of the enemy characters
var totalEnemyHealth = 0;
var totalEnemyDamage = 0;

var currentopponent;

//HTML Elements
var gameSpace = $("#gameSpace");
gameSpace.css("padding", "20px");

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
    var chooseCharacter = $("<div>");
    chooseCharacter.addClass("chooseCharacter row");
    gameSpace.append(chooseCharacter);
    var theEnemies = Object.keys(characters);
    var chooserow1 = $("<div>");
    chooserow1.addClass("col-md-12");
    chooseCharacter.append(chooserow1);
    var chooserow2 = $("<div>");
    chooserow2.addClass("col-md-12");
    chooseCharacter.append(chooserow2);
    //get enemy stats
    var enemyStats = generateCharacterStats(theEnemies.length);

    //GENERATE IMAGES and add character stats
    for (var i = 0; i < theEnemies.length; i++) {
        var charname = theEnemies[i];
        characters[charname]["enemystats"] = enemyStats[i];
        var characterImg = $("<img />", {
            data_name: charname,
            src: characters[charname]["srcpath"],
            alt: charname
        });
        characterImg.addClass("characterImgs");
        if (i == 0) {
            characterImg.addClass("selectedCharacter");
        }
        if (i < 5) {
            characterImg.appendTo(chooserow1);
        } else {
            characterImg.appendTo(chooserow2);
        }
    }

    //Clicky image zoom
    $(".characterImgs").on("click", function() {
        $(".selectedCharacter").removeClass("selectedCharacter");
        $(this).addClass("selectedCharacter");
    });

    //Create confirm character button
    var confirmCharacterButton = $("<button>");
    confirmCharacterButton.text("Confirm Character and Begin");
    confirmCharacterButton.attr({ id: "confirmCharacter", type: "button" });
    confirmCharacterButton.addClass("btn btn-primary");

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
    var battleGame = $("<div>");
    battleGame.addClass("row full-battle clearfix");
    gameSpace.append(battleGame);

    // battlefield i'm drunk lol
    var battleSpace = $("<div>");
    battleSpace.addClass("col");
    battleSpace.attr("id", "battleSpace");
    battleGame.append(battleSpace);

    //help me
    var battleSpaceRow = $("<div>");
    battleSpaceRow.addClass("row");
    battleSpaceRow.attr("id", "battleSpace");
    battleSpace.append(battleSpaceRow);

    //yourspace
    var yourspace = $("<div>");
    yourspace.attr("id", "yourSpace");
    yourspace.addClass("col-md-6 col-sm-12 mr-auto");
    var yourspacetext = $("<h2>");
    yourspacetext.text("Your Fighter: " + yourcharacter);
    yourspace.append(yourspacetext);
    battleSpaceRow.append(yourspace);
    var characterImg = $("<img />", {
        data_name: yourcharacter,
        src: characters[yourcharacter]["srcpath"],
        alt: yourcharacter,
        id: "yourfighter"
    });
    characterImg.addClass("blueteam img-fluid");
    yourspace.append(characterImg);
    var yourhealth = $("<h2>");
    yourhealth.attr("id", "yourhealth");
    yourhealth.text("Your Current HP: " + currenthp);
    yourspace.append(yourhealth);

    //attack button
    var attackbtn = $("<button>");
    attackbtn.addClass("btn btn-danger");
    attackbtn.attr("id", "attack");
    attackbtn.text("ATTACK!!!");
    attackbtn.hide();
    yourspace.append(attackbtn);
    //attack button click
    attackbtn.on("click", function() {
        if (currentopponent != null) {
            console.log("attack");
            attack(currentopponent);
        }
    });

    //opponenet space
    var opponenet = $("<div>");
    opponenet.attr("id", "opponent");
    opponenet.addClass("col-md-6 col-sm-12");
    battleSpaceRow.append(opponenet);
    var choosetext = $("<h2>");
    choosetext.addClass("text-center align-middle");
    choosetext.text("choose an opponent");
    opponenet.append(choosetext);

    //enemies
    var enemydiv = $("<div>");
    enemydiv.addClass("col-4 enemies");
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
                alt: charname,
                id: charname
            });
            characterImg.addClass(
                "img-fluid enemybank battleCharacterImgs redteam"
            );
            characterImg.appendTo(enemydiv);
        }
    }
    battleGame.append(enemydiv);
    //get click to choose enemy to fight
    $(".enemybank").on("click", function() {
        if (currentopponent == null) {
            attackbtn.show();
            setOpponent($(this).attr("data_name"));
        }
    });

    //move characters around
}

//display opponent
function setOpponent(name) {
    var opp = $("#opponent");
    opp.empty();
    //opoonent name
    var oppspacetext = $("<h2>");
    oppspacetext.text("Current Opponent: " + name);
    opp.append(oppspacetext);
    //opponent image
    var characterImg = $("#" + name);
    characterImg.addClass("img-fluid redteam");
    opp.append(characterImg);
    //opponent health
    var opphealth = $("<h2>");
    opphealth.attr("id", "opphealth");
    opphealth.text("Current Opponent HP: " + characters[name]["enemystats"][0]);
    opp.append(opphealth);
    currentopponent = name;
}

function attack(name) {
    //their stats
    var currop = characters[name];
    currop["enemystats"][0] = currop["enemystats"][0] - currentap;
    if (currop["enemystats"][0] <= 0) {
        currentopponent = null;
        var opp = $("#opponent");
        opp.empty();
        var oppspacetext = $("<h2>");
        oppspacetext.text("Opponent Defeated! Choose a new opponent");
        enemies_defeated++;
        opp.append(oppspacetext);
    } else {
        $("#opphealth").text(
            "Current Opponent HP: " + Math.floor(currop["enemystats"][0])
        );
        console.log(currop["enemystats"][1]);
    }
    //your stats
    currentap = currentap * 1.0625;
    currenthp = currenthp - currop["enemystats"][1];
    if (currenthp > 0) {
        $("#yourhealth").text("Your Current Health: " + currenthp);
    } else {
        var you = $("#yourspace");
        you.empty();
        var youWinLose = $("<h2>");
        youWinLose.text("You Lost");
        you.append(youWinLose);
        $("#yourhealth").text("Your Current Health: " + 0);
    }
}

// Basic interaction click stuff
// INLINE SCRIPT
$(document).ready(function() {
    initRPG();
});
