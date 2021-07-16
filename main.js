// Math helpers
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

// Start button logic
document.getElementById("startButton").addEventListener("click", function(){
    let circlesElements = []
    let bounceDiv = document.getElementById("bounceDiv");

    let xCoord = Math.random()*100

    let {top:topBounceDiv,left:leftBounceDiv,bottom:bottomBounceDiv,right:rightBounceDiv} = bounceDiv.getBoundingClientRect();

    let diffRightLeft = rightBounceDiv-leftBounceDiv
    let difTopBottom = bottomBounceDiv - topBounceDiv

    const newDiv = document.createElement("div");
    const circleRadius = 40
    newDiv.style.width=circleRadius+"px"
    newDiv.style.height=circleRadius+"px"
    newDiv.classList.add("circle")
    newDiv.style.left=(leftBounceDiv+randomIntFromInterval(0,diffRightLeft-circleRadius))+"px"
    newDiv.style.top=(topBounceDiv+randomIntFromInterval(0,difTopBottom-circleRadius))+"px"

    console.log(newDiv.style.top)
    bounceDiv.append(newDiv)

});



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
        // timing options
        duration: 2000,
        iterations: 3
      });
    
});
