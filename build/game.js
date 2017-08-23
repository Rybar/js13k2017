var Stats=function(){function h(a){return c.appendChild(a.dom),a}function k(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",c.addEventListener("click",function(a){a.preventDefault(),k(++l%c.children.length)},!1);var g=(performance||Date).now(),e=g,a=0,r=h(new Stats.Panel("FPS","#0ff","#002")),f=h(new Stats.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=h(new Stats.Panel("MB","#f08","#201"));return k(0),{REVISION:16,dom:c,addPanel:h,showPanel:k,begin:function(){g=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();if(f.update(c-g,200),c>e+1e3&&(r.update(1e3*a/(c-e),100),e=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){g=this.end()},domElement:c,setMode:k}};Stats.Panel=function(h,k,l){var c=1/0,g=0,e=Math.round,a=e(window.devicePixelRatio||1),r=80*a,f=48*a,t=3*a,u=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r,q.height=f,q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");return b.font="bold "+9*a+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=l,b.fillRect(0,0,r,f),b.fillStyle=k,b.fillText(h,t,u),b.fillRect(d,m,n,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d,m,n,p),{dom:q,update:function(f,v){c=Math.min(c,f),g=Math.max(g,f),b.fillStyle=l,b.globalAlpha=1,b.fillRect(0,0,r,m),b.fillStyle=k,b.fillText(e(f)+" "+h+" ("+e(c)+"-"+e(g)+")",t,u),b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p),b.fillRect(d+n-a,m,a,p),b.fillStyle=l,b.globalAlpha=.9,b.fillRect(d+n-a,m,a,e((1-f/v)*p))}}},"object"==typeof module&&(module.exports=Stats),function(){function osc_sin(value){return Math.sin(6.283184*value)}function getnotefreq(n){return.00390625*Math.pow(1.059463094,n-128)}function genBuffer(waveSize,callBack){setTimeout(function(){var buf=new Uint8Array(waveSize*WAVE_CHAN*2),b=buf.length-2,iterate=function(){for(var begin=new Date,count=0;b>=0;)if(buf[b]=0,buf[b+1]=128,b-=2,(count+=1)%1e3==0&&new Date-begin>MAX_TIME)return void setTimeout(iterate,0);setTimeout(function(){callBack(buf)},0)};setTimeout(iterate,0)},0)}function applyDelay(chnBuf,waveSamples,instr,rowLen,callBack){var p1=instr.fx_delay_time*rowLen>>1,t1=instr.fx_delay_amt/255,n1=0,iterate=function(){for(var beginning=new Date,count=0;n1<waveSamples-p1;){var b1=4*n1,l=4*(n1+p1),x1=chnBuf[l]+(chnBuf[l+1]<<8)+(chnBuf[b1+2]+(chnBuf[b1+3]<<8)-32768)*t1;if(chnBuf[l]=255&x1,chnBuf[l+1]=x1>>8&255,x1=chnBuf[l+2]+(chnBuf[l+3]<<8)+(chnBuf[b1]+(chnBuf[b1+1]<<8)-32768)*t1,chnBuf[l+2]=255&x1,chnBuf[l+3]=x1>>8&255,++n1,(count+=1)%1e3==0&&new Date-beginning>MAX_TIME)return void setTimeout(iterate,0)}setTimeout(callBack,0)};setTimeout(iterate,0)}function drawSpriteSheet(){renderTarget=SPRITES;for(var i=27;i--;)fillCircle(lcg.nextIntRange(4,17),lcg.nextIntRange(4,17),lcg.nextIntRange(1,4),lcg.nextIntRange(8,11));console.log(ram[SPRITES+WIDTH+5])}function clear(color){ram.fill(color,renderTarget,renderTarget+131072)}function pset(x,y,color){y|=0,color|=0,(x|=0)>0&&x<WIDTH&&y>0&&y<HEIGHT&&(ram[renderTarget+(y*WIDTH+x)]=color)}function line(x1,y1,x2,y2,color){var stepx,stepy,dy=(y2|=0)-(y1|=0),dx=(x2|=0)-(x1|=0);if(dy<0?(dy=-dy,stepy=-1):stepy=1,dx<0?(dx=-dx,stepx=-1):stepx=1,dy<<=1,dx<<=1,pset(x1,y1,color),dx>dy)for(var fraction=dy-(dx>>1);x1!=x2;)fraction>=0&&(y1+=stepy,fraction-=dx),fraction+=dy,pset(x1+=stepx,y1,color);else for(fraction=dx-(dy>>1);y1!=y2;)fraction>=0&&(x1+=stepx,fraction-=dy),fraction+=dx,pset(x1,y1+=stepy,color)}function circle(xm,ym,r,color){var x=-r,y=0,err=2-2*r;do{pset(xm-x,ym+y,color),pset(xm-y,ym-x,color),pset(xm+x,ym-y,color),pset(xm+y,ym+x,color),(r=err)<=y&&(err+=2*++y+1),(r>x||err>y)&&(err+=2*++x+1)}while(x<0)}function fillCircle(xm,ym,r,color){if(!(r<0)){xm|=0,ym|=0,color|=0;var x=-(r|=0),y=0,err=2-2*r;do{line(xm-x,ym-y,xm+x,ym-y,color),line(xm-x,ym+y,xm+x,ym+y,color),(r=err)<=y&&(err+=2*++y+1),(r>x||err>y)&&(err+=2*++x+1)}while(x<0)}}function fillRect(x,y,w,h,color){x1=0|x,y1=0|y,x2=x+w|0,y2=y+h|0;var i=Math.abs(y2-y1);if(line(x1,y1,x2,y1,color),i>0)for(;--i;)line(x1,y1+i,x2,y1+i,color);line(x1,y2,x2,y2,color)}function fillTriangle(x1,y1,x2,y2,x3,y3,color){var canvasWidth=WIDTH,x1=Math.round(16*x1),x2=Math.round(16*x2),x3=Math.round(16*x3),y1=Math.round(16*y1),dx12=x1-x2,dy12=(y2=Math.round(16*y2))-y1,dx23=x2-x3,dy23=(y3=Math.round(16*y3))-y2,dx31=x3-x1,dy31=y1-y3,minx=Math.max(Math.min(x1,x2,x3)+15>>4,0),maxx=Math.min(Math.max(x1,x2,x3)+15>>4,WIDTH),miny=Math.max(Math.min(y1,y2,y3)+15>>4,0),maxy=Math.min(Math.max(y1,y2,y3)+15>>4,HEIGHT);minx&=-8,miny&=-8;var c1=-dy12*x1-dx12*y1,c2=-dy23*x2-dx23*y2,c3=-dy31*x3-dx31*y3;(dy12>0||0==dy12&&dx12>0)&&c1++,(dy23>0||0==dy23&&dx23>0)&&c2++,(dy31>0||0==dy31&&dx31>0)&&c3++,c1=c1-1>>4,c2=c2-1>>4,c3=c3-1>>4;var nmin1=0,nmax1=0,nmin2=0,nmax2=0,nmin3=0,nmax3=0;dx12>=0?nmax1-=7*dx12:nmin1-=7*dx12,dy12>=0?nmax1-=7*dy12:nmin1-=7*dy12,dx23>=0?nmax2-=7*dx23:nmin2-=7*dx23,dy23>=0?nmax2-=7*dy23:nmin2-=7*dy23,dx31>=0?nmax3-=7*dx31:nmin3-=7*dx31,dy31>=0?nmax3-=7*dy31:nmin3-=7*dy31;for(var linestep=canvasWidth-8,y0=miny;y0<maxy;y0+=8)for(var x0=minx;x0<maxx;x0+=8){var cy1=c1+dx12*y0+dy12*x0,cy2=c2+dx23*y0+dy23*x0,cy3=c3+dx31*y0+dy31*x0;if(!(cy1<nmax1||cy2<nmax2||cy3<nmax3)){var offset=x0+y0*canvasWidth;if(cy1>=nmin1&&cy2>=nmin2&&cy3>=nmin3)for(iy=0;iy<8;iy++){for(ix=0;ix<8;ix++,offset++)ram[renderTarget+offset]=color;offset+=linestep}else for(var iy=0;iy<8;iy++){for(var cx1=cy1,cx2=cy2,cx3=cy3,ix=0;ix<8;ix++)(cx1|cx2|cx3)>=0&&(ram[renderTarget+offset]=color),cx1+=dy12,cx2+=dy23,cx3+=dy31,offset++;cy1+=dx12,cy2+=dx23,cy3+=dx31,offset+=linestep}}}}function spr(sx=0,sy=0,sw=16,sh=16,x=0,y=0,flipx=!1,flipy=!1){for(var i=0;i<sh;i++)for(var j=0;j<sw;j++)y+i<HEIGHT&&x+j<WIDTH&&y+i>-1&&x+j>-1&&(flipx&flipy?ram[renderSource+((sy+(sh-i))*WIDTH+sx+(sw-j))]>0&&(ram[renderTarget+((y+i)*WIDTH+x+j)]=pal[ram[renderSource+((sy+(sh-i))*WIDTH+sx+(sw-j))]]):flipy&&!flipx?ram[renderSource+((sy+(sh-i))*WIDTH+sx+j)]>0&&(ram[renderTarget+((y+i)*WIDTH+x+j)]=ram[renderSource+((sy+(sh-i))*WIDTH+sx+j)]):flipx&&!flipy?ram[renderSource+((sy+i)*WIDTH+sx+(sw-j))]>0&&(ram[renderTarget+((y+i)*WIDTH+x+j)]=ram[renderSource+((sy+i)*WIDTH+sx+(sw-j))]):flipx||flipy||ram[renderSource+((sy+i)*WIDTH+sx+j)]>0&&(ram[renderTarget+((y+i)*WIDTH+x+j)]=pal[ram[renderSource+((sy+i)*WIDTH+sx+j)]]))}function render(){for(var i=PAGESIZE;i--;)data[i]=colors[pal[ram[i]]];imageData.data.set(buf8),ctx.putImageData(imageData,0,0)}function roomSwitch(direction){switch(renderTarget=COLLISION,clear(0),renderTarget=DEBUG,clear(0),renderTarget=0,direction){case LEFT:currentRoom[0]--,currentRoom[0]<0&&(currentRoom[0]=WORLDWIDTH),console.log(currentRoom);break;case RIGHT:currentRoom[0]++,currentRoom[0]>WORLDWIDTH&&(currentRoom[0]=0),console.log(currentRoom);break;case UP:currentRoom[1]--,currentRoom[1]<0&&(currentRoom[1]=WORLDHEIGHT),console.log(currentRoom);break;case DOWN:currentRoom[1]++,currentRoom[1]>WORLDHEIGHT&&(currentRoom[1]=0),console.log(currentRoom)}}function textLine(o){for(var textLength=o[0].length,i=0;i<textLength;i++){var letter=[];letter=getCharacter(o[0].charAt(i));for(var y=0;y<5;y++)for(var x=0;x<5;x++)1==letter[5*y+x]&&(1==o[4]?pset(o[1]+x*o[4]+(5*o[4]+o[3])*i,o[2]+y*o[4],o[5]):fillRect(o[1]+x*o[4]+(5*o[4]+o[3])*i,o[2]+y*o[4],o[4],o[4],o[5]))}}function text(o){var letterSize=5*o[7],lines=o[0].split("\n"),linesCopy=lines.slice(0),lineCount=lines.length,longestLine=linesCopy.sort(function(a,b){return b.length-a.length})[0],textWidth=longestLine.length*letterSize+(longestLine.length-1)*o[3],textHeight=lineCount*letterSize+(lineCount-1)*o[4];o[5]||(o[5]="left"),o[6]||(o[6]="bottom");var sx=o[1],sy=o[2],ex=o[1]+textWidth,ey=o[2]+textHeight;"center"==o[5]?(sx=o[1]-textWidth/2,ex=o[1]+textWidth/2):"right"==o[5]&&(sx=o[1]-textWidth,ex=o[1]),"center"==o[6]?(sy=o[2]-textHeight/2,ey=o[2]+textHeight/2):"bottom"==o[6]&&(sy=o[2]-textHeight,ey=o[2]);for(var cx=sx+textWidth/2,cy=sy+textHeight/2,i=0;i<lineCount;i++){var line=lines[i],lineWidth=line.length*letterSize+(line.length-1)*o[3],x=o[1],y=o[2]+(letterSize+o[4])*i;"center"==o[5]?x=o[1]-lineWidth/2:"right"==o[5]&&(x=o[1]-lineWidth),"center"==o[6]?y-=textHeight/2:"bottom"==o[6]&&(y-=textHeight),textLine([line,x,y,o[3]||0,o[7]||1,o[8],o[9]])}return{sx:sx,sy:sy,cx:cx,cy:cy,ex:ex,ey:ey,width:textWidth,height:textHeight}}function getCharacter(char){return index=fontString.indexOf(char),fontBitmap.substring(25*index,25*index+25).split("")}var lcg={seed:Date.now(),a:1664525,c:1013904223,m:Math.pow(2,32),setSeed:function(seed){this.seed=seed},nextInt:function(){return this.seed=(this.seed*this.a+this.c)%this.m,this.seed},nextFloat:function(){return this.nextInt()/this.m},nextBool:function(percent){return null==percent&&(percent=.5),this.nextFloat()<percent},nextFloatRange:function(min,max){return min+this.nextFloat()*(max-min)},nextIntRange:function(min,max){return Math.floor(this.nextFloatRange(min,max))},nextColor:function(){for(var c=this.nextIntRange(0,Math.pow(2,24)).toString(16).toUpperCase();c.length<6;)c="0"+c;return"#"+c}},sonantx={},WAVE_CHAN=2,MAX_TIME=33,audioCtx=null,oscillators=[osc_sin,function(value){return osc_sin(value)<0?-1:1},function(value){return value%1-.5},function(value){var v2=value%1*4;return v2<2?v2-1:3-v2}];sonantx.AudioGenerator=function(mixBuf){this.mixBuf=mixBuf,this.waveSize=mixBuf.length/WAVE_CHAN/2},sonantx.AudioGenerator.prototype.getAudioBuffer=function(callBack){null===audioCtx&&(audioCtx=new AudioContext);var mixBuf=this.mixBuf,waveBytes=this.waveSize*WAVE_CHAN*2,buffer=audioCtx.createBuffer(WAVE_CHAN,this.waveSize,44100),lchan=buffer.getChannelData(0),rchan=buffer.getChannelData(1),b=0,iterate=function(){for(var beginning=new Date,count=0;b<waveBytes/2;){var y=4*(mixBuf[4*b]+(mixBuf[4*b+1]<<8)-32768);if(y=y<-32768?-32768:y>32767?32767:y,lchan[b]=y/32768,y=4*(mixBuf[4*b+2]+(mixBuf[4*b+3]<<8)-32768),y=y<-32768?-32768:y>32767?32767:y,rchan[b]=y/32768,b+=1,(count+=1)%1e3==0&&new Date-beginning>MAX_TIME)return void setTimeout(iterate,0)}setTimeout(function(){callBack(buffer)},0)};setTimeout(iterate,0)},sonantx.SoundGenerator=function(instr,rowLen){this.instr=instr,this.rowLen=rowLen||5605,this.osc_lfo=oscillators[instr.lfo_waveform],this.osc1=oscillators[instr.osc1_waveform],this.osc2=oscillators[instr.osc2_waveform],this.attack=instr.env_attack,this.sustain=instr.env_sustain,this.release=instr.env_release,this.panFreq=Math.pow(2,instr.fx_pan_freq-8)/this.rowLen,this.lfoFreq=Math.pow(2,instr.lfo_freq-8)/this.rowLen},sonantx.SoundGenerator.prototype.genSound=function(n,chnBuf,currentpos){new Date;for(var c1=0,c2=0,o1t=getnotefreq(n+12*(this.instr.osc1_oct-8)+this.instr.osc1_det)*(1+8e-4*this.instr.osc1_detune),o2t=getnotefreq(n+12*(this.instr.osc2_oct-8)+this.instr.osc2_det)*(1+8e-4*this.instr.osc2_detune),q=this.instr.fx_resonance/255,low=0,band=0,j=this.attack+this.sustain+this.release-1;j>=0;--j){var k=j+currentpos,lfor=this.osc_lfo(k*this.lfoFreq)*this.instr.lfo_amt/512+.5,e=1;j<this.attack?e=j/this.attack:j>=this.attack+this.sustain&&(e-=(j-this.attack-this.sustain)/this.release);var t=o1t;this.instr.lfo_osc1_freq&&(t+=lfor),this.instr.osc1_xenv&&(t*=e*e),c1+=t;var rsample=this.osc1(c1)*this.instr.osc1_vol;t=o2t,this.instr.osc2_xenv&&(t*=e*e),c2+=t,rsample+=this.osc2(c2)*this.instr.osc2_vol,this.instr.noise_fader&&(rsample+=(2*Math.random()-1)*this.instr.noise_fader*e),rsample*=e/255;var f=this.instr.fx_freq;this.instr.lfo_fx_freq&&(f*=lfor);var high=q*(rsample-band)-(low+=(f=1.5*Math.sin(3.141592*f/44100))*band);switch(band+=f*high,this.instr.fx_filter){case 1:rsample=high;break;case 2:rsample=low;break;case 3:rsample=band;break;case 4:rsample=low+high}if(t=osc_sin(k*this.panFreq)*this.instr.fx_pan_amt/512+.5,rsample*=39*this.instr.env_master,(k*=4)+3<chnBuf.length){var x=chnBuf[k]+(chnBuf[k+1]<<8)+rsample*(1-t);chnBuf[k]=255&x,chnBuf[k+1]=x>>8&255,x=chnBuf[k+2]+(chnBuf[k+3]<<8)+rsample*t,chnBuf[k+2]=255&x,chnBuf[k+3]=x>>8&255}}},sonantx.SoundGenerator.prototype.getAudioGenerator=function(n,callBack){var bufferSize=this.attack+this.sustain+this.release-1+32*this.rowLen,self=this;genBuffer(bufferSize,function(buffer){self.genSound(n,buffer,0),applyDelay(buffer,bufferSize,self.instr,self.rowLen,function(){callBack(new sonantx.AudioGenerator(buffer))})})},sonantx.SoundGenerator.prototype.createAudioBuffer=function(n,callBack){this.getAudioGenerator(n,function(ag){ag.getAudioBuffer(callBack)})},sonantx.MusicGenerator=function(song){this.song=song,this.waveSize=44100*song.songLen},sonantx.MusicGenerator.prototype.generateTrack=function(instr,mixBuf,callBack){var self=this;genBuffer(this.waveSize,function(chnBuf){var waveSamples=self.waveSize,waveBytes=self.waveSize*WAVE_CHAN*2,rowLen=self.song.rowLen,endPattern=self.song.endPattern,soundGen=new sonantx.SoundGenerator(instr,rowLen),currentpos=0,p=0,row=0,recordSounds=function(){for(var beginning=new Date;;)if(32!==row){if(p===endPattern-1)return void setTimeout(delay,0);var cp=instr.p[p];if(cp){var n=instr.c[cp-1].n[row];n&&soundGen.genSound(n,chnBuf,currentpos)}if(currentpos+=rowLen,row+=1,new Date-beginning>MAX_TIME)return void setTimeout(recordSounds,0)}else row=0,p+=1},delay=function(){applyDelay(chnBuf,waveSamples,instr,rowLen,finalize)},b2=0,finalize=function(){for(var beginning=new Date,count=0;b2<waveBytes;){var x2=mixBuf[b2]+(mixBuf[b2+1]<<8)+chnBuf[b2]+(chnBuf[b2+1]<<8)-32768;if(mixBuf[b2]=255&x2,mixBuf[b2+1]=x2>>8&255,b2+=2,(count+=1)%1e3==0&&new Date-beginning>MAX_TIME)return void setTimeout(finalize,0)}setTimeout(callBack,0)};setTimeout(recordSounds,0)})},sonantx.MusicGenerator.prototype.getAudioGenerator=function(callBack){var self=this;genBuffer(this.waveSize,function(mixBuf){var t=0,recu=function(){t<self.song.songData.length?(t+=1,self.generateTrack(self.song.songData[t-1],mixBuf,recu)):callBack(new sonantx.AudioGenerator(mixBuf))};recu()})},sonantx.MusicGenerator.prototype.createAudioBuffer=function(callBack){this.getAudioGenerator(function(ag){ag.getAudioBuffer(callBack)})};var song1={songLen:37,songData:[{osc1_oct:7,osc1_det:0,osc1_detune:0,osc1_xenv:0,osc1_vol:192,osc1_waveform:3,osc2_oct:7,osc2_det:0,osc2_detune:7,osc2_xenv:0,osc2_vol:201,osc2_waveform:3,noise_fader:0,env_attack:789,env_sustain:1234,env_release:13636,env_master:191,fx_filter:2,fx_freq:5839,fx_resonance:254,fx_delay_time:6,fx_delay_amt:121,fx_pan_freq:6,fx_pan_amt:147,lfo_osc1_freq:0,lfo_fx_freq:1,lfo_freq:6,lfo_amt:195,lfo_waveform:0,p:[1,2,0,0,1,2,1,2],c:[{n:[154,0,154,0,152,0,147,0,0,0,0,0,0,0,0,0,154,0,154,0,152,0,157,0,0,0,156,0,0,0,0,0]},{n:[154,0,154,0,152,0,147,0,0,0,0,0,0,0,0,0,154,0,154,0,152,0,157,0,0,0,159,0,0,0,0,0]}]},{osc1_oct:7,osc1_det:0,osc1_detune:0,osc1_xenv:0,osc1_vol:255,osc1_waveform:2,osc2_oct:8,osc2_det:0,osc2_detune:18,osc2_xenv:1,osc2_vol:191,osc2_waveform:2,noise_fader:0,env_attack:3997,env_sustain:56363,env_release:1e5,env_master:255,fx_filter:2,fx_freq:392,fx_resonance:255,fx_delay_time:8,fx_delay_amt:69,fx_pan_freq:5,fx_pan_amt:67,lfo_osc1_freq:0,lfo_fx_freq:1,lfo_freq:4,lfo_amt:57,lfo_waveform:3,p:[1,2,1,2,1,2,1,2],c:[{n:[130,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{n:[123,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]},{osc1_oct:8,osc1_det:0,osc1_detune:0,osc1_xenv:0,osc1_vol:0,osc1_waveform:0,osc2_oct:8,osc2_det:0,osc2_detune:0,osc2_xenv:0,osc2_vol:0,osc2_waveform:0,noise_fader:60,env_attack:50,env_sustain:419,env_release:4607,env_master:130,fx_filter:1,fx_freq:10332,fx_resonance:120,fx_delay_time:4,fx_delay_amt:16,fx_pan_freq:5,fx_pan_amt:108,lfo_osc1_freq:0,lfo_fx_freq:0,lfo_freq:5,lfo_amt:187,lfo_waveform:0,p:[0,0,0,0,1,1],c:[{n:[0,0,147,0,0,0,147,147,0,0,147,0,0,147,0,147,0,0,147,0,0,0,147,147,0,0,147,0,0,147,0,147]}]},{osc1_oct:7,osc1_det:0,osc1_detune:0,osc1_xenv:1,osc1_vol:255,osc1_waveform:0,osc2_oct:7,osc2_det:0,osc2_detune:0,osc2_xenv:1,osc2_vol:255,osc2_waveform:0,noise_fader:0,env_attack:50,env_sustain:150,env_release:4800,env_master:200,fx_filter:2,fx_freq:600,fx_resonance:254,fx_delay_time:0,fx_delay_amt:0,fx_pan_freq:0,fx_pan_amt:0,lfo_osc1_freq:0,lfo_fx_freq:0,lfo_freq:0,lfo_amt:0,lfo_waveform:0,p:[1,1,1,1,1,1],c:[{n:[147,0,0,0,0,0,0,0,147,0,0,0,0,0,0,0,147,0,0,0,0,0,0,0,147,0,0,0,0,0,0,0]}]},{osc1_oct:7,osc1_det:0,osc1_detune:0,osc1_xenv:0,osc1_vol:255,osc1_waveform:2,osc2_oct:7,osc2_det:0,osc2_detune:9,osc2_xenv:0,osc2_vol:154,osc2_waveform:2,noise_fader:0,env_attack:2418,env_sustain:1075,env_release:10614,env_master:240,fx_filter:3,fx_freq:2962,fx_resonance:255,fx_delay_time:6,fx_delay_amt:117,fx_pan_freq:3,fx_pan_amt:73,lfo_osc1_freq:0,lfo_fx_freq:1,lfo_freq:5,lfo_amt:124,lfo_waveform:0,p:[0,0,0,0,1,2,1,2],c:[{n:[154,0,154,0,152,0,147,0,0,0,0,0,0,0,0,0,154,0,154,0,152,0,157,0,0,0,156,0,0,0,0,0]},{n:[154,0,154,0,152,0,147,0,0,0,0,0,0,0,0,0,154,0,147,0,152,0,157,0,0,0,159,0,0,0,0,0]}]},{osc1_oct:7,osc1_det:0,osc1_detune:0,osc1_xenv:0,osc1_vol:192,osc1_waveform:1,osc2_oct:6,osc2_det:0,osc2_detune:9,osc2_xenv:0,osc2_vol:192,osc2_waveform:1,noise_fader:0,env_attack:137,env_sustain:2e3,env_release:4611,env_master:192,fx_filter:1,fx_freq:982,fx_resonance:89,fx_delay_time:6,fx_delay_amt:25,fx_pan_freq:6,fx_pan_amt:77,lfo_osc1_freq:0,lfo_fx_freq:1,lfo_freq:3,lfo_amt:69,lfo_waveform:0,p:[1,2,1,3,1,3],c:[{n:[130,0,130,0,142,0,130,130,0,142,130,0,142,0,130,0,130,0,130,0,142,0,130,130,0,142,130,0,142,0,130,0]},{n:[123,0,123,0,135,0,123,123,0,135,123,0,135,0,123,0,123,0,123,0,135,0,123,123,0,135,123,0,135,0,123,0]},{n:[135,0,135,0,147,0,135,135,0,147,135,0,147,0,135,0,135,0,135,0,147,0,135,135,0,147,135,0,147,0,135,0]}]},{osc1_oct:7,osc1_det:0,osc1_detune:0,osc1_xenv:0,osc1_vol:255,osc1_waveform:3,osc2_oct:8,osc2_det:0,osc2_detune:0,osc2_xenv:0,osc2_vol:255,osc2_waveform:0,noise_fader:127,env_attack:22,env_sustain:88,env_release:3997,env_master:255,fx_filter:3,fx_freq:4067,fx_resonance:234,fx_delay_time:4,fx_delay_amt:33,fx_pan_freq:2,fx_pan_amt:84,lfo_osc1_freq:0,lfo_fx_freq:1,lfo_freq:3,lfo_amt:28,lfo_waveform:0,p:[0,0,1,2,1,2,1,3],c:[{n:[0,0,142,0,154,0,0,0,142,0,0,0,154,0,0,0,0,0,142,0,154,0,0,0,142,0,0,0,154,0,0,0]},{n:[0,0,147,0,154,0,0,0,147,0,0,0,154,0,0,0,0,0,147,0,154,0,147,0,0,0,154,0,0,0,154,0]},{n:[0,0,147,0,154,0,0,0,147,0,0,0,154,0,0,0,0,0,147,0,154,0,0,0,147,0,0,0,0,0,0,0]}]},{osc1_oct:8,osc1_det:0,osc1_detune:0,osc1_xenv:0,osc1_vol:0,osc1_waveform:0,osc2_oct:8,osc2_det:0,osc2_detune:0,osc2_xenv:0,osc2_vol:0,osc2_waveform:0,noise_fader:255,env_attack:140347,env_sustain:9216,env_release:133417,env_master:208,fx_filter:2,fx_freq:2500,fx_resonance:16,fx_delay_time:2,fx_delay_amt:157,fx_pan_freq:8,fx_pan_amt:207,lfo_osc1_freq:0,lfo_fx_freq:1,lfo_freq:2,lfo_amt:51,lfo_waveform:0,p:[0,0,1,1,1,1,1,1],c:[{n:[147,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]}],rowLen:5513,endPattern:9};fontString="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_!@.'\"?/<()",fontBitmap="11111100011111110001100011111010001111101000111110111111000010000100000111111100100101000110001111101111110000111001000011111111111000011100100001000011111100001011110001111111000110001111111000110001111110010000100001001111111111000100001010010111101000110010111001001010001100001000010000100001111110001110111010110001100011000111001101011001110001011101000110001100010111011110100011001011100100000111010001100011001001111111101000111110100011000101111100000111000001111101111100100001000010000100100011000110001100010111010001100011000101010001001000110001101011010101110100010101000100010101000110001010100010000100001001111100010001000100011111001000110000100001000111001110100010001000100111111111000001001100000111110100101001011111000100001011111100001111000001111100111110000111101000101110111110000100010001000010001110100010111010001011100111010001011110000101110011101000110001100010111000000000000000000000111110010000100001000000000100111111000110111101011011101010111110101011111010100000000000000000000000100001100001000100000000000011011010011001000000000000111010001001100000000100000010001000100010001000000010001000100000100000100001000100001000010000010";const WIDTH=384,HEIGHT=256,PAGESIZE=WIDTH*HEIGHT|0,SPRITES=4*PAGESIZE|0,COLLISION=6*PAGESIZE|0,DEBUG=5*PAGESIZE|0;var C=document.getElementById("canvas"),ctx=C.getContext("2d"),renderTarget=0,renderSource=PAGESIZE,colors=[4278190080,4281606178,4282132549,4281416038,4282078863,4280709599,4284915929,4288332782,4281791227,4283491737,4281384554,4285436983,4281297227,4280568658,4281941042,4285808447,4286734384,4292963931,4294941539,4293184863,4294761419,4294967295,4290227611,4287069828,4285164137,4283586137,4287251062,4281479852,4284700633,4290411479,4283078543,4281364362],pal=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];ctx.imageSmoothingEnabled=!1,ctx.mozImageSmoothingEnabled=!1,C.width=WIDTH,C.height=HEIGHT;var imageData=ctx.getImageData(0,0,WIDTH,HEIGHT),buf=new ArrayBuffer(imageData.data.length),buf8=new Uint8Array(buf),data=new Uint32Array(buf),ram=new Uint8ClampedArray(WIDTH*HEIGHT*10);Number.prototype.clamp=function(min,max){return Math.min(Math.max(this,min),max)};const LEFT=1,RIGHT=2,UP=3,DOWN=4,WORLDWIDTH=2,WORLDHEIGHT=2;states={},init=(()=>{drawSpriteSheet(),last=0,dt=0,now=0,t=0,songTrigger=!1,state="game",audioCtx=new AudioContext,currentRoom=[0,0],player.init(),stats=new Stats,document.body.appendChild(stats.dom),loop()}),stopCapture=(e=>{}),window.addEventListener("keyup",function(event){Key.onKeyup(event)},!1),window.addEventListener("mousedown",function(event){stopCapture(event)},!1),window.addEventListener("keydown",function(event){Key.onKeydown(event)},!1),window.addEventListener("blur",function(event){paused=!0},!1),window.addEventListener("focus",function(event){paused=!1},!1),loop=(e=>{stats.begin();let now=(new Date).getTime();dt=Math.min(1,(now-last)/1e3),dt>.014&&(dt=.016),t+=dt,states[state].step(dt),last=now,states[state].render(),render(),stats.end(),requestAnimationFrame(loop)}),world=[0,0,0,0,0,1,6,7,8],rooms=[{draw:function(dt){renderSource=SPRITES,renderTarget=0,spr(0,0,WIDTH,HEIGHT),text(["0",20,20,1,1,"left","bottom",2,15,0]),lcg.setSeed(1019);for(let i=0;i<200;i++)pset(lcg.nextIntRange(0,384),lcg.nextIntRange(0,256),16)}},{draw:function(dt){text(["1",20,20,1,1,"left","bottom",2,15,0]);for(let i=0;i<200;i++)pset(lcg.nextIntRange(0,384),lcg.nextIntRange(0,256),16);for(let x=0;x<384;x+=40)for(let y=0;y<256;y+=40){let A=x-192+40*Math.sin(t),B=y-128+40*Math.cos(t);circle(x,y,Math.sqrt(A*A+B*B)-8,14)}}},{draw:function(dt){renderSource=SPRITES,renderTarget=0,spr(0,0,WIDTH,HEIGHT),lcg.setSeed(42);for(let i=0;i<200;i++)pset(lcg.nextIntRange(0,384),lcg.nextIntRange(0,256),16);text(["2",20,20,1,1,"left","bottom",2,15,0]);for(let x=0;x<384;x+=40)for(let y=0;y<256;y+=40){let A=x-576+40*Math.sin(t),B=y-128+40*Math.cos(t);circle(x,y,Math.sqrt(A*A+B*B)-8,14)}}},{draw:function(dt){renderTarget=COLLISION,fillRect(0,0,127,256,27),fillRect(250,0,127,256,27),renderTarget=0,text(["3",20,20,1,1,"left","bottom",2,15,0])}},{draw:function(dt){renderTarget=COLLISION,fillRect(0,0,127,256,27),fillRect(250,0,127,256,27),renderTarget=0,text(["4",20,20,1,1,"left","bottom",2,15,0])}},{draw:function(dt){text(["5",20,20,1,1,"left","bottom",2,15,0])}},{draw:function(dt){text(["6",20,20,1,1,"left","bottom",2,15,0]),lcg.setSeed(42);for(let i=0;i<200;i++)pset(lcg.nextIntRange(0,384),lcg.nextIntRange(0,256),16);renderTarget=COLLISION,fillRect(0,205,384,10,25),renderTarget=0}},{draw:function(dt){text(["7",20,20,1,1,"left","bottom",2,15,0]),renderTarget=COLLISION,fillTriangle(0,256,384,256,182,205,25),fillRect(100,70,20,80,24),fillRect(100,140,100,20,23),fillRect(200,820,10,100,23),fillRect(210,70,100,100,22),renderTarget=0,lcg.setSeed(42);for(let i=0;i<200;i++)pset(lcg.nextIntRange(0,384),lcg.nextIntRange(0,256),16);renderSource=SPRITES,spr(0,0,384,256)}},{draw:function(dt){text(["8",20,20,1,1,"left","bottom",2,15,0]),renderTarget=COLLISION,fillRect(0,205,384,10,25),renderTarget=0}}];new sonantx.MusicGenerator(song1);player={init(){this.x=64,this.y=64,this.radius=9,this.xvel=0,this.yvel=0,this.xspeed=200,this.yspeed=200,this.drag=.8,this.gravity=8,this.maxYvel=400,this.maxXvel=400,this.minYvel=-400,this.minXvel=-400,this.b={}},update(dt){this.updateB(),this.oldX=this.x,this.oldY=this.y,this.xvel*=player.drag,this.yvel+=player.gravity,this.yvel=this.yvel.clamp(this.minYvel,this.maxYvel),this.xvel=this.xvel.clamp(this.minXvel,this.maxXvel);let dx=dt*player.xvel,dy=dt*player.yvel;player.x+=dx,this.updateB(),this.collides()&&(player.x=player.oldX,player.xvel=.4*-player.xvel),player.y+=dy,this.updateB(),this.collides()&&(player.y=player.oldY,player.yvel=.4*-player.yvel),this.updateB(),this.collides()&&(this.x+=this.collideResolutionX(),this.updateB(),this.collides()&&(this.y+=this.collideResolutionY(),this.updateB())),this.updateB(),console.info(this.collides()),(Key.isDown(Key.d)||Key.isDown(Key.RIGHT))&&(player.xvel=player.xspeed),(Key.isDown(Key.a)||Key.isDown(Key.LEFT))&&(player.xvel=-player.xspeed),(Key.isDown(Key.w)||Key.isDown(Key.UP))&&(player.yvel=-player.yspeed),(Key.isDown(Key.s)||Key.isDown(Key.DOWN))&&(player.yvel=player.yspeed),player.x>WIDTH&&(player.x=0,roomSwitch(RIGHT)),player.x<0&&(player.x=WIDTH,roomSwitch(LEFT)),player.y>HEIGHT&&(player.y=0,roomSwitch(DOWN)),player.y<0&&(player.y=HEIGHT,roomSwitch(UP))},draw(dt){renderSource=SPRITES,renderTarget=0,spr(1,1,18,18,this.x-this.radius|0,this.y-this.radius|0)},collides(){for(var i=-this.radius;i<this.radius;i++)for(var j=-this.radius;j<this.radius;j++)if(ram[COLLISION+(this.b.x+i)+(this.b.y+j)*WIDTH])return!0;return!1},updateB(){this.b={left:this.x-this.radius|0,right:this.x+this.radius|0,top:this.y-this.radius|0,bottom:this.y+this.radius|0,width:2*this.radius,height:2*this.radius,x:0|this.x,y:0|this.y}},collideResolutionY(dt){let offsetY=0,b=this.b;for(let i=b.left;i<=b.right;i++)if(ram[COLLISION+i+WIDTH*b.bottom])for(let j=b.bottom;j>=b.top;j--)ram[COLLISION+i+WIDTH*j]&&(offsetY=j-b.bottom-1);for(let i=b.left;i<=b.right;i++)if(ram[COLLISION+i+WIDTH*b.top])for(let j=b.top;j<=b.bottom;j++)ram[COLLISION+i+WIDTH*j]&&(offsetY=j-b.top+1);return offsetY},collideResolutionX(dt){let offsetX=0,b=this.b;for(let i=b.top;i<=b.bottom;i++)if(ram[COLLISION+b.left+WIDTH*i])for(let j=b.x;j<=b.right;j++)ram[COLLISION+j+WIDTH*i]&&offsetX++;else if(ram[COLLISION+b.right+WIDTH*i])for(let j=b.x;j>=b.left;j--)ram[COLLISION+j+WIDTH*i]&&offsetX--;return offsetX}},states.gameover={step:function(dt){Key.isDown(Key.r)&&(state="menu")},render:function(dt){renderTarget=0,clear(0),text(["GAME OVER",256,80+15*Math.sin(2.5*t),8+4*Math.cos(2.9*t),15+5*Math.sin(3.5*t),"center","top",9,27])}},states.menu={step:function(dt){Key.isDown(Key.p)&&(state="game")},render:function(dt){renderTarget=0,clear(0);let i=t/3;for(let y=-128;y<128;y+=1)for(let x=-256;x<256;x+=2)pset(256+x+256*Math.cos(4*(y/128+i))+y,256+y+128*Math.sin(4*(x/256+i))+x,x/8%32);text(["LOSTGAME",WIDTH/2,40+15*Math.sin(2.5*t),8+4*Math.cos(2.9*t),15+5*Math.sin(3.5*t),"center","top",6,21]),text(["PRESS P TO CONTINUE",WIDTH/2,230,2,2,"center","top",1,21])}},states.game={step(dt){player.update(dt)},render(dt){renderTarget=0,clear(1),renderTarget=COLLISION,clear(0),renderTarget=0,rooms[world[currentRoom[1]*(WORLDWIDTH+1)+currentRoom[0]]].draw(),renderSource=COLLISION;i=6e3;for(lcg.setSeed(1019);--i;){let x=lcg.nextIntRange(0,WIDTH),y=lcg.nextIntRange(0,HEIGHT);ram[COLLISION+x+y*WIDTH]&&fillRect(x+lcg.nextIntRange(-5,0),y+lcg.nextIntRange(-10,0),lcg.nextIntRange(0,15),lcg.nextIntRange(0,10),lcg.nextIntRange(22,25))}player.draw(dt);var i=1e3;for(lcg.setSeed(1019);--i;){let x=lcg.nextIntRange(0,WIDTH),y=lcg.nextIntRange(0,HEIGHT);ram[COLLISION+x+y*WIDTH]&&(fillRect(x+lcg.nextIntRange(-5,0),y+lcg.nextIntRange(-20,0),lcg.nextIntRange(0,5),lcg.nextIntRange(0,20),lcg.nextIntRange(22,25)),fillCircle(x,y-10,2,lcg.nextIntRange(22,26)))}renderTarget=0}},Key={_pressed:{},_released:{},LEFT:37,UP:38,RIGHT:39,DOWN:40,SPACE:32,a:65,w:87,s:83,d:68,z:90,x:88,f:70,p:80,r:82,isDown(keyCode){return this._pressed[keyCode]},justReleased(keyCode){return this._released[keyCode]},onKeydown(event){this._pressed[event.keyCode]=!0},onKeyup(event){this._released[event.keyCode]=!0,delete this._pressed[event.keyCode]},update(){this._released={}}},window.onload=init()}();