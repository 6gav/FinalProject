"use strict";

require('./character.js')

var Player = class Player {
    constructor(userID, displayName, char){
        this._userID = userID;
        this._displayName = displayName;
        this.char = char;
    }

    get userID(){
        return this._userID;
    }

    get name(){
        return this._displayName;
    }

    get position(){
        return this.char.position;
    }

    set position(pos){
        this.char.position = pos;
    }


}

module.exports = Player;