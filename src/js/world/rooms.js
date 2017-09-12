rooms = [
  //0
  {

    draw: function(dt){

    },

    specials: function(dt){

    }
  },

  //1
  {
    draw: function(dt){
      fillTriangle(H3,V2, H5,V3, H1,V3,  WALLS);
      fillTriangle(H5,V3, H3,V2,H1,V3,  WALLS);
      fillTriangle(H3,V2, H1,V3, H5,V3,   WALLS);
      fillRect(0, V3, WIDTH, V1, WALLS);

    },
    specials: function(dt){
      drawHorizon();
      drawHeads(0,V3, WIDTH, V1-10, 20);
    }
  },

  //2
  {
    draw: function(dt){
      drawBlocks([
      0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
      1,1,1,1,1,1,1,1,1,1,1,1 ]);

      pset(25+Math.random()*325, HEIGHT-36, FUELCELL);
      pset(25+Math.random()*325, HEIGHT-36, FUELCELL);
      pset(25+Math.random()*325, HEIGHT-36, FUELCELL);
    },

    specials: function(dt){

      drawHorizon();

    }
  },

  //3
  {
    draw: function(dt){
      fillRect(0,170,384,200,WALLS);
      fillRect(0,140,100,100, WALLS);
      pset(192, 160, BODY);
    },

    specials: function(dt){
      drawHorizon();

    }
  },
  //4
  {
    draw: function(dt){
      drawBlocks([
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,2,0,0,0,0,0,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1
      ])
    },
    specials: function(dt){
      drawHorizon();

    }
  },
  //5
  {
    draw: function(dt){
      drawBlocks([
        1,1,1,1,0,0,0,0,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,
      ])
    },
    specials: function(dt){
      drawUnderground();

    }
  },
  //6
  {
    draw: function(dt){
      drawBlocks([
        1,1,1,1,0,0,0,0,1,1,1,1,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,1,1,1,1,1,1,1,1,0,0
      ]);
      pset(Math.random()*200+70, HEIGHT-40, BODY);


    },
    specials: function(dt){
      drawUnderground();
      drawHorizon();
    }
  },

  //7
  {
    draw: function(dt){

      drawBlocks([
        0,1,1,1,0,0,0,0,1,1,1,1,
        0,1,1,1,0,0,0,0,1,1,1,1,
        0,1,1,1,2,0,0,0,0,0,2,0,
        0,1,1,1,1,1,1,1,1,1,1,1,
        0,1,1,1,1,1,1,1,1,1,1,1,
        0,0,0,2,0,0,0,0,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,
      ])



    },
    specials: function(dt){
      drawUnderground();
    }
  },
  //8
  {
    draw: function(dt){
      drawBlocks([
        1,0,0,0,0,0,0,0,0,0,0,0,
        1,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,0,0,0,0,0,0,0,0,
        1,1,0,1,1,1,1,1,0,0,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,0,1,1,1,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1
      ])
    },

    specials: function(dt){
      drawUnderground();
    }
  },
  //9
  {
    draw: function(dt){
      drawBlocks([
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1
      ])
    },

    specials: function(dt){

    }
  },


] // end rooms;
