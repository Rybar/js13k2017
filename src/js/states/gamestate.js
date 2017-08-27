//---gamestate.js------------------------------

states.game = {

  step(dt) {
    //rooms[ world[ currentRoom[1] * (WORLDWIDTH+1) + currentRoom[0]  ] ].update();  //1d array math y * width + x;
    player.update(dt);
  },

  render(dt) {

    renderTarget = BUFFER; clear(0);
    renderSource = BACKGROUND; spr();
    drawFuel();
    renderSource = MIDGROUND; spr();
    player.draw();
    renderSource = FOREGROUND; spr();


    renderTarget= SCREEN; clear(0);

    // let i = 1000;
    // while(i--)pset(Math.random()*WIDTH, Math.random()*HEIGHT, 2);
    // outline(BUFFER, SCREEN, 9);
    renderSource = BUFFER; spr();
    renderSource = DEBUG; spr();

    splodes.forEach(function(s){s.draw()});

    // if(pal[31] != 31){
    //   let i = 32;
    //   while(i--){
    //     if(pal[i] != i)pal[i]++;
    //   }
    // }
  }
};

function splode(x = 0,y = 0,size = 10,speed = 10, color = 21){
  this.x = x;
  this.y = y;
  this.maxSize = size;
  this.speed = 10;
  this.counter = this.speed;
  this.color = color;
  this.size = 1;

  s = this;
}

splode.prototype.draw = function(){
  this.size++;
  if(this.size > this.maxSize)return;
    circle(this.x,this.y, this.size, this.color);
    this.counter--;
    if(this.counter==0){
      this.size++;
      this.counter = this.speed;
    }

  }



//---END gamestate.js------------------------------
