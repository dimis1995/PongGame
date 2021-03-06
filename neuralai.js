// work in progress
class NeuralAi {
    
    constructor(player, weights) {
        this.player = player;
        if (weights) {
            this.weights = weights
        } else {
            this.weights = [Math.random(),Math.random(),Math.random(), Math.random()];
        }
        this.previousBallX = null;
        this.previousBallY = null;
        this.previousPlayerY = null;
        this.upProbability = 0;
        this.fitness = 0;
    }

    observe(ball) {
        let currentBallX = ball.pos.x;
        let currentBallY = ball.pos.y;
        let currentPlayerY = this.player.y;
        let inputObservations = [0,0,0];
        if (this.previousBallX && this.previousBallY && this.previousPlayerY) {
            inputObservations[0] = currentBallX - this.previousBallX;
            inputObservations[1] = currentBallY - this.previousBallY;
            inputObservations[2] = currentPlayerY - this.previousPlayerY
        }
        this.previousBallX = currentBallX;
        this.previousBallY = currentBallY;
        this.previousPlayerY = currentPlayerY;

        return inputObservations;
    }

    applyNeuralNets(inputObservations) {
        return inputObservations[0]*this.weights[0] 
        + inputObservations[1]*this.weights[1] 
        + inputObservations[2] * this.weights[2] 
        + this.weights[3];
    }

    sigmoid(z) {
        return 1/ (1 + Math.exp(-z))
    }

    takeAction(probability) {
        return (Math.random() < probability) ? 1 : 2;
    }

    think(ball) {
        let inputObservations = this.observe(ball);
        this.upProbability = this.applyNeuralNets(inputObservations);
        if (this.takeAction(this.upProbability) == 1) {
            this.player.move(-25);
        } else {
            this.player.move(25);
        }
    }

    ballChanceToHit(hit) {
        if (hit == true) {
            this.fitness += 1;
        } else {
            this.fitness -= 1;
        }
    }

}