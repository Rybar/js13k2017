--spaceship generator
--pico-8 doodle by trasevol_dog
--commissioned by ryan malm

function _init()
 local posx,posy=64,64

 for i=0,11 do   --outer loop. drawing 12 ships.
  local posx=i%4*32+16
  local posy=flr(i/4)*32+(3-i%4)*6+16+4   --some modulus magic to set each position

  cls()
  camera() --what does calling camera do?
  map()

  for j=0,i-1 do
   local x=j%4*32+16
   local y=flr(j/4)*32+(3-j%4)*6+16+4

   local sx=j%4*32
   local sy=flr(j/4)*32+32

   for c=0,15 do
    pal(c,0)  --palette stuff. not sure why.
   end
   sspr(sx,sy,32,32,x-16-1,y-16)  --what are these sspr calls for?
   sspr(sx,sy,32,32,x-16+1,y-16)
   sspr(sx,sy,32,32,x-16,y-16-1)
   sspr(sx,sy,32,32,x-16,y-16+1)

   for c=0,15 do
    pal(c,c)
   end
   sspr(sx,sy,32,32,x-16,y-16)
  end

  rect(posx-18,posy-18,posx+17,posy+17,0)

  phase1(posx,posy)
  phase2(posx,posy)
  phase3(posx,posy)
  phase4(posx,posy)
  phase5(posx,posy)

  flip()

  local sx=i%4*32
  local sy=flr(i/4)*32+32
  local a=sy*64+sx*0.5
  for ad=0,31*64,64 do
   memcpy(a+ad,ad,16)
  end

  flip()
 end

 camera()
 cls()
 map()

 for j=0,11 do
  local x=j%4*32+16
  local y=flr(j/4)*32+(3-j%4)*6+16+4

  local sx=j%4*32
  local sy=flr(j/4)*32+32

  for c=0,15 do
   pal(c,0)
  end
  sspr(sx,sy,32,32,x-16-1,y-16)
  sspr(sx,sy,32,32,x-16+1,y-16)
  sspr(sx,sy,32,32,x-16,y-16-1)
  sspr(sx,sy,32,32,x-16,y-16+1)

  for c=0,15 do
   pal(c,c)
  end
  sspr(sx,sy,32,32,x-16,y-16)
 end
end

function _update()

end

function _draw()

end


function phase1(posx,posy)
 camera(-posx,-posy)

 local fro=7+rnd(4)

 pts={{x=0,y=-fro},{x=-4,y=-fro}}
 lns={fro}

 local var=8
 local l=fro
 for a=0.30,0.70,0.05 do
  l=mid(l+rnd(var*2)-var,6,10)
  add(pts,{x=l*cos(a),y=l*sin(a)})
  add(lns,l)

  rectfill(-16,-16,15,15,0)
  spline(pts,8)
  mirror(0,0)
  if rnd(2)<1 then flip() end
 end

 local bac=mid(l+rnd(var*2)-var,6,10)
 add(lns,bac)

 add(pts,{x=-4,y=bac})
 add(pts,{x=0,y=bac})

 rectfill(-16,-16,15,15,0)
 spline(pts,8)
 mirror(0,0)
 fill(0,0,8)
 to_sheet(posx,posy)
end

function phase2(posx,posy)
 camera(-posx,-posy)

 local fro=min(4+rnd(8),lns[1])
 local i=2

 pts={{x=0,y=-fro},{x=-4,y=-fro}}

 local var=8
 local l=fro
 for a=0.30,0.70,0.05 do
  local l=mid(l+rnd(var*2)-var,3,lns[i]) i+=1
  add(pts,{x=l*cos(a),y=l*sin(a)})

  rectfill(-16,-16,15,15,0)
  spr(0,-16,-16,4,4)
  spline(pts,9)
  mirror(0,0)
  if rnd(2)<1 then flip() end
 end

 local bac=mid(l+rnd(var*2)-var,4,lns[i])

 add(pts,{x=-4,y=bac})
 add(pts,{x=0,y=bac})

 rectfill(-16,-16,15,15,0)
 spr(0,-16,-16,4,4)
 spline(pts,9)
 mirror(0,0)
 fill(0,0,9)
 to_sheet(posx,posy)
end

