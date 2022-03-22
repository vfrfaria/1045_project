let canvas = document.getElementById('myCanvas');
let c = canvas.getContext('2d');

canvas.addEventListener('click', handleClick);

let dotX;
let dotY;
let dotDirection;

let clickX;
let clickY;

let hits;
let misses;
let hitsLabel = document.getElementById('hitsLabel').innerHTML;
let missesLabel = document.getElementById('missesLabel').innerHTML;
let gameEnded = false;

let timerID;

c.save();
createElements();

function handleClick(e) {
    clickX = e.offsetX;
    clickY = e.offsetY;
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
}

function detectClickOnStart() {
    let clickedStartButton = clickX > 100 && clickX < 500 && clickY >   400 && clickY < 500;

    if (clickedStartButton) {
        startRound();
    }
}