import Ship from "./ship.js";

export default class Gameboard {
    constructor() {
        this.board = []; // 10x10
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                this.board.push([i, j]);
            }
        }
        this.ships = [];
        this.index = 0;
        this.actualShips = [];
    }
    showShips(){
        for(let i = 0; i < this.actualShips.length; i++){
            console.log(this.actualShips[i]);
        }
    }

    place(ship, x, y, direction, which) {
        const currentIndex = this.index; // Use a separate variable
        this.actualShips[currentIndex] = ship;
    
        if (direction == "horizontal") {
            for (let i = y; i < y + ship.len; i++) {
                const cell = document.querySelector(`${which}[data-x="${x}"][data-y="${i}"]`);
                cell.classList.add("ship");
                this.ships.push([x, i, currentIndex]);
            }
        } else {
            for (let i = x; i < x + ship.len; i++) {
                const cell = document.querySelector(`${which}[data-x="${i}"][data-y="${y}"]`);
                cell.classList.add("ship");
                this.ships.push([i, y, currentIndex]);
            }
        }
        this.index += 1;
    }
    
    hitted(x, y) {
        for (let i = 0; i < this.ships.length; i++) {
            if (this.ships[i][0] == x && this.ships[i][1] == y) {
                this.actualShips[this.ships[i][2]].hits += 1;
                return true;
            }
        }
        return false;
    }
    
    

    recieveAttack(x, y, which) {
        let hit = false;
        const cell = document.querySelector(`${which}[data-x="${x}"][data-y="${y}"]`);
        if (!cell) console.log("Cell not found");
        if (this.hitted(x, y)) {
            cell.classList.add("hit");
            hit = true;
        }
        console.log(hit);
        if (!hit) {
            cell.classList.add("miss");
        }
    }

    allSunk() {
        console.log("Checking for winner");
        for(let i = 0; i < this.actualShips.length; i++){
            if(this.actualShips[i].hits != this.actualShips[i].len){
                return false;
            }
        }
        return true;
    }

    print() {
        for (let i = 0; i < this.board.length; i++) {
            console.log(this.board[i]);
        }
    }
}
