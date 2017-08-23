//--------------menustate.js---------------

states.menu = {

  step: function(dt) {

      //game update
      if(Key.isDown(Key.p)){
        state = 'game';
      }

  },

  render: function(dt) {
    renderTarget=COLLISION;
    clear(0);

    renderTarget = 0x0;
    clear(0);

    let s = 256;
    let i = t/3;
    for(let y = -128; y < 128; y += 1 ){
      for(let x = -256; x < 256; x += 2 ){
        pset(s+x+256*Math.cos( (y/128+i)*4 )+y, s+y+128*Math.sin( (x/256+i)*4 )+x, x/8%32)
      }
    }
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



    renderTarget = 0;
    //cRect(100,100,200,40,10,24);
    var j = 8000;
    renderSource = COLLISION;
    spr(0,0,384,256);

    lcg.setSeed(1019);
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
