// Limitation: if the user does not click on the ball, it does not count as a miss.

// TODO: fix timerID interval increase when clicking dots;
// TODO: implement restart button.

// TODO: set Timeout to 30s before submission and test;
// TODO: set easiness to proper value before submission and test;

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
// let onEndPage; -> to be used on restart feature.
let dotOnScreen;

let timerID;
let easiness = 500;

displayStartMenu();

function handleClick(event) {
    getMouseCoordinates(event);
    isClickOnStart();
    isClickOnDot();
}

function displayStartMenu() {
    onStartPage = true;
    createStartMenuElements();
}

function isClickOnStart() {
    setTimeout(displayEndMenu, 3000);

    let clickedStartButton = clickX > 100 && clickX < 500 && clickY >   400 && clickY < 500 && onStartPage;

    if (clickedStartButton) {
        dotOnScreen = false;
        c.clearRect(0,0,600,600);
        timerID = setInterval(startRound, easiness);
        onStartPage = false;
    } 
}

function isClickOnDot() {
    let clickedOnDot = Math.sqrt(Math.pow((clickX - dotX), 2) + Math.pow((clickY - dotY), 2)) <= dotRadius;

    if (clickedOnDot) {
        // easiness -= 100; -> probable place to increase the difficulty of the game.
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

function startRound() {
    isGameOver();
    setDotPosition();
    drawDot();
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

function displayEndMenu() {
    // onEndPage = true;
    clearInterval(timerID);
    createEndMenuElements();
}




//  Helper functions

function createStartMenuElements() {
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
    c.fillStyle = 'black';
}

function createEndMenuElements() {
    c.fillStyle = 'white';
    c.fillRect(0,0,600,600);

    c.fillStyle = 'black';
    c.fillRect(100,400,400,100);

    c.font = "50px Arial";
    c.fillText('GAME OVER', 130, 80);

    c.font = "20px Arial";
    c.fillText('You can see your score below', 150, 150);
    c.fillText('Keep playing to improve it!', 150, 240);
    c.fillText('Good luck!', 150, 270);

    c.font = "20px Arial";
    c.fillStyle = 'white';
    c.fillText('Refresh page to restart', 185, 455);
    c.fillStyle = 'black';
}

function getMouseCoordinates(event) {
    clickX = event.offsetX;
    clickY = event.offsetY;
}

function setDotPosition() {
    const minXY = 20
    const maxXY = 580;

    dotX = Math.random() * (maxXY - minXY) + minXY;
    dotY = Math.random() * (maxXY - minXY) + minXY;
}

function isGameOver() {
    if (misses == 4) {
        displayEndMenu();
    }
}