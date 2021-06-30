class Game {
  constructor() {}
  
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
 
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }


  async start()
  {
    player = new Player();
    player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width/2,height-100);
    car1.addImage("car1",car1_img);
    car1.scale=0.07;  


    car2 =createSprite(width/2+100,height-100);
    car2.addImage("car2",car1_img);
    car2.scale=0.07;

    cars=[car1,car2];
      
  }

  handleElements()
  {
    form.hide();
    form.titleImg.position(40,50);
    form.titleImg.class("gameTitleAfterEffect");
  }
 
  play(){
    form.hide();
    
    Player.getPlayersInfo();
    
    
    if(allPlayers !== undefined){
      
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;
      
      //x and y position of the cars
      var x;
      var y;
    
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = displayHeight - allPlayers[plr].x;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)
       
       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    
    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1
      Player.updateCarsAtEnd(player.rank)
    }
   
    drawSprites();
  }
}