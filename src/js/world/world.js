world = [
  8,7,0,0,0,0,0,0,0,0,
  0,2,0,0,0,0,1,0,0,0,
  0,0,0,1,0,0,0,0,2,0,
  0,0,0,0,0,0,1,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  6,7,8,7,6,6,8,6,6,6
];

const LEFT = 1;
const RIGHT = 2;
const UP = 3;
const DOWN = 4;

const HEADMODE = 1;
const BODYMODE = 2;
const ARMMODE = 3;
const THRUSTERMODE = 4;

const WALLS = 21;
const FUELCELL = 8;
const FUELCRYSTAL = 9;
const TERRA = 4;

const WORLDWIDTH = 9;
const WORLDHEIGHT = 5; // 0 index.

currentRoom = [0,0]; //start room

rooms = [
  //0
  {

    draw: function(dt){
      bgstars();

      denseGreeble();

      foregroundGreeble();

    }
  },

  //1
  {
    draw: function(dt){
      fillCircle(192,128,50,WALLS);
      bgstars();

      denseGreeble();

      foregroundGreeble();

    }
  },

  //2
  {
    draw: function(dt){
        circle(192,128,64,WALLS);
        bgstars();

        denseGreeble();

        foregroundGreeble();
    }
  },

  //3
  {
    draw: function(dt){
      fillRect(0,0,127,256,WALLS);
      fillRect(250,0,127,256,WALLS);
      bgstars();

      denseGreeble();

      foregroundGreeble();
    }
  },
  //4
  {
    draw: function(dt){
      fillRect(0,0,127,256,WALLS);
      fillRect(250,0,127,256,WALLS);

      bgstars();

      denseGreeble();

      foregroundGreeble();
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
          fillRect(0,150,100,100,TERRA);
          fillRect(300,150,100,100,FUELCRYSTAL);

          let i = 100;
          while(--i){
            x = lcg.nextIntRange(0,WIDTH);
            y = lcg.nextIntRange(100,200);
            pset(x,y, FUELCELL);
          }

          bgstars();
          drawTerra();
          drawFuelCrystals();
          denseGreeble();
          foregroundGreeble();

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

          bgstars();
          denseGreeble();
          bigGreeble();
          //foregroundGreeble();



    }
  },
  //8
  {
    draw: function(dt){
      fillRect(0,205,384,10,WALLS);
      fillCircle(250,150,64,WALLS);
      fillCircle(250,150,50,FUELCRYSTAL);

      pset(50, 180, FUELCELL);

      bgstars();

      drawFuelCrystals();
      denseGreeble();
      denseGreeble();
      bigGreeble();


      //foregroundGreeble();

      //archi(245,110,25);
    }
  },


] // end rooms;

function roomSwitch(direction){
    let j = PAGESIZE * PAGES;
    while(--j){
      ram[j] = 0;
    }
    drawSpriteSheet();

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

}

function reDraw(){
  renderTarget = BACKGROUND; clear(0);
  renderTarget = MIDGROUND; clear(0);
  renderTarget = FOREGROUND; clear(0);
  //
  bgstars();
  drawTerra();
  drawFuelCrystals();
  denseGreeble();
  denseGreeble();
  foregroundGreeble();
}

function archi(x,y,color){
  renderTarget = FOREGROUND;
  cRect(x-4,y-4,40,100,23);

  for(n=p=i=0;p<2e3;i%2||pset(x+p%23,y+p/23|0,color),p++){
    p^n||(n=p+([...'F0AL1314B2C2B16001177AeBSB1SB1R11AREàBDCCB5CAM6A51CBCB513333ZAQAÜAQFMEWB5DCCBC4IA515CC613333ZAFBIAKBO3BJFEBFEJBMAHAH3AFBGAGB5FAJBCA5O6BMBCA5IB5F4FAH3AGBH2HBH2IAG34G4LBIBHBIACC17K4N3ELAD1C1B1B7F7CB7GACDCEBACI13CA6AF13FBAF13BF3B7cCEANC11C0117CI0AP1ANEPILCGCIBKBGB1I1BE6BG6BDAC1312D2B2B2HAC12LADADALAIAN71AK5E1BD'].map(v=>['AAAAAA','AA','ACA','AE','AGA','DB','BB','AB'][v]||v).join('').charCodeAt(i++)&63))
  }

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
      renderSource = SPRITES;
      renderTarget = SCREEN;
      rspr(192,0,32,32,x-2,y-5,1, t*90);
    }
  };
}

