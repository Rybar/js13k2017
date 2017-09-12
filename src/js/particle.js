function splode(x = 0,y = 0,size = 10,speed = 10, color = 21, filled=false, square=false){
  this.x = x;
  this.y = y;
  this.maxSize = size;
  this.speed = speed;
  this.counter = this.speed;
  this.color = color;
  this.size = 1;
  this.filled = filled;
  this.square = square;

}

splode.prototype.draw = function(index){
  this.size++;
  if(this.size > this.maxSize)return splodes.splice(index, 1);

    if(this.square){
      if(this.filled){
        fillRect(this.x-this.size/2, this.y-this.size/2, this.size, this.size, this.color);
      }else{
        rect(this.x-this.size/2, this.y-this.size/2, this.size, this.size,  this.color);
      }
    } else {
      if(this.filled){
        fillCircle(this.x,this.y, this.size, this.color);
      }else{
        circle(this.x,this.y, this.size, this.color);
      }
    }

    this.counter--;
    if(this.counter==0){
      this.size++;
      this.counter = this.speed;
    }

  }

function message(text = '', color = 9, time = 200){ //time is gameframes

  this.text = text;
  this.color = color;
  this.time = time;
  this.string = '';
  this.counter = 0;

}

message.prototype.draw = function(index){

  renderTarget = SCREEN;
  this.time--;
  this.counter+=2;
  if(this.time < 0)return messages.splice(index, 1);
  else{
    this.string = this.text.substring(0,this.counter);
    text([
      this.string,
      WIDTH/2,
      20 + 12*index,
      2,
      2,
      'center',
      'top',
      1,
      this.color,
    ]);
  }

}
