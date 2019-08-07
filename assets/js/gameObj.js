class Game {
    constructor() {
        this.wins = 0;
        this.losses = 0;
        this.round_num = 0;
        this.playing = true;
        this.gameSpace = $("#gameSpace");
    }
}

class TF2RPG extends Game {
    constructor() {
        super();
        this.hp = 0;
        this.ap = 0;
        this.cp = 0;
        this.characters = {
            demo: { srcpath: "assets/images/demofull.png", hp: 0, cp: 0 },
            heavy: { srcpath: "assets/images/heavyfull.png", hp: 0, cp: 0 },
            medic: { srcpath: "assets/images/medicfull.png", hp: 0, cp: 0 },
            pyro: { srcpath: "assets/images/pyrofull.png", hp: 0, cp: 0 },
            sniper: { srcpath: "assets/images/sniperfull.png", hp: 0, cp: 0 },
            solider: { srcpath: "assets/images/soldierfull.png", hp: 0, cp: 0 },
            spy: { srcpath: "assets/images/spyfull.png", hp: 0, cp: 0 },
            scout: {
                srcpath: "assets/images/scoutmebadedit.png",
                hp: 0,
                cp: 0
            },
            engineer: {
                srcpath: "assets/images/engineerfull.png",
                hp: 0,
                cp: 0
            }
        };
    }
    //Set up Game Function
    //Start game character selection
    //Set up hp, attack power and counter attack power
    initRPG() {
        //Display choose a character prompt
        //Display Character Choices
        var chooseACharacter = $("<div>");
        chooseACharacter.addClass("characterspace");
        this.gameSpace.append(chooseACharacter);
        var imgObjKeys = Object.keys(this.characters);
        for (var i = 0; i < imgObjKeys.length; i++) {
            var characterImg = $("<img />", {
                data_name: imgObjKeys[i],
                src: this.characters[imgObjKeys[i]].srcpath,
                alt: imgObjKeys[i]
            });
            characterImg.addClass("characterImgs");
            characterImg.appendTo(chooseACharacter);
        }
        return Math.floor(Math.random() * 6);
    }
    //Your attack Function
    //Their attack Function
}
