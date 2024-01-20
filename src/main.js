import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import {addBoardtoDom, playerMove} from "./ui.js";

const player = new Player();
const playerBoard = new Gameboard();
addBoardtoDom(playerBoard, "player");
playerBoard.place(new Ship(5), 0, 0, "horizontal", ".playerCell");
playerBoard.place(new Ship(4), 1, 0, "horizontal", ".playerCell");
playerBoard.place(new Ship(3), 2, 0, "horizontal", ".playerCell");
playerBoard.place(new Ship(2), 3, 0, "horizontal", ".playerCell");

const ai = new Player();
const aiBoard = new Gameboard();
addBoardtoDom(aiBoard, "ai");
aiBoard.place(new Ship(5), 0, 0, "horizontal", ".aiCell");
aiBoard.place(new Ship(4), 1, 0, "horizontal", ".aiCell");
aiBoard.place(new Ship(3), 2, 0, "horizontal", ".aiCell");
aiBoard.place(new Ship(2), 3, 0, "horizontal", ".aiCell");

/*
start button
-> modal popup [ todo ]
-> user place karega ships [ todo ]

game:
-> usermove: click on aicell
-> take x,y of ai cell, give it to receieveattack function in gameboard
-> recievaeattack will also change color  of cell depending on if it is a ship or a miss
*/



function turn(){
    aiBoard.showShips();
    if(playerBoard.allSunk()){
        document.getElementById("result").innerHTML = "ai won";
    } else if(aiBoard.allSunk()){
        document.getElementById("result").innerHTML = "player won";
    } else {
        playerMove((x, y) => {
            aiBoard.recieveAttack(x, y, ".aiCell");
        });
        const [i,j] = ai.move();
        playerBoard.recieveAttack(i, j, ".playerCell");
    }
    
}

const aiCells = document.querySelectorAll(".aiCell");
aiCells.forEach(cell => {
    cell.addEventListener("click", turn)
});



