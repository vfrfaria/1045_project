// Limitation: if the user does not click on the ball, it does not count as a miss.





////////// Variables declarations //////////

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
let onEndPage;
let dotOnScreen;

// Play time in milliseconds.
let playTime = 30000;
// How frequent dots are going to be displayed on the screen (in milliseconds).
let easiness = 1500;

let timerID;

let easyButtonColor = 'black';
let intermediateButtonColor = 'black';
let hardButtonColor = 'black';





////////// Game logic //////////

displayStartMenu();

function handleClick(event) {
    getMouseCoordinates(event);
    
    if (onEndPage) {
        return;
    }
    
    chooseDifficultyLevel();
    isClickOnStart();
    isClickOnDot();
}

function chooseDifficultyLevel() {
    if (!onStartPage) {
        return;
    }

    let easyLevel = clickX > 230 && clickX < 480 && clickY > 255 && clickY < 295 && onStartPage;

    let intermediateLevel = clickX > 230 && clickX < 480 && clickY > 300 && clickY < 340 && onStartPage;

    let hardLevel = clickX > 230 && clickX < 480 && clickY > 345 && clickY < 385 && onStartPage;

    if (easyLevel) {
        easiness = 1500;
        easyButtonColor = 'red';
        intermediateButtonColor = 'black';
        hardButtonColor = 'black';
    } else if (intermediateLevel) {
        easiness = 1100;
        easyButtonColor = 'black';
        intermediateButtonColor = 'red';
        hardButtonColor = 'black';
    } else if (hardLevel) {
        easiness = 700;
        easyButtonColor = 'black';
        intermediateButtonColor = 'black';
        hardButtonColor = 'red';
    }

    displayStartMenu();
}

function displayStartMenu() {
    onStartPage = true;
    createStartMenuElements();
}

function isClickOnStart() {
    let clickedStartButton = clickX > 100 && clickX < 500 && clickY > 400 && clickY < 500 && onStartPage;

    if (clickedStartButton) {
        onStartPage = false;
        setTimeout(displayEndMenu, playTime);
        dotOnScreen = false;
        c.clearRect(0,0,600,600);

        if (timerID == null) {
            timerID = setInterval(startRound, easiness);
        }
    } 
}

function isClickOnDot() {
    let clickedOnDot = Math.sqrt(Math.pow((clickX - dotX), 2) + Math.pow((clickY - dotY), 2)) <= dotRadius;

    if (clickedOnDot) {
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
    onEndPage = true;
    clearInterval(timerID);
    timerID = null;
    createEndMenuElements();
}





//////////  Helper functions //////////

function createStartMenuElements() {
    
    // Header
    c.font = "50px Arial";
    c.fillText('Click the dots', 150, 80);

    // Intro / Objective
    c.font = "20px Arial";
    c.fillText('You have 30 seconds to click on', 150, 150);
    c.fillText('as many dots as you can!', 150, 180);

    // Difficulty level header
    c.fillText('Choose difficulty level then press start:', 150, 240);
    
    // Easy level button and text
    c.fillStyle = easyButtonColor;
    c.fillRect(230, 255, 150, 40);
    c.fillStyle = 'white';
    c.fillText('Easy', 275, 280);

    // Intermediate level button and text
    c.fillStyle = intermediateButtonColor;
    c.fillRect(230, 300, 150, 40);
    c.fillStyle = 'white';
    c.fillText('Intermediate', 250, 325);

    // Hard level button and text
    c.fillStyle = hardButtonColor;
    c.fillRect(230, 345, 150, 40);
    c.fillStyle = 'white';
    c.fillText('Hard', 275, 370);

    // Start button
    c.fillStyle = 'black';
    c.fillRect(100,400,400,100);
    c.font = "50px Arial";
    c.fillStyle = 'white';
    c.fillText('START', 220, 470);
    c.fillStyle = 'black';
}

function createEndMenuElements() {
    // Clears canvas
    c.fillStyle = 'white';
    c.fillRect(0,0,600,600);

    // Game over header
    c.fillStyle = 'black';
    c.font = "50px Arial";
    c.fillText('GAME OVER', 130, 80);

    // Text
    c.font = "20px Arial";
    c.fillText('You can see your score below', 150, 150);
    c.fillText('Keep playing to improve it!', 150, 240);
    c.fillText('Good luck!', 150, 270);

    
    // Restart info.
    c.fillStyle = 'black';
    c.fillRect(100,400,400,100);
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