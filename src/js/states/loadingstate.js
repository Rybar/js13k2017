states.loading = {

    init: function(dt){
      song loading
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
      var songGen = new sonantx.MusicGenerator(a_zapgun);
      songGen.createAudioBuffer(function(buffer) {
          sounds.zapgun = buffer;
          soundsLoaded++;
      });
      var songGen = new sonantx.MusicGenerator(a_fuelget);
      songGen.createAudioBuffer(function(buffer) {
          sounds.fuelget = buffer;
          soundsLoaded++;
      });

      var soundGen = new sonantx.SoundGenerator(a_jump);
      soundGen.createAudioBuffer(147, function(buffer) {
        var source = audioCtx.createBufferSource();
        sounds.jump = buffer;
        soundsLoaded++;
      });
      var soundGen = new sonantx.SoundGenerator(a_boom);
      soundGen.createAudioBuffer(147, function(buffer) {
        var source = audioCtx.createBufferSource();
        sounds.boom = buffer;
        soundsLoaded++;
      });
      var soundGen = new sonantx.SoundGenerator(a_step);
      soundGen.createAudioBuffer(147, function(buffer) {
        var source = audioCtx.createBufferSource();
        sounds.step = buffer;
        soundsLoaded++;
      });
  },

    step: function(dt) {

      if(Key.justReleased(Key.z)){
        if(soundsLoaded == totalSounds){
          state = 'menu';
        }
      }
      tCounter--;
      if(tCounter < 0 && soundsLoaded != totalSounds){
        tCounter = 9;
        splodes.push(new splode(WIDTH/2 + Math.cos(t)*100, HEIGHT/2+Math.sin(t)*70, 300, 1, 12))
      }
    },

    render: function(dt) {
      renderTarget = SCREEN; clear(0);


      if(soundsLoaded != totalSounds){

        renderTarget = SCREEN; clear(0);
        splodes.forEach(function(s){s.draw()});

        text([
                "LOADING...",
                WIDTH/2,
                128 + Math.sin(t) * 20,
                3,
                2,
                'center',
                'top',
                3,
                9,
            ]);

      } else {
        splodes.forEach(function(s){s.draw()});
        text([
        "HEADPHONES RECOMMENDED.\nPRESS Z TO CONTINUE",
        WIDTH/2,
        128 + Math.sin(t) * 20,
        2,
        10,
        'center',
        'top',
        2,
        9,
        ])
      }

    } //end render;

}; //end loading state
