'use strict';
// ===== Tiny Trails v2 =====
const $=id=>document.getElementById(id);
const cv=$('c'),x=cv.getContext('2d');let W,H,DPR;
function resize(){DPR=Math.min(2,devicePixelRatio||1);W=innerWidth;H=innerHeight;cv.width=W*DPR;cv.height=H*DPR;cv.style.width=W+'px';cv.style.height=H+'px'}
resize();addEventListener('resize',resize);
const TAU=Math.PI*2,lerp=(a,b,t)=>a+(b-a)*t,clamp=(v,a,b)=>v<a?a:v>b?b:v,sm=(a,b,v)=>{v=clamp((v-a)/(b-a),0,1);return v*v*(3-2*v)},dist=(a,b,c,d)=>Math.hypot(a-c,b-d);
function mulberry(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
let rnd=Math.random;const fx=Math.random; // fx = cosmetic randomness (never seeded)
const MW=3200,MH=3200,SESSION=150;
// ===== Save =====
const SV=(()=>{let d={dew:0,hats:['safari'],hat:'safari',seen:[],best:{},runs:0};try{Object.assign(d,JSON.parse(localStorage.tt2||'{}'))}catch(e){}return{d,save(){try{localStorage.tt2=JSON.stringify(d)}catch(e){}}}})();
// ===== Audio (all synthesized) =====
const S=(()=>{let A,M,BG,RAIN,muted=false,ft=0,nt=0;const o={};
function nbuf(sec,brown=true){let b=A.createBuffer(1,A.sampleRate*sec,A.sampleRate),d=b.getChannelData(0),l=0;for(let i=0;i<d.length;i++){let w=Math.random()*2-1;if(brown){l=(l+.02*w)/1.02;d[i]=l*3.5}else d[i]=w}return b}
function env(g,t,a,p,r){g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(p,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+r)}
function tone(f,t,v,r,type='sine'){let os=A.createOscillator(),g=A.createGain();os.type=type;os.frequency.value=f;env(g,t,.005,v,r);os.connect(g).connect(M);os.start(t);os.stop(t+r+.1)}
function burst(t,v,r,ftype,freq,q=1){let s=A.createBufferSource();s.buffer=nbuf(r+.05,false);let f=A.createBiquadFilter();f.type=ftype;f.frequency.value=freq;f.Q.value=q;let g=A.createGain();env(g,t,.003,v,r);s.connect(f).connect(g).connect(M);s.start(t)}
o.init=()=>{if(A){A.resume();return}try{A=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return}
 M=A.createGain();M.gain.value=muted?0:.55;let lp=A.createBiquadFilter();lp.type='lowpass';lp.frequency.value=5000;let comp=A.createDynamicsCompressor();M.connect(lp).connect(comp).connect(A.destination);
 let n=A.createBufferSource();n.buffer=nbuf(5);n.loop=true;let f=A.createBiquadFilter();f.type='bandpass';f.frequency.value=480;f.Q.value=.5;BG=A.createGain();BG.gain.value=.07;n.connect(f).connect(BG).connect(M);n.start();
 let l1=A.createOscillator(),g1=A.createGain();l1.frequency.value=.06;g1.gain.value=.035;l1.connect(g1).connect(BG.gain);l1.start();
 let l2=A.createOscillator(),g2=A.createGain();l2.frequency.value=.09;g2.gain.value=260;l2.connect(g2).connect(f.frequency);l2.start();
 let r=A.createBufferSource();r.buffer=nbuf(3,false);r.loop=true;let rf=A.createBiquadFilter();rf.type='lowpass';rf.frequency.value=1800;RAIN=A.createGain();RAIN.gain.value=0;r.connect(rf).connect(RAIN).connect(M);r.start();
 setInterval(()=>{if(A.state!='running')return;let t=A.currentTime;
  if(Math.random()<.25+.65*nt)for(let i=0;i<(3+Math.random()*(4+7*nt)|0);i++)tone(4300+Math.random()*250,t+i*.065,.008+.012*nt,.035,'triangle');
  if(Math.random()<.14*(1-nt)){let b=t+.1,base=1900+Math.random()*1300;for(let i=0;i<(2+Math.random()*3|0);i++){let os=A.createOscillator(),gg=A.createGain();os.frequency.setValueAtTime(base,b+i*.17);os.frequency.exponentialRampToValueAtTime(base*1.45,b+i*.17+.09);env(gg,b+i*.17,.02,.018,.11);os.connect(gg).connect(M);os.start(b+i*.17);os.stop(b+i*.17+.3)}}
  if(nt>.6&&Math.random()<.06)[0,.45,.7].forEach(d=>{let os=A.createOscillator(),gg=A.createGain();os.frequency.setValueAtTime(410,t+d);os.frequency.linearRampToValueAtTime(350,t+d+.35);env(gg,t+d,.07,.045,.35);os.connect(gg).connect(M);os.start(t+d);os.stop(t+d+.5)});
  if(Math.random()<.08){for(let i=0;i<6;i++)burst(t+i*.05+Math.random()*.04,.015,.05,'highpass',3000)}
 },850)};
o.night=v=>{nt=v;if(BG)BG.gain.value=.07-.035*v};
o.rain=v=>{if(RAIN)RAIN.gain.setTargetAtTime(v*.06,A.currentTime,.8)};
o.step=(dt,soft)=>{if(!A)return;ft-=dt;if(ft>0)return;ft=soft?.3:.17+Math.random()*.05;burst(A.currentTime,soft?.05:.1,.045,'highpass',1400+Math.random()*1600)};
o.chime=(r=0)=>{if(!A)return;let t=A.currentTime,sc=[[523.25,659.25,783.99,1046.5],[587.33,739.99,880,1174.66,1479.98],[523.25,659.25,783.99,987.77,1318.5,1567.98]][r];sc.forEach((f,i)=>{tone(f,t+i*.12,.08,1.4);tone(f*2.005,t+i*.12,.018,.6);tone(f*3.01,t+i*.12,.006,.3)})};
o.pop=()=>{if(!A)return;let t=A.currentTime,os=A.createOscillator(),g=A.createGain();os.frequency.setValueAtTime(620,t);os.frequency.exponentialRampToValueAtTime(220,t+.08);env(g,t,.004,.14,.08);os.connect(g).connect(M);os.start(t);os.stop(t+.2)};
o.dew=()=>{if(!A)return;let t=A.currentTime;tone(1568+Math.random()*200,t,.05,.25);tone(2350,t+.05,.025,.2)};
o.shutter=()=>{if(!A)return;let t=A.currentTime;burst(t,.18,.03,'bandpass',2500,2);burst(t+.07,.12,.04,'bandpass',1800,2)};
o.flee=()=>{if(!A)return;let t=A.currentTime;burst(t,.07,.2,'bandpass',900,1.5)};
o.focus=()=>{if(!A)return;tone(1200,A.currentTime,.012,.05,'square')};
o.warn=()=>{if(!A)return;let t=A.currentTime;for(let i=0;i<5;i++)burst(t+i*.12,.06,.09,'lowpass',500)};
o.splash=()=>{if(!A)return;let t=A.currentTime;burst(t,.08,.15,'bandpass',1200,.8);tone(700,t,.03,.08)};
o.hit=()=>{if(!A)return;let t=A.currentTime,os=A.createOscillator(),g=A.createGain(),f=A.createBiquadFilter();f.type='lowpass';f.frequency.value=380;os.type='triangle';os.frequency.setValueAtTime(190,t);os.frequency.exponentialRampToValueAtTime(65,t+.4);env(g,t,.01,.3,.45);os.connect(f).connect(g).connect(M);os.start(t);os.stop(t+.6);burst(t,.08,.2,'lowpass',300)};
o.toggle=()=>{muted=!muted;if(M)M.gain.setTargetAtTime(muted?0:.55,A.currentTime,.05);return muted};return o})();
// ===== Species =====
const RAR={common:{c:'#3d7a1e',fl:115,al:1,fo:.65,dew:2,e:'🟩',lbl:'Common'},rare:{c:'#3a6fb0',fl:145,al:1.5,fo:.95,dew:5,e:'🟦',lbl:'Rare'},legendary:{c:'#c08a10',fl:175,al:2.1,fo:1.3,dew:12,e:'🟨',lbl:'Legendary'}};
const SPEC=[
{id:'ladybug',n:'Seven-spot Ladybug',r:'common',b:['meadow','flowers'],mv:'walk',sz:1,f:'A single ladybug can eat about 5,000 aphids in its lifetime.'},
{id:'ant',n:'Wood Ant',r:'common',b:['woods','meadow'],mv:'march',sz:.8,f:'Ants can carry 50 times their own body weight, and they leave scent trails for friends to follow.'},
{id:'woodlouse',n:'Woodlouse',r:'common',b:['log'],mv:'walk',sz:1,sp:.5,f:'Not an insect at all! Woodlice are crustaceans, cousins of crabs and shrimp.'},
{id:'grasshopper',n:'Meadow Grasshopper',r:'common',b:['meadow'],mv:'hop',sz:1.1,day:1,f:'Grasshoppers "sing" by rubbing their back legs against their wings.'},
{id:'honeybee',n:'Honeybee',r:'common',b:['flowers'],mv:'buzz',sz:.9,day:1,f:'To make one jar of honey, bees together fly about three times around the Earth.'},
{id:'snail',n:'Garden Snail',r:'common',b:['pond','log'],mv:'walk',sz:1.1,sp:.25,f:'Snails have thousands of tiny teeth on a tongue called a radula.'},
{id:'caterpillar',n:'Green Caterpillar',r:'common',b:['flowers','meadow'],mv:'crawl',sz:1,sp:.35,f:'A caterpillar can grow 1,000 times bigger before it turns into a butterfly or moth.'},
{id:'butterfly',n:'Peacock Butterfly',r:'rare',b:['flowers','meadow'],mv:'flutter',sz:1.3,day:1,f:'Butterflies taste with their feet! The "eyes" on their wings scare off birds.'},
{id:'dragonfly',n:'Emperor Dragonfly',r:'rare',b:['pond'],mv:'dart',sz:1.3,day:1,f:'Dragonflies have flown on Earth for 300 million years, long before the dinosaurs.'},
{id:'stag',n:'Stag Beetle',r:'rare',b:['log'],mv:'walk',sz:1.4,sp:.6,f:'The male\'s giant "antlers" are actually jaws, used for wrestling rivals.'},
{id:'strider',n:'Pond Skater',r:'rare',b:['pond'],mv:'skate',sz:1.1,f:'Pond skaters walk on water using water-repellent hairs on their feet.'},
{id:'bumblebee',n:'Bumblebee',r:'rare',b:['flowers'],mv:'buzz',sz:1.15,day:1,f:'Bumblebees shiver their flight muscles to warm up on chilly mornings.'},
{id:'mantis',n:'Praying Mantis',r:'rare',b:['meadow','flowers'],mv:'sway',sz:1.4,f:'A mantis can turn its head 180°, the only insect that can look over its shoulder.'},
{id:'cricket',n:'Field Cricket',r:'rare',b:['meadow','woods'],mv:'hop',sz:1,night:1,f:'Crickets chirp faster when it is warm. You can estimate the temperature by counting!'},
{id:'firefly',n:'Glow-worm Firefly',r:'legendary',b:['woods','meadow'],mv:'hover',sz:1,night:1,f:'Fireflies make "cold light". Nearly 100% of the energy becomes light, not heat.'},
{id:'luna',n:'Luna Moth',r:'legendary',b:['woods'],mv:'flutter',sz:1.6,night:1,f:'Adult luna moths have no mouth. They live only about a week, just to find a mate.'},
{id:'jewel',n:'Golden Jewel Beetle',r:'legendary',b:['log','flowers'],mv:'walk',sz:1.1,sp:1.4,day:1,f:'Jewel beetles shimmer because of tiny layered structures, not pigment, just like soap bubbles.'}];
const SPI={};SPEC.forEach((s,i)=>{s.i=i;SPI[s.id]=s});
// ===== Painted drawing helpers =====
const OUT='rgba(55,32,12,.55)';
function egg(c,x0,y0,rx,ry,c1,c2,hl=.35,rot=0,ol=true){c.save();c.translate(x0,y0);c.rotate(rot);let g=c.createRadialGradient(-rx*.35,-ry*.45,1,0,0,Math.max(rx,ry)*1.1);g.addColorStop(0,c1);g.addColorStop(1,c2);c.fillStyle=g;c.beginPath();c.ellipse(0,0,rx,ry,0,0,TAU);c.fill();if(ol){c.strokeStyle=OUT;c.lineWidth=1.2;c.stroke()}if(hl){c.fillStyle=`rgba(255,255,240,${hl})`;c.beginPath();c.ellipse(-rx*.3,-ry*.45,rx*.35,ry*.18,-.3,0,TAU);c.fill()}c.restore()}
function legs(c,n,len,ph,sp=1,col='#3a2412',w=1.4){c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';for(let i=0;i<n;i++)for(const s of[-1,1]){let o=(i-(n-1)/2)*len*.45*sp,sw=Math.sin(ph+i*2.1+(s>0?Math.PI:0))*len*.3;c.beginPath();c.moveTo(o,0);c.quadraticCurveTo(o+sw*.5,s*len*.7,o+sw+(i-(n-1)/2)*len*.25,s*len*1.05);c.stroke()}}
function ant_(c,ph,dir=1){c.strokeStyle='#2a1408';c.lineWidth=1;c.beginPath();c.moveTo(9,-1);c.quadraticCurveTo(14,-6,16,-5);c.moveTo(9,1);c.quadraticCurveTo(14,6,16,5);c.stroke()}
function wing(c,x0,y0,rx,ry,rot,col,vein){c.save();c.translate(x0,y0);c.rotate(rot);let g=c.createLinearGradient(0,0,0,ry*2);g.addColorStop(0,col);g.addColorStop(1,'rgba(255,255,255,.15)');c.fillStyle=g;c.beginPath();c.ellipse(0,ry,rx,ry,0,0,TAU);c.fill();c.strokeStyle=vein||'rgba(80,60,40,.35)';c.lineWidth=.8;c.stroke();c.beginPath();c.moveTo(0,0);c.lineTo(0,ry*1.8);c.stroke();c.restore()}
// draw species facing +x at origin. t=anim time, m=moving(0..1)
function drawSpec(c,id,t,m=1,night=0){
 const ph=t*12*m+.0001;
 switch(id){
 case'ladybug':legs(c,3,9,ph);egg(c,9,0,5,5.5,'#4a4a4a','#111',.3);egg(c,0,0,11,10,'#ff8a5a','#c52a12');c.fillStyle='#1a1008';c.fillRect(-11,-.6,20,1.2);[[-5,-5],[-5,5],[2,-5.5],[2,5.5],[-1,0],[-8,-2.5],[-8,2.5]].forEach(p=>{c.beginPath();c.arc(p[0],p[1],1.9,0,TAU);c.fill()});c.fillStyle='#fff';c.beginPath();c.arc(11.5,-2.5,1.4,0,TAU);c.arc(11.5,2.5,1.4,0,TAU);c.fill();break;
 case'ant':legs(c,3,8,ph*1.5,.9);ant_(c);egg(c,-8,0,6.5,5,'#7a3a1a','#3a1608',.3);egg(c,0,0,3.5,2.6,'#7a3a1a','#3a1608',.2);egg(c,6,0,4,3.6,'#8a4420','#3a1608',.3);break;
 case'woodlouse':legs(c,7,6,ph,.5,'#4a4040');egg(c,0,0,11,7.5,'#a59a92','#4e4640');c.strokeStyle='rgba(40,30,30,.5)';c.lineWidth=1;for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(i*2.8,-7);c.quadraticCurveTo(i*2.8+1.2,0,i*2.8,7);c.stroke()}c.strokeStyle='#4e4640';c.beginPath();c.moveTo(10,-2);c.lineTo(16,-6);c.moveTo(10,2);c.lineTo(16,6);c.stroke();break;
 case'grasshopper':{c.strokeStyle='#4f7a14';c.lineWidth=2.5;c.lineCap='round';for(const s of[-1,1]){c.beginPath();c.moveTo(-1,s*3);c.lineTo(-7,s*11);c.lineTo(-17,s*5);c.stroke()}legs(c,2,6,ph,.8,'#4f7a14');egg(c,-1,0,13,4.5,'#b6e05a','#5e9a1c');egg(c,10,0,4,4,'#c8ea6a','#6aa024',.4);c.fillStyle='#2a1a08';c.beginPath();c.arc(11.5,-2.6,1.4,0,TAU);c.arc(11.5,2.6,1.4,0,TAU);c.fill();c.strokeStyle='#6aa024';c.lineWidth=.8;c.beginPath();c.moveTo(13,-1);c.quadraticCurveTo(22,-8,26,-12);c.moveTo(13,1);c.quadraticCurveTo(22,8,26,12);c.stroke();break}
 case'honeybee':case'bumblebee':{let bb=id=='bumblebee',f=Math.sin(t*55)*.35;c.globalAlpha=.75;wing(c,1,-2,4,6,-.4+f-Math.PI*.95,'rgba(230,245,255,.8)');wing(c,1,2,4,6,.4-f-Math.PI*.05,'rgba(230,245,255,.8)');c.globalAlpha=1;
  egg(c,-3,0,bb?11:9,bb?8:6,bb?'#ffd84a':'#f7c43a',bb?'#b07a10':'#a8700e');c.fillStyle='#2a1808';for(const o of bb?[-8,-1]:[-6,-1.5,3]){c.beginPath();c.ellipse(o,0,1.8,bb?7.6:5.6,0,0,TAU);c.fill()}if(bb){c.fillStyle='#fff6e0';c.beginPath();c.ellipse(-12,0,2.5,4.5,0,0,TAU);c.fill()}egg(c,8,0,4.5,4.5,'#4a3820','#1a1008',.3);break}
 case'snail':{let st=Math.sin(t*3*m)*1.5;c.fillStyle='rgba(220,230,240,.25)';c.beginPath();c.ellipse(-14,0,10,4,0,0,TAU);c.fill();egg(c,4+st*.3,0,15+st,5,'#d8c8a4','#8e7a58',.3);c.strokeStyle='#8e7a58';c.lineWidth=1.3;c.beginPath();c.moveTo(17,-2);c.lineTo(23,-6);c.moveTo(17,2);c.lineTo(23,6);c.stroke();c.fillStyle='#3a2a18';c.beginPath();c.arc(23,-6,1.4,0,TAU);c.arc(23,6,1.4,0,TAU);c.fill();
  egg(c,-2,0,10,10,'#e8b070','#8a4e1c',.35);c.strokeStyle='rgba(90,45,15,.75)';c.lineWidth=1.6;c.beginPath();for(let a=0;a<12;a+=.2){let r=9-a*.7;if(r<0)break;c.lineTo(-2+Math.cos(a)*r,Math.sin(a)*r)}c.stroke();break}
 case'caterpillar':{for(let i=5;i>=0;i--){let w=Math.sin(t*5*m-i*.9)*2.2;egg(c,-i*5.2+6,w,4.6,4.6,i%2?'#c4e05a':'#f0c040','#5a8a1e',.3);c.strokeStyle='rgba(255,250,220,.55)';c.lineWidth=.7;for(let k=-1;k<=1;k++){c.beginPath();c.moveTo(-i*5.2+6+k*2,w-4);c.lineTo(-i*5.2+6+k*2.6,w-7.5);c.moveTo(-i*5.2+6+k*2,w+4);c.lineTo(-i*5.2+6+k*2.6,w+7.5);c.stroke()}}egg(c,10,Math.sin(t*5*m+.9)*2.2,4,4,'#6a4a2a','#2a1a08',.3);break}
 case'butterfly':case'luna':{let l=id=='luna',fl=Math.abs(Math.sin(t*(l?5:7)))*.75+.25;
  for(const s of[-1,1]){c.save();c.scale(1,s*fl);let g=c.createRadialGradient(4,10,2,4,10,16);if(l){g.addColorStop(0,'#e9ffd0');g.addColorStop(.7,'#9ee0a0');g.addColorStop(1,'#6ab890')}else{g.addColorStop(0,'#f0764a');g.addColorStop(.75,'#b02a1a');g.addColorStop(1,'#4a1810')}
   c.fillStyle=g;c.beginPath();c.moveTo(0,0);c.bezierCurveTo(4,4,16,8,15,18);c.bezierCurveTo(8,22,0,14,-1,2);c.fill();c.strokeStyle=OUT;c.lineWidth=1;c.stroke();
   c.beginPath();c.moveTo(-1,1);c.bezierCurveTo(-6,8,-10,16,l?-20:-11,l?26:17);c.bezierCurveTo(l?-12:-4,l?20:16,-2,10,-1,1);c.fill();c.stroke();
   if(l){c.fillStyle='#f8e070';c.beginPath();c.arc(7,12,2.4,0,TAU);c.fill();c.strokeStyle='#b06a3a';c.stroke()}else{c.fillStyle='#ffe9a8';c.beginPath();c.arc(9,13,4,0,TAU);c.fill();c.fillStyle='#3a5aa8';c.beginPath();c.arc(9,13,2.6,0,TAU);c.fill();c.fillStyle='#111';c.beginPath();c.arc(9,13,1.3,0,TAU);c.fill()}c.restore()}
  egg(c,0,0,9,2.2,l?'#f0f8e0':'#5a4030','#2a1a10',.2);c.strokeStyle=l?'#c8a860':'#2a1a10';c.lineWidth=.9;c.beginPath();c.moveTo(8,-1);c.quadraticCurveTo(13,-3,15,-6);c.moveTo(8,1);c.quadraticCurveTo(13,3,15,6);c.stroke();break}
 case'dragonfly':{let f=Math.sin(t*38)*.25;c.fillStyle='rgba(210,240,255,.55)';c.strokeStyle='rgba(60,90,110,.45)';c.lineWidth=.7;for(const s of[-1,1])for(const o of[5,-1]){c.save();c.translate(o,0);c.rotate(s*(Math.PI/2+.15+f*s));c.beginPath();c.ellipse(0,0,2.8,13,0,0,TAU);c.fill();c.stroke();c.restore()}
  let g=c.createLinearGradient(-26,0,4,0);g.addColorStop(0,'#1a5a8a');g.addColorStop(1,'#3ab0c8');c.fillStyle=g;c.beginPath();c.roundRect(-27,-1.6,30,3.2,1.6);c.fill();for(let i=0;i<6;i++){c.fillStyle='#0e3a58';c.fillRect(-25+i*4,-1.6,.8,3.2)}egg(c,4,0,5.5,3.5,'#5ac870','#1a7a4a',.3);egg(c,10,0,3.6,4.2,'#3a9ad0','#0e4a70',.5);break}
 case'stag':case'jewel':{let j=id=='jewel';legs(c,3,11,ph,1,j?'#4a3a10':'#2a1408',1.8);if(!j){c.fillStyle='#7a3010';c.strokeStyle=OUT;c.lineWidth=1;for(const s of[-1,1]){c.beginPath();c.moveTo(12,s*2.5);c.bezierCurveTo(20,s*9,26,s*7,25,s*1.5);c.lineTo(22,s*3.5);c.bezierCurveTo(21,s*6,17,s*5.5,12,s*1);c.fill();c.stroke()}}
  if(j){let hue=(t*40)%360;egg(c,-2,0,12,7.5,`hsl(${50+Math.sin(t*2)*15},95%,65%)`,`hsl(${150+Math.sin(t*2)*30},70%,30%)`,.55);c.strokeStyle='rgba(255,255,200,.5)';c.lineWidth=.8;c.beginPath();c.moveTo(-13,0);c.lineTo(9,0);c.stroke();egg(c,10,0,4,4.5,'#d8c040','#4a6a10',.5)}
  else{egg(c,-3,0,12,8,'#8a5030','#2a1208',.4);c.strokeStyle='rgba(20,8,0,.6)';c.beginPath();c.moveTo(-15,0);c.lineTo(8,0);c.stroke();egg(c,9,0,5,6,'#5a3018','#1a0a04',.35)}break}
 case'strider':{c.strokeStyle='#2a2418';c.lineWidth=1.1;for(const s of[-1,1]){c.beginPath();c.moveTo(2,s*1);c.lineTo(8,s*6);c.moveTo(-1,s*1);c.lineTo(4,s*14);c.lineTo(14,s*20);c.moveTo(-3,s*1);c.lineTo(-10,s*13);c.lineTo(-22,s*16);c.stroke();c.fillStyle='rgba(255,255,255,.18)';c.beginPath();c.arc(14,s*20,3,0,TAU);c.arc(-22,s*16,3,0,TAU);c.fill()}egg(c,0,0,9,2.4,'#6a5a40','#2a2014',.35);break}
 case'mantis':{let sw=Math.sin(t*1.8)*.12;c.rotate(sw);legs(c,2,11,ph*.6,1.2,'#5a9a2a',1.4);egg(c,-6,0,12,4,'#a8e070','#4a8a20',.35);egg(c,8,0,7,1.8,'#a8e070','#4a8a20',.3);c.strokeStyle='#5a9a2a';c.lineWidth=2.2;c.lineCap='round';for(const s of[-1,1]){c.beginPath();c.moveTo(11,s*1);c.lineTo(15,s*6);c.lineTo(20,s*3);c.stroke()}
  c.fillStyle='#8acb4a';c.beginPath();c.moveTo(14,0);c.lineTo(18,-4);c.lineTo(20,0);c.lineTo(18,4);c.fill();c.fillStyle='#e8f040';c.beginPath();c.arc(18.5,-3.4,1.3,0,TAU);c.arc(18.5,3.4,1.3,0,TAU);c.fill();break}
 case'cricket':{c.strokeStyle='#2a1a10';c.lineWidth=2.5;c.lineCap='round';for(const s of[-1,1]){c.beginPath();c.moveTo(-1,s*3);c.lineTo(-7,s*10);c.lineTo(-16,s*4);c.stroke()}legs(c,2,6,ph,.8,'#2a1a10');egg(c,-1,0,11,5.5,'#5a3a24','#1a0e06',.4);c.strokeStyle='rgba(180,140,90,.35)';c.lineWidth=.6;for(let i=0;i<4;i++){c.beginPath();c.moveTo(-10,-3+i*2);c.lineTo(6,-3+i*2);c.stroke()}egg(c,9,0,4.5,4.5,'#3a2618','#120804',.4);c.strokeStyle='#3a2618';c.lineWidth=.6;c.beginPath();c.moveTo(12,-1);c.quadraticCurveTo(22,-10,30,-8);c.moveTo(12,1);c.quadraticCurveTo(22,10,30,8);c.stroke();break}
 case'firefly':{let g=.55+.45*Math.sin(t*3.5);c.fillStyle='rgba(220,210,180,.35)';for(const s of[-1,1]){c.beginPath();c.ellipse(1,s*5,7,3.5,s*.3,0,TAU);c.fill()}egg(c,0,0,8,3.6,'#5a4a3a','#1a120a',.3);egg(c,7,0,3,3,'#e86a3a','#8a2a10',.3);
  let gr=c.createRadialGradient(-6,0,0,-6,0,7);gr.addColorStop(0,`rgba(255,255,190,${.6+.4*g})`);gr.addColorStop(1,`rgba(200,255,90,${.4*g})`);c.fillStyle=gr;c.beginPath();c.ellipse(-6,0,4.5,3.6,0,0,TAU);c.fill();break}
 }}
// ===== Lottie =====
const HATS=[{id:'safari',n:'Safari hat',p:0},{id:'flower',n:'Flower crown',p:20},{id:'acorn',n:'Acorn cap',p:35},{id:'leaf',n:'Leaf umbrella',p:50},{id:'mush',n:'Toadstool',p:70},{id:'wizard',n:'Star wizard',p:100},{id:'crown',n:'Golden crown',p:150}];
function drawHat(c,id,t){c.save();c.translate(10,0);
 switch(id){
 case'safari':egg(c,0,0,9.5,9,'#e8d090','#a88848',.25);egg(c,0,0,5.8,5.4,'#e0c47a','#9a7a3a',.4);c.strokeStyle='#6a4a20';c.lineWidth=1.6;c.beginPath();c.arc(0,0,5.6,0,TAU);c.stroke();c.save();c.rotate(-.6);egg(c,3,-6,4,1.8,'#9ad04a','#4a8a1a',.3);c.restore();break;
 case'flower':for(let i=0;i<7;i++){let a=i/7*TAU+t*.3;egg(c,Math.cos(a)*6,Math.sin(a)*6,2.6,2.6,['#fff4f8','#ffd0e0','#fff0a0'][i%3],'#e0a0b0',.4);c.fillStyle='#f0c020';c.beginPath();c.arc(Math.cos(a)*6,Math.sin(a)*6,1,0,TAU);c.fill()}break;
 case'acorn':egg(c,0,0,7,7,'#b88848','#6a4418',.3);c.strokeStyle='rgba(60,35,10,.5)';c.lineWidth=.8;for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(i*2.5,-6);c.lineTo(i*2.5,6);c.moveTo(-6,i*2.5);c.lineTo(6,i*2.5);c.stroke()}c.fillStyle='#5a3a14';c.fillRect(-1,-1,5,2);break;
 case'leaf':c.rotate(Math.sin(t*2)*.08);egg(c,-2,0,13,10,'#a8dc60','#4a8a20',.4,0);c.strokeStyle='#3a6a14';c.lineWidth=1;c.beginPath();c.moveTo(-14,0);c.lineTo(10,0);for(let i=-3;i<=2;i++){c.moveTo(i*3.5,0);c.lineTo(i*3.5+3,-7);c.moveTo(i*3.5,0);c.lineTo(i*3.5+3,7)}c.stroke();break;
 case'mush':egg(c,0,0,10,10,'#ff6a4a','#a8200e',.35);c.fillStyle='#fff6e8';[[-4,-3,2],[3,-5,1.6],[2,4,2.2],[-4,5,1.5],[5,0,1.3]].forEach(p=>{c.beginPath();c.arc(p[0],p[1],p[2],0,TAU);c.fill()});break;
 case'wizard':egg(c,0,0,9,9,'#7a5ac8','#3a2470',.3);egg(c,0,0,5,5,'#9a7ae0','#4a2e90',.6);c.fillStyle='#ffe060';for(let i=0;i<5;i++){let a=i/5*TAU+t;c.beginPath();c.arc(Math.cos(a)*7,Math.sin(a)*7,1,0,TAU);c.fill()}c.beginPath();for(let i=0;i<10;i++){let a=i/10*TAU,r=i%2?1.2:3;c.lineTo(Math.cos(a)*r,Math.sin(a)*r)}c.fill();break;
 case'crown':c.fillStyle='#f0c030';c.strokeStyle='#8a6a10';c.lineWidth=1;c.beginPath();for(let i=0;i<12;i++){let a=i/12*TAU,r=i%2?5:8;c.lineTo(Math.cos(a)*r,Math.sin(a)*r)}c.closePath();c.fill();c.stroke();egg(c,0,0,3,3,'#ff6a8a','#a01a3a',.6);break;
 }c.restore()}
