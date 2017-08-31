/*global player */
/*global Key */


player = {

  init (){
    this.x = 384/2;
    this.y =  30;
    this.radius = 12;
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
    this.b = {};
    this.facingLeft = false;
    this.jumping = false;

  },

  update (dt) {
    this.updateB();
    this.oldX = this.x;
    this.oldY = this.y;

    this.xvel *= player.drag;
    //this.yvel *= player.drag;

    this.yvel += player.gravity;
    this.yvel = this.yvel.clamp(this.minYvel, this.maxYvel);
    this.xvel = this.xvel.clamp(this.minXvel, this.maxXvel);

    let dx = dt * player.xvel;
    let dy = dt * player.yvel;

    player.x += dx;
    this.updateB();
    if(this.collides()){
      player.x = player.oldX;
      player.xvel = -player.xvel * .4;
    }
    player.y += dy;
    this.updateB();
    if(this.collides()){
      player.y = player.oldY;
      player.yvel = -player.yvel * .4;
    }
    this.updateB();
    if(this.collides()){
      this.x += this.collideResolutionX();
      this.updateB();
      if(this.collides()){
        this.y += this.collideResolutionY();
        this.updateB();
      }
    }
    this.overlapResolution();


    this.updateB();

    //console.info(this.collides());

    //player movement
    if (Key.isDown(Key.d) || Key.isDown(Key.RIGHT)) {
      player.facingLeft = false;
        player.xvel =  player.xspeed;
    }
    if (Key.isDown(Key.a) || Key.isDown(Key.LEFT)){
        this.facingLeft = true;
        player.xvel =  - player.xspeed;
    }
    if(Key.isDown(Key.w) || Key.isDown(Key.UP)){
      if(!this.jumping && fuelTimer > 0){
        this.jumping = true;
        s_jump = true;
        player.yvel = -player.yspeed;
        playSound(sounds.jump, 2.5, player.x.map(0, WIDTH, -1, 1), false);
        //fuelAmount--;
      }


    }
    // if(Key.isDown(Key.s) || Key.isDown(Key.DOWN)) {
    //   player.yvel = player.yspeed;
    // }

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
    renderTarget = BUFFER;
    spr(0,0,19,34,(this.x-this.radius)|0,(this.y-this.radius-12)|0, this.facingLeft );
    //rect(this.x-this.radius,this.y-this.radius, this.radius*2, this.radius*2);
  },

  collides () {
    for(var i = -this.radius; i < this.radius; i++){
      for(var j = -this.radius; j < this.radius; j++){
        if(ram[COLLISION + (this.b.x + i) + (this.b.y + j) * WIDTH] == WALLS || TERRA || FUELCRYSTAL){
          player.jumping = false;
          return true;
        }
      }
    }
    return false;
  },

  overlaps () {
    for(var i = -this.radius; i < this.radius; i++){
      for(var j = -this.radius; j < this.radius; j++){
        let overlap = ram[COLLISION + (this.b.x + i) + (this.b.y + j) * WIDTH]
        if(overlap){
          return {
            x: this.b.x + i,
            y: this.b.y + j,
            o: overlap
          }
        };
      }
    }
    return false;
},

  updateB () {

     this.b = {
      left: this.x-this.radius|0,
      right: this.x+this.radius|0,
      top: this.y-this.radius|0,
      bottom: this.y+this.radius|0,
      width: this.radius * 2,
      height: this.radius * 2,
      x: this.x|0,
      y: this.y|0
    }

  },

  collideResolutionY (dt) {

    let offsetY = 0;
    let error = 4; // avoid corners?
    let b = this.b;

    //check bottom:
    for(let i = b.left; i <= b.right; i++){ //from left to right, across bottom edge
      if(ram[COLLISION+i+WIDTH*b.bottom] == WALLS || TERRA || FUELCRYSTAL){
        for(let j = b.bottom; j >= b.top; j--) {  //starting from point we found solid, scan upward for empty pixel
          if(ram[COLLISION+i+WIDTH*j] == WALLS || TERRA || FUELCRYSTAL){
            offsetY = j - b.bottom - 1;  //
          }
        } //end interior check
      }
    } // end bottom edge checker

    //check top:
    for(let i = b.left; i <= b.right; i++){ //from left to right, across top edge
      if(ram[COLLISION+i+WIDTH*b.top] == WALLS){
        for(let j = b.top; j <= b.bottom; j++) {  //starting from point we found solid, scan downward for empty pixel
          if(ram[COLLISION+i+WIDTH*j] == WALLS){
            offsetY = j-b.top + 1;  //
          }
        } //end interior check
      }
    } // end top edge checker
    return offsetY;

  }, //end collideResolutionY

  collideResolutionX (dt) {

    let offsetX = 0;
    let b = this.b;
    let error = 2;

    //check left:
    for(let i = b.top; i <= b.bottom; i++){ //from top to bottom across left edge;
      if(ram[COLLISION+b.left+WIDTH*i] == WALLS){
        for(let j = b.x; j <= b.right; j++) {  //starting from point we found solid, scan upward for empty pixel
          if(ram[COLLISION+j+WIDTH*i] == WALLS){
            offsetX++;  //
          }
        } //end interior check
      } else if(ram[COLLISION+b.right+WIDTH*i] == WALLS){
        for(let j = b.x; j >= b.left; j--) {  //starting from point we found solid, scan upward for empty pixel
          if(ram[COLLISION+j+WIDTH*i] == WALLS){
            offsetX--  //
          }
        }
      }
    } // end left edge checker

    //check right:
    for(let i = b.top+error; i <= b.bottom-error; i++){ //from top to bottom across left edge;
      if(ram[COLLISION+b.right+WIDTH*i]){
        for(let j = b.left; j <= b.right; j++) {  //starting from point we found solid, scan upward for empty pixel
          if(ram[COLLISION+j+WIDTH*i]){
            offsetX = 30;  //
          }
        } //end interior check
      }
    } // end left edge checker


    return offsetX;

  },

  overlapResolution(dt){
    let o = player.overlaps()

    switch(o.o){

      case FUELCELL:
        ram[COLLISION + o.x + o.y * WIDTH] == 0;
        renderTarget = COLLISION;
        fillCircle(o.x,o.y,3,0);
        renderTarget = BUFFER;

        splodes.push( new splode(o.x, o.y) );

        fuelTimer += 1;
        playSound(sounds.jump, 1, player.x.map(0, WIDTH, -1, 1), false); //pan sound based on position


    }


  },
} //end player
