states.spritesheet = {

    step: function(dt) {

        if(Key.justReleased(Key.x)){
          roomSwitch();
          state = 'menu';
        }
    },

    render: function(dt) {

        renderTarget = SCREEN;
        clear(0);
        checker(0,0,384,256,256/32|0,384/32|0,1);
        renderSource = SPRITES; spr();
        spr(0,0,22,34, 300,100);
        rspr(0,0,32,32, 16,128-16, 1, 15+t*90);
        rspr(32,0,32,32, 48,128-16, 1, 15+t*90);
        rspr(64,0,32,32, 48+32,128-16, 1, 15+t*90);

        for(var i = 0; i < 32; i++){
          text([
            i.toString(),
            i < 16 ? ( 3+16*i ) : ( 3 + 16* (i-16) ) ,
            i < 16 ? 200 : 200 + 16,
            1,
            1,
            1,
            'left',
            1,
            i,
            0
          ])
          }



        } //end render
}//end state
