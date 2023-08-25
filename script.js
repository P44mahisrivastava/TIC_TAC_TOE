const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const cells = [];

// Create the game board cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cells.push(cell);
    boardElement.appendChild(cell);

    cell.addEventListener("click", () => handleCellClick(cell));
}

async function handleCellClick(cell) {
    const index = cell.dataset.index;
    const row = Math.floor(index / 3);
    const col = index % 3;

    const response = await fetch(`/api/move?row=${row}&col=${col}`, { method: "POST" });
    const result = await response.text();

    if (result === "Success") {
        updateBoard();
    } else {
        statusElement.textContent = result;
    }
}

async function updateBoard() {
    const response = await fetch("/api/board");
    const board = await response.json();

    for (let i = 0; i < 9; i++) {
        cells[i].textContent = board[Math.floor(i / 3)][i % 3];
    }
}