function drawLottie(c,t,walk,hat,lantern){
 legs(c,3,9,walk,1,'#2a1a10',1.8);
 // backpack
 egg(c,-12,0,6,8,'#b08850','#6a4a20',.25);c.strokeStyle='#5a3a14';c.lineWidth=1.3;c.beginPath();c.moveTo(-14,-7);c.lineTo(-14,7);c.stroke();egg(c,-15,-5,2.5,2,'#9a7038','#5a3a14',.2);
 if(lantern){egg(c,-16,6,2.6,2.6,'#fff0a0','#e0a020',.6)}
 egg(c,0,0,11,10,'#ff8a5a','#c52a12',.45);c.fillStyle='#1a1008';c.fillRect(-11,-.7,20,1.4);[[-5,-5],[-5,5],[2,-5.5],[2,5.5]].forEach(p=>{c.beginPath();c.arc(p[0],p[1],2.3,0,TAU);c.fill()});
 egg(c,10,0,6,6.5,'#4a4a4a','#111',.25);c.fillStyle='#fff';c.beginPath();c.arc(13.5,-3,2.6,0,TAU);c.arc(13.5,3,2.6,0,TAU);c.fill();c.fillStyle='#111';c.beginPath();c.arc(14.5,-3,1.3,0,TAU);c.arc(14.5,3,1.3,0,TAU);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(15,-3.5,.5,0,TAU);c.arc(15,2.5,.5,0,TAU);c.fill();
 c.strokeStyle='#1a1008';c.lineWidth=1;c.beginPath();c.moveTo(15,-2);c.quadraticCurveTo(20,-6,21,-8);c.moveTo(15,2);c.quadraticCurveTo(20,6,21,8);c.stroke();egg(c,21,-8,1.6,1.6,'#e89040','#a05010',.4,0,false);egg(c,21,8,1.6,1.6,'#e89040','#a05010',.4,0,false);
 drawHat(c,hat,t)}
