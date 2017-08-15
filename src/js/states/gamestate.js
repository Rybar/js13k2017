//---gamestate.js------------------------------

states.game = {


  step(dt) {

  },

  render(dt) {

    renderTarget = 0x0;
    //background dot waves
    clear(1);
    let s = 256;
    let i = t/3;
    for(let y = -128; y < 128; y += 1 ){
      for(let x = -256; x < 256; x += 2 ){
        pset(s+x+256*Math.cos( (y/128+i)*4 )+y, s+y+128*Math.sin( (x/256+i)*4 )+x, x/8%32)
      }
    }

    renderTarget = 0;


  },

};

//---END gamestate.js------------------------------
