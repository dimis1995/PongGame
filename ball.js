class pingPongBall {

    constructor(x,y) {
        this.pos = createVector(x,y);
        this.vel = createVector(1,1);
        this.multiplier = 2;
    }

    update() {
        if (this.pos.y + 20 >= height) {
            this.vel.y = - this.vel.y;
        } 
        if (this.pos.y <= 0) {
            this.vel.y = - this.vel.y;
        }
        this.pos.x += this.vel.x * this.multiplier;
        this.pos.y += this.vel.y * this.multiplier;
    }

    draw() {
        fill(255);
        rect(this.pos.x, this.pos.y, 20, 20);
    }
}