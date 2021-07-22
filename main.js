import {Circle} from './DomClasses/circle.js'
import { removeCircleFromDom, addCircleToDom } from './DomClasses/domInteractions.js'
// Start button logic

const startWrapper = (function(){

    let isStartButtonEnable = true
    let bounceInterval 
    let circlesElements = []
    let bounceDiv = document.getElementById("bounceDiv")
    let ballCountInput = document.getElementById("ballCountInput")

    const animationInterval = 16.6
    
    return function(){
        document.getElementById("startButton").addEventListener("click", function(){
            if(isStartButtonEnable){
                this.innerText = "Stop"
                let ballsNumber = parseInt(ballCountInput.value)
        
                let {width:widthBounceDiv,height:heightBounceDiv,left:leftBounceDiv,top:topBounceDiv} = bounceDiv.getBoundingClientRect();
                
                for(let i=0;i<ballsNumber;i++){
                    let newCircle = new Circle(widthBounceDiv,heightBounceDiv,leftBounceDiv,topBounceDiv)
                    circlesElements.push(newCircle)
                    addCircleToDom(newCircle,bounceDiv)
                }
                
        
                bounceInterval = setInterval(()=>{
                    let {top:topBounceDiv,left:leftBounceDiv,bottom:bottomBounceDiv,right:rightBounceDiv} = bounceDiv.getBoundingClientRect();
                    circlesElements.forEach((circle)=>{
                        circle.moveCircle(leftBounceDiv,rightBounceDiv,topBounceDiv,bottomBounceDiv)
                    })
                },animationInterval)
                isStartButtonEnable = !isStartButtonEnable
            } else {
                this.innerText = "Bounce"
                clearInterval(bounceInterval)
                let removeInterval = setInterval(function(){
                    circlesElements.forEach((circle)=>{
                        circle.scaleDown()
                    
                    })
                    circlesElements = circlesElements.filter((circle)=>{
                        if(circle.circleRadius > 10)
                        {
                            return true;
                        } else {
                            removeCircleFromDom(circle,bounceDiv)
                            return false;
                        }
                    })
        
                    if(!circlesElements.length){
                        isStartButtonEnable = !isStartButtonEnable
                        clearInterval(removeInterval)
                    }
        
                },animationInterval)
            }    
        });        
    }
})()()



// Animation 
const bounceAnimation = [
{color: 'coral'},
{color: 'rgb(250, 238, 76)', transform: 'translateX(-45px) translateY(25px)'},
{color: 'rgb(61, 236, 114)', transform: 'translateX(45px) translateY(25px)'},
{color: 'rgb(58, 158, 204)', transform: 'translateX(45px) translateY(-25px)'},
{color: 'rgb(221, 56, 180)', transform: 'translateX(-45px) translateY(-25px)'},
{color: 'coral'}
];

document.getElementById("title").addEventListener("click", function(){
    this.animate(bounceAnimation, {
        duration: 2000,
        iterations: 3
      });
    
});
