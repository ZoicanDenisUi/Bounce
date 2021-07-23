import {Circle} from './DomClasses/circle.js'
import { removeCircleFromDom, createCircleDomElement ,addCircleToDom, initialize,updateCirclePositionInDom,updateCircleRadiusInDom } from './DomClasses/domInteractions.js'
// Start button logic

initialize(document.getElementById("bounceDiv"))

const startWrapper = (function(){

    let isStartButtonEnable = true
    let bounceInterval 
    let circlesElements = []
    const bounceDiv = document.getElementById("bounceDiv")
    const ballCountInput = document.getElementById("ballCountInput")

    const SIXTY_FPS = 1000/60

    return function(){
        document.getElementById("startButton").addEventListener("click", function(){
            if(isStartButtonEnable){
                this.innerText = "Stop"
                const ballsNumber = parseInt(ballCountInput.value)
        
                const {width:widthBounceDiv,height:heightBounceDiv,left:leftBounceDiv,top:topBounceDiv} = bounceDiv.getBoundingClientRect();
                
                for(let i=0;i<ballsNumber;i++){
                    const newCircle = new Circle(createCircleDomElement(),widthBounceDiv,heightBounceDiv,leftBounceDiv,topBounceDiv)
                    circlesElements.push(newCircle)
                    addCircleToDom(newCircle.dom,bounceDiv)
                }
                
        
                bounceInterval = setInterval(()=>{
                    console.log("Hello")
                    const {top:topBounceDiv,left:leftBounceDiv,bottom:bottomBounceDiv,right:rightBounceDiv} = bounceDiv.getBoundingClientRect();
                    circlesElements.forEach((circle)=>{
                        circle.moveCircle(leftBounceDiv,rightBounceDiv,topBounceDiv,bottomBounceDiv)
                        updateCirclePositionInDom(circle.dom,circle.x,circle.y)
                    })
                },SIXTY_FPS)
                isStartButtonEnable = !isStartButtonEnable
            } else {
                this.innerText = "Bounce"
                clearInterval(bounceInterval)
                const removeInterval = setInterval(function(){
                    circlesElements.forEach((circle)=>{
                        circle.scaleDown()
                        updateCircleRadiusInDom(circle.dom,circle.circleRadius)
                        updateCirclePositionInDom(circle.dom,circle.x,circle.y)
                    })
                    circlesElements = circlesElements.filter((circle)=>{
                        if(circle.circleRadius > 10)
                        {
                            return true;
                        } else {
                            removeCircleFromDom(circle.dom)
                            return false;
                        }
                    })
        
                    if(!circlesElements.length){
                        isStartButtonEnable = !isStartButtonEnable
                        clearInterval(removeInterval)
                    }
        
                },SIXTY_FPS)
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