// ===== Baked decoration sprites (3/4 view, anchored at base) =====
function bake(w,h,fn,blur){const k=2,cc=document.createElement('canvas');cc.width=w*k;cc.height=h*k;const c=cc.getContext('2d');c.scale(k,k);if(blur)c.filter=`blur(${blur}px)`;fn(c,w,h);return{img:cc,w,h}}
function cloverLeaf(c,x0,y0,r,rot,squash=.6,c1='#b4e070',c2='#4a8a28'){c.save();c.translate(x0,y0);c.scale(1,squash);for(let i=0;i<3;i++){c.save();c.rotate(rot+i*TAU/3);let g=c.createRadialGradient(0,-r*.7,1,0,-r*.5,r);g.addColorStop(0,c1);g.addColorStop(1,c2);c.fillStyle=g;c.beginPath();c.moveTo(0,0);c.bezierCurveTo(-r*1.05,-r*.35,-r*.8,-r*1.35,0,-r*.85);c.bezierCurveTo(r*.8,-r*1.35,r*1.05,-r*.35,0,0);c.fill();c.strokeStyle='rgba(40,70,20,.45)';c.lineWidth=1;c.stroke();c.strokeStyle='rgba(235,255,200,.6)';c.lineWidth=1.4;c.beginPath();c.arc(0,-r*.6,r*.32,3.7,5.7);c.stroke();c.restore()}c.restore()}
function dewBall(c,x0,y0,r){let g=c.createRadialGradient(x0-r*.35,y0-r*.35,0,x0,y0,r);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.35,'rgba(215,240,255,.45)');g.addColorStop(.85,'rgba(150,200,230,.35)');g.addColorStop(1,'rgba(255,255,255,.7)');c.fillStyle=g;c.beginPath();c.arc(x0,y0,r,0,TAU);c.fill();c.fillStyle='rgba(255,255,255,.95)';c.beginPath();c.ellipse(x0-r*.38,y0-r*.42,r*.28,r*.18,-.6,0,TAU);c.fill()}
function shadowE(c,x0,y0,rx,ry,a=.28){let g=c.createRadialGradient(x0,y0,0,x0,y0,rx);g.addColorStop(0,`rgba(30,20,5,${a})`);g.addColorStop(1,'rgba(30,20,5,0)');c.fillStyle=g;c.save();c.translate(x0,y0);c.scale(1,ry/rx);c.beginPath();c.arc(0,0,rx,0,TAU);c.fill();c.restore()}
const SPR={};
function bakeAll(){
 const V=(k,n,fn)=>{SPR[k]=[];for(let i=0;i<n;i++)SPR[k].push(fn(i))};
 V('clover',4,i=>bake(110,100,(c,w,h)=>{shadowE(c,w/2,h-8,46,12);let n=3+i%2;for(let j=0;j<n;j++){let sx=w/2+(j-(n-1)/2)*22+fx()*8,top=20+fx()*30,r=16+fx()*8;c.strokeStyle='#4a7a22';c.lineWidth=2.4;c.beginPath();c.moveTo(w/2+(j-(n-1)/2)*6,h-8);c.quadraticCurveTo(sx,h-30,sx,top+8);c.stroke();cloverLeaf(c,sx,top+8,r,fx()*2,.62);if(fx()<.5)dewBall(c,sx+r*.3,top+2,3+fx()*3)}}));
 V('bigclover',2,i=>bake(170,170,(c,w,h)=>{shadowE(c,w/2,h-10,70,18,.35);c.strokeStyle='#467a20';c.lineWidth=4;c.beginPath();c.moveTo(w/2,h-10);c.quadraticCurveTo(w/2+10,h-70,w/2,58);c.stroke();cloverLeaf(c,w/2,58,46,i,.6);dewBall(c,w/2+18,44,7);dewBall(c,w/2-26,62,4)}));
 V('mush',4,i=>bake(90,100,(c,w,h)=>{let r=22+i*5,sh=36+i*5,cx=w/2;shadowE(c,cx,h-6,r*1.2,8,.35);let g=c.createLinearGradient(cx-8,0,cx+8,0);g.addColorStop(0,'#fff4e0');g.addColorStop(1,'#c8b088');c.fillStyle=g;c.beginPath();c.moveTo(cx-6,h-6);c.quadraticCurveTo(cx-9,h-sh/2,cx-5,h-sh);c.lineTo(cx+5,h-sh);c.quadraticCurveTo(cx+9,h-sh/2,cx+7,h-6);c.fill();c.strokeStyle=OUT;c.lineWidth=1;c.stroke();
  let red=i==3,cap=c.createRadialGradient(cx-r*.3,h-sh-r*.6,2,cx,h-sh,r*1.2);cap.addColorStop(0,red?'#ff7a5a':'#f0a868');cap.addColorStop(1,red?'#a01a0a':'#8a4a1c');c.fillStyle=cap;c.beginPath();c.moveTo(cx-r,h-sh+2);c.quadraticCurveTo(cx-r,h-sh-r*1.1,cx,h-sh-r*1.05);c.quadraticCurveTo(cx+r,h-sh-r*1.1,cx+r,h-sh+2);c.quadraticCurveTo(cx,h-sh+7,cx-r,h-sh+2);c.fill();c.stroke();
  c.fillStyle='rgba(255,240,215,.9)';for(let k=0;k<6;k++){c.beginPath();c.ellipse(cx+(fx()-.5)*r*1.4,h-sh-r*(.2+fx()*.6),2+fx()*2.5,1.5+fx()*1.5,0,0,TAU);c.fill()}c.fillStyle='rgba(255,255,240,.35)';c.beginPath();c.ellipse(cx-r*.35,h-sh-r*.7,r*.35,r*.15,-.4,0,TAU);c.fill()}));
 V('pebble',3,i=>bake(60,40,(c,w,h)=>{shadowE(c,w/2+4,h-8,24,8,.35);egg(c,w/2,h-16,16+i*3,11+i*2,'#b8b2a0','#5e584a',.4)}));
 V('leafd',4,i=>bake(80,60,(c,w,h)=>{c.translate(w/2,h/2);c.rotate(fx()*TAU);let col=[['#e8a050','#a0501a'],['#d8b060','#8a6020'],['#c8703a','#7a3010'],['#a8b048','#5a6a1a']][i];egg(c,0,0,26,11,col[0],col[1],.2);c.strokeStyle='rgba(80,40,10,.6)';c.lineWidth=1;c.beginPath();c.moveTo(-28,0);c.lineTo(24,0);for(let k=-3;k<=3;k++){c.moveTo(k*6,0);c.lineTo(k*6+5,-7);c.moveTo(k*6,0);c.lineTo(k*6+5,7)}c.stroke()}));
 V('flower',5,i=>bake(70,110,(c,w,h)=>{shadowE(c,w/2,h-6,18,6);c.strokeStyle='#4a8a28';c.lineWidth=2.4;c.beginPath();c.moveTo(w/2,h-6);c.quadraticCurveTo(w/2-8,h-40,w/2,30);c.stroke();cloverLeaf(c,w/2-6,h-30,9,1,.4);
  let pal=[['#fff8f0','#e8d8e0','#f8c830'],['#ffb0c8','#d0507a','#ffe080'],['#b8c8ff','#5a70d0','#fff0a0'],['#ffcf6a','#e08020','#7a3a10'],['#e8a0ff','#9050c0','#fff']][i];
  c.save();c.translate(w/2,30);c.scale(1,.7);for(let k=0;k<8;k++){c.save();c.rotate(k/8*TAU);egg(c,11,0,10,4.8,pal[0],pal[1],.2);c.restore()}c.restore();egg(c,w/2,30,6,4.5,pal[2],'#a06010',.4)}));
 V('grass',3,i=>bake(70,80,(c,w,h)=>{for(let k=0;k<9;k++){let x0=w/2+(k-4)*3,tx=x0+(k-4)*5+fx()*8-4,ty=8+fx()*30;c.strokeStyle=`hsl(${80+fx()*25},${45+fx()*20}%,${32+fx()*18}%)`;c.lineWidth=2.6;c.beginPath();c.moveTo(x0,h);c.quadraticCurveTo(x0,h-30,tx,ty);c.stroke()}}));
 V('fern',2,i=>bake(120,110,(c,w,h)=>{shadowE(c,w/2,h-6,50,10);for(let f=0;f<5;f++){let a=-Math.PI/2+(f-2)*.5;c.save();c.translate(w/2,h-6);c.rotate(a+Math.PI/2);for(let k=0;k<12;k++){let y=-k*7,l=(12-k)*1.5+3;c.fillStyle=`hsl(${95+k*2},45%,${28+k*2}%)`;c.beginPath();c.ellipse(-l/2,y,l/2,2.4,-.4,0,TAU);c.ellipse(l/2,y,l/2,2.4,.4,0,TAU);c.fill()}c.strokeStyle='#2e5a1a';c.lineWidth=1.4;c.beginPath();c.moveTo(0,0);c.lineTo(0,-84);c.stroke();c.restore()}}));
 V('reed',2,i=>bake(60,150,(c,w,h)=>{for(let k=0;k<4;k++){let x0=w/2+(k-1.5)*7;c.strokeStyle='#5a8a3a';c.lineWidth=2.5;c.beginPath();c.moveTo(x0,h);c.quadraticCurveTo(x0+4,h-70,x0+(k-1.5)*4,20+k*8);c.stroke();if(k%2==0)egg(c,x0+(k-1.5)*4,30+k*8,3.8,12,'#9a6030','#4a2610',.3)}}));
 V('lily',3,i=>bake(80,50,(c,w,h)=>{c.translate(w/2,h/2);c.scale(1,.55);let g=c.createRadialGradient(-8,-8,2,0,0,32);g.addColorStop(0,'#9ad060');g.addColorStop(1,'#3a7a30');c.fillStyle=g;c.beginPath();c.moveTo(0,0);c.arc(0,0,32,.25+i,TAU-.25+i);c.closePath();c.fill();c.strokeStyle='rgba(30,60,20,.5)';c.lineWidth=1.5;c.stroke();if(i==1){for(let k=0;k<8;k++){c.save();c.rotate(k/8*TAU);egg(c,8,0,9,4,'#fff4f8','#f0a8c8',.3);c.restore()}egg(c,0,0,4,4,'#ffe060','#c09010',.4)}}));
 V('web',1,i=>bake(140,140,(c,w,h)=>{c.translate(w/2,h/2);c.strokeStyle='rgba(255,255,255,.45)';c.lineWidth=.8;for(let k=0;k<10;k++){let a=k/10*TAU;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(a)*65,Math.sin(a)*65);c.stroke()}for(let r=8;r<65;r+=7){c.beginPath();for(let k=0;k<=10;k++){let a=k/10*TAU;c.lineTo(Math.cos(a)*r,Math.sin(a)*r)}c.stroke()}for(let k=0;k<8;k++)dewBall(c,(fx()-.5)*90,(fx()-.5)*90,1.5+fx()*1.5)}));
 V('log',1,i=>bake(520,170,(c,w,h)=>{shadowE(c,w/2,h-14,250,30,.45);let g=c.createLinearGradient(0,20,0,h-10);g.addColorStop(0,'#a07048');g.addColorStop(.5,'#6a4426');g.addColorStop(1,'#3a2210');c.fillStyle=g;c.beginPath();c.roundRect(30,30,w-80,h-50,55);c.fill();c.strokeStyle=OUT;c.lineWidth=2;c.stroke();
  c.strokeStyle='rgba(40,20,5,.5)';c.lineWidth=2;for(let k=0;k<14;k++){c.beginPath();let y=40+k*8;c.moveTo(50,y);c.bezierCurveTo(180,y+fx()*10-5,320,y+fx()*10-5,w-60,y);c.stroke()}
  let e=c.createRadialGradient(w-50,h/2+10,4,w-50,h/2+10,60);e.addColorStop(0,'#e8c090');e.addColorStop(.4,'#b88a58');e.addColorStop(1,'#6a4426');c.fillStyle=e;c.beginPath();c.ellipse(w-50,h/2+10,28,60,0,0,TAU);c.fill();c.stroke();c.strokeStyle='rgba(90,50,20,.6)';c.lineWidth=1.2;for(let r=8;r<56;r+=8){c.beginPath();c.ellipse(w-50,h/2+10,r*.45,r,0,0,TAU);c.stroke()}
  for(let k=0;k<70;k++){let mx=50+fx()*(w-130),my=32+fx()*30;let m=c.createRadialGradient(mx,my,0,mx,my,14);m.addColorStop(0,'rgba(150,190,60,.9)');m.addColorStop(1,'rgba(90,130,30,0)');c.fillStyle=m;c.beginPath();c.arc(mx,my,14,0,TAU);c.fill()}
  for(let k=0;k<3;k++){let sx=110+k*130,sy=34;c.fillStyle='#f0e0c0';c.fillRect(sx-2,sy-10,4,10);egg(c,sx,sy-12,9,5,'#e8a060','#8a4a1c',.35)}}));
 // foreground parallax leaves (blurred)
 V('fg',4,i=>bake(320,320,(c,w,h)=>{c.translate(w/2,h/2);if(i<2)cloverLeaf(c,0,40,110,i*1.3,1,'#7ab040','#2a5a18');else{c.rotate(i);egg(c,0,0,120,50,'#8ac048','#2a5a18',.15,0,false)}},10));
}
// ===== Hazards drawing =====
function drawSpider(c,t,mv){c.strokeStyle='#1a120c';c.lineWidth=2.4;c.lineCap='round';for(let i=0;i<4;i++)for(const s of[-1,1]){let o=(i-1.5)*5,w=Math.sin(t*14*mv+i*1.7+(s>0?1.5:0))*5;c.beginPath();c.moveTo(o,0);c.quadraticCurveTo(o+(i-1.5)*4,s*16,o*2.4+w,s*26);c.stroke()}
 egg(c,-9,0,13,11,'#4a3a30','#120a06',.35);c.fillStyle='rgba(230,200,120,.55)';c.beginPath();c.moveTo(-15,0);c.lineTo(-9,-4);c.lineTo(-3,0);c.lineTo(-9,4);c.fill();egg(c,6,0,7,6.5,'#3a2a20','#0a0604',.3);c.fillStyle='#ff4030';[[11,-2.5],[11,2.5],[9.5,-4.5],[9.5,4.5]].forEach(p=>{c.beginPath();c.arc(p[0],p[1],1.3,0,TAU);c.fill()})}
// ===== Sampled audio (CC0 recordings + original theme) =====
const MU=(()=>{const vol={music:+(SV.d.vm??.5),sfx:+(SV.d.vs??.8)};let on=false,muted=false;const mk=(f,loop,v)=>{const a=new Audio('assets/'+f);a.loop=loop;a.preload='auto';a._v=v;return a};
 const L={theme:mk('theme-preview-v2.mp3',1,.55),birds:mk('birds.mp3',1,.5),crick:mk('crickets.mp3',1,.45),rain:mk('rain.mp3',1,.6)},jingle=mk('discovery-jingle-v2.mp3',0,.8);
 const steps=[1,2,3].map(i=>mk(`step${i}.mp3`,0,.35));let mix={theme:1,birds:1,crick:0,rain:0},duck=1,si=0;
 function apply(){if(muted){for(const k in L)L[k].volume=0;return}for(const k in L){let g=k=='theme'?vol.music*duck:vol.sfx;L[k].volume=clamp(L[k]._v*g*mix[k],0,1)}}
 return{vol,start(){if(on)return;on=true;for(const k in L){L[k].play().catch(()=>{})}apply()},
  set(k,v){mix[k]=v;apply()},apply,
  setVol(k,v){vol[k]=v;SV.d[k=='music'?'vm':'vs']=v;SV.save();apply()},
  jingle(){if(muted)return;duck=.15;apply();jingle.currentTime=0;jingle.volume=clamp(.8*Math.max(vol.music,vol.sfx*.6),0,1);jingle.play().catch(()=>{});setTimeout(()=>{duck=1;apply()},3200)},
  step(){if(muted||!on)return;let a=steps[si++%3];a.volume=clamp(a._v*vol.sfx*(.7+fx()*.3),0,1);a.playbackRate=.9+fx()*.3;a.currentTime=0;a.play().catch(()=>{})},
  mute(m){muted=m;apply()}}})();
