function mutate(x) {

    if (random(1) < 0.1) {
        let offset = randomGaussian() * 0.5;
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}


function Computer(brain) {

    this.score = 0;
    this.fitness = 0;

    if (brain) {
        this.brain = brain.copy();
    } else {
        this.brain = new NeuralNetwork(42, 30, 7);
    }

    this.copy = function() {
        return new Player(this.brain);
    }

    this.mutate = function() {
        this.brain.mutate(0.1);
    }

    this.think = function(circles) {

        let output = this.brain.predict(circles);
        let max = 0
        let index = -1

        for (let i = 0 ; i < 7; i++){
          
            if (output[i] >= max && tops[i] < 6){
                index = i
                max = output[index]
            }
            
        }

        return index
    }
}