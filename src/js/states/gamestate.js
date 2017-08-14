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

    fillRect(0,0,16,16,17);
    rect(400,16,16,16);
    fillCircle(32,32,8,21);
    circle(64,32,8,21);
    line(128,32,192,64,21);
    triangle(0,0,16,16,32,32);
    fillTriangle(32,0,64,64,128,128,21);
    spr(0,0,16,16);
    sspr(0,0,16,16,0,0,16,16);
    renderSource = 0x0;
    fillRect(256,0,256,256,1);
    //checker(256, 0, 256,256, 8,8, 2);
    rspr(0,128,128,256, 400,128, 1.5, 45)
    text([
            "JS13K BOILERPLATE",
            256,
            20,
            2,
            2,
            'center',
            'top',
            1,
            21,
        ]);


  },

};

//---END gamestate.js------------------------------
