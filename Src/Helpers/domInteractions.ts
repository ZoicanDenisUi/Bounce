// eslint-disable-next-line import/extensions
import { randomIntFromInterval } from './mathHelper.js'

let parentDiv:HTMLDivElement

export function initialize (newDiv:HTMLDivElement) {
  parentDiv = newDiv
}

export function updateCirclePositionInDom (circleDom:HTMLDivElement, x:number, y:number) {
  // eslint-disable-next-line no-param-reassign
  circleDom.style.left = `${x}px`
  // eslint-disable-next-line no-param-reassign
  circleDom.style.top = `${y}px`
}

export function addCircleToDom (circleDom:HTMLDivElement) {
  parentDiv.append(circleDom)
}

export function removeCircleFromDom (circleDom:HTMLDivElement) {
  parentDiv.removeChild(circleDom)
}

export function updateCircleRadiusInDom (circleDom:HTMLDivElement, newRadius:number) {
  // eslint-disable-next-line no-param-reassign
  circleDom.style.width = `${newRadius}px`
  // eslint-disable-next-line no-param-reassign
  circleDom.style.height = `${newRadius}px`
}

export function createCircleDomElement (circleRadius:number):HTMLDivElement {
  const gradientDirection:number = randomIntFromInterval(0, 360)

  const colorRed1:number = randomIntFromInterval(0, 255)
  const colorGreen1:number = randomIntFromInterval(0, 255)
  const colorBlue1:number = randomIntFromInterval(0, 255)

  const colorRed2:number = randomIntFromInterval(0, 255)
  const colorGreen2:number = randomIntFromInterval(0, 255)
  const colorBlue2:number = randomIntFromInterval(0, 255)

  const newDiv:HTMLDivElement = document.createElement('div')

  newDiv.classList.add('circle')
  newDiv.style.width = `${circleRadius}px`
  newDiv.style.height = `${circleRadius}px`
  newDiv.style.backgroundImage = `linear-gradient(${gradientDirection}deg, rgba(${colorRed1},${colorGreen1},${colorBlue1}), rgba(${colorRed2},${colorGreen2},${colorBlue2}))`

  return newDiv
}
