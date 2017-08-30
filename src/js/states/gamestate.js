//---gamestate.js------------------------------

states.game = {

  step(dt) {
    if(!s_gameSong){
      s_gameSong = true;
      playSound(sounds.gameMusic, 1, 0, true);
    }

    if(Key.justReleased(Key.f))state = 'gameover';
    //rooms[ world[ currentRoom[1] * (WORLDWIDTH+1) + currentRoom[0]  ] ].update();  //1d array math y * width + x;
    player.update(dt);
    fuelTimer -= dt;
    if(fuelTimer < 0)fuelTimer = 0;
  },

  render(dt) {

    renderTarget = SCREEN; clear(0);
    renderSource = BACKGROUND; spr();
    renderTarget = BUFFER; clear(0);
    drawFuel();
    renderSource = MIDGROUND; spr();
    player.draw();
    renderSource = FOREGROUND; spr();


    renderTarget= SCREEN;

    if(fuelTimer){
      if(fuelTimer > 20){
        renderSource = BUFFER; spr();
        renderSource = DEBUG; spr();
      } else{
        renderTarget = SCREEN; clear(0);
        let i = 1000;
        while(i--)pset(Math.random()*WIDTH, Math.random()*HEIGHT, 2);
        outline(BUFFER, SCREEN, 9);  //-green outline effect
      }
    }else {
      renderTarget = SCREEN; clear(0);
      let i = 2000;
      while(i--){
        let x = Math.random()*WIDTH|0;
        let y = Math.random()*HEIGHT|0;
        let color = ram[BUFFER + x + y * WIDTH] ? 27 : 0;
        circle(x, y, 1, color);
      }
    }
    text([
      fuelTimer.toString(),
      192,
      10,
      1,
      1,
      1,
      'center',
      1,
      9,
      0
    ])
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
