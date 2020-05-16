var circleRadius = 100
var circlesMatrix = []
var circles = []
var bannedCircles = []
var turn = 1
var cpt = 0
const TOTAL = 10;
const nbrGames = 10000
var cptGames = 0
var end = 0
let brainJSON
let nbrWinsC1 = 0
let nbrWinsC2 = 0
var computers = []
var savedComputers = []
var epoch = 0
var tops = []


function preload(){
    brainJSON = loadJSON("AI.json")
}


function setup(){
    createCanvas(820, 700)
    init()

   
    
    let computerBrain = NeuralNetwork.deserialize(brainJSON)

    computer1 = new Computer(computerBrain)
    computer2 = new Computer(computerBrain)
    computerPlay()
}

function draw(){
    frameRate(1000);
    
    for (let i = 0 ; i < 1000; i++){
        if (end == 0){
        computerPlay()
    }
    }
    
}

function keyPressed() {
    if (key === 'S') {
      saveJSON(computer1.brain, 'AI.json');
    }
  }

function init(){
    background(54, 107, 255)
    fill(230)
    tops = []
    circlesMatrix = []
    circles = []
    bannedCircles = []
    turn = 1
    end = 0
    for (let i = 0 ; i < 6; i++ ){
        circlesMatrix[i] = []
        bannedCircles[i] = []
        for (let j = 0 ; j < 7; j++){
            circle((circleRadius + 15)*j + circleRadius/2 + 10, (circleRadius + 15)*i + circleRadius/2 + 10,circleRadius,circleRadius)
            circles.push(0)
            circlesMatrix[i][j] = 0
            bannedCircles[i][j] = 0
        }
    }

    for (let i = 0 ; i < 7; i++){
        tops[i] = 0
    }
}

function computerPlay(){
    let index = -1

    if (turn == 1){
        index = computer1.think(circles)
    }else{
        index = computer2.think(circles)
    }

    

    if (turn == 1)
        fill(255, 255, 0)
    else
        fill(255, 0, 0)
    let j =index

    if (tops[index] < 6){
        let i = tops[index]
        tops[index]++
        circle((circleRadius + 15)*j + circleRadius/2 + 10, (circleRadius + 15)*(5-i) + circleRadius/2 + 10,circleRadius,circleRadius)
        circles[index] = turn
        circlesMatrix[i][j] = turn
        cpt = 0
        for (let i = 0 ; i < 6; i++ ){
            for (let j = 0 ; j < 7; j++){
                bannedCircles[i][j] = 0
            }
        }
        verifyAll()
        turn *= -1
    }
}

function getCircle(posX, posY){
    let i = floor((posX - 10 )/(circleRadius+15))
    let j = floor((posY - 10 )/(circleRadius+15))
    let position = createVector(i, j)
  
    return position
}

function mouseClicked(){
    let position = getCircle(mouseX, mouseY)
    
    if (turn == 1)
        fill(255, 255, 0)
    else
        fill(255, 0, 0)

    
    let j = position.x
    
    let index = j
    
  
    
    if (tops[index] < 6){
        let i = tops[index]
        tops[index]++
        console.log(i);
        circle((circleRadius + 15)*j + circleRadius/2 + 10, (circleRadius + 15)*(5-i) + circleRadius/2 + 10,circleRadius,circleRadius)
        circles[i*7+j] = turn
        circlesMatrix[i][j] = turn
        cpt = 0
        for (let i = 0 ; i < 6; i++ ){
            for (let j = 0 ; j < 7; j++){
                bannedCircles[i][j] = 0
            }
        }
        verifyAll()
        turn *= -1
        if (end == 0){
            computerPlay()
        }
    }
   
}

function verifyAll(){
    let cptEmptyCases = 0
    for (let i = 0 ; i < 6; i++ ){
        for (let j = 0 ; j < 7; j++){
            if (circlesMatrix[i][j] == 0){
                cptEmptyCases++
            }
            if (circlesMatrix[i][j] == turn && bannedCircles[i][j] != 1){
                for (let dir = 0; dir < 8; dir++){
                    let sum = verifyCase(i, j, dir, turn)
                    if (sum == 4 || sum == -4){    
                        end = 1
                        if (turn == 1){
                            nbrWinsC1++
                        }else{
                            nbrWinsC2++
                        }
                        //console.log("winner is "+turn)
                        nextGeneration()
                    }
                }
            }
        }
    }
    if (cptEmptyCases == 0){
        nextGeneration()
    }
}

function nextGeneration(){
    
    cptGames++
    if (cptGames%1000 == 0){
        epoch++
        console.log("epoch : "+epoch);
    }
    
    
    
    if (cptGames < nbrGames){
        init()
        if (turn == 1){
            computer2 = new Computer(computer1.brain)
            computer2.mutate()
        }else{
            computer1 = new Computer(computer2.brain)
            computer1.mutate()
        }
    }else{
        console.log(nbrWinsC1 + "   " + nbrWinsC2);
        
        if (nbrWinsC1 > nbrWinsC2){
            saveJSON(computer1.brain, 'AI.json');
        }else{
            saveJSON(computer2.brain, 'AI.json');
        }
    }
    
   
}

function verifyCase(i, j, dir, turn){
    cpt++
    //console.log(cpt);
    
    let nextI = -1
    let nextJ = -1
    switch(dir){
        case 0:
            nextI = i - 1
            nextJ = j - 1
            break
        case 1:
            nextI = i - 1
            nextJ = j 
            break
        case 2:
            nextI = i - 1 
            nextJ = j + 1
            break
        case 3:
            nextI = i 
            nextJ = j + 1
            break
        case 4:
            nextI = i + 1
            nextJ = j + 1
            break
        case 5:
            nextI = i + 1
            nextJ = j
            break
        case 6:
            nextI = i + 1
            nextJ = j - 1
            break
        case 7:
            nextI = i 
            nextJ = j - 1
            break
    }

    if (nextI < 6 && nextI >= 0 && nextJ < 7 && nextJ >= 0){
        if (circlesMatrix[i][j] != turn){
            bannedCircles[i][j] = 1
            return 0
        }else{
            return circlesMatrix[i][j] + verifyCase(nextI, nextJ, dir, turn)
        }
    }else{
        bannedCircles[i][j] = 1
        return 0
    }
}