import { createCircle } from "./domInteractions.js"
import { randomIntFromInterval } from "../Helpers/mathHelper.js"

export class Circle {
    constructor(widthBounceDiv,heightBounceDiv,leftBounceDiv,topBounceDiv){
        this.circleRadius = randomIntFromInterval(40,100)
        this.dom = createCircle(this.circleRadius)
        this.x = leftBounceDiv+randomIntFromInterval(0,widthBounceDiv-parseInt(this.circleRadius))
        this.y = topBounceDiv+randomIntFromInterval(0,heightBounceDiv-parseInt(this.circleRadius))
        this.dom.style.left=this.x+"px"
        this.dom.style.top=this.y+"px"
        this.step = randomIntFromInterval(1,10),
        this.direction = randomIntFromInterval(0,1),
        this.slope = Math.random()

    }
  }