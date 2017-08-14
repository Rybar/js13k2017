//--------gameoverstate.js-----------

states.gameover = {

    step: function(dt) {

        if(Key.isDown(Key.r)){
          state = 'menu';
        }

    },

    render: function(dt) {

      renderTarget = 0x0;
      clear(0);

      text([
        'GAME OVER',
        256,
        80 + Math.sin(t*2.5)*15,
        8 + Math.cos(t*2.9)*4,
        15 + Math.sin(t*3.5)*5,
        'center',
        'top',
        9,
        27,
      ]);

    },

};

//---------END gameoverstate.js----------