function phase3(posx,posy)
 camera(-posx,-posy)

 for x=0,31 do
  for y=0,31 do
   local xx,yy=-16+x,-16+y

   local c=sget(x,y)

   if c>0 then

    local kl,kd=0,0
    for kx=-1,1 do
     for ky=-1,1 do
      local cc=sget(x+kx,y+ky)
      if cc<c and kx*ky~=-1 then
       if kx<0 or ky<0 then
        kl+=1
       else
        kd+=1
       end
      end
     end
    end

    local fc
    if kl>1 then
     if rnd(4)<1 then
      fc=7
     else
      fc=6
     end
    elseif kd>0 then
     fc=1
    else
     fc=13
    end

    pset(xx,yy,fc)
    if c==8 then
     pset(xx,yy+1,fc)
    elseif c==9 then
     pset(xx,yy-1,fc)
    end
   -- for i=0,c-8 do
   --  pset(xx,yy-i,fc)
   -- end

    if rnd(60)<1 then flip() end
   end
  end
 end

 to_sheet(posx,posy)
end

function phase4(posx,posy)
 camera(-posx,-posy)

 local pals={
  {8,6,14},
  {14,6,2},
  {11,3,10},
  {12,6,10},
  {9,10,8},
  {3,4,5},
  {2,4,9},
  {7,12,13},
  {14,13,15}
 }

 local pal=pick(pals)

-- rectfill(-16,-16,15,15,pal[1])

 clip(posx-16,posy-16,32,32)

 for i=0,32,6 do
  rectfill(-16,-16,-16+i,-16+i,pal[1])
  flip()
 end

 local a=rnd(1)
 local x=64*cos(a)
 local y=64*sin(a)

 local dx=cos(a+0.25)
 local dy=sin(a+0.25)

 local i=-24
 while i<24 do
  if rnd(2)<1 then
   local c=(rnd(4)<3) and pal[2] or pal[3]

   local w=flr(1+rnd(4))
   for j=0,w+0.99,0.1 do
    line(i*dx+x,i*dy+y,i*dx-x,i*dy-y,c)
    i+=0.1
    if rnd(40)<1 then flip() end
   end
  end

  for j=1,20 do
   line(i*dx+x,i*dy+y,i*dx-x,i*dy-y,pal[1])
   i+=0.1
   if rnd(40)<1 then flip() end
  end


 end

 mask()
 clip(0,0,128,128)
 flip()

 to_sheet(posx,posy)
end

function phase5(posx,posy)
 camera(-posx,-posy)

 -- check furthest side coordinate
 local mx=0
 for y=-16,15 do
  local x=15
  local found=false
  while not found and x>=0 do
   found=(pget(x,y)>0)
   x-=1
  end

  if found then
   mx=max(mx,x)
  end
 end


 -- lights and screws
 for x=0,14,6 do
  for y=-15,14,6 do
   local xx=flr(x+3+rnd(2)-1)
   local yy=y+3+rnd(2)-1

   if rnd(4)<3 then
    if rnd(3)<1 then -- screw
     if pget(xx,yy-1)>0 and pget(xx-1,yy)>0 then
      spr(30,-xx-4,yy-4)
      spr(30,xx-4,yy-4)
     end
    else -- light
     if pget(xx+1,yy-2)>0 and pget(xx-2,yy+1)>0 then
      local s=pick({14,15,31,46,47,62,63})
      spr(s,-xx-4,yy-4)
      local s=pick({14,15,31,46,47,62,63})
      spr(s,xx-4,yy-4)
     end
    end

    flip()
   end
  end
 end
 to_sheet(posx,posy)


 -- weaponry
 local x=4+flr(rnd(mx-4))

 local s=10+flr(rnd(2))*2
 local s=pick({10,12,26,28})

 local y=-16
 local found
 while not found and y<=15 do
  found=(sget(16-x,16+y)>0)
  y+=1
 end

 if y<16 then
  y+=3

  local behind=true--rnd(3)<2

  if behind then
   spr(s,-x-4,y-8)
   spr(s+1,x-4,y-8)
   spr(0,-16,-16,4,4)
  else
   spr(0,-16,-16,4,4)
   spr(s,-x-4,y-8)
   spr(s+1,x-4,y-8)
  end

  flip()
  to_sheet(posx,posy)
 end

 -- propulsion
 if rnd(4)<1 then
  local y=16
  local found=nil
  while not found and y>0 do
   y-=1
   found=(sget(16,16+y)>0)
  end

  local behind=rnd(2)<1

  if behind then
   spr(24,-8,y-3,2,1)
   spr(0,-16,-16,4,4)
  else
   spr(0,-16,-16,4,4)
   spr(24,-8,y-3,2,1)
  end

  flip()
  to_sheet(posx,posy)
 else
  local x=4+flr(rnd(mx-4))

  local y=16
  local found=nil
  while not found and y>0 do
   y-=1
   found=(sget(16-x,16+y)>0 or sget(18-x,16+y)>0 or sget(14-x,16+y)>0)
  end

  if y>0 then
   local behind=rnd(2)<1

   local s=pick({8,40,56})

   if behind then
    spr(s,-x-4,y-1)
    spr(s+1,x-4,y-1)
    spr(0,-16,-16,4,4)
   else
    spr(0,-16,-16,4,4)
    spr(s,-x-4,y-4)
    spr(s+1,x-4,y-4)
   end
  end

  flip()flip()
  to_sheet(posx,posy)
 end
