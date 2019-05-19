const Char = require('./Char');


class Player {
    constructor(userID, displayName){
        this.userID = userID;
        this.displayName = displayName;

        this.char = new Char("tempVal");

    }



    Print(){
        console.log(this);
    }
}


module.exports = Player;