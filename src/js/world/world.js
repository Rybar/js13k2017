world = [
  0,0,0,
  0,1,0,
  1,2,1
];

rooms = [
  //0
  {
    draw: function(dt){
      text([
              '0',
              20,20,1,1,'left','bottom',2,15,0
          ]);
    }
  },

  //1
  {
    draw: function(dt){
      text([
              '1',
              20,20,1,1,'left','bottom',2,15,0
          ]);
    }
  },

  //2
  {
    draw: function(dt){

      text([
              '2',
              20,20,1,1,'left','bottom',2,15,0
          ]);

      fillTriangle(0,205,384,205,182,136, 25);

    }
  }


]

function roomSwitch(direction){
  return direction;
}