// ===== World =====
const BIO={meadow:{x:1600,y:1650,r:640,c:'#7d9a32',n:'Sunny Meadow'},woods:{x:760,y:760,r:600,c:'#3d5a2a',n:'Shady Woods'},pond:{x:2450,y:780,r:560,wr:330,c:'#4a8aa0',n:'Lily Pond'},log:{x:780,y:2450,r:560,c:'#7a5a32',n:'Old Log'},flowers:{x:2450,y:2450,r:600,c:'#c87aa0',n:'Flower Bed'}};
function biomeAt(px,py){let best='meadow',bd=1e9;for(const k in BIO){if(k=='meadow')continue;const b=BIO[k];let d=dist(px,py,b.x,b.y)/b.r;if(d<1&&d<bd){bd=d;best=k}}return best}
let GROUND=null,GS=.5,DECOR=[],FLAT=[],TALL=[],COVER=[],TRAIL=[];
function rpIn(bk){const b=BIO[bk];for(let k=0;k<60;k++){let a=rnd()*TAU,r=Math.sqrt(rnd())*b.r*(bk=='meadow'?1.6:.92),px=b.x+Math.cos(a)*r,py=b.y+Math.sin(a)*r;if(px<80||py<80||px>MW-80||py>MH-80)continue;if(bk=='meadow'&&biomeAt(px,py)!='meadow')continue;if(inWater(px,py,30))continue;return[px,py]}return[b.x,b.y+b.r*.5]}
function inWater(px,py,m=0){const p=BIO.pond;return dist(px,py,p.x,p.y)<p.wr+m}
function buildWorld(seed){rnd=mulberry(seed);DECOR=[];
 TRAIL=[[1600,1700],[1300,1250],[760,980],[1150,1500],[1600,1650],[2150,1150],[2200,850],[1950,1600],[1650,2000],[1050,2300],[780,2300],[1500,2100],[2200,2300],[2450,2300]];
 const add=(k,px,py,s=1,v)=>{let sp=SPR[k];DECOR.push({k,v:v??(rnd()*sp.length|0),x:px,y:py,s,fl:rnd()<.5})};
 for(const bk in BIO){const b=BIO[bk],A=bk=='meadow'?2.2:1,n=v=>Math.round(v*A*.62);
  const tab={meadow:[['clover',70],['bigclover',8],['grass',90],['flower',14],['pebble',22],['leafd',26],['mush',6]],woods:[['fern',34],['mush',30],['bigclover',6],['clover',22],['leafd',50],['pebble',14],['web',5],['grass',15]],
   pond:[['reed',40],['clover',26],['pebble',30],['grass',36],['lily',26],['bigclover',4]],log:[['leafd',70],['mush',20],['fern',10],['pebble',20],['clover',18],['grass',20]],flowers:[['flower',110],['clover',30],['bigclover',6],['grass',30],['pebble',8],['mush',4]]}[bk];
  for(const[k,c]of tab)for(let i=0;i<n(c);i++){if(k=='lily'){let a=rnd()*TAU,r=60+rnd()*(b.wr-80);add(k,b.x+Math.cos(a)*r,b.y+Math.sin(a)*r,.8+rnd()*.6);continue}
   if(k=='reed'){let a=rnd()*TAU,r=b.wr+rnd()*40-10;add(k,b.x+Math.cos(a)*r,b.y+Math.sin(a)*r,.8+rnd()*.5);continue}
   let[px,py]=rpIn(bk);if(nearTrail(px,py)<40&&k!='leafd'&&k!='pebble')continue;add(k,px,py,k=='bigclover'?1+rnd()*.3:.7+rnd()*.6)}}
 DECOR.push({k:'log',v:0,x:BIO.log.x,y:BIO.log.y+40,s:1.1,fl:false});
 FLAT=DECOR.filter(d=>['leafd','lily','web'].includes(d.k));TALL=DECOR.filter(d=>!FLAT.includes(d));COVER=DECOR.filter(d=>d.k=='bigclover'||(d.k=='mush'&&d.v>=2));
}
function nearTrail(px,py){let best=1e9;for(let i=0;i<TRAIL.length-1;i++){let[a,b]=TRAIL[i],[c,d]=TRAIL[i+1],dx=c-a,dy=d-b,t=clamp(((px-a)*dx+(py-b)*dy)/(dx*dx+dy*dy),0,1);best=Math.min(best,dist(px,py,a+dx*t,b+dy*t))}return best}
function bakeGround(tex){const g=document.createElement('canvas');g.width=MW*GS;g.height=MH*GS;const c=g.getContext('2d');c.scale(GS,GS);
 if(tex){const pc=document.createElement('canvas');pc.width=pc.height=512;pc.getContext('2d').drawImage(tex,0,0,512,512);c.fillStyle=c.createPattern(pc,'repeat');c.save();c.scale(1.4,1.4);c.fillRect(0,0,MW,MH);c.restore()}else{c.fillStyle='#6f8a2c';c.fillRect(0,0,MW,MH)}
 const blob=(px,py,r,col)=>{let gg=c.createRadialGradient(px,py,0,px,py,r);gg.addColorStop(0,col);gg.addColorStop(1,col.replace(/[\d.]+\)$/,'0)'));c.fillStyle=gg;c.beginPath();c.arc(px,py,r,0,TAU);c.fill()};
 const R=mulberry(99);
 for(let i=0;i<500;i++){let px=R()*MW,py=R()*MH;blob(px,py,60+R()*160,R()<.5?'rgba(190,200,80,.12)':'rgba(40,60,15,.14)')}
 const W_=BIO.woods;for(let i=0;i<260;i++){let a=R()*TAU,r=Math.sqrt(R())*W_.r;blob(W_.x+Math.cos(a)*r,W_.y+Math.sin(a)*r,90+R()*120,R()<.6?'rgba(20,40,25,.22)':'rgba(90,60,30,.18)')}
 const L_=BIO.log;for(let i=0;i<260;i++){let a=R()*TAU,r=Math.sqrt(R())*L_.r;blob(L_.x+Math.cos(a)*r,L_.y+Math.sin(a)*r,50+R()*110,R()<.6?'rgba(110,70,30,.22)':'rgba(60,40,15,.2)')}
 const F_=BIO.flowers;for(let i=0;i<180;i++){let a=R()*TAU,r=Math.sqrt(R())*F_.r;blob(F_.x+Math.cos(a)*r,F_.y+Math.sin(a)*r,60+R()*100,'rgba(200,220,110,.16)')}
 for(let i=0;i<900;i++){let a=R()*TAU,r=Math.sqrt(R())*F_.r;c.fillStyle=['#ffd0e0','#fff4c0','#d8c8ff','#ffffff'][i%4];c.globalAlpha=.6;c.beginPath();c.ellipse(F_.x+Math.cos(a)*r,F_.y+Math.sin(a)*r,3,2,R()*3,0,TAU);c.fill()}c.globalAlpha=1;
 // trail
 c.lineCap='round';c.lineJoin='round';for(const[w,col]of[[110,'rgba(120,90,50,.18)'],[70,'rgba(170,130,80,.35)'],[42,'rgba(200,165,110,.45)']]){c.strokeStyle=col;c.lineWidth=w;c.beginPath();TRAIL.forEach(([a,b],i)=>i?c.lineTo(a,b):c.moveTo(a,b));c.stroke()}
 for(let i=0;i<TRAIL.length-1;i++)for(let k=0;k<30;k++){let t=R(),[a,b]=TRAIL[i],[cc,d]=TRAIL[i+1];let px=lerp(a,cc,t)+(R()-.5)*60,py=lerp(b,d,t)+(R()-.5)*60;c.fillStyle=`rgba(${120+R()*60|0},${100+R()*40|0},${70+R()*30|0},.7)`;c.beginPath();c.ellipse(px,py,2+R()*4,1.5+R()*3,R()*3,0,TAU);c.fill()}
 // pond
 const P_=BIO.pond;blob(P_.x,P_.y,P_.wr+90,'rgba(90,70,40,.55)');let wg=c.createRadialGradient(P_.x-60,P_.y-60,20,P_.x,P_.y,P_.wr);wg.addColorStop(0,'#8ac8c8');wg.addColorStop(.6,'#4a90a0');wg.addColorStop(1,'#2a5a60');c.fillStyle=wg;c.beginPath();for(let i=0;i<=40;i++){let a=i/40*TAU,r=P_.wr+Math.sin(a*3)*14+Math.cos(a*5)*8;c.lineTo(P_.x+Math.cos(a)*r,P_.y+Math.sin(a)*r)}c.fill();
 c.strokeStyle='rgba(230,250,240,.35)';c.lineWidth=5;c.stroke();
 return g}
// ===== Game state =====
let G=null,state='title',N=0,manualN=null,keys={},stick=null,shake=0,timeScale=1,zoom=1,cam={x:1600,y:1650},parts=[],flash=0,lastT=0,AT=/autotest/.test(location.search);
const todayStr=()=>{let d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
function newGame(daily){const seed=daily?+todayStr().replace(/-/g,''):(Math.random()*1e9|0);buildWorld(seed);
 G={daily,seed,el:0,time:SESSION,hearts:3,inv:0,dew:0,found:[],shots:0,P:{x:1600,y:1700,vx:0,vy:0,a:-1.2,walk:0,st:0,hidden:false,slow:1},bugs:[],dews:[],spiders:[],bird:{st:'idle',cd:18},puddles:[],rain:{t:28+rnd()*20,on:0},hint:''};
 for(const s of SPEC){let n={common:3,rare:2,legendary:1}[s.r];if(s.id=='strider'||s.id=='dragonfly')n=2;for(let i=0;i<n;i++){let bk=s.b[i%s.b.length],px,py;
   if(s.id=='strider'){let a=rnd()*TAU,r=BIO.pond.wr-40-rnd()*60;px=BIO.pond.x+Math.cos(a)*r;py=BIO.pond.y+Math.sin(a)*r}else[px,py]=rpIn(bk);
   if(s.mv=='buzz'){let fl=TALL.filter(d=>d.k=='flower'&&dist(d.x,d.y,px,py)<400);if(fl.length){let f=fl[rnd()*fl.length|0];px=f.x;py=f.y-30}}
   G.bugs.push({s,x:px,y:py,hx:px,hy:py,a:rnd()*TAU,t:rnd()*20,alt:0,alert:0,focus:0,flee:0,vx:0,vy:0,tx:px,ty:py,wait:rnd()*2,vis:1,trail:[],gone:false})}}
 for(let i=0;i<90;i++){let bk=Object.keys(BIO)[i%5],[px,py]=rpIn(bk);G.dews.push({x:px,y:py,v:rnd()<.08?5:1,t:rnd()*9})}
 G.spiders=[{hx:BIO.woods.x,hy:BIO.woods.y,x:BIO.woods.x+100,y:BIO.woods.y,a:0,mv:0,t:0,tx:0,ty:0,w:0},{hx:BIO.log.x,hy:BIO.log.y-150,x:BIO.log.x,y:BIO.log.y-150,a:0,mv:0,t:0,tx:0,ty:0,w:0}];
 cam.x=G.P.x;cam.y=G.P.y;N=0;manualN=null;parts=[];shake=0;timeScale=1;zoom=baseZoom();updHUD()}
const baseZoom=()=>Math.min(W,H)<600?.85:1.15;
// ===== Input =====
addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=1;if(e.key==' '&&state=='reveal')closeReveal();if(e.key.toLowerCase()=='j'&&state=='play')openJournal()});addEventListener('keyup',e=>keys[e.key.toLowerCase()]=0);
const stEl=$('stick');cv.addEventListener('pointerdown',e=>{if(state!='play')return;stick={ox:e.clientX,oy:e.clientY,x:e.clientX,y:e.clientY,id:e.pointerId};stEl.style.display='block';stEl.style.left=e.clientX+'px';stEl.style.top=e.clientY+'px';S.init();MU.start()});
addEventListener('pointermove',e=>{if(stick&&e.pointerId==stick.id){stick.x=e.clientX;stick.y=e.clientY;let dx=stick.x-stick.ox,dy=stick.y-stick.oy,d=Math.hypot(dx,dy),m=Math.min(d,50);stEl.firstChild.style.transform=`translate(${dx/(d||1)*m}px,${dy/(d||1)*m}px)`}});
addEventListener('pointerup',e=>{if(stick&&e.pointerId==stick.id){stick=null;stEl.style.display='none';stEl.firstChild.style.transform=''}});
// ===== Helpers =====
function toast(h,ms=2600){const t=$('toast');t.innerHTML=h;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),ms)}
function bump(id){const e=$(id);e.classList.remove('bump');void e.offsetWidth;e.classList.add('bump');setTimeout(()=>e.classList.remove('bump'),260)}
function updHUD(){if(!G)return;$('hBugs').textContent=`📸 ${G.found.length}/${SPEC.length}`;$('hDew').textContent='💧 '+String(SV.d.dew).padStart(3,'0');$('hHearts').textContent='❤️'.repeat(Math.max(0,G.hearts))+'🤍'.repeat(3-Math.max(0,G.hearts));let s=Math.max(0,Math.ceil(G.time));$('hTime').textContent=`${N>.5?'🌙':'☀️'} ${s/60|0}:${String(s%60).padStart(2,'0')}`}
function puff(px,py,n,col,sp=40,life=.6,sz=3,up=0){for(let i=0;i<n;i++){let a=fx()*TAU,v=fx()*sp;parts.push({x:px,y:py,vx:Math.cos(a)*v,vy:Math.sin(a)*v-up,l:life*(.6+fx()*.6),ml:life,c:col,s:sz*(.6+fx()*.8)})}}
function sparkle(px,py,n=30,col='255,230,120'){for(let i=0;i<n;i++){let a=fx()*TAU,v=40+fx()*160;parts.push({x:px,y:py,vx:Math.cos(a)*v,vy:Math.sin(a)*v-40,l:1+fx(),ml:1.6,c:col,s:2+fx()*3,star:1})}}
function isCovered(px,py){return COVER.some(d=>dist(d.x,d.y-8,px,py)<(d.k=='bigclover'?42:22)*d.s)}
function visible(b){if(b.s.night)return sm(.35,.55,N);if(b.s.day)return 1-sm(.6,.85,N);return 1}
// ===== Update =====
function update(dt){const P=G.P;G.el+=dt;G.time-=dt;G.inv-=dt;
 let tgtN=manualN!=null?manualN:sm(.4,.56,G.el/SESSION);N+=(tgtN-N)*Math.min(1,dt*1.2);S.night(N);MU.set('birds',1-N*.85);MU.set('crick',sm(.3,.7,N));
 // input
 let ix=0,iy=0,sneak=!!keys.shift;if(keys.arrowleft||keys.a)ix--;if(keys.arrowright||keys.d)ix++;if(keys.arrowup||keys.w)iy--;if(keys.arrowdown||keys.s)iy++;
 if(stick){let dx=stick.x-stick.ox,dy=stick.y-stick.oy,d=Math.hypot(dx,dy);if(d>8){ix=dx/d;iy=dy/d;if(d<38)sneak=true}}
 if(AT)[ix,iy,sneak]=autoPilot();
 let m=Math.hypot(ix,iy);if(m){ix/=m;iy/=m}
 let inPud=G.puddles.some(p=>dist(p.x,p.y,P.x,P.y)<p.r*.85);
 let spd=(sneak?85:215)*(inPud?.55:1);let ax=ix*spd,ay=iy*spd,k=1-Math.exp(-dt*(m?10:7));P.vx=lerp(P.vx,ax,k);P.vy=lerp(P.vy,ay,k);
 let nx=P.x+P.vx*dt,ny=P.y+P.vy*dt;if(inWater(nx,ny,6)){let p=BIO.pond,a=Math.atan2(ny-p.y,nx-p.x);nx=p.x+Math.cos(a)*(p.wr+7);ny=p.y+Math.sin(a)*(p.wr+7)}
 P.x=clamp(nx,30,MW-30);P.y=clamp(ny,30,MH-30);let sp=Math.hypot(P.vx,P.vy);P.speed=sp;P.sneak=sneak;
 if(sp>8){let ta=Math.atan2(P.vy,P.vx),da=((ta-P.a+Math.PI*3)%TAU)-Math.PI;P.a+=da*Math.min(1,dt*12);P.walk+=dt*sp*.09;if(!sneak&&fx()<dt*8)puff(P.x-Math.cos(P.a)*10,P.y-Math.sin(P.a)*10+6,1,'200,170,120',15,.5,3);S.step(dt,sneak);if(!P._sd||P._sd<0){MU.step();P._sd=sneak?.42:.24}P._sd-=dt;if(inPud&&fx()<dt*5){puff(P.x,P.y,4,'200,230,255',50,.4,2,20);S.splash()}}
 P.st=lerp(P.st,sp>8?Math.sin(G.el*18)*.07:0,.3);P.hidden=isCovered(P.x,P.y);
 // dew
 for(const d of G.dews){d.t+=dt;if(!d.got&&dist(d.x,d.y,P.x,P.y)<22){d.got=1;G.dew+=d.v;SV.d.dew+=d.v;S.dew();sparkle(d.x,d.y,8,'200,235,255');bump('hDew');updHUD()}}
 // bugs
 for(const b of G.bugs)updBug(b,dt,P);
 // spiders
 for(const s of G.spiders){s.t+=dt;let dp=dist(s.x,s.y,P.x,P.y),range=(220+90*N)*(P.hidden?.4:1)*(P.sneak?.7:1),fromHome=dist(s.x,s.y,s.hx,s.hy);let tx,ty,sv;
  if(dp<range&&fromHome<480&&G.time>0){tx=P.x;ty=P.y;sv=105+30*N;s.chase=1}else{s.chase=0;s.w-=dt;if(s.w<0||dist(s.x,s.y,s.tx,s.ty)<10){s.w=2+fx()*3;let a=fx()*TAU;s.tx=s.hx+Math.cos(a)*180;s.ty=s.hy+Math.sin(a)*180}tx=s.tx;ty=s.ty;sv=40}
  let dx=tx-s.x,dy=ty-s.y,d=Math.hypot(dx,dy)||1;s.x+=dx/d*sv*dt;s.y+=dy/d*sv*dt;s.a=Math.atan2(dy,dx);s.mv=1;if(dp<26)hurt('A spider pounced! 🕷️',s.x,s.y)}
 // bird
 const B=G.bird;B.cd-=dt;if(B.st=='idle'&&B.cd<0&&N<.75){B.st='warn';B.t=0;B.x=P.x+P.vx*.6;B.y=P.y+P.vy*.6;S.warn();toast('🐦 A shadow is circling… <b>run or hide</b> under a clover!',2000)}
 if(B.st=='warn'){B.t+=dt;if(B.t<1.3){B.x=lerp(B.x,P.x,dt*1.6);B.y=lerp(B.y,P.y,dt*1.6)}if(B.t>2.1){B.st='strike';B.t=0;if(dist(B.x,B.y,P.x,P.y)<70&&!P.hidden)hurt('The bird swooped! 🐦',B.x,B.y);else if(P.hidden)toast('Phew! Safe under cover 🍀');shake=Math.max(shake,4);puff(B.x,B.y,20,'220,210,170',140,.7,4)}}
 if(B.st=='strike'){B.t+=dt;if(B.t>.8){B.st='idle';B.cd=13+fx()*8}}
 // rain
 const R=G.rain;if(!R.on&&G.el>R.t&&G.el<R.t+1){R.on=14;toast('🌧️ Rain! Dewdrops everywhere, but puddles slow you down.');}
 if(R.on>0){R.on-=dt;if(fx()<dt*1.6){let a=fx()*TAU,r=60+fx()*380;G.puddles.push({x:P.x+Math.cos(a)*r,y:P.y+Math.sin(a)*r,r:0,mr:30+fx()*40,life:30})}if(fx()<dt*3){let a=fx()*TAU,r=fx()*500;G.dews.push({x:P.x+Math.cos(a)*r,y:P.y+Math.sin(a)*r,v:1,t:0})}}
 MU.set('rain',R.on>0?1:0);S.rain(R.on>0?1:0);
 for(const p of G.puddles){p.r=Math.min(p.mr,p.r+dt*25);p.life-=dt}G.puddles=G.puddles.filter(p=>p.life>0);
 if(G.time<=0||G.hearts<=0||G.found.length==SPEC.length)endGame();
 updHUDThrottle(dt)}
