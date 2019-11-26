var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height / 2;
var dx = Math.random() * 2;
var dy = Math.random() * 2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = (canvas.height - paddleWidth) / 2;
var paddle2X = (canvas.width - paddleWidth) / 2;
var paddle2Y = (canvas.height - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var secondRightPressed = false;
var secondLeftPressed = false;
var secondUpPressed = false;
var secondDownPressed = false;
var blueScore = 0;
var redScore = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
    else if (e.keyCode == 68) {
        secondRightPressed = true;
    }
    else if (e.keyCode == 65) {
        secondLeftPressed = true;
    }
    else if (e.keyCode == 38) {
        upPressed = true;
    }
    else if (e.keyCode == 40) {
        downPressed = true;
    }
    // secondUpPressed is w on the keyboard, second player is wasd
    else if (e.keyCode == 87) {
        secondUpPressed = true;
    }
    else if (e.keyCode == 83) {
        secondDownPressed = true;
    }
    //in theory this last key spacebar would be to reset
    else if (e.keyCode == 89) {
        restartPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
    else if (e.keyCode == 68) {
        secondRightPressed = false;
    }
    else if (e.keyCode == 65) {
        secondLeftPressed = false;
    }
    else if (e.keyCode == 38) {
        upPressed = false;
    }
    else if (e.keyCode == 40) {
        downPressed = false;
    }
    else if (e.keyCode == 87) {
        secondUpPressed = false;
    }
    else if (e.keyCode == 83) {
        secondDownPressed = false;
    }
    else if (e.keyCode == 89) {
        restartPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

//lower paddle, blue
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//higher paddle, red
function drawPaddle2() {
    ctx.beginPath();
    ctx.rect(paddle2X, 0, paddleWidth, paddleHeight);
    ctx.fillStyle = "#DD4800";
    ctx.fill();
    ctx.closePath();
}

//left paddle, blue
function drawPaddle3() {
    ctx.beginPath();
    ctx.rect(0, paddleY, paddleHeight, paddleWidth);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//right paddle, red
function drawPaddle4() {
    ctx.beginPath();
    ctx.rect(canvas.width - paddleHeight, paddle2Y, paddleHeight, paddleWidth);
    ctx.fillStyle = "#DD4800";
    ctx.fill();
    ctx.closePath();
}

function drawBluePoints() {
    ctx.font = '60px serif';
    ctx.fillStyle = "#0095DD";
    ctx.fillText(blueScore, canvas.width / 2 - 30, 75);
}
function drawRedPoints() {
    ctx.font = '60px serif';
    ctx.fillStyle = "#DD4800";
    ctx.fillText(redScore, canvas.width / 2 + 30, 75);
}

//draws the playing board and gets the interval going
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawPaddle2();
    drawPaddle3();
    drawPaddle4();
    drawBluePoints();
    drawRedPoints();

    // The while loops below keep track of the score
    while (y + dy > canvas.height) {
        blueScore = blueScore + 1;
        for (let i = 1; i < 10; i++) {
            setTimeout(function timer() {
            }, i * 90000);
        }
        x = canvas.width / 2;
        y = canvas.height / 2;
        dx = -Math.random() * 2;
        dy = -Math.random() * 2;
    }
    while (y + dy < 0) {
        redScore = redScore + 1;
        for (let i = 1; i < 10; i++) {
            setTimeout(function timer() {
            }, i * 3000);
        }
        x = canvas.width / 2;
        y = canvas.height / 2;
        dx = Math.random() * 2;
        dy = Math.random() * 2;
    }

    while (x + dx > canvas.width) {
        blueScore = blueScore + 1;
        for (let i = 1; i < 10; i++) {
            setTimeout(function timer() {
            }, i * 3000);
        }
        x = canvas.width / 2;
        y = canvas.height / 2;
        dx = -Math.random() * 2;
        dy = -Math.random() * 2;
    }
    while (x + dx < 0) {
        redScore = redScore + 1;
        for (let i = 1; i < 10; i++) {
            setTimeout(function timer() {
            }, i * 3000);
        }
        x = canvas.width / 2;
        y = canvas.height / 2;
        dx = Math.random() * 2;
        dy = Math.random() * 2;
    }

    // Ball to change direction hitting paddle
    // Maybe a little buggy because needs absolute values?
    if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
    }
    if (y + dy < 0 + ballRadius) {
        if (x > paddle2X && x < paddle2X + paddleWidth) {
            dy = -dy;
        }
    }
    
    if (x + dx > canvas.width - ballRadius) {
        if (y > paddleY && y < paddleY + paddleWidth) {
            dx = -dx;
        }
    }

    if (x + dx < 0 + ballRadius) {
        if (y > paddle2Y && y < paddle2Y + paddleWidth) {
            dx = -dx;
        }
    }
    // Blue Team Paddles
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    if (upPressed && paddleY > 0) {
        paddleY -= 7;
    }
    if (downPressed && paddleY < canvas.height - paddleWidth) {
        paddleY += 7;
    }

    // Red Team Paddles
    if (secondRightPressed && paddle2X < canvas.width - paddleWidth) {
        paddle2X += 7;
    }
    if (secondLeftPressed && paddle2X > 0) {
        paddle2X -= 7;
    }
    if (secondUpPressed && paddle2Y > 0) {
        paddle2Y -= 7;
    }
    if (secondDownPressed && paddle2Y < canvas.height - paddleWidth) {
        paddle2Y += 7;
    }

    x += dx;
    y += dy;
}


var interval = setInterval(draw, 10);