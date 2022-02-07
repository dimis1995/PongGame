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
let checkbox3;
let neuralAi;
let slider;
let population;

function setup() {
    createCanvas(840, 640);
    background(0);
    slider = createSlider(1,100,1);
    ball = new pingPongBall(width/2, height/2);
    player1 = new Player(height/2, 1);
    player2 = new Player(height/2, 2);
    evilOverlord = new Ai(player2);
    goodOverlord = new Ai(player1);
    population = new Population(10, new Player(height/2, 1), 0.01);
    population.init();
    ballHit = 0;
    player1Score = 0;
    player2Score = 0;
    checkbox1 = createCheckbox('enable AI for player1', true);
    checkbox2 = createCheckbox('enable AI for player2', true);
    checkbox3 = createCheckbox('enable Genetic Algorithm for player1', false);
    textSize(30);
}

function draw() {
    background(0);
    for (var n = 1; n <= slider.value(); n++) {
        ball.draw();
        ball.update();
        if (!checkbox3.checked()) { player1.draw(); }
        player2.draw();
        if (checkbox3.checked()) {
            population.agents.forEach(agent => {
                agent.player.draw();
                agent.think(ball);
            });
        }
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
            if(checkbox3.checked()) { population.init(population.agents); }
        }
        if (ball.pos.x <= 0+13){
            let hit = false;
            if (checkbox3.checked() ) {
                population.agents.forEach(agent => {
                    let player = agent.player;
                    if ((ball.pos.y <= player.y + 55) && (ball.pos.y >= player.y - 55)) {
                        console.log('PLAYER 1 HIT');
                        hit = true;
                        ball.vel.x = - ball.vel.x;
                        agent.ballChanceToHit(true)
                    } else {
                        agent.ballChanceToHit(false);
                    }
                })
            }
            if ((ball.pos.y <= player1.y + 55) && (ball.pos.y >= player1.y - 55)) {
                console.log('PLAYER 1 HIT');
                ballHit += 1;
                ball.vel.x = - ball.vel.x;
            }
            if (hit === true) {
                ballHit += 1;
                if (ballHit % 3 == 0) {
                    ball.multiplier += 0.4;
                    console.log(ball.multiplier);
                }
            }
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