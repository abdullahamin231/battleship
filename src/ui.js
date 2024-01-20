
function addBoardtoDom(board, which){
    const div = document.getElementById(which);
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            const cell = document.createElement("div");
            cell.dataset.x = i;
            cell.dataset.y = j;

            if(which == "ai") cell.classList.add("aiCell");
            else cell.classList.add("playerCell");

            cell.classList.add("cell");
            div.appendChild(cell);
        }
    }
}

const playerMove = (callback) => {
    const aiCells = document.querySelectorAll(".aiCell");
    aiCells.forEach(cell => {
        cell.addEventListener("click", () => {
            const x = cell.dataset.x;
            const y = cell.dataset.y;
            callback(x, y);
        });
    });
};



export {addBoardtoDom, playerMove};
