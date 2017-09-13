//--------------menustate.js---------------

states.menu = {//

  step: function(dt) {

      if(!s_titleSong){
        titleSong = playSound(sounds.titleMusic, 1, 0, true);
        s_titleSong = true;
      }

      //game update
      if(Key.justReleased(Key.p)){
        let i = 10;
        while(i--){
          splodes.push(
            new splode(
              player.x + Math.random()*40-20,
              player.y + Math.random()*40-20,
              200, 1, 5));
          splodes.push(
            new splode(
              player.x + Math.random()*40-20,
              player.y + Math.random()*40-20,
              200, 1, 8));
          splodes.push(
            new splode(
              player.x + Math.random()*40-20,
              player.y + Math.random()*40-20,
              32, 1, 21, true));
          splodes.push(
            new splode(
              player.x + Math.random()*40-20,
              player.y + Math.random()*40-20,
              25, 1, 0, true));
        }
        playSound(sounds.boom, 1, player.x.map(0, WIDTH, -1, 1), false);
        roomSwitch();
        state = 'game';
        titleSong.sound.stop();
      }


  },

  render: function(dt) {
    renderTarget = COLLISION; clear(0);
    renderTarget = 0x0; clear(0);
    renderTarget = BUFFER; clear(0);
    renderTarget = SCRATCH; clear(0);
    renderTarget = SCREEN; clear(0);



    renderTarget = COLLISION;
    fillRect(0,128,WIDTH,10, 2);

    text([
            'GREEBLE',
            WIDTH/2,
            50,
            14,
            20,
            'center',
            'top',
            7,
            2,
        ]);

    renderTarget = BUFFER;
    renderSource = COLLISION; spr();

    renderTarget = SCRATCH2;

    lcg.setSeed(21);
    var j = 6000;
    while(--j){
      let x = lcg.nextIntRange(0,WIDTH),
          y = lcg.nextIntRange(0,HEIGHT)

      if(ram[COLLISION + x + y * WIDTH]){
        fillRect(
          x + lcg.nextIntRange(-2,2),
          y + lcg.nextIntRange(-1,1),
          1,
          lcg.nextIntRange(0,3),
          lcg.nextIntRange(24, 25)
        );
      }
    }
    outline(SCRATCH2, SCRATCH, 25, 20, 23, 18);
    renderTarget = BUFFER;
    renderSource = SCRATCH2; spr();
    renderSource = SCRATCH; spr();

    renderTarget = SCRATCH2;

    lcg.setSeed(20);
    var j = 6000;
    while(--j){
      let x = lcg.nextIntRange(0,WIDTH),
          y = lcg.nextIntRange(0,HEIGHT)

      if(ram[COLLISION + x + y * WIDTH]){
        fillRect(
          x + lcg.nextIntRange(-1,1),
          y + lcg.nextIntRange(0,1),
          lcg.nextIntRange(1,5),
          1,
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
    let bots = 15;
    while(--bots){
      spr(192-32,0,32,40, (32*bots+t*16|0)%WIDTH, 90);
      if((32*bots+t*16|0)%WIDTH == WIDTH-1){
        splodes.push(new splode(16,100) );
        splodes.push(new splode(16,116) )
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

        renderTarget = SCREEN;
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

        outline(BUFFER, SCREEN, 15);
        renderSource = BUFFER; spr();

        splodes.forEach(function(splode, index, arr){splode.draw(index)});


        // if(player.y > HEIGHT){
        //   //begin = false;
        //   roomSwitch();
        //   state = 'game';
        // }
  },

};

//-------END menustate.js-------------
