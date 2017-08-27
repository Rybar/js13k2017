world = [
  0,0,0,
  0,0,0,
  6,7,8
];

const WORLDWIDTH = 2;
const WORLDHEIGHT = 2; // 0 index.

currentRoom = [0,1]; //start room


rooms = [
  //0
  {

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
      fillRect(0,0,127,256,WALLS);
      fillRect(250,0,127,256,WALLS);
    }
  },
  //4
  {
    draw: function(dt){
      fillRect(0,0,127,256,WALLS);
      fillRect(250,0,127,256,WALLS);
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
          fillRect(0,205,384,100,WALLS);

          let i = 400;
          while(--i){
            x = lcg.nextIntRange(0,WIDTH);
            y = lcg.nextIntRange(0,HEIGHT);
            pset(x,y, FUELCELL);
          }

    }
  },

  //7
  {
    draw: function(dt){

          fillTriangle(0,256,384,256,182,205,WALLS);
          fillRect(100,70,20,80,WALLS);
          fillRect(100,140,100,20,WALLS);
          fillRect(200,820,10,100, WALLS);
          fillRect(210,70,100,100, WALLS);



    }
  },
  //8
  {
    draw: function(dt){
      fillRect(0,205,384,10,WALLS);
      fillCircle(250,150,64,WALLS);
      pset(50, 180, FUELCELL);
    }
  },


] // end rooms;

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

  bgstars();

  denseGreeble();

  foregroundGreeble();

  //drawFuel();

}

function bgstars(){
  renderTarget = BACKGROUND;
  clear(0);
  let i = 5000;
  while(--i){
    pset(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), 1);
  }
  i = 200;
  while(--i){
    pset(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), 26);
  }
  i = 60;
  while(--i){
    pset(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), 20);
  }
  i = 20;
  while(--i){
    pset(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), 21);
  }
  i = 3;
  while(--i){
    fillCircle(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), lcg.nextIntRange(2,5), lcg.nextIntRange(16,19) );
  }
}

function drawFuel() {
  let i = PAGESIZE;
  while(--i){
    if(ram[COLLISION + i] == FUELCELL){
      let y = i / WIDTH |0;
      let x = i % WIDTH;
      fillCircle(x, y, 3, 9);
      circle(x, y, 3, 11);
    }
  };
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

    if(pget(x,y,COLLISION) == WALLS){
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

    if(ram[COLLISION + x + y * WIDTH] == WALLS){
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

    if(ram[COLLISION + x + y * WIDTH] == WALLS){
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