let hudT=0;function updHUDThrottle(dt){hudT-=dt;if(hudT<0){hudT=.25;updHUD()}}
function hurt(msg,sx,sy){if(G.inv>0)return;G.hearts--;G.inv=2;shake=14;S.hit();toast(msg+` ${G.hearts>0?G.hearts+' heart'+(G.hearts>1?'s':'')+' left':''}`);let P=G.P,a=Math.atan2(P.y-sy,P.x-sx);P.vx=Math.cos(a)*420;P.vy=Math.sin(a)*420;puff(P.x,P.y,14,'255,120,90',120,.5,3);bump('hHearts');updHUD()}
function updBug(b,dt,P){b.t+=dt;const s=b.s,mv=s.mv,spd=s.sp||1;let tv=visible(b);b.vis=lerp(b.vis,tv,dt*2);let active=b.vis>.5&&!b.gone;
 let d=dist(b.x,b.y,P.x,P.y),R_=RAR[s.r];
 if(b.flee>0){b.flee-=dt;b.x+=b.vx*dt;b.y+=b.vy*dt;b.vx*=.985;b.vy*=.985;b.alt=lerp(b.alt,['flutter','dart','buzz','hover','hop'].includes(mv)?30:0,.1);b.a=Math.atan2(b.vy,b.vx);if(b.flee<=0){b.hx=clamp(b.x,60,MW-60);b.hy=clamp(b.y,60,MH-60);if(inWater(b.hx,b.hy,10)&&s.id!='strider'){let p=BIO.pond,a=Math.atan2(b.hy-p.y,b.hx-p.x);b.hx=p.x+Math.cos(a)*(p.wr+40);b.hy=p.y+Math.sin(a)*(p.wr+40)}b.tx=b.hx;b.ty=b.hy;b.alert=0}return}
 // movement
 let walkTo=(sv)=>{let dx=b.tx-b.x,dy=b.ty-b.y,dd=Math.hypot(dx,dy);if(dd>3){b.x+=dx/dd*sv*dt;b.y+=dy/dd*sv*dt;let ta=Math.atan2(dy,dx),da=((ta-b.a+Math.PI*3)%TAU)-Math.PI;b.a+=da*Math.min(1,dt*6);b.mov=1}else{b.mov=0;return true}};
 const newT=(r)=>{let a=fx()*TAU,rr=fx()*r;b.tx=b.hx+Math.cos(a)*rr;b.ty=b.hy+Math.sin(a)*rr;if(s.id!='strider'&&inWater(b.tx,b.ty,10)){b.tx=b.hx;b.ty=b.hy}if(s.id=='strider'&&!inWater(b.tx,b.ty,-30)){b.tx=b.hx;b.ty=b.hy}};
 switch(mv){
 case'walk':case'crawl':case'march':if(b.wait>0){b.wait-=dt;b.mov=0}else if(walkTo(28*spd*(mv=='march'?1.5:1))){b.wait=mv=='march'?.2:1+fx()*2.5;newT(mv=='march'?200:110)}break;
 case'hop':if(b.hop>0){b.hop-=dt;let k=1-b.hop/.5;b.x=lerp(b.hx0,b.tx,k);b.y=lerp(b.hy0,b.ty,k);b.alt=Math.sin(k*Math.PI)*28;if(b.hop<=0){b.alt=0;puff(b.x,b.y+4,5,'200,180,130',25,.4,2)}}else{b.wait-=dt;if(b.wait<0){b.wait=1.2+fx()*2.5;b.hx0=b.x;b.hy0=b.y;newT(120);b.a=Math.atan2(b.ty-b.y,b.tx-b.x);b.hop=.5}}break;
 case'buzz':{let k=b.t*1.3;b.x=b.hx+Math.sin(k)*45;b.y=b.hy+Math.sin(k*2)*22;b.alt=16+Math.sin(b.t*4)*3;b.a=Math.atan2(Math.cos(k*2)*44,Math.cos(k)*45);b.mov=1;break}
 case'flutter':{if(walkTo(45)){newT(220)}b.alt=24+Math.sin(b.t*3)*7;b.mov=1;break}
 case'dart':{if(b.wait>0){b.wait-=dt;b.x+=Math.sin(b.t*9)*.3;b.mov=0}else if(walkTo(260)){b.wait=1+fx()*2;newT(220)}b.alt=22;break}
 case'skate':{if(b.wait>0){b.wait-=dt;b.mov=0}else if(walkTo(70)){b.wait=.6+fx()*1.6;newT(110)}break}
 case'sway':b.mov=0;b.wait-=dt;if(b.wait<0){b.wait=4+fx()*4;newT(40)}walkTo(10);break;
 case'hover':{b.x=b.hx+Math.sin(b.t*.5)*70;b.y=b.hy+Math.cos(b.t*.37)*50;b.alt=18+Math.sin(b.t*2)*6;b.a=Math.atan2(Math.cos(b.t*.37),Math.cos(b.t*.5));b.mov=1;break}}
 if(mv=='march'){b.trail.unshift([b.x,b.y,b.a]);if(b.trail.length>60)b.trail.pop()}
 if(!active||G.time<=0){b.focus=0;return}
 // sneak & photo
 const fleeR=R_.fl*(P.hidden?.6:1),photoR=50+14*s.sz+(s.id=='strider'?50:0);let fast=P.speed>110;
 if(d<fleeR&&fast){b.alert+=dt*2.2*R_.al}else if(d<fleeR*.6&&P.speed>20){b.alert+=dt*.25*R_.al}else b.alert=Math.max(0,b.alert-dt*.6);
 if(b.alert>=1){b.flee=1.3;let a=Math.atan2(b.y-P.y,b.x-P.x)+(fx()-.5);let v=s.id=='strider'?120:(['flutter','dart','buzz','hover'].includes(mv)?280:150);b.vx=Math.cos(a)*v;b.vy=Math.sin(a)*v;if(s.id=='strider'){b.vx*=.5;b.vy*=.5}b.focus=0;S.flee();puff(b.x,b.y,6,'230,230,200',50,.4,2);if(!G.found.includes(s.id))toast(`💨 The ${s.n} got spooked! <b>Sneak</b> closer (hold Shift / small drag).`);return}
 if(d<photoR){let rate=fast?.2:1;b.focus+=dt*rate/R_.fo;if(Math.floor(b.focus*6)!=Math.floor((b.focus-dt*rate/R_.fo)*6))S.focus();if(b.focus>=1){b.focus=0;snap(b)}}else b.focus=Math.max(0,b.focus-dt*1.5)}
function snap(b){const s=b.s;S.shutter();$('flash').style.transition='none';$('flash').style.opacity=.85;requestAnimationFrame(()=>{$('flash').style.transition='opacity .6s';$('flash').style.opacity=0});G.shots++;
 if(G.found.includes(s.id)){b.flee=1;b.vx=(fx()-.5)*100;b.vy=(fx()-.5)*100;G.dew++;SV.d.dew++;toast(`📸 Another ${s.n}! +1 💧`);updHUD();return}
 G.found.push(s.id);let gain=RAR[s.r].dew;G.dew+=gain;SV.d.dew+=gain;G.time+=s.r=='legendary'?10:5;
 const isNew=!SV.d.seen.includes(s.id);if(isNew)SV.d.seen.push(s.id);SV.save();
 state='slowmo';G.focusBug=b;G.slow=0;timeScale=.15;S.chime(s.r=='common'?0:s.r=='rare'?1:2);MU.jingle();sparkle(b.x,b.y-b.alt,40,s.r=='legendary'?'255,215,90':'255,250,200');bump('hBugs');G.lastNew=isNew}
