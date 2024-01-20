export default class Ship{
    constructor(len){
        this.len = len;
        this.hits = 0;
        this.sunk = false;
        this.cords = Array(len);
    }

    hit(){
        this.hits += 1;
    }
    isSunk(){
        if(this.hits == this.len)
            return true;
        return false;
    }
}
