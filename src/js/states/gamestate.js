//---gamestate.js------------------------------

states.game = {


  step(dt) {
    player.update(dt);
  },

  render(dt) {

    renderTarget = 0x0;

    clear(1);

    rooms[ world[ currentRoom[1] * (WORLDWIDTH+1) + currentRoom[0]  ] ].draw();  //1d array math y * width + x;

    player.draw(dt);

    renderTarget = 0;


  },



};

//---END gamestate.js------------------------------
