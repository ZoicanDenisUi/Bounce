import { randomIntFromInterval } from "../Helpers/mathHelper.js"

export function updateCirclePositionInDom(circle,x,y){
    circle.dom.style.left=x+"px"
    circle.dom.style.top=y+"px"

    circle.x = x
    circle.y = y
}

export function addCircleToDom(circle,dom){
    dom.append(circle.dom)
}

export function removeCircleFromDom(circle,dom){
    dom.removeChild(circle.dom)
}

export function updateCircleRadiusInDom(circle,newRadius){
    circle.dom.style.width = newRadius+"px"
    circle.dom.style.height = newRadius+"px"
    circle.circleRadius = newRadius
}


export function createCircleDomElement(circleRadius){

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