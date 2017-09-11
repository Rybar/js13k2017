//-----------------------player.js---------------------
player = {

  init (){
    this.x = 384/2;
    this.y =  30;
    this.radius = 20;
    this.hitRadius = 8;
    this.xvel = 0;
    this.yvel = 0;
    this.xspeed = 80;
    this.yspeed = 80;
    this.drag = .8;
    this.gravity = 8;
    this.maxYvel = 400;
    this.maxXvel = 200;
    this.minYvel = -400;
    this.minXvel = -200;
    this.b = {};
    this.facingLeft = false;
    this.jumping = true;
    this.jumpCooldown = 0;
    this.angle = 0;
    this.mode = HEADMODE;
    this.gunCooldown = 0;
    this.minedFuel = false;
  },

  update (dt) {
    if(Key.isDown(Key.ONE))player.mode = HEADMODE;
    if(Key.isDown(Key.TWO))player.mode = BODYMODE;
    if(Key.isDown(Key.THREE))player.mode = ARMMODE;
    if(Key.isDown(Key.FOUR))player.mode = THRUSTERMODE;


    this.updateB();
    this.oldX = this.x;
    this.oldY = this.y;

    this.xvel *= player.drag;

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

    //player movement-----------------------------------------------------------
    switch(player.mode){

      case HEADMODE:
      player.yspeed = 80;
      player.xspeed = 80;

      if (Key.isDown(Key.d) || Key.isDown(Key.RIGHT)) {
        player.facingLeft = false;
        if(this.jumping){
          player.xvel =  player.xspeed;
        }
        else{player.xvel = 0;}
      }
      if (Key.isDown(Key.a) || Key.isDown(Key.LEFT)){
        this.facingLeft = true;
        if(this.jumping){
          player.xvel =  - player.xspeed;
        }
        else{player.xvel = 0;}
      }
      if(Key.isDown(Key.w) || Key.isDown(Key.UP) || Key.isDown(Key.z)){
        if(!this.jumping && fuelTimer > 0 && player.jumpCooldown < 0){
          this.jumping = true;
          s_jump = true;
          player.jumpCooldown = 5;
          player.yvel = -player.yspeed;
          splodes.push(new splode(player.x+3,player.y+4, 7, 1, 9))
          splodes.push(new splode(player.x-3,player.y+4, 7, 1, 9))

          playSound(sounds.jump, 2.5, player.x.map(0, WIDTH, -1, 1), false);
        }
      }

      player.angle -= player.xvel / 30;
      if(player.jumping)player.angle -= player.facingLeft? -player.yvel /30 : player.yvel / 30;
      player.jumpCooldown--;

      break;

      case BODYMODE:
      player.maxXvel = 150;
      player.minYvel = -150;
      player.xspeed = 150;
      player.yspeed = 150;
      if (Key.isDown(Key.d) || Key.isDown(Key.RIGHT)) {
        player.facingLeft = false;
        player.xvel =  player.xspeed;
      }
      if (Key.isDown(Key.a) || Key.isDown(Key.LEFT)){
        this.facingLeft = true;
        player.xvel =  - player.xspeed;
      }
      if(Key.isDown(Key.w) || Key.isDown(Key.UP) || Key.isDown(Key.z)){
        if(!this.jumping && fuelTimer > 0){
          fuelTimer -= 1;
          this.jumping = true;
          s_jump = true;
          player.yvel = -player.yspeed;
          playSound(sounds.jump, 2.5, player.x.map(0, WIDTH, -1, 1), false);
        }

      }
      if(this.yvel > 0)this.jumping=false;

      break;

      case ARMMODE: //----------------------------------------------------------

      player.maxXvel = 150;
      player.minYvel = -150;
      player.xspeed = 150;
      player.yspeed = 150;

      if (Key.isDown(Key.d) || Key.isDown(Key.RIGHT)) {
        player.facingLeft = false;
        player.xvel =  player.xspeed;
      }
      if (Key.isDown(Key.a) || Key.isDown(Key.LEFT)){
        this.facingLeft = true;
        player.xvel =  - player.xspeed;
      }
      if(Key.isDown(Key.w) || Key.isDown(Key.UP) ||
       Key.isDown(Key.SPACE) || Key.isDown(Key.z)){
        if(!this.jumping && fuelTimer > 0){
          fuelTimer -= 0.7;
          this.jumping = true;
          s_jump = true;
          player.yvel = -player.yspeed;
          playSound(sounds.jump, 2.5, player.x.map(0, WIDTH, -1, 1), false);
        }
      }
      if(Key.isDown(Key.x)){
        fuelTimer-=0.01;
        splodes.push( new splode(
          player.x + (player.facingLeft ? -16 : 16) + (Math.random()*2-1)|0,
          player.y + (Math.random()*15-8)|0,
          6,5
        )
      )
      renderTarget = COLLISION;

      if(pget(player.b.x + (player.facingLeft ? -10 : 10), player.b.y) == FUELCRYSTAL){
        player.minedFuel = true;
      }
      fillCircle(player.x + (player.facingLeft ? -10 : 10),
      player.y + (Math.random()*20-15)|0, 10, 0);

      let i = 5;
      while(--i){
        splodes.push( new splode(
          player.x + (player.facingLeft ? -30 + Math.random() * 10 : 30 + Math.random() * 10 ), //x
          player.y + Math.random()*20-10, //y
          10 + Math.random()*10-5, //size
          Math.random()*3, //speed
          27 + (Math.random()*2)|0, //color
          false,
          true )
        );

      }

      if(player.gunCooldown < 0){
        player.gunCooldown = 4;
        redraw(); //update room drawing every 4 frames
      }
    }
    if(player.minedFuel){
      pset(player.x + (player.facingLeft ? -10 : 10), player.y - 5, FUELCELL);
      fuelTimer += 25;
      player.minedFuel=false;

    }
    player.gunCooldown--;

    break;

    case THRUSTERMODE://--------------------------------------------------------
    player.maxXvel = 250;
    player.minYvel = -250;
    player.xspeed = 200;
    player.yspeed = 200;
    if (Key.isDown(Key.d) || Key.isDown(Key.RIGHT)) {
      player.facingLeft = false;
      player.xvel =  player.xspeed;
    }
    if (Key.isDown(Key.a) || Key.isDown(Key.LEFT)){
      this.facingLeft = true;
      player.xvel =  - player.xspeed;
    }
    if(Key.isDown(Key.w) || Key.isDown(Key.UP)){
      if(!player.jumping){
        player.jumping = true;
        player.yvel = -player.yspeed;
        s_jump = true;
        playSound(sounds.jump, 2.5, player.x.map(0, WIDTH, -1, 1), false);
      }

    }

    if(Key.isDown(Key.x)){
      fuelTimer-=0.01;
      splodes.push( new splode(
        player.x + (player.facingLeft ? -16 : 16) + (Math.random()*2-1)|0,
        player.y + (Math.random()*15-8)|0,
        6,5
        )
      )
    renderTarget = COLLISION;
    console.log( pget(player.b.x + (player.facingLeft ? -10 : 10), player.b.y) )
    if( pget(player.b.x + (player.facingLeft ? -10 : 10), player.b.y) == FUELCRYSTAL) player.minedFuel = true;
    fillCircle(player.x + (player.facingLeft ? -10 : 10),
    player.y + (Math.random()*20-15)|0, 10, 0);

    let i = 5;
    while(--i){
      splodes.push( new splode(
        player.x + (player.facingLeft ? -30 + Math.random() * 10 : 30 + Math.random() * 10 ), //x
        player.y + Math.random()*20-10, //y
        10 + Math.random()*10-5, //size
        Math.random()*3, //speed
        27 + (Math.random()*2)|0, //color
        false,
        true )
      );

    }

    if(player.gunCooldown < 0){
      player.gunCooldown = 4;
      redraw(); //update room drawing every 4 frames
    }
  }
  if(Key.isDown(Key.c)){
    fuelTimer-=0.2;
    splodes.push( new splode(
      player.x + (player.facingLeft ? -16 : 16) + (Math.random()*2-1)|0,
      player.y + (Math.random()*15-8)|0,
      6,5
    )
  )
  renderTarget = COLLISION;
  fillCircle(player.x + (player.facingLeft ? -10 + -player.radius : 10 + player.radius),
  player.y + (Math.random()*20-15)|0, 10, WALLS);

  let i = 5;
  while(--i){
    splodes.push( new splode(
      player.x + (player.facingLeft ? -30 + Math.random() * 10 : 30 + Math.random() * 10 ), //x
      player.y + Math.random()*20-10, //y
      10 + Math.random()*10-5, //size
      Math.random()*3, //speed
      9 + (Math.random()*3)|0, //color
      false,
      true )
    );

  }
  if(player.gunCooldown < 0){
    player.gunCooldown = 4;
    redraw(); //update room drawing every 4 frames
  }
}
if(player.minedFuel){
  pset(player.x + (player.facingLeft ? -10 : 10), player.y - 5, FUELCELL);
  fuelTimer += 25;
  player.minedFuel=false;

  let i = 10;
  while(--i){
    splodes.push( new splode(
      192 + Math.random()*50-25, //x
      14 + Math.random()*4-2, //y
      10 + Math.random()*4-2, //size
      10 + Math.random()*4-2, //speed
      9 + (Math.random()*2-1)|0, //color
      false,
      true )
    );

  }

}
player.gunCooldown--;

break;

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
  switch(player.mode){
    case HEADMODE:
    renderSource = SPRITES;
    rspr(0,0,32,32,player.x, player.y, 1, player.angle);
    break;
    case BODYMODE:
    renderSource = SPRITES;
    spr(32,0,32,32, player.b.x+2-16, player.b.y+5-24); //body
    spr(0,0,32,32, player.b.x-16, player.b.y-24, player.facingLeft); //head

    break;
    case ARMMODE:
    renderSource = SPRITES;
    spr(32,0,32,32, player.b.x+2-16, player.b.y+5-20); //body
    spr(64+32,0,32,32, player.b.x+5-16 + (this.facingLeft ? -12 : 0), player.b.y+3-20, this.facingLeft); //arm
    spr(0,0,32,32, player.b.x-16, player.b.y-20, player.facingLeft); //head

    break;
    case THRUSTERMODE:
    renderSource = SPRITES;
    spr(128,0,32,40, player.b.x+5-16, player.b.y+4-30); //wheel
    spr(32,0,32,32, player.b.x+2-16, player.b.y+5-30); //body
    spr(64,0,32,32, player.b.x+5-16, player.b.y+4-30); //wheel arm
    spr(64+32,0,32,32, player.b.x+5-16 + (this.facingLeft ? -12 : 0), player.b.y+3-30, this.facingLeft); //arm
    spr(0,0,32,32, player.b.x-16, player.b.y-30, player.facingLeft); //head
    break;
  }

},

collides () {
  var offset = 0;
  if(this.b.x + this.hitRadius > WIDTH) this.b.y -= 1;
  for(var i = -this.hitRadius; i < this.hitRadius; i++){
    for(var j = -this.hitRadius; j < this.hitRadius; j++){

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

    let i = 10;
    while(--i){
      splodes.push( new splode(
        192 + Math.random()*50-25, //x
        14 + Math.random()*4-2, //y
        10 + Math.random()*4-2, //size
        10 + Math.random()*4-2, //speed
        9 + (Math.random()*2-1)|0, //color
        false,
        true )
      );

    }

    fuelTimer += 25;
    //playSound(sounds.jump, 1, player.x.map(0, WIDTH, -1, 1), false); //pan sound based on position

    break;

    case BODY:

    ram[COLLISION + o.x + o.y * WIDTH] == 0;
    renderTarget = COLLISION;
    fillCircle(o.x,o.y,3,0);
    renderTarget = BUFFER;
    player.mode = BODYMODE;
    messages.push(new message('AUX BOOSTERS ACQUIRED. ENERGY CAPACITY INCREASED.'));

    break;

    case ARM:

    ram[COLLISION + o.x + o.y * WIDTH] == 0;
    renderTarget = COLLISION;
    fillCircle(o.x,o.y,3,0);
    renderTarget = BUFFER;
    player.mode = ARMMODE;
    messages.push(new message('DISINTIGRATE TOOL ACQUIRED. PRESS X TO USE'));

    break;

    case THRUSTER:

    ram[COLLISION + o.x + o.y * WIDTH] == 0;
    renderTarget = COLLISION;
    fillCircle(o.x,o.y,3,0);
    renderTarget = BUFFER;
    player.mode = THRUSTERMODE;
    messages.push(new message('E-M CONVERTER ACQUIRED. PRESS C TO USE'));


    break;


  }


},
} //end player
