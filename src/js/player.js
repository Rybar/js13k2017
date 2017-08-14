player = {
  // x: 0,
  // y: 0,
  // radius: 12,
  // xvel: 0,
  // yvel: 0,
  // speed: 6,
  // drag: .97,

  bullet: {
    x: 0, y:0, xvel: 0, yvel: 0
  },

  init (){
    this.x = 64;
    this.y =  230;
    this.radius = 12;
    this.xvel = 0;
    this.yvel = 0;
    this.xspeed = 400;
    this.yspeed = 400;
    this.drag = .6;
  },

  update (dt) {
    this.bullet.x = player.x;
    this.bullet.y = player.y;
    this.xvel *= player.drag;
    this.yvel *= player.drag;
    let xIntegrate = dt * player.xvel;
    let yIntegrate = dt * player.yvel;

    player.x += xIntegrate;
    player.y += yIntegrate;

    //player movement
    if (Key.isDown(Key.d) || Key.isDown(Key.RIGHT)) {
        player.xvel =  player.xspeed;
    }
    if (Key.isDown(Key.a) || Key.isDown(Key.LEFT)){
        player.xvel =  - player.xspeed;
    }
    if(Key.isDown(Key.w) || Key.isDown(Key.UP)){
      player.yvel = -player.yspeed;
    }
    if(Key.isDown(Key.s) || Key.isDown(Key.DOWN)) {
      player.yvel = player.yspeed;
    }

    if(Key.isDown(Key.SPACE || Key.isDown(Key.z))){
      //player.bullet.xvel = E.player.xvel;
      player.bullet.yvel = -350;
      bulletPool.get(player.bullet);
    }

    //world wrap for player
    if(player.x > WIDTH){
      player.x = 0;
    }
    if(player.x < 0){
      player.x = WIDTH;
    }
    if(player.y > HEIGHT){
      player.y = 0;
    }
    if(player.y < 0){
      state = 'gameover';
      player.y = HEIGHT;
    }
    //end world wrap for player


  },

  draw (dt) {

    // let degrees = (360/256) * E.player.x * 0.0174533;
    // let radius = (E.player.y / 2);

    // let playerDrawPoint = E.util.toPolarScreen({x:E.player.x, y:E.player.y});
    //
    // let distFromCenter = E.util.dist(playerDrawPoint.x+128, playerDrawPoint.y+128, 128,128);
    //
    // let playerSizeFactor = E.util.norm(distFromCenter, 0, 128);

    //E.renderTarget = E.screen;
    //E.gfx.fillCircle(playerDrawPoint.x+128, playerDrawPoint.y+128, E.player.radius * playerSizeFactor, 21);

    fillCircle(this.x, this.y, this.radius, 21);



  },

}