// ===== Render =====
const FG=[];{const r=mulberry(5);for(let i=0;i<40;i++)FG.push({x:r()*MW*1.5,y:r()*MH*1.5,v:r()*4|0,s:.8+r()*.8,a:r()*TAU})}
const MOTES=Array.from({length:60},()=>({x:fx(),y:fx(),s:.8+fx()*2.2,p:fx()*9,v:.2+fx()*.6}));
const RAINP=Array.from({length:140},()=>({x:fx(),y:fx(),v:.8+fx()*.6}));
function render(t,dt){const P=G?G.P:{x:cam.x,y:cam.y};let z=zoom;
 x.setTransform(DPR,0,0,DPR,0,0);x.fillStyle='#2c3315';x.fillRect(0,0,W,H);
 let sx=(fx()-.5)*shake,sy=(fx()-.5)*shake;
 const vx0=cam.x-W/2/z,vy0=cam.y-H/2/z,vx1=cam.x+W/2/z,vy1=cam.y+H/2/z;
 x.setTransform(DPR*z,0,0,DPR*z,DPR*(W/2-cam.x*z+sx),DPR*(H/2-cam.y*z+sy));
 if(GROUND){let a=clamp(vx0,0,MW),b=clamp(vy0,0,MH),c2=clamp(vx1,0,MW),d=clamp(vy1,0,MH);if(c2>a&&d>b)x.drawImage(GROUND,a*GS,b*GS,(c2-a)*GS,(d-b)*GS,a,b,c2-a,d-b)}
 const inV=(o,m=120)=>o.x>vx0-m&&o.x<vx1+m&&o.y>vy0-m&&o.y<vy1+m;
 // water shimmer
 const PO=BIO.pond;if(inV(PO,PO.wr+50)){x.save();x.beginPath();x.arc(PO.x,PO.y,PO.wr-4,0,TAU);x.clip();x.globalCompositeOperation='lighter';for(let i=0;i<14;i++){let a=i*2.4+t/9000,r=(i*53)%(PO.wr-40),px=PO.x+Math.cos(a)*r,py=PO.y+Math.sin(a)*r;x.strokeStyle=`rgba(200,240,255,${.08+.06*Math.sin(t/700+i)})`;x.lineWidth=2;x.beginPath();x.ellipse(px,py,30+((t/40+i*20)%50),10+((t/40+i*20)%50)/3,0,0,TAU);x.stroke()}x.restore()}
 // puddles
 if(G)for(const p of G.puddles){x.save();x.globalAlpha=Math.min(1,p.life/3)*.75;let g=x.createRadialGradient(p.x-p.r*.3,p.y-p.r*.2,2,p.x,p.y,p.r);g.addColorStop(0,'rgba(190,225,235,.9)');g.addColorStop(1,'rgba(80,120,130,.5)');x.fillStyle=g;x.beginPath();x.ellipse(p.x,p.y,p.r,p.r*.6,0,0,TAU);x.fill();if(G.rain.on>0&&fx()<.3){x.strokeStyle='rgba(255,255,255,.5)';x.beginPath();x.ellipse(p.x+(fx()-.5)*p.r,p.y+(fx()-.5)*p.r*.5,6,3,0,0,TAU);x.stroke()}x.restore()}
 for(const d of FLAT){if(!inV(d))continue;const sp=SPR[d.k][d.v%SPR[d.k].length];x.save();x.translate(d.x,d.y);if(d.k=='lily')x.translate(0,Math.sin(t/900+d.x)*1.5);x.scale(d.s*(d.fl?-1:1),d.s);x.drawImage(sp.img,-sp.w/2,-sp.h/2,sp.w,sp.h);x.restore()}
 // y-sorted
 const L=[];for(const d of TALL)if(inV(d,260))L.push({y:d.y,f:drawDecor,o:d});
 if(G){for(const b of G.bugs)if(b.vis>.02&&inV(b))L.push({y:b.y,f:drawBugE,o:b});for(const d of G.dews)if(!d.got&&inV(d))L.push({y:d.y,f:drawDew,o:d});for(const s of G.spiders)if(inV(s))L.push({y:s.y,f:drawSpiderE,o:s});L.push({y:P.y,f:drawPlayer,o:P})}
 L.sort((a,b)=>a.y-b.y);for(const e of L)e.f(e.o,t);
 // focus rings
 if(G)for(const b of G.bugs){if(b.focus>0.01){x.strokeStyle='rgba(255,250,220,.9)';x.lineWidth=3;x.beginPath();x.arc(b.x,b.y-b.alt,24*b.s.sz+8,-Math.PI/2,-Math.PI/2+TAU*b.focus);x.stroke();x.strokeStyle='rgba(255,250,220,.3)';x.beginPath();x.arc(b.x,b.y-b.alt,24*b.s.sz+8,0,TAU);x.stroke()}
  if(b.alert>.35&&b.flee<=0&&b.vis>.5){x.font='bold 22px Georgia';x.textAlign='center';x.fillStyle=`rgba(255,${200-150*b.alert|0},60,${Math.min(1,b.alert*1.5)})`;x.fillText(b.alert>.7?'!':'?',b.x,b.y-b.alt-28*b.s.sz-Math.sin(t/80)*2)}}
 // bird shadow
 if(G&&G.bird.st!='idle'){const B=G.bird;let k=B.st=='warn'?sm(0,2.1,B.t):1-B.t/.8;x.save();x.translate(B.x,B.y);x.rotate(t/1500);x.scale(.4+k*.9,.4+k*.9);x.fillStyle=`rgba(20,15,5,${.15+.3*k})`;let f=Math.sin(t/200)*.25;x.beginPath();x.ellipse(0,0,60,22,0,0,TAU);x.fill();for(const s of[-1,1]){x.beginPath();x.moveTo(15,0);x.quadraticCurveTo(0,s*(90+f*40),-40,s*(130+f*40));x.quadraticCurveTo(-20,s*40,-35,0);x.fill()}x.beginPath();x.moveTo(-50,0);x.lineTo(-85,-18);x.lineTo(-85,18);x.fill();x.restore();
  if(B.st=='warn'){x.strokeStyle=`rgba(255,90,60,${.3+.3*Math.sin(t/90)})`;x.lineWidth=3;x.setLineDash([10,8]);x.beginPath();x.arc(B.x,B.y,70,0,TAU);x.stroke();x.setLineDash([])}}
 // particles (world)
 for(const p of parts){p.l-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.96;p.vy=p.vy*.96+(p.star?30*dt:0);let a=Math.max(0,p.l/p.ml);x.fillStyle=`rgba(${p.c},${a})`;if(p.star){x.save();x.translate(p.x,p.y);x.rotate(p.l*4);x.beginPath();for(let i=0;i<8;i++){let r=i%2?p.s*.35:p.s*1.4;x.lineTo(Math.cos(i*Math.PI/4)*r,Math.sin(i*Math.PI/4)*r)}x.fill();x.restore()}else{x.beginPath();x.arc(p.x,p.y,p.s*(1.5-a*.5),0,TAU);x.fill()}}parts=parts.filter(p=>p.l>0);
 // ===== Lighting (screen space, world-aligned) =====
 const toS=(wx,wy)=>[(wx-cam.x)*z+W/2+sx,(wy-cam.y)*z+H/2+sy];
 x.setTransform(DPR,0,0,DPR,0,0);
 // day warmth
 let day=1-N;if(day>.01){x.save();x.globalCompositeOperation='soft-light';let g=x.createLinearGradient(W,0,0,H);g.addColorStop(0,`rgba(255,220,140,${.55*day})`);g.addColorStop(1,`rgba(120,90,30,${.3*day})`);x.fillStyle=g;x.fillRect(0,0,W,H);x.globalCompositeOperation='lighter';
  for(let i=0;i<5;i++){let gx=W*(.55+i*.17)+Math.sin(t/5000+i)*50,w=60+i*25;let g2=x.createLinearGradient(gx,0,gx-W*.45,H);g2.addColorStop(0,`rgba(255,225,150,${.09*day})`);g2.addColorStop(1,'rgba(255,225,150,0)');x.fillStyle=g2;x.beginPath();x.moveTo(gx-w,0);x.lineTo(gx+w,0);x.lineTo(gx-W*.45+w*2.5,H);x.lineTo(gx-W*.45-w*1.5,H);x.fill()}
  let sun=x.createRadialGradient(W*.9,-H*.05,0,W*.9,-H*.05,H*.8);sun.addColorStop(0,`rgba(255,235,170,${.35*day})`);sun.addColorStop(1,'rgba(255,235,170,0)');x.fillStyle=sun;x.fillRect(0,0,W,H);x.restore()}
 // night
 if(N>.01){x.save();x.globalCompositeOperation='multiply';x.fillStyle=`rgb(${255-175*N|0},${255-140*N|0},${255-55*N|0})`;x.fillRect(0,0,W,H);x.globalCompositeOperation='lighter';
  const glow=(wx,wy,r,col,a)=>{let[px,py]=toS(wx,wy);r*=z;if(px<-r||py<-r||px>W+r||py>H+r)return;let g=x.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);x.fillStyle=g;x.fillRect(px-r,py-r,r*2,r*2)};
  if(G){glow(P.x-Math.cos(P.a)*14,P.y-Math.sin(P.a)*14,190,'255,190,100',.55*N*(1+.06*Math.sin(t/120)));glow(P.x,P.y,60,'255,230,160',.4*N)}
  for(const d of G?G.dews:[])if(!d.got)glow(d.x,d.y,26,'170,220,255',.35*N*(.6+.4*Math.sin(t/500+d.x)));
  for(const d of TALL)if(d.k=='mush'&&d.v==3)glow(d.x,d.y-30,50,'120,255,200',.18*N);
  if(G)for(const b of G.bugs){if(b.s.id=='firefly'||b.s.id=='luna')glow(b.x,b.y-b.alt,b.s.id=='firefly'?80:60,b.s.id=='firefly'?'230,255,120':'180,255,200',N*b.vis*(b.s.id=='firefly'?.5+.4*Math.sin(t/300+b.hx):.3))}
  for(let i=0;i<26;i++){let px=(Math.sin(i*7.1+t/4000)*.5+.5)*W,py=(Math.cos(i*3.3+t/4700)*.5+.5)*H,a=N*Math.max(0,Math.sin(t/500+i*2));let g=x.createRadialGradient(px,py,0,px,py,14);g.addColorStop(0,`rgba(230,255,140,${a*.8})`);g.addColorStop(1,'rgba(230,255,140,0)');x.fillStyle=g;x.fillRect(px-14,py-14,28,28)}
  let moon=x.createRadialGradient(W*.85,H*.02,0,W*.85,H*.02,H*.7);moon.addColorStop(0,`rgba(150,180,255,${.25*N})`);moon.addColorStop(1,'rgba(150,180,255,0)');x.fillStyle=moon;x.fillRect(0,0,W,H);x.restore()}
 // pollen motes
 x.save();x.globalCompositeOperation='lighter';for(const m of MOTES){let px=((m.x*W+Math.sin(t/2500+m.p)*40-(cam.x*z*.2))%W+W)%W,py=((m.y*H-t/90*m.v-(cam.y*z*.2))%H+H)%H;let a=(.25+.25*Math.sin(t/500+m.p))*(1-N*.5);x.fillStyle=N>.5?`rgba(200,255,150,${a})`:`rgba(255,235,170,${a})`;x.beginPath();x.arc(px,py,m.s,0,TAU);x.fill()}x.restore();
 // rain
 if(G&&G.rain.on>0){let ra=Math.min(1,G.rain.on/2,(14-G.rain.on)/2);x.strokeStyle=`rgba(210,230,255,${.45*ra})`;x.lineWidth=1.2;x.beginPath();for(const r of RAINP){let px=((r.x*W+t*.25*r.v)%W),py=((r.y*H+t*1.1*r.v)%H);x.moveTo(px,py);x.lineTo(px-4,py-14)}x.stroke();x.fillStyle=`rgba(40,60,80,${.12*ra})`;x.fillRect(0,0,W,H)}
 // parallax foreground leaves (blurred)
 for(const f of FG){let px=(f.x-cam.x*1.5)*z,py=(f.y-cam.y*1.5)*z;px=((px%(MW*1.5*z))+MW*1.5*z)%(MW*1.5*z)-200;py=((py%(MH*1.5*z))+MH*1.5*z)%(MH*1.5*z)-200;if(px<-320||py<-320||px>W+320||py>H+320)continue;let sp=SPR.fg[f.v];x.save();x.globalAlpha=.6-N*.25;x.translate(px,py);x.rotate(f.a+Math.sin(t/3000+f.x)*.05);x.scale(f.s*z,f.s*z);x.drawImage(sp.img,-sp.w/2,-sp.h/2,sp.w,sp.h);x.restore()}
 // vignette
 let v=x.createRadialGradient(W/2,H/2,Math.min(W,H)*.35,W/2,H/2,Math.max(W,H)*.75);v.addColorStop(0,'rgba(60,40,10,0)');v.addColorStop(1,N>.5?'rgba(5,10,30,.7)':'rgba(50,30,5,.55)');x.fillStyle=v;x.fillRect(0,0,W,H);
 if(G&&G.inv>1.4){x.fillStyle=`rgba(200,40,20,${(G.inv-1.4)*.5})`;x.fillRect(0,0,W,H)}
 if(state=='play'||state=='slowmo')drawMinimap();
 if(state=='title')drawTitleArt(t)}
function drawDecor(d,t){const sp=SPR[d.k][d.v];x.save();x.translate(d.x,d.y);let sway=(d.k=='grass'||d.k=='reed'||d.k=='flower'||d.k=='fern')?Math.sin(t/900+d.x*.01)*.04:0;
 if(G&&d.k!='log'){let dp=dist(d.x,d.y,G.P.x,G.P.y);if(dp<40)sway+=(d.x<G.P.x?-1:1)*.15*(1-dp/40)}
 x.transform(1,0,sway,1,0,0);x.scale(d.s*.68*(d.fl?-1:1),d.s*.68);
 if(G&&(d.k=='bigclover'||d.k=='mush'||d.k=='fern')&&G.P.y<d.y&&G.P.y>d.y-sp.h*d.s*.68&&Math.abs(G.P.x-d.x)<sp.w*d.s*.3)x.globalAlpha=.55;
 x.drawImage(sp.img,-sp.w/2,-sp.h,sp.w,sp.h);x.restore()}
function drawBugE(b,t){const s=b.s;let a=b.vis;if(s.id=='mantis')a*=.85;x.save();x.globalAlpha=a;
 shadowE(x,b.x,b.y+3,14*s.sz*(1-b.alt/80),5*s.sz,.3*(1-b.alt/60));
 const one=(px,py,ang,ph)=>{x.save();x.translate(px,py-b.alt);x.rotate(ang);x.scale(s.sz*1.55,s.sz*1.55);drawSpec(x,s.id,b.t+ph,b.mov||b.flee>0?1:.15,N);x.restore()};
 if(s.mv=='march'){for(let i=5;i>0;i--){let tr=b.trail[i*10];if(tr){shadowE(x,tr[0],tr[1]+3,10,4,.25);one(tr[0],tr[1],tr[2],i*.3)}}}
 one(b.x,b.y,b.a,0);x.restore()}
function drawDew(d,t){let bob=Math.sin(t/400+d.t)*2,r=d.v>1?9:6;shadowE(x,d.x,d.y+r,r,r*.4,.25);dewBall(x,d.x,d.y-bob,r);if(d.v>1){x.fillStyle='rgba(255,220,90,.35)';x.beginPath();x.arc(d.x,d.y-bob,r,0,TAU);x.fill()}if(Math.sin(t/300+d.t*3)>.95){x.fillStyle='#fff';x.beginPath();x.arc(d.x-r*.3,d.y-bob-r*.4,2.5,0,TAU);x.fill()}}
function drawSpiderE(s,t){shadowE(x,s.x,s.y+4,30,10,.35);x.save();x.translate(s.x,s.y);x.rotate(s.a);x.scale(1.5,1.5);drawSpider(x,s.t,s.chase?1.8:.6);x.restore();if(s.chase){x.strokeStyle='rgba(255,255,255,.25)';x.beginPath();x.moveTo(s.x,s.y);x.lineTo(s.hx,s.hy);x.stroke()}}
function drawPlayer(P,t){if(G.inv>0&&Math.floor(t/90)%2)return;shadowE(x,P.x,P.y+5,20,8,.35);x.save();x.translate(P.x,P.y);x.rotate(P.a);let idle=Math.sin(t/400)*.03;x.scale(1.75*(1+P.st+idle),1.75*(1-P.st-idle));if(P.hidden)x.globalAlpha=.75;drawLottie(x,t/1000,P.walk,SV.d.hat,N>.3);x.restore();
 if(P.sneak&&P.speed>5){x.font='15px Georgia';x.textAlign='center';x.fillStyle='rgba(255,250,230,.8)';x.fillText('🤫',P.x,P.y-30)}}
function drawMinimap(){const s=96/MW,ox=10,oy=H-106;x.save();x.globalAlpha=.85;x.fillStyle='rgba(78,56,21,.75)';x.strokeStyle='#f0d58e';x.lineWidth=2;x.beginPath();x.roundRect(ox-3,oy-3,102,102,12);x.fill();x.stroke();for(const k in BIO){const b=BIO[k];x.fillStyle=b.c;x.globalAlpha=.6;x.beginPath();x.arc(ox+b.x*s,oy+b.y*s,(k=='pond'?b.wr:b.r*.8)*s,0,TAU);x.fill()}x.globalAlpha=1;x.fillStyle='#ff6a4a';x.beginPath();x.arc(ox+G.P.x*s,oy+G.P.y*s,3.5,0,TAU);x.fill();x.strokeStyle='#fff';x.lineWidth=1;x.stroke();x.restore()}
// Side-view Lottie for title (matches concept art)
function drawLottieSide(c,t,sc){c.save();c.scale(sc,sc);let bob=Math.sin(t*2)*1.2;
 shadowE(c,0,30,34,7,.35);
 c.strokeStyle='#1a1008';c.lineWidth=2.6;c.lineCap='round';for(const [lx,ph] of[[-12,0],[0,1.5],[12,3]]){let k=Math.sin(t*3+ph)*2;c.beginPath();c.moveTo(lx,14);c.lineTo(lx+k,24);c.lineTo(lx+k+4,29);c.stroke()}
 c.translate(0,bob);
 // stick
 c.strokeStyle='#8a5a2a';c.lineWidth=3.5;c.beginPath();c.moveTo(36,-8);c.lineTo(32,30);c.stroke();
 // backpack
 egg(c,-27,-8,12,16,'#c8a060','#6a4a20',.3);egg(c,-33,-20,7,6,'#b08850','#5a3a14',.3);c.strokeStyle='#5a3a14';c.lineWidth=2;c.beginPath();c.moveTo(-20,-22);c.quadraticCurveTo(-5,-15,-8,6);c.stroke();
 // shell
 egg(c,-4,0,24,19,'#ff7a4a','#b8220e',.45);c.fillStyle='#1a1008';[[-12,-6,4.5],[2,-10,4],[-2,5,5],[-16,8,3.5],[10,2,3.5]].forEach(p=>{c.beginPath();c.arc(p[0],p[1],p[2],0,TAU);c.fill()});
 // head
 egg(c,22,-14,13,12,'#4a4a4a','#111',.3);c.fillStyle='#fff';c.beginPath();c.ellipse(27,-17,6,7,0,0,TAU);c.fill();c.fillStyle='#111';c.beginPath();c.arc(29,-16,3.2,0,TAU);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(30,-17.5,1.1,0,TAU);c.fill();egg(c,35,-10,2.6,2.6,'#ff7a3a','#b84010',.5,0,false);
 c.strokeStyle='#111';c.lineWidth=1.6;c.beginPath();c.moveTo(28,-25);c.quadraticCurveTo(34,-36,40,-36);c.stroke();egg(c,40,-36,2,2,'#333','#000',.3,0,false);
 // arm
 c.strokeStyle='#1a1008';c.lineWidth=2.4;c.beginPath();c.moveTo(18,0);c.lineTo(28,4);c.lineTo(34,0);c.stroke();
 // hat
 c.save();c.translate(18,-26);c.rotate(-.1);egg(c,0,2,22,5,'#e0c88a','#9a7a3a',.3);c.fillStyle='#d8bc78';c.beginPath();c.ellipse(0,-4,12,9,0,Math.PI,0);c.fill();c.strokeStyle=OUT;c.lineWidth=1;c.stroke();c.fillStyle='#6a4a20';c.fillRect(-12,-3,24,3);c.save();c.rotate(-.5);egg(c,-8,-8,7,3,'#9ad04a','#4a8a1a',.4);c.restore();c.restore();
 c.restore()}
function drawTitleArt(t){t/=1000;if(W<520)return;x.save();x.translate(W*.16,H*.7);drawLottieSide(x,t,Math.min(W,H)/260);x.restore();
 x.save();x.translate(W*.85,H*.25+Math.sin(t*1.3)*10);x.rotate(-.3);x.scale(3,3);drawSpec(x,'butterfly',t,1);x.restore();x.save();x.translate(W*.82,H*.55+Math.sin(t*2)*6);x.rotate(.2);x.scale(2.4,2.4);drawSpec(x,'dragonfly',t,1);x.restore()}
// ===== Loop =====
function loop(now){let rdt=Math.min(.05,(now-lastT)/1000||0);lastT=now;
 if(state=='slowmo'){G.slow+=rdt;timeScale=G.slow<1?.15:.15;zoom=lerp(zoom,1.9,rdt*3);const b=G.focusBug;cam.x=lerp(cam.x,b.x,rdt*4);cam.y=lerp(cam.y,b.y-b.alt,rdt*4);update(rdt*timeScale);if(G.slow>1.1)openReveal(b.s)}
 else if(state=='play'){timeScale=lerp(timeScale,1,rdt*4);let dt=rdt*timeScale;update(dt);const P=G.P;let tx=P.x+P.vx*.35,ty=P.y+P.vy*.35,k=1-Math.exp(-rdt*3.2);cam.x=lerp(cam.x,tx,k);cam.y=lerp(cam.y,ty,k);zoom=lerp(zoom,baseZoom()*(P.sneak?1.08:1),rdt*2)}
 else if(state=='title'){cam.x=1600+Math.sin(now/9000)*500;cam.y=1650+Math.cos(now/11000)*400;zoom=baseZoom()}
 else if(state=='end'||state=='journal'||state=='reveal'){if(G)for(const b of G.bugs)b.t+=rdt*.5}
 shake*=Math.pow(.02,rdt);if(shake<.1)shake=0;
 render(now,rdt);requestAnimationFrame(loop)}
