class Population {

    constructor(populationSize, player, mutationRate) {
        this.populationSize = populationSize
        this.mutationRate = mutationRate
        this.player = player
        this.agents = []
        this.bestFitness = 0
        this.generation = 0;
    }

    init(agents) {
        if (agents) {
            this.generation += 1;
            let newPopulation = agents.sort(function(a,b){return a.fitness - b.fitness})
            newPopulation = this.breed(newPopulation);
            newPopulation = this.mutate(newPopulation);
            this.agents = newPopulation;
        } else { // initial population, weight must be random
            for (var i = 0; i < this.populationSize; i++) {
                this.agents.push(new NeuralAi(new Player(Math.floor(Math.random() * height), this.player.team)))
            }
        }
    }

    mutate(population) {
        population.forEach(agent => {
            agent.weights.forEach(weight => {
                if (Math.random() < 0.4) {
                    weight += weight * this.mutationRate;
                } else if(Math.random() < 0.8) {
                    weight -= weight * this.mutationRate;
                }
            })
        })
        return population
    }

    crossover(child1, child2) {
        let pick = Math.floor(Math.random() * (child1.weights.length-1)) + 1;
        console.log(pick);
        let newChild1Weights = []
        let newChild2Weights = []
        for (var i = 0; i < pick; i++) {
            newChild1Weights.push(child1.weights[i])
            newChild2Weights.push(child2.weights[i]);
            console.log(newChild1Weights);
        }
        for (var i = pick; i <= child1.weights.length - 1; i++) {
            newChild1Weights.push(child2.weights[i]);
            newChild2Weights.push(child2.weights[i]);
        }
        child1.weights = newChild1Weights;
        child2.weights = newChild2Weights;
        return [child1, child2];
    }

    breed(population) {
        // we assume the population is sorted in descending fitness order
        let newPopulation = [];
        console.log(population[0]);
        for (var i = 0; i < Math.floor(population.length/2); i++) {
            let parent1 = population[i];
            let parent2 = (i < Math.floor(population.length/2) - 1) ? population[i+1] : population[0];
            let newChildren = this.crossover(parent1, parent2);
            newPopulation.push(newChildren[0]);
            newPopulation.push(newChildren[1]);
        }
        if (newPopulation.length != population.length) {
            console.log(newPopulation.length);
            throw new Error("something wrong happened with new population length");
        }
        return newPopulation;
    }


}