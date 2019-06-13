class Map{

    constructor(size){
        this.objects = [];
        this.size = size;
        this.area = [];
        for(let x = 0; x < size; x++){
            let column = [];
            for(let y = 0; y < size; y++){
                column.push({});
            }
            this.area.push(column);
        }
    }

    ExportMap(){
        
        return this.objects;
    }

}

module.exports = Map;