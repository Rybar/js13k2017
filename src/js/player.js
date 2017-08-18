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
    this.xspeed = 200;
    this.yspeed = 200;
    this.drag = .6;
    this.gravity = 10;
    this.maxYvel = 400;
    this.maxXvel = 400;
    this.minYvel = -400;
    this.minXvel = -400;
  },

  update (dt) {
    this.bullet.x = player.x;
    this.bullet.y = player.y;
    this.xvel *= player.drag;
    //this.yvel *= player.drag;
    this.yvel += player.gravity;
    this.yvel = this.yvel.clamp(this.minYvel, this.maxYvel);
    this.xvel = this.xvel.clamp(this.minXvel, this.maxXvel);

    let xIntegrate = dt * player.xvel;
    let yIntegrate = dt * player.yvel;

    let X = this.x|0;
    let Y = this.y|0 + 7;
    let collisionPixel = ram[ COLLISION + Y * WIDTH + X ];

    if(collisionPixel) {

      ram[DEBUG + Y * WIDTH + X] = 29; //draw a dot where we collided
      console.log('hit ' + this.x + ', ' + this.y);
      this.yvel = 0;
      //this.gravity = 0;
      //while(ram[COLLISION + Y * WIDTH + X]){
        //this.y--;
      //}
      this.y--;
    }
    else{this.gravity = 10};

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
      roomSwitch(RIGHT);
    }
    if(player.x < 0){
      player.x = WIDTH;
      roomSwitch(LEFT);
    }
    if(player.y > HEIGHT){
      player.y = 0;
      roomSwitch(DOWN);
    }
    if(player.y < 0){
      player.y = HEIGHT;
      roomSwitch(UP);
    }

  },

  draw (dt) {

    fillCircle(this.x, this.y, this.radius, 8);



  },

}
