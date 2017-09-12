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
      fillRect(0,V3, WIDTH,V1, WALLS);
      pset(25+Math.random()*325, V3-5, FUELCELL);
      pset(25+Math.random()*325, V3-5, FUELCELL);
      pset(25+Math.random()*325, V3-5, FUELCELL);
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



    }
  },
  //4
  {
    draw: function(dt){
      fillRect(0,V3, WIDTH, V1, WALLS);
      fillRect(H2,V3,H2,V1, 0);
      //pset(192, 160, BODY);
    },
    specials: function(dt){

    }
  },
  //5
  {
    draw: function(dt){
      fillRect(0,0,WIDTH,HEIGHT,WALLS);
      fillRect(H2,0,H2,HEIGHT, 0);
      //pset(100, 190, THRUSTER);
    },
    specials: function(dt){

    }
  },
  //6
  {
    draw: function(dt){
          fillRect(0,170,384,100,WALLS);
          pset(170, 165, BODY);


    },
    specials: function(dt){

    }
  },

  //7
  {
    draw: function(dt){

          fillRect(0,0,WIDTH,HEIGHT,WALLS);
          let i = 3;
          while(i--){
            let x = lcg.nextIntRange(H1,H5);
            let y = lcg.nextIntRange(V2,V4);
            fillRect(x,y, H1,H1, 0);
            pset(x+H1/2, y+H1/2, FUELCELL);
          }



    },
    specials: function(dt){
    }
  },
  //8
  {
    draw: function(dt){
      drawBlocks([
        0,0,0,0,0,0,0,0,0,2,0,0,
        0,0,0,0,0,0,0,0,0,1,1,0,
        0,0,0,0,0,0,0,1,0,1,1,0,
        0,0,0,2,0,1,1,0,0,0,0,0,
        0,0,0,1,0,0,0,0,0,0,0,0,
        0,0,0,0,1,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1
      ])
    },

    specials: function(dt){

    }
  },
  //9
  {
    draw: function(dt){
      fillRect(0,205,384,10,WALLS);
      fillCircle(250,150,64,WALLS);
      fillCircle(250,150,50,FUELCRYSTAL);
      pset(50, 180, FUELCELL);
    },

    specials: function(dt){

    }
  },


] // end rooms;
