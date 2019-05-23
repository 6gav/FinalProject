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
        let tempArea = Array.from(this.area);

        this.objects.forEach(obj => {
            let pos = obj.GetPosition();
            tempArea[pos.x][pos.y].objects = [];
            tempArea[pos.x][pos.y].objects.push(obj);
        });
        
        console.log(this.objects);
        return tempArea;
    }

}

module.exports = Map;