// ===== Reveal card =====
function portrait(id,w=240,h=170,t=1,bg=true,sil=false){const c=document.createElement('canvas');c.width=w*2;c.height=h*2;const g=c.getContext('2d');g.scale(2,2);if(bg){let gr=g.createRadialGradient(w/2,h/2,10,w/2,h/2,w*.7);let lg=SPI[id].r=='legendary';gr.addColorStop(0,lg?'#fffbe0':'#fff3c0');gr.addColorStop(.5,lg?'#f0c050':'#c8d880');gr.addColorStop(1,lg?'#8a5a10':'#6a8a30');g.fillStyle=gr;g.fillRect(0,0,w,h);if(lg){g.save();g.translate(w/2,h/2);g.globalCompositeOperation='lighter';for(let i=0;i<16;i++){g.rotate(TAU/16);g.fillStyle='rgba(255,240,180,.12)';g.beginPath();g.moveTo(0,0);g.lineTo(w,-12);g.lineTo(w,12);g.fill()}g.restore()}}g.translate(w/2,h/2);g.rotate(-Math.PI/2+.25);let s=SPI[id];g.scale(h/(s.sz*55),h/(s.sz*55));drawSpec(g,id,t,.4);if(sil){g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='source-in';g.fillStyle='rgba(60,45,20,.45)';g.fillRect(0,0,c.width,c.height)}return c}
function openReveal(s){state='reveal';const R=RAR[s.r],el=$('reveal');el.innerHTML=`<div class="flip"><div class="face front parch card-${s.r}" style="padding:14px;border-color:${s.r=='legendary'?'#e0a920':s.r=='rare'?'#4f8ad0':'#a97c3c'};${s.r=='legendary'?'box-shadow:0 0 60px #ffd34acc,0 14px 50px #000b':''}"><div class="rar" style="color:${R.c}">${'★'.repeat(s.r=='common'?1:s.r=='rare'?2:3)} ${R.lbl} ${G.lastNew?'· NEW!':''}</div><div id="rp"></div><h2>${s.n}</h2><div style="font-size:14px;font-style:italic">${s.f}</div><div style="margin-top:auto;font-weight:700">+${R.dew} 💧 ${s.r=='legendary'?'+10s':'+5s'} ⏱</div><button class="b" id="bRC" style="margin-top:8px">Add to journal ✍️</button><div class="shine"></div></div></div>`;
 $('rp').appendChild(portrait(s.id,250,150,G.el));el.classList.remove('hide');$('bRC').onclick=closeReveal;updHUD();setTimeout(()=>{let sh=el.querySelector('.shine');if(sh)sh.remove()},2300);if(AT)setTimeout(closeReveal,3000)}
function closeReveal(){if(state!='reveal')return;S.pop();$('reveal').classList.add('hide');state='play';timeScale=.3}
// ===== Journal / end =====
function fillGrid(el,showFacts){el.innerHTML='';for(const s of SPEC){const got=G&&G.found.includes(s.id),ever=SV.d.seen.includes(s.id);const d=document.createElement('div');d.className=`card ${s.r} ${got||ever?'':'no'}`;d.appendChild(portrait(s.id,90,64,2,false,!(got||ever)));d.insertAdjacentHTML('beforeend',`<div class="nm">${got||ever?s.n:'???'}</div><div class="tag" style="color:${RAR[s.r].c}">${RAR[s.r].lbl}${s.night?' · 🌙':''}${got?' ✅':''}</div>`);if(got||ever)d.title=s.f;el.appendChild(d)}}
function openJournal(){if(state!='play')return;state='journal';$('jSum').textContent=`This trail: ${G.found.length}/${SPEC.length} · All-time seen: ${SV.d.seen.length}/${SPEC.length}. Tap a card for its fact.`;fillGrid($('jGrid'));$('sJournal').classList.remove('hide');S.pop()}
$('bJClose').onclick=()=>{$('sJournal').classList.add('hide');state='play';S.pop()};
$('jGrid').onclick=e=>{let c=e.target.closest('.card');if(c&&c.title)toast(c.title,3500)};
function shareText(){let rows=['common','rare','legendary'].map(r=>SPEC.filter(s=>s.r==r).map(s=>G.found.includes(s.id)?RAR[r].e:'⬛').join(''));let leg=G.found.filter(id=>SPI[id].r=='legendary').length;
 return `🐞 Tiny Trails · ${G.daily?'Daily Trail '+todayStr():'Free Explore'}\n📸 ${G.found.length}/${SPEC.length} bugs${leg?` · ⭐ ${leg} legendary`:''} · 💧${G.dew}\n${rows.join('\n')}\nCan you find them all? ${location.href.split('?')[0]}`}
function endGame(){if(state!='play')return;state='end';SV.d.runs++;if(G.daily){let k=todayStr();SV.d.best[k]=Math.max(SV.d.best[k]||0,G.found.length)}SV.save();MU.set('rain',0);
 let n=G.found.length;$('eTitle').textContent=n==SPEC.length?'Master Naturalist!':n>=12?'Bug Expert!':n>=6?'Great Explorer!':G.hearts<=0?'Lottie needs a rest':'Trail complete!';
 $('eSub').innerHTML=`I discovered <b>${n}/${SPEC.length}</b> bugs! · 💧 ${G.dew} dewdrops`+(G.daily?`<br><span class="small">Daily Trail ${todayStr()} · best today: ${SV.d.best[todayStr()]}</span>`:'');
 $('eGridEmoji').innerHTML=shareText().split('\n').slice(2,5).join('<br>');fillGrid($('eGrid'));$('eCopied').textContent='';$('sEnd').classList.remove('hide');$('hud').style.opacity=0;S.chime(n>=12?2:1)}
$('bShare').onclick=()=>{S.pop();const s=shareText();const done=()=>$('eCopied').textContent='Copied! Paste it in your group chat 📲';if(navigator.share&&/Mobi/.test(navigator.userAgent)){navigator.share({text:s}).catch(()=>{})}else if(navigator.clipboard)navigator.clipboard.writeText(s).then(done,()=>prompt('Copy this:',s));else prompt('Copy this:',s)};
$('bAgain').onclick=()=>{$('sEnd').classList.add('hide');start(G.daily)};$('bMenu').onclick=()=>{$('sEnd').classList.add('hide');toTitle()};
// ===== Hats =====
function hatPortrait(id){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.scale(2,2);g.translate(32,34);g.rotate(-Math.PI/2);g.scale(2,2);g.translate(-10,0);drawLottie(g,1,0,id,false);return c}
function openHats(){$('hatDew').textContent=`You have 💧 ${SV.d.dew} dewdrops`;const L=$('hatList');L.innerHTML='';for(const h of HATS){const own=SV.d.hats.includes(h.id),d=document.createElement('div');d.className='hat'+(SV.d.hat==h.id?' sel':'')+(own?'':' lock');d.appendChild(hatPortrait(h.id));d.insertAdjacentHTML('beforeend',`<div><b>${h.n}</b></div><div>${own?(SV.d.hat==h.id?'Wearing':'Wear'):'💧 '+h.p}</div>`);
 d.onclick=()=>{S.init();if(own){SV.d.hat=h.id;S.pop()}else if(SV.d.dew>=h.p){SV.d.dew-=h.p;SV.d.hats.push(h.id);SV.d.hat=h.id;S.chime(1)}else{toast('Not enough dewdrops yet 💧');return}SV.save();openHats();titleStats()};L.appendChild(d)}$('sHats').classList.remove('hide')}
// ===== Sound panel =====
const sp=document.createElement('div');sp.className='screen hide dim';sp.id='sSound';sp.innerHTML=`<div class="parch"><h2>🎵 Sound</h2><p>Music <input type="range" id="vM" min="0" max="1" step=".05"></p><p>Sounds <input type="range" id="vS" min="0" max="1" step=".05"></p><div class="row"><button class="b n" id="bMuteAll">🔇 Mute all</button><button class="b" data-close="sSound">Done</button></div></div>`;document.body.appendChild(sp);
let muted=false,prevState=null;$('vM').value=MU.vol.music;$('vS').value=MU.vol.sfx;$('vM').oninput=e=>MU.setVol('music',+e.target.value);$('vS').oninput=e=>MU.setVol('sfx',+e.target.value);
$('bMuteAll').onclick=()=>{muted=!muted;S.toggle();MU.mute(muted);$('bMuteAll').textContent=muted?'🔊 Unmute':'🔇 Mute all';$('bMute').textContent=muted?'🔇':'🔊'};
$('bMute').onclick=()=>{S.init();MU.start();S.pop();if(state=='play'){prevState='play';state='journal'}$('sSound').classList.remove('hide')};
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>{S.pop();$(b.dataset.close).classList.add('hide');if(b.dataset.close=='sSound'&&prevState){state=prevState;prevState=null}}));
$('bDN').onclick=()=>{S.pop();manualN=(manualN==null?(N<.5?1:0):(manualN?0:1));$('bDN').textContent=manualN?'☀️':'🌙'};
$('bJournal').onclick=openJournal;
// ===== Flow =====
function titleStats(){let b=SV.d.best[todayStr()];$('tStats').innerHTML=`💧 ${SV.d.dew} dewdrops · 📖 ${SV.d.seen.length}/${SPEC.length} species seen${b!=null?` · today's best: ${b}/${SPEC.length}`:''}`}
function start(daily){S.init();MU.start();S.pop();newGame(daily);$('sTitle').classList.add('hide');$('hud').style.opacity=1;state='play';toast(daily?`🌅 Daily Trail ${todayStr()}: same bugs & map for everyone today!`:'🍃 Free Explore: a fresh new forest floor.',3000)}
function toTitle(){state='title';G=null;buildWorld(1);$('hud').style.opacity=0;$('sTitle').classList.remove('hide');titleStats()}
$('bDaily').onclick=()=>start(true);$('bFree').onclick=()=>start(false);$('bHats').onclick=openHats;$('bHelp').onclick=()=>{S.init();S.pop();$('sHelp').classList.remove('hide')};
// ===== Autopilot (testing: ?autotest) =====
function autoPilot(){const P=G.P;let c=G.bugs.filter(b=>!G.found.includes(b.s.id)&&b.vis>.6&&b.flee<=0&&!b.gone).sort((a,b)=>dist(a.x,a.y,P.x,P.y)-dist(b.x,b.y,P.x,P.y))[0];if(!c)return[Math.sin(G.el),Math.cos(G.el*.7),false];
 let dx=c.x-P.x,dy=c.y-P.y,d=Math.hypot(dx,dy);if(G.bird.st=='warn'&&dist(G.bird.x,G.bird.y,P.x,P.y)<90){return[-(G.bird.x-P.x),-(G.bird.y-P.y),false]}
 if(d<30)return[0,0,true];return[dx,dy,d<RAR[c.s.r].fl+40]}
// ===== Boot =====
bakeAll();const tex=new Image();tex.onload=()=>{GROUND=bakeGround(tex)};tex.onerror=()=>{GROUND=bakeGround(null)};tex.src='assets/ground.jpg';
toTitle();requestAnimationFrame(loop);
if(AT){const q=location.search;setTimeout(()=>{start(!/free/.test(q));if(/night/.test(q)){manualN=1;N=1}if(/fast/.test(q)){G.time=40}},600)}
/*__V3__*/
window.__tt={get G(){return G},get state(){return state},SPEC};
// ===== v3: painted sprites =====
const IMG={};const SPRN=['ladybug','ant','strider','lottie_up','lottie_dl','lottie_dr','lottie_l','butterfly','bumblebee','goldstag','firefly','dragonfly','grasshopper','luna','snail','mantis','cricket','caterpillar','rhino','greenbeetle','woodlouse','spider','bigclover','clover','mush','mushcluster','fern','flower_pink','flower_yellow','flower_blue','stone','leaf1','leaf2','lily','dew','reed','log'];
// species remap to painted art (common = natural, no props where possible)
Object.assign(SPI.honeybee,{n:'Green Ground Beetle',b:['woods','log'],mv:'walk',sz:1,sp:.8,day:0,f:'Ground beetles hunt slugs and snails at night, making them a gardener\'s best friend.'});
Object.assign(SPI.stag,{n:'Rhinoceros Beetle',f:'Rhinoceros beetles can lift about 850 times their own weight, making them one of the strongest animals for their size.'});
Object.assign(SPI.jewel,{n:'Golden Stag Beetle',f:'A rare golden colour form! Its shine comes from tiny layered structures in the shell, just like a soap bubble.'});
Object.assign(SPI.butterfly,{n:'Orange Fritillary',f:'Butterflies taste with their feet, and see colours that humans can\'t.'});
const SMAP={ladybug:'ladybug',ant:'ant',strider:'strider',honeybee:'greenbeetle',stag:'rhino',jewel:'goldstag',butterfly:'butterfly',bumblebee:'bumblebee',firefly:'firefly',dragonfly:'dragonfly',grasshopper:'grasshopper',luna:'luna',snail:'snail',mantis:'mantis',cricket:'cricket',caterpillar:'caterpillar',woodlouse:'woodlouse'};
// natural facing of each painting: -1 head left, 1 head right, 0 front
const FACE={ladybug:-1,ant:-1,strider:-1,greenbeetle:-1,rhino:-1,goldstag:1,butterfly:0,bumblebee:-1,firefly:-1,dragonfly:1,grasshopper:1,luna:0,snail:1,mantis:-1,cricket:-1,caterpillar:-1,woodlouse:-1,spider:0};
const FLAP={butterfly:'wing',luna:'wing',bumblebee:'buzz',dragonfly:'buzz',firefly:'buzz'};
let SPRITES_OK=false;
function loadSprites(){let n=0;SPRN.forEach(k=>{const im=new Image();im.onload=()=>{IMG[k]=im;if(++n==SPRN.length)onSprites()};im.onerror=()=>{if(++n==SPRN.length)onSprites()};im.src='assets/sprites/'+k+'.png'})}
function SP(k,h){const im=IMG[k];return im?{img:im,w:im.width*h/im.height,h}:null}
function onSprites(){SPRITES_OK=true;const set=(k,list)=>{const L=list.filter(Boolean);if(L.length)SPR[k]=L};
 set('clover',[SP('clover',62),SP('clover',50)]);set('bigclover',[SP('bigclover',125)]);set('mush',[SP('mush',80),SP('mushcluster',70),SP('mush',90),SP('mushcluster',80)]);
 set('fern',[SP('fern',120)]);set('flower',[SP('flower_pink',34),SP('flower_yellow',32),SP('flower_blue',32)]);set('pebble',[SP('stone',40),SP('stone',30)]);
 set('leafd',[SP('leaf1',40),SP('leaf2',42)]);set('lily',[SP('lily',46),SP('lily',38)]);set('reed',[SP('reed',110)]);set('log',[SP('log',200)]);
 // soft blurred foreground leaves from painted clovers/ferns (fixes old green smear)
 SPR.fg=['bigclover','fern','clover','bigclover'].map((k,i)=>{const im=IMG[k];if(!im)return SPR.fg[i];return bake(300,300*im.height/im.width,(c,w,h)=>{c.globalAlpha=.9;c.drawImage(im,0,0,w,h)},7)});
 for(const d of DECOR)if(d.k=='log')d.s=1.25}
const _dewR=8;
function drawImgC(im,w,h,flip){x.save();if(flip)x.scale(-1,1);x.drawImage(im,-w/2,-h,w,h);x.restore()}
drawDecor=function(d,t){const arr=SPR[d.k],sp=arr[d.v%arr.length];x.save();x.translate(d.x,d.y);let sway=(d.k=='grass'||d.k=='reed'||d.k=='flower'||d.k=='fern'||d.k=='clover')?Math.sin(t/900+d.x*.01)*.04:0;
 if(G&&d.k!='log'){let dp=dist(d.x,d.y,G.P.x,G.P.y);if(dp<40)sway+=(d.x<G.P.x?-1:1)*.15*(1-dp/40)}
 x.transform(1,0,sway,1,0,0);let sc=d.s*(sp.img.tagName=='IMG'?1:.68);x.scale(sc*(d.fl?-1:1),sc);
 if(G&&(d.k=='bigclover'||d.k=='mush'||d.k=='fern')&&G.P.y<d.y&&G.P.y>d.y-sp.h*sc&&Math.abs(G.P.x-d.x)<sp.w*sc*.35)x.globalAlpha=.55;
 if(sp.img.tagName=='IMG')shadowE(x,0,-2,sp.w*.45,sp.w*.12,.28);
 x.drawImage(sp.img,-sp.w/2,-sp.h,sp.w,sp.h);x.restore()};
const _drawBugE=drawBugE;
drawBugE=function(b,t){const s=b.s,k=SMAP[s.id],im=IMG[k];if(!im)return _drawBugE(b,t);
 let a=b.vis;if(s.id=='mantis')a*=.9;x.save();x.globalAlpha=a;const h=40*s.sz*(s.mv=='flutter'?1.1:1);const w=im.width*h/im.height;
 shadowE(x,b.x,b.y+2,w*.4*(1-b.alt/90),w*.12,.3*(1-b.alt/70));
 if(b.vx!==0||b.mov){let dx=Math.cos(b.a);if(Math.abs(dx)>.2)b.fd=dx>0?1:-1}const fd=b.fd||1,face=FACE[k]||0,flip=face&&fd!=face;
 const moving=b.mov||b.flee>0;let bob=moving?Math.abs(Math.sin(b.t*10))*2:0,sx=1,sy=1,rot=0;
 if(FLAP[k]=='wing'){let f=Math.abs(Math.sin(b.t*(s.id=='luna'?5:7)));sx=.55+.45*f;sy=1-.04*f}else if(FLAP[k]=='buzz'){sy=1+Math.sin(b.t*50)*.03;rot=Math.sin(b.t*3)*.05}
 else{let q=moving?Math.sin(b.t*12)*.05:Math.sin(b.t*2)*.02;sx=1+q;sy=1-q;rot=moving?Math.sin(b.t*10)*.04:0}
 if(s.mv=='sway')rot=Math.sin(b.t*1.8)*.06;if(s.mv=='hop'&&b.alt>1){sy=1.1;sx=.92}
 x.translate(b.x,b.y-b.alt-bob);x.rotate(rot);x.scale(sx*(flip?-1:1),sy);x.drawImage(im,-w/2,-h,w,h);
 if(s.id=='firefly'){let g=.5+.5*Math.sin(t/300+b.hx);x.globalCompositeOperation='lighter';let gr=x.createRadialGradient(w*(-.08),-h*.22,0,w*(-.08),-h*.22,h*.5);gr.addColorStop(0,`rgba(230,255,120,${.5*g})`);gr.addColorStop(1,'rgba(230,255,120,0)');x.fillStyle=gr;x.fillRect(-w,-h*1.2,w*2,h*1.6)}
 x.restore()};
const _drawPlayer=drawPlayer;
drawPlayer=function(P,t){if(!IMG.lottie_l)return _drawPlayer(P,t);if(G.inv>0&&Math.floor(t/90)%2)return;
 const vx=P.vx,vy=P.vy,sp=P.speed;if(Math.abs(vx)>20)P.fd=vx>0?1:-1;const fd=P.fd||1;let k,flip=false;
 if(sp>20&&vy<-Math.abs(vx)*1.1)k='lottie_up';else if(sp>20&&vy>Math.abs(vx)*1.1)k=fd>0?'lottie_dr':'lottie_dl';else{k='lottie_l';flip=fd>0}
 if(sp<=20&&P.lastK)({k,flip}=P.lastK);P.lastK={k,flip};
 const im=IMG[k],h=88,w=im.width*h/im.height;shadowE(x,P.x,P.y+2,w*.42,w*.14,.38);
 let ph=P.walk*2.2,moving=sp>20,bob=moving?Math.abs(Math.sin(ph))*(P.sneak?1.5:3.5):Math.sin(t/500)*.6,q=moving?Math.sin(ph*2)*.045:Math.sin(t/600)*.015;
 x.save();x.translate(P.x,P.y-bob);x.rotate(moving?Math.sin(ph)*.05:0);x.scale((1+q)*(flip?-1:1),(1-q)*(P.sneak?.94:1));if(P.hidden)x.globalAlpha=.78;x.drawImage(im,-w/2,-h,w,h);
 if(SV.d.hat!='safari'){x.save();x.translate((k=='lottie_up'?0:(k=='lottie_l'?-3:3))*1,-h*.86);x.rotate(-Math.PI/2);x.scale(1.5,1.5);x.translate(-10,0);drawHat(x,SV.d.hat,t/1000);x.restore()}
 x.restore();if(P.sneak&&moving){x.font='15px Georgia';x.textAlign='center';x.fillStyle='rgba(255,250,230,.85)';x.fillText('🤫',P.x,P.y-h-6)}};
const _drawSpiderE=drawSpiderE;
drawSpiderE=function(s,t){const im=IMG.spider;if(!im)return _drawSpiderE(s,t);const h=56,w=im.width*h/im.height;shadowE(x,s.x,s.y+2,w*.4,w*.12,.35);
 let dx=Math.cos(s.a);if(Math.abs(dx)>.2)s.fd=dx>0?1:-1;let ph=s.t*(s.chase?16:6),q=Math.sin(ph)*.05;x.save();x.translate(s.x,s.y-Math.abs(Math.sin(ph))*2);x.scale((1+q)*((s.fd||1)>0?-1:1),1-q);x.drawImage(im,-w/2,-h,w,h);x.restore()};
const _drawDew=drawDew;
drawDew=function(d,t){const im=IMG.dew;if(!im)return _drawDew(d,t);let bob=Math.sin(t/400+d.t)*2,r=d.v>1?20:14;shadowE(x,d.x,d.y+2,r*.5,r*.18,.25);x.save();x.translate(d.x,d.y-bob);if(d.v>1){x.fillStyle='rgba(255,220,90,.35)';x.beginPath();x.arc(0,-r/2,r*.55,0,TAU);x.fill()}x.drawImage(im,-r/2,-r,r,r);x.restore()};
const _portrait=portrait;
portrait=function(id,w=240,h=170,t=1,bg=true,sil=false){const k=SMAP[id],im=IMG[k];if(!im)return _portrait(id,w,h,t,bg,sil);const c=_portrait(id,w,h,t,bg,false),g=c.getContext('2d');
 if(bg){g.setTransform(1,0,0,1,0,0);let gr=g.createRadialGradient(c.width/2,c.height/2,10,c.width/2,c.height/2,c.width*.7);let lg=SPI[id].r=='legendary';gr.addColorStop(0,lg?'#fffbe0':'#fff3c0');gr.addColorStop(.5,lg?'#f0c050':'#c8d880');gr.addColorStop(1,lg?'#8a5a10':'#6a8a30');g.fillStyle=gr;g.fillRect(0,0,c.width,c.height)}else{g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,c.width,c.height)}
 let sc=Math.min(c.width*.85/im.width,c.height*.85/im.height);g.drawImage(im,(c.width-im.width*sc)/2,(c.height-im.height*sc)/2,im.width*sc,im.height*sc);
 if(sil){g.globalCompositeOperation='source-in';g.fillStyle='rgba(60,45,20,.45)';g.fillRect(0,0,c.width,c.height)}return c};
