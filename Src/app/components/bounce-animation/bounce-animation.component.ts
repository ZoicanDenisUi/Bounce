import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ActionType, Circle } from '../../helpingClasses/circle';
import { DomInteractionsService } from '../../helpers/dom-interactions.service';
import { Round } from '../../helpingClasses/round';
import { randomIntFromInterval } from '../../helpers/mathHelper';
import { GetImagesService } from 'src/app/helpers/get-images.service';
import { SwitchStatesService } from 'src/app/helpers/switch-states.service';

enum AnimationState {
    startAnimation,
    idle,
    stopAnimation
}

@Component({
  selector: 'app-bounce-animation',
  templateUrl: './bounce-animation.component.html',
  styleUrls: ['./bounce-animation.component.css']
})
export class BounceAnimationComponent implements AfterViewInit{

  @ViewChild('bounceDiv') bounceDiv!: ElementRef<HTMLDivElement>   
  @ViewChild('bounceButton',{ read: ElementRef }) bounceButton!: ElementRef<HTMLButtonElement>  

  @Input() roundObserver!:Subject<Round>;
  
  buttonStateIcons:string[] = ["play_circle_filled","poll","power_settings_new"]

  currentStateOfAnimation:AnimationState = AnimationState.startAnimation
  timeInSeconds:number = 0 
  intervalsPassed:number = 0
  bounceInterval:any 
  circlesElements:Circle[] = []

  ballCountInput:number = 1
  ballClickedCount:number = 0

  isNewMode:boolean = true;

  readonly FRAMSECOUNT = 60;
  readonly SIXTY_FPS  = 1000 / 60

  categories:string[] = []

  getCategories(categories: string[]):void{
    this.categories = categories
  }

  scaleDownCircles():void{
    this.circlesElements.forEach((circle)=>{
        circle.scaleDown()
        this.domInteractions.updateCircleRadiusInDom(circle.dom,circle.circleRadius)
        this.domInteractions.updateCirclePositionInDom(circle.dom,circle.x,circle.y)
    })
  }

  createCirclesInDom():void{
    const {left:leftBounceDiv,width:widthBounceDiv,height:heightBounceDiv,top:topBounceDiv} = this.domInteractions.getDomValues(this.bounceDiv.nativeElement);
    let imagesLoaded = 0

    for(let i=0;i<this.ballCountInput;i++){
        const circleRadius = randomIntFromInterval(40,100)
        const newCircle:Circle = new Circle(this.domInteractions.createCircleDomElement(circleRadius),circleRadius,widthBounceDiv,heightBounceDiv,leftBounceDiv,topBounceDiv)
        this.circlesElements.push(newCircle)
        this.domInteractions.addClickEventToCircle(newCircle,(circle:Circle)=>{
            circle.actionType = ActionType.ScaleDown
        })

        if(this.isNewMode){
            this.getImages.getRandomImage(...this.categories).subscribe((randomImage)=>{
                let reader = new FileReader();
                reader.addEventListener("load", () => {
                    this.domInteractions.setImageBackground(newCircle.dom,reader.result)
                    this.domInteractions.addCircleToDom(newCircle.dom)
                    imagesLoaded++
                    if(imagesLoaded === this.ballCountInput ){
                      this.currentStateOfAnimation = AnimationState.stopAnimation
                    }
                }, false);
            
                if (randomImage) {
                    reader.readAsDataURL(randomImage);
                }
            })
        } else {
            this.domInteractions.setRandomBackground(newCircle.dom)
            this.domInteractions.addCircleToDom(newCircle.dom)
            this.currentStateOfAnimation = AnimationState.stopAnimation
        }


    }
  }

  removeSmallCircles():Circle[]{
    return this.circlesElements.filter((circle)=>{
        if(circle.circleRadius < 10)
        {
            this.domInteractions.removeCircleFromDom(circle.dom)
            return false;
        } else {
            return true;
        }
    })
  }

  applyAction(circle:Circle):boolean{
    if(circle.actionType==ActionType.Remove){
        this.ballClickedCount += 1
        this.domInteractions.removeCircleFromDom(circle.dom)
        return false
    } else if(circle.actionType == ActionType.ScaleDown){
        circle.scaleDown()
        this.domInteractions.updateCircleRadiusInDom(circle.dom,circle.circleRadius)
        this.domInteractions.updateCirclePositionInDom(circle.dom,circle.x,circle.y)
        if(circle.circleRadius < 10)
            circle.actionType = ActionType.Remove
        return true;
    } else {
        return true
    }
  }

  resetGameValues(){
    this.timeInSeconds = 0
    this.intervalsPassed = 0
    this.ballClickedCount = 0
  }

  constructor(private domInteractions:DomInteractionsService,private getImages:GetImagesService, private switchStates:SwitchStatesService){
    switchStates.getNewModeObservable().subscribe((value)=>{
        this.isNewMode = value
    })
  }

  ngAfterViewInit(){
      this.domInteractions.initialize(document.querySelector('#bounceDiv')!);
  }

  animateBalls(){
    if(this.ballCountInput != null)
    {
        if(this.currentStateOfAnimation === AnimationState.startAnimation){
            this.currentStateOfAnimation = AnimationState.idle

            this.resetGameValues()
            this.createCirclesInDom()

            this.bounceInterval = setInterval(()=>{
                const {left:leftBounceDiv,right:rightBounceDiv,top:topBounceDiv,bottom:bottomBounceDiv} = this.domInteractions.getDomValues(this.bounceDiv.nativeElement);

                if(this.circlesElements.length == 0){
                    clearInterval(this.bounceInterval)
                    this.roundObserver.next(new Round(this.ballCountInput,this.ballClickedCount,this.timeInSeconds,new Date()))
                    this.currentStateOfAnimation = AnimationState.startAnimation
                    this.resetGameValues()
                }

                
                this.circlesElements = this.circlesElements.filter((circle) => this.applyAction(circle))

                this.circlesElements.forEach((circle)=>{
                    circle.moveCircle(leftBounceDiv,rightBounceDiv,topBounceDiv,bottomBounceDiv)
                    this.domInteractions.updateCirclePositionInDom(circle.dom,circle.x,circle.y)
                })


                this.intervalsPassed++
                this.timeInSeconds =  this.intervalsPassed/this.FRAMSECOUNT | 0

            },this.SIXTY_FPS)
        } 
        else if(this.currentStateOfAnimation === AnimationState.stopAnimation){
            this.currentStateOfAnimation = AnimationState.idle
            clearInterval(this.bounceInterval)
            this.roundObserver.next(new Round(this.ballCountInput,this.ballClickedCount,this.timeInSeconds, new Date()))
            const removeInterval = setInterval(()=>{
                this.scaleDownCircles()
                this.circlesElements = this.removeSmallCircles()
                if(this.circlesElements.length === 0){
                    this.currentStateOfAnimation = AnimationState.startAnimation
                    this.resetGameValues()
                    clearInterval(removeInterval)
                    }
                },this.SIXTY_FPS)
            }    
        } else {
            window.alert("Please insert a valid number")
        }
    } 


}
