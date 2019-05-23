class Char{
    constructor(){
        this.position = {x: null, y: null};
        this.target = {x: null, y: null};
        this.max = 0;
        
    }

    Update(){

        var newPos = {x: this.position.x + this.target.x, y: this.position.y + this.target.y};
        if(newPos.x >= 0 && newPos.x < this.max){
            this.position.x = newPos.x;
        }
        if(newPos.y >= 0 && newPos.y < this.max){
            this.position.y = newPos.y;
        }
    }
}

module.exports = Char;