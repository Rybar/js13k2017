// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){function h(a){c.appendChild(a.dom);return a}function k(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();k(++l%c.children.length)},!1);var g=(performance||Date).now(),e=g,a=0,r=h(new Stats.Panel("FPS","#0ff","#002")),f=h(new Stats.Panel("MS","#0f0","#020"));
    if(self.performance&&self.performance.memory)var t=h(new Stats.Panel("MB","#f08","#201"));k(0);return{REVISION:16,dom:c,addPanel:h,showPanel:k,begin:function(){g=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();f.update(c-g,200);if(c>e+1E3&&(r.update(1E3*a/(c-e),100),e=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){g=this.end()},domElement:c,setMode:k}};
Stats.Panel=function(h,k,l){var c=Infinity,g=0,e=Math.round,a=e(window.devicePixelRatio||1),r=80*a,f=48*a,t=3*a,u=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=f;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,f);b.fillStyle=k;b.fillText(h,t,u);b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(f,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         v){c=Math.min(c,f);g=Math.max(g,f);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=k;b.fillText(e(f)+" "+h+" ("+e(c)+"-"+e(g)+")",t,u);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,e((1-f/v)*p))}}};"object"===typeof module&&(module.exports=Stats);

(function(){

var lcg = {
  seed: Date.now(),
  a: 1664525,
  c: 1013904223,
  m: Math.pow(2, 32),

  setSeed: function(seed) {
    this.seed = seed;
  },

  nextInt: function() {
    // range [0, 2^32)
    this.seed = (this.seed * this.a + this.c) % this.m;
    return this.seed;
  },

  nextFloat: function() {
    // range [0, 1)
    return this.nextInt() / this.m;
  },

  nextBool: function(percent) {
    // percent is chance of getting true
    if(percent == null) {
      percent = 0.5;
    }
    return this.nextFloat() < percent;
  },

  nextFloatRange: function(min, max) {
    // range [min, max)
    return min + this.nextFloat() * (max - min);
  },

  nextIntRange: function(min, max) {
    // range [min, max)
    return Math.floor(this.nextFloatRange(min, max));
  },

  nextColor: function() {
    // range [#000000, #ffffff]
    var c = this.nextIntRange(0, Math.pow(2, 24)).toString(16).toUpperCase();
    while(c.length < 6) {
      c = "0" + c;
    }
    return "#" + c;
  }
};

//---------SONANT-X---------
/*
// Sonant-X
//
// Copyright (c) 2014 Nicolas Vanhoren
//
// Sonant-X is a fork of js-sonant by Marcus Geelnard and Jake Taylor. It is
// still published using the same license (zlib license, see below).
//
// Copyright (c) 2011 Marcus Geelnard
// Copyright (c) 2008-2009 Jake Taylor
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//    claim that you wrote the original software. If you use this software
//    in a product, an acknowledgment in the product documentation would be
//    appreciated but is not required.
//
// 2. Altered source versions must be plainly marked as such, and must not be
//    misrepresented as being the original software.
//
// 3. This notice may not be removed or altered from any source
//    distribution.
*/

var sonantx = {};

var WAVE_SPS = 44100;                    // Samples per second
var WAVE_CHAN = 2;                       // Channels
var MAX_TIME = 33; // maximum time, in millis, that the generator can use consecutively

var audioCtx = null;

// Oscillators
function osc_sin(value){
    return Math.sin(value * 6.283184);
}

function osc_square(value){
    if(osc_sin(value) < 0) return -1;
    return 1;
}

function osc_saw(value){
    return (value % 1) - 0.5;
}

function osc_tri(value){
    var v2 = (value % 1) * 4;
    if(v2 < 2) return v2 - 1;
    return 3 - v2;
}

// Array of oscillator functions
var oscillators = [
    osc_sin,
    osc_square,
    osc_saw,
    osc_tri
];

function getnotefreq(n){
    return 0.00390625 * Math.pow(1.059463094, n - 128);
}

function genBuffer(waveSize, callBack) {
    setTimeout(function() {
        // Create the channel work buffer
        var buf = new Uint8Array(waveSize * WAVE_CHAN * 2);
        var b = buf.length - 2;
        var iterate = function() {
            var begin = new Date();
            var count = 0;
            while(b >= 0)
            {
                buf[b] = 0;
                buf[b + 1] = 128;
                b -= 2;
                count += 1;
                if (count % 1000 === 0 && (new Date() - begin) > MAX_TIME) {
                    setTimeout(iterate, 0);
                    return;
                }
            }
            setTimeout(function() {callBack(buf);}, 0);
        };
        setTimeout(iterate, 0);
    }, 0);
}

function applyDelay(chnBuf, waveSamples, instr, rowLen, callBack) {
    var p1 = (instr.fx_delay_time * rowLen) >> 1;
    var t1 = instr.fx_delay_amt / 255;

    var n1 = 0;
    var iterate = function() {
        var beginning = new Date();
        var count = 0;
        while(n1 < waveSamples - p1)
        {
            var b1 = 4 * n1;
            var l = 4 * (n1 + p1);

            // Left channel = left + right[-p1] * t1
            var x1 = chnBuf[l] + (chnBuf[l+1] << 8) +
                (chnBuf[b1+2] + (chnBuf[b1+3] << 8) - 32768) * t1;
            chnBuf[l] = x1 & 255;
            chnBuf[l+1] = (x1 >> 8) & 255;

            // Right channel = right + left[-p1] * t1
            x1 = chnBuf[l+2] + (chnBuf[l+3] << 8) +
                (chnBuf[b1] + (chnBuf[b1+1] << 8) - 32768) * t1;
            chnBuf[l+2] = x1 & 255;
            chnBuf[l+3] = (x1 >> 8) & 255;
            ++n1;
            count += 1;
            if (count % 1000 === 0 && (new Date() - beginning) > MAX_TIME) {
                setTimeout(iterate, 0);
                return;
            }
        }
        setTimeout(callBack, 0);
    };
    setTimeout(iterate, 0);
}

sonantx.AudioGenerator = function(mixBuf) {
    this.mixBuf = mixBuf;
    this.waveSize = mixBuf.length / WAVE_CHAN / 2;
};

sonantx.AudioGenerator.prototype.getAudioBuffer = function(callBack) {
    if (audioCtx === null)
        audioCtx = new AudioContext();
    var mixBuf = this.mixBuf;
    var waveSize = this.waveSize;

    var waveBytes = waveSize * WAVE_CHAN * 2;
    var buffer = audioCtx.createBuffer(WAVE_CHAN, this.waveSize, WAVE_SPS); // Create Mono Source Buffer from Raw Binary
    var lchan = buffer.getChannelData(0);
    var rchan = buffer.getChannelData(1);
    var b = 0;
    var iterate = function() {
        var beginning = new Date();
        var count = 0;
        while (b < (waveBytes / 2)) {
            var y = 4 * (mixBuf[b * 4] + (mixBuf[(b * 4) + 1] << 8) - 32768);
            y = y < -32768 ? -32768 : (y > 32767 ? 32767 : y);
            lchan[b] = y / 32768;
            y = 4 * (mixBuf[(b * 4) + 2] + (mixBuf[(b * 4) + 3] << 8) - 32768);
            y = y < -32768 ? -32768 : (y > 32767 ? 32767 : y);
            rchan[b] = y / 32768;
            b += 1;
            count += 1;
            if (count % 1000 === 0 && new Date() - beginning > MAX_TIME) {
                setTimeout(iterate, 0);
                return;
            }
        }
        setTimeout(function() {callBack(buffer);}, 0);
    };
    setTimeout(iterate, 0);
};

sonantx.SoundGenerator = function(instr, rowLen) {
    this.instr = instr;
    this.rowLen = rowLen || 5605;

    this.osc_lfo = oscillators[instr.lfo_waveform];
    this.osc1 = oscillators[instr.osc1_waveform];
    this.osc2 = oscillators[instr.osc2_waveform];
    this.attack = instr.env_attack;
    this.sustain = instr.env_sustain;
    this.release = instr.env_release;
    this.panFreq = Math.pow(2, instr.fx_pan_freq - 8) / this.rowLen;
    this.lfoFreq = Math.pow(2, instr.lfo_freq - 8) / this.rowLen;
};

sonantx.SoundGenerator.prototype.genSound = function(n, chnBuf, currentpos) {
    var marker = new Date();
    var c1 = 0;
    var c2 = 0;

    // Precalculate frequencues
    var o1t = getnotefreq(n + (this.instr.osc1_oct - 8) * 12 + this.instr.osc1_det) * (1 + 0.0008 * this.instr.osc1_detune);
    var o2t = getnotefreq(n + (this.instr.osc2_oct - 8) * 12 + this.instr.osc2_det) * (1 + 0.0008 * this.instr.osc2_detune);

    // State variable init
    var q = this.instr.fx_resonance / 255;
    var low = 0;
    var band = 0;
    for (var j = this.attack + this.sustain + this.release - 1; j >= 0; --j)
    {
        var k = j + currentpos;

        // LFO
        var lfor = this.osc_lfo(k * this.lfoFreq) * this.instr.lfo_amt / 512 + 0.5;

        // Envelope
        var e = 1;
        if(j < this.attack)
            e = j / this.attack;
        else if(j >= this.attack + this.sustain)
            e -= (j - this.attack - this.sustain) / this.release;

        // Oscillator 1
        var t = o1t;
        if(this.instr.lfo_osc1_freq) t += lfor;
        if(this.instr.osc1_xenv) t *= e * e;
        c1 += t;
        var rsample = this.osc1(c1) * this.instr.osc1_vol;

        // Oscillator 2
        t = o2t;
        if(this.instr.osc2_xenv) t *= e * e;
        c2 += t;
        rsample += this.osc2(c2) * this.instr.osc2_vol;

        // Noise oscillator
        if(this.instr.noise_fader) rsample += (2*Math.random()-1) * this.instr.noise_fader * e;

        rsample *= e / 255;

        // State variable filter
        var f = this.instr.fx_freq;
        if(this.instr.lfo_fx_freq) f *= lfor;
        f = 1.5 * Math.sin(f * 3.141592 / WAVE_SPS);
        low += f * band;
        var high = q * (rsample - band) - low;
        band += f * high;
        switch(this.instr.fx_filter)
        {
            case 1: // Hipass
                rsample = high;
                break;
            case 2: // Lopass
                rsample = low;
                break;
            case 3: // Bandpass
                rsample = band;
                break;
            case 4: // Notch
                rsample = low + high;
                break;
            default:
        }

        // Panning & master volume
        t = osc_sin(k * this.panFreq) * this.instr.fx_pan_amt / 512 + 0.5;
        rsample *= 39 * this.instr.env_master;

        // Add to 16-bit channel buffer
        k = k * 4;
        if (k + 3 < chnBuf.length) {
            var x = chnBuf[k] + (chnBuf[k+1] << 8) + rsample * (1 - t);
            chnBuf[k] = x & 255;
            chnBuf[k+1] = (x >> 8) & 255;
            x = chnBuf[k+2] + (chnBuf[k+3] << 8) + rsample * t;
            chnBuf[k+2] = x & 255;
            chnBuf[k+3] = (x >> 8) & 255;
        }
    }
};

sonantx.SoundGenerator.prototype.getAudioGenerator = function(n, callBack) {
    var bufferSize = (this.attack + this.sustain + this.release - 1) + (32 * this.rowLen);
    var self = this;
    genBuffer(bufferSize, function(buffer) {
        self.genSound(n, buffer, 0);
        applyDelay(buffer, bufferSize, self.instr, self.rowLen, function() {
            callBack(new sonantx.AudioGenerator(buffer));
        });
    });
};

// sonantx.SoundGenerator.prototype.createAudio = function(n, callBack) {
//     this.getAudioGenerator(n, function(ag) {
//         callBack(ag.getAudio());
//     });
// };

sonantx.SoundGenerator.prototype.createAudioBuffer = function(n, callBack) {
    this.getAudioGenerator(n, function(ag) {
        ag.getAudioBuffer(callBack);
    });
};

sonantx.MusicGenerator = function(song) {
    this.song = song;
    // Wave data configuration
    this.waveSize = WAVE_SPS * song.songLen; // Total song size (in samples)
};
sonantx.MusicGenerator.prototype.generateTrack = function (instr, mixBuf, callBack) {
    var self = this;
    genBuffer(this.waveSize, function(chnBuf) {
        // Preload/precalc some properties/expressions (for improved performance)
        var waveSamples = self.waveSize,
            waveBytes = self.waveSize * WAVE_CHAN * 2,
            rowLen = self.song.rowLen,
            endPattern = self.song.endPattern,
            soundGen = new sonantx.SoundGenerator(instr, rowLen);

        var currentpos = 0;
        var p = 0;
        var row = 0;
        var recordSounds = function() {
            var beginning = new Date();
            while (true) {
                if (row === 32) {
                    row = 0;
                    p += 1;
                    continue;
                }
                if (p === endPattern - 1) {
                    setTimeout(delay, 0);
                    return;
                }
                var cp = instr.p[p];
                if (cp) {
                    var n = instr.c[cp - 1].n[row];
                    if (n) {
                        soundGen.genSound(n, chnBuf, currentpos);
                    }
                }
                currentpos += rowLen;
                row += 1;
                if (new Date() - beginning > MAX_TIME) {
                    setTimeout(recordSounds, 0);
                    return;
                }
            }
        };

        var delay = function() {
            applyDelay(chnBuf, waveSamples, instr, rowLen, finalize);
        };

        var b2 = 0;
        var finalize = function() {
            var beginning = new Date();
            var count = 0;
            // Add to mix buffer
            while(b2 < waveBytes)
            {
                var x2 = mixBuf[b2] + (mixBuf[b2+1] << 8) + chnBuf[b2] + (chnBuf[b2+1] << 8) - 32768;
                mixBuf[b2] = x2 & 255;
                mixBuf[b2+1] = (x2 >> 8) & 255;
                b2 += 2;
                count += 1;
                if (count % 1000 === 0 && (new Date() - beginning) > MAX_TIME) {
                    setTimeout(finalize, 0);
                    return;
                }
            }
            setTimeout(callBack, 0);
        };
        setTimeout(recordSounds, 0);
    });
};
sonantx.MusicGenerator.prototype.getAudioGenerator = function(callBack) {
    var self = this;
    genBuffer(this.waveSize, function(mixBuf) {
        var t = 0;
        var recu = function() {
            if (t < self.song.songData.length) {
                t += 1;
                self.generateTrack(self.song.songData[t - 1], mixBuf, recu);
            } else {
                callBack(new sonantx.AudioGenerator(mixBuf));
            }
        };
        recu();
    });
};

sonantx.MusicGenerator.prototype.createAudioBuffer = function(callBack) {
    this.getAudioGenerator(function(ag) {
        ag.getAudioBuffer(callBack);
    });
};

//---------END SONANT-X-----

var song1 = {
    "songLen": 37,
    "songData": [
        {
            "osc1_oct": 7,
            "osc1_det": 0,
            "osc1_detune": 0,
            "osc1_xenv": 0,
            "osc1_vol": 192,
            "osc1_waveform": 3,
            "osc2_oct": 7,
            "osc2_det": 0,
            "osc2_detune": 7,
            "osc2_xenv": 0,
            "osc2_vol": 201,
            "osc2_waveform": 3,
            "noise_fader": 0,
            "env_attack": 789,
            "env_sustain": 1234,
            "env_release": 13636,
            "env_master": 191,
            "fx_filter": 2,
            "fx_freq": 5839,
            "fx_resonance": 254,
            "fx_delay_time": 6,
            "fx_delay_amt": 121,
            "fx_pan_freq": 6,
            "fx_pan_amt": 147,
            "lfo_osc1_freq": 0,
            "lfo_fx_freq": 1,
            "lfo_freq": 6,
            "lfo_amt": 195,
            "lfo_waveform": 0,
            "p": [
                1,
                2,
                0,
                0,
                1,
                2,
                1,
                2
            ],
            "c": [
                {
                    "n": [
                        154,
                        0,
                        154,
                        0,
                        152,
                        0,
                        147,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        154,
                        0,
                        154,
                        0,
                        152,
                        0,
                        157,
                        0,
                        0,
                        0,
                        156,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                {
                    "n": [
                        154,
                        0,
                        154,
                        0,
                        152,
                        0,
                        147,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        154,
                        0,
                        154,
                        0,
                        152,
                        0,
                        157,
                        0,
                        0,
                        0,
                        159,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                }
            ]
        },
        {
            "osc1_oct": 7,
            "osc1_det": 0,
            "osc1_detune": 0,
            "osc1_xenv": 0,
            "osc1_vol": 255,
            "osc1_waveform": 2,
            "osc2_oct": 8,
            "osc2_det": 0,
            "osc2_detune": 18,
            "osc2_xenv": 1,
            "osc2_vol": 191,
            "osc2_waveform": 2,
            "noise_fader": 0,
            "env_attack": 3997,
            "env_sustain": 56363,
            "env_release": 100000,
            "env_master": 255,
            "fx_filter": 2,
            "fx_freq": 392,
            "fx_resonance": 255,
            "fx_delay_time": 8,
            "fx_delay_amt": 69,
            "fx_pan_freq": 5,
            "fx_pan_amt": 67,
            "lfo_osc1_freq": 0,
            "lfo_fx_freq": 1,
            "lfo_freq": 4,
            "lfo_amt": 57,
            "lfo_waveform": 3,
            "p": [
                1,
                2,
                1,
                2,
                1,
                2,
                1,
                2
            ],
            "c": [
                {
                    "n": [
                        130,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                {
                    "n": [
                        123,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                }
            ]
        },
        {
            "osc1_oct": 8,
            "osc1_det": 0,
            "osc1_detune": 0,
            "osc1_xenv": 0,
            "osc1_vol": 0,
            "osc1_waveform": 0,
            "osc2_oct": 8,
            "osc2_det": 0,
            "osc2_detune": 0,
            "osc2_xenv": 0,
            "osc2_vol": 0,
            "osc2_waveform": 0,
            "noise_fader": 60,
            "env_attack": 50,
            "env_sustain": 419,
            "env_release": 4607,
            "env_master": 130,
            "fx_filter": 1,
            "fx_freq": 10332,
            "fx_resonance": 120,
            "fx_delay_time": 4,
            "fx_delay_amt": 16,
            "fx_pan_freq": 5,
            "fx_pan_amt": 108,
            "lfo_osc1_freq": 0,
            "lfo_fx_freq": 0,
            "lfo_freq": 5,
            "lfo_amt": 187,
            "lfo_waveform": 0,
            "p": [
                0,
                0,
                0,
                0,
                1,
                1
            ],
            "c": [
                {
                    "n": [
                        0,
                        0,
                        147,
                        0,
                        0,
                        0,
                        147,
                        147,
                        0,
                        0,
                        147,
                        0,
                        0,
                        147,
                        0,
                        147,
                        0,
                        0,
                        147,
                        0,
                        0,
                        0,
                        147,
                        147,
                        0,
                        0,
                        147,
                        0,
                        0,
                        147,
                        0,
                        147
                    ]
                }
            ]
        },
        {
            "osc1_oct": 7,
            "osc1_det": 0,
            "osc1_detune": 0,
            "osc1_xenv": 1,
            "osc1_vol": 255,
            "osc1_waveform": 0,
            "osc2_oct": 7,
            "osc2_det": 0,
            "osc2_detune": 0,
            "osc2_xenv": 1,
            "osc2_vol": 255,
            "osc2_waveform": 0,
            "noise_fader": 0,
            "env_attack": 50,
            "env_sustain": 150,
            "env_release": 4800,
            "env_master": 200,
            "fx_filter": 2,
            "fx_freq": 600,
            "fx_resonance": 254,
            "fx_delay_time": 0,
            "fx_delay_amt": 0,
            "fx_pan_freq": 0,
            "fx_pan_amt": 0,
            "lfo_osc1_freq": 0,
            "lfo_fx_freq": 0,
            "lfo_freq": 0,
            "lfo_amt": 0,
            "lfo_waveform": 0,
            "p": [
                1,
                1,
                1,
                1,
                1,
                1
            ],
            "c": [
                {
                    "n": [
                        147,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        147,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        147,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        147,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                }
            ]
        },
        {
            "osc1_oct": 7,
            "osc1_det": 0,
            "osc1_detune": 0,
            "osc1_xenv": 0,
            "osc1_vol": 255,
            "osc1_waveform": 2,
            "osc2_oct": 7,
            "osc2_det": 0,
            "osc2_detune": 9,
            "osc2_xenv": 0,
            "osc2_vol": 154,
            "osc2_waveform": 2,
            "noise_fader": 0,
            "env_attack": 2418,
            "env_sustain": 1075,
            "env_release": 10614,
            "env_master": 240,
            "fx_filter": 3,
            "fx_freq": 2962,
            "fx_resonance": 255,
            "fx_delay_time": 6,
            "fx_delay_amt": 117,
            "fx_pan_freq": 3,
            "fx_pan_amt": 73,
            "lfo_osc1_freq": 0,
            "lfo_fx_freq": 1,
            "lfo_freq": 5,
            "lfo_amt": 124,
            "lfo_waveform": 0,
            "p": [
                0,
                0,
                0,
                0,
                1,
                2,
                1,
                2
            ],
            "c": [
                {
                    "n": [
                        154,
                        0,
                        154,
                        0,
                        152,
                        0,
                        147,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        154,
                        0,
                        154,
                        0,
                        152,
                        0,
                        157,
                        0,
                        0,
                        0,
                        156,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                {
                    "n": [
                        154,
                        0,
                        154,
                        0,
                        152,
                        0,
                        147,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        154,
                        0,
                        147,
                        0,
                        152,
                        0,
                        157,
                        0,
                        0,
                        0,
                        159,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                }
            ]
        },
        {
            "osc1_oct": 7,
            "osc1_det": 0,
            "osc1_detune": 0,
            "osc1_xenv": 0,
            "osc1_vol": 192,
            "osc1_waveform": 1,
            "osc2_oct": 6,
            "osc2_det": 0,
            "osc2_detune": 9,
            "osc2_xenv": 0,
            "osc2_vol": 192,
            "osc2_waveform": 1,
            "noise_fader": 0,
            "env_attack": 137,
            "env_sustain": 2000,
            "env_release": 4611,
            "env_master": 192,
            "fx_filter": 1,
            "fx_freq": 982,
            "fx_resonance": 89,
            "fx_delay_time": 6,
            "fx_delay_amt": 25,
            "fx_pan_freq": 6,
            "fx_pan_amt": 77,
            "lfo_osc1_freq": 0,
            "lfo_fx_freq": 1,
            "lfo_freq": 3,
            "lfo_amt": 69,
            "lfo_waveform": 0,
            "p": [
                1,
                2,
                1,
                3,
                1,
                3
            ],
            "c": [
                {
                    "n": [
                        130,
                        0,
                        130,
                        0,
                        142,
                        0,
                        130,
                        130,
                        0,
                        142,
                        130,
                        0,
                        142,
                        0,
                        130,
                        0,
                        130,
                        0,
                        130,
                        0,
                        142,
                        0,
                        130,
                        130,
                        0,
                        142,
                        130,
                        0,
                        142,
                        0,
                        130,
                        0
                    ]
                },
                {
                    "n": [
                        123,
                        0,
                        123,
                        0,
                        135,
                        0,
                        123,
                        123,
                        0,
                        135,
                        123,
                        0,
                        135,
                        0,
                        123,
                        0,
                        123,
                        0,
                        123,
                        0,
                        135,
                        0,
                        123,
                        123,
                        0,
                        135,
                        123,
                        0,
                        135,
                        0,
                        123,
                        0
                    ]
                },
                {
                    "n": [
                        135,
                        0,
                        135,
                        0,
                        147,
                        0,
                        135,
                        135,
                        0,
                        147,
                        135,
                        0,
                        147,
                        0,
                        135,
                        0,
                        135,
                        0,
                        135,
                        0,
                        147,
                        0,
                        135,
                        135,
                        0,
                        147,
                        135,
                        0,
                        147,
                        0,
                        135,
                        0
                    ]
                }
            ]
        },
        {
            "osc1_oct": 7,
            "osc1_det": 0,
            "osc1_detune": 0,
            "osc1_xenv": 0,
            "osc1_vol": 255,
            "osc1_waveform": 3,
            "osc2_oct": 8,
            "osc2_det": 0,
            "osc2_detune": 0,
            "osc2_xenv": 0,
            "osc2_vol": 255,
            "osc2_waveform": 0,
            "noise_fader": 127,
            "env_attack": 22,
            "env_sustain": 88,
            "env_release": 3997,
            "env_master": 255,
            "fx_filter": 3,
            "fx_freq": 4067,
            "fx_resonance": 234,
            "fx_delay_time": 4,
            "fx_delay_amt": 33,
            "fx_pan_freq": 2,
            "fx_pan_amt": 84,
            "lfo_osc1_freq": 0,
            "lfo_fx_freq": 1,
            "lfo_freq": 3,
            "lfo_amt": 28,
            "lfo_waveform": 0,
            "p": [
                0,
                0,
                1,
                2,
                1,
                2,
                1,
                3
            ],
            "c": [
                {
                    "n": [
                        0,
                        0,
                        142,
                        0,
                        154,
                        0,
                        0,
                        0,
                        142,
                        0,
                        0,
                        0,
                        154,
                        0,
                        0,
                        0,
                        0,
                        0,
                        142,
                        0,
                        154,
                        0,
                        0,
                        0,
                        142,
                        0,
                        0,
                        0,
                        154,
                        0,
                        0,
                        0
                    ]
                },
                {
                    "n": [
                        0,
                        0,
                        147,
                        0,
                        154,
                        0,
                        0,
                        0,
                        147,
                        0,
                        0,
                        0,
                        154,
                        0,
                        0,
                        0,
                        0,
                        0,
                        147,
                        0,
                        154,
                        0,
                        147,
                        0,
                        0,
                        0,
                        154,
                        0,
                        0,
                        0,
                        154,
                        0
                    ]
                },
                {
                    "n": [
                        0,
                        0,
                        147,
                        0,
                        154,
                        0,
                        0,
                        0,
                        147,
                        0,
                        0,
                        0,
                        154,
                        0,
                        0,
                        0,
                        0,
                        0,
                        147,
                        0,
                        154,
                        0,
                        0,
                        0,
                        147,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                }
            ]
        },
        {
            "osc1_oct": 8,
            "osc1_det": 0,
            "osc1_detune": 0,
            "osc1_xenv": 0,
            "osc1_vol": 0,
            "osc1_waveform": 0,
            "osc2_oct": 8,
            "osc2_det": 0,
            "osc2_detune": 0,
            "osc2_xenv": 0,
            "osc2_vol": 0,
            "osc2_waveform": 0,
            "noise_fader": 255,
            "env_attack": 140347,
            "env_sustain": 9216,
            "env_release": 133417,
            "env_master": 208,
            "fx_filter": 2,
            "fx_freq": 2500,
            "fx_resonance": 16,
            "fx_delay_time": 2,
            "fx_delay_amt": 157,
            "fx_pan_freq": 8,
            "fx_pan_amt": 207,
            "lfo_osc1_freq": 0,
            "lfo_fx_freq": 1,
            "lfo_freq": 2,
            "lfo_amt": 51,
            "lfo_waveform": 0,
            "p": [
                0,
                0,
                1,
                1,
                1,
                1,
                1,
                1
            ],
            "c": [
                {
                    "n": [
                        147,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                }
            ]
        }
    ],
    "rowLen": 5513,
    "endPattern": 9
}
fontString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_!@.'\"?/<()";

fontBitmap = "11111100011111110001100011111010001111101000111110111111000010000100000111111100100101000110001111101111110000111001000011111111111000"+
"0111001000010000111111000010111100011111110001100011111110001100011111100100001000010011111111110001000010100101111010001100101110010010100011000"+
"0100001000010000111111000111011101011000110001100011100110101100111000101110100011000110001011101111010001100101110010000011101000110001100100111"+
"1111101000111110100011000101111100000111000001111101111100100001000010000100100011000110001100010111010001100011000101010001001000110001101011010"+
"1011101000101010001000101010001100010101000100001000010011111000100010001000111110010001100001000010001110011101000100010001001111111110000010011"+
"0000011111010010100101111100010000101111110000111100000111110011111000011110100010111011111000010001000100001000111010001011101000101110011101000"+
"1011110000101110011101000110001100010111000000000000000000000111110010000100001000000000100111111000110111101011011101010111110101011111010100000"+
"000000000000000000100001100001000100000000000011011010011001000000000000111010001001100000000100000010001000100010001000000010001000100000100000100001000100001000010000010"


function drawSpriteSheet(){
  renderTarget = SPRITES;
  //head
  fillRect(3,7,17,9,8);  //0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
  fillRect(2,8,19,7,8);
  fillRect(4,9,15,5,2);

  //eyes
  fillRect(6,11,2,1,16);
  fillRect(16,11,2,1,16);
  //pupils
  line(7,12,8,12,21);
  line(17,12,18,12,21);
  //antenna
  line(12,6,12,3,5);
  pset(12,3,21);

  //body
  fillRect(10,17,3,1,5);
  fillRect(8,19,7,7,5);
  fillRect(9,23,5,5,0);

  //wheel
  fillCircle(11,28,5,13);
  fillRect(10,22,2,5,8);
  fillCircle(11,28,3,8);
  circle(11,28,1,5);

  //arm
  fillTriangle(11,19, 18,27,  21,23, 8);
}

//--------------Engine.js-------------------

const WIDTH =     384;
const HEIGHT =    256;
const PAGES =     10;  //page = 1 screen HEIGHTxWIDTH worth of screenbuffer.
const PAGESIZE = WIDTH*HEIGHT;

const SCREEN = 0;
const BUFFER = PAGESIZE;
const DEBUG = PAGESIZE*2;
const SCRATCH = PAGESIZE*3;
const SCRATCH2 = PAGESIZE*4;
const SPRITES = PAGESIZE*5;
const COLLISION = PAGESIZE*6;
const MIDGROUND = PAGESIZE*7;
const FOREGROUND = PAGESIZE*8;
const BACKGROUND = PAGESIZE*9;
//default palette index
const palDefault = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

var
C =               document.getElementById('canvas'),
ctx =             C.getContext('2d'),
renderTarget =    0x00000,
renderSource =    PAGESIZE, //buffer is ahead one screen's worth of pixels

//Richard Fhager's DB32 Palette http://http://pixeljoint.com/forum/forum_posts.asp?TID=16247
//ofcourse you can change this to whatever you like, up to 256 colors.
//one GOTCHA: colors are stored 0xAABBGGRR, so you'll have to flop the values from your typical hex colors.

colors =          [0xff000000, 0xff342022, 0xff3c2845, 0xff313966, 0xff3b568f, 0xff2671df, 0xff66a0d9, 0xff9ac3ee,
                   0xff36f2fb, 0xff50e599, 0xff30be6a, 0xff6e9437, 0xff2f694b, 0xff244b52, 0xff393c32, 0xff743f3f,
                   0xff826030, 0xffe16e5b, 0xffff9b63, 0xffe4cd5f, 0xfffcdbcb, 0xffffffff, 0xffb7ad9b, 0xff877e84,
                   0xff6a6a69, 0xff525659, 0xff8a4276, 0xff3232ac, 0xff6357d9, 0xffba7bd7, 0xff4a978f, 0xff306f8a],

//active palette index. maps to indices in colors[]. can alter this whenever for palette effects.
pal =             [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
paldrk =          [0,0,1,2,3,4,5,6,6,10,11,12,13,14,2,2,15,16,17,18,22,20,23,24,25,26,2,2,27,28,31,13]

ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;

C.width = WIDTH;
C.height = HEIGHT;
var imageData =   ctx.getImageData(0, 0, WIDTH, HEIGHT),
buf =             new ArrayBuffer(imageData.data.length),
buf8 =            new Uint8Array(buf),
data =            new Uint32Array(buf),
ram =             new Uint8ClampedArray(WIDTH * HEIGHT * PAGES);

//--------------graphics functions----------------

  function clear(color){
    ram.fill(color, renderTarget, renderTarget + PAGESIZE);
  }

  function pset(x, y, color) { //an index from colors[], 0-31
    x = x|0; y = y|0; color = color|0;

    if (x > 0 && x < WIDTH && y > 0 && y < HEIGHT) {
      ram[renderTarget + y * WIDTH + x] = color;
    }
  }

  function pget(x, y, page=renderTarget){
    return ram[page + x + y * WIDTH];
  }

  function line(x1, y1, x2, y2, color) {

    x1 = x1|0;
    x2 = x2|0;
    y1 = y1|0;
    y2 = y2|0;

    var dy = (y2 - y1);
    var dx = (x2 - x1);
    var stepx, stepy;

    if (dy < 0) {
      dy = -dy;
      stepy = -1;
    } else {
      stepy = 1;
    }
    if (dx < 0) {
      dx = -dx;
      stepx = -1;
    } else {
      stepx = 1;
    }
    dy <<= 1;        // dy is now 2*dy
    dx <<= 1;        // dx is now 2*dx

    pset(x1, y1, color);
    if (dx > dy) {
      var fraction = dy - (dx >> 1);  // same as 2*dy - dx
      while (x1 != x2) {
        if (fraction >= 0) {
          y1 += stepy;
          fraction -= dx;          // same as fraction -= 2*dx
        }
        x1 += stepx;
        fraction += dy;              // same as fraction -= 2*dy
        pset(x1, y1, color);
      }
      ;
    } else {
      fraction = dx - (dy >> 1);
      while (y1 != y2) {
        if (fraction >= 0) {
          x1 += stepx;
          fraction -= dy;
        }
        y1 += stepy;
        fraction += dx;
        pset(x1, y1, color);
      }
    }

  }

  function circle(xm, ym, r, color) {
    var x = -r, y = 0, err = 2 - 2 * r;
    /* II. Quadrant */
    do {
      pset(xm - x, ym + y, color);
      /*   I. Quadrant */
      pset(xm - y, ym - x, color);
      /*  II. Quadrant */
      pset(xm + x, ym - y, color);
      /* III. Quadrant */
      pset(xm + y, ym + x, color);
      /*  IV. Quadrant */
      r = err;
      if (r <= y) err += ++y * 2 + 1;
      /* e_xy+e_y < 0 */
      if (r > x || err > y) err += ++x * 2 + 1;
      /* e_xy+e_x > 0 or no 2nd y-step */

    } while (x < 0);
  }

  function fillCircle(xm, ym, r, color) {
    if(r < 0) return;
    xm = xm|0; ym = ym|0, r = r|0; color = color|0;
    var x = -r, y = 0, err = 2 - 2 * r;
    /* II. Quadrant */
    do {
      line(xm-x, ym-y, xm+x, ym-y, color);
      line(xm-x, ym+y, xm+x, ym+y, color);
      r = err;
      if (r <= y) err += ++y * 2 + 1;
      if (r > x || err > y) err += ++x * 2 + 1;
    } while (x < 0);
  }

  function rect(x, y, w, h, color) {
    x1 = x|0;
    y1 = y|0;
    x2 = (x+w)|0;
    y2 = (y+h)|0;


    line(x1,y1, x2, y1, color);
    line(x2, y1, x2, y2, color);
    line(x1, y2, x2, y2, color);
    line(x1, y1, x1, y2, color);
  }

  function fillRect(x, y, w, h, color) {
    x1 = x|0;
    y1 = y|0;
    x2 = (x+w)|0;
    y2 = (y+h)|0;

    var i = Math.abs(y2 - y1);
    line(x1, y1, x2, y1, color);

    if(i > 0){
      while (--i) {
        line(x1, y1+i, x2, y1+i, color);
      }
    }

    line(x1,y2, x2, y2, color);
  }

  function cRect(x,y,w,h,c,color){
    for(let i = 0; i <= c; i++){
      fillRect(x+i,y-i,w-i*2,h+i*2,color);
    }
  }

  function outline(renderSource, renderTarget, color, color2=color, color3=color, color4=color){

    for(let i = 0; i <= WIDTH; i++ ){
      for(let j = 0; j <= HEIGHT; j++){
        let left = i-1 + j * WIDTH;
        let right = i+1 + j * WIDTH;
        let bottom = i + (j+1) * WIDTH;
        let top = i + (j-1) * WIDTH;
        let current = i + j * WIDTH;

        if(ram[renderSource + current]){
          if(!ram[renderSource + left]){
            ram[renderTarget + left] = color;
          };
          if(!ram[renderSource + right]){
            ram[renderTarget + right] = color3;
          };
          if(!ram[renderSource + top]){
            ram[renderTarget + top] = color2;
          };
          if(!ram[renderSource + bottom]){
            ram[renderTarget + bottom] = color4;
          };
        }
      }
    }
  }

  function triangle(x1, y1, x2, y2, x3, y3, color) {
    line(x1,y1, x2,y2, color);
    line(x2,y2, x3,y3, color);
    line(x3,y3, x1,y1, color);
  }

  function fillTriangle( x1, y1, x2, y2, x3, y3, color ) {

    var canvasWidth = WIDTH;
    // http://devmaster.net/forums/topic/1145-advanced-rasterization/
    // 28.4 fixed-point coordinates
    var x1 = Math.round( 16 * x1 );
    var x2 = Math.round( 16 * x2 );
    var x3 = Math.round( 16 * x3 );
    var y1 = Math.round( 16 * y1 );
    var y2 = Math.round( 16 * y2 );
    var y3 = Math.round( 16 * y3 );
    // Deltas
    var dx12 = x1 - x2, dy12 = y2 - y1;
    var dx23 = x2 - x3, dy23 = y3 - y2;
    var dx31 = x3 - x1, dy31 = y1 - y3;
    // Bounding rectangle
    var minx = Math.max( ( Math.min( x1, x2, x3 ) + 0xf ) >> 4, 0 );
    var maxx = Math.min( ( Math.max( x1, x2, x3 ) + 0xf ) >> 4, WIDTH );
    var miny = Math.max( ( Math.min( y1, y2, y3 ) + 0xf ) >> 4, 0 );
    var maxy = Math.min( ( Math.max( y1, y2, y3 ) + 0xf ) >> 4, HEIGHT );
    // Block size, standard 8x8 (must be power of two)
    var q = 8;
    // Start in corner of 8x8 block
    minx &= ~(q - 1);
    miny &= ~(q - 1);
    // Constant part of half-edge functions
    var c1 = -dy12 * x1 - dx12 * y1;
    var c2 = -dy23 * x2 - dx23 * y2;
    var c3 = -dy31 * x3 - dx31 * y3;
    // Correct for fill convention
    if ( dy12 > 0 || ( dy12 == 0 && dx12 > 0 ) ) c1 ++;
    if ( dy23 > 0 || ( dy23 == 0 && dx23 > 0 ) ) c2 ++;
    if ( dy31 > 0 || ( dy31 == 0 && dx31 > 0 ) ) c3 ++;
    // Note this doesn't kill subpixel precision, but only because we test for >=0 (not >0).
    // It's a bit subtle. :)
    c1 = (c1 - 1) >> 4;
    c2 = (c2 - 1) >> 4;
    c3 = (c3 - 1) >> 4;
    // Set up min/max corners
    var qm1 = q - 1; // for convenience
    var nmin1 = 0, nmax1 = 0;
    var nmin2 = 0, nmax2 = 0;
    var nmin3 = 0, nmax3 = 0;
    if (dx12 >= 0) nmax1 -= qm1*dx12; else nmin1 -= qm1*dx12;
    if (dy12 >= 0) nmax1 -= qm1*dy12; else nmin1 -= qm1*dy12;
    if (dx23 >= 0) nmax2 -= qm1*dx23; else nmin2 -= qm1*dx23;
    if (dy23 >= 0) nmax2 -= qm1*dy23; else nmin2 -= qm1*dy23;
    if (dx31 >= 0) nmax3 -= qm1*dx31; else nmin3 -= qm1*dx31;
    if (dy31 >= 0) nmax3 -= qm1*dy31; else nmin3 -= qm1*dy31;
    // Loop through blocks
    var linestep = (canvasWidth-q);
    for ( var y0 = miny; y0 < maxy; y0 += q ) {
      for ( var x0 = minx; x0 < maxx; x0 += q ) {
        // Edge functions at top-left corner
        var cy1 = c1 + dx12 * y0 + dy12 * x0;
        var cy2 = c2 + dx23 * y0 + dy23 * x0;
        var cy3 = c3 + dx31 * y0 + dy31 * x0;
        // Skip block when at least one edge completely out
        if (cy1 < nmax1 || cy2 < nmax2 || cy3 < nmax3) continue;
        // Offset at top-left corner
        var offset = (x0 + y0 * canvasWidth);
        // Accept whole block when fully covered
        if (cy1 >= nmin1 && cy2 >= nmin2 && cy3 >= nmin3) {
          for ( var iy = 0; iy < q; iy ++ ) {
            for ( var ix = 0; ix < q; ix ++, offset ++ ) {
              ram[renderTarget + offset] = color;
            }
            offset += linestep;
          }
        } else { // Partially covered block
          for ( var iy = 0; iy < q; iy ++ ) {
            var cx1 = cy1;
            var cx2 = cy2;
            var cx3 = cy3;
            for ( var ix = 0; ix < q; ix ++ ) {
              if ( (cx1 | cx2 | cx3) >= 0 ) {
                ram[renderTarget + offset] = color;
              }
              cx1 += dy12;
              cx2 += dy23;
              cx3 += dy31;
              offset ++;
            }
            cy1 += dx12;
            cy2 += dx23;
            cy3 += dx31;
            offset += linestep;
          }
        }
      }
    }
  }

  function spr(sx = 0, sy = 0, sw = 384, sh = 256, x=0, y=0, flipx = false, flipy = false){

    for(var i = 0; i < sh; i++){

      for(var j = 0; j < sw; j++){

        if(y+i < HEIGHT && x+j < WIDTH && y+i > -1 && x+j > -1){
          if(flipx & flipy){

            if(ram[(renderSource + ( ( sy + (sh-i) )*WIDTH+sx+(sw-j)))] > 0) {

              ram[ (renderTarget + ((y+i)*WIDTH+x+j)) ] = pal[ ram[(renderSource + ((sy+(sh-i))*WIDTH+sx+(sw-j)))] ];

            }

          }
          else if(flipy && !flipx){

            if(ram[(renderSource + ( ( sy + (sh-i) )*WIDTH+sx+j))] > 0) {

              ram[ (renderTarget + ((y+i)*WIDTH+x+j)) ] = ram[(renderSource + ((sy+(sh-i))*WIDTH+sx+j))];

            }

          }
          else if(flipx && !flipy){

            if(ram[(renderSource + ((sy+i)*WIDTH+sx+(sw-j)))] > 0) {

              ram[ (renderTarget + ((y+i)*WIDTH+x+j)) ] = ram[(renderSource + ((sy+i)*WIDTH+sx+(sw-j)))];

            }

          }
          else if(!flipx && !flipy){

            if(ram[(renderSource + ((sy+i)*WIDTH+sx+j))] > 0) {

              ram[ (renderTarget + ((y+i)*WIDTH+x+j)) ] = pal[ ram[(renderSource + ((sy+i)*WIDTH+sx+j))] ];

            }

          }
        }
      }
    }
  }

  function sspr(sx = 0, sy = 0, sw = 16, sh = 16, x=0, y=0, dw=16, dh=16, flipx = false, flipy = false){

    var xratio = sw / dw;
    var yratio = sh / dh;

    for(var i = 0; i < dh; i++){
      for(var j = 0; j < dw; j++){

        px = (j*xratio)|0;
        py = (i*yratio)|0;

        if(y+i < HEIGHT && x+j < WIDTH && y+i > -1 && x+j > -1) {
          if (ram[(renderSource + ((sy + py) * WIDTH + sx + px))] > 0) {
            ram[(renderTarget + ((y + i) * WIDTH + x + j))] = ram[(renderSource + ((sy + py) * WIDTH + sx + px))]
          }
        }

      }
    }


  }

  function rspr( sx, sy, sw, sh, destCenterX, destCenterY, scale, angle ){

    angle = angle * 0.0174533 //convert to radians in place
    var sourceCenterX = sx + sw / 2;
    var sourceCenterY = sy + sh / 2;

   var destWidth = sw * scale;
    var destHeight = sh * scale;

   var halfWidth = (destWidth / 2 * 1.41421356237)|0 + 5;  //area will always be square, hypotenuse trick
    var halfHeight = (destHeight / 2 * 1.41421356237)|0 + 5;

   var startX = -halfWidth;
    var endX = halfWidth;

   var startY = -halfHeight;
    var endY = halfHeight;

   var scaleFactor = 1.0 / scale;

   var cos = Math.cos(-angle) * scaleFactor;
   var sin = Math.sin(-angle) * scaleFactor;

   for(let y = startY; y < endY; y++){
      for(let x = startX; x < endX; x++){

       let u = sourceCenterX + Math.round(cos * x + sin * y);
        let v = sourceCenterY + Math.round(-sin * x  + cos * y);

       let drawX = (x + destCenterX)|0;
        let drawY = (y + destCenterY)|0;

       if(u >= 0 && v >= 0 && u < sw && v < sh){
          if( ram[ (renderSource + (v * WIDTH + u)) ] > 0) {
            ram[(renderTarget + (drawY * WIDTH + drawX)) ] = ram[(renderSource + ( v * WIDTH + u )) ]
          }
        }

     } //end x loop

   } //end outer y loop
  }

  function checker(x, y, w, h, nRow, nCol, color) {
    //var w = 256;
    //var h = 256;

    nRow = nRow || 8;    // default number of rows
    nCol = nCol || 8;    // default number of columns

    w /= nCol;            // width of a block
    h /= nRow;            // height of a block

    for (var i = 0; i < nRow; ++i) {
      for (var j = 0, col = nCol / 2; j < col; ++j) {
        let bx = x + (2 * j * w + (i % 2 ? 0 : w) );
        let by = i * h;
        fillRect(bx, by, w-1, h-1, color);
      }
    }
  }

  function transitionOut(callback){
      //let d = delay;
      let i = 32;
      //this bit does one step of the transition, making all the colors one step darker
      while(i--){
        pal[i] = pal[ paldrk[i] ];
      }
      //-------------------------------
      console.log(pal);
      //if(transition)return;
      if(pal[21] == 0){
        return callback();
      }

    setTimeout( function(){transitionOut(callback)}, 1000000);
  }

function render() {

  var i = PAGESIZE;  // display is first page of ram

  while (i--) {
    /*
    data is 32bit view of final screen buffer
    for each pixel on screen, we look up it's color and assign it
    */
    data[i] = colors[pal[ram[i]]];

  }

  imageData.data.set(buf8);

  ctx.putImageData(imageData, 0, 0);

}

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

//--------END Engine.js-------------------

//-----main.js---------------
const LEFT = 1;
const RIGHT = 2;
const UP = 3;
const DOWN = 4;



const WALLS = 21;
const FUELCELL = 8;

states = {};

init = () => {

  drawSpriteSheet();
  sounds = {};
  soundsLoaded = 0;
  totalSounds = 1;
  score = 0;
  fuelAmount = 12000000000;
  parts = 0;
  last = 0;
  dt = 0;
  now = 0;
  t = 0;
  songTrigger = false;
  state = 'menu';
  audioCtx = new AudioContext;
  paused = false;
  transition = false;
  splodes = [];


  player.init();

  stats = new Stats();
  document.body.appendChild( stats.dom );

   loop();

}

//initialize  event listeners--------------------------
window.addEventListener('keyup', function (event) {
  Key.onKeyup(event);
}, false);
window.addEventListener('keydown', function (event) {
  Key.onKeydown(event);
}, false);
window.addEventListener('blur', function (event) {
  paused = true;
}, false);
window.addEventListener('focus', function (event) {
  paused = false;
}, false);

loop = e => {
  if(paused){

    text([
      'PAUSED',
      192,
      128,
      1,
      1,
      1,
      'center',
      1,
      i,
      0
    ])

  }else{
    stats.begin();

    //game timer
    let now = new Date().getTime();
    dt = Math.min(1, (now - last) / 1000);
    //if(dt > 14/1000)dt = 16/1000;
    t += dt;

    states[state].step(dt);
    last = now;

    //draw current state to buffer
    states[state].render();

    //draw buffer to screen
    render(e);

    stats.end();
    requestAnimationFrame(loop);
  }
}

//----- END main.js---------------

world = [
  0,0,0,0,0,0,0,0,0,0,
  0,2,0,0,0,0,1,0,0,0,
  0,0,0,1,0,0,0,0,2,0,
  0,0,0,0,0,0,1,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  6,7,8,7,6,6,8,6,6,6
];

const WORLDWIDTH = 9;
const WORLDHEIGHT = 5; // 0 index.

currentRoom = [0,1]; //start room


rooms = [
  //0
  {

    draw: function(dt){

    }
  },

  //1
  {
    draw: function(dt){
      fillCircle(192,128,50,WALLS);

    }
  },

  //2
  {
    draw: function(dt){
        circle(192,128,64,WALLS);
    }
  },

  //3
  {
    draw: function(dt){
      fillRect(0,0,127,256,WALLS);
      fillRect(250,0,127,256,WALLS);
    }
  },
  //4
  {
    draw: function(dt){
      fillRect(0,0,127,256,WALLS);
      fillRect(250,0,127,256,WALLS);
    }
  },
  //5
  {
    draw: function(dt){

    }
  },
  //6
  {
    draw: function(dt){
          fillRect(0,205,384,100,WALLS);

          let i = 400;
          while(--i){
            x = lcg.nextIntRange(0,WIDTH);
            y = lcg.nextIntRange(0,HEIGHT);
            pset(x,y, FUELCELL);
          }

    }
  },

  //7
  {
    draw: function(dt){

          fillTriangle(0,256,384,256,182,205,WALLS);
          fillRect(100,70,20,80,WALLS);
          fillRect(100,140,100,20,WALLS);
          fillRect(200,820,10,100, WALLS);
          fillRect(210,70,100,100, WALLS);



    }
  },
  //8
  {
    draw: function(dt){
      fillRect(0,205,384,10,WALLS);
      fillCircle(250,150,64,WALLS);
      pset(50, 180, FUELCELL);
    }
  },


] // end rooms;

function roomSwitch(direction){
  renderTarget = COLLISION; clear(0);
  renderTarget = SCRATCH; clear(0);
  renderTarget = SCRATCH2; clear(0);
  renderTarget = FOREGROUND; clear(0);
  renderTarget = MIDGROUND; clear(0);
  renderTarget = BUFFER; clear(0);

  switch(direction){

  case LEFT:
  currentRoom[0]--;
  if(currentRoom[0] < 0) currentRoom[0] = WORLDWIDTH;
  console.log(currentRoom);
  break;

  case RIGHT:
  currentRoom[0]++;
  if(currentRoom[0] > WORLDWIDTH) currentRoom[0] = 0;
  console.log(currentRoom);
  break;

  case UP:
  currentRoom[1]--;
  if(currentRoom[1] < 0) currentRoom[1] = WORLDHEIGHT;
  console.log(currentRoom);
  break;

  case DOWN:
  currentRoom[1]++;
  if(currentRoom[1] > WORLDHEIGHT) currentRoom[1] = 0;
  console.log(currentRoom);
  break;
}

renderTarget = COLLISION;
rooms[ world[ currentRoom[1] * (WORLDWIDTH+1) + currentRoom[0]  ] ].draw();
decorate();

}

function decorate() {

  bgstars();

  denseGreeble();

  foregroundGreeble();

  //drawFuel();

}

function bgstars(){
  renderTarget = BACKGROUND;
  clear(0);
  let i = 5000;
  while(--i){
    pset(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), 1);
  }
  i = 200;
  while(--i){
    pset(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), 26);
  }
  i = 60;
  while(--i){
    pset(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), 20);
  }
  i = 20;
  while(--i){
    pset(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), 21);
  }
  i = 3;
  while(--i){
    fillCircle(lcg.nextIntRange(0,384), lcg.nextIntRange(0,256), lcg.nextIntRange(2,5), lcg.nextIntRange(16,19) );
  }
}

function drawFuel() {
  let i = PAGESIZE;
  while(--i){
    if(ram[COLLISION + i] == FUELCELL){
      let y = i / WIDTH |0;
      let x = i % WIDTH;
      fillCircle(x, y, 3, 9);
      circle(x, y, 3, 11);
    }
  };
}

function denseGreeble(){
  renderSource = COLLISION;
  renderTarget = SCRATCH;
  clear(0);
  var i = 3000;
  lcg.setSeed(1019);
  while(--i){
    let x = lcg.nextIntRange(0,WIDTH),
        y = lcg.nextIntRange(0,HEIGHT)

    if(pget(x,y,COLLISION) == WALLS){
      cRect(
        x + lcg.nextIntRange(-5,0),
        y + lcg.nextIntRange(-10,0),
        lcg.nextIntRange(0,15),
        lcg.nextIntRange(0,10),
        1,
        lcg.nextIntRange(22, 24)
      );
    }
  } //render greeble over walls
  renderTarget = SCRATCH2;
  clear(0);
  outline(SCRATCH, SCRATCH2, 25, 20,26,2);

  renderTarget = MIDGROUND;
  renderSource = SCRATCH; spr();
  renderSource = SCRATCH2; spr();
  //-------------------------
  renderTarget = SCRATCH;
  clear(0);
  var i = 3000;
  lcg.setSeed(1019);
  while(--i){
    let x = lcg.nextIntRange(0,WIDTH),
        y = lcg.nextIntRange(0,HEIGHT)

    if(ram[COLLISION + x + y * WIDTH] == WALLS){
      cRect(
        x + lcg.nextIntRange(-5,0),
        y + lcg.nextIntRange(-10,0),
        lcg.nextIntRange(0,15),
        lcg.nextIntRange(0,10),
        1,
        lcg.nextIntRange(22, 24)
      );
    }
  }

  renderTarget = SCRATCH2;
  clear(0);
  outline(SCRATCH, SCRATCH2, 25, 20,26,2);

  renderTarget = MIDGROUND;
  renderSource = SCRATCH; spr();
  renderSource = SCRATCH2; spr();
}

function foregroundGreeble(){
  renderTarget = SCRATCH; clear(0);  //draw foreground elements
  var i = 1000;
  lcg.setSeed(1019);
  while(--i){
    let x = lcg.nextIntRange(0,WIDTH),
        y = lcg.nextIntRange(0,HEIGHT)

    if(ram[COLLISION + x + y * WIDTH] == WALLS){
      fillRect(
        x + lcg.nextIntRange(-5,0),
        y + lcg.nextIntRange(-20,0),
        lcg.nextIntRange(0,5),
        lcg.nextIntRange(0,20),
        lcg.nextIntRange(22, 24)
      );
      fillCircle(x,y-10,2, lcg.nextIntRange(22,24));
    }
  }
  renderTarget = SCRATCH2; clear(0);
  outline(SCRATCH, SCRATCH2, 25, 20, 26, 2);
  renderTarget = FOREGROUND;
  renderSource = SCRATCH; spr();
  renderSource = SCRATCH2; spr();
}

// var songGen = new sonantx.MusicGenerator(song1);
//
// songGen.createAudioBuffer(function(buffer) {
//     var source = audioCtx.createBufferSource();
//     source.buffer = buffer;
//     source.connect(audioCtx.destination);
//     source.start();
// });


// //TODO: implement one-off sound effect events (shots, coins, etc)
// //TODO: implement music-synchronized visuals
//
// time = 0;
//
// function renderAudio(e) {
//   audioData = e.outputBuffer.getChannelData(0);
//
//   inc = 1 / AC.sampleRate
//
//   samplesPerFrame = AC.sampleRate / 60;
//   //time = t;
//   for(i = 0; i < audioData.length; i++){
//     //time = t;
//     time += inc;
//     signal = 0;
//
//     beat = time * 1.3;
//     bar = beat / 4;
//     half = beat / 2;
//     pattern = bar / 2;
//     note = beat * 4;
//
//     //bassdrum
//     env = Math.pow(1 - beat % 1, 8);
//     signal += ( oscSinus(50) + oscNoise() * .1 ) * env * .3;
//
//     //hat
//     env = Math.pow(1 - beat % .5, 16);
//     signal += oscNoise() * env * .1;
//
//     //hat
//     env = Math.pow(1 - beat % .25, 16);
//     signal += oscNoise() * env * .05;
//
//     //snare
//     env = Math.pow(1 - half % 1, 10);
//     signal += oscNoise() * env * .15;
//
//     //bass
//     env = Math.pow(1- note % 1, 3);
//     f = getnotefreq( bass[note % bass.length|0]  );
//     signal += oscSquare(f) * env * .15;
//
//     //bass2
//     env = Math.pow(1 - note % .5, 3);
//     f = getnotefreq( bass[note % bass.length|0] );
//     signal += oscSquare(f) * env * .15;
//
// //    //lead
//
//       env = Math.pow(1- note % 1, .5);
//       f = getnotefreq( notes[note % notes.length|0] + 0 );
//       signal += ( oscSawtooth(f) + oscSawtooth(f*1.01) + oscSawtooth(f*1.02) ) * env * .05;
//
//
//     //lead2
//
//       env = Math.pow(1- note % 1, 1);
//       f = getnotefreq( notesb[note % notesb.length|0] );
//       signal += ( oscSawtooth(f) + oscSawtooth(f*1.005) + oscSawtooth(f*1.0006) ) * env * .05;
//
//
//
//
//   audioData[i] = signal;
//
//
//   }
//
// }
// kick = "1000100010001000";
// bass =   [-35,0,-23,0,0,-35,0,0,-23,0]
// notes =  [4,0,4,1,0,4,0,4,3,0,4,0,4,8,0,4,0,4,3,0,5,0,5,5,0,5,0,5,5,0,5,5,5,8,0,5,5,0,5,0]
// notesb = [13,1,8,6,11];
//
//
// oscSinus =
//   f => Math.sin(f * time * Math.PI * 2);
//
// oscSawtooth =
//   f => (f * time * 2 + 1) % 2 - 1;
//
// oscSquare =
//   f => 1 - (f * time * 2 & 1) * 2;
//
// oscNoise =
//   f => Math.random() * 2 - 1;
//
// function getnotefreq(n){
//     if(n == 0)return 0;
//     return 0.00390625 * Math.pow(1.059463094, n + 200); //200 magic number gets note 1 in audible range around middle C
// }

/*global player */
/*global Key */


player = {

  init (){
    this.x = 384/2;
    this.y =  30;
    this.radius = 12;
    this.xvel = 0;
    this.yvel = 0;
    this.xspeed = 200;
    this.yspeed = 200;
    this.drag = .8;
    this.gravity = 8;
    this.maxYvel = 400;
    this.maxXvel = 400;
    this.minYvel = -400;
    this.minXvel = -400;
    this.b = {};
    this.facingLeft = false;
    this.jumping = false;

  },

  update (dt) {
    this.updateB();
    this.oldX = this.x;
    this.oldY = this.y;

    this.xvel *= player.drag;
    //this.yvel *= player.drag;

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

    //console.info(this.collides());

    //player movement
    if (Key.isDown(Key.d) || Key.isDown(Key.RIGHT)) {
      player.facingLeft = false;
        player.xvel =  player.xspeed;
    }
    if (Key.isDown(Key.a) || Key.isDown(Key.LEFT)){
        this.facingLeft = true;
        player.xvel =  - player.xspeed;
    }
    if(Key.isDown(Key.w) || Key.isDown(Key.UP)){
      if(!this.jumping && fuelAmount >0){
        player.yvel = -player.yspeed;
        fuelAmount--;
      }

    }
    // if(Key.isDown(Key.s) || Key.isDown(Key.DOWN)) {
    //   player.yvel = player.yspeed;
    // }

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
    //fillRect(this.x-this.radius, this.y-this.radius, this.radius, this.radius, 8);
    renderSource = SPRITES;
    renderTarget = BUFFER;
    spr(0,0,19,34,(this.x-this.radius)|0,(this.y-this.radius-12)|0, this.facingLeft );
    //rect(this.x-this.radius,this.y-this.radius, this.radius*2, this.radius*2);
  },

  collides () {
    for(var i = -this.radius; i < this.radius; i++){
      for(var j = -this.radius; j < this.radius; j++){
        if(ram[COLLISION + (this.b.x + i) + (this.b.y + j) * WIDTH] == WALLS) return true;
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
      if(ram[COLLISION+i+WIDTH*b.bottom] == WALLS){
        for(let j = b.bottom; j >= b.top; j--) {  //starting from point we found solid, scan upward for empty pixel
          if(ram[COLLISION+i+WIDTH*j] == WALLS){
            offsetY = j - b.bottom - 1;  //
          }
        } //end interior check
      }
    } // end bottom edge checker

    //check top:
    for(let i = b.left; i <= b.right; i++){ //from left to right, across top edge
      if(ram[COLLISION+i+WIDTH*b.top] == WALLS){
        for(let j = b.top; j <= b.bottom; j++) {  //starting from point we found solid, scan downward for empty pixel
          if(ram[COLLISION+i+WIDTH*j] == WALLS){
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
      if(ram[COLLISION+b.left+WIDTH*i] == WALLS){
        for(let j = b.x; j <= b.right; j++) {  //starting from point we found solid, scan upward for empty pixel
          if(ram[COLLISION+j+WIDTH*i] == WALLS){
            offsetX++;  //
          }
        } //end interior check
      } else if(ram[COLLISION+b.right+WIDTH*i] == WALLS){
        for(let j = b.x; j >= b.left; j--) {  //starting from point we found solid, scan upward for empty pixel
          if(ram[COLLISION+j+WIDTH*i] == WALLS){
            offsetX--  //
          }
        }
      }
    } // end left edge checker

    //check right:
    for(let i = b.top+error; i <= b.bottom-error; i++){ //from top to bottom across left edge;
      if(ram[COLLISION+b.right+WIDTH*i]){
        for(let j = b.left; j <= b.right; j++) {  //starting from point we found solid, scan upward for empty pixel
          if(ram[COLLISION+j+WIDTH*i]){
            offsetX = 30;  //
          }
        } //end interior check
      }
    } // end left edge checker


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

      fuelAmount += 1;
      console.log(fuelAmount, o.x, o.y);


    }


  },
} //end player

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

//--------gameoverstate.js-----------

states.gameover = {

    step: function(dt) {

        if(Key.isDown(Key.r)){
          state = 'menu';
        }

    },

    render: function(dt) {

      renderTarget = 0x0;
      clear(0);

      text([
        'CRITICAL SYSTEM FAILURE',
        384/2,
        80 + Math.sin(t*2.5)*15,
        8 + Math.cos(t*2.9)*4,
        15 + Math.sin(t*3.5)*5,
        'center',
        'top',
        4,
        27,
      ]);

    },

};

//---------END gameoverstate.js----------

//--------------menustate.js---------------

states.menu = {

  step: function(dt) {

      //game update
      if(Key.isDown(Key.p)){
        roomSwitch();
        state = 'game';
        //transition = true;
      }
      if(Key.isDown(Key.z)){
        state = 'spritesheet';
      }
      // if(transition){
      //   transitionOut();
      //   transition = false;
      // }

  },

  render: function(dt) {
    renderTarget = COLLISION; clear(0);
    renderTarget = 0x0; clear(0);
    renderTarget = BUFFER; clear(0);
    renderTarget = SCRATCH; clear(0);
    renderTarget = SCREEN; clear(0);

    renderTarget = COLLISION;
    text([
            'GREEBLE',
            WIDTH/2,
            150,
            20,
            20,
            'center',
            'top',
            6,
            25,
        ]);

    renderTarget = BUFFER;
    renderSource = COLLISION; spr();

    renderTarget = SCRATCH2;

    lcg.setSeed(21);
    var j = 6000;
    while(--j){
      let x = lcg.nextIntRange(0,WIDTH),
          y = lcg.nextIntRange(0,HEIGHT)

      if(ram[COLLISION + x + y * WIDTH]){
        fillRect(
          x + lcg.nextIntRange(-2,2),
          y + lcg.nextIntRange(-1,1),
          1,
          lcg.nextIntRange(0,3),
          lcg.nextIntRange(24, 25)
        );
      }
    }
    outline(SCRATCH2, SCRATCH, 25, 20, 23, 18);
    renderTarget = BUFFER;
    renderSource = SCRATCH2; spr();
    renderSource = SCRATCH; spr();

    renderTarget = SCRATCH2;

    lcg.setSeed(20);
    var j = 6000;
    while(--j){
      let x = lcg.nextIntRange(0,WIDTH),
          y = lcg.nextIntRange(0,HEIGHT)

      if(ram[COLLISION + x + y * WIDTH]){
        fillRect(
          x + lcg.nextIntRange(-1,1),
          y + lcg.nextIntRange(0,1),
          lcg.nextIntRange(1,5),
          1,
          lcg.nextIntRange(22, 24)
        );
      }
    }
    outline(SCRATCH2, SCRATCH, 25, 20, 23, 18);
    renderTarget = BUFFER;
    renderSource = SCRATCH2; spr();
    renderSource = SCRATCH; spr();

    player.draw();
    renderSource = SPRITES;
    let bots = 8;
    while(--bots){
      spr(0,0,25,36, 192+25*bots, 40);
    }

    rspr(1,1,25,36, 64,64, 1, 45);


    text([
            "PRESS P TO CONTINUE",
            WIDTH/2,
            230,
            2,
            2,
            'center',
            'top',
            1,
            21,
        ]);

        renderTarget = SCREEN;
        var i = 8000;
        while(--i){
          pset((lcg.nextIntRange(0,384)+t*10|0)%384, lcg.nextIntRange(0,256), 1);
        }
        var i = 400;
        while(--i){
          pset( (lcg.nextIntRange(0,384)+t*20|0)%384, lcg.nextIntRange(0,256), 26);
        }
        var i = 100;
        while(--i){
          pset((lcg.nextIntRange(0,384)+t*30|0)%384, lcg.nextIntRange(0,256), 21);
        }

        outline(BUFFER, SCREEN, 15);
        renderSource = BUFFER; spr();

        //   if(pal[31] == 0){
        //   roomSwitch();
        //   state = 'game'
        //   transition = false;
        // }

        //outline(BUFFER, SCRATCH, 8);1
  },

};

//-------END menustate.js-------------

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

states.spritesheet = {

    step: function(dt) {

        if(Key.justReleased(Key.x)){
          roomSwitch();
          state = 'menu'
        }
    },

    render: function(dt) {

        renderTarget = SCREEN;
        clear(0);
        checker(0,0,384,256,256/32|0,384/32|0,1);
        renderSource = SPRITES; spr();
        spr(0,0,22,34, 200,200);
        rspr(0,0,32,32, 192,128, 2, 15+t*90);

        for(var i = 0; i < 32; i++){
          text([
            i.toString(),
            i < 16 ? ( 3+16*i ) : ( 3 + 16* (i-16) ) ,
            i < 16 ? 40 : 40 + 16,
            1,
            1,
            1,
            'left',
            1,
            i,
            0
          ])
          }



        } //end render
}//end state

    Key = {

        _pressed: {},
        _released: {},

        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SPACE: 32,
        a: 65,
        w: 87,
        s: 83,
        d: 68,
        z: 90,
        x: 88,
        f: 70,
        p: 80,
        r: 82,

        isDown(keyCode) {
            return this._pressed[keyCode];
        },

        justReleased(keyCode) {
            return this._released[keyCode];
        },

        onKeydown(event) {
            this._pressed[event.keyCode] = true;
        },

        onKeyup(event) {
            this._released[event.keyCode] = true;
            delete this._pressed[event.keyCode];

        },

        update() {
            this._released = {};
        }
    };

//-----------txt.js----------------

//o is an array of options with the following structure:
/*
0: text
1: x
2: y
3: hspacing
4: vspacing
5: halign
6: valign
7: scale
8: color
9: per character offset
*/
function textLine(o) {

	var textLength = o[0].length,
		size = 5;

	for (var i = 0; i < textLength; i++) {

		var letter = [];
		letter = getCharacter( o[0].charAt(i) );

		for (var y = 0; y < size; y++) {
			for (var x = 0; x < size; x++) {
				//if (letter[y][x] == 1) {
				if (letter[y*size+x] == 1){
					if(o[4] == 1){
						pset(
							o[1] + ( x * o[4] ) + ( ( size * o[4] ) + o[3] ) * i,
							o[2] + (y * o[4]),
							o[5]
						);
					}

					else {
						fillRect(
						o[1] + ( x * o[4] ) + ( ( size * o[4] ) + o[3] ) * i,
						o[2] + (y * o[4]),
						o[4],
						o[4],
						o[5]);
					}

				} //end draw routine
			}  //end x loop
		}  //end y loop
	}  //end text loop
}  //end textLine()

function text(o) {
	var size = 5,
	letterSize = size * o[7],
	lines = o[0].split('\n'),
	linesCopy = lines.slice(0),
	lineCount = lines.length,
	longestLine = linesCopy.sort(function (a, b) {
		return b.length - a.length;
	})[0],
	textWidth = ( longestLine.length * letterSize ) + ( ( longestLine.length - 1 ) * o[3] ),
	textHeight = ( lineCount * letterSize ) + ( ( lineCount - 1 ) * o[4] );

	if(!o[5])o[5] = 'left';
	if(!o[6])o[6] = 'bottom';

	var sx = o[1],
		sy = o[2],
		ex = o[1] + textWidth,
		ey = o[2] + textHeight;

	if (o[5] == 'center') {
		sx = o[1] - textWidth / 2;
		ex = o[1] + textWidth / 2;
	} else if (o[5] == 'right') {
		sx = o[1] - textWidth;
		ex = o[1];
	}

	if (o[6] == 'center') {
		sy = o[2] - textHeight / 2;
		ey = o[2] + textHeight / 2;
	} else if (o[6] == 'bottom') {
		sy = o[2] - textHeight;
		ey = o[2];
	}

	var cx = sx + textWidth / 2,
		cy = sy + textHeight / 2;

		for (var i = 0; i < lineCount; i++) {
			var line = lines[i],
				lineWidth = ( line.length * letterSize ) + ( ( line.length - 1 ) * o[3] ),
				x = o[1],
				y = o[2] + ( letterSize + o[4] ) * i;

			if (o[5] == 'center') {
				x = o[1] - lineWidth / 2;
			} else if (o[5] == 'right') {
				x = o[1] - lineWidth;
			}

			if (o[6] == 'center') {
				y = y - textHeight / 2;
			} else if (o[6] == 'bottom') {
				y = y - textHeight;
			}

			textLine([
				line,
				x,
				y,
				o[3] || 0,
				o[7] || 1,
				o[8],
				o[9]
			]);
		}

	return {
		sx: sx,
		sy: sy,
		cx: cx,
		cy: cy,
		ex: ex,
		ey: ey,
		width: textWidth,
		height: textHeight
	}
}

function getCharacter(char){
	index = fontString.indexOf(char);
	return fontBitmap.substring(index * 25, index*25+25).split('') ;
}

//-----------END txt.js----------------

window.onload = init();
}
()
)
