class Char {

    constructor(playerID){
        //Call to api to get character

        this.position = {x: null, y: null};
        this.health = 10;
        this.maxHealth = 10;
        this.alive = true;
        this.name = "devChar";
        
    }
}

module.exports = Char;
