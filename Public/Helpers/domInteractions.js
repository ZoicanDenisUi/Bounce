import { randomIntFromInterval } from "./mathHelper.js";
let parentDiv;
export function initialize(newDiv) {
    parentDiv = newDiv;
}
export function updateCirclePositionInDom(circleDom, x, y) {
    circleDom.style.left = x + "px";
    circleDom.style.top = y + "px";
}
export function addCircleToDom(circleDom) {
    parentDiv.append(circleDom);
}
export function removeCircleFromDom(circleDom) {
    parentDiv.removeChild(circleDom);
}
export function updateCircleRadiusInDom(circleDom, newRadius) {
    circleDom.style.width = newRadius + "px";
    circleDom.style.height = newRadius + "px";
}
export function createCircleDomElement(circleRadius) {
    const gradientDirection = randomIntFromInterval(0, 360);
    const colorRed1 = randomIntFromInterval(0, 255);
    const colorGreen1 = randomIntFromInterval(0, 255);
    const colorBlue1 = randomIntFromInterval(0, 255);
    const colorRed2 = randomIntFromInterval(0, 255);
    const colorGreen2 = randomIntFromInterval(0, 255);
    const colorBlue2 = randomIntFromInterval(0, 255);
    const newDiv = document.createElement("div");
    newDiv.classList.add("circle");
    newDiv.style.width = circleRadius + "px";
    newDiv.style.height = circleRadius + "px";
    newDiv.style.backgroundImage = `linear-gradient(${gradientDirection}deg, rgba(${colorRed1},${colorGreen1},${colorBlue1}), rgba(${colorRed2},${colorGreen2},${colorBlue2}))`;
    return newDiv;
}
