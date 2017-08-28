//---gamestate.js------------------------------

states.game = {

  step(dt) {

    if(Key.justReleased(Key.f))state = 'gameover';
    //rooms[ world[ currentRoom[1] * (WORLDWIDTH+1) + currentRoom[0]  ] ].update();  //1d array math y * width + x;
    player.update(dt);
  },

  render(dt) {

    renderTarget = BUFFER; clear(0);
    renderSource = BACKGROUND; spr();
    drawFuel();
    renderSource = MIDGROUND; spr();
    player.draw();
    renderSource = FOREGROUND; spr();


    renderTarget= SCREEN; clear(0);

    // let i = 1000;
    // while(i--)pset(Math.random()*WIDTH, Math.random()*HEIGHT, 2);
    // outline(BUFFER, SCREEN, 9);
    renderSource = BUFFER; spr();
    renderSource = DEBUG; spr();

    splodes.forEach(function(s){s.draw()});

    // if(pal[31] != 31){
    //   let i = 32;
    //   while(i--){
    //     if(pal[i] != i)pal[i]++;
    //   }
    // }
  }
};





//---END gamestate.js------------------------------
