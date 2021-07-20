import {Circle} from './DomClasses/circle.js'
import { scaleDownCircle,moveCircle } from './DomClasses/domInteractions.js'
// Start button logic

const startWrapper = (function(){

    let createBalls = true
    let bounceInterval 
    let circlesElements = []
    let bounceDiv = document.getElementById("bounceDiv")
    let ballCountInput = document.getElementById("ballCountInput")

    
    return function(){
        document.getElementById("startButton").addEventListener("click", function(){
            if(createBalls){
                this.innerText = "Stop"
                let ballsNumber = parseInt(ballCountInput.value)
        
                let {width:widthBounceDiv,height:heightBounceDiv,left:leftBounceDiv,top:topBounceDiv} = bounceDiv.getBoundingClientRect();
                
                for(let i=0;i<ballsNumber;i++){
                    let newCircle = new Circle(widthBounceDiv,heightBounceDiv,leftBounceDiv,topBounceDiv)
                    circlesElements.push(newCircle)
                    bounceDiv.append(newCircle.dom)
                }
                
        
                bounceInterval = setInterval(()=>{
                    let {top:topBounceDiv,left:leftBounceDiv,bottom:bottomBounceDiv,right:rightBounceDiv} = bounceDiv.getBoundingClientRect();
                    circlesElements.forEach((circle)=>{
                        moveCircle(circle,leftBounceDiv,rightBounceDiv,topBounceDiv,bottomBounceDiv)
                    })
                },16.6)
                createBalls = !createBalls
            } else {
                this.innerText = "Bounce"
                clearInterval(bounceInterval)
                let removeInterval = setInterval(function(){
                    circlesElements.forEach(scaleDownCircle)
                    circlesElements = circlesElements.filter((circle)=>{
                        if(parseInt(circle.circleRadius) > 10)
                        {
                            return true;
                        } else {
                            bounceDiv.removeChild(circle.dom)
                            return false;
                        }
                    })
        
                    if(!circlesElements.length){
                        createBalls = !createBalls
                        clearInterval(removeInterval)
                    }
        
                },16.6)
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
