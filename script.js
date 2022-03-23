let canvas = document.getElementById('myCanvas');
canvas.addEventListener('click', handleClick);

let c = canvas.getContext('2d');

let dotX;
let dotY;
const dotRadius = 20;

let clickX;
let clickY;

let hits = 0;
let misses = 0;
let hitsLabel = document.getElementById('hitsLabel');
let missesLabel = document.getElementById('missesLabel');

let onStartPage;
let dotOnScreen;

let timerID;
// let easyness = 2000;

displayStart();

function handleClick(event) {
    // TODO: move game logic here
    getMouseCoordinates(event);
    detectClickOnStart();
}

function displayStart() {
    onStartPage = true;

    c.beginPath();
    c.fillRect(100,400,400,100);

    c.font = "36px Arial";
    c.fillText('Hand-eye coordination trainer', 50, 50);

    c.font = "20px Arial";
    c.fillText('You have 30 seconds to click on', 150, 150);
    c.fillText('as many dots as you can!', 150, 180);
    c.fillText('The faster you click, the faster it gets...', 150, 240);
    c.fillText('Good luck!', 150, 270);

    c.font = "50px Arial";
    c.fillStyle = 'white';
    c.fillText('START', 220, 470);
}

function getMouseCoordinates(event) {
    clickX = event.offsetX;
    clickY = event.offsetY;
}

function detectClickOnStart() {
    let gameOver = isGameOver();
    let clickedStartButton = isClickOnStart();
    let clickedOnDot = isClickOnDot();

    if (gameOver) {
        endGame();
    }

    if (clickedStartButton) {
        dotOnScreen = false;
        c.clearRect(0,0,600,600);
        timerID = setInterval(startRound, easyness);
        onStartPage = false;
    }

    // TODO: fix timerID interval;
    if (clickedOnDot) {
        // easyness -= 100;
        hits++;
        hitsLabel.innerHTML = 'HITS: ' + hits;
        c.clearRect(0,0,600,600);
        dotOnScreen = false;
    }

    if (dotOnScreen && !onStartPage) {
        misses++;
        missesLabel.innerHTML = 'MISSES: ' + misses;
        c.clearRect(0,0,600,600);
        dotOnScreen = false;
    }
}

function isClickOnStart() {
    return clickX > 100 && clickX < 500 && clickY >   400 && clickY < 500 && onStartPage;
}

function isClickOnDot() {
    return Math.sqrt(Math.pow((clickX - dotX), 2) + Math.pow((clickY - dotY), 2)) <= dotRadius;
}

function isGameOver() {
    return misses > 5;
}

function endGame() {
    c.clearRect(0,0,600,600);
    clearInterval(timerID);
    // Display game over page.
}

function startRound() {
    setDotPosition();
    drawDot();
}

function setDotPosition() {
    const minXY = 20
    const maxXY = 580;

    dotX = Math.random() * (maxXY - minXY) + minXY;
    dotY = Math.random() * (maxXY - minXY) + minXY;
}

function drawDot() {
    const canvasMaxXY = 600;
    const canvasMinXY = 0;

    c.clearRect(canvasMinXY,canvasMinXY,canvasMaxXY,canvasMaxXY);
    c.save();
    c.beginPath();
    c.arc(dotX, dotY, dotRadius, 0, 2 * Math.PI);
    c.fillStyle = 'black';
    c.fill();
    c.restore();
    dotOnScreen = true;
}