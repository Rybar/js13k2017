//-----main.js---------------
const LEFT = 1;
const RIGHT = 2;
const UP = 3;
const DOWN = 4;

const WORLDWIDTH = 2; //3 less one for 0 index;
const WORLDHEIGHT = 2; //doesnt change due to 0 index


states = {};

init = () => {

  drawSpriteSheet();

  last = 0;
  dt = 0;
  now = 0;
  t = 0;
  songTrigger = false;
  state = 'menu';
  audioCtx = new AudioContext;

  currentRoom = [0,0];

  player.init();


  stats = new Stats();
  document.body.appendChild( stats.dom );

  //init vid capture
  //capturer = new CCapture( {format: 'gif', workersPath: ''});
  //capturer.start();

  //start the game loop
  // SP = AC.createScriptProcessor(1024, 0, 1);
  // SP.connect(AC.destination);
  // SP.onaudioprocess = renderAudio;
   //player = new sonantx;
   loop();

}



stopCapture = (e) => {
  //capturer.stop();
  //capturer.save();
}

//initialize  event listeners--------------------------
window.addEventListener('keyup', function (event) {
  Key.onKeyup(event);
}, false);
window.addEventListener('mousedown', function (event){
  stopCapture(event);
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

    //game timer
    let now = new Date().getTime();
    dt = Math.min(1, (now - last) / 1000);
    if(dt > 14/1000)dt = 16/1000;
    t += dt;

    states[state].step(dt);
    last = now;

    //draw current state to buffer
    states[state].render();

    //draw buffer to screen
    render(e);

    stats.end();
    requestAnimationFrame(loop);
}

//----- END main.js---------------
