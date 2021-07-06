const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var bird2,bird3,bird4;
var bg="sprites/bg.png"

var array1 = [1,2,"A","B","Z",4,0, "My name"];
//console.log(array1[4]);


var array2 = [[1,2],[3,"ERROR"],[9,20,45,"My PROGRAM"], ["TEJAS"]]
console.log(array2);
array2.pop("MY Trajectory");
var Birds=[]
var gameState="on_Sling"
var score=0;
var hitSound;
function preload() {
   // backgroundImg = loadImage("sprites/bg.png");
    getTime();
hitSound=loadSound("sounds_rock_flying.mp3")
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
    
    bird2=new Bird(150,170);
    bird3=new Bird(100,170);
    bird4=new Bird(50,170);

    Birds.push(bird4);
    Birds.push(bird3);
    Birds.push(bird2);
    Birds.push(bird);
}

function draw(){
    if(backgroundImg)
    background(backgroundImg);
    textSize(20);
    text(" score " + score,width-300,70);
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score()
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score()
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();

    bird2.display();
    bird3.display();
    bird4.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
if(gameState!== "launched"){
    Matter.Body.setPosition(Birds[Birds.length-1].body, {x: mouseX , y: mouseY});
    Matter.Body.applyForce(Birds[Birds.length-1].body,Birds[Birds.length-1].body.position,{x:5,y:-5})
}
}

function mouseReleased(){
    slingshot.fly();
    hitSound.play();
    Birds.pop();
    gameState="launched"
    return false
    
}
function keyPressed(){
if(keyCode === 32&&gameState==="launched"){
    Matter.Body.setPosition(Birds[Birds.length-1].body,{x:200,y:50})
slingshot.attach(Birds[Birds.length-1].body);
gameState="onSling"
}
}
async function getTime(){
var response = await fetch ("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
var responseJSOn = await response.json();
var datetime=responseJSOn.datetime;
var hour = datetime.slice (11,13);
if(hour>=06&&hour<=12){
bg="sprites/bg.png"
}
else{
bg="sprites/bg2.jpg"
}
backgroundImg=loadImage(bg)
console.log(hour);
};
