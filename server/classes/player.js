"use strict";

require('./character.js')

var Player = class Player {
    constructor(userID, displayName, char){
        this._userID = userID;
        this._displayName = displayName;
        this._char = char;
    }

    get userID(){
        return this._userID;
    }

    get name(){
        return this._displayName;
    }

    get position(){
        return this._char.position;
    }

    set position(pos){
        this._char.position = pos;
    }

    get char(){
        return this._char;
    }

    set char(char){
        return this._char;
    }


}

module.exports = Player;