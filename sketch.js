var dino,dino_img;

var borda;

var chao,chao_img;

var chaoinvisivel;

var nuvem, nuvem_img;

var cacto;

var gc;

var gn;

var JOGAR = 1;

var END = 2;

var GameState = JOGAR;

var score = 0;

var perder;

var restartar, restart_img;

var gameover, gameOver_img;

var som_morrer;

var som_pular;

var som_checkpoint;


function preload(){
  //pre carrega os arquivos do jogo

  dino_img = loadAnimation("trex1.png","trex2.png","trex3.png");
  perder = loadImage ('trex_collided.png');
 

  chao_img = loadImage ('ground2.png');
  nuvem_img = loadImage ('cloud.png')

  restart_img = loadImage("restart.png");

 obs1 = loadImage ('obstacle1.png')
 obs2 = loadImage ('obstacle2.png')
 obs3 = loadImage ('obstacle3.png')
 obs4 = loadImage ('obstacle4.png')
 obs5 = loadImage ('obstacle5.png')
 obs6 = loadImage ('obstacle6.png')
 
 gameover_img = loadImage('gameOver.png');

 som_morrer = loadSound('die.mp3');

 som_pular = loadSound('jump.mp3');

 som_checkpoint = loadSound('checkPoint.mp3');

}

function setup(){
  createCanvas(windowWidth,windowHeight);


  dino = createSprite(50,height-100,20,20);

  dino.addAnimation("running",dino_img);

  dino.scale = 0.5;

  dino.addImage("morto", perder);
  
  dino.debug = false;

  dino.setCollider("circle",0,0,30);

  //dino.setCollider("circle",100,0,30)

  borda = createEdgeSprites();

  chao = createSprite (width/2,height-10,width,15);
  chao.addImage (chao_img);

  
 
  //var cloud = Math.round (random(1,10)) 
 
  
  
  chaoinvisivel = createSprite(width/2,height-10,width,15) ;
  chaoinvisivel.visible = false;

  gc = new Group();
  gn = new Group();
 

 restartar = createSprite(width/2,height/2+50);
  
 restartar.addImage(restart_img);

  gameover = createSprite(width/2,height/2);
  gameover.addImage(gameover_img);
  
 gameover.visible = false;
 restartar.visible = false;
}
function draw(){
  background('white');
   
  text ('score :'+ score, 500, 20)
  
 
  
  if(GameState === JOGAR){

    score = score + Math.round(frameRate() / 60) ;
   
   
    if(score%100===0 && score > 0){

      som_checkpoint.play();


      


    }



    if  (touches.length>0&&dino.isTouching(chao)){
       touches =[];
      dino.velocityY = -14;

      som_pular.play();

      
    }
    chao.velocityX = -(5+score/100);

   //gravidade
   dino.velocityY = dino.velocityY + 1;

   //dino colide com a borda da tela
   dino.collide(chaoinvisivel);

   nuvens();
   cactus();

    if (chao.x < 0){ 
 
     chao.x = chao.width / 2 ;
    }



    if(dino.isTouching(gc)){

     GameState = END 
      
     som_morrer.play();
          
      //dino.velocityY = -14

      //som_pular.play();
     
    }



  }


  else if (GameState === END){
    gc.setVelocityXEach(0);

    chao.velocityX = 0;

    gn.setVelocityXEach (0);

    gc.setLifetimeEach(-1);
     
    gn.setLifetimeEach(-1);
    dino.changeAnimation('morto')

    dino.velocityY = 0;
    gameover.visible = true;
    restartar.visible = true;


    if(touches.length>0){
      touches = [];
      
     reset();

    }
  }
console.log 

 
 

  


  drawSprites();
 }
function nuvens(){

if (frameCount % 60 === 0 ){
   
   nuvem = createSprite (width+20,100);
   nuvem.velocityX = -2;

   nuvem.addImage(nuvem_img);
   nuvem.scale = 0.7;;

   nuvem.y = Math.round (random (height-180,height-100));
   nuvem.depth = dino.depth;
   dino.depth = dino.depth + 1;
   nuvem.lifetime = width+20;
    gn.add(nuvem);
    
    

 }

  

 
}

function cactus(){ 
  if (frameCount % 60 === 0) {
    
    cacto = createSprite(width+50,height-20);
    cacto.velocityX = -(5+score/100);
    var rando = Math.round (random(1,6))
   switch ( rando ){
     case 1 : cacto.addImage(obs1)
     break;

     case 2 : cacto.addImage(obs2)
     break;
     
     case 3 : cacto.addImage(obs3)
     break;

     case 4 : cacto.addImage(obs4)
     break;

     case 5 : cacto.addImage(obs5)
     break;

     case 6 : cacto.addImage(obs6)
     break;
   }
     
    cacto.scale = 0.5;
    cacto.lifetime = width+20;
    gc.add(cacto);


  }


}
//var gobal = var que existe no universo todo de programação;
//var local = var que só existe de forma temporária ou em uma função;

function reset (){

GameState = JOGAR
gc.destroyEach();

gn.destroyEach();

score = 0;

dino.changeAnimation('running');
gameover.visible = false;
restartar.visible = false;
}