const _title=drawTitleArt;
drawTitleArt=function(t){if(!IMG.lottie_dr)return _title(t);if(W<520)return;t/=1000;const im=IMG.lottie_dr,h=Math.min(W,H)*.42,w=im.width*h/im.height,bob=Math.abs(Math.sin(t*2.2))*6;
 x.save();x.translate(W*.15,H*.93);shadowE(x,0,0,w*.45,w*.12,.4);x.translate(0,-bob);x.drawImage(im,-w/2,-h,w,h);x.restore();
 const b=IMG.butterfly,d=IMG.dragonfly;if(b){let f=.55+.45*Math.abs(Math.sin(t*6));x.save();x.translate(W*.86,H*.32+Math.sin(t*1.3)*12);x.scale(f,1);x.drawImage(b,-60,-60,120,120*b.height/b.width);x.restore()}
 if(d){x.save();x.translate(W*.83,H*.62+Math.sin(t*2)*6);x.rotate(-.1);x.drawImage(d,-70,-50,140,140*d.height/d.width);x.restore()}};
// ===== v4: readability + hats on painted Lottie =====
function drawHatPainted(c,id,w,h,t){const bw=w*.8,bh=h*.36,top=-h;c.save();
 if(id=='flower'){for(let i=0;i<7;i++){let px=-bw*.36+i*bw*.12,py=top+bh*.62+Math.sin(i*1.3)*bh*.04;egg(c,px,py,bw*.07,bw*.07,['#fff4f8','#ffc0d8','#fff0a0','#d8c8ff'][i%4],'#d090a8',.4);c.fillStyle='#f0c020';c.beginPath();c.arc(px,py,bw*.025,0,TAU);c.fill()}}
 else if(id=='crown'){c.fillStyle='rgba(240,190,40,.9)';c.fillRect(-bw*.3,top+bh*.5,bw*.6,bh*.1);c.fillStyle='#f5c838';c.strokeStyle='#8a6a10';c.lineWidth=1.5;let cy=top+bh*.08,cw=bw*.34;c.beginPath();c.moveTo(-cw/2,cy);for(let i=0;i<=4;i++){c.lineTo(-cw/2+i*cw/4,cy-(i%2?bh*.12:bh*.32))}c.lineTo(cw/2,cy);c.closePath();c.fill();c.stroke();egg(c,0,cy-bh*.08,bw*.03,bw*.03,'#ff6a8a','#a01a3a',.6)}
 else{const domeY=top+bh*.92,rx=bw*.56,ry=bh*.95;
  if(id=='mush'){let g=c.createRadialGradient(-rx*.3,domeY-ry*.7,2,0,domeY-ry*.3,rx*1.2);g.addColorStop(0,'#ff8a6a');g.addColorStop(1,'#a8200e');c.fillStyle=g;c.beginPath();c.ellipse(0,domeY,rx,ry,0,Math.PI,0);c.quadraticCurveTo(0,domeY+ry*.18,-rx,domeY);c.fill();c.strokeStyle=OUT;c.lineWidth=1.5;c.stroke();c.fillStyle='#fff3e0';[[-.5,-.35,.1],[.1,-.65,.09],[.5,-.3,.11],[-.15,-.2,.07],[.3,-.8,.06]].forEach(p=>{c.beginPath();c.ellipse(p[0]*rx,domeY+p[1]*ry,p[2]*rx,p[2]*rx*.7,0,0,TAU);c.fill()})}
  else if(id=='acorn'){let g=c.createLinearGradient(0,domeY-ry,0,domeY);g.addColorStop(0,'#c89858');g.addColorStop(1,'#6a4418');c.fillStyle=g;c.beginPath();c.ellipse(0,domeY,rx*.92,ry*.85,0,Math.PI,0);c.closePath();c.fill();c.strokeStyle=OUT;c.lineWidth=1.5;c.stroke();c.save();c.clip();c.strokeStyle='rgba(60,35,10,.5)';c.lineWidth=1;for(let i=-6;i<=6;i++){c.beginPath();c.moveTo(i*rx*.18,domeY);c.lineTo(i*rx*.18+rx*.5,domeY-ry);c.moveTo(i*rx*.18,domeY);c.lineTo(i*rx*.18-rx*.5,domeY-ry);c.stroke()}c.restore();c.fillStyle='#5a3a14';c.fillRect(-rx*.06,domeY-ry*.85-bh*.22,rx*.12,bh*.24)}
  else if(id=='leaf'){c.translate(0,domeY-ry*.45);c.rotate(-.12+Math.sin(t*2)*.05);let g=c.createLinearGradient(0,-ry,0,ry*.4);g.addColorStop(0,'#b8e070');g.addColorStop(1,'#3e7a1c');c.fillStyle=g;c.beginPath();c.moveTo(-rx*1.15,ry*.25);c.quadraticCurveTo(-rx*.4,-ry*1.25,rx*1.2,-ry*.1);c.quadraticCurveTo(rx*.2,ry*.55,-rx*1.15,ry*.25);c.fill();c.strokeStyle='#2e5a14';c.lineWidth=1.5;c.stroke();c.beginPath();c.moveTo(-rx*1.1,ry*.22);c.quadraticCurveTo(0,-ry*.2,rx*1.15,-ry*.1);c.stroke()}
  else if(id=='wizard'){let g=c.createLinearGradient(-rx,0,rx,0);g.addColorStop(0,'#5a3ab0');g.addColorStop(1,'#2e1a68');c.fillStyle=g;c.beginPath();c.ellipse(0,domeY-ry*.08,rx*1.08,ry*.2,0,0,TAU);c.fill();c.stroke;c.beginPath();c.moveTo(-rx*.62,domeY-ry*.12);c.quadraticCurveTo(-rx*.2,domeY-ry*1.2,rx*.45,domeY-ry*1.75);c.quadraticCurveTo(rx*.1,domeY-ry*.9,rx*.62,domeY-ry*.12);c.closePath();c.fill();c.strokeStyle=OUT;c.lineWidth=1.5;c.stroke();c.fillStyle='#ffe060';for(let i=0;i<5;i++){let px=-rx*.35+i*rx*.18,py=domeY-ry*(.3+i*.25);c.beginPath();for(let k=0;k<10;k++){let a=k/10*TAU-Math.PI/2,r=k%2?2:5;c.lineTo(px+Math.cos(a)*r,py+Math.sin(a)*r)}c.fill()}}}
 c.restore()}
drawPlayer=function(P,t){if(!IMG.lottie_l)return _drawPlayer(P,t);if(G.inv>0&&Math.floor(t/90)%2)return;
 const vx=P.vx,vy=P.vy,sp=P.speed;if(Math.abs(vx)>20)P.fd=vx>0?1:-1;const fd=P.fd||1;let k,flip=false;
 if(sp>20&&vy<-Math.abs(vx)*1.1)k='lottie_up';else if(sp>20&&vy>Math.abs(vx)*1.1)k=fd>0?'lottie_dr':'lottie_dl';else{k='lottie_l';flip=fd>0}
 if(sp<=20&&P.lastK)({k,flip}=P.lastK);P.lastK={k,flip};
 const im=IMG[k],h=106,w=im.width*h/im.height;
 // contact shadow
 shadowE(x,P.x,P.y+1,w*.36,w*.1,.55);shadowE(x,P.x,P.y+2,w*.6,w*.2,.2);
 let ph=P.walk*2.2,moving=sp>20,bob=moving?Math.abs(Math.sin(ph))*(P.sneak?1.5:3.5):Math.sin(t/500)*.6,q=moving?Math.sin(ph*2)*.045:Math.sin(t/600)*.015;
 x.save();x.translate(P.x,P.y-bob);x.rotate(moving?Math.sin(ph)*.05:0);x.scale((1+q)*(flip?-1:1),(1-q)*(P.sneak?.94:1));if(P.hidden)x.globalAlpha=.8;
 // warm rim glow
 x.shadowColor=N>.5?'rgba(255,200,120,.9)':'rgba(255,236,170,.95)';x.shadowBlur=12*zoom*DPR;x.drawImage(im,-w/2,-h,w,h);x.shadowBlur=0;x.shadowColor='transparent';x.drawImage(im,-w/2,-h,w,h);
 if(SV.d.hat!='safari')drawHatPainted(x,SV.d.hat,w,h,t/1000);
 x.restore();if(P.sneak&&moving){x.font='15px Georgia';x.textAlign='center';x.fillStyle='rgba(255,250,230,.85)';x.fillText('🤫',P.x,P.y-h-8)}};
const _bugE3=drawBugE;
drawBugE=function(b,t){x.save();if(!G||!G.found.includes(b.s.id)){x.shadowColor='rgba(255,250,215,.85)';x.shadowBlur=7*zoom*DPR}_bugE3(b,t);x.restore();
 if(G&&!G.found.includes(b.s.id)&&b.vis>.5){let k=(t/1000+b.hx*.01)%2.2;if(k<.5){let a=Math.sin(k/.5*Math.PI),px=b.x+Math.sin(b.hx)*14,py=b.y-b.alt-38*b.s.sz;x.save();x.globalCompositeOperation='lighter';x.fillStyle=`rgba(255,245,200,${a*.9})`;x.translate(px,py);x.rotate(t/400);x.beginPath();for(let i=0;i<8;i++){let r=i%2?1.5:6*a;x.lineTo(Math.cos(i*Math.PI/4)*r,Math.sin(i*Math.PI/4)*r)}x.fill();x.restore()}}};
const _decor4=drawDecor;
drawDecor=function(d,t){if(!G)return _decor4(d,t);const P=G.P,dx=Math.abs(d.x-P.x),dy=d.y-P.y;x.save();
 const arr=SPR[d.k],sp=arr[d.v%arr.length];if(d.k!='log'&&dy>0&&dy<sp.h*d.s+30&&dx<sp.w*d.s*.5+20)x.globalAlpha=.42;
 if(N>.5&&(d.k=='grass'||d.k=='leafd'))x.globalAlpha*=.6;_decor4(d,t);x.restore()};
// gentle spotlight around Lottie (screen space), drawn by wrapping minimap call (after world lighting)
const _mm=drawMinimap;drawMinimap=function(){if(G){let px=(G.P.x-cam.x)*zoom+W/2,py=(G.P.y-40-cam.y)*zoom+H/2,r=Math.min(W,H)*.32;let g=x.createRadialGradient(px,py,r*.45,px,py,r*1.6);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,N>.5?'rgba(5,10,25,.28)':'rgba(40,25,5,.2)');x.fillStyle=g;x.fillRect(0,0,W,H)}_mm()};
// hats portrait uses painted Lottie
hatPortrait=function(id){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');const im=IMG.lottie_dr;if(!im){g.scale(2,2);g.translate(32,34);g.rotate(-Math.PI/2);g.scale(2,2);g.translate(-10,0);drawLottie(g,1,0,id,false);return c}
 const h=118,w=im.width*h/im.height;g.translate(64,124);g.drawImage(im,-w/2,-h,w,h);if(id!='safari')drawHatPainted(g,id,w,h,1);return c};
loadSprites();
