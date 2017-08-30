states.loading = {

    init: function(dt){
      //song loading
      var songGen = new sonantx.MusicGenerator(a_title);
      songGen.createAudioBuffer(function(buffer) {
          sounds.titleMusic = buffer;
          soundsLoaded++;
      });
      var songGen = new sonantx.MusicGenerator(a_gamesong);
      songGen.createAudioBuffer(function(buffer) {
          sounds.gameMusic = buffer;
          soundsLoaded++;
      });
      var soundGen = new sonantx.SoundGenerator(a_jump);
      soundGen.createAudioBuffer(147, function(buffer) {
        var source = audioCtx.createBufferSource();
        sounds.jump = buffer;
        soundsLoaded++;
      });
  },

    step: function(dt) {

      if(Key.justReleased(Key.z)){
        state = 'menu';
      }

    },

    render: function(dt) {
      renderTarget = SCREEN; clear(0);

      if(soundsLoaded != totalSounds){
        text([
                "LOADING...",
                WIDTH/2,
                128,
                2,
                2,
                'center',
                'top',
                2,
                9,
            ]);

      } else {
        text([
        "PRESS Z TO CONTINUE",
        WIDTH/2,
        128,
        2,
        2,
        'center',
        'top',
        2,
        9,
        ])
      }

    } //end render;

}; //end loading state
