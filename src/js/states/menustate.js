//--------------menustate.js---------------

states.menu = {

  step: function(dt) {

      //game update
      if(Key.isDown(Key.p)){
        state = 'game';
      }

  },

  render: function(dt) {

    renderTarget = 0x0;

    clear(0);

    let s = 256;
    let i = t/3;
    for(let y = -128; y < 128; y += 1 ){
      for(let x = -256; x < 256; x += 2 ){
        pset(s+x+256*Math.cos( (y/128+i)*4 )+y, s+y+128*Math.sin( (x/256+i)*4 )+x, x/8%32)
      }
    }

    text([
            'LOSTGAME',
            WIDTH/2,
            40 + Math.sin(t*2.5)*15,
            8 + Math.cos(t*2.9)*4,
            15 + Math.sin(t*3.5)*5,
            'center',
            'top',
            6,
            21,
        ]);

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
  },

};

//-------END menustate.js-------------
