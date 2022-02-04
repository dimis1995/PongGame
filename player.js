class Player {

    constructor(y,team) {
        this.y = y;
        this.team = team;
    }

    move(vel) {
        if (this.y + vel < height && this.y + vel > 0)this.y += vel;
    }

    draw() {
        fill(255);
        if (this.team == 1) {
            rect(0+5, this.y, 8, 55);
        } else {
            rect(width-10, this.y, 8, 55);
        }
    }
}