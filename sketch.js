var dog,happyDog,database,foodS,foodStock;

function preload()
{
  dog=loadImage("Dog.png");
  happyDog=loadImage("happydog.png");

}

function setup() {
	createCanvas(500, 500);
  ripster=createSprite(250,250,50,50);
  ripster.addImage(dog);
  ripster.scale=0.3;
  database=firebase.database();
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    ripster.addImage(happyDog);
  }
  drawSprites();
  textSize(15);
  fill("white");
  text("Note:-Press UP_ARROW key to feed ripster",150,20);
  text("Ripster",250,400);
  text("Milk Bottles:-"+foodS,230,100);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  
  if(x<=0){
    x=0;
  }
  else{
    x-=1;
  }

  database.ref('/').update({
    Food:x
  })
}

