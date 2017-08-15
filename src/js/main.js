//-----main.js---------------

states = {};

init = () => {

  last = 0;
  dt = 0;
  now = 0;
  t = 0;
  moveX = 0;
  speedFactor = .6;
  songTrigger = false;
  state = 'game';
  audioCtx = new AudioContext;

  fontString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_!@.'\"?/<()";

  fontBitmap = "11111100011111110001100011111010001111101000111110111111000010000100000111111100100101000110001111101111110000111001000011111111111000"+
  "0111001000010000111111000010111100011111110001100011111110001100011111100100001000010011111111110001000010100101111010001100101110010010100011000"+
  "0100001000010000111111000111011101011000110001100011100110101100111000101110100011000110001011101111010001100101110010000011101000110001100100111"+
  "1111101000111110100011000101111100000111000001111101111100100001000010000100100011000110001100010111010001100011000101010001001000110001101011010"+
  "1011101000101010001000101010001100010101000100001000010011111000100010001000111110010001100001000010001110011101000100010001001111111110000010011"+
  "0000011111010010100101111100010000101111110000111100000111110011111000011110100010111011111000010001000100001000111010001011101000101110011101000"+
  "1011110000101110011101000110001100010111000000000000000000000111110010000100001000000000100111111000110111101011011101010111110101011111010100000"+
  "000000000000000000100001100001000100000000000011011010011001000000000000111010001001100000000100000010001000100010001000000010001000100000100000100001000100001000010000010"

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
    t += dt;

    //draw current state to buffer
    states[state].render();

    states[state].step(dt);
    last = now;

    //draw buffer to screen
    render(e);

    stats.end();
    requestAnimationFrame(loop);
}

//----- END main.js---------------
