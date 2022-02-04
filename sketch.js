var ball;
var player1;
var player2;
var evilOverlord;
var goodOverlord;
var ballHit;
var player1Score;
var player2Score;
let checkbox1;
let checkbox2;

function setup() {
    createCanvas(840, 640);
    background(0);
    ball = new pingPongBall(width/2, height/2);
    player1 = new Player(height/2, 1);
    player2 = new Player(height/2, 2);
    evilOverlord = new Ai(player2);
    goodOverlord = new Ai(player1);
    ballHit = 0;
    player1Score = 0;
    player2Score = 0;
    checkbox1 = createCheckbox('enable AI for player1', false);
    checkbox2 = createCheckbox('enable AI for player2', false);

    textSize(30);
}

function draw() {
    background(0);
    ball.draw();
    ball.update();
    player1.draw();
    player2.draw();
    if (checkbox2.checked()) evilOverlord.think(ball);
    if (checkbox1.checked())goodOverlord.think(ball);
    if (ball.pos.x >= width + 50) {
        console.log("Player 1 WINS!!!!");
        ball = new pingPongBall(width/2, height/2);
        player1Score += 1;
    } else if (ball.pos.x <= 0 - 50) {
        console.log("Player 2 WINS!!!!");
        ball = new pingPongBall(width/2, height/2);
        player2Score += 1;
    }
    if (ball.pos.x <= 0+13 && (ball.pos.y <= player1.y + 55) && (ball.pos.y >= player1.y - 55)) {
        console.log('PLAYER 1 HIT');
        ballHit += 1;
        if (ballHit % 3 == 0) {
          ball.multiplier += 0.4;
          console.log(ball.multiplier);
        }
        ball.vel.x = - ball.vel.x;
    } else if (ball.pos.x >= width-30 && (ball.pos.y <= player2.y + 55) && (ball.pos.y >= player2.y - 55)) {
        console.log('PLAYER 2 HIT');
        ballHit += 1;
        if (ballHit % 3 == 0) {
          ball.multiplier += 0.4;
          console.log(ball.multiplier);
        }
        ball.vel.x = - ball.vel.x;
    }
    p1score = player1Score.toString();
    p2score = player2Score.toString();
    text(p1score, width/2-65, 100); 
    text(p2score, width/2+40, 100);
    text('|', width/2-10, 100);   
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        player1.move(-25);
    } else if (keyCode === DOWN_ARROW) {
        player1.move(25);
    } else if (keyCode === 87) { // 'W'
        player2.move(-25);
    } else if (keyCode === 83) { // 'S'
        player2.move(25);
    }
}