player = {

  init (){
    this.x = 64;
    this.y =  64;
    this.radius = 9;
    this.xvel = 0;
    this.yvel = 0;
    this.xspeed = 200;
    this.yspeed = 200;
    this.drag = .8;
    this.gravity = 8;
    this.maxYvel = 400;
    this.maxXvel = 400;
    this.minYvel = -400;
    this.minXvel = -400;

  },

  update (dt) {



    this.xvel *= player.drag;
    //this.yvel *= player.drag;

    this.yvel += player.gravity;
    this.yvel = this.yvel.clamp(this.minYvel, this.maxYvel);
    this.xvel = this.xvel.clamp(this.minXvel, this.maxXvel);

    let xIntegrate = dt * player.xvel;
    let yIntegrate = dt * player.yvel;

    player.x += xIntegrate;
    player.y += yIntegrate;

    //player.x;
    //player.y;

    this.b = {
      left: this.x-this.radius|0+1,
      right: this.x+this.radius|0,
      top: this.y-this.radius|0+1,
      bottom: this.y+this.radius|0,
      width: this.radius * 2,
      height: this.radius * 2
    }



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
    if(this.collides(this.x, this.b.bottom))player.yvel = 0;
    if(this.collides(this.x, this.b.top))player.yvel = 0;
    if(this.collides(this.b.left, this.y))player.xvel = 0;
    if(this.collides(this.b.right, this.y))player.xvel = 0;

    offsetX = this.collideResolutionX(dt);
    offsetY = this.collideResolutionY(dt);

    //if(offsetY != 0)player.yvel = 0;
    //if(offsetX != 0)player.xvel = 0;

    console.info(offsetX,offsetY);


      // if( Math.abs(offsetX) < Math.abs(offsetY) ){ //x overlap is smaller
      //   if( this.collides( this.x+offsetX, this.y) == 0 ){ //does resolving remove collision?
      //     this.x += offsetX;
      //   }
      // }
      // if( Math.abs(offsetY) < Math.abs(offsetX) ){ //y overlap is smaller
      //   if( this.collides( this.x, this.y+offsetY) == 0 ){ //does resolving remove collision?
      //     this.y += offsetY;
      //   }
      // }

      this.x += Math.abs(offsetX) < Math.abs(offsetY) ? offsetX : 0;
      this.y += Math.abs(offsetY) < Math.abs(offsetX) ? offsetY : 0;

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
    //fillRect(this.x-this.radius, this.y-this.radius, this.radius, this.radius, 8);
    renderSource = SPRITES;
    renderTarget = 0;
    spr(1,1,18,18,(this.x-this.radius)|0,(this.y-this.radius)|0 );
    rect(this.x-this.radius,this.y-this.radius, this.radius*2, this.radius*2);
  },

  collides(x,y){
    return ram[COLLISION + x + y * WIDTH];
  },

  collideResolutionY (dt) {

    let offsetY = 0;
    let error = 4; // avoid corners?
    let b = this.b;

    //check bottom:
    for(let i = b.left+1; i <= b.right-1; i++){ //from left to right, across bottom edge
      if(ram[COLLISION+i+WIDTH*b.bottom]){
        for(let j = b.bottom; j >= b.top; j--) {  //starting from point we found solid, scan upward for empty pixel
          if(ram[COLLISION+i+WIDTH*j]){
            offsetY = j - b.bottom - 1;  //
          }
        } //end interior check
      }
    } // end bottom edge checker

    //check top:
    for(let i = b.left+1; i <= b.right-1; i++){ //from left to right, across top edge
      if(ram[COLLISION+i+WIDTH*b.top]){
        for(let j = b.top; j <= b.bottom; j++) {  //starting from point we found solid, scan downward for empty pixel
          if(ram[COLLISION+i+WIDTH*j]){
            offsetY = j-b.top + 1;  //
          }
        } //end interior check
      }
    } // end top edge checker
    return offsetY

  }, //end collideResolutionY

  collideResolutionX (dt) {

    let offsetX = 0;
    let b = this.b;
    let error = 4;

    //check left:
    for(let i = b.top-1; i <= b.bottom+1; i++){ //from top to bottom across left edge;
      if(ram[COLLISION+b.left+WIDTH*i]){
        for(let j = b.left; j < b.right; j++) {  //starting from point we found solid, scan upward for empty pixel
          if(ram[COLLISION+j+WIDTH*i]){
            offsetX = j-b.left;  //
          }
        } //end interior check
      }
    } // end left edge checker

    //check right:
    for(let i = b.top-1; i <= b.bottom+1; i++){ //from top to bottom across left edge;
      if(ram[COLLISION+b.right+WIDTH*i]){
        for(let j = b.right; j > b.left; j--) {  //starting from point we found solid, scan upward for empty pixel
          if(ram[COLLISION+j+WIDTH*i]){
            offsetX = j-b.right;  //
          }
        } //end interior check
      }
    } // end left edge checker


    return offsetX;

  }

}
