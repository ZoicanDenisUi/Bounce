import { randomIntFromInterval } from "../Helpers/mathHelper.js"


export function scaleDownCircle(circle){
    let newRadius = (parseInt(circle.circleRadius)-2)+"px"
    circle.dom.style.width = newRadius
    circle.dom.style.height = newRadius
    circle.dom.style.left = (parseInt(circle.dom.style.left)+1)+"px"
    circle.dom.style.top = (parseInt(circle.dom.style.top)+1)+"px"

    circle.circleRadius = newRadius
}

export function moveCircle(circle,leftBounceDiv,rightBounceDiv,topBounceDiv,bottomBounceDiv){
    let circleRadius = parseInt(circle.circleRadius)
    let direction = circle.direction
    
    if(direction == 0){
        circle.x += circle.step
    } else {
        circle.x -= circle.step
    }


    circle.y += circle.slope*circle.step

    if(circle.x > rightBounceDiv - circleRadius){ // Hit the right border
        circle.direction = (direction+1)%2
        circle.x = rightBounceDiv - circleRadius
    } else if (circle.x < leftBounceDiv){ // Hit the left border
        circle.direction = (direction+1)%2
        circle.x = leftBounceDiv
    }

    if(circle.y > bottomBounceDiv - circleRadius){ // Hit the bottom border
        circle.slope *= -1;
        circle.y = bottomBounceDiv - circleRadius
        
    }  else if(circle.y < topBounceDiv){ // Hit the top border
        circle.slope *= -1;
        circle.y =  topBounceDiv
    }

    circle.dom.style.left = circle.x+"px"
    circle.dom.style.top = circle.y+"px"
}

export function createCircle(circleRadius){

    const gradientDirection = randomIntFromInterval(0,360)
    
    const colorRed1 = randomIntFromInterval(0,255)
    const colorGreen1 = randomIntFromInterval(0,255)
    const colorBlue1 = randomIntFromInterval(0,255)

    const colorRed2 = randomIntFromInterval(0,255)
    const colorGreen2 = randomIntFromInterval(0,255)
    const colorBlue2 = randomIntFromInterval(0,255)

    const newDiv = document.createElement("div");
    newDiv.classList.add("circle")
    newDiv.style.width=circleRadius+"px"
    newDiv.style.height=circleRadius+"px"
    newDiv.style.backgroundImage = `linear-gradient(${gradientDirection}deg, rgba(${colorRed1},${colorGreen1},${colorBlue1}), rgba(${colorRed2},${colorGreen2},${colorBlue2}))`

    return newDiv
}