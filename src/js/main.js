//-----main.js---------------


states = {};

init = () => {

  lcg = new LCG(1019);
  //lcg.nextInt();

  roomNG = new LCG();
  roomNG.setSeed(1019);

  sounds = {};
  soundsLoaded = 0;
  totalSounds = 7;
  score = 0;
  fuelTimer = 0;
  parts = 0;
  last = 0;
  dt = 0;
  now = 0;
  t = 0;
  state = 'loading';
  splodes = [];
  messages = [];
  help = [];
  tCounter = 0;
  helpSection = 0;



  //FLAGS--------------------------------------------------------------
  paused = false;
  transition = false;
  gotFirst200 = false;

  //sound flags--------------------------------------------------------
  s_titleSong = false;
  s_gameSong = false;
  s_jump = false;
  s_step = false;

  audioCtx = new AudioContext;
  drawSpriteSheet();
  states.loading.init();
  player.init();

  //stats = new Stats();
  //document.body.appendChild( stats.dom );

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
  //stats.begin();

  if(paused){
    pal = paldrk;

    text([
      'PAUSED',
      WIDTH/2,
      128,
      3,
      1,
      'center',
      'top',
      4,
      21,
      0
    ])

  }else{
    pal = palDefault;
    //game timer
    let now = new Date().getTime();
    dt = Math.min(1, (now - last) / 1000);
    t += dt;

    states[state].step(dt);
    last = now;

    //draw current state to buffer
    states[state].render();

    //draw buffer to screen

  }
  render(e);

  //stats.end();
  requestAnimationFrame(loop);
}

//----- END main.js---------------
