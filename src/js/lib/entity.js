//global

Entity = function(opt){

    if(!opt){
        opt = {
            radius: 10,
            gravity: 0,
            frictX: 0.92,
            frictY: 0.94
        }
    }

    this.cx = 0;
    this.cy = 0;
    this.xr = 0;
    this.yr = 0;

    this.xx = 0;
    this.yy = 0;

    this.dx = 0;
    this.dy = 0;


    this.collided = false;
    this.ox = 0; //previous frame x
    this.oy = 0; //previous frame y -

    this.radius = opt.radius || 10;
    this.gravity = opt.gravity || 0;
    this.bounce = opt.bounce || 0;

    this.frictX = opt.frictX || 0.92;
    this.frictY = opt.frictY || 0.94;
    this.dead = false;
    this.collides = opt.collides || 0;
    this.mapcollide = opt.mapcollide || 0;

    this.id = Math.random();

};

Entity.prototype.setCoords = function(x,y) {

    this.xx = x;
    this.yy = y;
    this.cx = Math.floor(this.xx/Const.GRID);
    this.cy = Math.floor(this.yy/Const.GRID);
    this.xr = (this.xx - this.cx*Const.GRID) / Const.GRID;
    this.yr = (this.yy - this.cy*Const.GRID) / Const.GRID;
};

Entity.prototype.hasCollision = function(cx, cy) {

    if(this.mapcollide){

        if( (Assets.map[cy]) == undefined  || Assets.map[cy][cx] == undefined ) {  //hacky grab of global map data
            return false;
        }
        else {
            return Assets.map[cy][cx];  //hacky grab of global map data
        }

    }
    else return false;




};

Entity.prototype.overlaps = function(A, B) { //e: Entity

    var maxDist = A.radius + B.radius;
    var distSqr = (B.xx - A.xx)*(B.xx-A.xx) + (B.yy - A.yy)*(B.yy-A.yy);
    if(distSqr <= maxDist*maxDist )
        return true;
    else
        return false;
};

Entity.prototype.onGround = function() {

    return this.hasCollision(this.cx, this.cy+1) && this.yr>=0.5;
};

Entity.prototype.onCeiling = function() {

    return this.hasCollision(this.cx, this.cy-1) && this.yr<=0.5;
};

Entity.prototype.onWallLeft = function() {

    return this.hasCollision(this.cx-1, this.cy) && this.xr<=0.5;
};
Entity.prototype.onWallRight = function() {

    return this.hasCollision(this.cx+1, this.cy) && this.xr>=0.5;
};

Entity.prototype.update = function() {

    //X component
    this.xr += this.dx;
    this.dx *= this.frictX;

    if( this.hasCollision(this.cx-1, this.cy) && this.xr <= 0.3 ) { // if there's something to the left AND we're near the left edge of the current cell
        this.dx = 0;
        this.xr = 0.3;
    }
    if( this.hasCollision(this.cx+1, this.cy) && this.xr >= 0.7 ) { // ditto right
        this.dx = 0;
        this.xr = 0.7;
    }

    while (this.xr < 0) { //update the cell and fractional movement
        this.cx--;
        this.xr++;
    }
    while (this.xr > 1) { //update the cell and fractional movement
        this.cx++;
        this.xr--;
    }

    //Y component
    this.dy += this.gravity;
    this.yr += this.dy;
    this.dy *= this.frictY;

    if( this.hasCollision(this.cx, this.cy-1) && this.yr <= 0.4 ) { // if there's something above...
        this.dy = 0;
        this.yr = 0.4;
    }
    if( this.hasCollision(this.cx, this.cy+1) && this.yr >= 0.7 ) { // ditto below
        this.dy = this.bounce ? -this.dy : 0;
        if(!this.bounce) this.yr = 0.7;
    }


    while (this.yr < 0) { //update the cell and fractional movement up
        this.cy--;
        this.yr++;
    }
    while (this.yr > 1) { //update the cell and fractional movement down
        this.cy++;
        this.yr--;
    }

    //update actual pixel coordinates:

    this.xx = Math.floor((this.cx + this.xr) * Const.GRID);
    this.yy = Math.floor((this.cy + this.yr) * Const.GRID);
    this.ox = (this.cx + this.xr) * Const.GRID;
    this.oy = (this.cy + this.yr) * Const.GRID;

};

Entity.prototype.collide = function (A, B) {


    //object collision handling--------------------

    //todo: split the below out into a separate collide() method this takes two arrays or an object and an array

    //----------------------------------------------

    //if the cells are close enough, then we break out the actual distance check
    var dist = Math.sqrt((A.xx - B.xx) * (A.xx - B.xx) + (A.yy - B.yy) * (A.yy - B.yy));
    if (dist <= A.radius + B.radius) {
        this.collided = true;
        var ang = Math.atan2(A.yy - B.yy, A.xx - B.xx);
        var force = 0.03;
        var repelPower = (B.radius + A.radius - dist) / (B.radius + A.radius);
        this.dx -= Math.cos(ang) * repelPower * force;
        this.dy -= Math.sin(ang) * repelPower * force;
        e.dx += Math.cos(ang) * repelPower * force;
        e.dy += Math.sin(ang) * repelPower * force;

    }
};
