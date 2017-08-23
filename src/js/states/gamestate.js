//---gamestate.js------------------------------

states.game = {

  step(dt) {
    //rooms[ world[ currentRoom[1] * (WORLDWIDTH+1) + currentRoom[0]  ] ].update();  //1d array math y * width + x;
    player.update(dt);
  },

  render(dt) {
    renderTarget = 0x0;
    clear(1);
    renderTarget = COLLISION;
    clear(0);
    renderTarget = 0x0;

    rooms[ world[ currentRoom[1] * (WORLDWIDTH+1) + currentRoom[0]  ] ].draw();
    renderSource = COLLISION; //temporary until decoration functions

    renderTarget = SCRATCH;
    clear(0);
    var i = 6000;
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
          lcg.nextIntRange(22, 25)
        );
      }
    }
    outline(SCRATCH, SCRATCH, 8);

    renderTarget = SCREEN;
    renderSource = SCRATCH;
    spr(0,0,384,256);
    player.draw(dt);

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
          lcg.nextIntRange(22, 25)
        );
        fillCircle(x,y-10,2, lcg.nextIntRange(22,26));
      }
    }



    renderTarget = 0;


  },



};

//---END gamestate.js------------------------------
