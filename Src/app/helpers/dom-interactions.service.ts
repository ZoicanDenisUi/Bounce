import { Injectable } from '@angular/core';
import { Circle } from '../helpingClasses/circle';
import { GetImagesService } from './get-images.service';
import { randomIntFromInterval } from './mathHelper';

interface DivValues{
  width:number,
  height:number,
  top:number,
  bottom:number,
  left:number,
  right:number
}

@Injectable({
  providedIn: 'root'
})
export class DomInteractionsService {
  
  private parentDiv!:HTMLDivElement;

  constructor() {}

  initialize(dom:HTMLDivElement){
    this.parentDiv = dom
  }
  
  updateCirclePositionInDom (circleDom:HTMLDivElement, x:number, y:number) {
    // eslint-disable-next-line no-param-reassign
    circleDom.style.left = `${x}px`
    // eslint-disable-next-line no-param-reassign
    circleDom.style.top = `${y}px`
  }

  updateCircleRadiusInDom (circleDom:HTMLDivElement, newRadius:number) {
    // eslint-disable-next-line no-param-reassign
    circleDom.style.width = `${newRadius}px`
    // eslint-disable-next-line no-param-reassign
    circleDom.style.height = `${newRadius}px`
  }

  getDomValues(dom:HTMLDivElement):DivValues{
    const widthBounceDiv = dom.offsetWidth
    const heightBounceDiv = dom.offsetHeight

    const topBounceDiv = dom.offsetTop  
    const leftBounceDiv = dom.offsetLeft 
    const rightBounceDiv = leftBounceDiv+widthBounceDiv
    const bottomBounceDiv = topBounceDiv+heightBounceDiv

    return {width:widthBounceDiv,height:heightBounceDiv,top:topBounceDiv,bottom:bottomBounceDiv,left:leftBounceDiv,right:rightBounceDiv}
  }


  addClickEventToCircle(circle:Circle,fn:(circle:Circle)=>any){
    circle.dom.addEventListener('click',()=>{
      fn(circle)
    })
  }

  addCircleToDom (circleDom:HTMLDivElement) {
    this.parentDiv.append(circleDom)
  }

  removeCircleFromDom (circleDom:HTMLDivElement) {
    this.parentDiv.removeChild(circleDom)
  }

  setRandomBackground(circleDom:HTMLDivElement){
    const gradientDirection:number = randomIntFromInterval(0,360)
    
    const colorRed1:number = randomIntFromInterval(0,255)
    const colorGreen1:number = randomIntFromInterval(0,255)
    const colorBlue1:number = randomIntFromInterval(0,255)

    const colorRed2:number = randomIntFromInterval(0,255)
    const colorGreen2:number = randomIntFromInterval(0,255)
    const colorBlue2:number = randomIntFromInterval(0,255)

    circleDom.style.backgroundImage = `linear-gradient(${gradientDirection}deg, rgba(${colorRed1},${colorGreen1},${colorBlue1}), rgba(${colorRed2},${colorGreen2},${colorBlue2}))`
  }

  setImageBackground(circleDom:HTMLDivElement,backgroundImage:string | ArrayBuffer | null){
    circleDom.style.backgroundImage = `url('${backgroundImage}')`
  }

  createCircleDomElement (circleRadius:number):HTMLDivElement {
  
    const newDiv:HTMLDivElement = document.createElement('div')
  
    newDiv.classList.add('circle')
    newDiv.style.width = `${circleRadius}px`
    newDiv.style.height = `${circleRadius}px`
  
    return newDiv
  }
}
