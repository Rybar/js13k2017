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

    // if(pal[31] != 31){
    //   let i = 32;
    //   while(i--){
    //     if(pal[i] != i)pal[i]++;
    //   }
    // }



  },



};

//---END gamestate.js------------------------------
