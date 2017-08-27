states.emptystate = {

    step: function(dt) {

        //game update

    },

    render: function(dt) {

        drawSpriteSheet();

        renderTarget = SCREEN;
        renderSource = SPRITES; spr();

        //draw stuff here.

        //can't forget this call!
        //draws indexed color array to actual display canvas


    },



};
