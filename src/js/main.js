//-----main.js---------------
const LEFT = 1;
const RIGHT = 2;
const UP = 3;
const DOWN = 4;



const WALLS = 21;
const FUELCELL = 8;

states = {};

init = () => {

  drawSpriteSheet();
  sounds = {};
  soundsLoaded = 0;
  totalSounds = 1;
  score = 0; //
  fuelAmount = 12000000000;
  fuelTimer = 30;
  parts = 0;
  last = 0;
  dt = 0;
  now = 0;
  t = 0;
  songTrigger = false;
  state = 'menu';
  audioCtx = new AudioContext;
  paused = false;
  transition = false;

  splodes = [];


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
