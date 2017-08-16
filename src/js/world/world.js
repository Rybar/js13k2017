world = [
  0,1,2,
  3,4,5,
  6,7,8
];

rooms = [
  //0
  {
    draw: function(dt){
      text([
              '0',
              20,20,1,1,'left','bottom',2,15,0
          ]);
    }
  },

  //1
  {
    draw: function(dt){
      text([
              '1',
              20,20,1,1,'left','bottom',2,15,0
          ]);
    }
  },

  //2
  {
    draw: function(dt){

      text([
              '2',
              20,20,1,1,'left','bottom',2,15,0
          ]);

      fillTriangle(0,205,384,205,182,136, 25);

    }
  },

  //1
  {
    draw: function(dt){
      text([
              '3',
              20,20,1,1,'left','bottom',2,15,0
          ]);
    }
  },
  //1
  {
    draw: function(dt){
      text([
              '4',
              20,20,1,1,'left','bottom',2,15,0
          ]);
    }
  },
  //1
  {
    draw: function(dt){
      text([
              '5',
              20,20,1,1,'left','bottom',2,15,0
          ]);
    }
  },
  //1
  {
    draw: function(dt){
      text([
              '6',
              20,20,1,1,'left','bottom',2,15,0
          ]);
    }
  },
  //1
  {
    draw: function(dt){
      text([
              '7',
              20,20,1,1,'left','bottom',2,15,0
          ]);
    }
  },
  //1
  {
    draw: function(dt){
      text([
              '8',
              20,20,1,1,'left','bottom',2,15,0
          ]);
    }
  },


]

function roomSwitch(direction){
switch(direction){

  case LEFT:
  currentRoom[0]--;
  if(currentRoom[0] < 0) currentRoom[0] = WORLDWIDTH;
  console.log(currentRoom);
  break;

  case RIGHT:
  currentRoom[0]++;
  if(currentRoom[0] > WORLDWIDTH) currentRoom[0] = 0;
  console.log(currentRoom);
  break;

  case UP:
  currentRoom[1]--;
  if(currentRoom[1] < 0) currentRoom[1] = WORLDHEIGHT;
  console.log(currentRoom);
  break;

  case DOWN:
  currentRoom[1]++;
  if(currentRoom[1] > WORLDHEIGHT) currentRoom[1] = 0;
  console.log(currentRoom);
  break;
}
}
