//--------------menustate.js---------------

states.menu = {

  step: function(dt) {

      // if(!s_titleSong){
      //   titleSong = playSound(sounds.titleMusic, 1, 0, true);
      //   s_titleSong = true;
      // }

      //game update
      if(Key.justReleased(Key.p)){
        roomSwitch();
        state = 'game';
        //titleSong.sound.stop();
        //transition = true;
      }


  },

  render: function(dt) {
    renderTarget = COLLISION; clear(0);
    renderTarget = SCREEN; clear(0);
    renderTarget = BACKGROUND; clear(0);
    renderTarget = BUFFER; clear(0);
    renderTarget = SCRATCH; clear(0);

    renderTarget = COLLISION;
    text([
            'GREEBLE',
            WIDTH/2,
            150,
            20,
            20,
            'center',
            'top',
            6,
            WALLS,
        ]);

    renderTarget = BUFFER;
    renderSource = COLLISION; spr();

     lcg.setSeed(21);


    player.draw();
    renderSource = SPRITES;
    let bots = 8;
    while(--bots){
      spr(96+64,0,25,36, 192+25*bots, 40);
    }

    //rspr(1,1,25,36, 64,64, 1, 45);


    text([
            "PRESS P TO CONTINUE",
            WIDTH/2,
            230,
            2,
            2,
            'center',
            'top',
            1,
            21,
        ]);

        renderTarget = SCRATCH;
        var i = 8000;
        while(--i){
          pset((lcg.nextIntRange(0,384)+t*10|0)%384, lcg.nextIntRange(0,256), 1);
        }
        var i = 400;
        while(--i){
          pset( (lcg.nextIntRange(0,384)+t*20|0)%384, lcg.nextIntRange(0,256), 26);
        }
        var i = 100;
        while(--i){
          pset((lcg.nextIntRange(0,384)+t*30|0)%384, lcg.nextIntRange(0,256), 21);
        }

        renderTarget = SCREEN;
        outline(BUFFER, SCREEN, 15);
        renderSource = SCRATCH; spr();
        renderSource = BUFFER; spr();

        //   if(pal[31] == 0){
        //   roomSwitch();
        //   state = 'game'
        //   transition = false;
        // }

        //outline(BUFFER, SCRATCH, 8);1
  },

};

//-------END menustate.js-------------
