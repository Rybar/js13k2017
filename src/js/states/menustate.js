//--------------menustate.js---------------

states.menu = {

  step: function(dt) {

      //game update
      if(Key.isDown(Key.p)){
        roomSwitch();
        state = 'game';
        //transition = true;
      }
      if(Key.isDown(Key.z)){
        state = 'spritesheet';
      }
      // if(transition){
      //   transitionOut();
      //   transition = false;
      // }

  },

  render: function(dt) {
    renderTarget = COLLISION; clear(0);
    renderTarget = 0x0; clear(0);
    renderTarget = BUFFER; clear(0);
    renderTarget = SCRATCH; clear(0);
    renderTarget = SCREEN; clear(0);

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
            25,
        ]);

    renderTarget = BUFFER;
    renderSource = COLLISION; spr();

    renderTarget = SCRATCH2;

    lcg.setSeed(1019);
    var j = 9000;
    while(--j){
      let x = lcg.nextIntRange(0,WIDTH),
          y = lcg.nextIntRange(0,HEIGHT)

      if(ram[COLLISION + x + y * WIDTH]){
        fillRect(
          x + lcg.nextIntRange(-2,2),
          y + lcg.nextIntRange(-1,1),
          lcg.nextIntRange(0,4),
          lcg.nextIntRange(0,2),
          lcg.nextIntRange(22, 24)
        );
      }
    }
    outline(SCRATCH2, SCRATCH, 25, 20, 23, 18);
    renderTarget = BUFFER;
    renderSource = SCRATCH2; spr();
    renderSource = SCRATCH; spr();
    //player.draw();
    renderSource = SPRITES;
    rspr(0,0,19,34, 384/2,60, 1, t)

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

        renderTarget = SCREEN;
        var i = 8000;
        while(--i){
          pset(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), 1);
        }
        var i = 400;
        while(--i){
          pset(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), 26);
        }
        var i = 100;
        while(--i){
          pset(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), 21);
        }

        outline(BUFFER, SCREEN, 15);
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
