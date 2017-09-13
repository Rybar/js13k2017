

const LEFT = 1;
const RIGHT = 2;
const UP = 3;
const DOWN = 4;

const HEADMODE = 1;
const BODYMODE = 2;
const ARMMODE = 3;
const THRUSTERMODE = 4;

const WALLS = 1;
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
  renderSource = COLLISION;
  renderTarget = MIDGROUND; spr();

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


function denseGreeble(basecolor = 1, left=1, top=15, right=3, bottom=1){

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
  outline(SCRATCH, SCRATCH2, 1,15,3,1);

  renderTarget = MIDGROUND;
  renderSource = SCRATCH; spr();
  renderSource = SCRATCH2; spr();

}

function foregroundGreeble(basecolor = 1, left=2, top=15, right=2, bottom=0){
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
        basecolor,
        roomNG.nextIntRange(1,16),
        1
      );
      circle(x,y-10,1, basecolor);
    }
  }
  renderTarget = SCRATCH2; clear(0);
  outline(SCRATCH, SCRATCH2, left, top, right, bottom);
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
      j = 15;
      while(--j){
        let x = lcg.nextIntRange(0,WIDTH),
            y = lcg.nextIntRange(0,HEIGHT)

        if(ram[COLLISION + x + y * WIDTH] == WALLS){
          roomNG.setSeed(lcg.seed + x + y * 1234.5678);
          fillRect(
            x,
            y,
            roomNG.nextIntRange(10,80),
            roomNG.nextIntRange(10,80),
            0
            );
          }
        }
  renderTarget = SCRATCH2; clear(0);
  outline(SCRATCH, SCRATCH2, 24, 18, 25);
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

function drawClouds(){

  let i = 36;
  while(i--){
    roomNG.setSeed(lcg.seed + i * 1234.5678);

    let y = ( ( (roomNG.nextIntRange(-200,HEIGHT) - (t*20)|0) )%HEIGHT*2)+HEIGHT;
    let width = roomNG.nextIntRange(20,120);
    let height = roomNG.nextIntRange(10,30);
    let x = roomNG.nextIntRange(-200,WIDTH);
    //let x = ( ( (roomNG.nextIntRange(-200,WIDTH) + (t*20)|0) )%WIDTH*2)-WIDTH;
    linecRect(x,y,width,height,5, 1);
  }

}

function drawHorizon(color1 = 1, color2 = 14){

  let i = 150;
  while(i--){
    renderTarget = BACKGROUND;
    roomNG.setSeed(lcg.seed + i * 1234.5678);
    let y = roomNG.nextIntRange(60,HEIGHT)
    let width = roomNG.nextIntRange(3,15)
    let x = roomNG.nextIntRange(0,WIDTH);
    fillCircle(x,y,width,color1);

  }
  i = 150;
  while(i--){
    renderTarget = BACKGROUND;
    roomNG.setSeed(lcg.seed + i * 1232.5678);
    let y = roomNG.nextIntRange(100,HEIGHT)
    let width = roomNG.nextIntRange(3,15);
    let x = roomNG.nextIntRange(0,WIDTH);
    fillCircle(x,y,width,color2);

  }

  i = 100;
  while(i--){
    renderTarget = BACKGROUND;
    roomNG.setSeed(lcg.seed + i * 1230.5678);
    let y = roomNG.nextIntRange(150,HEIGHT)
    let width = roomNG.nextIntRange(15,20);
    let x = roomNG.nextIntRange(0,WIDTH);
    fillCircle(x,y,width,color1);
  }
}

function drawUnderground(){

  let i = 150;
  while(i--){
    renderTarget = BACKGROUND;
    roomNG.setSeed(lcg.seed + i * 1234.5678);
    let y = roomNG.nextIntRange(0,HEIGHT)
    let width = roomNG.nextIntRange(15,60)
    let height = roomNG.nextIntRange(15,60)
    let x = roomNG.nextIntRange(0,WIDTH);
    linecRect(x,y,width,height,3,1);

  }

}

function drawBlocks(arr, flipped=false){
  arr.forEach(function(block, i, arr){
    if(block == 1){
      fillRect((i%12)*32, ((i/12)|0)*32, 32, 32, WALLS);
    }
    if(block == 2){
      pset((i%12)*32+16, ((i/12)|0)*32+16, FUELCELL);
    }
    if(block == 7){
      pset((i%12)*32+16, ((i/12)|0)*32+16, ARM);
    }
    if(block == 8){
      pset((i%12)*32+16, ((i/12)|0)*32+16, THRUSTER);
    }
  });
  if(flipped){
    renderSource = COLLISION;
    renderTarget = SCRATCH; spr(0,0,WIDTH,HEIGHT,0,0,true);
    renderTarget = COLLISION; clear();
    renderSource = SCRATCH; spr();

  }
}
