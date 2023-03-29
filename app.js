const tileDisplay = document.querySelector(".tile-container");
const keyboard = document.querySelector(".key-container");

const wordle = "super";
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
    "<<",
];

let currentRow = 0;

let currentTile = 0;

const guessRows = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowEl = document.createElement("div");
    rowEl.setAttribute("id", "guessRow-" + guessRowIndex);
    guessRow.forEach((guess, guessIndex) => {
        const tileEl = document.createElement("div");
        tileEl.setAttribute(
            "id",
            "guessRow-" + guessRowIndex + "-tile-" + guessIndex
        );
        tileEl.classList.add("tile");
        rowEl.append(tileEl);
    });
    tileDisplay.append(rowEl);
});

keys.forEach((key) => {
    const buttonEl = document.createElement("button");
    buttonEl.textContent = key;
    buttonEl.setAttribute("id", key);
    buttonEl.addEventListener("click", () => handleClick(key));
    keyboard.append(buttonEl);

    const addLetter = (letter) => {
        if (currentTile < 5 && currentRow < 6) {
            const tile = document.getElementById(
                "guessRow-" + currentRow + "-tile-" + currentTile
            );
            tile.textContent = letter;
            guessRows[currentRow][currentTile] = letter;
            tile.setAttribute("data", letter);
            currentTile++;
            console.log("guessRows", guessRows);
        }
    };

    const handleClick = (letter) => {
        console.log("clicked", letter);
        if (letter === "<<") {
            deleteLetter();
            return;
        }
        if (letter === "ENTER") addLetter(letter);
        addLetter(letter);
        console.log("check row for matches");
        return;
        addLetter(letter);
    };
});

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
