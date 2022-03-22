let canvas = document.getElementById('myCanvas');
let c = canvas.getContext('2d');

canvas.addEventListener('click', handleClick);

let dotX;
let dotY;
let dotDirection;
const dotRadius = 20;

const canvasMaxXY = 600;
const canvasMinXY = 0;

let clickX;
let clickY;

let hits = 0;
let misses = 0;
let hitsLabel = document.getElementById('hitsLabel');
let missesLabel = document.getElementById('missesLabel');

let onStartPage;
let gameEnded = false;

let timerID;
let easyness = 1000;

c.save();
createElements();

function handleClick(e) {
    getMouseCoordinates(e);
    detectClickOnStart();
}

function createElements() {
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
    onStartPage = true;
}

function detectClickOnStart() {
    let clickedStartButton = clickX > 100 && clickX < 500 && clickY >   400 && clickY < 500 && onStartPage;

    let clickedOnDot = isClickOnDot();

    if (clickedStartButton) {
        timerID = setInterval(startRound, easyness);
    }

    if (clickedOnDot) {
        easyness += 5;
        hits++;
        hitsLabel.innerHTML = 'HITS: ' + hits;
    }
}

function startRound() {
    setDotPosition();
    drawDot();
}

function setDotPosition() {
    const minXY = 20
    const maxXY = 580;
    
    // TODO random position.
    dotX = Math.random() * (maxXY - minXY) + minXY;
    dotY = Math.random() * (maxXY - minXY) + minXY;
}

function drawDot() {
    c.clearRect(canvasMinXY,canvasMinXY,canvasMaxXY,canvasMaxXY);
    c.save();
    c.beginPath();
    c.arc(dotX, dotY, dotRadius, 0, 2 * Math.PI);
    c.fillStyle = 'black';
    c.fill();
    c.restore();
}

function getMouseCoordinates(event) {
    clickX = event.offsetX;
    clickY = event.offsetY;
}

function isClickOnDot() {
    return Math.sqrt(Math.pow((clickX - dotX), 2) + Math.pow((clickY - dotY), 2)) <= dotRadius;
}