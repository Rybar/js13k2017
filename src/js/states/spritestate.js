states.spritesheet = {

    step: function(dt) {

        if(Key.isDown(Key.x)){
          roomSwitch();
          state = 'menu';
        }

        if(Key.isDown(Key.p))state = 'game';

    },

    render: function(dt) {

        renderTarget = SCREEN;
        clear(0);
        //checker(0,0,384,256,256/32|0,384/32|0,1);
        renderSource = SPRITES; spr();
        spr(0,0,22,34, 300,100);

        rspr(0,0,32,32, 16,128-16, 1, 15+t*90); //head. works.

        rspr(32,0,32,32, 48,128-16, 1, 15+t*90);  //body. bugged

        rspr(64,0,32,32, 48+32,128-16, 1, 15+t*90); //wheel hub. bugged.

        // for(n=p=i=0;p<2e3;i%2||pset(p%23,p/23|0,21),p++){
        //   p^n||(n=p+([...'F0AL1314B2C2B16001177AeBSB1SB1R11AREàBDCCB5CAM6A51CBCB513333ZAQAÜAQFMEWB5DCCBC4IA515CC613333ZAFBIAKBO3BJFEBFEJBMAHAH3AFBGAGB5FAJBCA5O6BMBCA5IB5F4FAH3AGBH2HBH2IAG34G4LBIBHBIACC17K4N3ELAD1C1B1B7F7CB7GACDCEBACI13CA6AF13FBAF13BF3B7cCEANC11C0117CI0AP1ANEPILCGCIBKBGB1I1BE6BG6BDAC1312D2B2B2HAC12LADADALAIAN71AK5E1BD'].map(v=>['AAAAAA','AA','ACA','AE','AGA','DB','BB','AB'][v]||v).join('').charCodeAt(i++)&63))
        // }

        for(var i = 0; i < 32; i++){
          text([
            i.toString(),
            i < 16 ? ( 3+16*i ) : ( 3 + 16* (i-16) ),
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
