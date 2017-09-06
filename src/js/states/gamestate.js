//---gamestate.js------------------------------

states.game = {

  step(dt) {
    // if(!s_gameSong){
    //   s_gameSong = true;
    //   playSound(sounds.gameMusic, 1, 0, true);
    // }

    if(Key.isDown(Key.f))state = 'spritesheet';
    //rooms[ world[ currentRoom[1] * (WORLDWIDTH+1) + currentRoom[0]  ] ].update();  //1d array math y * width + x;
    player.update(dt);
    fuelTimer -= dt;
    // if(fuelTimer < 0){
    //   fuelTimer = 0;
    //   state = 'gameover';
    // }
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


      //-----------------------
    // let k = 9000;
    // while(--k){
    //   let t = 2 * Math.PI * Math.random();
    //   let u = Math.random() * 250 + Math.random() * 250;
    //   let r = u > 60 ? u : 120-u;
    //
    //
    //   let x = r * Math.cos(t) + player.x | 0;
    //   let y = r * Math.sin(t) + player.y | 0;
    //   circle(x, y, 1, paldrk[ ram[SCREEN + x + (y+1) * WIDTH] ]);
    // }
    renderTarget = SCREEN;
    text([
      fuelTimer.toFixed(2).toString(),
      WIDTH/2,
      10,
      2,
      2,
      'center',
      'top',
      1,
      9,
    ]);
    splodes.forEach(function(s){s.draw()});

    // if(pal[31] != 31){
    //   let i = 32;
    //   while(i--){
    //     if(pal[i] != i)pal[i]++;
    //   }
  },
}





//---END gamestate.js------------------------------
