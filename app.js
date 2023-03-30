const tileDisplay = document.querySelector(".tile-container");
const keyboard = document.querySelector(".key-container");
const messageDisplay = document.querySelector(".message-container");

const wordle = "SUPER";
const keys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "ENTER",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "«",
];

const guessRows = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement("div");
    rowElement.setAttribute("id", "guessRow-" + guessRowIndex);
    guessRow.forEach((_guess, guessIndex) => {
        const tileElement = document.createElement("div");
        tileElement.setAttribute(
            "id",
            "guessRow-" + guessRowIndex + "-tile-" + guessIndex
        );
        tileElement.classList.add("tile");
        rowElement.append(tileElement);
    });
    tileDisplay.append(rowElement);
});

keys.forEach((key) => {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = key;
    buttonElement.setAttribute("id", key);
    buttonElement.addEventListener("click", () => handleClick(key));
    keyboard.append(buttonElement);
});

const handleClick = (letter) => {
    if (!isGameOver) {
        if (letter === "«") {
            deleteLetter();
            return;
        }
        if (letter === "ENTER") {
            checkRow();
            return;
        }
        addLetter(letter);
    }
};

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById(
            "guessRow-" + currentRow + "-tile-" + currentTile
        );
        tile.textContent = letter;
        guessRows[currentRow][currentTile] = letter;
        tile.setAttribute("data", letter);
        currentTile++;
    }
};

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById(
            "guessRow-" + currentRow + "-tile-" + currentTile
        );
        tile.textContent = "";
        guessRows[currentRow][currentTile] = "";
        tile.setAttribute("data", "");
    }
};

const checkRow = () => {
    if (currentTile === 5) {
        const guess = guessRows[currentRow].join("");
        console.log("guess is " + guess, "wordle is " + wordle);
        if (wordle === guess) {
            showMessage("Great work!");
            isGameOver = true;
            return;
        } else {
            if (currentRow >= 5) {
                isGameOver = false;
                showMessage("game over");
                return;
            }
            if (currentRow < 5) {
                currentRow++;
                currentTile = 0;
            }
        }
    }
};

const showMessage = (message) => {
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000);
};

const flipTile = () => {
    const rowTiles = document.querySelector(
        "guessrow-" + currentRow
    ).childNodes;
    rowTiles.forEach((tile, index) => {
        const letterData = tiles.getAttribute("data");

        if (letterData === wordle[index]) {
            tile.classList.add("");
        }
    });
};
