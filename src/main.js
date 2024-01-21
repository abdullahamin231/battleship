import Ship from './ship.js';
import Gameboard from './gameboard.js';
import Player from './player.js';
import { addBoardtoDom, playerMove } from './ui.js';

let playerShips;
let aiShips;

let placingShips = true;
let direction = 'horizontal';
let won = false;

const player = new Player();
const playerBoard = new Gameboard();
addBoardtoDom(playerBoard, 'player');

const ai = new Player();
const aiBoard = new Gameboard();
addBoardtoDom(aiBoard, 'ai');

document.getElementById('dir').addEventListener('click', function () {
  direction = direction == 'horizontal' ? 'vertical' : 'horizontal';
});

document.getElementById('start').addEventListener('click', function () {
  aiBoard.place(new Ship(5), 0, 0, 'horizontal', '.aiCell');
  aiBoard.place(new Ship(4), 1, 5, 'horizontal', '.aiCell');
  aiBoard.place(new Ship(3), 2, 3, 'horizontal', '.aiCell');
  aiBoard.place(new Ship(2), 3, 2, 'horizontal', '.aiCell');

  const playerCells = document.querySelectorAll('.playerCell');
  let shipIndex = [5, 4, 3, 2];
	let i = 0;

  playerCells.forEach((cell) => {
    cell.addEventListener('mouseover', () => {
			const x = parseInt(cell.dataset.x);
			const y = parseInt(cell.dataset.y);
      if (direction == 'horizontal') {
        if (y + shipIndex[i] <= 10) {
					for (let j = y; j < y + shipIndex[i]; j++) {
            const c = document.querySelector(
              `.playerCell[data-x="${x}"][data-y="${j}"]`,
            );
            c.classList.add('maybe');
					}
				}
			} else {
				if (x + shipIndex[i] <= 10) {
					for (let j = x; j < x + shipIndex[i]; j++) {
            const c = document.querySelector(
              `.playerCell[data-x="${j}"][data-y="${y}"]`,
            );
            c.classList.add('maybe');
					}
				}
			}
		});

    cell.addEventListener('click', function () {
			const x = parseInt(cell.dataset.x);
      const y = parseInt(cell.dataset.y);
      playerBoard.place(new Ship(shipIndex[i]), x, y, direction, '.playerCell');
			i++;
      if (i >= 4) {
        document.getElementById('result').textContent = 'BEGIN!';
				placingShips = false;
      }
			console.log(playerBoard);
		});

    cell.addEventListener('mouseout', () => {
			const x = parseInt(cell.dataset.x);
			const y = parseInt(cell.dataset.y);
			for (let j = 0; j < shipIndex[i]; j++) {
        if (direction == 'horizontal') {
          const c = document.querySelector(
            `.playerCell[data-x="${x}"][data-y="${y + j}"]`,
          );
          c.classList.remove('maybe');
				} else {
          const c = document.querySelector(
            `.playerCell[data-x="${x + j}"][data-y="${y}"]`,
          );
          c.classList.remove('maybe');
				}
			}
		});
  });
});

document.getElementById('again').addEventListener('click', function () {
	won = false;
  const pCells = document.querySelectorAll('.playerCell');
  const aCells = document.querySelectorAll('.aiCell');

  pCells.forEach((cell) => {
    if (cell.classList.contains('ship')) {
      cell.classList.remove('ship');
    } else if (cell.classList.contains('hit')) {
      cell.classList.remove('hit');
    } else if (cell.classList.contains('miss')) {
      cell.classList.remove('miss');
    } else if (cell.classList.contains('maybe')) {
      cell.classList.remove('maybe');
		}
	});
	playerBoard.reset();

  aCells.forEach((cell) => {
    if (cell.classList.contains('ship')) {
      cell.classList.remove('ship');
    } else if (cell.classList.contains('hit')) {
      cell.classList.remove('hit');
    } else if (cell.classList.contains('miss')) {
      cell.classList.remove('miss');
    } else if (cell.classList.contains('maybe')) {
      cell.classList.remove('maybe');
		}
  });
	aiBoard.reset();

	// Call the place() function if needed
	// place();
});

// ...

function turn(x, y) {
  if (placingShips) return;
  if (!placingShips) {
    playerShips = document.querySelectorAll('.playerCell.ship');
    aiShips = document.querySelectorAll('.aiCell.ship');
	}
  if (!won) {
		if (playerBoard.allShipsHit(playerShips)) {
			won = true;
      document.getElementById('result').innerHTML = 'ai won -_-';
		} else if (aiBoard.allShipsHit(aiShips)) {
			won = true;
      document.getElementById('result').innerHTML = 'PLAYER WON!!';
    } else {
      aiBoard.recieveAttack(x, y, '.aiCell');
      const [i, j] = ai.move();
      playerBoard.recieveAttack(i, j, '.playerCell');
		}
	} else {
    console.log('GAME OVER');
  }
}

// Attach the turn function to the AI cells after setting up the player's turn
const aiCells = document.querySelectorAll('.aiCell');
aiCells.forEach((cell) => {
  cell.addEventListener('click', () => {
		const x = parseInt(cell.dataset.x);
		const y = parseInt(cell.dataset.y);
    turn(x, y);
  });
});
