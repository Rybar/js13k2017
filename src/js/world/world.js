

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

const BODY = 27;
const ARM = 28;
const THRUSTER = 29;

const WORLDWIDTH = 39;
const WORLDHEIGHT = 39; // 0 index.

const H12 = WIDTH/12;
const V8 = HEIGHT/8;

//grid vars for easier level building---------------
const H1 = WIDTH/6;
const H2 = WIDTH/6 * 2;
const H3 = WIDTH/6 * 3;
const H4 = WIDTH/6 * 4;
const H5 = WIDTH/6 * 5;
const H6 = WIDTH;

const V1 = HEIGHT/4;
const V2 = HEIGHT/4 * 2;
const V3 = HEIGHT/4 * 3;
const V4 = HEIGHT;

currentRoom = [20,4]; //

rooms = [
  //0
  {

    draw: function(dt){

    },

    specials: function(dt){

    }
  },

  //1
  {
    draw: function(dt){
      fillTriangle(H3,V2, H5,V3, H1,V3,  WALLS);
      fillTriangle(H5,V3, H3,V2,H1,V3,  WALLS);
      fillTriangle(H3,V2, H1,V3, H5,V3,   WALLS);
      fillRect(0, V3, WIDTH, V1, WALLS);

    },
    specials: function(dt){

      drawHeads(0,V3, WIDTH, V1-10, 20);
    }
  },

  //2
  {
    draw: function(dt){
      fillRect(0,V3, WIDTH,V1, WALLS);
      pset(25+Math.random()*325, V3-5, FUELCELL);
      pset(25+Math.random()*325, V3-5, FUELCELL);
      pset(25+Math.random()*325, V3-5, FUELCELL);
    },

    specials: function(dt){

    }
  },

  //3
  {
    draw: function(dt){
      fillRect(0,170,384,200,WALLS);
      fillRect(0,140,100,100, WALLS);
      pset(192, 160, BODY);
    },

    specials: function(dt){



    }
  },
  //4
  {
    draw: function(dt){
      fillRect(0,V3, WIDTH, V1, WALLS);
      fillRect(H2,V3,H2,V1, 0);
      //pset(192, 160, BODY);
    },
    specials: function(dt){

    }
  },
  //5
  {
    draw: function(dt){
      fillRect(0,0,WIDTH,HEIGHT,WALLS);
      fillRect(H2,0,H4,HEIGHT, 0);
      //pset(100, 190, THRUSTER);
    },
    specials: function(dt){

    }
  },
  //6
  {
    draw: function(dt){
          fillRect(0,170,384,100,WALLS);
          pset(170, 165, BODY);


    },
    specials: function(dt){

    }
  },

  //7
  {
    draw: function(dt){

          fillRect(0,0,WIDTH,HEIGHT,WALLS);
          let i = 3;
          while(i--){
            let x = lcg.nextIntRange(H1,H5);
            let y = lcg.nextIntRange(V2,V4);
            fillRect(x,y, H1,H1, 0);
            pset(x+H1/2, y+H1/2, FUELCELL);
          }



    },
    specials: function(dt){
    }
  },
  //8
  {
    draw: function(dt){
      fillRect(0,205,384,10,WALLS);
      fillCircle(250,150,64,WALLS);
      fillCircle(250,150,50,FUELCRYSTAL);
      pset(50, 180, FUELCELL);
    },

    specials: function(dt){

    }
  },
  //9
  {
    draw: function(dt){
      fillRect(0,205,384,10,WALLS);
      fillCircle(250,150,64,WALLS);
      fillCircle(250,150,50,FUELCRYSTAL);
      pset(50, 180, FUELCELL);
    },

    specials: function(dt){

    }
  },


] // end rooms;

function roomSwitch(direction){
  lcg.setSeed(1019);

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
  redraw();



}

