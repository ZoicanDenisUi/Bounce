import { randomIntFromInterval } from "../Helpers/mathHelper.js"

export class Circle {
    constructor(dom,circleRadius,width,height,left,top){
        this.step = randomIntFromInterval(1,10),
        this.direction = randomIntFromInterval(0,1),
        this.slope = Math.random()

        this.dom = dom
        this.circleRadius = circleRadius
        

        this.x = left+randomIntFromInterval(0,width-this.circleRadius)
        this.y = top+randomIntFromInterval(0,height-this.circleRadius)

    }

    scaleDown(){
        const newRadius = (this.circleRadius-2)
        const newX = this.x+1
        const newY = this.y+1

        this.circleRadius = newRadius

        this.x = newX
        this.y = newY
        
    }
    moveCircle(left,right,top,bottom){

        // Calculate new x, y, slope and direction
        const circleRadius = this.circleRadius
        const direction = this.direction
        
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
    }
  }