function nextGeneration() {
    console.log("next generation");
    calculateFitness();

    for (let i = 0; i < TOTAL; i++) {
        computer[i] = poolSelection();
    }
    savedComputers = [];
}

function pickOne() {
    let computer = random(savedComputers);
    let child = new Computer(computer.brain);
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
        r -= savedComputers[index].fitness;
        // And move on to the next
        index += 1;
    }

    // Go back one
    index -= 1;

    let computer = savedComputers[index];
    let child = new Computer(computer.brain);
    child.mutate();
    return child;

    // Make sure it's a copy!
    // (this includes mutation)

}


function calculateFitness() {

    let sum = 0;
    for (computer of savedComputers) {
        sum += computer.score;
    }

    for (computer of savedComputers) {
        computer.fitness = computer.score / sum;
    }
}