function redraw(){

  lcg.setSeed(1019 + currentRoom[0] + currentRoom[1] * 1234.5678);
  //roomNG.setSeed(1019);
  renderTarget = BACKGROUND; clear(0);
  renderTarget = MIDGROUND; clear(0);
  renderTarget = FOREGROUND; clear(0);
  //
  bgstars();
  drawTerra();
  drawFuelCrystals();
  denseGreeble();
  denseGreeble();
  bigGreeble()
  foregroundGreeble();

  renderTarget = COLLISION;
  rooms[ world[ currentRoom[1] * (WORLDWIDTH+1) + currentRoom[0]  ] ].specials();
  //
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

function drawThings() {
  let i = PAGESIZE;
  while(--i){
    let thing = ram[COLLISION + i]
    let y = i / WIDTH |0;
    let x = i % WIDTH;
    renderSource = SPRITES;
    renderTarget = SCREEN;

    switch(thing){
      case FUELCELL:
      rspr(192,0,32,32,x-2,y-5,1, t*90);
      break;

      case BODY:
      rspr(32,0,32,32,x-2,y-5,1, t*90);
      break;

      case ARM:
      rspr(192-64-32,0,32,32,x-2,y-5,1, t*90);
      break;

      case THRUSTER:
      rspr(192-64-32,0,32,32,x-2,y-5,1, t*90);
      break;

      }
    }
  };


function denseGreeble(){

  renderSource = COLLISION;
  renderTarget = SCRATCH;
  clear(0);

  var i = 3000;
  while(--i){
    let x = lcg.nextIntRange(0,WIDTH),
        y = lcg.nextIntRange(0,HEIGHT)

    if(pget(x,y,COLLISION) == WALLS){
      roomNG.setSeed(lcg.seed + x + y * 1234.5678);

    fillRect(
        x + roomNG.nextIntRange(-2,2),
        y + roomNG.nextIntRange(-2,2),
        roomNG.nextIntRange(2,6),
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

  var i = 3000;
  while(--i){
    let x = lcg.nextIntRange(0,WIDTH),
        y = lcg.nextIntRange(0,HEIGHT)

    if(pget(x,y,COLLISION) == WALLS){
      roomNG.setSeed(lcg.seed + x + y * 1234.5678);

    fillRect(
        x + roomNG.nextIntRange(-2,2),
        y + roomNG.nextIntRange(-2,2),
        1,
        roomNG.nextIntRange(2,6),
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

}

function foregroundGreeble(){
  renderTarget = SCRATCH; clear(0);  //draw foreground elements
  var i = 400;
  // lcg.setSeed(1019);
  while(--i){
    let x = lcg.nextIntRange(0,WIDTH),
        y = lcg.nextIntRange(0,HEIGHT)

    if(ram[COLLISION + x + y * WIDTH] == WALLS){
      roomNG.setSeed(lcg.seed + x + y * 1234.5678);
      fillRect(
        x + roomNG.nextIntRange(-5,0),
        y + roomNG.nextIntRange(-20,0),
        roomNG.nextIntRange(1,2),
        roomNG.nextIntRange(1,20),
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
      roomNG.setSeed(lcg.seed + x + y * 1234.5678);
      cRect(
        x,
        y,
        roomNG.nextIntRange(5,13),
        roomNG.nextIntRange(2,4),
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
        roomNG.setSeed(lcg.seed + x + y * 1234.5678);
        fillRect(
          x,
          y,
          roomNG.nextIntRange(3,7),
          roomNG.nextIntRange(1,3),
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
      roomNG.setSeed(lcg.seed + i * 1234.5678);
      ram[MIDGROUND + i] = roomNG.nextIntRange(2,4);
    }
  }
}

function drawFuelCrystals(){

  let i = PAGESIZE;
  while(--i){
    if(ram[COLLISION + i] == FUELCRYSTAL){
      roomNG.setSeed(lcg.seed + i * 1234.5678);
      ram[MIDGROUND + i] = roomNG.nextIntRange(9,11);
    }
  }

}

function drawHeads(x,y,width,height,amt){
  renderTarget = MIDGROUND;
  renderSource = SPRITES;

  let i = amt;
  while(i--){
    pal = paldrk;
    roomNG.setSeed(lcg.seed + i * 1234.5678);
    rspr(0,0,32,32, roomNG.nextIntRange(x, x+width), roomNG.nextIntRange(y, y+height), 1, roomNG.nextIntRange(0,359) )
    pal = palDefault;
  }
}
