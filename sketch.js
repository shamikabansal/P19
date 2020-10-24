

//create variables 
//1. backgrnd 2.bckgrndimg
var background1, backgroundimg 
//3. monkey 4. monkey_running
 var monkey, monkey_running
//5.ground,ground_img
 var invisibleground, groundimg 
 var obstacle 
 var banana; 

//make groups for food and obstacles
 var obstaclesgroup, obstacleimg 
 var bananasgroup, bananaimg 
//make var for score and give it 0
 var score = 0;


function preload(){
  //load the images of background here
  backgroundimg  = loadImage("jungle2.jpg");
  
  //load the animation of the monkey here
 monkey_running = loadImage ("Monkey_01.png", "Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  
   //load the image of banana here(use Banana.png)
  
  bananaimg = loadImage ("Banana.png"); 
  
  
  //load the image of obstacle herestone.png
  obstacleimg  = loadImage ("stone.png");
}

function setup() {
  //craeted the canvas already
  createCanvas(800,400);
  
  //create the background sprite here,add the image and give it some - velocityX
  background1=createSprite(0,0,800,400);
  background1.addImage( backgroundimg );
 background1.scale=1.5;
  background1.x=background1.width/2;
  background1.velocityX=-4;
   
  invisibleground = createSprite(400,350,800,10);

  invisibleground.velocityX=-4;
 invisibleground.x = invisibleground.width/2;
  invisibleground.visible=false;
  
  monkey = createSprite(100,340,20,20);
  monkey.scale=0.05;
  monkey.addAnimation("running",monkey_running)

  bananasgroup = new Group();
  obstaclesgroup = new Group();
  
  }

function draw() {
  
  background(255);
  
  //if statement for the ground and backgrnd to reset as it goes out of the canvas from the left
  //eg 
 if(invisibleground.x<0) {
    invisibleground.x=invisibleground.width/2;
  }
   if(background1.x<0) {
    background1.x=background1.width/2;
  }
 
  
  //if statement when the food group is going the touch the player
  
  //destroy the foodgroup and increase the score
    if(bananasgroup.isTouching(monkey)){
      bananasgroup.destroyEach(); 
      score = score +2;
       
    }
    
    
    //do the same for 3 more cases(20,30,40)
    // i have done it for case 10
    
    switch(score){
       case 10: monkey.scale=0.12;
                break;
                
      case 20: monkey.scale=0.14;
                break;
                
      case 30: monkey.scale=0.16;
                break;
                
     case 40: monkey.scale=0.18;
                break;
       
        default: break;
    }
  
  //make the monkey jump here using the space bar
    
   if(keyDown("space")&& monkey.y>= 161) {
   monkey.velocityY = -12;
   }
  
     //gravity here
    monkey.velocityY = monkey.velocityY + 0.7

     
  
  //make the monkey collide with the ground
   monkey.collide(invisibleground);
  
    spawnbananas();
    spawnobstacles();
 
  //change the scale of the monkey if it touches the obstacle
   if(obstaclesgroup.isTouching(monkey)){ 
    monkey.scale = 0.05;
     obstaclesgroup.destroyEach();
      score=score - 2;
   }
    
     
  
  drawSprites();

  
  //displaying of the score>>>already done
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}


function spawnbananas() {
  //write code here to spawn the food after every 80 frames
  if (frameCount % 80 === 0) {
    banana = createSprite(600,120,40,10);
   banana.y = Math.round(random(80,120));
    banana.addImage(bananaimg);
    banana.scale = 0.2 ;
    banana.velocityX = -3;
     
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananasgroup.add(banana);
  
  }
}

function spawnobstacles() {
  //write code here to spawn the food after every 300 frames
  if(frameCount % 300 === 0) {
    // create stone sprite and  and give velocity
    obstacle = createSprite(800,350,10,10)
    // scale 
    obstacle.addImage(obstacleimg);
    
    obstacle.scale=0.2
     obstacle.velocityX = -5
   obstacle.lifetime=300
    obstaclesgroup.add(obstacle) ;
    }
    
    //assign scale and lifetime to the obstacle           
    
  
   
  }



  
