function nextGeneration() {
    console.log("next generation");
    calculateFitness();

    for (let i = 0; i < TOTAL; i++) {
        birds[i] = poolSelection();
    }
    savedBirds = [];
}

function pickOne() {
    let bird = random(savedBirds);
    let child = new Bird(bird.brain);
    //child.mutate();
    return child;
}

function poolSelection() {
    // Start at 0
    let index = 0;

    // Pick a random number between 0 and 1
    let r = random(1);

    // Keep subtracting probabilities until you get less than zero
    // Higher probabilities will be more likely to be fixed since they will
    // subtract a larger number towards zero
    while (r > 0) {
        r -= savedBirds[index].fitness;
        // And move on to the next
        index += 1;
    }

    // Go back one
    index -= 1;

    let bird = savedBirds[index];
    let child = new Bird(bird.brain);
    child.mutate();
    return child;

    // Make sure it's a copy!
    // (this includes mutation)

}


function calculateFitness() {

    let sum = 0;
    for (bird of savedBirds) {
        sum += bird.score;
    }

    for (bird of savedBirds) {
        bird.fitness = bird.score / sum;
    }
}