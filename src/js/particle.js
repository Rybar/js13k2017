function Particle() {

  this.inUse = false;

  this.init = function(){
    this.x = -500;
    this.y = -500;
    this.dead = true;
    this.xvel = 0;
    this.yvel = 1;
    this.life = 1;
  }

  Particle.prototype.spawn = function(opt) {
    this.x = opt.x;
    this.y = opt.y;
    this.xvel = opt.xvel;
    this.yvel = opt.yvel;
    this.inUse = true;
    this.life = opt.life || 1;
    this.remaining = opt.life || 1;
    this.radius = opt.radius || 1;
    this.color = opt.color || 21;
    this.dead = false;
  }

  Particle.prototype.use = function(dt){
    if(this.dead) {
      return true;
    }
    else {
      this.remaining -= dt;
      this.x += dt * this.xvel;
      this.y += dt * this.yvel;
      this.draw();
      //console.log('bullet used/updated');
        if(this.remaining <= 0) {
          this.dead = true;
          return true;
        }
        if(this.y < 0){
          this.dead = true;
        }
        if(this.x >= 0 && this.x <= WIDTH && this.y >=0 && this.y <= 256){  //is it on screen?
          if(ram[0x40000 + ( (this.y|0) * WIDTH + (this.x|0) )] > 0) {  //is it overlapping something drawn into the collision buffer?

            this.dead = true;
            drawExplode(this.x, this.y);
          }
        }

    }
    return false;
  }


  Particle.prototype.clear = function(){
    this.x = -500;
    this.y = -500;
    this.dead = true;
    this.xvel = 0;
    this.yvel = 0;
    this.life = 1;
    this.inUse = false;
  }

  Particle.prototype.draw = function(){
    circle(this.x, this.y, 0|Math.random()*4, 21);
  }


}
