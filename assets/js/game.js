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
var battleGame;
var battleJumboRow;
var attackbtn;

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

    currenthp = yourtotalhp;
    currentap = yourbaseap;
}

//Set up Game Function
//Start game character selection
//Set up hp, attack power and counter attack power
function initRPG() {
    //Display Character Choices
    var chooseCharacter = $("<div>");
    chooseCharacter.addClass("chooseCharacter row ");
    gameSpace.append(chooseCharacter);
    var theEnemies = Object.keys(characters);
    var halp = $("<h2>");
    halp.addClass("py-5");
    halp.text("Choose your fighter");
    chooseCharacter.append(halp);

    //get enemy stats
    var enemyStats = generateCharacterStats(theEnemies.length);

    var cardcol = $("<div>");
    cardcol.addClass("card-columns");
    cardcol.appendTo(chooseCharacter);
    //GENERATE IMAGES and add character stats
    for (var i = 0; i < theEnemies.length; i++) {
        var charname = theEnemies[i];

        var suchACard = $("<div>");
        suchACard.addClass("card suchacard");
        suchACard.attr("data_name", charname);

        characters[charname]["enemystats"] = enemyStats[i];
        var characterImg = $("<img />", {
            src: characters[charname]["srcpath"],
            alt: charname
        });
        characterImg.addClass("characterImgs card-img-top");

        characterImg.appendTo(suchACard);
        //add character name
        var cardbody = $("<div>", {
            class: "card-body"
        });
        var cardCharName = $("<h5>", {
            class: "card-title"
        });
        cardCharName.text(charname);
        cardbody.append(cardCharName);
        cardbody.appendTo(suchACard);
        if (i == 0) {
            suchACard.addClass(
                "selectedCharacter bg-transparent border-success"
            );
            cardCharName.addClass(
                "text-success charactertext selecetedCharacterText"
            );
        }
        suchACard.appendTo(cardcol);
    }

    //Clicky image zoom
    $(".suchacard").on("click", function() {
        $(".selectedCharacter").removeClass("selectedCharacter border-success");
        $(".selecetedCharacterText").removeClass("text-success");
        $(this).addClass("selectedCharacter border-success");
        $(this)
            .children(".card-body")
            .children(".card-title")
            .addClass("text-success");
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

//set up gameplay visuals
function displayGameplay() {
    gameSpace.empty();
    battleGame = $("<div>");
    battleGame.addClass("row full-battle ");
    gameSpace.append(battleGame);

    // battlefield i'm drunk lol
    var battleSpace = $("<div>");
    battleSpace.addClass("col-md-10");
    battleGame.append(battleSpace);

    //help me
    var battleSpaceRow = $("<div>");
    battleSpaceRow.addClass("row");
    battleSpaceRow.attr("id", "battleSpace");
    battleSpace.append(battleSpaceRow);

    //battlerumbo
    var battleJumbo = $("<div>");
    battleJumbo.addClass("jumbotron");
    battleJumbo.attr("id", "battleSpace");
    battleSpaceRow.append(battleJumbo);

    //help me
    battleJumboRow = $("<div>");
    battleJumboRow.addClass("row");
    battleJumboRow.attr("id", "battleSpace");
    battleJumbo.append(battleJumboRow);

    var yourspace = $("<div>");
    yourspace.attr("id", "yourSpace");
    yourspace.addClass("col-md-6 col-sm-12 mr-auto");
    var yourspacetext = $("<h2>");
    yourspacetext.addClass("text-center align-middle ");
    yourspacetext.text("Your Fighter");
    yourspace.append(yourspacetext);
    battleJumboRow.append(yourspace);

    //your fighter card
    var suchACard = $("<div>");
    suchACard.addClass(" card my-3 you suchacard bg-transparent");
    //your name
    var yourname = $("<div>");
    yourname.addClass("card-header");
    yourname.text(yourcharacter);
    suchACard.append(yourname);
    var characterImg = $("<img />", {
        data_name: yourcharacter,
        src: characters[yourcharacter]["srcpath"],
        alt: yourcharacter,
        id: "yourfighter"
    });
    characterImg.addClass("blueteam card-img-top");
    suchACard.append(characterImg);

    // display health
    var yourdatadiv = $("<div>");
    yourdatadiv.addClass("card-body");
    var yourhealth = $("<h2>");
    yourhealth.addClass("card-title charactertext");
    yourhealth.attr("id", "yourhealth");
    yourhealth.text("HP: " + currenthp);
    yourdatadiv.append(yourhealth);
    suchACard.append(yourdatadiv);

    //display your card
    yourspace.append(suchACard);

    //attack button
    attackbtn = $("<button>");
    attackbtn.addClass("btn btn-danger btn-lg btn-block");
    attackbtn.attr("id", "attack");
    attackbtn.text("ATTACK!!!");
    attackbtn.hide();
    yourspace.append(attackbtn);
    //attack button click
    attackbtn.on("click", function() {
        if (currentopponent != null) {
            attack(currentopponent);
        }
    });

    //opponenet space
    var opponenet = $("<div>");
    opponenet.addClass("col-md-6 col-sm-12 opponentZone");
    battleJumboRow.append(opponenet);
    var choosetext = $("<h2>");
    choosetext.addClass("text-center align-middle oppspacetext");
    choosetext.text("choose an opponent");
    opponenet.append(choosetext);

    //enemies
    var enemydiv = $("<div>");
    enemydiv.addClass("col-md-2 enemies");
    var enemiestext = $("<h2>");
    enemiestext.addClass("text-center align-middle enemiesText");
    enemiestext.text("Enemies");
    enemydiv.append(enemiestext);
    var theEnemies = Object.keys(characters);

    //get enemy stats
    var enemyStats = generateCharacterStats(theEnemies.length);

    //GENERATE IMAGES and add character stats
    for (var i = 0; i < theEnemies.length; i++) {
        var charname = theEnemies[i];

        if (charname != yourcharacter) {
            var suchACard = $("<div>");
            suchACard.addClass(
                "enemybank card my-3 suchacard selectedCharacter bg-transparent"
            );
            //opponent name
            var oppname = $("<div>");
            oppname.addClass("card-header");
            oppname.text(charname);
            suchACard.append(oppname);
            //add image
            suchACard.attr("data_name", charname);
            characters[charname]["stats"] = enemyStats[i];
            var characterImg = $("<img />", {
                data_name: charname,
                src: characters[charname]["srcpath"],
                alt: charname,
                id: charname
            });
            characterImg.addClass("redteam");
            characterImg.addClass("characterImgs card-img-top");

            characterImg.appendTo(suchACard);
            //opponent health
            var oppdatadiv = $("<div>");
            oppdatadiv.addClass("card-body");
            var opphealth = $("<h2>");
            opphealth.addClass(
                "card-title charactertext selecetedCharacterText"
            );
            opphealth.attr("id", "opphealth");
            opphealth.text("HP: " + characters[charname]["enemystats"][0]);
            oppdatadiv.append(opphealth);
            suchACard.append(oppdatadiv);
            suchACard.appendTo(enemydiv);
        }
    }
    battleGame.append(enemydiv);
}

function playGame() {
    displayGameplay();
    //yourspace

    //get click to choose enemy to fight
    $(".enemybank").on("click", function() {
        if (currentopponent == null) {
            attackbtn.show();
            $(this).addClass("opponent");
            setOpponent($(this).attr("data_name"));
        }
    });

    //move characters around
}

//display opponent
function setOpponent(name) {
    $(".oppspacetext").text("Current Opponent");
    var oppzone = $(".opponentZone");
    var opp = $(".opponent");
    currentopponent = name;
    opp.appendTo(oppzone);
}

function attack(name) {
    //their stats
    var currop = characters[name];
    currop["enemystats"][0] = currop["enemystats"][0] - currentap;
    if (currop["enemystats"][0] <= 0) {
        enemies_defeated++;
        if (enemies_defeated == 8) {
            gameSpace.empty();
            var winBanner = $("<div>");
            winBanner.addClass("jumbotron");
            var winBannerText = $("<h1>");
            winBannerText.text("HUZZAH YOU WIN");
            var characterImg = $("<img />", {
                data_name: yourcharacter,
                src: characters[yourcharacter]["srcpath"],
                alt: yourcharacter,
                id: "yourfighter"
            });
            characterImg.addClass("blueteam img-fluid");
            winBanner.append(characterImg);
            winBanner.append(winBannerText);
            gameSpace.append(winBanner);
            return true;
        } else {
            currentopponent = null;
            var opp = $("#opponent");
            opp.empty();
            var oppspacetext = $("<h2>");
            oppspacetext.text("Opponent Defeated! Choose a new opponent");

            opp.append(oppspacetext);
        }
    } else {
        $("#opphealth").text("HP: " + Math.floor(currop["enemystats"][0]));
    }
    //your stats
    currentap = currentap * 1.0625;
    currenthp = currenthp - currop["enemystats"][1];
    if (currenthp > 0) {
        $("#yourhealth").text("HP: " + currenthp);
    } else {
        var you = $("#yourspace");
        you.empty();
        var youWinLose = $("<h2>");
        youWinLose.text("You Lost");
        you.append(youWinLose);
        $("#yourhealth").text("HP: " + 0 + "YOU DED");
    }
    return false;
}

// Basic interaction click stuff
// INLINE SCRIPT
$(document).ready(function() {
    initRPG();
});