function denseGreeble(){
  renderSource = COLLISION;
  renderTarget = SCRATCH;
  clear(0);
  var i = 3000;
  //lcg.setSeed(1019);
  while(--i){
    let x = lcg.nextIntRange(0,WIDTH),
        y = lcg.nextIntRange(0,HEIGHT)

    if(pget(x,y,COLLISION) == WALLS){
    fillRect(
        x + lcg.nextIntRange(-2,2),
        y + lcg.nextIntRange(-2,2),
        lcg.nextIntRange(2,6),
        1,
        2
      );
    }
  } //render greeble over walls
  renderTarget = SCRATCH2;
  clear(0);
  outline(SCRATCH, SCRATCH2, 1);

  renderTarget = MIDGROUND;
  renderSource = SCRATCH; spr();
  renderSource = SCRATCH2; spr();

  renderTarget = SCRATCH;
  var i = 3000;
  //lcg.setSeed(1019);
  while(--i){
    let x = lcg.nextIntRange(0,WIDTH),
        y = lcg.nextIntRange(0,HEIGHT)

    if(pget(x,y,COLLISION) == WALLS){
    fillRect(
        x + lcg.nextIntRange(-2,2),
        y + lcg.nextIntRange(-2,2),
        1,
        lcg.nextIntRange(2,5),
        2
      );
    }
  } //render greeble over walls
  renderTarget = SCRATCH2;
  clear(0);
  outline(SCRATCH, SCRATCH2, 1,4,1,1);

  renderTarget = MIDGROUND;
  renderSource = SCRATCH; spr();
  renderSource = SCRATCH2; spr();

}

function foregroundGreeble(){
  renderTarget = SCRATCH; clear(0);  //draw foreground elements
  var i = 400;
  // lcg.setSeed(1019);
  while(--i){
    let x = lcg.nextIntRange(0,WIDTH),
        y = lcg.nextIntRange(0,HEIGHT)

    if(ram[COLLISION + x + y * WIDTH] == WALLS){
      fillRect(
        x + lcg.nextIntRange(-5,0),
        y + lcg.nextIntRange(-20,0),
        lcg.nextIntRange(1,2),
        lcg.nextIntRange(1,20),
        22
      );
      circle(x,y-10,1, 22);
    }
  }
  renderTarget = SCRATCH2; clear(0);
  outline(SCRATCH, SCRATCH2, 25, 20, 26, 2);
  renderTarget = FOREGROUND;
  renderSource = SCRATCH; spr();
  renderSource = SCRATCH2; spr();
}

function bigGreeble(){
  renderTarget = SCRATCH; clear(0);  //draw foreground elements
  var i = 1500;
  //lcg.setSeed(1019);
  while(--i){
    let x = lcg.nextIntRange(0,WIDTH),
        y = lcg.nextIntRange(0,HEIGHT)

    if(ram[COLLISION + x + y * WIDTH] == WALLS){
      cRect(
        x,
        y,
        lcg.nextIntRange(5,13),
        lcg.nextIntRange(2,4),
        1,
        25
      );

    }
  }
    let j = 2000;
    while(--j){
      let x = lcg.nextIntRange(0,WIDTH),
          y = lcg.nextIntRange(0,HEIGHT)

      if(ram[COLLISION + x + y * WIDTH] == WALLS){
        fillRect(
          x,
          y,
          lcg.nextIntRange(3,7),
          lcg.nextIntRange(1,3),
          0
          );
        }
      }
  renderTarget = SCRATCH2; clear(0);
  outline(SCRATCH, SCRATCH2, 1, 23, 24);
  renderTarget = MIDGROUND;
  renderSource = SCRATCH; spr();
  renderSource = SCRATCH2; spr();
}

function drawTerra(){
  let i = PAGESIZE;
  while(--i){
    if(ram[COLLISION + i] == TERRA){
      ram[MIDGROUND + i] = lcg.nextIntRange(2,4);
    }
  }
}

function drawFuelCrystals(){

  let i = PAGESIZE;
  while(--i){
    if(ram[COLLISION + i] == FUELCRYSTAL){
      ram[MIDGROUND + i] = lcg.nextIntRange(9,11);
    }
  }

}

function drawMessage(message, color){


}
