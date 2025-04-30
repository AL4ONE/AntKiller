let btnPlay = document.querySelector(".btnPlay");
let inputUsername = document.querySelector(".inputUsername");
let homeScreen = document.querySelector(".home-screen");
let gameScreen = document.querySelector(".game-screen");
let container = document.querySelector(".container");
let scoreEle = document.querySelector(".scoreEle");
let selectLevel = document.querySelector(".selectLevel");

let score = 0;
let Blocks = [];
let intervalBlock;
let intervalMove;

inputUsername.addEventListener("input", () => {
    btnPlay.disabled = inputUsername.value === "";
});

btnPlay.addEventListener('click', () => {
    homeScreen.classList.add("hide");
    gameScreen.classList.remove("hide");
    startGame();
});

function startGame() {
    score = 0;
    scoreEle.innerHTML = score;
    Blocks = [];
    container.innerHTML = ""; // bersihin block yang masih ada

    function spawnBlock() {
        let leftBlock = randomize(0, 400);
        let block = document.createElement("div");
        block.classList.add("block");
        block.style.left = leftBlock + "px";
        block.style.top = "-50px";

        block.addEventListener("click", () => {
            let index = Blocks.indexOf(block);
            if (index !== -1) {
                Blocks.splice(index, 1);
                block.remove();
                score++;
                scoreEle.innerHTML = score;
            }
        });

        Blocks.push(block);
        container.appendChild(block);
    }

    function move() {
        for (let i = Blocks.length - 1; i >= 0; i--) {
            let block = Blocks[i];
            let top = parseInt(block.style.top);
            top += 5;
            block.style.top = top + "px";
            if (top >= 700) {
                gameOver();
            }
        }
    }

    function randomize(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // clear dulu biar gak dobel interval kalau user main ulang
    clearInterval(intervalBlock);
    clearInterval(intervalMove);

    const level = selectLevel.value;
    if (level === "easy") {
        intervalBlock = setInterval(spawnBlock, 2000);
    } else if (level === "medium") {
        intervalBlock = setInterval(spawnBlock, 1000);
    } else {
        intervalBlock = setInterval(spawnBlock, 500); // hard
    }

    intervalMove = setInterval(move, 20);
}

function gameOver() {
    clearInterval(intervalBlock);
    clearInterval(intervalMove);
    alert(`Kamu kalah! Score-mu: ${score}`);
    gameScreen.classList.add("hide");
    homeScreen.classList.remove("hide");
}