end



function to_sheet(ax,ay)
 local x,y=ax-16,ay-16
 local a=y*64+x*0.5 +0x6000

 for ad=0,31*64,64 do
  memcpy(ad,a+ad,16)
 end
end

function mirror(ax,ay)
 for x=0,15 do
  for y=-16,15 do
   pset(ax+x,ay+y,pget(ax-x-1,ay+y))
  end
 end
end

function fill(x,y,c,oc)
 if not oc then
  oc=pget(x,y)
 end

 if oc==c then
  return
 end

 if pget(x,y)==oc then
  pset(x,y,c)
  fill(x-1,y,c,oc)
  fill(x+1,y,c,oc)
  fill(x,y-1,c,oc)
  fill(x,y+1,c,oc)
 end
end

function mask()
 local lit={[0]=1,13,14,11,9,6,7,7,14,10,7,10,10,6,7,7}
 local drk={[0]=0,0,1,1,2,1,13,6,2,4,9,3,1,1,2,5}

 for x=0,31 do
  for y=0,31 do
   local xx,yy=x-16,y-16
   local c=pget(xx,yy)
   local sh=sget(x,y)

   if sh==0 then
    c=0
   elseif sh==7 then
    c=lit[lit[c]]
   elseif sh==6 then
    c=lit[c]
   elseif sh==1 then
    c=drk[c]
   end

   pset(xx,yy,c)

   if rnd(80)<1 then flip() end
  end
 end

end



function spline(pts,c)
 if #pts==0 then return
 elseif #pts==1 then pset(pts[1].x,pts[1].y,c) return
 elseif #pts==2 then line(pts[1].x,pts[1].y,pts[2].x,pts[2].y,c) return
 end

 local lp=pts[1]

 for i=2,#pts-2 do
  local mp={
    x=(pts[i].x+pts[i+1].x)/2,
    y=(pts[i].y+pts[i+1].y)/2
   }
  curve(lp,mp,pts[i],c)
  lp=mp
 end

 curve(lp,pts[#pts],pts[#pts-1],c)
end

function curve(p1,p2,p3,c)
 local lx,ly=p1.x,p1.y

 for i=0,1,0.1 do
  local nx,ny = ev_curve(p1,p2,p3,i)
  line(lx,ly,nx,ny,c)
  lx=nx
  ly=ny
 end
end

function ev_curve(p1,p2,p3,t)
 local pa={
  x=lerp(p1.x,p3.x,t),
  y=lerp(p1.y,p3.y,t)}
 local pb={
  x=lerp(p3.x,p2.x,t),
  y=lerp(p3.y,p2.y,t)}

 local nx,ny
 nx=lerp(pa.x,pb.x,t)
 ny=lerp(pa.y,pb.y,t)

 return nx,ny
end

function angle_diff(a1,a2)
 local a=a2-a1
 return (a+0.5)%1-0.5
end

function plerp(pa,pb,i) return lerp(pa.x,pb.x,i),lerp(pa.y,pb.y,i) end
function lerp(a,b,i) return (1-i)*a+i*b end
function dist(xa,ya,xb,yb) if xb then xa=xb-xa ya=yb-ya end return sqrt(sqrdist(xa,ya)) end
function sqrdist(x,y) return sqr(x)+sqr(y) end
function sqr(a) return a*a end
function round(a) return flr(a+0.5) end
function ceil(a) return flr(a+0x.ffff) end
function pick(ar) return ar[flr(rnd(#ar))+1] end
function chance(a) return (rnd(100)<a) end
