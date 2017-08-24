//--------------menustate.js---------------

states.menu = {

  step: function(dt) {

      //game update
      if(Key.isDown(Key.p)){
        roomSwitch(DOWN);
        state = 'game';
      }

  },

  render: function(dt) {
    renderTarget=COLLISION;
    clear(0);

    renderTarget = 0x0;
    clear(0);

    renderTarget = COLLISION;
    text([
            'GREEBLE',
            WIDTH/2,
            150,
            8,
            15,
            'center',
            'top',
            6,
            25,
        ]);

    renderTarget = BUFFER;
    renderSource = COLLISION;spr();

    lcg.setSeed(1019);
    var j = 8000;
    while(--j){
      let x = lcg.nextIntRange(0,WIDTH),
          y = lcg.nextIntRange(0,HEIGHT)

      if(ram[COLLISION + x + y * WIDTH]){
        fillRect(
          x + lcg.nextIntRange(-2,2),
          y + lcg.nextIntRange(-2,2),
          lcg.nextIntRange(0,6),
          lcg.nextIntRange(0,5),
          lcg.nextIntRange(22, 25)
        );
      }
    }
    player.draw();

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
        renderSource = BUFFER; spr();
  },

};

//-------END menustate.js-------------
