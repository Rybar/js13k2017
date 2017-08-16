//---gamestate.js------------------------------

states.game = {


  step(dt) {
    player.update(dt);
  },

  render(dt) {

    renderTarget = 0x0;

    clear(1);

    rooms[ world[currentRoom] ].draw();

    player.draw(dt);

    renderTarget = 0;


  },

  

};

//---END gamestate.js------------------------------
