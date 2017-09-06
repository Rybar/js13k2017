//-----main.js---------------


states = {};

init = () => {

  lcg.setSeed(1019);
  lcg.nextInt();

  sounds = {};
  soundsLoaded = 0;
  totalSounds = 3;
  score = 0; //
  //fuelAmount = 12000000000;
  fuelTimer = 100;
  parts = 0;
  last = 0;
  dt = 0;
  now = 0;
  t = 0;
  state = 'menu';
  splodes = [];


  //FLAGS--------------------------------------------------------------
  paused = false;
  transition = false;

  //sound flags--------------------------------------------------------
  s_titleSong = false;
  s_gameSong = false;
  s_jump = false;

  audioCtx = new AudioContext;
  drawSpriteSheet();
  //states.loading.init();
  player.init();

  stats = new Stats();
  document.body.appendChild( stats.dom );

   loop();

}

//initialize  event listeners--------------------------
window.addEventListener('keyup', function (event) {
  Key.onKeyup(event);
}, false);
window.addEventListener('keydown', function (event) {
  Key.onKeydown(event);
}, false);
window.addEventListener('blur', function (event) {
  paused = true;
}, false);
window.addEventListener('focus', function (event) {
  paused = false;
}, false);

loop = e => {
  stats.begin();

  if(paused){
    pal = paldrk;

    text([
      'PAUSED',
      192,
      128,
      1,
      1,
      1,
      'center',
      1,
      21,
      0
    ])

  }else{
    pal = palDefault;
    //game timer
    let now = new Date().getTime();
    dt = Math.min(1, (now - last) / 1000);
    //if(dt > 14/1000)dt = 16/1000;
    t += dt;

    states[state].step(dt);
    last = now;

    //draw current state to buffer
    states[state].render();

    //draw buffer to screen

  }
  render(e);

  stats.end();
  requestAnimationFrame(loop);
}

//----- END main.js---------------
