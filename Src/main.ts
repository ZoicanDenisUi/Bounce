import { initialize, createCircleDomElement, addCircleToDom, updateCirclePositionInDom, updateCircleRadiusInDom, removeCircleFromDom } from "./Helpers/domInteractions.js"
import { randomIntFromInterval } from "./Helpers/mathHelper.js"
import { Circle } from "./HelpingClasses/circle.js"

// Start button logic

initialize(document.querySelector("#bounceDiv")!);


(function (){
    let isStartButtonEnable:boolean = true
    let bounceInterval:number
    let circlesElements:Circle[] = []
    const bounceDiv:HTMLDivElement = document.querySelector("#bounceDiv")!
    const ballCountInput:HTMLInputElement = document.querySelector("#ballCountInput")!

    const SIXTY_FPS = 1000/60

    function createCirclesInDom(){
        const ballsNumber = parseInt(ballCountInput.value)
    
        const {width:widthBounceDiv,height:heightBounceDiv,left:leftBounceDiv,top:topBounceDiv} = bounceDiv.getBoundingClientRect();
        
        for(let i=0;i<ballsNumber;i++){
            const circleRadius = randomIntFromInterval(40,100)
            const newCircle = new Circle(createCircleDomElement(circleRadius),circleRadius,widthBounceDiv,heightBounceDiv,leftBounceDiv,topBounceDiv)
            circlesElements.push(newCircle)
            addCircleToDom(newCircle.dom)
        }
    }

    function movesCirclesAtInterval(){
        bounceInterval = setInterval(()=>{
            const {top:topBounceDiv,left:leftBounceDiv,bottom:bottomBounceDiv,right:rightBounceDiv} = bounceDiv.getBoundingClientRect();
            circlesElements.forEach((circle)=>{
                circle.moveCircle(leftBounceDiv,rightBounceDiv,topBounceDiv,bottomBounceDiv)
                updateCirclePositionInDom(circle.dom,circle.x,circle.y)
            })
        },SIXTY_FPS)
    }

    function scaleDownCircles(){
        circlesElements.forEach((circle)=>{
            circle.scaleDown()
            updateCircleRadiusInDom(circle.dom,circle.circleRadius)
            updateCirclePositionInDom(circle.dom,circle.x,circle.y)
        })
    }

    function removeSmallCircles(){
        return circlesElements.filter((circle)=>{
            if(circle.circleRadius > 10)
            {
                return true;
            } else {
                removeCircleFromDom(circle.dom)
                return false;
            }
        })
    }

    const startButton:HTMLButtonElement = document.querySelector("#startButton")!
    
    startButton.addEventListener("click", function(){
        if(isStartButtonEnable){
            isStartButtonEnable = false
            this.innerText = "Stop"

            createCirclesInDom()
            movesCirclesAtInterval()
            
        } else {
            this.innerText = "Bounce"
            clearInterval(bounceInterval)
            const removeInterval = setInterval(function(){
                
                scaleDownCircles()

                circlesElements = removeSmallCircles()
    
                if(circlesElements.length === 0){
                    isStartButtonEnable = true
                    clearInterval(removeInterval)
                }
    
            },SIXTY_FPS)
        }    
    });        
})()





// Animation 
const bounceAnimation = [
{color: 'coral'},
{color: 'rgb(250, 238, 76)', transform: 'translateX(-45px) translateY(25px)'},
{color: 'rgb(61, 236, 114)', transform: 'translateX(45px) translateY(25px)'},
{color: 'rgb(58, 158, 204)', transform: 'translateX(45px) translateY(-25px)'},
{color: 'rgb(221, 56, 180)', transform: 'translateX(-45px) translateY(-25px)'},
{color: 'coral'}
];

let canAnimateTitle:boolean = true
const titleLabel:HTMLLabelElement = document.querySelector("#title")!
titleLabel.addEventListener("click", function(){
    if(canAnimateTitle){
        canAnimateTitle=false
        this.animate(bounceAnimation, {
            duration: 2000,
            iterations: 3
          }).finished.then(()=>{
              canAnimateTitle = true
          })
    }  
});
