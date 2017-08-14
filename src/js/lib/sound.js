var songGen = new sonantx.MusicGenerator(song1);

// songGen.createAudioBuffer(function(buffer) {
//     var source = audioCtx.createBufferSource();
//     source.buffer = buffer;
//     source.connect(audioCtx.destination);
//     source.start();
// });


// //TODO: implement one-off sound effect events (shots, coins, etc)
// //TODO: implement music-synchronized visuals
//
// time = 0;
//
// function renderAudio(e) {
//   audioData = e.outputBuffer.getChannelData(0);
//
//   inc = 1 / AC.sampleRate
//
//   samplesPerFrame = AC.sampleRate / 60;
//   //time = t;
//   for(i = 0; i < audioData.length; i++){
//     //time = t;
//     time += inc;
//     signal = 0;
//
//     beat = time * 1.3;
//     bar = beat / 4;
//     half = beat / 2;
//     pattern = bar / 2;
//     note = beat * 4;
//
//     //bassdrum
//     env = Math.pow(1 - beat % 1, 8);
//     signal += ( oscSinus(50) + oscNoise() * .1 ) * env * .3;
//
//     //hat
//     env = Math.pow(1 - beat % .5, 16);
//     signal += oscNoise() * env * .1;
//
//     //hat
//     env = Math.pow(1 - beat % .25, 16);
//     signal += oscNoise() * env * .05;
//
//     //snare
//     env = Math.pow(1 - half % 1, 10);
//     signal += oscNoise() * env * .15;
//
//     //bass
//     env = Math.pow(1- note % 1, 3);
//     f = getnotefreq( bass[note % bass.length|0]  );
//     signal += oscSquare(f) * env * .15;
//
//     //bass2
//     env = Math.pow(1 - note % .5, 3);
//     f = getnotefreq( bass[note % bass.length|0] );
//     signal += oscSquare(f) * env * .15;
//
// //    //lead
//
//       env = Math.pow(1- note % 1, .5);
//       f = getnotefreq( notes[note % notes.length|0] + 0 );
//       signal += ( oscSawtooth(f) + oscSawtooth(f*1.01) + oscSawtooth(f*1.02) ) * env * .05;
//
//
//     //lead2
//
//       env = Math.pow(1- note % 1, 1);
//       f = getnotefreq( notesb[note % notesb.length|0] );
//       signal += ( oscSawtooth(f) + oscSawtooth(f*1.005) + oscSawtooth(f*1.0006) ) * env * .05;
//
//
//
//
//   audioData[i] = signal;
//
//
//   }
//
// }
// kick = "1000100010001000";
// bass =   [-35,0,-23,0,0,-35,0,0,-23,0]
// notes =  [4,0,4,1,0,4,0,4,3,0,4,0,4,8,0,4,0,4,3,0,5,0,5,5,0,5,0,5,5,0,5,5,5,8,0,5,5,0,5,0]
// notesb = [13,1,8,6,11];
//
//
// oscSinus =
//   f => Math.sin(f * time * Math.PI * 2);
//
// oscSawtooth =
//   f => (f * time * 2 + 1) % 2 - 1;
//
// oscSquare =
//   f => 1 - (f * time * 2 & 1) * 2;
//
// oscNoise =
//   f => Math.random() * 2 - 1;
//
// function getnotefreq(n){
//     if(n == 0)return 0;
//     return 0.00390625 * Math.pow(1.059463094, n + 200); //200 magic number gets note 1 in audible range around middle C
// }
