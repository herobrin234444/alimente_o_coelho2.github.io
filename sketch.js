const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground;
var ropes,rope2,rope3;
var fruta;
var frutalink,frutalink2,frutalink3;
var bgimage, foodimage,bunnyimg, bunny, button;
var blink,eat,sad;
var bgsound,buttonmusic,sadsound,eatsound,airsound;
var btn,btnmute;
var button,button2,button3;

let engine;
let world;

function preload(){

  bgimage = loadImage("background.png");
  foodimage = loadImage("melon.png");
  bunnyimg = loadImage("Rabbit-01.png");

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  bgsound = loadSound("sound1.mp3");
  buttonmusic = loadSound("rope_cut.mp3");
  sadsound = loadSound("sad.wav");
  eatsound = loadSound("eating_sound.mp3");
  airsound = loadSound("air.wav");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;

  sad.looping = false;
  eat.looping = false;

}

function setup() 
{
  var isMobile =/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth,displayHeight);
  }
else{
  canW = windowWidth;
  canH = windowHeight;
  createCanvas(windowWidth,windowHeight);
}
  engine = Engine.create();
  world = engine.world;


  button = createImg("cut_btn.png");
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg("cut_btn.png");
  button2.position(330,35);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg("cut_btn.png");
  button3.position(360,200);
  button3.size(50,50);
  button3.mouseClicked(drop3);

 // btn = createImg("balloon.png");
 // btn.position(10,210);
 // btn.size(150,100);
  //btn.mouseClicked(airBaloon);

  btnmute = createImg("mute.png");
  btnmute.position(450,20);
  btnmute.size(50,50);
  btnmute.mouseClicked(mute);

  blink.frameDelay = 15;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(150,canH-80,100,100);
  bunny.scale =0.2;
  
  bunny.addAnimation("piscando",blink);
  bunny.addAnimation("comendo",eat);
  bunny.addAnimation("triste",sad);
  bunny.changeAnimation("piscando");


  ground = new Ground(canW/2,canH,canW,20);

  ropes = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});

  var frutaop = {
    density:0.001 
  }
  fruta = Bodies.circle(300,300,15,frutaop);
  Matter.Composite.add(ropes.body,fruta);

  frutalink = new Link(ropes,fruta);
  frutalink2 = new Link(rope2,fruta);
  frutalink3 = new Link(rope3,fruta);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  
  bgsound.setVolume(0.3);

  image(bgimage,width/2,height/2,displayWidth,displayHeight);
  Engine.update(engine);
  
  ground.show();

  ropes.show();
  rope2.show();
  rope3.show();

  if(fruta !== null){
  image(foodimage,fruta.position.x,fruta.position.y,60,60);
  }


  if(collide(fruta,bunny)== true){
    bunny.changeAnimation("comendo");
    eatsound.play();
  }
  if(fruta !== null && fruta.position.y>= 650){
    bunny.changeAnimation("triste");
    sadsound.play();
    bgsound.stop();
    fruta = null;
  }

  drawSprites();
}


function drop(){
  buttonmusic.play();
  ropes.break();
  frutalink.separar();
  frutalink = null;
}
function drop2(){
  buttonmusic.play();
  rope2.break();
  frutalink2.separar();
  frutalink2 = null;
}
function drop3(){
  buttonmusic.play();
  rope3.break();
  frutalink3.separar();
  frutalink3 = null;
}

function collide(body,sprite){
  if(body !== null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<80){
      World.remove(world,fruta);
      fruta = null;
      return true;
    }
    else{
      return false;
    }
  }
  
  
}

function airBaloon(){
  Matter.Body.applyForce(fruta,{x:0,y:0},{x:0.01,y:0});
  airsound.play();
}

function mute(){
  if(bgsound.isPlaying()){
    bgsound.stop();
  }
  else{
    bgsound.play();
  }
}


