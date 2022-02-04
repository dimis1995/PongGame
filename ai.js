class Ai {

    constructor(player) {
        this.player = player;
    }

    think(pingPongBall) {
        if (this.player.team == 1 && pingPongBall.vel.x < 0) {
            if (pingPongBall.pos.y > this.player.y + 55) {
                this.player.move(25);
            } else if (pingPongBall.pos.y < this.player.y) {
                this.player.move(-25);
            }
        }
        if (this.player.team == 2 && pingPongBall.vel.x > 0) {
            if (pingPongBall.pos.y > this.player.y + 55) {
                this.player.move(25);
            } else if (pingPongBall.pos.y < this.player.y) {
                this.player.move(-25);
            }
        }
    }
}