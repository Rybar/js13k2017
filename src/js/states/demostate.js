states.demo = {


  step(dt) {

    player.update(dt);


    bulletPool.use();

    Key.update();
  },

  render(dt) {

    renderTarget = 0x00000;

    switch(demostate){

      case 1:
        clear(0);
        let r = 40;
        for(x=0; x < 256; x+=r){
          for( y=0; y < 256; y+=r){
            let A = x-128+Math.sin(t)*r;
            let B = y-128+Math.cos(t)*r;
            let s = Math.sqrt(A*A+B*B);
            circle(x,y, s-8, 21);
          }
        }
        renderInstructions();
      break;

      case 2:
        clear(0);
        for(let a = 0; a < 2 * Math.PI; a+= 0.7){
          for(let r = 20; r < 200; r += 9){

            let v = a + .4 * Math.sin(a*8-r/20+t);
            fillCircle((128+r*Math.cos(v)), 128+r*Math.sin(v), (10-r/12)|0, 10+(r/9%32)|0 );

          }
        }
        renderInstructions();
      break;

      case 0:
        //clear(0);
        for(let u = 0; u < 1; u+=.001){
          let x = Math.floor(128+128*Math.cos(3*u+t));
          let y = Math.floor(128+128*Math.sin(5*u+t));
          y = x^y;
          pset(x,y,u*32);
        }
        renderInstructions();
      break;

      case 3:
        clear(1);
        renderColorNumbers();
        renderDrawingAPI();
        renderInstructions();
      break;

      case 4:
        clear(1);
        let s = 128;
        let i = t/3;
        for(let y = -s; y < s; y += 3 ){
          for(let x = -s; x < s; x += 2 ){
            pset(s+x+64*Math.cos( (y/s+i)*5 )+y, s+y+64*Math.sin( (x/s+i)*5 )+x, x/8%32)
          }
        }
        renderInstructions();
      break;

      case 5:
        clear(0);
        for(let r = 0; r < 190; r+= 6){
          for(let a = 0; a < 2*Math.PI; a += 1/r*8){
            let x = r*Math.cos(a+t);
            let y = r*Math.sin(a+t);
            circle(x+128, y+128, 3+3*Math.cos(t*r/8+a*3), r/8%32)
          }
        }
        renderInstructions();
      break;

      default:
        clear(0);
        renderInstructions();
      break;


    }





  },


};

function incrementState(){
  demostate += 1;
  if(demostate > 6){
    demostate = 0;
  }
}

function renderColorNumbers(){

  for(var i = 0; i < 32; i++){
    textLine({
      x: i < 16 ? ( 3+16*i ) : ( 3 + 16* (i-16) ) ,
      y: i < 16 ? 8 : 8 + 16,
      text: i.toString(),
      scale: 1,
      snap: 1,
      hspacing: 1,
      halign: 'left',
      render: 1,
      color: i,
    })
  }
}

function renderDrawingAPI(){
  pset(16*2, 16*5, 21);

  line(16*4, 16*5, 16*5, 16*7, 21);

  rect(16*6, 16*5, 16, 32, 21);

  circle(16*8, 16*6, 16, 21);
}

function renderInstructions(){


  fr(0,243,256,6,0);
  textLine({
    x: 5,
    y: 242,
    text: "THINGY "+ demostate + ": PRESS Z TO SEE NEXT THINGY",
    scale: 1,
    snap: 1,
    hspacing: 1,
    vspacing: 2,
    halign: 'left',
    valign: 'bottom',
    color: 21,
  })


}
