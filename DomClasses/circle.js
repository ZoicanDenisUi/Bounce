import { createCircleDomElement, updateCirclePositionInDom, updateCircleRadiusInDom} from "./domInteractions.js"
import { randomIntFromInterval } from "../Helpers/mathHelper.js"

export class Circle {
    constructor(width,height,left,top){
        this.circleRadius = randomIntFromInterval(40,100)
        this.x = left+randomIntFromInterval(0,width-this.circleRadius)
        this.y = top+randomIntFromInterval(0,height-this.circleRadius)
        this.step = randomIntFromInterval(1,10),
        this.direction = randomIntFromInterval(0,1),
        this.slope = Math.random()

        this.dom = createCircleDomElement(this.circleRadius)
    }

    scaleDown(){
        let newRadius = (this.circleRadius-2)
        let newX = this.x+1
        let newY = this.y+1

        updateCircleRadiusInDom(this,newRadius)
        updateCirclePositionInDom(this,newX,newY)
        
    }
    moveCircle(left,right,top,bottom){

        // Calculate new x, y, slope and direction
        let circleRadius = this.circleRadius
        let direction = this.direction
        
        if(direction == 0){
            this.x += this.step
        } else {
            this.x -= this.step
        }

        this.y += this.slope*this.step

        if(this.x > right - circleRadius){ // Hit the right border
            this.direction = (direction+1)%2
            this.x = right - circleRadius
        } else if (this.x < left){ // Hit the left border
            this.direction = (direction+1)%2
            this.x = left
        }

        if(this.y > bottom - circleRadius){ // Hit the bottom border
            this.slope *= -1;
            this.y = bottom - circleRadius
            
        }  else if(this.y < top){ // Hit the top border
            this.slope *= -1;
            this.y =  top
        }

        updateCirclePositionInDom(this,this.x,this.y)
    }
  }