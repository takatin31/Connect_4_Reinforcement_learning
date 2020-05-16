var circleRadius = 100
var circlesMatrix = []
var circles = []
var bannedCircles = []
var turn = 1
var cpt = 0

function setup(){
    createCanvas(820, 700)
    background(54, 107, 255)
    fill(230)
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
}

function draw(){

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
    let i = position.y
    let index = i*7+j
    

    if (circles[index] == 0){
        circle((circleRadius + 15)*j + circleRadius/2 + 10, (circleRadius + 15)*i + circleRadius/2 + 10,circleRadius,circleRadius)
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

function verifyAll(){
    for (let i = 0 ; i < 6; i++ ){
        for (let j = 0 ; j < 7; j++){
            if (circlesMatrix[i][j] == turn && bannedCircles[i][j] != 1){
                for (let dir = 0; dir < 8; dir++){
                    let sum = verifyCase(i, j, dir, turn)
                    if (sum == 4 || sum == -4){
                        console.log("winner is "+turn)
                    }
                }
            }
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