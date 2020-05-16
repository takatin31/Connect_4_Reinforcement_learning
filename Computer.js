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
        this.brain = new NeuralNetwork(42, 30, 42);
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

        for (let i = 0 ; i < 6; i++){
            for (let j = 0 ; j < 7 ; j++){
                if (circles[i*7+j] == 0 && output[i*7+j] >= max){
                    index = i*7+j
                    max = output[index]
                }
            }
        }

        return index
    }
}