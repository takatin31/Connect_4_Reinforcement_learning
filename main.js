var circleRadius = 100
var circles = []
var turn = 1

function setup(){
    createCanvas(820, 700)
    background(54, 107, 255)
    fill(230)
    for (let i = 0 ; i < 7; i++ ){
        for (let j = 0 ; j < 6; j++){
            circle((circleRadius + 15)*i + circleRadius/2 + 10, (circleRadius + 15)*j + circleRadius/2 + 10,circleRadius,circleRadius)
            circles.push(0)
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

    
    let i = position.x
    let j = position.y
    let index = i*6+j

    if (circles[index] == 0){
        circle((circleRadius + 15)*i + circleRadius/2 + 10, (circleRadius + 15)*j + circleRadius/2 + 10,circleRadius,circleRadius)
        circles[i*6+j] = turn
        console.log(circles);
        turn *= -1
    }
    
    
}