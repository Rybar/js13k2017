world = [
  0,0,0,
  0,0,1,
  6,7,8
];

rooms = [
  //0
  {
    draw: function(dt){
      renderSource = SPRITES;
      renderTarget = 0;
      spr(0,0,WIDTH,HEIGHT);
      text(['0',20,20,1,1,'left','bottom',2,15,0]);
      lcg.setSeed(1019);
      for(let i = 0; i < 200; i++){
        pset(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), 16);
      }


    }
  },

  //1
  {
    draw: function(dt){
      text([
              '1',
              20,20,1,1,'left','bottom',2,15,0
          ]);

          for(let i = 0; i < 200; i++){
            pset(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), 16);
          }

          let r = 40;
        for(let x=0; x < 384; x+=r){
          for(let y=0; y < 256; y+=r){
            let A = x-192+Math.sin(t)*r;
            let B = y-128+Math.cos(t)*r;
            let s = Math.sqrt(A*A+B*B);
            circle(x,y, s-8, 14);
          }
        }
    }
  },

  //2
  {
    draw: function(dt){

      renderSource = SPRITES;
      renderTarget = 0;
      spr(0,0,WIDTH,HEIGHT);

      lcg.setSeed(42);
      for(let i = 0; i < 200; i++){
        pset(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), 16);
      }

      text([
              '2',
              20,20,1,1,'left','bottom',2,15,0
          ]);
          let r = 40;
      for(let x=0; x < 384; x+=r){
          for(let y=0; y < 256; y+=r){
            let A = x-(192+384)+Math.sin(t)*r;
            let B = y-128+Math.cos(t)*r;
            let s = Math.sqrt(A*A+B*B);
            circle(x,y, s-8, 14);
          }
        }

    }
  },

  //3
  {
    draw: function(dt){
      renderTarget = COLLISION;
      fillRect(0,0,127,256,27);
      fillRect(250,0,127,256,27);
      renderTarget = 0x0;
      text([
              '3',
              20,20,1,1,'left','bottom',2,15,0
          ]);

    }
  },
  //4
  {
    draw: function(dt){
      renderTarget = COLLISION;
      fillRect(0,0,127,256,27);
      fillRect(250,0,127,256,27);
      renderTarget = 0x0;
      text([
              '4',
              20,20,1,1,'left','bottom',2,15,0
          ]);

    }
  },
  //5
  {
    draw: function(dt){
      text([
              '5',
              20,20,1,1,'left','bottom',2,15,0
          ]);
    }
  },
  //6
  {
    draw: function(dt){
      text([
              '6',
              20,20,1,1,'left','bottom',2,15,0
          ]);
          lcg.setSeed(42);
          for(let i = 0; i < 200; i++){
            pset(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), 16);
          }
          renderTarget = COLLISION;
          //fillRect(64,160,)
          fillRect(0,205,384,10, 25);
          renderTarget = 0x0;
    }
  },
  //7
  {
    draw: function(dt){
      text([
              '7',
              20,20,1,1,'left','bottom',2,15,0

          ]);
          renderTarget = COLLISION;
          fillTriangle(0,256,384,256,182,205, 25);
          //fillRect(0,205,384,256-205, 25);
          fillRect(100,70,20,80, 24);
          fillRect(100,140,100,20, 23);
          fillRect(200,820,10,100, 23);
          fillRect(210,70,100,100, 22);
          renderTarget = 0x0;
          lcg.setSeed(42);
          for(let i = 0; i < 200; i++){
            pset(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), 16);
          }
          renderSource = SPRITES;
          spr(0,0,384,256);



    }
  },
  //8
  {
    draw: function(dt){
      text(['8',20,20,1,1,'left','bottom',2,15,0 ]);

      lcg.setSeed(42);
      for(let i = 0; i < 200; i++){
        pset(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), 16);
      }

      renderTarget = COLLISION;
      fillRect(0,205,384,10, 25);
      renderTarget = 0x0;


    }
  },


]

function roomSwitch(direction){
  renderTarget = COLLISION;
  clear(0);
  renderTarget = DEBUG;
  clear(0);
  renderTarget = 0;

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
