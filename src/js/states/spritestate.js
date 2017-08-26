states.spritesheet = {

    step: function(dt) {

        if(Key.isDown(Key.x)){
          state='menu'
        }

    },

    render: function(dt) {


        renderTarget = SCREEN;
        checker(0,0,384,256,256/20|0,384/20|0,1);
        renderSource = SPRITES; spr();


        for(var i = 0; i < 32; i++){
          text([
            i.toString(),
            i < 16 ? ( 3+16*i ) : ( 3 + 16* (i-16) ) ,
            i < 16 ? 40 : 40 + 16,
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
