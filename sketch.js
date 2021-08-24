var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
    towerImg = loadImage("tower.png");
    doorImg = loadImage("door.png");
    
    doorsGroup=new Group();
  
    climberImg = loadImage("climber.png");
  
    climbersGroup=new Group();
    invisibleBlockGroup=new Group();
  
  
    ghostImg = loadImage("ghost-standing.png");
    spookySound = loadSound("spooky.wav");
}

function setup() {
    createCanvas(600, 600);
    tower = createSprite(300,300);
    tower.addImage("tower",towerImg);
    tower.velocityY = 1;
  
    ghost=createSprite(200,200);
    ghost.addImage("ghost",ghostImg);
    ghost.scale=0.3;
}

function draw() {
    background(200);
  
    if(tower.y > 400){
        tower.y = 300
      }
      if(keyDown("left_arrow")){
        ghost.x=ghost.x-3
      }
      if(keyDown("right_arrow")){
        ghost.x=ghost.x+3
      }
      if(keyDown("space")){
        ghost.velocityY=-5
      }
      ghost.velocityY=ghost.velocityY+0.5 
      if(climbersGroup.isTouching(ghost)){
        ghost.velocityY=0    
      } 
      if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
        ghost.destroy()
      }

      spawndoors();
       drawSprites();
}
function spawndoors(){
    if(frameCount%240===0){
      var door=createSprite(200,-50);
      door.addImage("door",doorImg)
      door.velocityY=2;
      var climber=createSprite(200,10);
      climber.addImage("climber",climberImg)
      climber.velocityY=2;
  
      var invisibleBlock=createSprite(200,15)
      invisibleBlock.width=climber.width;
      invisibleBlock.height=2
      invisibleBlock.x=door.x
      invisibleBlock.velocityY=2;
      invisibleBlock.debug=false;
      invisibleBlockGroup.add(invisibleBlock)
        
      door.x=Math.round(random(120,400))
      climber.x=door.x
      door.lifetime=800;
      climber.lifetime=800;
      doorsGroup.add(door);
      climbersGroup.add(climber);
      ghost.depth=door.depth;
      ghost.depth=ghost.depth+1;  
    }
  }