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
    spr(0,0,WIDTH,HEIGHT);
    renderSource = DEBUG;
    spr(0,0,WIDTH,HEIGHT);

    player.draw(dt);

    renderTarget = 0;


  },



};

//---END gamestate.js------------------------------
