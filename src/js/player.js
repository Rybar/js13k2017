/*global player */
/*global Key */


player = {

  init (){
    this.x = 384/2;
    this.y =  30;
    this.radius = 12;
    this.xvel = 0;
    this.yvel = 0;
    this.xspeed = 100;
    this.yspeed = 100;
    this.drag = .8;
    this.gravity = 8;
    this.maxYvel = 400;
    this.maxXvel = 200;
    this.minYvel = -400;
    this.minXvel = -200;
    this.b = {};
    this.facingLeft = false;
    this.jumping = false;
    this.angle = 0;

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
        //playSound(sounds.jump, 2.5, player.x.map(0, WIDTH, -1, 1), false);
        //fuelAmount--;
      }
    }


      player.angle -= player.xvel / 30;

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
    rspr(0,0,32,32,player.x, player.y, 1, player.angle);
    //rect(this.x-this.radius,this.y-this.radius, this.radius*2, this.radius*2);
  },

  collides () {
    for(var i = -this.radius; i < this.radius; i++){
      for(var j = -this.radius; j < this.radius; j++){
        let check = ram[COLLISION + (this.b.x + i) + (this.b.y + j) * WIDTH]
        if(check == WALLS || check == TERRA || check == FUELCRYSTAL){
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
      let check = ram[COLLISION+i+WIDTH*b.bottom]
      if(check == WALLS || check == TERRA || check == FUELCRYSTAL){
        for(let j = b.bottom; j >= b.top; j--) {  //starting from point we found solid, scan upward for empty pixel
          let check = ram[COLLISION+i+WIDTH*j]
          if(check == WALLS || check == TERRA || check == FUELCRYSTAL){
            offsetY = j - b.bottom - 1;  //
          }
        } //end interior check
      }
    } // end bottom edge checker

    //check top:
    for(let i = b.left; i <= b.right; i++){ //from left to right, across top edge
      let check = ram[COLLISION+i+WIDTH*b.top]
      if(check == WALLS || check == TERRA || check == FUELCRYSTAL){
        for(let j = b.top; j <= b.bottom; j++) {  //starting from point we found solid, scan downward for empty pixel
          let check = ram[COLLISION+i+WIDTH*j]
          if(check == WALLS || check == TERRA || check == FUELCRYSTAL){
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
      let check = ram[COLLISION+b.left+WIDTH*i]
      if(check == WALLS || check == TERRA || check == FUELCRYSTAL){
        for(let j = b.x; j <= b.right; j++) {  //starting from point we found solid, scan upward for empty pixel
          let check = ram[COLLISION+j+WIDTH*i]
          if(check == WALLS || check == TERRA || check == FUELCRYSTAL){
            offsetX++;  //
          }
        } //end interior check
      } else{
        let check = ram[COLLISION+b.right+WIDTH*i]
       if(check == WALLS || check == TERRA || check == FUELCRYSTAL){
        for(let j = b.x; j >= b.left; j--) {  //starting from point we found solid, scan upward for empty pixel
          let check = ram[COLLISION+j+WIDTH*i]
          if(check == WALLS || check == TERRA || check == FUELCRYSTAL){
            offsetX--  //
          }
        }
      }
    }
    }

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

        fuelTimer += 0.5;
        //playSound(sounds.jump, 1, player.x.map(0, WIDTH, -1, 1), false); //pan sound based on position


    }


  },
} //end player
