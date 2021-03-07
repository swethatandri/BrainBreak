var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var score = 127;
var myMusic= document.getElementById("music");

var bottleX = 600;
var bottleY= 425;
var bottleWidth = 40;
var referenceNumber = 110;




ctx.beginPath();
ctx.rect(0, 380, canvas.width, 50);
ctx.fillStyle = "#77dd77";
ctx.fill();

ctx.closePath();

ctx.beginPath();
ctx.rect(0, 420, canvas.width, 80);
ctx.fillStyle = "grey";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(1150, 70, 40, 0, Math.PI*2, false);
ctx.fillStyle = "yellow";
ctx.fill();
ctx.closePath();




ctx.beginPath();
ctx.rect(600, 425, 40, 70);
ctx.fillStyle = "#1D4E89";
ctx.fill();
ctx.closePath();

ctx.font = "22px Lato";
ctx.fillStyle = "black";
ctx.fillText("Brain Temperature: "+score + "°F", 8, 30);  



function draw(){

  DrawBottle();
  SwitchBrains();
  GameOver();


}

var interval = setInterval(draw, 10);

function DrawBottle(){

  ctx.beginPath();
  ctx.rect(bottleX, bottleY, 40, 70);
  ctx.fillStyle = "#808080";
  ctx.fill();
  ctx.closePath();

  
}


function PlayMusic(){

ctx.clearRect(0, 0, 1080, 300);

  

  myMusic.play();

  ctx.font = "22px Lato";
  ctx.fillStyle = "black";
  ctx.fillText("Great job! Relaxing music is a great way to cool down the brain! Listen to your fav song before continuing!", 110, 190);

  





  if(score >= 90){

    score -= 10;


  }

  


  UpdateScore();
  

}

function mouseDownHandler(e){

   var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        bottleX = relativeX - paddleWidth/2;
        alert("BottleX is now " + bottleX );
    }

  
}

function UpdateScore(){

  ctx.clearRect(0, 0, 500, 50);


  ctx.font = "22px sans serif";
  ctx.fillStyle = "black";
  ctx.fillText("Brain Temperature: "+score + "°F", 8, 30);


}

function SwitchBrains(){

  if(score == 127 || score > 127){

    document.getElementById("brain").src = "Graphics/1.png";


  }

  else if(score >= 117 && score < 127 ){

    document.getElementById("brain").src = "Graphics/2.png";

  }

  else if(score <=  117 && score >= 107){

    document.getElementById("brain").src = "Graphics/3.png";

  }

  else if( score <= 99){

    ctx.clearRect(0, 0, 1070, 300);

    document.getElementById("brain").src = "Graphics/4.png";
    ctx.fillText("Success! You cooled down the brain. Refresh to play again :)", 280, 190);


  }


}

function GameOver(){

  if(score <= 80){

  ctx.clearRect(0, 0, 500, 300);
  ctx.font = "22px sans serif";
  ctx.fillStyle = "black";
  ctx.fillText("You did it!", 8, 30);
  document.location.reload();
  clearInterval(interval);




  
   // Needed for Chrome to end game 

  }


}
//press the water can after the user drops it abo
function Collision(){

  ctx.clearRect(0, 0, 1080, 300);

  var img = document.getElementById("mydivheader");
   

  ctx.fillText("Great job! Water is super effective in cooling the brain. Take a sip of water before continuing!", 160, 190);


    score -= 5;
    UpdateScore();

}

function ThisIsNegative(){

  ctx.clearRect(0, 0, 1080, 300);
  formRectangles();

  ctx.fillStyle = "black";

  ctx.fillText("No! Doing work right now in a state of stress can cause even more. Use this time to take the break you deserve!", 90, 190);

  score += 8;
  UpdateScore();



}

function formRectangles(){

  ctx.beginPath();
  ctx.rect(530, 250, 100, 20);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(530, 235, 100, 20);
  ctx.fillStyle = "orange";
  ctx.fill();
  ctx.closePath();





}
