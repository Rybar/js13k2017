states.loading = {

    init: function(dt){
      //sound loading
      var songGen = new sonantx.MusicGenerator(song1);

      songGen.createAudioBuffer(function(buffer) {
          sounds.song1 = buffer;
          soundsLoaded++;
          //source.buffer = buffer;
          //source.connect(audioCtx.destination);
          //source.start();
      });

    soundGen.createAudioBuffer(147, function(buffer) {
      var source = audioCtx.createBufferSource();
      // source.buffer = buffer;
      // source.connect(audioCtx.destination);
      // source.start();
    });



    }

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
