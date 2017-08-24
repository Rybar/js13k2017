//---gamestate.js------------------------------

states.game = {

  step(dt) {
    //rooms[ world[ currentRoom[1] * (WORLDWIDTH+1) + currentRoom[0]  ] ].update();  //1d array math y * width + x;
    player.update(dt);
  },

  render(dt) {

    renderTarget = BUFFER; clear(0);
    renderSource = MIDGROUND; spr();

    player.draw();

    renderSource = FOREGROUND; spr();


    renderTarget= SCREEN; clear(1);
    renderSource = BUFFER; spr();



  },



};

//---END gamestate.js------------------------------
