world = [
  1,0,0,
  0,0,0,
  6,7,8
];

rooms = [
  //0
  {
    parts: [
      [EYES, 200, 200]
    ],

    draw: function(dt){

    }
  },

  //1
  {
    draw: function(dt){

    }
  },

  //2
  {
    draw: function(dt){

    }
  },

  //3
  {
    draw: function(dt){
      fillRect(0,0,127,256,27);
      fillRect(250,0,127,256,27);
    }
  },
  //4
  {
    draw: function(dt){
      fillRect(0,0,127,256,27);
      fillRect(250,0,127,256,27);
    }
  },
  //5
  {
    draw: function(dt){

    }
  },
  //6
  {
    draw: function(dt){
          fillRect(0,205,384,10, 25);
    }
  },
  //7
  {
    draw: function(dt){

          fillTriangle(0,256,384,256,182,205, 25);
          fillRect(100,70,20,80, 24);
          fillRect(100,140,100,20, 23);
          fillRect(200,820,10,100, 23);
          fillRect(210,70,100,100, 22);



    }
  },
  //8
  {
    draw: function(dt){

      fillRect(0,205,384,10, 25);
      fillCircle(250,150,64,25);
    }
  },


]

function roomSwitch(direction){
  renderTarget = COLLISION; clear(0);
  renderTarget = SCRATCH; clear(0);
  renderTarget = SCRATCH2; clear(0);
  renderTarget = FOREGROUND; clear(0);
  renderTarget = MIDGROUND; clear(0);
  renderTarget = BUFFER; clear(0);


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

renderTarget = COLLISION;
rooms[ world[ currentRoom[1] * (WORLDWIDTH+1) + currentRoom[0]  ] ].draw();
decorate();

}

function decorate() {

  denseGreeble();

  foregroundGreeble();

}

function denseGreeble(){
  renderSource = COLLISION;
  renderTarget = SCRATCH;
  clear(0);
  var i = 3000;
  lcg.setSeed(1019);
  while(--i){
    let x = lcg.nextIntRange(0,WIDTH),
        y = lcg.nextIntRange(0,HEIGHT)

    if(pget(x,y,COLLISION)){
      cRect(
        x + lcg.nextIntRange(-5,0),
        y + lcg.nextIntRange(-10,0),
        lcg.nextIntRange(0,15),
        lcg.nextIntRange(0,10),
        1,
        lcg.nextIntRange(22, 24)
      );
    }
  } //render greeble over walls
  renderTarget = SCRATCH2;
  clear(0);
  outline(SCRATCH, SCRATCH2, 25, 20,26,2);

  renderTarget = MIDGROUND;
  renderSource = SCRATCH; spr();
  renderSource = SCRATCH2; spr();
  //-------------------------
  renderTarget = SCRATCH;
  clear(0);
  var i = 3000;
  lcg.setSeed(1019);
  while(--i){
    let x = lcg.nextIntRange(0,WIDTH),
        y = lcg.nextIntRange(0,HEIGHT)

    if(ram[COLLISION + x + y * WIDTH]){
      cRect(
        x + lcg.nextIntRange(-5,0),
        y + lcg.nextIntRange(-10,0),
        lcg.nextIntRange(0,15),
        lcg.nextIntRange(0,10),
        1,
        lcg.nextIntRange(22, 24)
      );
    }
  }

  renderTarget = SCRATCH2;
  clear(0);
  outline(SCRATCH, SCRATCH2, 25, 20,26,2);

  renderTarget = MIDGROUND;
  renderSource = SCRATCH; spr();
  renderSource = SCRATCH2; spr();
}

function foregroundGreeble(){
  renderTarget = SCRATCH; clear(0);  //draw foreground elements
  var i = 1000;
  lcg.setSeed(1019);
  while(--i){
    let x = lcg.nextIntRange(0,WIDTH),
        y = lcg.nextIntRange(0,HEIGHT)

    if(ram[COLLISION + x + y * WIDTH]){
      fillRect(
        x + lcg.nextIntRange(-5,0),
        y + lcg.nextIntRange(-20,0),
        lcg.nextIntRange(0,5),
        lcg.nextIntRange(0,20),
        lcg.nextIntRange(22, 24)
      );
      fillCircle(x,y-10,2, lcg.nextIntRange(22,24));
    }
  }
  renderTarget = SCRATCH2; clear(0);
  outline(SCRATCH, SCRATCH2, 25, 20, 26, 2);
  renderTarget = FOREGROUND;
  renderSource = SCRATCH; spr();
  renderSource = SCRATCH2; spr();
}
