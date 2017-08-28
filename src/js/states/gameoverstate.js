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
        'CRITICAL SYSTEM\nFAILURE',
        384/2,
        80,
        8,
        15,
        'center',
        'top',
        3,
        27,
      ]);

    },

};

//---------END gameoverstate.js----------
