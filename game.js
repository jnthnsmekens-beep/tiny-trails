const SAFE={l:0,r:0,t:0,b:0};(()=>{const p=document.createElement('div');p.style.cssText='position:fixed;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)';const rd=()=>{if(!document.body)return;if(!p.isConnected)document.body.appendChild(p);const c=getComputedStyle(p);SAFE.t=parseFloat(c.paddingTop)||0;SAFE.r=parseFloat(c.paddingRight)||0;SAFE.b=parseFloat(c.paddingBottom)||0;SAFE.l=parseFloat(c.paddingLeft)||0};addEventListener('resize',rd);addEventListener('orientationchange',()=>setTimeout(rd,300));if(document.body)rd();else addEventListener('DOMContentLoaded',rd)})();
'use strict';
// ===== Tiny Trails v2 =====
const $=id=>document.getElementById(id);
const cv=$('c'),x=cv.getContext('2d');let W,H,DPR;
function resize(){DPR=Math.min(2,devicePixelRatio||1);W=innerWidth;H=innerHeight;cv.width=W*DPR;cv.height=H*DPR;cv.style.width=W+'px';cv.style.height=H+'px'}
resize();addEventListener('resize',resize);
const TAU=Math.PI*2,lerp=(a,b,t)=>a+(b-a)*t,clamp=(v,a,b)=>v<a?a:v>b?b:v,sm=(a,b,v)=>{v=clamp((v-a)/(b-a),0,1);return v*v*(3-2*v)},dist=(a,b,c,d)=>Math.hypot(a-c,b-d);
function mulberry(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
let rnd=Math.random;const fx=Math.random; // fx = cosmetic randomness (never seeded)
const MW=5600,MH=5600,SESSION=150;
// ===== Save =====
const SV=(()=>{let d={dew:0,hats:['safari'],hat:'safari',seen:[],best:{},runs:0};try{Object.assign(d,JSON.parse(localStorage.tt2||'{}'))}catch(e){}return{d,save(){try{localStorage.tt2=JSON.stringify(d)}catch(e){}}}})();
// ===== Audio (all synthesized) =====
const S=(()=>{let A,M,BG,RAIN,muted=false,ft=0,nt=0;const o={};
function nbuf(sec,brown=true){let b=A.createBuffer(1,A.sampleRate*sec,A.sampleRate),d=b.getChannelData(0),l=0;for(let i=0;i<d.length;i++){let w=Math.random()*2-1;if(brown){l=(l+.02*w)/1.02;d[i]=l*3.5}else d[i]=w}return b}
function env(g,t,a,p,r){g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(p,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+r)}
function tone(f,t,v,r,type='sine'){let os=A.createOscillator(),g=A.createGain();os.type=type;os.frequency.value=f;env(g,t,.005,v,r);os.connect(g).connect(M);os.start(t);os.stop(t+r+.1)}
function burst(t,v,r,ftype,freq,q=1){let s=A.createBufferSource();s.buffer=nbuf(r+.05,false);let f=A.createBiquadFilter();f.type=ftype;f.frequency.value=freq;f.Q.value=q;let g=A.createGain();env(g,t,.003,v,r);s.connect(f).connect(g).connect(M);s.start(t)}
o.init=()=>{if(A){if(A.state!='running')A.resume().catch(()=>{});if(o.el&&o.el.paused)o.el.play().catch(()=>{});return}try{A=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return}
 M=A.createGain();M.gain.value=muted?0:.55;let lp=A.createBiquadFilter();lp.type='lowpass';lp.frequency.value=5000;let comp=A.createDynamicsCompressor();M.connect(lp).connect(comp);if(IOS&&A.createMediaStreamDestination){try{const d=A.createMediaStreamDestination();comp.connect(d);const el=document.createElement('audio');el.setAttribute('playsinline','');el.srcObject=d.stream;el.play().catch(()=>{});o.el=el}catch(e){comp.connect(A.destination)}}else comp.connect(A.destination);
 try{const b=A.createBuffer(1,1,22050),src=A.createBufferSource();src.buffer=b;src.connect(A.destination);src.start(0)}catch(e){}
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
o.ctx=()=>A;o.out=()=>M;o.toggle=()=>{muted=!muted;if(M)M.gain.setTargetAtTime(muted?0:.55,A.currentTime,.05);return muted};return o})();
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
const IOS=/iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform=='MacIntel'&&navigator.maxTouchPoints>1);
const MU=(()=>{const vol={music:+(SV.d.vm??.5),sfx:+(SV.d.vs??.8)};let on=false,muted=false,unlocked=false;
 const mk=(f,loop,v)=>{const a=new Audio('assets/'+f);a.loop=loop;a.preload='auto';a.playsInline=true;a.setAttribute('playsinline','');a._v=v;return a};
 const L={theme:mk('theme-preview-v3.mp3',1,.6),birds:mk('birds.mp3',1,.5),crick:mk('crickets.mp3',1,.45),rain:mk('rain.mp3',1,.6)},jingle=mk('discovery-jingle-v3.mp3',0,.85);
 const steps=[1,2,3].map(i=>mk(`step${i}.mp3`,0,.35));let mix={theme:1,birds:1,crick:0,rain:0},duck=1,si=0;
 // silent looping element keeps iOS in "playback" category (plays through the silent switch)
 const silent=new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=');silent.loop=true;silent.playsInline=true;silent.setAttribute('playsinline','');
 function setV(el,v){v=clamp(v,0,1);if(IOS){el.muted=v<.02}else{el.muted=false;el.volume=v}}
 function apply(){for(const k in L){let g=k=='theme'?vol.music*duck:vol.sfx;setV(L[k],muted?0:L[k]._v*g*mix[k])}}
 const tryPlay=el=>{try{const p=el.play();if(p&&p.catch)p.catch(()=>{})}catch(e){}};
 return{vol,get unlocked(){return unlocked},
  unlock(){ // MUST be called synchronously inside a user gesture
   if(silent.paused)tryPlay(silent);
   if(!unlocked)for(const el of[jingle,...steps]){el.muted=true;tryPlay(el);el.pause();el.currentTime=0;el.muted=false}
   unlocked=true;this.start()},
  start(){if(!on){on=true}for(const k in L){if(L[k].paused)tryPlay(L[k])}apply()},
  pauseAll(){for(const k in L)L[k].pause();silent.pause()},
  resumeAll(){if(!on)return;tryPlay(silent);for(const k in L)tryPlay(L[k]);apply()},
  set(k,v){if(mix[k]===v)return;mix[k]=v;apply()},apply,
  setVol(k,v){vol[k]=v;SV.d[k=='music'?'vm':'vs']=v;SV.save();apply()},
  jingle(){if(muted)return;duck=.2;apply();jingle.currentTime=0;setV(jingle,.85*Math.max(vol.music,vol.sfx*.6));tryPlay(jingle);setTimeout(()=>{duck=1;apply()},3500)},
  step(){if(muted||!on)return;let a=steps[si++%3];setV(a,a._v*vol.sfx*(.7+fx()*.3));a.playbackRate=.9+fx()*.3;a.currentTime=0;tryPlay(a)},
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
function newGame(daily){const seed=daily?+todayStr().replace(/-/g,''):424242;buildWorld(seed);
 G={daily,seed,el:0,time:SESSION,hearts:3,inv:0,dew:0,found:[],shots:0,P:{x:1600,y:1700,vx:0,vy:0,a:-1.2,walk:0,st:0,hidden:false,slow:1},bugs:[],dews:[],spiders:[],bird:{st:'idle',cd:18},puddles:[],rain:{t:28+rnd()*20,on:0},hint:''};
 for(const s of SPEC){let n={common:6,rare:4,legendary:2}[s.r];if(s.id=='strider'||s.id=='dragonfly')n=2;for(let i=0;i<n;i++){let bk=s.b[i%s.b.length],px,py;
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
 let tgtN=manualN!=null?manualN:dayN(G.el);N+=(tgtN-N)*Math.min(1,dt*1.2);S.night(N);MU.set('birds',1-N*.85);MU.set('crick',sm(.3,.7,N));
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
 checkGoals();
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
 for(const d of nearDecor(FLAT_G,vx0,vy0,vx1,vy1,120)){if(!inV(d)||!SPR[d.k])continue;const sp=SPR[d.k][d.v%SPR[d.k].length];x.save();x.translate(d.x,d.y);if(d.k=='lily')x.translate(0,Math.sin(t/900+d.x)*1.5);x.scale(d.s*(d.fl?-1:1),d.s);x.drawImage(sp.img,-sp.w/2,-sp.h/2,sp.w,sp.h);x.restore()}
 // y-sorted
 const L=[];for(const d of nearDecor(TALL_G,vx0,vy0,vx1,vy1,260))L.push({y:d.y,f:drawDecor,o:d});
 if(G){for(const b of G.bugs)if(b.vis>.02&&inV(b))L.push({y:b.y,f:drawBugE,o:b});for(const d of G.dews)if(!d.got&&inV(d))L.push({y:d.y,f:drawDew,o:d});if(G.items)for(const it of G.items)if((!it.got||it.ft<.7)&&inV(it))L.push({y:it.y,f:drawItem,o:it});for(const s of G.spiders)if(inV(s))L.push({y:s.y,f:drawSpiderE,o:s});L.push({y:P.y,f:drawPlayer,o:P})}
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
 else if(state=='play'){timeScale=lerp(timeScale,1,rdt*4);let dt=rdt*timeScale;update(dt);const P=G.P;let tx=P.x+P.vx*.35,ty=P.y+P.vy*.35-(P.alt||0)*.8,k=1-Math.exp(-rdt*3.2);cam.x=lerp(cam.x,tx,k);cam.y=lerp(cam.y,ty,k);zoom=lerp(zoom,baseZoom()*(P.sneak?1.08:1)*(1-.36*(P.flyK||0)),rdt*2)}
 else if(state=='title'){cam.x=MW/2+Math.sin(now/9000)*600;cam.y=MH/2+Math.cos(now/11000)*500;zoom=baseZoom()}
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
// ===== robust mobile audio unlock =====
try{if(navigator.audioSession)navigator.audioSession.type='playback'}catch(e){}
const hintEl=document.createElement('div');hintEl.id='soundHint';hintEl.textContent='Tap for sound 🔊';hintEl.style.cssText='position:fixed;left:50%;top:62px;transform:translateX(-50%);z-index:20;background:linear-gradient(#8a6a34ee,#55391aee);border:2px solid #f0d58e;color:#fff6dc;font-weight:700;padding:6px 14px;border-radius:20px;box-shadow:0 3px 10px #0006;font-size:15px;cursor:pointer;display:none';document.body.appendChild(hintEl);
function unlockAudio(){S.init();const A=S.ctx&&S.ctx();if(A&&A.state!='running')A.resume().catch(()=>{});MU.unlock();setTimeout(updHint,400)}
function updHint(){const A=S.ctx&&S.ctx();const ok=MU.unlocked&&A&&A.state=='running';hintEl.style.display=ok?'none':'block'}
['touchstart','touchend','pointerdown','click','keydown'].forEach(ev=>document.addEventListener(ev,unlockAudio,{capture:true,passive:true}));
document.addEventListener('visibilitychange',()=>{const A=S.ctx&&S.ctx();if(document.hidden){MU.pauseAll();if(A)A.suspend().catch(()=>{})}else{if(A)A.resume().catch(()=>{});MU.resumeAll();setTimeout(updHint,500)}});
setTimeout(updHint,1500);setInterval(updHint,3000);

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
drawDecor=function(d,t){const arr=SPR[d.k];if(!arr||!arr.length)return;const sp=arr[d.v%arr.length];x.save();x.translate(d.x,d.y);let sway=(d.k=='grass'||d.k=='reed'||d.k=='flower'||d.k=='fern'||d.k=='clover')?Math.sin(t/900+d.x*.01)*.04:0;
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
// ===================== v5: cozy discovery, collectibles, big world =====================
var TALL_G=null,FLAT_G=null;const CELL=400;
function bucket(list){const g=new Map();for(const d of list){const k=(d.x/CELL|0)+','+(d.y/CELL|0);if(!g.has(k))g.set(k,[]);g.get(k).push(d)}return g}
function nearDecor(g,x0,y0,x1,y1,m){if(!g)return[];const out=[];for(let cx=Math.floor((x0-m)/CELL);cx<=Math.floor((x1+m)/CELL);cx++)for(let cy=Math.floor((y0-m)/CELL);cy<=Math.floor((y1+m)/CELL);cy++){const a=g.get(cx+','+cy);if(a)for(const d of a)out.push(d)}return out}
function dayN(el){const ph=(el/300)%1;return sm(.42,.52,ph)-sm(.9,.99,ph)}
// ----- biomes -----
for(const k in BIO)delete BIO[k];
Object.assign(BIO,{
 meadow:{x:2800,y:2800,r:820,c:'#8fae3c',n:'Sunny Meadow',t:null},
 woods:{x:1150,y:1150,r:720,c:'#3d5a2a',n:'Shady Woods',t:'rgba(20,40,22,.38)'},
 pond:{x:2800,y:1050,r:650,wr:360,c:'#4a8aa0',n:'Lily Pond',t:'rgba(60,80,40,.2)'},
 dunes:{x:4500,y:1100,r:760,c:'#e0c88a',n:'Sandy Dunes',t:'rgba(222,196,138,.88)'},
 autumn:{x:1050,y:2850,r:700,c:'#d0782a',n:'Autumn Grove',t:'rgba(190,105,35,.5)'},
 cave:{x:4600,y:2850,r:640,c:'#7a8ab0',n:'Crystal Cave',t:'rgba(90,96,120,.72)'},
 waterfall:{x:3900,y:1950,r:480,wr:120,c:'#3aa08a',n:'Waterfall Glade',t:'rgba(40,140,110,.3)'},
 log:{x:1150,y:4500,r:680,c:'#8a6a3a',n:'Old Log',t:'rgba(110,72,32,.38)'},
 pine:{x:2800,y:4650,r:720,c:'#2e5a3a',n:'Pine Forest',t:'rgba(40,58,30,.5)'},
 flowers:{x:4500,y:4500,r:720,c:'#d080b0',n:'Flower Bed',t:'rgba(200,220,110,.18)'}});
inWater=function(px,py,m=0){const p=BIO.pond,w=BIO.waterfall;return dist(px,py,p.x,p.y)<p.wr+m||dist(px,py,w.x,w.y+30)<w.wr+m};
// bugs live in more varied places now
const BB={ladybug:['meadow','flowers','waterfall'],ant:['woods','pine','meadow'],woodlouse:['log','pine'],grasshopper:['meadow','dunes'],honeybee:['woods','cave','log'],snail:['waterfall','pond','log'],caterpillar:['flowers','autumn'],butterfly:['flowers','meadow','waterfall'],dragonfly:['pond','waterfall'],stag:['log','autumn'],strider:['pond'],bumblebee:['flowers','waterfall','meadow'],mantis:['flowers','dunes','meadow'],cricket:['pine','meadow','dunes'],firefly:['autumn','woods','meadow'],luna:['pine','woods'],jewel:['autumn','log','cave']};
for(const k in BB)SPI[k].b=BB[k];
// ----- collectibles -----
const CATS={bug:{n:'Bugs',e:'🐞'},berry:{n:'Berries',e:'🍓'},herb:{n:'Herbs',e:'🌿'},mush:{n:'Mushrooms',e:'🍄'},gem:{n:'Gems',e:'💎'}};
const ITEMS=[
{id:'strawberry',c:'berry',n:'Wild Strawberry',r:'common',b:['meadow','flowers'],f:'Wild strawberries are tiny but intensely sweet, and the "seeds" on the outside are actually its true fruits!'},
{id:'blueberry',c:'berry',n:'Blueberries',r:'common',b:['pine','woods'],f:'Blueberries get their colour from anthocyanins, the same pigments that turn autumn leaves red.'},
{id:'raspberry',c:'berry',n:'Wild Raspberry',r:'rare',b:['autumn','log'],f:'One raspberry is made of about 100 tiny drupelets, each with its own seed.'},
{id:'elderberry',c:'berry',n:'Elderberries',r:'rare',b:['waterfall','woods'],f:'Elderberries must be cooked before eating, and the creamy elderflowers make a fragrant cordial.'},
{id:'mint',c:'herb',n:'Water Mint',r:'common',b:['pond','waterfall'],f:'Mint spreads with underground runners and loves damp soil near water.'},
{id:'thyme',c:'herb',n:'Wild Thyme',r:'common',b:['dunes','meadow'],f:'Thyme thrives in sunny, dry spots, and bees adore its tiny pink flowers.'},
{id:'chamomile',c:'herb',n:'Chamomile',r:'common',b:['meadow','flowers'],f:'Chamomile smells like apples. Its name comes from the Greek for "earth apple".'},
{id:'lavender',c:'herb',n:'Lavender',r:'rare',b:['flowers','dunes'],f:'Lavender\'s scent comes from oils in tiny star-shaped hairs on its leaves and flowers.'},
{id:'chanterelle',c:'mush',n:'Chanterelle',r:'common',b:['autumn','woods'],f:'Chanterelles smell faintly of apricots and have soft ridges instead of true gills.'},
{id:'porcini',c:'mush',n:'Porcini',r:'rare',b:['pine','autumn'],f:'Porcini live in partnership with tree roots, trading minerals for sugars.'},
{id:'morel',c:'mush',n:'Morel',r:'rare',b:['log','autumn'],f:'Morels love spring, and often pop up in great numbers after forest fires.'},
{id:'glowshroom',c:'mush',n:'Ghost Glow Cap',r:'legendary',b:['cave','woods'],night:1,f:'Over 100 kinds of fungi glow in the dark. This eerie light was once called "foxfire". Only visible at night!'},
{id:'amber',c:'gem',n:'Amber',r:'rare',b:['pine','log'],hid:1,f:'Amber is fossilised tree resin, sometimes with ancient insects trapped inside for millions of years.'},
{id:'amethyst',c:'gem',n:'Amethyst',r:'rare',b:['cave','dunes'],hid:1,f:'Amethyst is purple quartz. Its colour comes from traces of iron and natural radiation.'},
{id:'sapphire',c:'gem',n:'Sapphire',r:'legendary',b:['cave'],hid:1,f:'Sapphires are the same mineral as rubies (corundum); only the colour is different.'},
{id:'emerald',c:'gem',n:'Emerald',r:'legendary',b:['cave','waterfall'],hid:1,f:'Emeralds get their deep green from tiny amounts of chromium or vanadium.'}];
const ITEMI={};ITEMS.forEach(i=>ITEMI[i.id]=i);
SV.d.items=SV.d.items||[];SV.d.gems=SV.d.gems||0;
const NEWSPR=['strawberry','blueberry','raspberry','elderberry','mint','thyme','chamomile','lavender','amethyst','sapphire','emerald','amber','chanterelle','porcini','glowshroom','morel','dunegrass','seashell','cactus','crystalrock','leafpile','pinecone','birchstump','blueshroom','waterfall','treeroot','wildflowers','berrybush'];
NEWSPR.forEach(k=>{const im=new Image();im.onload=()=>{IMG[k]=im;reg5()};im.src='assets/sprites/'+k+'.png'});
function reg5(){const S2=(k,list)=>{const L=list.filter(Boolean);if(L.length)SPR[k]=L};
 S2('dunegrass',[SP('dunegrass',70),SP('dunegrass',55)]);S2('seashell',[SP('seashell',26),SP('seashell',20)]);S2('cactus',[SP('cactus',64),SP('cactus',48)]);S2('crystalrock',[SP('crystalrock',90),SP('crystalrock',70)]);
 S2('leafpile',[SP('leafpile',48),SP('leafpile',38)]);S2('pinecone',[SP('pinecone',28),SP('pinecone',22)]);S2('birchstump',[SP('birchstump',70)]);S2('blueshroom',[SP('blueshroom',56),SP('blueshroom',44)]);
 S2('waterfall',[SP('waterfall',150)]);S2('treeroot',[SP('treeroot',120),SP('treeroot',95)]);S2('wildflowers',[SP('wildflowers',58)]);S2('berrybush',[SP('berrybush',64)]);
 S2('grove',[SP('treeroot',120)])}
// ----- world build -----
buildWorld=function(seed){rnd=mulberry(seed);DECOR=[];
 const B=BIO;TRAIL=[[2800,2900],[2800,1500],[2800,1050+420],[3600,1500],[3900,2100],[4500,1500],[4500,1100],[4300,2400],[4600,2850],[4400,3700],[4500,4500],[3600,4300],[2800,4600],[2000,4500],[1150,4500],[1100,3700],[1050,2850],[1100,2000],[1150,1150],[2000,1700],[2800,2900]];
 const add=(k,px,py,s=1)=>DECOR.push({k,v:rnd()*8|0,x:px,y:py,s,fl:rnd()<.5});
 const tab={meadow:[['clover',120],['bigclover',14],['grass',150],['flower',30],['pebble',30],['leafd',30],['mush',8],['wildflowers',14]],
  woods:[['fern',50],['mush',40],['bigclover',8],['clover',30],['leafd',60],['pebble',20],['web',6],['treeroot',8],['blueshroom',6]],
  pond:[['reed',50],['clover',30],['pebble',36],['grass',40],['lily',30],['bigclover',4]],
  dunes:[['dunegrass',70],['seashell',30],['cactus',18],['pebble',30],['grass',10]],
  autumn:[['leafpile',50],['leafd',90],['mush',16],['treeroot',8],['birchstump',6],['fern',10],['berrybush',6]],
  cave:[['crystalrock',26],['pebble',60],['blueshroom',20],['fern',6],['mush',6]],
  waterfall:[['fern',30],['reed',24],['bigclover',8],['clover',30],['wildflowers',10],['pebble',24],['lily',10]],
  log:[['leafd',70],['mush',24],['fern',14],['pebble',20],['clover',20],['grass',20],['birchstump',4],['treeroot',4]],
  pine:[['pinecone',60],['treeroot',14],['fern',26],['birchstump',8],['pebble',20],['mush',10],['berrybush',8]],
  flowers:[['flower',140],['wildflowers',26],['clover',30],['bigclover',6],['grass',30],['berrybush',6]]};
 for(const bk in tab){const b=B[bk];for(const[k,c]of tab[bk])for(let i=0;i<c;i++){
   if(k=='lily'){const w=bk=='pond'?b:B.waterfall;let a=rnd()*TAU,r=40+rnd()*(w.wr-60);add(k,w.x+Math.cos(a)*r,(bk=='pond'?w.y:w.y+30)+Math.sin(a)*r,.8+rnd()*.5);continue}
   if(k=='reed'){const w=bk=='pond'?b:B.waterfall;let a=rnd()*TAU,r=w.wr+rnd()*40-10;add(k,w.x+Math.cos(a)*r,(bk=='pond'?w.y:w.y+30)+Math.sin(a)*r,.8+rnd()*.5);continue}
   let[px,py]=rpIn(bk);if(nearTrail(px,py)<40&&!['leafd','pebble','pinecone','seashell'].includes(k))continue;add(k,px,py,k=='bigclover'?1+rnd()*.3:.75+rnd()*.5)}}
 // filler between biomes so the world never feels empty
 for(let i=0;i<500;i++){let px=80+rnd()*(MW-160),py=80+rnd()*(MH-160);if(inWater(px,py,30))continue;add(['grass','clover','pebble','leafd'][i%4],px,py,.7+rnd()*.5)}
 DECOR.push({k:'log',v:0,x:B.log.x,y:B.log.y+40,s:1.25,fl:false});DECOR.push({k:'waterfall',v:0,x:B.waterfall.x,y:B.waterfall.y-70,s:1.5,fl:false});
 FLAT=DECOR.filter(d=>['leafd','lily','web'].includes(d.k));TALL=DECOR.filter(d=>!FLAT.includes(d));COVER=[];TALL_G=bucket(TALL);FLAT_G=bucket(FLAT)};
bakeGround=function(tex){GS=.3;const g=document.createElement('canvas');g.width=MW*GS;g.height=MH*GS;const c=g.getContext('2d');c.scale(GS,GS);
 if(tex){const pc=document.createElement('canvas');pc.width=pc.height=512;pc.getContext('2d').drawImage(tex,0,0,512,512);c.fillStyle=c.createPattern(pc,'repeat');c.save();c.scale(1.6,1.6);c.fillRect(0,0,MW,MH);c.restore()}else{c.fillStyle='#6f8a2c';c.fillRect(0,0,MW,MH)}
 const R=mulberry(99);const blob=(px,py,r,col)=>{let gg=c.createRadialGradient(px,py,0,px,py,r);gg.addColorStop(0,col);gg.addColorStop(1,col.replace(/[\d.]+\)$/,'0)'));c.fillStyle=gg;c.beginPath();c.arc(px,py,r,0,TAU);c.fill()};
 for(let i=0;i<900;i++)blob(R()*MW,R()*MH,60+R()*170,R()<.5?'rgba(190,200,80,.12)':'rgba(40,60,15,.14)');
 // smooth biome tints
 for(const k in BIO){const b=BIO[k];if(!b.t)continue;let gg=c.createRadialGradient(b.x,b.y,b.r*.35,b.x,b.y,b.r*1.3);gg.addColorStop(0,b.t);gg.addColorStop(.7,b.t.replace(/[\d.]+\)$/,m=>(parseFloat(m)*.6)+')'));gg.addColorStop(1,b.t.replace(/[\d.]+\)$/,'0)'));c.fillStyle=gg;c.fillRect(b.x-b.r*1.4,b.y-b.r*1.4,b.r*2.8,b.r*2.8)}
 const spk=(bk,n,cols,sz,shape)=>{const b=BIO[bk];for(let i=0;i<n;i++){let a=R()*TAU,r=Math.sqrt(R())*b.r*1.05;c.fillStyle=cols[i%cols.length];c.globalAlpha=.55;c.beginPath();if(shape=='line'){c.save();c.translate(b.x+Math.cos(a)*r,b.y+Math.sin(a)*r);c.rotate(R()*3);c.fillRect(-sz,-.8,sz*2,1.6);c.restore()}else c.ellipse(b.x+Math.cos(a)*r,b.y+Math.sin(a)*r,sz*(.5+R()),sz*(.4+R()*.6),R()*3,0,TAU);c.fill()}c.globalAlpha=1};
 spk('dunes',2500,['#f0dca8','#c8a868','#fff0c8','#b89858'],2.5);for(let i=0;i<40;i++){const b=BIO.dunes;let a=R()*TAU,r=Math.sqrt(R())*b.r;c.strokeStyle='rgba(170,140,80,.35)';c.lineWidth=3;c.beginPath();c.arc(b.x+Math.cos(a)*r,b.y+Math.sin(a)*r,40+R()*80,3.6,5.8);c.stroke()}
 spk('autumn',2200,['#e0802a','#c04a18','#f0b040','#8a3a10'],5);spk('pine',2600,['#7a5a2a','#5a3a18','#9a7a3a'],6,'line');spk('cave',1400,['#9aa8c8','#5a6070','#c8d8f0','#7080a0'],4);spk('cave',160,['#a0e8ff','#d0a0ff'],2);
 spk('woods',900,['#2a3a20','#5a4a28'],6);spk('log',900,['#6a4a24','#8a6a3a'],5);spk('waterfall',700,['#6ac8a0','#2a7a5a'],5);
 for(let i=0;i<1500;i++){const b=BIO.flowers;let a=R()*TAU,r=Math.sqrt(R())*b.r;c.fillStyle=['#ffd0e0','#fff4c0','#d8c8ff','#ffffff'][i%4];c.globalAlpha=.6;c.beginPath();c.ellipse(b.x+Math.cos(a)*r,b.y+Math.sin(a)*r,3,2,R()*3,0,TAU);c.fill()}c.globalAlpha=1;
 c.lineCap='round';c.lineJoin='round';for(const[w,col]of[[110,'rgba(120,90,50,.18)'],[70,'rgba(170,130,80,.33)'],[42,'rgba(200,165,110,.42)']]){c.strokeStyle=col;c.lineWidth=w;c.beginPath();TRAIL.forEach(([a,b],i)=>i?c.lineTo(a,b):c.moveTo(a,b));c.stroke()}
 const water=(px,py,wr)=>{blob(px,py,wr+90,'rgba(90,70,40,.5)');let wg=c.createRadialGradient(px-wr*.2,py-wr*.2,10,px,py,wr);wg.addColorStop(0,'#8ac8c8');wg.addColorStop(.6,'#4a90a0');wg.addColorStop(1,'#2a5a60');c.fillStyle=wg;c.beginPath();for(let i=0;i<=40;i++){let a=i/40*TAU,r=wr+Math.sin(a*3)*wr*.04+Math.cos(a*5)*wr*.025;c.lineTo(px+Math.cos(a)*r,py+Math.sin(a)*r)}c.fill();c.strokeStyle='rgba(230,250,240,.35)';c.lineWidth=5;c.stroke()};
 water(BIO.pond.x,BIO.pond.y,BIO.pond.wr);water(BIO.waterfall.x,BIO.waterfall.y+30,BIO.waterfall.wr);return g};
// ----- new game wrapper -----
const _newGame=newGame;
newGame=function(daily){_newGame(daily);const r=mulberry(G.seed+3);G.spiders=[];G.bird={st:'idle',cd:1e12};G.hearts=3;G.time=1e9;
 G.P.x=BIO.meadow.x;G.P.y=BIO.meadow.y+100;cam.x=G.P.x;cam.y=G.P.y;
 for(let i=0;i<220;i++){let bk=Object.keys(BIO)[i%10],[px,py]=rpIn(bk);G.dews.push({x:px,y:py,v:r()<.08?5:1,t:r()*9})}
 G.items=[];G.got=[];const stones=TALL.filter(d=>d.k=='pebble'||d.k=='crystalrock');
 for(const it of ITEMS){if(it.v7)continue;let n={common:9,rare:5,legendary:3}[it.r];for(let i=0;i<n;i++){const bk=it.b[i%it.b.length];let px,py;
   if(it.hid){const cand=stones.filter(d=>biomeAt(d.x,d.y)==bk);if(cand.length){const s=cand[r()*cand.length|0];px=s.x+(r()-.5)*16;py=s.y+6}else[px,py]=rpIn(bk)}else[px,py]=rpIn(bk);
   G.items.push({it,x:px,y:py,t:r()*9,got:false,ft:0,rv:it.hid?0:1})}}
 G.visited=new Set();G.bTimer=0;G.cur='';G.featured=[];G.done=false;
 const fr=mulberry(G.seed+7),pool=[...SPEC.map(s=>({k:'bug',id:s.id,n:s.n})),...ITEMS.map(i=>({k:'item',id:i.id,n:i.n}))];
 if(daily){const pick=[];const bugs=pool.filter(p=>p.k=='bug'&&!SPI[p.id].night),its=pool.filter(p=>p.k=='item'&&!ITEMI[p.id].night&&ITEMI[p.id].r!='legendary'&&!ITEMI[p.id].v7);while(pick.length<2){const c=bugs[fr()*bugs.length|0];if(!pick.includes(c))pick.push(c)}while(pick.length<5){const c=its[fr()*its.length|0];if(!pick.includes(c))pick.push(c)}G.featured=pick}
 FOG.reset();updHUD()};
hurt=function(){};
// ----- fog of war -----
const FOG=(()=>{const N_=112,mc=document.createElement('canvas'),fc=document.createElement('canvas');mc.width=mc.height=fc.width=fc.height=N_;let seen=new Uint8Array(N_*N_),cnt=0;
 function bakeMap(){const c=mc.getContext('2d');c.fillStyle='#6a8a30';c.fillRect(0,0,N_,N_);const s=N_/MW;for(const k in BIO){const b=BIO[k];let g=c.createRadialGradient(b.x*s,b.y*s,0,b.x*s,b.y*s,b.r*s*1.1);g.addColorStop(0,b.c);g.addColorStop(.75,b.c);g.addColorStop(1,b.c+'00');c.fillStyle=g;c.fillRect(0,0,N_,N_)}
  c.fillStyle='#5aa0c0';c.beginPath();c.arc(BIO.pond.x*s,BIO.pond.y*s,BIO.pond.wr*s,0,TAU);c.fill();c.strokeStyle='rgba(230,200,140,.8)';c.lineWidth=1.2;c.beginPath();TRAIL.forEach(([a,b],i)=>i?c.lineTo(a*s,b*s):c.moveTo(a*s,b*s));c.stroke()}
 return{N:N_,map:mc,fog:fc,get pct(){return cnt/(N_*N_)},reset(){bakeMap();seen.fill(0);cnt=0;const c=fc.getContext('2d');c.globalCompositeOperation='source-over';c.fillStyle='#3a2a14';c.fillRect(0,0,N_,N_)},
  reveal(px,py){const s=N_/MW,cx=px*s,cy=py*s,r=6;const c=fc.getContext('2d');c.globalCompositeOperation='destination-out';let g=c.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(.6,'rgba(0,0,0,.9)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.beginPath();c.arc(cx,cy,r,0,TAU);c.fill();
   for(let y=Math.max(0,cy-r|0);y<Math.min(N_,cy+r);y++)for(let x0=Math.max(0,cx-r|0);x0<Math.min(N_,cx+r);x0++)if(!seen[y*N_+x0]&&(x0-cx)**2+(y-cy)**2<r*r*.5){seen[y*N_+x0]=1;cnt++}}}})();
// ----- banners -----
const ban=document.createElement('div');ban.style.cssText='position:fixed;left:50%;top:18%;transform:translate(-50%,-20px);opacity:0;transition:all .7s cubic-bezier(.3,1.4,.5,1);z-index:6;pointer-events:none;text-align:center;color:#fff8e0;text-shadow:0 2px 8px #000a,0 0 20px #ffd88a88;font-style:italic';document.body.appendChild(ban);
function banner(t,sub){ban.innerHTML=`<div style="font-size:clamp(28px,6vw,46px);font-weight:700">${t}</div><div style="font-size:16px;margin-top:4px">${sub||''}</div>`;ban.style.opacity=1;ban.style.transform='translate(-50%,0)';clearTimeout(ban._t);ban._t=setTimeout(()=>{ban.style.opacity=0;ban.style.transform='translate(-50%,-20px)'},2800)}
// ----- per-frame extras -----
const _update=update;
update=function(dt){_update(dt);if(state!='play'&&state!='slowmo')return;const P=G.P;
 G.bTimer-=dt;if(G.bTimer<0){G.bTimer=.3;FOG.reveal(P.x,P.y);const b=biomeAt(P.x,P.y);if(b!=G.cur){G.cur=b;if(!G.visited.has(b)){G.visited.add(b);if(G.visited.size>1||G.el>3){banner('✨ '+BIO[b].n,G.visited.size+'/10 places discovered');S.chime(1)}}}}
 for(const o of G.items){o.t+=dt;if(o.got){o.ft+=dt;continue}const d=dist(o.x,o.y,P.x,P.y);
  if(o.it.hid&&o.rv<1&&d<75){o.rv=Math.min(1,o.rv+dt*2.5);if(o.rv>=1)puff(o.x,o.y,10,'220,230,255',60,.6,3,20)}
  if(o.it.night&&N<.45)continue;if(o.rv>=1&&d<28)collect(o)}};
function collect(o){o.got=true;o.ft=0;o.sx=o.x;o.sy=o.y;const it=o.it;sparkle(o.x,o.y-10,14,it.c=='gem'?'200,220,255':'255,240,190');S.dew();
 const first=!G.got.includes(it.id);if(it.c=='gem'){let g=it.r=='legendary'?2:1;SV.d.gems+=g;G.gems=(G.gems||0)+g;bump('hHearts')}else{let v={common:1,rare:3,legendary:8}[it.r];SV.d.dew+=v;G.dew+=v;bump('hDew')}
 if(first){G.got.push(it.id);const isNew=!SV.d.items.includes(it.id);if(isNew)SV.d.items.push(it.id);G.lastNew=isNew;SV.save();state='slowmo';G.focusBug={x:o.x,y:o.y,alt:0,s:it};G.slow=0;timeScale=.2;S.chime(it.r=='common'?0:it.r=='rare'?1:2);MU.jingle();checkCats(it.c)}
 else{SV.save();toast(`${CATS[it.c].e} +1 ${it.n}`,1400)}updHUD()}
function checkCats(c){const list=c=='bug'?SPEC.map(s=>s.id):ITEMS.filter(i=>i.c==c).map(i=>i.id),have=c=='bug'?G.found:G.got;if(list.every(id=>have.includes(id)))setTimeout(()=>{banner(`${CATS[c].e} ${CATS[c].n} complete!`,'Your journal page is full');S.chime(2)},2600)}
const _snap=snap;snap=function(b){const was=G.found.length;_snap(b);if(G.found.length>was)checkCats('bug')};
function featDone(f){return f.k=='bug'?G.found.includes(f.id):G.got.includes(f.id)}
function checkGoals(){if(!G||!G.daily||G.done||state!='play')return;if(G.featured.length&&G.featured.every(featDone)){G.done=true;setTimeout(()=>{banner('🎯 Daily Trail complete!','All 5 featured finds');endGame()},800)}}
function drawItem(o,t){const it=o.it,im=IMG[it.id];if(!im)return;if(it.night&&N<.45&&!o.got)return;
 let sz={berry:30,herb:34,mush:36,gem:24}[it.c],h=sz,w=im.width*h/im.height,bob=Math.sin(t/500+o.t)*1.5;x.save();
 if(o.got){let k=Math.min(1,o.ft/.6),P=G.P;x.globalAlpha=1-k;x.translate(lerp(o.sx,P.x,k),lerp(o.sy,P.y-70,k)-Math.sin(k*Math.PI)*50);x.scale(1-k*.5,1-k*.5)}
 else{if(it.hid&&o.rv<1){x.restore();if((t/1000+o.t)%2.6<.35){let a=Math.sin(((t/1000+o.t)%2.6)/.35*Math.PI);x.save();x.globalCompositeOperation='lighter';x.fillStyle=`rgba(220,235,255,${a})`;x.translate(o.x,o.y-6);x.rotate(t/300);x.beginPath();for(let i=0;i<8;i++){let r=i%2?1.6:7*a;x.lineTo(Math.cos(i*Math.PI/4)*r,Math.sin(i*Math.PI/4)*r)}x.fill();x.restore()}return}
  shadowE(x,o.x,o.y+1,w*.4,w*.12,.3);x.translate(o.x,o.y-bob);let k=o.rv<1?o.rv:1;x.scale(k,k);if(it.c=='gem'){x.shadowColor='rgba(200,230,255,.9)';x.shadowBlur=10*zoom*DPR}else{x.shadowColor='rgba(255,245,200,.7)';x.shadowBlur=5*zoom*DPR}}
 x.drawImage(im,-w/2,-h,w,h);x.restore()}
// tap to collect nearby items
cv.addEventListener('pointerdown',e=>{if(state!='play'||!G)return;const wx=(e.clientX-W/2)/zoom+cam.x,wy=(e.clientY-H/2)/zoom+cam.y;for(const o of G.items){if(o.got||o.rv<1||(o.it.night&&N<.45))continue;if(dist(o.x,o.y-15,wx,wy)<40&&dist(o.x,o.y,G.P.x,G.P.y)<260){collect(o);break}}});
// ----- portraits for items -----
const _portrait5=portrait;
portrait=function(id,w=240,h=170,t=1,bg=true,sil=false){const it=ITEMI[id];if(!it)return _portrait5(id,w,h,t,bg,sil);const c=document.createElement('canvas');c.width=w*2;c.height=h*2;const g=c.getContext('2d');
 if(bg){let gr=g.createRadialGradient(c.width/2,c.height/2,10,c.width/2,c.height/2,c.width*.7);let lg=it.r=='legendary';gr.addColorStop(0,lg?'#fffbe0':'#fff3c0');gr.addColorStop(.5,lg?'#f0c050':it.c=='gem'?'#b8c8e8':'#c8d880');gr.addColorStop(1,lg?'#8a5a10':it.c=='gem'?'#4a5a8a':'#6a8a30');g.fillStyle=gr;g.fillRect(0,0,c.width,c.height)}
 const im=IMG[id];if(im){let sc=Math.min(c.width*.7/im.width,c.height*.8/im.height);g.drawImage(im,(c.width-im.width*sc)/2,(c.height-im.height*sc)/2,im.width*sc,im.height*sc)}
 if(sil){g.globalCompositeOperation='source-in';g.fillStyle='rgba(60,45,20,.45)';g.fillRect(0,0,c.width,c.height)}return c};
openReveal=function(s){state='reveal';const R=RAR[s.r],el=$('reveal'),isItem=!!ITEMI[s.id],cat=isItem?CATS[s.c]:CATS.bug;const where=[...new Set(s.b)].map(b=>BIO[b]?BIO[b].n:b).join(' · ');
 const reward=isItem?(s.c=='gem'?`+${s.r=='legendary'?2:1} 💎`:`+${{common:1,rare:3,legendary:8}[s.r]} 💧`):`+${R.dew} 💧`;
 el.innerHTML=`<div class="flip"><div class="face front parch" style="padding:14px;border-color:${s.r=='legendary'?'#e0a920':s.r=='rare'?'#4f8ad0':'#a97c3c'};${s.r=='legendary'?'box-shadow:0 0 60px #ffd34acc,0 14px 50px #000b':''}"><div class="rar" style="color:${R.c}">${cat.e} ${'★'.repeat(s.r=='common'?1:s.r=='rare'?2:3)} ${R.lbl} ${G.lastNew?'· NEW!':''}</div><div id="rp"></div><h2>${s.n}</h2><div style="font-size:14px;font-style:italic">${s.f}</div><div class="small" style="margin-top:6px">📍 ${where}${s.night?' · 🌙 night only':s.day?' · ☀️ daytime':''}</div><div style="margin-top:auto;font-weight:700">${reward}</div><button class="b" id="bRC" style="margin-top:8px">Add to journal ✍️</button><div class="shine"></div></div></div>`;
 $('rp').appendChild(portrait(s.id,250,150,G.el));el.classList.remove('hide');$('bRC').onclick=closeReveal;updHUD();setTimeout(()=>{let sh=el.querySelector('.shine');if(sh)sh.remove()},2300);if(AT)setTimeout(closeReveal,2500)};
// ----- HUD -----
updHUD=function(){if(!G||!G.got)return;const tot=SPEC.length+ITEMS.length,have=G.found.length+G.got.length;$('hBugs').textContent=`📖 ${have}/${tot}`;$('hDew').textContent='💧 '+String(SV.d.dew).padStart(3,'0');$('hHearts').textContent='💎 '+SV.d.gems;
 $('hTime').textContent=(G.daily?`🎯 ${G.featured.filter(featDone).length}/5 · `:'')+(N>.5?'🌙':'☀️')+` 🗺️ ${Math.round(FOG.pct*100)}%`};
// ----- minimap with fog of war + spotlight + night glows -----
drawMinimap=function(){if(!G)return;
 let px=(G.P.x-cam.x)*zoom+W/2,py=(G.P.y-40-cam.y)*zoom+H/2,r=Math.min(W,H)*.32;let g=x.createRadialGradient(px,py,r*.45,px,py,r*1.6);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,N>.5?'rgba(5,10,25,.28)':'rgba(40,25,5,.2)');x.fillStyle=g;x.fillRect(0,0,W,H);
 if(N>.05){x.save();x.globalCompositeOperation='lighter';const gl=(wx,wy,rr,col,a)=>{let sx=(wx-cam.x)*zoom+W/2,sy=(wy-cam.y)*zoom+H/2;rr*=zoom;if(sx<-rr||sy<-rr||sx>W+rr||sy>H+rr)return;let q=x.createRadialGradient(sx,sy,0,sx,sy,rr);q.addColorStop(0,`rgba(${col},${a})`);q.addColorStop(1,`rgba(${col},0)`);x.fillStyle=q;x.fillRect(sx-rr,sy-rr,rr*2,rr*2)};
  for(const d of nearDecor(TALL_G,cam.x-W/zoom,cam.y-H/zoom,cam.x+W/zoom,cam.y+H/zoom,100)){if(d.k=='blueshroom')gl(d.x,d.y-25,60,'90,170,255',.35*N);else if(d.k=='crystalrock')gl(d.x,d.y-30,80,'120,220,255',.3*N)}
  for(const o of G.items)if(!o.got&&o.it.id=='glowshroom')gl(o.x,o.y-15,70,'200,120,255',.45*N);x.restore()}
 const S_=Math.min(130,W*.28),ox=10+SAFE.l,oy=H-S_-10-SAFE.b;x.save();x.fillStyle='rgba(78,56,21,.85)';x.strokeStyle='#f0d58e';x.lineWidth=2;x.beginPath();x.roundRect(ox-4,oy-4,S_+8,S_+8,12);x.fill();x.stroke();x.beginPath();x.roundRect(ox,oy,S_,S_,9);x.clip();x.imageSmoothingEnabled=true;x.drawImage(FOG.map,ox,oy,S_,S_);x.drawImage(FOG.fog,ox,oy,S_,S_);
 const s=S_/MW;x.fillStyle='#ff6a4a';x.beginPath();x.arc(ox+G.P.x*s,oy+G.P.y*s,4,0,TAU);x.fill();x.strokeStyle='#fff';x.lineWidth=1.5;x.stroke();x.restore()};
// ----- journal with tabs -----
let jTab='bug';const tabs=document.createElement('div');tabs.className='row';tabs.style.margin='8px 0';$('jGrid').before(tabs);
const jEnd=document.createElement('button');jEnd.className='b n';jEnd.textContent='🏁 End trail & share';$('bJClose').after(jEnd);jEnd.onclick=()=>{$('sJournal').classList.add('hide');state='play';endGame()};
function catList(c){return c=='bug'?SPEC:ITEMS.filter(i=>i.c==c)}function catHave(c,id){return c=='bug'?G.found.includes(id):G.got.includes(id)}function catEver(c,id){return c=='bug'?SV.d.seen.includes(id):SV.d.items.includes(id)}
function pct(c){const L=catList(c);return Math.round(100*L.filter(s=>catHave(c,s.id)).length/L.length)}
fillGrid=function(el,c='bug'){el.innerHTML='';for(const s of catList(c)){const got=G&&catHave(c,s.id),ever=catEver(c,s.id);const d=document.createElement('div');d.className=`card ${s.r} ${got||ever?'':'no'}`;d.appendChild(portrait(s.id,90,64,2,false,!(got||ever)));d.insertAdjacentHTML('beforeend',`<div class="nm">${got||ever?s.n:'???'}</div><div class="tag" style="color:${RAR[s.r].c}">${RAR[s.r].lbl}${s.night?' · 🌙':''}${got?' ✅':''}</div>`);if(got||ever)d.title=s.f;else d.title='Hint: look in '+[...new Set(s.b)].map(b=>BIO[b].n).join(' or ')+(s.night?' at night':'')+(s.hid?' (hidden near stones, watch for sparkles)':'');el.appendChild(d)}};
$('jGrid').onclick=e=>{let c=e.target.closest('.card');if(c&&c.title)toast(c.title,3800)};
function renderJournal(){tabs.innerHTML='';for(const c in CATS){const b=document.createElement('button');b.className='b '+(c==jTab?'':'n');b.style.cssText='font-size:14px;padding:7px 10px';b.textContent=`${CATS[c].e} ${CATS[c].n} ${pct(c)}%`;b.onclick=()=>{jTab=c;S.pop();renderJournal()};tabs.appendChild(b)}
 const feat=G.daily?`<br>🎯 Today's featured: ${G.featured.map(f=>(featDone(f)?'✅ ':'⬜ ')+f.n).join(' · ')}`:'';$('jSum').innerHTML=`🗺️ Explored ${Math.round(FOG.pct*100)}% · places ${G.visited.size}/10${feat}<br><span class="small">Tap a card for its fact, or a hint for undiscovered ones.</span>`;fillGrid($('jGrid'),jTab)}
openJournal=function(){if(state!='play')return;state='journal';renderJournal();$('sJournal').classList.remove('hide');S.pop()};
// ----- end / share -----
shareText=function(){const rows=Object.keys(CATS).map(c=>CATS[c].e+' '+catList(c).map(s=>catHave(c,s.id)?RAR[s.r].e:'⬛').join(''));const tot=SPEC.length+ITEMS.length,have=G.found.length+G.got.length;
 return `🐞 Tiny Trails · ${G.daily?'Daily Trail '+todayStr():'Free Explore'}\n${G.daily?`🎯 ${G.featured.filter(featDone).length}/5 featured · `:''}📖 ${have}/${tot} finds · 🗺️ ${Math.round(FOG.pct*100)}% explored\n${rows.join('\n')}\nCome explore with me! ${location.href.split('?')[0]}`};
endGame=function(){if(state!='play')return;state='end';SV.d.runs++;if(G.daily){let k=todayStr();SV.d.best[k]=Math.max(SV.d.best[k]||0,G.featured.filter(featDone).length)}SV.save();MU.set('rain',0);
 const have=G.found.length+G.got.length;$('eTitle').textContent=G.daily&&G.done?'Daily Trail complete!':have>=25?'Master Naturalist!':have>=12?'Great Explorer!':'Lovely walk!';
 $('eSub').innerHTML=`I found <b>${have}/${SPEC.length+ITEMS.length}</b> treasures & critters · 🗺️ ${Math.round(FOG.pct*100)}% explored`;
 $('eGridEmoji').innerHTML=shareText().split('\n').slice(2,7).join('<br>');const eg=$('eGrid');eg.innerHTML='';for(const c in CATS){const h=document.createElement('div');h.style.cssText='grid-column:1/-1;text-align:left;font-weight:700;margin-top:4px';h.textContent=`${CATS[c].e} ${CATS[c].n} ${pct(c)}%`;eg.appendChild(h);const tmp=document.createElement('div');fillGrid(tmp,c);while(tmp.firstChild)eg.appendChild(tmp.firstChild)}
 $('eCopied').textContent='';$('bAgain').textContent='🍃 Keep exploring';$('sEnd').classList.remove('hide');$('hud').style.opacity=0;S.chime(1)};
$('bAgain').onclick=()=>{S.pop();$('sEnd').classList.add('hide');$('hud').style.opacity=1;state='play'};
// ----- hats: dew or gems -----
Object.assign(HATS.find(h=>h.id=='wizard'),{p:0,g:3});Object.assign(HATS.find(h=>h.id=='crown'),{p:0,g:5});
openHats=function(){$('hatDew').textContent=`You have 💧 ${SV.d.dew} dewdrops · 💎 ${SV.d.gems} gems`;const L=$('hatList');L.innerHTML='';for(const h of HATS){const own=SV.d.hats.includes(h.id),d=document.createElement('div');d.className='hat'+(SV.d.hat==h.id?' sel':'')+(own?'':' lock');d.appendChild(hatPortrait(h.id));const cost=h.g?`💎 ${h.g}`:`💧 ${h.p}`;d.insertAdjacentHTML('beforeend',`<div><b>${h.n}</b></div><div>${own?(SV.d.hat==h.id?'Wearing':'Wear'):cost}</div>`);
 d.onclick=()=>{S.init();if(own){SV.d.hat=h.id;S.pop()}else if(h.g?SV.d.gems>=h.g:SV.d.dew>=h.p){if(h.g)SV.d.gems-=h.g;else SV.d.dew-=h.p;SV.d.hats.push(h.id);SV.d.hat=h.id;S.chime(1)}else{toast(h.g?'Find more hidden gems 💎':'Not enough dewdrops yet 💧');return}SV.save();openHats();titleStats()};L.appendChild(d)}$('sHats').classList.remove('hide')};
titleStats=function(){$('tStats').innerHTML=`💧 ${SV.d.dew} · 💎 ${SV.d.gems} · 📖 ${SV.d.seen.length+SV.d.items.length}/${SPEC.length+ITEMS.length} found ever`};
// ----- copy updates -----
document.querySelector('#sTitle p').innerHTML='Wander a big cozy world with <b>Lottie</b> the ladybug explorer. <b>Sneak</b> up on 17 tiny critters to photograph them, and gather berries, herbs, mushrooms and hidden gems for your journal. No rush, no danger. Just discovery.';
$('bDaily').textContent='🎯 Daily Trail';
document.querySelector('#sHelp p').innerHTML='🐞 <b>Move</b>: arrow keys / WASD, or drag anywhere on mobile.<br>🤫 <b>Sneak</b>: hold <b>Shift</b> (or drag just a little). Rush in and bugs get shy <b>!</b> and scurry off. They never hurt you.<br>📸 <b>Photograph</b>: stay close and calm until the ring fills.<br>🍓🌿🍄 <b>Collect</b>: walk over berries, herbs and mushrooms, or tap them.<br>💎 <b>Gems</b> hide near stones. Watch for tiny sparkles!<br>🗺️ 10 places to discover; the map fills in as you explore.<br>🌙 Night comes and goes: fireflies, moths and glowing mushrooms appear.<br>🎯 <b>Daily Trail</b>: find today\'s 5 featured things and share your result.<br>🎩 Spend 💧 and 💎 on hats for Lottie.';
$('hHearts').textContent='💎 0';
// ----- autopilot (testing) -----
autoPilot=function(){const P=G.P;let best=null,bd=1e9,isBug=false;
 for(const b of G.bugs){if(G.found.includes(b.s.id)||b.vis<.6||b.flee>0)continue;let d=dist(b.x,b.y,P.x,P.y);if(d<bd){bd=d;best=b;isBug=true}}
 for(const o of G.items){if(o.got||(o.it.night&&N<.45))continue;let d=dist(o.x,o.y,P.x,P.y)*(G.got.includes(o.it.id)?3:1);if(d<bd){bd=d;best=o;isBug=false}}
 if(!best)return[Math.sin(G.el),Math.cos(G.el*.7),false];let dx=best.x-P.x,dy=best.y-P.y,d=Math.hypot(dx,dy);if(isBug){if(d<30)return[0,0,true];return[dx,dy,d<RAR[best.s.r].fl+40]}return[dx,dy,false]};
// rebuild title world with the new map
GROUND=null;toTitle();if(tex.complete&&tex.naturalWidth)GROUND=bakeGround(tex);else tex.onload=()=>{GROUND=bakeGround(tex)};
// ----- v5 atmosphere: haze, dusk motes, sparkle trail, rare shimmer -----
const _upd5=update;update=function(dt){_upd5(dt);if(!G||state!='play')return;const P=G.P;if(P.speed>30&&fx()<dt*14)parts.push({x:P.x-Math.cos(P.a)*8+(fx()-.5)*14,y:P.y-20-fx()*30,vx:(fx()-.5)*12,vy:-12-fx()*10,l:.9,ml:.9,c:N>.5?'200,255,170':'255,236,170',s:1.4+fx()*1.6,star:fx()<.35})};
const DUSK=Array.from({length:40},()=>({x:fx(),y:fx(),p:fx()*9,s:1+fx()*2}));
const _mm5=drawMinimap;drawMinimap=function(){if(G){const t=performance.now();x.save();
 // warm golden haze & soft bloom wash
 let day=1-N;x.globalCompositeOperation='screen';let hz=x.createLinearGradient(0,0,0,H);hz.addColorStop(0,`rgba(255,214,140,${.16*day+.04})`);hz.addColorStop(.6,`rgba(255,190,120,${.05*day})`);hz.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=hz;x.fillRect(0,0,W,H);
 // dusk/night glowing motes
 const dusk=Math.max(sm(.15,.5,N)*(1-sm(.85,1,N)*.3),N*.7);if(dusk>.02){x.globalCompositeOperation='lighter';for(const m of DUSK){let px=((m.x*W+Math.sin(t/3000+m.p)*60)%W+W)%W,py=((m.y*H+Math.cos(t/3700+m.p)*40-t/160*m.s)%H+H)%H,a=dusk*(.4+.6*Math.max(0,Math.sin(t/600+m.p*3)));let g=x.createRadialGradient(px,py,0,px,py,10*m.s);g.addColorStop(0,`rgba(255,240,150,${a*.7})`);g.addColorStop(1,'rgba(255,220,120,0)');x.fillStyle=g;x.fillRect(px-10*m.s,py-10*m.s,20*m.s,20*m.s)}}
 x.restore()}_mm5()};
const _di5=drawItem;drawItem=function(o,t){_di5(o,t);if(o.got||o.it.r=='common'||(o.it.hid&&o.rv<1)||(o.it.night&&N<.45))return;let k=(t/700+o.t)%1;x.save();x.globalCompositeOperation='lighter';for(let i=0;i<3;i++){let a=(k+i/3)%1,px=o.x+Math.cos(o.t+i*2.1+t/900)*16,py=o.y-14-a*26;x.fillStyle=o.it.r=='legendary'?`rgba(255,220,120,${(1-a)*.9})`:`rgba(200,230,255,${(1-a)*.8})`;x.beginPath();x.arc(px,py,1.8*(1-a)+.6,0,TAU);x.fill()}x.restore()};
// =====================================================================
// v6: surface footsteps, interactive world, friends, grounded lighting
// =====================================================================
let Q=+(new URLSearchParams(location.search).get('q')??2),QAUTO=!new URLSearchParams(location.search).has('q');
// ---------- sample buffers (Web Audio; on iOS M is routed through <audio>, so it plays through the silent switch) ----------
const SURF={moss:3,sand:3,leaves:3,stone:3,cave:3,water:3};
const SFXN=[...Object.keys(SURF).flatMap(k=>[1,2,3].map(i=>k+i)),'squish','rustle','bush','stoneroll'];
const BUF={};let bufLoading=false;
function loadBufs(){const A=S.ctx&&S.ctx();if(!A||bufLoading)return;bufLoading=true;
 for(const n of SFXN){const xh=new XMLHttpRequest();xh.open('GET','assets/sfx/'+n+'.mp3');xh.responseType='arraybuffer';xh.onload=()=>{if(xh.status&&xh.status!=200)return;try{const p=A.decodeAudioData(xh.response,b=>BUF[n]=b,()=>{});if(p&&p.catch)p.catch(()=>{})}catch(e){}};xh.onerror=()=>{};xh.send()}}
function aOK(){const A=S.ctx&&S.ctx();return A&&A.state=='running'&&S.out()}
function playB(n,v=1,rate=1,pan=0){if(!aOK())return;loadBufs();const b=BUF[n];if(!b)return;const A=S.ctx(),s=A.createBufferSource();s.buffer=b;s.playbackRate.value=rate;const g=A.createGain();g.gain.value=v*MU.vol.sfx;s.connect(g);
 if(A.createStereoPanner){const p=A.createStereoPanner();p.pan.value=clamp(pan,-.9,.9);g.connect(p).connect(S.out())}else g.connect(S.out());s.start()}
function syn(f,dur,v,type='sine',t0=0,f2){if(!aOK())return;const A=S.ctx(),t=A.currentTime+t0,o=A.createOscillator(),g=A.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+dur*.8);
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v*MU.vol.sfx,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g).connect(S.out());o.start(t);o.stop(t+dur+.05)}
const PENTA=[523.25,587.33,659.25,783.99,880,1046.5,1174.66,1318.5,1567.98,1760];
const SX={
 chime(i){const f=PENTA[i%PENTA.length];syn(f,1.3,.06);syn(f*2,.7,.018,'sine',.01);syn(f*3,.4,.008,'sine',.02)},
 boing(){syn(300+fx()*60,.38,.09,'sine',0,150);syn(900,.12,.02,'triangle',0,500)},
 crystal(i){const f=PENTA[i%PENTA.length];[[1,.07,2.2],[2.76,.025,1.2],[5.4,.012,.7],[2,.02,1.6]].forEach(([m,v,d])=>syn(f*m,d,v))},
 plink(){const f=1500+fx()*600;syn(f,.3,.05,'sine',0,f*.7);syn(f*1.5,.18,.02,'sine',.04)},
 knock(){syn(220,.12,.08,'triangle',0,150);syn(330,.08,.04,'triangle',.07,200)},
 buzz(v=1,pan=0){if(!aOK())return;const A=S.ctx(),t=A.currentTime,g=A.createGain(),f=A.createBiquadFilter();f.type='bandpass';f.frequency.value=900;f.Q.value=1.2;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.05*v*MU.vol.sfx,t+.12);g.gain.linearRampToValueAtTime(0,t+.9);
  let out=g;if(A.createStereoPanner){const p=A.createStereoPanner();p.pan.value=pan;g.connect(p);out=p}out.connect(S.out());f.connect(g);
  for(const d of[0,6]){const o=A.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(180+d,t);o.frequency.linearRampToValueAtTime(200+d+fx()*30,t+.45);o.frequency.linearRampToValueAtTime(175+d,t+.9);o.connect(f);o.start(t);o.stop(t+.95)}},
 chirp(v=1){for(let i=0;i<3;i++)syn(4300+fx()*200,.04,.03*v,'triangle',i*.07)},
 click(v=1){syn(2400,.03,.03*v,'square',0,1800);syn(2000,.03,.02*v,'square',.08,1600)},
 shimmer(v=1){[0,1,2,3].forEach(i=>syn(PENTA[5+i%5]*(1+fx()*.01),.6,.02*v,'sine',i*.06))},
 happy(){[0,2,4].forEach((n,i)=>syn(PENTA[n+2],.35,.04,'triangle',i*.08))},
 friend(){[0,2,4,7].forEach((n,i)=>{syn(PENTA[n],1.2,.06,'sine',i*.11);syn(PENTA[n]*2,.6,.015,'sine',i*.11)})}};
MU.step=()=>{};S.step=()=>{};
// ---------- surfaces & footsteps ----------
const WATERS=()=>[{x:BIO.pond.x,y:BIO.pond.y,wr:BIO.pond.wr},{x:BIO.waterfall.x,y:BIO.waterfall.y+30,wr:BIO.waterfall.wr}];
function surface(px,py){for(const w of WATERS())if(dist(px,py,w.x,w.y)<w.wr+28)return'water';const b=biomeAt(px,py);
 for(const d of nearDecor(TALL_G,px-40,py-40,px+40,py+40,0))if((d.k=='pebble'||d.k=='crystalrock'||d.k=='pinecone')&&dist(d.x+(d.oxc||0),d.y,px,py)<26*d.s)return b=='cave'?'cave':'stone';
 if(b=='cave')return'cave';if(b=='dunes')return'sand';if(b=='autumn'||b=='log'||b=='pine')return'leaves';
 for(const d of nearDecor(FLAT_G,px-30,py-30,px+30,py+30,0))if(d.k=='leafd'&&dist(d.x,d.y,px,py)<24*d.s)return'leaves';
 return nearTrail(px,py)<22?'sand':'moss'}
const SVOL={moss:.95,sand:.8,leaves:.85,stone:.7,cave:.75,water:.8};
function footstep(P){const sf=surface(P.x,P.y);P.surf=sf;const v=(P.sneak?.42:1)*SVOL[sf],i=1+(fx()*3|0);P._lr=-(P._lr||.12);
 playB(sf+i,v,(sf=='sand'&&biomeAt(P.x,P.y)!='dunes'?1.15:1)*(.88+fx()*.26)*(P.sneak?1.06:1),P._lr);
 const fx0=P.x+(P._lr>0?5:-5),fy=P.y+2;
 if(sf=='sand')puff(fx0,fy,3,'225,200,150',22,.6,2.4,6);else if(sf=='leaves')puff(fx0,fy,2,fx()<.5?'200,110,40':'150,90,40',26,.6,2.2,10);
 else if(sf=='water'){RIP.push({x:fx0,y:fy,t:0,m:.9,r:18});puff(fx0,fy,4,'210,240,255',40,.35,2,30)}else if(sf=='cave')puff(fx0,fy,1,'190,200,230',14,.6,2,4)}
// ---------- ripples / world fx ----------
const RIP=[];
// ---------- emotes ----------
function emote(k,hop=0){const P=G&&G.P;if(!P)return;P.emo={k,t:1.6};if(hop){P.hop=1;SX.happy()}}
// ---------- interactions ----------
const REACT={flower:'flower',wildflowers:'flower',mush:'mush',blueshroom:'mush',cactus:'mush',clover:'leaf',bigclover:'leaf',grass:'leaf',fern:'leaf',dunegrass:'leaf',reed:'leaf',leafpile:'leaf',treeroot:'wood',birchstump:'wood',log:'wood',berrybush:'bush',pebble:'stone',pinecone:'stone',crystalrock:'crystal',seashell:'shell'};
const decorIdx=d=>((d.x*.37+d.y*.11)|0)%PENTA.length;
function revealUnder(d){let n=0;for(const o of G.items)if(o.it.hid&&o.rv<1&&!o.got&&dist(o.x,o.y,d.x,d.y)<40){o.rv=1;n++;sparkle(o.x,o.y-10,22,'200,225,255')}if(n){SX.shimmer(1.4);toast('✨ Something sparkles under the stone!');emote('!',1)}}
function spawnItem(id,px,py){const it=ITEMI[id];if(!it)return;G.items.push({it,x:px,y:py,t:0,got:false,ft:0,rv:1});sparkle(px,py-8,10,'255,240,190')}
function react(d,strong){const kind=REACT[d.k];if(!kind)return false;const now=performance.now();if((d.cd||0)>now)return false;d.cd=now+(strong?220:1500);d.rt0=now;d.rk=kind;
 const pan=clamp((d.x-cam.x)*zoom/(W/2),-1,1)*.6,v=strong?1:.6,top=d.y-26*d.s;
 if(kind=='flower'){puff(d.x,top-8,strong?16:8,fx()<.5?'255,226,110':'255,245,190',55,1.5,2.4,26);SX.chime(decorIdx(d)+(fx()*3|0))}
 else if(kind=='mush'){playB('squish',.9*v,.95+fx()*.3,pan);SX.boing();puff(d.x,top-16,strong?16:8,d.k=='blueshroom'?'150,220,255':d.k=='cactus'?'200,230,150':'235,225,200',38,1.6,3,16)}
 else if(kind=='leaf'){playB('rustle',.75*v,.85+fx()*.45,pan);puff(d.x,top,strong?6:3,d.k=='leafpile'?'210,110,40':'120,170,60',40,.9,2.6,12)}
 else if(kind=='wood'){SX.knock();puff(d.x,d.y-10,5,'140,100,60',30,.8,2.2,6)}
 else if(kind=='bush'){playB('bush',.9*v,.95+fx()*.2,pan);puff(d.x,top,10,'110,160,60',50,.9,2.6,14);
  if(strong&&!d.drop&&G){d.drop=1;if(fx()<.75){const bk=biomeAt(d.x,d.y),cand=ITEMS.filter(i=>i.c=='berry'&&i.b.includes(bk)),it=(cand.length?cand:ITEMS.filter(i=>i.c=='berry'&&i.r=='common'))[fx()*(cand.length||2)|0];spawnItem(it.id,d.x+(fx()-.5)*50,d.y+26);toast('🫐 The bush dropped a berry!');emote('♥',1)}}}
 else if(kind=='stone'){playB('stoneroll',.8*v,1.05+fx()*.35,pan);if(!d.rolled){d.rolled=1;d.ox=(fx()<.5?-1:1)*(20+fx()*12);puff(d.x,d.y,6,'150,130,100',30,.7,2.5,4);if(G)revealUnder(d)}}
 else if(kind=='crystal'){const i=decorIdx(d)+(strong?0:2);SX.crystal(i);sparkle(d.x,top-30,10,'190,220,255');RIP.push({x:d.x,y:d.y-30*d.s,t:0,m:.8,r:50,c:'180,215,255',up:1})}
 else if(kind=='shell'){SX.plink();sparkle(d.x,d.y-6,6,'255,230,220')}
 return true}
// tap anything
cv.addEventListener('pointerdown',e=>{if(state!='play'||!G)return;const P=G.P,wx=(e.clientX-W/2)/zoom+cam.x,wy=(e.clientY-H/2)/zoom+cam.y;if(dist(wx,wy,P.x,P.y)>420)return;
 for(const f of G.fr||[])if(dist(wx,wy,f.x,f.y-f.alt-12)<34){friendSound(f,1.2);f.joy=1;puff(f.x,f.y-f.alt-20,6,'255,170,190',30,1,3,30);emote('♥',1);return}
 for(const b of G.bugs)if(b.vis>.5&&!b.gone&&dist(wx,wy,b.x,b.y-b.alt)<44){bugSound(b,1.2);if(b.s.id=='firefly')swirl(b.x,b.y-b.alt);emote('?');return}
 let best=null,bd=70;for(const d of nearDecor(TALL_G,wx-90,wy-90,wx+90,wy+90,0)){if(!REACT[d.k])continue;let dd=dist(wx,wy,d.x,d.y-18*d.s);if(dd<bd){bd=dd;best=d}}
 if(best){react(best,true);if(dist(best.x,best.y,P.x,P.y)>60)emote('?');return}
 for(const w of WATERS())if(dist(wx,wy,w.x,w.y)<w.wr){RIP.push({x:wx,y:wy,t:0,m:1.4,r:40},{x:wx,y:wy,t:-.25,m:1.4,r:28});playB('water'+(1+(fx()*3|0)),.6,.8+fx()*.3);puff(wx,wy,6,'220,245,255',50,.4,2,40);return}
 for(const d of G.dews)if(!d.got&&dist(wx,wy,d.x,d.y)<30){SX.plink();sparkle(d.x,d.y,5,'200,235,255');return}});
function swirl(px,py){SX.shimmer(1.3);for(let i=0;i<18;i++){let a=i/18*TAU;parts.push({x:px+Math.cos(a)*20,y:py+Math.sin(a)*20,vx:-Math.sin(a)*90,vy:Math.cos(a)*90-20,l:1.4,ml:1.4,c:'220,255,140',s:2.4,star:1})}}
function bugSound(b,v=1){const id=b.s.id,pan=clamp((b.x-G.P.x)/300,-.8,.8);if(['honeybee','bumblebee','dragonfly'].includes(id))SX.buzz(v,pan);else if(['cricket','grasshopper','mantis'].includes(id))SX.chirp(v);else if(['firefly','luna','butterfly'].includes(id))SX.shimmer(v*.7);else SX.click(v)}
// ---------- friends ----------
SV.d.friends=SV.d.friends||[];SV.d.bfly=SV.d.bfly||0;SV.d.catProg=SV.d.catProg||0;
const cnt=c=>(G&&G.cnt&&G.cnt[c])||0;
const FRIENDS=[
 {id:'snail',n:'Shelly the Snail',home:'waterfall',h:40,task:'Could you bring me a berry? 🍓',tl:'Bring a berry',ok:()=>cnt('berry')>=1,help:'Sniffs out hidden gems nearby 💎'},
 {id:'bumblebee',n:'Bumble the Bee',home:'flowers',h:40,fly:1,task:'Please find 3 herbs for my garden! 🌿',tl:'Find 3 herbs',ok:()=>cnt('herb')>=3,help:'Points you to berries, herbs & mushrooms 🌼'},
 {id:'caterpillar',n:'Pip the Caterpillar',home:'autumn',h:34,task:'Tell me about the world! Visit 4 places 🗺️',tl:'Visit 4 places',ok:()=>G.visited.size>=4,help:'Will grow into a butterfly that points to bugs 🦋'},
 {id:'firefly',n:'Glimmer the Firefly',home:'woods',h:34,fly:1,task:'I only wake up at night... come back after dusk 🌙',tl:'Visit at night',ok:()=>N>.55,help:'Lights up the night around you ✨'},
 {id:'stag',n:'Digby the Beetle',home:'log',h:44,task:'I\'m hungry! Find me 2 mushrooms 🍄',tl:'Find 2 mushrooms',ok:()=>cnt('mush')>=2,help:'Digs up dewdrops & treasures ⛏️'}];
const FRI={};FRIENDS.forEach(f=>FRI[f.id]=f);
const friendSpr=id=>id=='caterpillar'&&SV.d.bfly?'butterfly':id;
function friendSound(f,v=.6){const id=friendSpr(f.id);if(id=='bumblebee')SX.buzz(v*.8);else if(id=='firefly'||id=='butterfly')SX.shimmer(v);else if(id=='snail')playB('squish',.35*v,1.6);else if(id=='stag')SX.click(v);else SX.chirp(v*.7)}
function mkFollower(id,px,py){return{id,x:px,y:py,alt:0,vx:0,t:fx()*9,joy:0,snd:performance.now()+4000+fx()*8000}}
const _collect6=collect;collect=function(o){_collect6(o);G.cnt=G.cnt||{};G.cnt[o.it.c]=(G.cnt[o.it.c]||0)+1;emote('♥',1);
 if(SV.d.friends.includes('caterpillar')&&!SV.d.bfly){SV.d.catProg++;if(SV.d.catProg>=6){SV.d.bfly=1;const f=(G.fr||[]).find(f=>f.id=='caterpillar');if(f){sparkle(f.x,f.y-20,40,'230,200,255');}SX.friend();banner('🦋 Pip became a butterfly!','Now Pip points you to undiscovered bugs');}SV.save()}};
const _snap6=snap;snap=function(b){_snap6(b);emote('!',1)};
const _newGame6=newGame;newGame=function(d){_newGame6(d);const r=mulberry(G.seed+11);G.cnt={};G.hist=[];G.npc=[];G.fr=[];G.dig=25;
 for(const f of FRIENDS){const b=BIO[f.home];let hx,hy;for(let k=0;k<40;k++){let a=r()*TAU,rr=b.r*(.25+r()*.35);hx=b.x+Math.cos(a)*rr;hy=b.y+Math.sin(a)*rr;if(!inWater(hx,hy,60))break}
  if(SV.d.friends.includes(f.id))G.fr.push(mkFollower(f.id,G.P.x-30,G.P.y+20));else G.npc.push({f,x:hx,y:hy,t:r()*9,shown:0})}};
function befriend(n){const f=n.f;SV.d.friends.push(f.id);SV.save();G.npc=G.npc.filter(o=>o!=n);G.fr.push(mkFollower(f.id,n.x,n.y));SX.friend();sparkle(n.x,n.y-20,40,'255,190,210');
 for(let i=0;i<10;i++)parts.push({x:n.x,y:n.y-30,vx:(fx()-.5)*60,vy:-40-fx()*60,l:1.8,ml:1.8,c:'255,120,150',s:3,heart:1});banner(`💞 ${f.n} is your friend!`,f.help);emote('♥',1)}
// ---------- per-frame logic ----------
let qT=0,qBad=0,lastFrame=0;
const _upd6=update;update=function(dt){_upd6(dt);if(!G||state!='play')return;const P=G.P,now=performance.now();if(!bufLoading&&aOK())loadBufs();
 // footsteps synced to walk cycle (feet touch ground when |sin(phase)|≈0)
 if(P.speed>20&&!P.boat&&!P.fly&&!P.hopTo){const ph=Math.floor(P.walk*2.2/Math.PI);if(ph!==P._ph){P._ph=ph;if(now-(P._st||0)>(P.sneak?300:170)){P._st=now;footstep(P)}}}
 // bump reactions
 if(P.speed>40&&!P.fly&&!P.boat)for(const d of nearDecor(TALL_G,P.x-60,P.y-60,P.x+60,P.y+60,0))if(REACT[d.k]&&dist(d.x+(d.oxc||0),d.y,P.x,P.y)<12+16*d.s)react(d,false);
 // nearby bugs make little sounds; Lottie gets curious
 for(const b of G.bugs){if(b.vis<.5||b.gone)continue;const dd=dist(b.x,b.y,P.x,P.y);if(dd<150&&(b._snd||0)<now){b._snd=now+3500+fx()*5000;bugSound(b,.5*(1-dd/170))}if(dd<170&&!b._cur&&!G.found.includes(b.s.id)){b._cur=1;emote('?')}}
 // emotes
 if(P.emo){P.emo.t-=dt;if(P.emo.t<=0)P.emo=null}if(P.hop>0)P.hop=Math.max(0,P.hop-dt*2.6);
 // friend NPCs
 for(const n of [...G.npc]){n.t+=dt;const dd=dist(n.x,n.y,P.x,P.y);n.near=dd<110;if(n.near){if(n.f.ok()){befriend(n);continue}if(!n.shown){n.shown=1;friendSound({id:n.f.id},.8)}}else n.shown=0}
 // followers
 const h=G.hist,last=h[h.length-1];if(!last||dist(last[0],last[1],P.x,P.y)>6){h.push([P.x,P.y]);if(h.length>200)h.shift()}
 G.fr.forEach((f,i)=>{f.t+=dt;const tg=h[Math.max(0,h.length-1-(i+1)*8)]||[P.x,P.y];let fly=FRI[f.id].fly||(f.id=='caterpillar'&&SV.d.bfly);
  const ox=fly?Math.sin(f.t*1.3+i)*18:0,oy=fly?Math.cos(f.t*1.7+i)*10:0,k=1-Math.exp(-dt*(f.id=='snail'&&!fly?2.2:3.5));const nx=lerp(f.x,tg[0]+ox,k);f.vx=(nx-f.x)/Math.max(dt,1e-3);f.x=nx;f.y=lerp(f.y,tg[1]+oy+8,k);
  f.alt=fly?22+Math.sin(f.t*3)*5:0;f.joy=Math.max(0,f.joy-dt*1.5);if(now>f.snd&&dist(f.x,f.y,P.x,P.y)<200){f.snd=now+7000+fx()*9000;friendSound(f,.45)}});
 // friend helpers
 const has=id=>SV.d.friends.includes(id);
 if(has('snail')&&fx()<dt*2)for(const o of G.items)if(o.it.hid&&o.rv<1&&!o.got&&dist(o.x,o.y,P.x,P.y)<280){o.rv=1;sparkle(o.x,o.y-10,24,'200,225,255');SX.shimmer(1);toast('🐌 Shelly sniffed out a hidden gem! 💎');break}
 if(has('stag')){G.dig-=dt*(P.speed>20?1:.3);if(G.dig<=0){G.dig=35+fx()*20;const f=G.fr.find(f=>f.id=='stag')||P;puff(f.x,f.y,14,'120,90,50',50,.8,3,20);playB('rustle',.6,.7);
   if(fx()<.3){const c=ITEMS.filter(i=>i.r=='common'&&!i.night);spawnItem(c[fx()*c.length|0].id,f.x+20,f.y+10);toast('🪲 Digby dug up a treasure!')}else{G.dew+=3;SV.d.dew+=3;S.dew();updHUD();toast('🪲 Digby dug up 3 dewdrops! 💧')}}}
 G.pointI=null;G.pointB=null;
 if(has('bumblebee')){let bd=900;for(const o of G.items){if(o.got||o.rv<1||o.it.c=='gem'||(o.it.night&&N<.45))continue;const dd=dist(o.x,o.y,P.x,P.y);if(dd<bd&&dd>70){bd=dd;G.pointI=o}}}
 if(has('caterpillar')&&SV.d.bfly){let bd=1100;for(const b of G.bugs){if(b.gone||b.vis<.3||G.found.includes(b.s.id))continue;const dd=dist(b.x,b.y,P.x,P.y);if(dd<bd&&dd>90){bd=dd;G.pointB=b}}}
 // ripples
 for(let i=RIP.length-1;i>=0;i--){RIP[i].t+=dt;if(RIP[i].t>RIP[i].m)RIP.splice(i,1)}};
// ---------- drawing: decor reactions + wind ----------
const WINDY=new Set(['grass','reed','fern','dunegrass','clover','flower','wildflowers','bigclover']);
const _dd6=drawDecor;drawDecor=function(d,t){let r=0;if(d.rt0){r=1-(performance.now()-d.rt0)/900;if(r<=0){r=0;d.rt0=0}}
 if(d.ox!=null)d.oxc=lerp(d.oxc||0,d.ox,.12);
 const wind=WINDY.has(d.k)?Math.pow(Math.max(0,Math.sin(t/2300-(d.x+d.y*.6)*.0022)),3)*.12*d.s:0;
 if(!r&&!d.oxc&&!wind)return _dd6(d,t);
 let sx=1,sy=1,sk=wind,rot=d.oxc?d.oxc/14:0;
 if(r){const k=r*r;if(d.rk=='flower'||d.rk=='leaf')sk+=Math.sin(r*22)*.22*k;else if(d.rk=='mush'){sx=1+Math.sin(r*20)*.2*k;sy=1-Math.sin(r*20)*.2*k}else if(d.rk=='bush'){sk+=Math.sin(r*34)*.12*k;sx=1+Math.sin(r*25)*.05*k}else if(d.rk=='crystal'||d.rk=='wood'||d.rk=='shell'){sx=1+Math.sin(r*40)*.04*k;sy=sx}}
 x.save();x.translate(d.x+(d.oxc||0),d.y);if(rot)x.rotate(rot*.15);x.transform(1,0,-sk,1,0,0);x.scale(sx,sy);x.translate(-d.x,-d.y);_dd6(d,t);x.restore()};
// ---------- ground-level lighting pass: AO, long sun shadows, water caustics & ripples ----------
const SHB=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),gr=g.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(25,16,4,.6)');gr.addColorStop(.55,'rgba(25,16,4,.28)');gr.addColorStop(1,'rgba(25,16,4,0)');g.fillStyle=gr;g.fillRect(0,0,64,64);return c})();
const seamless=(n,fn)=>{const c=document.createElement('canvas');c.width=c.height=n;const g=c.getContext('2d');const R=mulberry(n*7+3);for(let i=0;i<fn.count;i++){const a=fn.mk(R);for(const ox of[-n,0,n])for(const oy of[-n,0,n]){g.save();g.translate(ox,oy);fn.draw(g,a);g.restore()}}return c};
const CAUS=seamless(256,{count:46,mk:R=>[R()*256,R()*256,R()*TAU,20+R()*40],draw:(g,[px,py,a,l])=>{g.strokeStyle='rgba(255,255,225,.55)';g.lineWidth=2.2;g.beginPath();g.moveTo(px,py);g.quadraticCurveTo(px+Math.cos(a)*l,py+Math.sin(a+1)*l,px+Math.cos(a+.6)*l*1.6,py+Math.sin(a+.6)*l*1.6);g.stroke()}});
const DAPPLE=seamless(512,{count:60,mk:R=>[R()*512,R()*512,14+R()*46,R()],draw:(g,[px,py,r,k])=>{const gr=g.createRadialGradient(px,py,0,px,py,r);gr.addColorStop(0,`rgba(255,236,170,${.5+k*.4})`);gr.addColorStop(.6,`rgba(255,226,150,${.18+k*.15})`);gr.addColorStop(1,'rgba(255,220,140,0)');g.fillStyle=gr;g.beginPath();g.ellipse(px,py,r,r*.7,.6,0,TAU);g.fill()}});
function sunInfo(){const ph=G?(G.el/300)%1:.2,u=clamp(ph/.47,0,1);return{a:Math.PI*.12+(u-.5)*1.5,len:1.1+Math.abs(u-.5)*3.2,al:(1-N)*(.55-.25*Math.abs(u-.5))}}
const _nd6=nearDecor;nearDecor=function(g,x0,y0,x1,y1,m){const out=_nd6(g,x0,y0,x1,y1,m);if(g===FLAT_G&&m===120&&GROUND&&x.getTransform().a>0.1)groundPass(x0,y0,x1,y1);return out};
function groundPass(x0,y0,x1,y1){const t=performance.now(),inV=(o,mm)=>o.x>x0-mm&&o.x<x1+mm&&o.y>y0-mm&&o.y<y1+mm;
 // water: depth tint, caustics, sky reflection, ripples
 for(const w of WATERS()){if(!inV(w,w.wr+40))continue;x.save();x.beginPath();x.arc(w.x,w.y,w.wr-6,0,TAU);x.clip();
  let gd=x.createRadialGradient(w.x,w.y,w.wr*.2,w.x,w.y,w.wr);gd.addColorStop(0,'rgba(10,40,60,.32)');gd.addColorStop(1,'rgba(10,40,60,0)');x.fillStyle=gd;x.fillRect(w.x-w.wr,w.y-w.wr,w.wr*2,w.wr*2);
  x.globalCompositeOperation='lighter';x.globalAlpha=(.10+.05*Math.sin(t/1300))*(1-N*.5);
  for(const [sp,dx,dy] of[[1,t*.012,t*.007],[1.4,-t*.009,t*.011]]){const ts=256*sp,ox=((dx%ts)+ts)%ts,oy=((dy%ts)+ts)%ts;for(let px=w.x-w.wr-ox;px<w.x+w.wr;px+=ts)for(let py=w.y-w.wr-oy;py<w.y+w.wr;py+=ts)x.drawImage(CAUS,px,py,ts,ts)}
  x.globalAlpha=1;let sk=x.createLinearGradient(w.x-w.wr,w.y-w.wr,w.x+w.wr*.3,w.y+w.wr*.4);sk.addColorStop(0,`rgba(255,245,215,${.22*(1-N)+.06})`);sk.addColorStop(.5,'rgba(255,245,215,0)');x.fillStyle=sk;x.fillRect(w.x-w.wr,w.y-w.wr,w.wr*2,w.wr*2);
  // glints
  for(let i=0;i<10;i++){let a=i*2.39+t/7000,rr=(i*61)%(w.wr-30),px=w.x+Math.cos(a)*rr,py=w.y+Math.sin(a)*rr*.8,al=Math.max(0,Math.sin(t/400+i*1.7));x.fillStyle=`rgba(255,250,220,${al*.5*(1-N*.6)})`;x.beginPath();x.ellipse(px,py,6*al,1.4*al,0,0,TAU);x.fill()}
  x.restore()}
 for(const r of RIP){if(r.t<0)continue;const k=r.t/r.m;x.strokeStyle=`rgba(${r.c||'235,250,255'},${(1-k)*.7})`;x.lineWidth=2*(1-k)+.5;x.beginPath();x.ellipse(r.x,r.y,r.r*(.3+k*1.6),r.r*(.3+k*1.6)*(r.up?1:.55),0,0,TAU);x.stroke()}
 // contact AO + long directional shadows
 const su=sunInfo(),ca=Math.cos(su.a),sa=Math.sin(su.a);
 for(const d of _nd6(TALL_G,x0,y0,x1,y1,200)){const arr=SPR[d.k];if(!arr||!arr.length||!inV(d,200))continue;const sp=arr[d.v%arr.length],sc=d.s*(sp.img.tagName=='IMG'?1:.68),w=sp.w*sc,h=sp.h*sc,bx=d.x+(d.oxc||0);
  x.globalAlpha=.75;x.drawImage(SHB,bx-w*.42,d.y-w*.13,w*.84,w*.26);
  if(Q>=1&&su.al>.03&&d.k!='waterfall'){x.save();x.globalAlpha=su.al;x.translate(bx,d.y);x.rotate(su.a);const L=h*su.len*.55;x.drawImage(SHB,-w*.15,-w*.28,L+w*.3,w*.56);x.restore()}}
 x.globalAlpha=1}
// ---------- Lottie hop/emotes, NPC friends, followers, helper arrows ----------
function drawCritter(id,px,py,h,t,vx,alt=0,joy=0){const sk=SMAP[id],im=IMG[sk];if(!im)return;const w=im.width*h/im.height,f=FACE[sk]||0,dir=vx>8?1:vx<-8?-1:0;let flip=f&&dir?dir*f<0:false;
 shadowE(x,px,py+2,w*.32,w*.1,alt?.25:.45);const fl=FLAP[id],bob=Math.sin(t/300+px)*1.5+(joy?Math.abs(Math.sin(joy*12))*10*joy:0);
 x.save();x.translate(px,py-alt-bob);if(flip)x.scale(-1,1);if(fl=='wing'){x.scale(.8+.2*Math.abs(Math.sin(t/120)),1)}else if(fl=='buzz')x.rotate(Math.sin(t/40)*.04);else x.scale(1+Math.sin(t/260)*.03,1-Math.sin(t/260)*.03);
 x.shadowColor='rgba(255,230,170,.8)';x.shadowBlur=8*zoom*DPR;x.drawImage(im,-w/2,-h,w,h);x.restore();x.shadowBlur=0;x.shadowColor='transparent';
 if(id=='firefly'&&N>.2){x.save();x.globalCompositeOperation='lighter';let g=x.createRadialGradient(px,py-alt-h*.4,0,px,py-alt-h*.4,40);g.addColorStop(0,`rgba(220,255,140,${.6*N})`);g.addColorStop(1,'rgba(220,255,140,0)');x.fillStyle=g;x.fillRect(px-40,py-alt-h*.4-40,80,80);x.restore()}}
function bubble(px,py,txt,a=1){x.save();x.globalAlpha=a;x.font='600 15px Georgia, serif';const w=Math.min(260,x.measureText(txt).width+22),lines=[];let cur='';for(const wd of txt.split(' ')){if(x.measureText(cur+' '+wd).width>236&&cur){lines.push(cur);cur=wd}else cur=cur?cur+' '+wd:wd}lines.push(cur);
 const bh=lines.length*19+14,bx=px-w/2,by=py-bh;x.fillStyle='rgba(255,248,228,.96)';x.strokeStyle='rgba(120,80,40,.6)';x.lineWidth=2;x.beginPath();x.roundRect?x.roundRect(bx,by,w,bh,10):x.rect(bx,by,w,bh);x.fill();x.stroke();x.beginPath();x.moveTo(px-7,py);x.lineTo(px,py+9);x.lineTo(px+7,py);x.fill();
 x.fillStyle='#5a3a1c';x.textAlign='center';x.textBaseline='top';lines.forEach((l,i)=>x.fillText(l,px,by+8+i*19));x.restore()}
function arrowTo(P,o,col,t){const a=Math.atan2(o.y-P.y,o.x-P.x),r=58+Math.sin(t/250)*4;x.save();x.translate(P.x+Math.cos(a)*r,P.y-40+Math.sin(a)*r*.7);x.rotate(a);x.fillStyle=`rgba(${col},.85)`;x.shadowColor=`rgba(${col},1)`;x.shadowBlur=8;x.beginPath();x.moveTo(9,0);x.lineTo(-5,-6);x.lineTo(-2,0);x.lineTo(-5,6);x.fill();x.restore()}
const _dp6=drawPlayer;drawPlayer=function(P,t){if(!G)return _dp6(P,t);
 for(const n of G.npc||[]){if(dist(n.x,n.y,cam.x,cam.y)>1400)continue;const f=n.f,sleepy=f.id=='firefly'&&N<.55;drawCritter(f.id,n.x,n.y,f.h*1.15,t*(sleepy?.4:1),Math.sin(t/2000+n.t)*20,FRI[f.id].fly&&!sleepy?16:0);
  if(n.near)bubble(n.x,n.y-f.h*1.3-24,`${f.n}: “${f.task}”`);else{x.font='20px serif';x.textAlign='center';x.globalAlpha=.6+.4*Math.sin(t/400);x.fillText(sleepy?'💤':'💬',n.x+18,n.y-f.h*1.3-10-Math.sin(t/500)*3);x.globalAlpha=1}}
 const behind=(G.fr||[]).filter(f=>f.y<=P.y),front=(G.fr||[]).filter(f=>f.y>P.y);
 for(const f of behind)drawCritter(friendSpr(f.id),f.x,f.y,FRI[f.id].h*.9,t,f.vx,f.alt,f.joy);
 const hop=P.hop>0?Math.sin(Math.PI*(1-P.hop))*16:0;x.save();x.translate(0,-hop);_dp6(P,t);x.restore();
 for(const f of front)drawCritter(friendSpr(f.id),f.x,f.y,FRI[f.id].h*.9,t,f.vx,f.alt,f.joy);
 if(P.emo){const a=Math.min(1,P.emo.t*2),s=1+Math.max(0,P.emo.t-1.3)*1.5;x.save();x.globalAlpha=a;x.translate(P.x+22,P.y-118-hop-(1.6-P.emo.t)*8);x.scale(s,s);x.fillStyle='rgba(255,250,235,.95)';x.beginPath();x.arc(0,0,15,0,TAU);x.fill();x.strokeStyle='rgba(140,90,40,.5)';x.lineWidth=2;x.stroke();
  x.font='bold 20px Georgia';x.textAlign='center';x.textBaseline='middle';x.fillStyle=P.emo.k=='♥'?'#e0405a':'#7a4a1a';x.fillText(P.emo.k,0,1);x.restore()}
 if(G.pointI)arrowTo(P,G.pointI,'255,215,90',t);if(G.pointB)arrowTo(P,G.pointB,'200,160,255',t)};
// heart particles
const _sp6=sparkle;
// ---------- screen space: canopy dapple, firefly friend light, depth of field, quality autoscale ----------
const dofC=document.createElement('canvas'),dofG=dofC.getContext('2d');let dofMask=null,dofKey='';
const CANOPY={woods:1,pine:1,autumn:.8,log:.7,waterfall:.5};
const _mm6=drawMinimap;drawMinimap=function(){const now=performance.now();if(lastFrame){const ft=now-lastFrame;qT=qT*.95+ft*.05;if(QAUTO&&state=='play'){if(qT>21)qBad+=ft;else qBad=Math.max(0,qBad-ft*.5);if(qBad>2500&&Q>0){Q--;qBad=0;qT=16;if(Q==0){DPR=1;cv.width=W;cv.height=H}console.log('quality ->',Q)}}}lastFrame=now;
 if(G&&(state=='play'||state=='slowmo'||state=='reveal'||state=='journal')){const z=zoom,P=G.P;x.save();x.setTransform(DPR,0,0,DPR,0,0);
  // canopy: light filtering through leaves, moving dapples
  let cf=0;for(const k in CANOPY){const b=BIO[k];cf=Math.max(cf,CANOPY[k]*clamp(1.25-dist(cam.x,cam.y,b.x,b.y)/b.r,0,1))}cf=Math.max(cf,.12);
  if(Q>=1&&(1-N)>.05){x.globalCompositeOperation='multiply';x.fillStyle=`rgba(${200-40*cf|0},${210-40*cf|0},${170-30*cf|0},${.35*cf*(1-N)})`;x.fillRect(0,0,W,H);
   x.globalCompositeOperation='lighter';const ts=512*z*.75;for(const [k,sx,sy,al] of[[0,.012,.006,.22],[1,-.008,.01,.16]]){const ox=(((-cam.x*z+now*sx*z)%ts)+ts)%ts,oy=(((-cam.y*z+now*sy*z)%ts)+ts)%ts;x.globalAlpha=al*cf*(1-N)*(.85+.15*Math.sin(now/1700+k));for(let px=ox-ts;px<W;px+=ts)for(let py=oy-ts;py<H;py+=ts)x.drawImage(DAPPLE,px,py,ts,ts)}x.globalAlpha=1}
  // Glimmer lights the night
  if(SV.d.friends.includes('firefly')&&N>.2){x.globalCompositeOperation='lighter';const px=(P.x-cam.x)*z+W/2,py=(P.y-30-cam.y)*z+H/2,r=330*z;let g=x.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,`rgba(255,220,140,${.3*N})`);g.addColorStop(.5,`rgba(220,255,150,${.12*N})`);g.addColorStop(1,'rgba(200,255,150,0)');x.fillStyle=g;x.fillRect(px-r,py-r,r*2,r*2)}
  x.globalCompositeOperation='source-over';
  // depth of field at edges (cheap: blurred downsample masked to the borders)
  if(Q>=2){const dw=Math.max(2,W/5|0),dh=Math.max(2,H/5|0);if(dofKey!=dw+'x'+dh){dofKey=dw+'x'+dh;dofC.width=dw;dofC.height=dh;dofMask=document.createElement('canvas');dofMask.width=dw;dofMask.height=dh;const m=dofMask.getContext('2d'),gr=m.createRadialGradient(dw/2,dh/2,Math.min(dw,dh)*.42,dw/2,dh/2,Math.hypot(dw,dh)*.55);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,0,0,1)');m.fillStyle=gr;m.fillRect(0,0,dw,dh)}
   dofG.globalCompositeOperation='copy';dofG.filter='blur(1.5px)';dofG.drawImage(cv,0,0,dw,dh);dofG.filter='none';dofG.globalCompositeOperation='destination-in';dofG.drawImage(dofMask,0,0);x.imageSmoothingEnabled=true;x.globalAlpha=.85;x.drawImage(dofC,0,0,W,H);x.globalAlpha=1}
  x.restore()}
 _mm6()};
// heart-shaped particles: draw as small hearts by reusing star renderer colour (pink); ok as is.
// ---------- richer, more natural ground (detail layers + relief shading) ----------
const _bg6=bakeGround;bakeGround=function(tex){const g=_bg6(tex);if(!g)return g;const c=g.getContext('2d');c.save();c.setTransform(GS,0,0,GS,0,0);const R=mulberry(4242);
 const bm=(px,py)=>biomeAt(px,py);
 // soil patches & moss cushions
 for(let i=0;i<5200;i++){const px=R()*MW,py=R()*MH,b=bm(px,py),r=4+R()*14;
  if(b=='dunes'||b=='cave'){c.fillStyle=b=='dunes'?`rgba(${190+R()*40|0},${160+R()*30|0},${110+R()*30|0},.35)`:`rgba(${90+R()*50|0},${95+R()*50|0},${120+R()*50|0},.35)`;c.beginPath();c.ellipse(px,py,r,r*.6,R()*3,0,TAU);c.fill();continue}
  if(R()<.35){c.fillStyle=`rgba(${70+R()*30|0},${50+R()*20|0},${25+R()*15|0},.28)`;c.beginPath();c.ellipse(px,py,r*1.6,r,R()*3,0,TAU);c.fill()}
  else{const gr=c.createRadialGradient(px-r*.3,py-r*.35,0,px,py,r);const gcol=b=='autumn'?[170,120,40]:b=='pine'?[70,100,50]:[110+R()*40|0,150+R()*30|0,50];gr.addColorStop(0,`rgba(${gcol[0]+50},${gcol[1]+40},${gcol[2]+30},.55)`);gr.addColorStop(.7,`rgba(${gcol[0]},${gcol[1]},${gcol[2]},.4)`);gr.addColorStop(1,`rgba(${gcol[0]*.4|0},${gcol[1]*.4|0},${gcol[2]*.4|0},0)`);c.fillStyle=gr;c.beginPath();c.arc(px,py,r,0,TAU);c.fill()}}
 // leaf litter, twigs, tiny pebbles
 for(let i=0;i<9000;i++){const px=R()*MW,py=R()*MH,b=bm(px,py);if(b=='dunes'){if(R()<.6)continue}if(inWater(px,py,0))continue;const k=R();
  if(k<.45){const cols=b=='autumn'?['#c86a24','#e09a3a','#8a3a12']:b=='pine'?['#8a6a3a','#6a4a24']:['#8a7a3a','#a08a4a','#6a5a2a','#9a6a2a'];c.fillStyle=cols[i%cols.length];c.globalAlpha=.55;c.save();c.translate(px,py);c.rotate(R()*TAU);c.beginPath();c.ellipse(0,0,4+R()*5,1.6+R()*2.2,0,0,TAU);c.fill();c.globalAlpha=.25;c.fillStyle='#000';c.fillRect(-4,-.3,8,.6);c.restore()}
  else if(k<.6){c.strokeStyle='rgba(90,60,30,.55)';c.lineWidth=1.4+R();c.save();c.translate(px,py);c.rotate(R()*TAU);c.beginPath();c.moveTo(-8-R()*8,0);c.lineTo(8+R()*8,R()*3-1.5);c.stroke();c.restore()}
  else{const r=1.5+R()*3;c.globalAlpha=.8;c.fillStyle='rgba(30,20,10,.35)';c.beginPath();c.ellipse(px+1,py+1.2,r,r*.7,0,0,TAU);c.fill();c.fillStyle=b=='cave'?'#a8b0c8':'#b8a888';c.beginPath();c.ellipse(px,py,r,r*.7,0,0,TAU);c.fill();c.fillStyle='rgba(255,255,240,.5)';c.beginPath();c.ellipse(px-r*.3,py-r*.25,r*.4,r*.25,0,0,TAU);c.fill()}
  c.globalAlpha=1}
 c.restore();
 // relief shading from luminance gradient (normal-ish lighting from top-left)
 try{const Wd=g.width,Hd=g.height,id=c.getImageData(0,0,Wd,Hd),p=id.data,L=new Float32Array(Wd*Hd);for(let i=0,j=0;i<L.length;i++,j+=4)L[i]=p[j]*.3+p[j+1]*.59+p[j+2]*.11;
  for(let yy=1;yy<Hd-1;yy++)for(let xx=1;xx<Wd-1;xx++){const i=yy*Wd+xx,gr=(L[i-Wd-1]+L[i-1]+L[i-Wd])-(L[i+Wd+1]+L[i+1]+L[i+Wd]),s=clamp(1+gr*.0022,.8,1.22),j=i*4;p[j]=Math.min(255,p[j]*s);p[j+1]=Math.min(255,p[j+1]*s);p[j+2]=Math.min(255,p[j+2]*s)}
  c.putImageData(id,0,0)}catch(e){}
 return g};
// ---------- Friends tab in the journal ----------
const _rj6=renderJournal;renderJournal=function(){const fr=jTab=='friend';if(fr)jTab='bug';_rj6();if(fr){jTab='friend';[...tabs.children].forEach(b=>b.className='b n')}
 const b=document.createElement('button');b.className='b '+(fr?'':'n');b.style.cssText='font-size:14px;padding:7px 10px';b.textContent=`🤝 Friends ${SV.d.friends.length}/${FRIENDS.length}`;b.onclick=()=>{jTab='friend';S.pop();renderJournal()};tabs.appendChild(b);
 if(!fr)return;const el=$('jGrid');el.innerHTML='';
 for(const f of FRIENDS){const has=SV.d.friends.includes(f.id),d=document.createElement('div');d.className=`card ${has?'rare':'common'}`;d.appendChild(portrait(friendSpr(f.id),90,64,2,false,!has));
  d.insertAdjacentHTML('beforeend',`<div class="nm">${has?(f.id=='caterpillar'&&SV.d.bfly?'Pip the Butterfly':f.n):f.n}</div><div class="tag" style="color:${has?'#3a8a3a':'#8a6a3a'}">${has?'💞 Friend':'📍 '+BIO[f.home].n+' · '+f.tl}</div>`);
  d.title=has?f.help:`${f.n} lives in ${BIO[f.home].n}. Task: ${f.tl}. Reward: ${f.help}`;el.appendChild(d)}};
// ---------- quality setting in the sound panel ----------
(()=>{const p=document.querySelector('#sSound .parch');if(!p)return;const b=document.createElement('button');b.className='b n';b.style.marginTop='8px';const lbl=()=>b.textContent='✨ Graphics: '+(QAUTO?'Auto':['Low','Medium','High'][Q]);lbl();
 b.onclick=()=>{S.pop();if(QAUTO){QAUTO=false;Q=2}else if(Q>0)Q--;else{QAUTO=true;Q=2}if(Q>0&&DPR<Math.min(2,devicePixelRatio||1))resize();lbl()};const last=p.querySelector('button');last?last.parentNode.insertBefore(b,last):p.appendChild(b)})();
window.__v6={get Q(){return Q},BUF,FRIENDS,react,surface};
// =====================================================================
// v7: DIG · SEARCH · LEAF BOAT · FLY  (+ river & bigger lake, new finds)
// =====================================================================
SV.d.tut=SV.d.tut||{};
// ---------- bigger lake + river ----------
BIO.pond.wr=470;BIO.pond.r=720;
const RIVERS=[[[3150,1330],[3420,1560],[3640,1720],[3830,1880]],[[3960,2060],[4060,2500],[4180,2950],[4300,3400],[4380,3800],[4440,4100]],[[2420,1250],[2150,1500],[1900,1650],[1600,1700],[1300,1650],[1000,1500]]];
const RW=62;
function segD(px,py,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=clamp(((px-a[0])*dx+(py-a[1])*dy)/(dx*dx+dy*dy),0,1);return[dist(px,py,a[0]+dx*t,a[1]+dy*t),a[0]+dx*t,a[1]+dy*t]}
function riverNear(px,py){let best=[1e9,0,0];for(const R of RIVERS)for(let i=0;i<R.length-1;i++){const r=segD(px,py,R[i],R[i+1]);if(r[0]<best[0])best=r}return best}
let BYPASS=false;
const isFord=(px,py)=>nearTrail(px,py)<58;
const _inW7=inWater;inWater=function(px,py,m=0){if(BYPASS)return false;if(_inW7(px,py,m))return true;const r=riverNear(px,py);return r[0]<RW+m&&!isFord(px,py)};
const _WAT6=WATERS;
const _surf6=surface;surface=function(px,py){const r=riverNear(px,py);if(r[0]<RW+24)return isFord(px,py)?'stone':'water';return _surf6(px,py)};
const _bw7=buildWorld;buildWorld=function(seed){_bw7(seed);const keep=d=>['lily','reed'].includes(d.k)||!(riverNear(d.x,d.y)[0]<RW+18)||isFord(d.x,d.y)&&d.k=='pebble';
 DECOR=DECOR.filter(d=>keep(d)&&!(dist(d.x,d.y,BIO.pond.x,BIO.pond.y)<BIO.pond.wr+8&&!['lily','reed'].includes(d.k)));
 const R=mulberry(seed+77);for(const Rv of RIVERS)for(let i=0;i<Rv.length-1;i++){const[a,b]=[Rv[i],Rv[i+1]],L=dist(a[0],a[1],b[0],b[1]);for(let s=0;s<L;s+=46){const t=s/L,cx=lerp(a[0],b[0],t),cy=lerp(a[1],b[1],t),nx=-(b[1]-a[1])/L,ny=(b[0]-a[0])/L;
   if(isFord(cx,cy)){if(R()<.8)DECOR.push({k:'pebble',v:R()*8|0,x:cx+nx*(R()-.5)*90,y:cy+ny*(R()-.5)*90,s:1.3+R()*.4,fl:R()<.5});continue}
   for(const sd of[-1,1])if(R()<.55)DECOR.push({k:'reed',v:R()*8|0,x:cx+nx*sd*(RW+4+R()*14),y:cy+ny*sd*(RW+4+R()*14),s:.75+R()*.4,fl:R()<.5});if(R()<.25)DECOR.push({k:'lily',v:R()*8|0,x:cx+nx*(R()-.5)*RW,y:cy+ny*(R()-.5)*RW,s:.7+R()*.4,fl:R()<.5})}}
 for(let i=0;i<40;i++){let a=R()*TAU,r=60+R()*(BIO.pond.wr-90);DECOR.push({k:'lily',v:R()*8|0,x:BIO.pond.x+Math.cos(a)*r,y:BIO.pond.y+Math.sin(a)*r,s:.8+R()*.6,fl:R()<.5})}
 FLAT=DECOR.filter(d=>['leafd','lily','web'].includes(d.k));TALL=DECOR.filter(d=>!FLAT.includes(d));TALL_G=bucket(TALL);FLAT_G=bucket(FLAT)};
const _bg7=bakeGround;bakeGround=function(tex){const g=_bg7(tex);if(!g)return g;const c=g.getContext('2d');c.save();c.setTransform(GS,0,0,GS,0,0);c.lineCap='round';c.lineJoin='round';
 const path=R=>{c.beginPath();R.forEach(([a,b],i)=>i?c.lineTo(a,b):c.moveTo(a,b))};
 for(const R of RIVERS){c.strokeStyle='rgba(80,60,30,.45)';c.lineWidth=RW*2+70;c.filter='blur(14px)';path(R);c.stroke();c.filter='none';c.strokeStyle='#2c6670';c.lineWidth=RW*2;path(R);c.stroke();c.strokeStyle='#4a92a0';c.lineWidth=RW*1.4;path(R);c.stroke();c.strokeStyle='rgba(140,200,205,.55)';c.lineWidth=RW*.5;path(R);c.stroke();c.strokeStyle='rgba(230,250,240,.3)';c.lineWidth=4;c.setLineDash([30,40]);path(R);c.stroke();c.setLineDash([])}
 // fords: stepping-stone shallows
 for(const R of RIVERS)for(let i=0;i<R.length-1;i++){const L=dist(R[i][0],R[i][1],R[i+1][0],R[i+1][1]);for(let s=0;s<L;s+=20){const t=s/L,px=lerp(R[i][0],R[i+1][0],t),py=lerp(R[i][1],R[i+1][1],t);if(isFord(px,py)){c.fillStyle='rgba(170,150,110,.5)';c.beginPath();c.arc(px,py,RW*.95,0,TAU);c.fill()}}}
 // bigger lake (redraw)
 const P=BIO.pond;let gg=c.createRadialGradient(P.x,P.y,P.wr*.6,P.x,P.y,P.wr+90);gg.addColorStop(0,'rgba(90,70,40,.5)');gg.addColorStop(1,'rgba(90,70,40,0)');c.fillStyle=gg;c.beginPath();c.arc(P.x,P.y,P.wr+90,0,TAU);c.fill();
 let wg=c.createRadialGradient(P.x-P.wr*.2,P.y-P.wr*.2,10,P.x,P.y,P.wr);wg.addColorStop(0,'#8ac8c8');wg.addColorStop(.6,'#4a90a0');wg.addColorStop(1,'#2a5a60');c.fillStyle=wg;c.beginPath();for(let i=0;i<=48;i++){let a=i/48*TAU,r=P.wr+Math.sin(a*3)*P.wr*.035;c.lineTo(P.x+Math.cos(a)*r,P.y+Math.sin(a)*r)}c.fill();c.strokeStyle='rgba(230,250,240,.35)';c.lineWidth=5;c.stroke();
 c.restore();return g};
// ---------- procedural painted-ish icons for new finds ----------
function icon(id){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.translate(64,70);g.lineCap='round';
 const blob=(r,c0,c1,ox=-.3,oy=-.35,sx=1,sy=1)=>{const gr=g.createRadialGradient(r*ox,r*oy,r*.1,0,0,r*1.05);gr.addColorStop(0,c0);gr.addColorStop(1,c1);g.fillStyle=gr;g.beginPath();g.ellipse(0,0,r*sx,r*sy,0,0,TAU);g.fill()};
 const hl=(px,py,r,a=.7)=>{g.fillStyle=`rgba(255,255,255,${a})`;g.beginPath();g.ellipse(px,py,r,r*.6,-.5,0,TAU);g.fill()};
 g.shadowColor='rgba(40,25,10,.45)';g.shadowBlur=8;g.shadowOffsetY=4;
 ({acorn(){g.save();g.translate(0,10);blob(30,'#e0a050','#7a4818',-.3,-.3,.85,1);g.restore();g.shadowBlur=0;g.save();g.translate(0,-14);blob(30,'#8a6a3a','#3a2a12',-.2,-.4,1,.5);g.restore();g.strokeStyle='#4a3216';g.lineWidth=5;g.beginPath();g.moveTo(0,-26);g.lineTo(4,-40);g.stroke();hl(-10,6,6)},
  seed(){g.rotate(.4);blob(30,'#f4f0e0','#3a3428',-.1,-.1,.55,1);g.shadowBlur=0;g.strokeStyle='rgba(40,35,30,.8)';g.lineWidth=3;for(const sx of[-8,0,8]){g.beginPath();g.moveTo(sx,-26);g.lineTo(sx*.7,26);g.stroke()}},
  cockle(){blob(34,'#fff0e0','#d89070',0,-.5,1,.85);g.shadowBlur=0;g.strokeStyle='rgba(170,100,70,.6)';g.lineWidth=2.5;for(let i=-4;i<=4;i++){g.beginPath();g.moveTo(0,26);g.lineTo(i*8,-26);g.stroke()}},
  button(){blob(34,'#e05a6a','#7a1a2a');g.shadowBlur=0;g.strokeStyle='rgba(255,255,255,.3)';g.lineWidth=3;g.beginPath();g.arc(0,0,26,0,TAU);g.stroke();g.fillStyle='#4a0a14';for(const[a,b]of[[-8,-8],[8,-8],[-8,8],[8,8]]){g.beginPath();g.arc(a,b,4.5,0,TAU);g.fill()}hl(-14,-16,8,.45)},
  marble(){blob(32,'rgba(200,240,255,1)','rgba(40,110,190,1)');g.shadowBlur=0;g.strokeStyle='rgba(255,120,60,.85)';g.lineWidth=6;g.beginPath();g.moveTo(-22,8);g.bezierCurveTo(-8,-20,8,24,22,-6);g.stroke();hl(-12,-14,9,.9)},
  coin(){blob(32,'#f0c070','#8a5a1a');g.shadowBlur=0;g.strokeStyle='rgba(90,55,15,.7)';g.lineWidth=3;g.beginPath();g.arc(0,0,24,0,TAU);g.stroke();g.fillStyle='rgba(90,55,15,.75)';g.font='bold 30px Georgia';g.textAlign='center';g.textBaseline='middle';g.fillText('✦',0,2);g.fillStyle='rgba(60,140,110,.35)';g.beginPath();g.arc(14,12,8,0,TAU);g.fill();hl(-12,-14,7,.5)},
  key(){g.rotate(-.6);g.strokeStyle='#c89a3a';g.lineWidth=9;g.beginPath();g.arc(0,-22,13,0,TAU);g.stroke();g.beginPath();g.moveTo(0,-9);g.lineTo(0,34);g.stroke();g.lineWidth=7;g.beginPath();g.moveTo(0,22);g.lineTo(11,22);g.moveTo(0,32);g.lineTo(9,32);g.stroke();g.shadowBlur=0;g.strokeStyle='rgba(255,240,180,.8)';g.lineWidth=2.5;g.beginPath();g.arc(-3,-25,10,3.4,4.8);g.stroke()},
  thimble(){g.fillStyle='#b8c0c8';const gr=g.createLinearGradient(-26,0,26,0);gr.addColorStop(0,'#7a8088');gr.addColorStop(.35,'#f0f4f8');gr.addColorStop(1,'#6a7078');g.fillStyle=gr;g.beginPath();g.moveTo(-24,28);g.lineTo(-20,-18);g.quadraticCurveTo(0,-38,20,-18);g.lineTo(24,28);g.closePath();g.fill();g.shadowBlur=0;g.fillStyle='rgba(60,65,70,.35)';for(let yy=-16;yy<22;yy+=8)for(let xx=-18;xx<=18;xx+=8){g.beginPath();g.arc(xx+(yy%16?4:0),yy,1.8,0,TAU);g.fill()}},
  waterlily(){for(let i=0;i<8;i++){g.save();g.rotate(i/8*TAU);g.fillStyle=i%2?'#ffd0e0':'#f8a8c8';g.beginPath();g.ellipse(0,-20,9,22,0,0,TAU);g.fill();g.restore()}g.shadowBlur=0;blob(9,'#fff4a0','#e0a020')},
  pondsnail(){g.rotate(-.3);blob(30,'#c8a070','#4a3018',-.3,-.4,.8,1);g.shadowBlur=0;g.strokeStyle='rgba(60,35,15,.7)';g.lineWidth=3;g.beginPath();for(let a=0;a<12;a+=.2){const r=2+a*2.1;g.lineTo(Math.cos(a)*r*.8,Math.sin(a)*r-4)}g.stroke();hl(-8,-12,6,.5)},
  petal(){g.rotate(.5);const gr=g.createLinearGradient(0,-30,0,30);gr.addColorStop(0,'#fff0f4');gr.addColorStop(1,'#f090b0');g.fillStyle=gr;g.beginPath();g.moveTo(0,32);g.bezierCurveTo(-34,8,-22,-30,-4,-26);g.lineTo(0,-18);g.lineTo(4,-26);g.bezierCurveTo(22,-30,34,8,0,32);g.fill();g.shadowBlur=0;g.strokeStyle='rgba(200,90,130,.35)';g.lineWidth=2;g.beginPath();g.moveTo(0,28);g.lineTo(0,-14);g.stroke()},
  pearl(){blob(26,'#ffffff','#c0b8d8');g.shadowBlur=0;hl(-9,-10,8,.9);g.fillStyle='rgba(255,200,230,.25)';g.beginPath();g.arc(8,8,10,0,TAU);g.fill()},
  feather(){g.rotate(-.7);const gr=g.createLinearGradient(-14,0,14,0);gr.addColorStop(0,'#2a5aa8');gr.addColorStop(.5,'#6aa8e8');gr.addColorStop(1,'#1a3a78');g.fillStyle=gr;g.beginPath();g.moveTo(0,-44);g.bezierCurveTo(22,-20,16,26,0,40);g.bezierCurveTo(-16,26,-22,-20,0,-44);g.fill();g.shadowBlur=0;g.fillStyle='#10204a';for(let yy=-30;yy<24;yy+=10)g.fillRect(-14,yy,28,3);g.strokeStyle='#f0f0e8';g.lineWidth=2.5;g.beginPath();g.moveTo(0,-40);g.lineTo(0,46);g.stroke()},
  robinegg(){g.save();g.rotate(.2);blob(32,'#c8f0f0','#4aa8b0',-.3,-.4,.8,1);g.restore();g.shadowBlur=0;g.fillStyle='rgba(60,90,90,.5)';const R=mulberry(5);for(let i=0;i<16;i++){g.beginPath();g.arc((R()-.5)*36,(R()-.5)*48,1.2+R()*1.6,0,TAU);g.fill()}hl(-9,-14,7,.6)},
  pollen(){g.shadowColor='rgba(255,210,60,.9)';g.shadowBlur=24;g.shadowOffsetY=0;blob(24,'#fff6b0','#f0a010');g.shadowBlur=0;g.fillStyle='rgba(255,250,210,.9)';for(let i=0;i<10;i++){const a=i*.63;g.beginPath();g.arc(Math.cos(a)*30,Math.sin(a)*30,2.4,0,TAU);g.fill()}},
  skyquartz(){g.shadowColor='rgba(180,220,255,.9)';g.shadowBlur=18;for(const[ox,h,w,r]of[[-12,52,13,-.25],[6,64,15,.1],[20,40,11,.4]]){g.save();g.translate(ox,28);g.rotate(r);const gr=g.createLinearGradient(-w,0,w,0);gr.addColorStop(0,'#c8e8ff');gr.addColorStop(.5,'#ffffff');gr.addColorStop(1,'#7ab0e8');g.fillStyle=gr;g.beginPath();g.moveTo(-w,0);g.lineTo(-w,-h+10);g.lineTo(0,-h);g.lineTo(w,-h+10);g.lineTo(w,0);g.fill();g.restore()}}})[id]();return c}
const NEWIT=[
 {id:'acorn',c:'treas',n:'Old Acorn',r:'common',b:['autumn','woods','log','pine'],f:'Squirrels and jays bury thousands of acorns and forget many of them — that is how new oak trees get planted!'},
 {id:'seed',c:'treas',n:'Sunflower Seed',r:'common',b:['meadow','flowers','dunes'],f:'A single sunflower head can hold over 1,000 seeds, arranged in perfect spirals.'},
 {id:'cockle',c:'treas',n:'Buried Cockle',r:'common',b:['dunes'],f:'Cockles bury themselves in sand with a muscular "foot" and can even jump to escape danger.'},
 {id:'button',c:'treas',n:'Lost Button',r:'rare',b:['meadow','log','autumn','flowers'],relic:1,f:'A relic! Buttons were once carved from shell, bone and wood long before plastic existed.'},
 {id:'marble',c:'treas',n:'Glass Marble',r:'rare',b:['dunes','meadow','pine'],relic:1,f:'A relic! Glass marbles became popular in the 1800s, when a special pair of scissors made them quick to shape.'},
 {id:'coin',c:'treas',n:'Old Coin',r:'rare',b:['dunes','log','cave'],relic:1,f:'A relic! Copper coins turn green over time as the metal slowly reacts with air and water.'},
 {id:'key',c:'treas',n:'Tiny Key',r:'legendary',b:['cave','log','autumn'],relic:1,f:'A legendary relic! Nobody knows what this tiny key once opened... a fairy door, perhaps?'},
 {id:'thimble',c:'treas',n:'Silver Thimble',r:'legendary',b:['flowers','meadow','pine'],relic:1,f:'A legendary relic! Thimbles protect fingertips while sewing and have been used for over 2,000 years.'},
 {id:'waterlily',c:'water',n:'Water Lily',r:'common',b:['pond'],f:'Water lily flowers open in the morning and close in the afternoon. Their pads can float thanks to air pockets inside.'},
 {id:'pondsnail',c:'water',n:'Pond Snail',r:'common',b:['pond','waterfall'],f:'Pond snails breathe air: they glide up to the surface and open a tiny breathing hole.'},
 {id:'petal',c:'water',n:'Floating Petal',r:'common',b:['pond','waterfall'],f:'Petals float because they are light and waxy, so water beads up instead of soaking in.'},
 {id:'pearl',c:'water',n:'Freshwater Pearl',r:'legendary',b:['pond'],f:'Freshwater mussels form pearls by coating a tiny irritant with layer after layer of shimmering nacre.'},
 {id:'feather',c:'sky',n:'Jay Feather',r:'common',b:['woods','pine','autumn'],f:'Jay feathers are not really blue! Their colour comes from light scattering in tiny structures, not pigment.'},
 {id:'pollen',c:'sky',n:'Golden Pollen',r:'common',b:['flowers','meadow'],f:'Pollen grains are so small that a spoonful holds millions, and each plant\'s pollen has its own unique shape.'},
 {id:'robinegg',c:'sky',n:'Robin\'s Eggshell',r:'rare',b:['woods','log','autumn'],f:'Robin eggs are blue-green thanks to a pigment called biliverdin. Shells left in nests mean the chicks have hatched!'},
 {id:'skyquartz',c:'sky',n:'Sky Quartz',r:'legendary',b:['cave'],f:'Clear quartz grows in long six-sided crystals. These ones perch high up where only flyers can reach!'}];
NEWIT.forEach(it=>{it.v7=1;ITEMS.push(it);ITEMI[it.id]=it;IMG[it.id]=icon(it.id)});
Object.assign(CATS,{treas:{n:'Treasures',e:'🗝️'},water:{n:'Water',e:'🪷'},sky:{n:'Sky',e:'☁️'}});
// ---------- per-run placement: dig spots, search stashes, water & sky finds, dandelions ----------
const SOFT={dunes:3,autumn:2.4,log:2.2,pine:2,woods:1.4,meadow:1,flowers:1,cave:1.2,waterfall:.6,pond:.5};
const wpick=(R,list)=>{const w=list.map(i=>({common:6,rare:3,legendary:1}[i.r]));let s=w.reduce((a,b)=>a+b,0),k=R()*s;for(let i=0;i<list.length;i++){k-=w[i];if(k<=0)return list[i]}return list[0]};
const _ng7=newGame;newGame=function(daily){_ng7(daily);const R=mulberry(G.seed+21),P=G.P;P.fly=0;P.boat=0;P.alt=0;P.flyK=0;G.digs=[];G.wat=[];G.sky=[];G.dand=[];
 for(const bk in SOFT){const n=Math.round(14*SOFT[bk]);for(let i=0;i<n;i++){const[px,py]=rpIn(bk);if(inWater(px,py,20))continue;let r=R(),loot;const tr=ITEMS.filter(i=>i.c=='treas'&&i.b.includes(bk)),gm=ITEMS.filter(i=>i.c=='gem'&&i.b.includes(bk));
  if(r<.14&&gm.length)loot=wpick(R,gm).id;else if(r<.3||!tr.length)loot='dew';else loot=wpick(R,tr).id;G.digs.push({x:px,y:py,loot,dug:0,glow:0,t:R()*9})}}
 // search stashes in bushes, leaves, flowers, logs
 const hideK=new Set(['berrybush','leafpile','flower','wildflowers','birchstump','treeroot','fern','log','bigclover']);
 for(const d of TALL){d.hide=null;if(!hideK.has(d.k)||R()>.16)continue;const bk=biomeAt(d.x,d.y),c=ITEMS.filter(i=>['berry','herb','mush'].includes(i.c)&&!i.night&&i.b.includes(bk));d.hide=c.length&&R()<.7?wpick(R,c).id:'dew'}
 // water-only finds (lake + rivers)
 const wat=ITEMS.filter(i=>i.c=='water');for(let i=0;i<34;i++){let px,py,ok=false;for(let k=0;k<30&&!ok;k++){if(R()<.55){const a=R()*TAU,r=40+R()*(BIO.pond.wr-70);px=BIO.pond.x+Math.cos(a)*r;py=BIO.pond.y+Math.sin(a)*r}else{const Rv=RIVERS[R()*RIVERS.length|0],j=R()*(Rv.length-1)|0,t=R();px=lerp(Rv[j][0],Rv[j+1][0],t)+(R()-.5)*50;py=lerp(Rv[j][1],Rv[j+1][1],t)+(R()-.5)*50}ok=inWater(px,py,-18)}
  if(!ok)continue;let it=wpick(R,wat);if(it.id=='pearl'&&dist(px,py,BIO.pond.x,BIO.pond.y)>BIO.pond.wr)it=wat[0];G.wat.push({it,x:px,y:py,t:R()*9,got:0})}
 // sky-only finds on treetops, flower tops & high crystals
 const perch={feather:['treeroot','birchstump'],robinegg:['treeroot','birchstump'],pollen:['flower','wildflowers'],skyquartz:['crystalrock']};
 for(const it of ITEMS.filter(i=>i.c=='sky')){const cand=TALL.filter(d=>perch[it.id].includes(d.k)&&it.b.includes(biomeAt(d.x,d.y)));const n={common:10,rare:6,legendary:4}[it.r];for(let i=0;i<n&&cand.length;i++){const d=cand[R()*cand.length|0];G.sky.push({it,x:d.x,y:d.y,h:d.k=='crystalrock'?95:d.k.includes('flower')?70:120,t:R()*9,got:0})}}
 // dandelion seed rides
 for(let i=0;i<16;i++){const[px,py]=rpIn(['meadow','flowers','dunes','waterfall'][i%4]);if(!inWater(px,py,30))G.dand.push({x:px,y:py,used:0,t:R()*9})}};
// ---------- sounds ----------
let NZ=null;function noiseBuf(){const A=S.ctx();if(!NZ){NZ=A.createBuffer(1,A.sampleRate*2,A.sampleRate);const d=NZ.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1}return NZ}
function nburst(f,dur,v,q=1.2,t0=0){if(!aOK())return;const A=S.ctx(),t=A.currentTime+t0,s=A.createBufferSource();s.buffer=noiseBuf();const bp=A.createBiquadFilter();bp.type='bandpass';bp.frequency.value=f;bp.Q.value=q;const g=A.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v*MU.vol.sfx,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(bp).connect(g).connect(S.out());s.start(t,Math.random());s.stop(t+dur+.05)}
const LOOPS={};function loopGain(k,f,type='lowpass',q=.7){if(!aOK())return null;if(LOOPS[k])return LOOPS[k];const A=S.ctx(),s=A.createBufferSource();s.buffer=noiseBuf();s.loop=true;const fl=A.createBiquadFilter();fl.type=type;fl.frequency.value=f;fl.Q.value=q;const g=A.createGain();g.gain.value=0;s.connect(fl).connect(g).connect(S.out());s.start();LOOPS[k]={g,fl};return LOOPS[k]}
function setLoop(k,f,v,type){const L=loopGain(k,f,type);if(!L)return;const A=S.ctx();L.g.gain.setTargetAtTime(v*MU.vol.sfx,A.currentTime,.25)}
const SX7={scrape(sf){nburst(1400+fx()*800,.18,.09,1.5);playB((sf=='sand'?'sand':sf=='leaves'?'leaves':'moss')+(1+(fx()*3|0)),.8,.7+fx()*.15)},
 search(){[0,4,7,9].forEach((n,i)=>syn(PENTA[n%PENTA.length]*.5*(n>6?2:1),.9,.04,'sine',i*.09));nburst(3000,.6,.02,.6)},
 paddle(){playB('water'+(1+(fx()*3|0)),.55,.6+fx()*.15);nburst(700,.25,.03,.8)},
 takeoff(){nburst(500,1.2,.08,.5);[0,2,4,7].forEach((n,i)=>syn(PENTA[n],.6,.035,'triangle',i*.07))},
 land(){nburst(300,.4,.07,.6);playB('moss2',.8,.9)},
 board(){playB('water2',.8,.85);syn(500,.3,.04,'sine',0,300)}};
// ---------- helpers ----------
function nearestWater(px,py){let best=null,bd=1e9;const P0=BIO.pond;{const a=Math.atan2(py-P0.y,px-P0.x),d=dist(px,py,P0.x,P0.y)-P0.wr;if(d<bd){bd=d;best=[P0.x+Math.cos(a)*(P0.wr-34),P0.y+Math.sin(a)*(P0.wr-34)]}}
 const W2=BIO.waterfall;{const cy=W2.y+30,a=Math.atan2(py-cy,px-W2.x),d=dist(px,py,W2.x,cy)-W2.wr;if(d<bd){bd=d;best=[W2.x+Math.cos(a)*(W2.wr-30),cy+Math.sin(a)*(W2.wr-30)]}}
 const r=riverNear(px,py);if(r[0]-RW<bd&&!isFord(r[1],r[2])){bd=r[0]-RW;best=[r[1],r[2]]}return bd<46&&best&&inWater(best[0],best[1])?best:null}
function nearestLand(px,py){for(let rr=40;rr<=110;rr+=14)for(let k=0;k<16;k++){const a=k/16*TAU,qx=px+Math.cos(a)*rr,qy=py+Math.sin(a)*rr;if(!inWater(qx,qy,8)&&qx>40&&qy>40&&qx<MW-40&&qy<MH-40)return[qx,qy]}return null}
function tut(k,msg){if(SV.d.tut[k])return;SV.d.tut[k]=1;SV.save();toast(msg,4800);SX.shimmer(.8)}
const canFlyFree=()=>SV.d.bfly;
function ctx7(){const P=G.P;const r={};if(P.fly){r.fly='land';return r}if(P.dig>0||P.hopTo)return r;
 if(P.boat){if(nearestLand(P.x,P.y))r.board='land';return r}
 r.search=1;const dg=G.digs.find(d=>!d.dug&&dist(d.x,d.y,P.x,P.y)<44);r.dig=dg||'any';if(dg)r.digHot=1;
 if(nearestWater(P.x,P.y))r.board='board';
 const dn=G.dand.find(d=>!d.used&&dist(d.x,d.y,P.x,P.y)<55);if(canFlyFree()||dn)r.fly=dn&&!canFlyFree()?dn:'free';return r}
// ---------- actions ----------
function doDig(){if(state!='play')return;const P=G.P,c=ctx7();if(!c.dig||P.dig>0)return;P.dig=1;P.digT=c.dig;const sf=surface(P.x,P.y);P.digSf=sf;emote('⛏');SX7.scrape(sf)}
function finishDig(){const P=G.P,d=P.digT;const sfc=P.digSf;const col=sfc=='sand'?'225,200,150':sfc=='leaves'?'170,100,40':'110,80,45';puff(P.x+14,P.y+4,22,col,90,.9,3.4,60);RIP.push({x:P.x+14,y:P.y+4,t:0,m:.6,r:24,c:'120,90,50'});
 if(d&&d!=='any'){d.dug=1;if(d.loot=='dew'){G.dew+=4;SV.d.dew+=4;S.dew();updHUD();toast('💧 You dug up 4 dewdrops!');emote('♥',1)}else{const o={it:ITEMI[d.loot],x:P.x+16,y:P.y+6,t:0,got:false,ft:0,rv:1};G.items.push(o);sparkle(o.x,o.y-8,24,'255,230,150');collect(o)}}
 else{const roll=fx();if(roll<.18){G.dew+=1;SV.d.dew+=1;S.dew();updHUD();toast('💧 A tiny dewdrop!',1400)}else toast(fx()<.5?'Just soil and roots... look for little mounds ✨':'Nothing here. Try a soft mound nearby!',1800)}}
function doSearch(){if(state!='play')return;const P=G.P;if(P.fly||P.dig>0||(P.srch||0)>0)return;P.srch=1.1;emote('🔍');SX7.search();RIP.push({x:P.x,y:P.y,t:0,m:1.1,r:150,c:'255,240,190'},{x:P.x,y:P.y,t:-.2,m:1.1,r:110,c:'255,250,220'});let found=0,R2=240;
 setTimeout(()=>{if(!G)return;for(const d of nearDecor(TALL_G,P.x-R2,P.y-R2,P.x+R2,P.y+R2,0)){if(dist(d.x,d.y,P.x,P.y)>R2)continue;if(d.hide){react(d,true);const id=d.hide;d.hide=null;found++;if(id=='dew'){G.dews.push({x:d.x+(fx()-.5)*30,y:d.y+18,v:3,t:0});sparkle(d.x,d.y-12,12,'200,235,255')}else spawnItem(id,d.x+(fx()-.5)*36,d.y+22)}}
  for(const o of G.items)if(o.it.hid&&o.rv<1&&!o.got&&dist(o.x,o.y,P.x,P.y)<R2){o.rv=1;found++;sparkle(o.x,o.y-10,20,'200,225,255')}
  for(const d of G.digs)if(!d.dug&&dist(d.x,d.y,P.x,P.y)<R2*1.3){d.glow=6;found+=.01}
  if(found>=1){SX.shimmer(1.2);toast(`✨ You found ${found|0} hidden thing${found>=2?'s':''}!`)}else if(found>0)toast('✨ The soil is soft over there... try digging!');else toast('Nothing hidden here. Bushes, logs and leaf piles hide the most!',2200)},450)}
function doBoard(){if(state!='play')return;const P=G.P,c=ctx7();if(!c.board)return;if(c.board=='board'){const w=nearestWater(P.x,P.y);if(!w)return;P.hopTo={x0:P.x,y0:P.y,x1:w[0],y1:w[1],t:0,boat:1};SX7.board();P.hop=1;tut('boat2','⛵ Sailing! Steer like walking. Find lilies, pond snails & petals. Press B / Land near shore.')}
 else{const l=nearestLand(P.x,P.y);if(!l)return;P.hopTo={x0:P.x,y0:P.y,x1:l[0],y1:l[1],t:0,boat:0};P.hop=1;SX7.board()}}
function doFly(){if(state!='play')return;const P=G.P,c=ctx7();if(!c.fly)return;if(P.fly){if(inWater(P.x,P.y,10)){toast('🌿 Find dry land to land on!',1500);return}P.fly=0;SX7.land();return}
 if(c.fly!=='free'){c.fly.used=1;P.seed=1;puff(c.fly.x,c.fly.y-30,20,'255,255,250',60,1.6,2.5,40)}else P.seed=0;P.fly=1;SX7.takeoff();tut('fly2','🦋 Flying! Glide anywhere and look for treetop nests, flower-top pollen & high crystals. Press Space to land.')}
window.__v7={doDig,doSearch,doBoard,doFly,ctx7};
// ---------- input: keys, long-press, contextual buttons ----------
addEventListener('keydown',e=>{if(state!='play'||e.repeat)return;const k=e.key.toLowerCase();if(k=='e')doDig();else if(k=='r'||k=='q')doSearch();else if(k=='b')doBoard();else if(k==' '){e.preventDefault();const c=ctx7();if(c.fly)doFly();else if(c.board)doBoard()}});
let lp=null;cv.addEventListener('pointerdown',e=>{lp={x:e.clientX,y:e.clientY,t:setTimeout(()=>{if(lp){doSearch();if(stick){stick=null;$('stick').style.display='none'}}lp=null},600)}});
addEventListener('pointermove',e=>{if(lp&&Math.hypot(e.clientX-lp.x,e.clientY-lp.y)>12){clearTimeout(lp.t);lp=null}});addEventListener('pointerup',()=>{if(lp){clearTimeout(lp.t);lp=null}});
const AB=document.createElement('div');AB.style.cssText='position:fixed;right:max(14px,env(safe-area-inset-right));bottom:max(18px,env(safe-area-inset-bottom));display:flex;flex-direction:column;gap:10px;z-index:20;align-items:flex-end;pointer-events:none';document.body.appendChild(AB);
const mkB=(id,lbl,fn)=>{const b=document.createElement('button');b.className='b';b.id=id;b.style.cssText='pointer-events:auto;font-size:17px;padding:12px 16px;border-radius:18px;transition:transform .25s cubic-bezier(.3,1.6,.5,1),opacity .25s;transform:scale(0);opacity:0;min-width:96px;box-shadow:0 6px 16px rgba(60,30,10,.35)';b.innerHTML=lbl;
 b.addEventListener('pointerdown',e=>{e.stopPropagation();e.preventDefault();S.init();fn()});AB.appendChild(b);return b};
const BTN={fly:mkB('aFly','🦋 Fly',doFly),board:mkB('aBoard','🍃 Board',doBoard),dig:mkB('aDig','⛏️ Dig',doDig),search:mkB('aSearch','🔍 Search',doSearch)};
const show=(b,on,lbl)=>{if(lbl&&b._l!==lbl){b._l=lbl;b.innerHTML=lbl}b.style.transform=on?'scale(1)':'scale(0)';b.style.opacity=on?1:0;b.style.pointerEvents=on?'auto':'none'};
let abT=0;function updAB(){const vis=state=='play'&&G;if(!vis){for(const k in BTN)show(BTN[k],0);return}const c=ctx7(),P=G.P;
 show(BTN.search,!!c.search);show(BTN.dig,!!c.dig,c.digHot?'⛏️ Dig ✨':'⛏️ Dig');show(BTN.board,!!c.board,c.board=='land'?'🏝️ Land':'🍃 Board');show(BTN.fly,!!c.fly,P.fly?'🪂 Land':c.fly!=='free'&&c.fly?'🌬️ Ride seed':'🦋 Fly');
 if(c.digHot)tut('dig','⛏️ A soft mound! Tap Dig (or press E) to dig for buried treasure.');if(c.board=='board')tut('boat','🍃 Water\'s edge! Tap Board (or B) to sail on a leaf.');if(c.fly&&!P.fly)tut('fly','🌬️ A dandelion seed! Tap Ride seed (or Space) to float up and fly.');
 if(G.el>20)tut('search','🔍 Tap Search (R, or long-press) to look around for hidden things.')}
// ---------- per-frame ----------
function readInput(){let ix=0,iy=0;if(keys.arrowleft||keys.a)ix--;if(keys.arrowright||keys.d)ix++;if(keys.arrowup||keys.w)iy--;if(keys.arrowdown||keys.s)iy++;
 if(stick){let dx=stick.x-stick.ox,dy=stick.y-stick.oy,d=Math.hypot(dx,dy);if(d>8){ix=dx/d;iy=dy/d}}if(AT&&!G.P.boat&&!G.P.fly){const a=autoPilot();ix=a[0];iy=a[1]}const m=Math.hypot(ix,iy);if(m>1){ix/=m;iy/=m}return[ix,iy]}
const _upd7=update;update=function(dt){if(!G||state!='play'){_upd7(dt);return}const P=G.P,px=P.x,py=P.y,special=P.boat||P.fly||P.hopTo||P.dig>0;
 if(special)BYPASS=true;const svS=P.speed;_upd7(dt);BYPASS=false;
 // hop on/off leaf
 if(P.hopTo){const h=P.hopTo;h.t+=dt/.45;const k=Math.min(1,h.t),e=k*k*(3-2*k);P.x=lerp(h.x0,h.x1,e);P.y=lerp(h.y0,h.y1,e);P.vx=P.vy=0;P.speed=0;if(k>=1){P.boat=h.boat;P.hopTo=null;P.bv=[0,0];if(!P.boat)SX7.land()}}
 else if(P.dig>0){P.x=px;P.y=py;P.vx=P.vy=0;P.speed=0;P.dig-=dt/.9;if(fx()<dt*16){const col=P.digSf=='sand'?'225,200,150':P.digSf=='leaves'?'170,100,40':'110,80,45';puff(P.x+14,P.y+4,2,col,70,.6,2.6,50)}if((P.dig*3|0)!=(P._dg|0)){P._dg=P.dig*3|0;SX7.scrape(P.digSf)}if(P.dig<=0){P.dig=0;finishDig()}}
 else if(P.boat){const[ix,iy]=readInput();P.bv=P.bv||[0,0];const k=1-Math.exp(-dt*1.6);P.bv[0]=lerp(P.bv[0],ix*150,k);P.bv[1]=lerp(P.bv[1],iy*150,k);
  // gentle current along rivers
  let nx=px+P.bv[0]*dt,ny=py+P.bv[1]*dt;if(!inWater(nx,ny,-14)){if(inWater(nx,py,-14))ny=py,P.bv[1]*=-.3;else if(inWater(px,ny,-14))nx=px,P.bv[0]*=-.3;else{nx=px;ny=py;P.bv=[-P.bv[0]*.3,-P.bv[1]*.3]}}
  P.x=nx;P.y=ny;P.vx=P.bv[0];P.vy=P.bv[1];const sp=Math.hypot(P.vx,P.vy);P.speed=0;P.bsp=sp;if(sp>10){const ta=Math.atan2(P.vy,P.vx);P.ba=P.ba==null?ta:P.ba+(((ta-P.ba+Math.PI*3)%TAU)-Math.PI)*Math.min(1,dt*3)}
  P.wk=(P.wk||0)-dt;if(sp>25&&P.wk<=0){P.wk=.16;RIP.push({x:P.x-Math.cos(P.ba)*26,y:P.y-Math.sin(P.ba)*16,t:0,m:1.3,r:16})}
  P.pd=(P.pd||0)-dt;if(Math.hypot(ix,iy)>.2&&P.pd<=0){P.pd=.7;SX7.paddle()}
  for(const o of G.wat)if(!o.got&&dist(o.x,o.y,P.x,P.y)<40){o.got=1;const q={it:o.it,x:o.x,y:o.y,t:0,got:false,ft:0,rv:1};G.items.push(q);collect(q)}}
 else if(P.fly){const[ix,iy]=readInput();P.fv=P.fv||[0,0];const k=1-Math.exp(-dt*2.2);P.fv[0]=lerp(P.fv[0],ix*320,k);P.fv[1]=lerp(P.fv[1],iy*320,k);P.x=clamp(px+P.fv[0]*dt,40,MW-40);P.y=clamp(py+P.fv[1]*dt,40,MH-40);P.vx=P.fv[0];P.vy=P.fv[1];P.speed=0;P.fsp=Math.hypot(P.vx,P.vy);if(Math.abs(P.vx)>20)P.fd=P.vx>0?1:-1;
  FOG.reveal(P.x,P.y);for(const o of G.sky)if(!o.got&&dist(o.x,o.y,P.x,P.y)<55&&P.alt>70){o.got=1;const q={it:o.it,x:o.x,y:o.y,t:0,got:false,ft:0,rv:1};G.items.push(q);collect(q)}}
 if(!P.boat&&!P.fly&&!P.hopTo&&!(P.dig>0)&&inWater(P.x,P.y)){P.x=px;P.y=py;P.vx*=-.2;P.vy*=-.2;if(inWater(P.x,P.y)){const l=nearestLand(P.x,P.y);if(l){P.x=l[0];P.y=l[1]}}}
 P.alt=lerp(P.alt||0,P.fly?135+Math.sin(G.el*1.6)*8:0,1-Math.exp(-dt*2.5));P.flyK=clamp(P.alt/135,0,1);P.srch=Math.max(0,(P.srch||0)-dt);
 for(const d of G.digs)d.glow=Math.max(0,d.glow-dt);for(const d of G.dand)d.t+=dt;
 setLoop('wind',500+(P.fsp||0)*2,P.flyK*(.05+(P.fsp||0)/320*.09),'bandpass');setLoop('water',650,P.boat?.05:0,'lowpass');
 if(P.boat&&fx()<dt*.6)SX.plink();
 abT-=dt;if(abT<=0){abT=.15;updAB()}};
// v6 footsteps/bumps should not fire while sailing or flying (speed is zeroed above); emote ⛏/🔍 handled by emote bubble
// ---------- drawing ----------
function drawLeafBoat(px,py,a,t){x.save();x.translate(px,py+6+Math.sin(t/500)*1.5);x.rotate((a||0)+Math.sin(t/900)*.05);x.scale(1,.62);x.fillStyle='rgba(10,40,50,.25)';x.beginPath();x.ellipse(4,8,54,26,0,0,TAU);x.fill();
 const gr=x.createLinearGradient(0,-26,0,26);gr.addColorStop(0,'#9ac850');gr.addColorStop(.5,'#5a9a30');gr.addColorStop(1,'#2e6a1c');x.fillStyle=gr;x.beginPath();x.moveTo(-56,0);x.bezierCurveTo(-30,-34,30,-34,58,0);x.bezierCurveTo(30,34,-30,34,-56,0);x.fill();
 x.strokeStyle='rgba(230,250,190,.6)';x.lineWidth=2.5;x.beginPath();x.moveTo(-60,0);x.lineTo(52,0);for(let i=-3;i<=3;i++){x.moveTo(i*14,0);x.lineTo(i*14+14,-18);x.moveTo(i*14,0);x.lineTo(i*14+14,18)}x.stroke();x.strokeStyle='rgba(30,70,20,.6)';x.lineWidth=2;x.beginPath();x.moveTo(-56,0);x.bezierCurveTo(-30,-34,30,-34,58,0);x.bezierCurveTo(30,34,-30,34,-56,0);x.stroke();x.restore()}
const _dp7=drawPlayer;drawPlayer=function(P,t){if(!G)return _dp7(P,t);
 if(P.boat||(P.hopTo&&P.hopTo.boat===0&&P.hopTo.t<.5)||(P.hopTo&&P.hopTo.boat&&P.hopTo.t>.5))drawLeafBoat(P.hopTo?P.hopTo[P.hopTo.boat?'x1':'x0']:P.x,P.hopTo?P.hopTo[P.hopTo.boat?'y1':'y0']:P.y,P.ba||0,t);
 const alt=P.alt||0;if(alt>2){shadowE(x,P.x,P.y+4,26*(1-P.flyK*.4),9*(1-P.flyK*.4),.35*(1-P.flyK*.5))}
 x.save();if(alt>1){x.translate(P.x,P.y-alt);const s=1+P.flyK*.12;x.scale(s,s);x.translate(-P.x,-P.y)}
 if(P.flyK>.05){const k=P.flyK;if(P.seed){x.save();x.translate(P.x,P.y-100);x.globalAlpha=k;x.strokeStyle='rgba(255,255,255,.9)';x.lineWidth=1.5;for(let i=0;i<22;i++){const a=-Math.PI/2+(i/21-.5)*2.6+Math.sin(t/600)*.05;x.beginPath();x.moveTo(0,40);x.lineTo(Math.cos(a)*44,Math.sin(a)*30);x.stroke();x.fillStyle='rgba(255,255,255,.85)';x.beginPath();x.arc(Math.cos(a)*44,Math.sin(a)*30,2.4,0,TAU);x.fill()}x.beginPath();x.moveTo(0,40);x.lineTo(0,78);x.stroke();x.restore()}
  else if(IMG.butterfly){const im=IMG.butterfly,h=92,w=im.width*h/im.height,f=.35+.65*Math.abs(Math.sin(t/140));x.save();x.translate(P.x,P.y-62);x.globalAlpha=k*.95;x.scale(f*1.25,1.1);x.drawImage(im,-w/2,-h/2,w,h);x.restore()}}
 if(P.dig>0){x.save();x.translate(P.x,P.y);x.rotate(Math.sin(t/55)*.08);x.translate(-P.x,-P.y);_dp7(P,t);x.restore()}else _dp7(P,t);x.restore();
 // magnifier ring while searching
 if(P.srch>0){const k=1-P.srch/1.1;x.save();x.translate(P.x+30*Math.cos(t/150),P.y-70+10*Math.sin(t/150));x.strokeStyle='#6a4a24';x.lineWidth=4;x.beginPath();x.arc(0,0,11,0,TAU);x.moveTo(8,8);x.lineTo(18,18);x.stroke();x.fillStyle='rgba(200,240,255,.45)';x.beginPath();x.arc(0,0,9,0,TAU);x.fill();x.restore()}};
// world-space marks: dig mounds, dandelions, water finds, sky finds (drawn in the ground pass / overlays)
const _gp7=groundPass;groundPass=function(x0,y0,x1,y1){_gp7(x0,y0,x1,y1);if(!G||!G.digs)return;const t=performance.now(),P=G.P,inV=(o,m)=>o.x>x0-m&&o.x<x1+m&&o.y>y0-m&&o.y<y1+m;
 // shimmering river surface
 x.save();x.globalCompositeOperation='lighter';x.lineCap='round';for(const R of RIVERS){x.strokeStyle=`rgba(220,245,255,${.07*(1-N*.5)})`;x.lineWidth=RW*.9;x.setLineDash([18,60]);x.lineDashOffset=-t*.03;x.beginPath();R.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.stroke();x.lineWidth=RW*.4;x.setLineDash([8,44]);x.lineDashOffset=-t*.05;x.stroke()}x.setLineDash([]);x.restore();
 for(const d of G.digs){if(!inV(d,40))continue;if(d.dug){x.fillStyle='rgba(50,30,12,.55)';x.beginPath();x.ellipse(d.x,d.y,15,7,0,0,TAU);x.fill();x.fillStyle='rgba(120,90,50,.6)';x.beginPath();x.ellipse(d.x+14,d.y+2,10,5,0,0,TAU);x.fill();continue}
  const b=biomeAt(d.x,d.y),col=b=='dunes'?['#e8d098','#b89858']:b=='cave'?['#9aa0b8','#5a6070']:['#8a6a40','#5a4022'];const gr=x.createRadialGradient(d.x-4,d.y-4,1,d.x,d.y,16);gr.addColorStop(0,col[0]);gr.addColorStop(1,col[1]);x.globalAlpha=.85;x.fillStyle=gr;x.beginPath();x.ellipse(d.x,d.y,16,8,0,0,TAU);x.fill();
  x.strokeStyle='rgba(40,25,10,.45)';x.lineWidth=1.5;x.beginPath();x.moveTo(d.x-6,d.y-2);x.lineTo(d.x+3,d.y+2);x.moveTo(d.x+1,d.y-4);x.lineTo(d.x+7,d.y+1);x.stroke();x.globalAlpha=1;
  const near=dist(d.x,d.y,P.x,P.y)<230,tw=Math.max(0,Math.sin(t/300+d.t*5));if(near&&tw>.85||d.glow>0){const a=d.glow>0?.6+.4*Math.sin(t/120):(tw-.85)*6;x.fillStyle=`rgba(255,240,170,${a})`;x.beginPath();x.arc(d.x+Math.sin(d.t)*6,d.y-6,2.4,0,TAU);x.fill();if(d.glow>0){x.strokeStyle=`rgba(255,235,160,${.5*a})`;x.lineWidth=2;x.beginPath();x.ellipse(d.x,d.y,22+Math.sin(t/200)*3,11,0,0,TAU);x.stroke()}}}
 for(const d of G.dand){if(d.used||!inV(d,80))continue;const sw=Math.sin(t/900+d.t)*.08;x.save();x.translate(d.x,d.y);x.rotate(sw);x.strokeStyle='#6a9a3a';x.lineWidth=3;x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(4,-30,0,-60);x.stroke();const gr=x.createRadialGradient(0,-66,2,0,-66,20);gr.addColorStop(0,'rgba(255,255,250,.95)');gr.addColorStop(.7,'rgba(255,255,250,.55)');gr.addColorStop(1,'rgba(255,255,250,0)');x.fillStyle=gr;x.beginPath();x.arc(0,-66,20,0,TAU);x.fill();x.strokeStyle='rgba(255,255,255,.7)';x.lineWidth=1;for(let i=0;i<16;i++){const a=i/16*TAU;x.beginPath();x.moveTo(0,-66);x.lineTo(Math.cos(a)*17,-66+Math.sin(a)*17);x.stroke()}x.restore()}
 for(const o of G.wat){if(o.got||!inV(o,40))continue;const im=IMG[o.it.id],s=34,bob=Math.sin(t/700+o.t)*2;x.save();x.translate(o.x,o.y+bob);x.rotate(Math.sin(t/1300+o.t)*.15);x.fillStyle='rgba(20,60,70,.25)';x.beginPath();x.ellipse(0,6,s*.5,s*.18,0,0,TAU);x.fill();x.drawImage(im,-s/2,-s*.7,s,s);x.restore();if(Math.sin(t/900+o.t*3)>.97)RIP.push({x:o.x,y:o.y+4,t:0,m:1,r:14})}};
// sky finds are drawn on top of everything (they sit up high), more visible as you fly
const _mm7=drawMinimap;drawMinimap=function(){if(G&&G.sky&&(state=='play'||state=='slowmo')){const t=performance.now(),z=zoom,P=G.P;x.save();x.setTransform(DPR,0,0,DPR,0,0);
  for(const o of G.sky){if(o.got)continue;const sx=(o.x-cam.x)*z+W/2,sy=(o.y-o.h-cam.y)*z+H/2;if(sx<-60||sy<-60||sx>W+60||sy>H+60)continue;const a=.35+.65*P.flyK,s=30*z*(1+P.flyK*.2);x.globalAlpha=a;
   if(o.it.id=='feather'||o.it.id=='robinegg'){x.fillStyle='#6a4a24';x.beginPath();x.ellipse(sx,sy+s*.25,s*.7,s*.28,0,0,TAU);x.fill();x.strokeStyle='#a07a40';x.lineWidth=2;x.stroke()}
   x.shadowColor='rgba(255,240,180,.9)';x.shadowBlur=10+6*Math.sin(t/300+o.t);x.drawImage(IMG[o.it.id],sx-s/2,sy-s*.6+Math.sin(t/600+o.t)*2,s,s);x.shadowBlur=0}
  // parallax clouds / drifting seeds while flying
  if(P.flyK>.02){x.globalAlpha=1;for(let i=0;i<7;i++){const px=((i*331-cam.x*z*1.6)%(W+400)+W+400)%(W+400)-200,py=((i*197-cam.y*z*1.6)%(H+300)+H+300)%(H+300)-150,r=(90+i*25)*z;const g=x.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,`rgba(255,250,240,${.16*P.flyK})`);g.addColorStop(1,'rgba(255,250,240,0)');x.fillStyle=g;x.fillRect(px-r,py-r,r*2,r*2)}}
  x.restore()}_mm7()};
// journal hints for new categories
const _fg7=fillGrid;fillGrid=function(el,c='bug'){_fg7(el,c);if(c=='treas'||c=='water'||c=='sky')[...el.children].forEach((d,i)=>{if(d.classList.contains('no'))d.title={treas:'Hint: dig at little mounds (⛏️). Sandy, leafy and soil spots hide the most.',water:'Hint: board a leaf boat (🍃) and sail the lake & rivers.',sky:'Hint: fly (🦋 befriend Pip, or ride a dandelion seed) over treetops, flowers & crystals.'}[c]})};
// =====================================================================
// v8: CALM mode (low-stimulation ASMR) + free sandbox + BUILD mode
// =====================================================================
if(SV.d.calm==null)SV.d.calm=1;if(SV.d.music==null)SV.d.music=1;
SV.d.mat=SV.d.mat||{twig:5,leaf:5,pebble:5,moss:3,petal:2,cap:2,mush:1,shell:1};SV.d.builds=SV.d.builds||[];
const CALM=()=>!!SV.d.calm;
// ---------- calm visuals ----------
const calmCSS=document.createElement('style');document.head.appendChild(calmCSS);
const vig=document.createElement('div');vig.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:2;background:radial-gradient(ellipse at center,rgba(0,0,0,0) 55%,rgba(30,22,10,.28) 100%);transition:opacity 1s';document.body.appendChild(vig);
function applyCalm(){const on=CALM();cv.style.filter=on?'saturate(.72) contrast(.9) brightness(1.03) sepia(.08)':'';vig.style.opacity=on?1:0;
 calmCSS.textContent=on?`#flash{display:none!important}
 #hud .pill{transition:opacity 1.2s ease}#hud .pill.calmhide{opacity:0;pointer-events:none}
 .pill{font-size:13px!important;padding:4px 9px!important;background:rgba(80,60,30,.45)!important;border-color:rgba(240,213,142,.45)!important;box-shadow:none!important}
 #bJournal,#bDN,#bMute,#bBuild{opacity:.55;transform:scale(.82);transition:opacity .6s}#bJournal:hover,#bDN:hover,#bMute:hover,#bBuild:hover{opacity:.95}
 #toast{background:rgba(255,248,230,.72)!important;border:1px solid rgba(180,138,74,.35)!important;box-shadow:none!important;font-size:14px!important;padding:7px 14px!important;color:#5a4a30!important;transition:all 1.1s ease!important}
 #ab8 .b,#aFly,#aBoard,#aDig,#aSearch{opacity:.7!important;font-size:14px!important;padding:8px 12px!important;min-width:0!important;box-shadow:none!important;background:rgba(150,100,50,.55)!important}`:'';
 MU.setVol('music',Math.min(MU.vol.music,on?.3:.5))}
// fewer particles
const _puff8=puff;puff=function(px,py,n,col,sp,life,sz,up){_puff8(px,py,CALM()?Math.max(1,Math.round(n*.35)):n,col,(sp||40)*(CALM()?.6:1),(life||.6)*(CALM()?1.3:1),sz,up)};
const _spk8=sparkle;sparkle=function(px,py,n=30,col){_spk8(px,py,CALM()?Math.max(2,Math.round(n*.25)):n,col)};
DUSK.length=CALM()?14:40;
// HUD hidden by default; fades in on tap / when something changes
let hud8T=0;const hudEl=$('hud');function hudPeek(s=3.5){hud8T=s}
addEventListener('pointerdown',()=>hudPeek());const _upH8=updHUD;updHUD=function(){_upH8();hudPeek(2.5)};
// soft toast instead of discovery cards / slow-mo
function softFind(name,emo){toast(`${emo} ${name}`,2200);SX.chime(fx()*4|0)}
const _col8=collect;collect=function(o){_col8(o);if(CALM()&&state=='slowmo'){state='play';timeScale=1;zoom=baseZoom();softFind((G.lastNew?'New: ':'')+o.it.n,CATS[o.it.c].e)}};
const _snap8=snap;snap=function(b){const was=G.found.length;_snap8(b);if(CALM()&&state=='slowmo'){state='play';timeScale=1;zoom=baseZoom();softFind((G.found.length>was?'New: ':'')+b.s.n,'📷')}};
// gentler chimes & jingle
const _chime8=S.chime;S.chime=r=>{if(CALM())SX.chime((r||0)*2+(fx()*2|0));else _chime8(r)};
const _jing8=MU.jingle.bind(MU);MU.jingle=()=>{if(!CALM())_jing8()};
// biome banner smaller & fainter
const _ban8=banner;banner=function(t,sub){if(CALM()){toast(t.replace('✨ ',''),2400);return}_ban8(t,sub)};
// one short, faint tutorial hint each
tut=function(k,msg){if(SV.d.tut[k])return;SV.d.tut[k]=1;SV.save();toast(CALM()?msg.split(/[.!] /)[0].replace(/\(.*?\)/g,''):msg,CALM()?3200:4800)};
// ---------- calm audio: quieter music with long silences ----------
let musT=0,musOn=true;
// ---------- materials ----------
const MAT={twig:{n:'Twig',e:'🪵',b:['woods','pine','log','autumn','meadow']},leaf:{n:'Leaf',e:'🍃',b:['autumn','woods','meadow','waterfall']},pebble:{n:'Pebble',e:'🪨',b:['dunes','cave','meadow','pond','waterfall']},moss:{n:'Moss',e:'🌿',b:['woods','log','waterfall','pine']},
 petal:{n:'Petal',e:'🌸',b:['flowers','meadow']},cap:{n:'Acorn cap',e:'🌰',b:['autumn','woods','pine']},mush:{n:'Mushroom',e:'🍄',b:['woods','log','autumn']},shell:{n:'Shell',e:'🐚',b:['dunes','pond']}};
const MATI={};(()=>{const mk=(fn)=>{const c=document.createElement('canvas');c.width=c.height=40;const g=c.getContext('2d');g.translate(20,22);g.shadowColor='rgba(30,20,10,.35)';g.shadowBlur=3;g.shadowOffsetY=2;fn(g);return c};
 MATI.twig=mk(g=>{g.strokeStyle='#7a5430';g.lineCap='round';g.lineWidth=3.5;g.beginPath();g.moveTo(-15,6);g.lineTo(15,-4);g.moveTo(3,0);g.lineTo(9,-10);g.stroke()});
 MATI.leaf=mk(g=>{g.rotate(.5);g.fillStyle='#8aa850';g.beginPath();g.ellipse(0,0,14,7,0,0,TAU);g.fill();g.strokeStyle='rgba(240,250,210,.6)';g.lineWidth=1.2;g.beginPath();g.moveTo(-13,0);g.lineTo(13,0);g.stroke()});
 MATI.pebble=mk(g=>{g.fillStyle='#a8a094';g.beginPath();g.ellipse(0,0,10,7,0,0,TAU);g.fill();g.fillStyle='rgba(255,255,245,.45)';g.beginPath();g.ellipse(-3,-3,4,2,0,0,TAU);g.fill()});
 MATI.moss=mk(g=>{for(const[a,b,r]of[[-6,2,7],[4,0,8],[0,-5,6],[8,5,5]]){g.fillStyle='#6a8a3a';g.beginPath();g.arc(a,b,r,0,TAU);g.fill();g.fillStyle='rgba(190,220,120,.35)';g.beginPath();g.arc(a-2,b-2,r*.5,0,TAU);g.fill()}});
 MATI.petal=mk(g=>{g.fillStyle='#e8b4c4';g.beginPath();g.ellipse(0,0,8,12,.6,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.ellipse(-2,-3,3,5,.6,0,TAU);g.fill()});
 MATI.cap=mk(g=>{g.fillStyle='#8a6a3a';g.beginPath();g.ellipse(0,2,11,8,0,Math.PI,0);g.fill();g.strokeStyle='rgba(50,30,10,.5)';g.lineWidth=1;for(let i=-8;i<=8;i+=4){g.beginPath();g.moveTo(i,2);g.lineTo(i*.6,-5);g.stroke()}g.strokeStyle='#5a3a1a';g.lineWidth=2.5;g.beginPath();g.moveTo(0,-6);g.lineTo(2,-11);g.stroke()});
 MATI.mush=mk(g=>{g.fillStyle='#e8dcc0';g.fillRect(-3,-2,6,11);g.fillStyle='#c0804a';g.beginPath();g.ellipse(0,-3,11,7,0,Math.PI,0);g.fill()});
 MATI.shell=mk(g=>{g.fillStyle='#f0e0cc';g.beginPath();g.moveTo(0,8);g.arc(0,2,11,Math.PI*1.1,Math.PI*1.9);g.closePath();g.fill();g.strokeStyle='rgba(170,120,90,.5)';g.lineWidth=1;for(let i=-3;i<=3;i++){g.beginPath();g.moveTo(0,8);g.lineTo(i*3.5,-8);g.stroke()}})})();
function matSound(k){if(k=='twig')SX.knock();else if(k=='leaf')playB('rustle',.55,1.1+fx()*.3);else if(k=='pebble')playB('stone'+(1+(fx()*3|0)),.55,1.2+fx()*.2);else if(k=='moss')playB('squish',.35,1.3);else if(k=='petal')syn(1320+fx()*200,.5,.02);else if(k=='cap')SX.click(.7);else if(k=='mush')playB('squish',.5,1.1);else SX.plink()}
const FLT=[];function floatTxt(px,py,txt){FLT.push({x:px,y:py,txt,t:0})}
function takeMat(m){m.got=1;SV.d.mat[m.k]=(SV.d.mat[m.k]||0)+1;SV.save();matSound(m.k);floatTxt(m.x,m.y-16,`+1 ${MAT[m.k].e}`);puff(m.x,m.y,3,'230,220,190',20,.6,2,10);if(BUILD.on)renderPal()}
// ---------- build catalogue ----------
const BK={
 cottage:{n:'Acorn Cottage',e:'🏡',c:{cap:4,twig:3,moss:2},r:46,seat:1},hut:{n:'Mushroom Hut',e:'🍄',c:{mush:3,moss:2},r:42,seat:1},tent:{n:'Leaf Tent',e:'⛺',c:{leaf:4,twig:2},r:40,seat:1},
 fence:{n:'Twig Fence',e:'🪵',c:{twig:2},r:20,rot:1,snap:1},path:{n:'Pebble Path',e:'🪨',c:{pebble:2},r:0,rot:1,flat:1,snap:1},bridge:{n:'Twig Bridge',e:'🌉',c:{twig:4,leaf:1},r:0,rot:1,flat:1},
 lantern:{n:'Glow-worm Lantern',e:'🏮',c:{twig:1,moss:1,cap:1},r:12},pot:{n:'Flower Pot',e:'🪴',c:{pebble:1,petal:2},r:14},bench:{n:'Moss Bench',e:'🪑',c:{twig:2,moss:1},r:24,rot:1,seat:1},
 bed:{n:'Garden Bed',e:'🌷',c:{twig:2,moss:2,petal:1},r:34,rot:1},mailbox:{n:'Snail Mailbox',e:'📮',c:{shell:2,twig:1},r:12,seat:1}};
const BSPR={};(()=>{const mk=(w,h,fn)=>{const c=document.createElement('canvas');c.width=w*2;c.height=h*2;const g=c.getContext('2d');g.scale(2,2);g.translate(w/2,h);fn(g,w,h);return{img:c,w,h}};
 const shade=(g,x0,y0,x1,y1,c0,c1)=>{const gr=g.createLinearGradient(x0,y0,x1,y1);gr.addColorStop(0,c0);gr.addColorStop(1,c1);return gr};
 BSPR.cottage=mk(110,120,(g)=>{g.fillStyle=shade(g,-40,0,40,0,'#c8904a','#7a4a1e');g.beginPath();g.ellipse(0,-34,38,34,0,0,TAU);g.fill();g.fillStyle=shade(g,0,-100,0,-50,'#9a7a4a','#5a3a1a');g.beginPath();g.ellipse(0,-62,46,26,0,Math.PI,0);g.lineTo(46,-60);g.quadraticCurveTo(0,-48,-46,-60);g.fill();
  g.strokeStyle='rgba(40,25,10,.35)';g.lineWidth=1.2;for(let i=-40;i<=40;i+=7){g.beginPath();g.moveTo(i,-58);g.lineTo(i*.7,-84);g.stroke()}g.strokeStyle='#5a3a1a';g.lineWidth=4;g.beginPath();g.moveTo(0,-87);g.quadraticCurveTo(4,-98,10,-100);g.stroke();
  g.fillStyle='#5a3418';g.beginPath();g.arc(0,-14,12,Math.PI,0);g.lineTo(12,0);g.lineTo(-12,0);g.fill();g.fillStyle='#f0c060';g.beginPath();g.arc(4,-8,1.6,0,TAU);g.fill();g.fillStyle='#f4d890';for(const sx of[-24,22]){g.beginPath();g.arc(sx,-36,6,0,TAU);g.fill();g.strokeStyle='#6a4a24';g.lineWidth=1.5;g.stroke()}});
 BSPR.hut=mk(110,120,(g)=>{g.fillStyle=shade(g,-20,0,20,0,'#f4ead4','#c8b894');g.beginPath();g.moveTo(-22,0);g.quadraticCurveTo(-26,-40,-18,-56);g.lineTo(18,-56);g.quadraticCurveTo(26,-40,22,0);g.fill();g.fillStyle='#6a4a2a';g.beginPath();g.arc(0,-12,9,Math.PI,0);g.lineTo(9,0);g.lineTo(-9,0);g.fill();
  g.fillStyle=shade(g,0,-110,0,-50,'#d8705a','#9a3a2a');g.beginPath();g.ellipse(0,-58,52,40,0,Math.PI,0);g.quadraticCurveTo(0,-48,-52,-58);g.fill();g.fillStyle='rgba(255,248,230,.85)';for(const[a,b,r]of[[-26,-74,6],[0,-88,7],[24,-72,5],[-8,-66,4],[36,-62,3]]){g.beginPath();g.ellipse(a,b,r,r*.8,0,0,TAU);g.fill()}g.fillStyle='#f4d890';g.beginPath();g.arc(-12,-34,4.5,0,TAU);g.fill()});
 BSPR.tent=mk(110,90,(g)=>{g.fillStyle=shade(g,-50,0,50,0,'#8aa850','#4a6a28');g.beginPath();g.moveTo(-50,0);g.quadraticCurveTo(-10,-60,0,-74);g.quadraticCurveTo(10,-60,50,0);g.fill();g.strokeStyle='rgba(230,245,200,.5)';g.lineWidth=2;g.beginPath();g.moveTo(0,-72);g.lineTo(0,0);for(let i=1;i<5;i++){g.moveTo(0,-72+i*14);g.lineTo(-i*9,-60+i*14);g.moveTo(0,-72+i*14);g.lineTo(i*9,-60+i*14)}g.stroke();g.fillStyle='rgba(40,30,15,.55)';g.beginPath();g.moveTo(-12,0);g.lineTo(0,-30);g.lineTo(12,0);g.fill();g.strokeStyle='#6a4a24';g.lineWidth=3;g.beginPath();g.moveTo(0,-74);g.lineTo(0,-86);g.stroke()});
 BSPR.fence=mk(70,40,(g)=>{g.strokeStyle='#7a5430';g.lineCap='round';g.lineWidth=4;for(const sx of[-28,-9,9,28]){g.beginPath();g.moveTo(sx,0);g.lineTo(sx+1,-30);g.stroke()}g.lineWidth=3.2;g.beginPath();g.moveTo(-33,-20);g.lineTo(33,-21);g.moveTo(-33,-9);g.lineTo(33,-10);g.stroke()});
 BSPR.lantern=mk(36,70,(g)=>{g.strokeStyle='#6a4a24';g.lineWidth=3;g.beginPath();g.moveTo(0,0);g.lineTo(0,-50);g.quadraticCurveTo(0,-60,10,-58);g.stroke();g.fillStyle='rgba(220,255,150,.9)';g.beginPath();g.ellipse(10,-48,6,8,0,0,TAU);g.fill();g.fillStyle='#8a6a3a';g.beginPath();g.ellipse(10,-55,7,4,0,Math.PI,0);g.fill()});
 BSPR.pot=mk(40,46,(g)=>{g.fillStyle=shade(g,-12,0,12,0,'#c88a5a','#8a4a2a');g.beginPath();g.moveTo(-12,-18);g.lineTo(12,-18);g.lineTo(9,0);g.lineTo(-9,0);g.fill();g.fillStyle='#4a7a2a';for(const a of[-6,0,6]){g.beginPath();g.ellipse(a,-24,3,7,a*.08,0,TAU);g.fill()}g.fillStyle='#f0b0c8';for(const[a,b]of[[-6,-32],[5,-34],[0,-38]]){g.beginPath();g.arc(a,b,4,0,TAU);g.fill()}g.fillStyle='#ffe890';g.beginPath();g.arc(0,-38,1.5,0,TAU);g.fill()});
 BSPR.bench=mk(70,40,(g)=>{g.fillStyle='#6a8a3a';g.beginPath();g.ellipse(0,-16,30,7,0,0,TAU);g.fill();g.fillStyle='rgba(190,220,120,.35)';g.beginPath();g.ellipse(-4,-18,22,3,0,0,TAU);g.fill();g.strokeStyle='#7a5430';g.lineWidth=3.5;g.lineCap='round';for(const sx of[-22,22]){g.beginPath();g.moveTo(sx,-12);g.lineTo(sx,0);g.stroke()}});
 BSPR.bed=mk(100,50,(g)=>{g.fillStyle='#6a4a28';g.beginPath();g.ellipse(0,-14,44,14,0,0,TAU);g.fill();g.strokeStyle='#7a5430';g.lineWidth=3;g.stroke();for(let i=0;i<9;i++){const a=-36+i*9,b=-14+(i%2?4:-4);g.fillStyle='#4a7a2a';g.beginPath();g.ellipse(a,b-4,2.5,6,0,0,TAU);g.fill();g.fillStyle=['#f0c0d0','#fff0b0','#c8b8f0'][i%3];g.beginPath();g.arc(a,b-10,3.6,0,TAU);g.fill()}});
 BSPR.mailbox=mk(36,64,(g)=>{g.strokeStyle='#7a5430';g.lineWidth=3.5;g.beginPath();g.moveTo(0,0);g.lineTo(0,-36);g.stroke();g.fillStyle=shade(g,-12,-60,12,-36,'#f4e4cc','#c8a880');g.beginPath();g.arc(0,-46,13,0,TAU);g.fill();g.strokeStyle='rgba(140,90,50,.6)';g.lineWidth=1.4;g.beginPath();for(let a=0;a<11;a+=.25)g.lineTo(Math.cos(a)*(1+a*1.1),-46+Math.sin(a)*(1+a*1.1));g.stroke();g.fillStyle='#e05a4a';g.fillRect(9,-62,2,10);g.fillRect(9,-62,8,5)});
 BSPR.path=mk(70,50,(g)=>{g.translate(0,-25);const R=mulberry(9);for(let i=0;i<14;i++){const a=(R()-.5)*60,b=(R()-.5)*36,r=5+R()*6;g.fillStyle='rgba(40,30,15,.25)';g.beginPath();g.ellipse(a+1,b+1.5,r,r*.7,0,0,TAU);g.fill();g.fillStyle=['#b8b0a0','#a89c88','#c8c0b0'][i%3];g.beginPath();g.ellipse(a,b,r,r*.7,R(),0,TAU);g.fill();g.fillStyle='rgba(255,255,245,.3)';g.beginPath();g.ellipse(a-r*.3,b-r*.25,r*.4,r*.2,0,0,TAU);g.fill()}});
 BSPR.bridge=mk(200,70,(g)=>{g.translate(0,-35);g.fillStyle='rgba(20,30,30,.3)';g.fillRect(-96,-24,192,56);for(let i=-90;i<90;i+=12){g.fillStyle=i%24?'#9a7040':'#86602f';g.fillRect(i,-26,11,52)}g.strokeStyle='#5a3a1a';g.lineWidth=4;g.lineCap='round';g.beginPath();g.moveTo(-96,-26);g.lineTo(96,-26);g.moveTo(-96,26);g.lineTo(96,26);g.stroke()})})();
// ---------- placement / world integration ----------
function bridgeAt(px,py){for(const b of SV.d.builds){if(b.k!='bridge')continue;const dx=px-b.x,dy=py-b.y,c=Math.cos(-b.r),s=Math.sin(-b.r),lx=dx*c-dy*s,ly=dx*s+dy*c;if(Math.abs(lx)<100&&Math.abs(ly)<30)return true}return false}
const _inW8=inWater;inWater=function(px,py,m=0){if(BYPASS)return false;if(SV.d.builds.length&&bridgeAt(px,py))return false;return _inW8(px,py,m)};
function syncBuilds(){if(!TALL)return;TALL=TALL.filter(d=>!d.build);for(const b of SV.d.builds)if(!BK[b.k].flat)TALL.push({k:'B_'+b.k,build:b,x:b.x,y:b.y,s:1,v:0});TALL_G=bucket(TALL)}
const _ng8=newGame;newGame=function(d){_ng8(d);syncBuilds();G.mats=[];const R=mulberry(G.seed+31);for(const k in MAT)for(const bk of MAT[k].b)for(let i=0;i<14;i++){const[px,py]=rpIn(bk);if(!inWater(px,py,20))G.mats.push({k,x:px,y:py,got:0,rt:0})}
 if(CALM()&&!d)G.featured=[];hudPeek(4)};
const _dd8=drawDecor;drawDecor=function(d,t){if(!d.build)return _dd8(d,t);const b=d.build,sp=BSPR[b.k];shadowE(x,b.x,b.y+2,sp.w*.4,sp.w*.11,.35);x.save();x.translate(b.x,b.y);if(BK[b.k].rot)x.rotate(b.r*.12*(b.k=='fence'||b.k=='bench'||b.k=='bed'?0:1));
 if(b.k=='fence'||b.k=='bench'||b.k=='bed'){const c=Math.cos(b.r);x.scale(Math.max(.35,Math.abs(c)),1);if(c<0)x.scale(-1,1)}x.drawImage(sp.img,-sp.w/2,-sp.h,sp.w,sp.h);x.restore()};
// flat builds (paths, bridges) + materials + ghost, in the ground pass
const _gp8=groundPass;groundPass=function(x0,y0,x1,y1){_gp8(x0,y0,x1,y1);if(!G)return;const t=performance.now(),inV=(o,m)=>o.x>x0-m&&o.x<x1+m&&o.y>y0-m&&o.y<y1+m;
 for(const b of SV.d.builds){if(!BK[b.k].flat||!inV(b,120))continue;const sp=BSPR[b.k];x.save();x.translate(b.x,b.y);x.rotate(b.r);x.drawImage(sp.img,-sp.w/2,-sp.h/2,sp.w,sp.h);x.restore()}
 for(const m of G.mats||[]){if(m.got||!inV(m,30))continue;x.drawImage(MATI[m.k],m.x-14,m.y-16,28,28)}
 if(BUILD.on&&BUILD.g){const g=BUILD.g,sp=BSPR[BUILD.k],ok=g.ok;x.save();x.globalAlpha=.55+.1*Math.sin(t/500);x.translate(g.x,g.y);
  if(BK[BUILD.k].flat){x.rotate(g.r);x.drawImage(sp.img,-sp.w/2,-sp.h/2,sp.w,sp.h)}else x.drawImage(sp.img,-sp.w/2,-sp.h,sp.w,sp.h);x.restore();
  x.strokeStyle=ok?'rgba(230,240,200,.7)':'rgba(220,150,130,.7)';x.lineWidth=2;x.setLineDash([6,6]);x.beginPath();x.ellipse(g.x,g.y,Math.max(24,BK[BUILD.k].r+8),Math.max(12,(BK[BUILD.k].r+8)*.45),0,0,TAU);x.stroke();x.setLineDash([])}};
// ---------- BUILD mode UI ----------
const BUILD={on:false,k:'cottage',g:null,rem:false,r:0};
const bBuild=document.createElement('button');bBuild.className='b n';bBuild.id='bBuild';bBuild.textContent='🔨';bBuild.title='Build (F)';$('bJournal').before(bBuild);bBuild.onclick=()=>{S.pop();toggleBuild()};
const pal=document.createElement('div');pal.id='pal8';pal.style.cssText='position:fixed;left:50%;bottom:max(10px,env(safe-area-inset-bottom));transform:translate(-50%,140%);transition:transform .6s ease;z-index:21;max-width:min(96vw,900px);background:rgba(255,248,230,.86);border:1px solid rgba(160,120,60,.4);border-radius:18px;padding:8px 10px;font:14px Georgia,serif;color:#5a4a30;backdrop-filter:blur(4px)';document.body.appendChild(pal);
const canAfford=k=>Object.entries(BK[k].c).every(([m,n])=>(SV.d.mat[m]||0)>=n);
function renderPal(){const mats=Object.keys(MAT).map(k=>`<span title="${MAT[k].n}" style="margin-right:7px;opacity:.85">${MAT[k].e}${SV.d.mat[k]||0}</span>`).join('');
 pal.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap"><div>${mats}</div><div style="display:flex;gap:6px">
 <button class="b n" data-a="rot" style="font-size:13px;padding:5px 9px">↻ Rotate</button><button class="b ${BUILD.rem?'':'n'}" data-a="rem" style="font-size:13px;padding:5px 9px">🧺 Remove</button><button class="b n" data-a="place" style="font-size:13px;padding:5px 9px">✓ Place</button><button class="b n" data-a="done" style="font-size:13px;padding:5px 9px">✕</button></div></div>
 <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px">${Object.keys(BK).map(k=>{const ok=canAfford(k);return`<div data-k="${k}" style="flex:0 0 auto;cursor:pointer;text-align:center;padding:5px 8px;border-radius:12px;border:1px solid ${BUILD.k==k&&!BUILD.rem?'#a07a3a':'transparent'};background:${BUILD.k==k&&!BUILD.rem?'rgba(240,220,170,.7)':'transparent'};opacity:${ok?1:.45}"><canvas width="44" height="40" data-i="${k}"></canvas><div style="font-size:12px">${BK[k].n}</div><div style="font-size:11px;opacity:.8">${Object.entries(BK[k].c).map(([m,n])=>MAT[m].e+n).join(' ')}</div></div>`}).join('')}</div>`;
 pal.querySelectorAll('canvas[data-i]').forEach(c=>{const sp=BSPR[c.dataset.i],g=c.getContext('2d'),s=Math.min(40/sp.w,36/sp.h);g.drawImage(sp.img,22-sp.w*s/2,38-sp.h*s,sp.w*s,sp.h*s)})}
pal.addEventListener('pointerdown',e=>{e.stopPropagation()});
pal.addEventListener('click',e=>{const a=e.target.closest('[data-a]'),k=e.target.closest('[data-k]');S.pop();if(k){BUILD.k=k.dataset.k;BUILD.rem=false;if(!BUILD.g)ghostAt(G.P.x+50,G.P.y+30);else ghostAt(BUILD.g.x,BUILD.g.y);renderPal();return}if(!a)return;
 if(a.dataset.a=='rot'){BUILD.r+=Math.PI/4;if(BUILD.g)ghostAt(BUILD.g.x,BUILD.g.y)}else if(a.dataset.a=='rem'){BUILD.rem=!BUILD.rem;renderPal()}else if(a.dataset.a=='place'){if(BUILD.g)place()}else toggleBuild()});
function toggleBuild(){if(state!='play'&&!BUILD.on)return;BUILD.on=!BUILD.on;pal.style.transform=BUILD.on?'translate(-50%,0)':'translate(-50%,140%)';AB.style.opacity=BUILD.on?0:1;if(BUILD.on){renderPal();ghostAt(G.P.x+60,G.P.y+30);tut('build','Tap the ground to move the ghost, then tap again or ✓ Place')}else BUILD.g=null}
function ghostAt(wx,wy){const k=BUILD.k,bk=BK[k];let r=BUILD.r,gx=wx,gy=wy;
 if(k=='bridge'){const rn=riverNear(wx,wy);if(rn[0]<RW+30){gx=rn[1];gy=rn[2];const[a,b]=(()=>{for(const R of RIVERS)for(let i=0;i<R.length-1;i++){if(segD(rn[1],rn[2],R[i],R[i+1])[0]<1)return[R[i],R[i+1]]}return[[0,0],[1,0]]})();r=Math.atan2(b[1]-a[1],b[0]-a[0])+Math.PI/2}}
 if(bk.snap){let best=null,bd=46;for(const b of SV.d.builds){if(b.k!=k)continue;for(const s of[-1,1]){const L=k=='fence'?64:56,ex=b.x+Math.cos(b.r)*L*s,ey=b.y+Math.sin(b.r)*L*s*(k=='fence'?.5:1),dd=dist(ex,ey,wx,wy);if(dd<bd){bd=dd;best=[ex,ey,b.r]}}}if(best){gx=best[0];gy=best[1];r=best[2]}}
 let ok=canAfford(k);if(k=='bridge')ok=ok&&riverNear(gx,gy)[0]<RW;else if(!BUILD.rem&&_inW8(gx,gy,bk.flat?-10:8)&&!bridgeAt(gx,gy))ok=false;
 if(bk.r)for(const b of SV.d.builds){const o=BK[b.k];if(o.r&&dist(b.x,b.y,gx,gy)<(o.r+bk.r)*.75)ok=false}
 BUILD.g={x:gx,y:gy,r,ok}}
function thud(){syn(110,.35,.12,'sine',0,70);nburst(400,.18,.05,.8);SX.click(.5)}
function place(){const g=BUILD.g;if(!g)return;if(!g.ok){toast(canAfford(BUILD.k)?'Not quite room here':'Need more materials — tap twigs, leaves & pebbles',1800);return}
 for(const[m,n]of Object.entries(BK[BUILD.k].c))SV.d.mat[m]-=n;SV.d.builds.push({k:BUILD.k,x:Math.round(g.x),y:Math.round(g.y),r:g.r});SV.save();syncBuilds();thud();puff(g.x,g.y,6,'200,180,140',30,.8,3,8);renderPal();ghostAt(g.x,g.y)}
function removeAt(wx,wy){let bi=-1,bd=60;SV.d.builds.forEach((b,i)=>{const dd=dist(b.x,b.y-(BK[b.k].flat?0:20),wx,wy);if(dd<bd){bd=dd;bi=i}});if(bi<0)return;const b=SV.d.builds.splice(bi,1)[0];for(const[m,n]of Object.entries(BK[b.k].c))SV.d.mat[m]=(SV.d.mat[m]||0)+n;SV.save();syncBuilds();playB('rustle',.6,.9);SX.click(.6);puff(b.x,b.y,5,'200,180,140',30,.8,3,10);renderPal()}
// pointer: in build mode the canvas tap moves ghost / places / removes (captured before the joystick)
let lastPT='mouse';
addEventListener('pointerdown',e=>{lastPT=e.pointerType;if(!BUILD.on||e.target!==cv||state!='play')return;e.stopImmediatePropagation();const wx=(e.clientX-W/2)/zoom+cam.x,wy=(e.clientY-H/2)/zoom+cam.y;
 if(BUILD.rem){removeAt(wx,wy);return}if(e.pointerType=='mouse'){ghostAt(wx,wy);place();return}if(BUILD.g&&dist(BUILD.g.x,BUILD.g.y,wx,wy)<36){place();return}ghostAt(wx,wy)},true);
addEventListener('pointermove',e=>{if(BUILD.on&&e.pointerType=='mouse'&&!BUILD.rem&&e.target===cv)ghostAt((e.clientX-W/2)/zoom+cam.x,(e.clientY-H/2)/zoom+cam.y)});
addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(k=='f'&&!e.repeat&&(state=='play')){toggleBuild();return}if(BUILD.on&&k=='t'){BUILD.r+=Math.PI/4;if(BUILD.g)ghostAt(BUILD.g.x,BUILD.g.y)}if(BUILD.on&&k=='enter')place();if(BUILD.on&&k=='escape')toggleBuild()},true);
// tap materials in the world
cv.addEventListener('pointerdown',e=>{if(state!='play'||!G||BUILD.on)return;const wx=(e.clientX-W/2)/zoom+cam.x,wy=(e.clientY-H/2)/zoom+cam.y;if(dist(wx,wy,G.P.x,G.P.y)>360)return;for(const m of G.mats||[])if(!m.got&&dist(m.x,m.y,wx,wy)<34){takeMat(m);break}});
// ---------- per frame: HUD fade, materials pickup, music breathing, friends sit at builds ----------
const _upd8=update;update=function(dt){_upd8(dt);if(!G||state!='play')return;const P=G.P;shake=0;
 if(CALM()){hud8T-=dt;const hh=hud8T<=0&&!BUILD.on;if(hh!==G._hh){G._hh=hh;hudEl.querySelectorAll('.pill').forEach(p=>p.classList.toggle('calmhide',hh))}}else hudEl.querySelectorAll('.pill.calmhide').forEach(p=>p.classList.remove('calmhide'));
 if(CALM()&&parts.length>70)parts.splice(0,parts.length-70);
 for(const m of G.mats||[])if(!m.got&&!P.fly&&dist(m.x,m.y,P.x,P.y)<20)takeMat(m);
 for(let i=FLT.length-1;i>=0;i--){FLT[i].t+=dt;if(FLT[i].t>1.6)FLT.splice(i,1)}
 // music: soft phrases with long rests between (calm), or off
 musT+=dt;const cyc=CALM()?[50,45]:[1e9,0],want=SV.d.music&&(musT%(cyc[0]+cyc[1]))<cyc[0];if(want!==musOn){musOn=want;MU.set('theme',want?1:0)}
 // friends wander over to sit by your builds while you rest
 P.idle=(P.speed<5&&!P.fly&&!P.boat)?(P.idle||0)+dt:0;if(G.fr&&G.fr.length&&P.idle>2.5){const seats=SV.d.builds.filter(b=>BK[b.k].seat&&dist(b.x,b.y,P.x,P.y)<380);if(seats.length)G.fr.forEach((f,i)=>{const b=seats[i%seats.length],a=i*2.1+.6,tx=b.x+Math.cos(a)*(BK[b.k].r+16),ty=b.y+12+Math.sin(a)*12;f.x=lerp(f.x,tx,dt*.9);f.y=lerp(f.y,ty,dt*.9);f.alt=lerp(f.alt,0,dt*2)})}};
// floating "+1" labels and night glows of lanterns/windows (screen space)
const _mm8=drawMinimap;drawMinimap=function(){if(G&&(state=='play')){const z=zoom;x.save();x.setTransform(DPR,0,0,DPR,0,0);
  if(N>.15){x.globalCompositeOperation='lighter';for(const b of SV.d.builds){if(!['lantern','cottage','hut','tent'].includes(b.k))continue;const sx=(b.x-cam.x)*z+W/2,sy=(b.y-(b.k=='lantern'?48:30)-cam.y)*z+H/2,r=(b.k=='lantern'?120:90)*z;if(sx<-r||sy<-r||sx>W+r||sy>H+r)continue;const g=x.createRadialGradient(sx,sy,0,sx,sy,r);g.addColorStop(0,`rgba(255,220,140,${.4*N})`);g.addColorStop(1,'rgba(255,220,140,0)');x.fillStyle=g;x.fillRect(sx-r,sy-r,r*2,r*2)}x.globalCompositeOperation='source-over'}
  x.font='14px Georgia,serif';x.textAlign='center';for(const f of FLT){const sx=(f.x-cam.x)*z+W/2,sy=(f.y-cam.y)*z+H/2-f.t*18;x.fillStyle=`rgba(255,250,235,${(1-f.t/1.6)*.85})`;x.fillText(f.txt,sx,sy)}x.restore()}_mm8()};
// ---------- settings: Music on/off + Calm mode ----------
(()=>{const p=document.querySelector('#sSound .parch');if(!p)return;const mk=(lbl,fn)=>{const b=document.createElement('button');b.className='b n';b.style.cssText='margin:6px 4px 0';const L=()=>b.textContent=lbl();L();b.onclick=()=>{S.pop();fn();L()};const last=p.querySelector('button');last?last.parentNode.insertBefore(b,last):p.appendChild(b)};
 mk(()=>'🎵 Music: '+(SV.d.music?'On':'Off'),()=>{SV.d.music=SV.d.music?0:1;SV.save();musOn=!SV.d.music;});
 mk(()=>'🌿 Calm mode: '+(SV.d.calm?'On':'Off'),()=>{SV.d.calm=SV.d.calm?0:1;SV.save();applyCalm();DUSK.length=CALM()?14:40})})();
// calm defaults: hide the goal pill, slower day cycle feel
applyCalm();if(CALM()&&$('hTime'))$('hTime').style.display='none';
window.__v8={BUILD,toggleBuild,ghostAt,place,removeAt,takeMat};
// calm: thin out small clutter
const _bw8=buildWorld;buildWorld=function(seed){_bw8(seed);if(!CALM())return;const R=mulberry(seed+5),thin=new Set(['grass','clover','leafd','pebble','pinecone','seashell','fern']);DECOR=DECOR.filter(d=>!thin.has(d.k)||R()>.35);FLAT=DECOR.filter(d=>['leafd','lily','web'].includes(d.k));TALL=DECOR.filter(d=>!FLAT.includes(d));TALL_G=bucket(TALL);FLAT_G=bucket(FLAT)};
// =====================================================================
// v9: MAKING things — crafting, paint & decorate, gardening, leaf-canvas drawing, mosaics, gifts
// =====================================================================
Object.assign(MAT,{berry:{n:'Berry',e:'🫐',b:[]},herb:{n:'Herb',e:'🌱',b:[]},grass:{n:'Grass',e:'🌾',b:['meadow','dunes','pond']},flower:{n:'Flower',e:'🌼',b:['flowers','meadow']},seed:{n:'Seed',e:'🫘',b:['meadow','flowers']}});
(()=>{const mk=fn=>{const c=document.createElement('canvas');c.width=c.height=40;const g=c.getContext('2d');g.translate(20,22);fn(g);return c};
 MATI.berry=mk(g=>{for(const[a,b]of[[-5,2],[5,2],[0,-5]]){g.fillStyle='#4a5a9a';g.beginPath();g.arc(a,b,6,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.arc(a-2,b-2,1.6,0,TAU);g.fill()}});
 MATI.herb=mk(g=>{g.fillStyle='#7aa050';for(const a of[-.6,0,.6]){g.save();g.rotate(a);g.beginPath();g.ellipse(0,-8,4,9,0,0,TAU);g.fill();g.restore()}});
 MATI.grass=mk(g=>{g.strokeStyle='#a0b060';g.lineWidth=2;g.lineCap='round';for(let i=-3;i<=3;i++){g.beginPath();g.moveTo(i*2,10);g.quadraticCurveTo(i*3,-2,i*5,-14);g.stroke()}});
 MATI.flower=mk(g=>{g.fillStyle='#f0d070';for(let i=0;i<6;i++){g.save();g.rotate(i*1.05);g.beginPath();g.ellipse(0,-7,3.5,6,0,0,TAU);g.fill();g.restore()}g.fillStyle='#c08030';g.beginPath();g.arc(0,0,3.5,0,TAU);g.fill()});
 MATI.seed=mk(g=>{for(const[a,b,r]of[[-5,2,.4],[4,-2,-.3],[2,6,1]]){g.save();g.translate(a,b);g.rotate(r);g.fillStyle='#8a6a40';g.beginPath();g.ellipse(0,0,3,5,0,0,TAU);g.fill();g.restore()}})})();
for(const k of['berry','herb','grass','flower','seed'])SV.d.mat[k]=SV.d.mat[k]||(k=='seed'?3:k=='grass'?2:0);
SV.d.inv=SV.d.inv||{};SV.d.recipes=SV.d.recipes||[];SV.d.dyes=SV.d.dyes||[];SV.d.look=SV.d.look||{};SV.d.art=SV.d.art||[];SV.d.blooms=SV.d.blooms||[];SV.d.fgift=SV.d.fgift||{};SV.d.playT=SV.d.playT||0;
// gathering: berries/herbs you collect also go into your bag; grass & flowers from tapping
const _col9=collect;collect=function(o){_col9(o);if(o.it.c=='berry'||o.it.c=='herb'){SV.d.mat[o.it.c]=(SV.d.mat[o.it.c]||0)+1;floatTxt(o.x,o.y-20,'+1 '+MAT[o.it.c].e)}if(o.it.id=='seed'){SV.d.mat.seed+=2}SV.save()};
const _react9=react;react=function(d,strong){const r=_react9(d,strong);if(r&&strong&&G){const k=['grass','dunegrass','reed'].includes(d.k)?'grass':['flower','wildflowers'].includes(d.k)?'flower':null;if(k&&fx()<.45){SV.d.mat[k]++;SV.save();floatTxt(d.x,d.y-30,'+1 '+MAT[k].e)}}return r};
// ---------- recipes ----------
const ITEMS9={
 dye_rose:{n:'Rose Dye',e:'🩷',col:'#d89aa8',d:'A soft pink paint'},dye_berry:{n:'Blueberry Dye',e:'💙',col:'#7a8ab8',d:'A dusky blue paint'},dye_sun:{n:'Buttercup Dye',e:'💛',col:'#e8cc78',d:'A warm yellow paint'},
 dye_moss:{n:'Moss Dye',e:'💚',col:'#8aa070',d:'A sage green paint'},dye_lav:{n:'Lavender Dye',e:'💜',col:'#a898c8',d:'A gentle lilac paint'},dye_peach:{n:'Peach Dye',e:'🧡',col:'#e8b090',d:'A peachy paint'},dye_bark:{n:'Bark Dye',e:'🤎',col:'#9a7a5a',d:'A cosy brown paint'},
 tea:{n:'Herbal Tea',e:'🍵',use:'drink',d:'Warm and calming'},btea:{n:'Blossom Tea',e:'🫖',use:'drink',d:'Smells like spring'},
 bloom:{n:'Bloom Potion',e:'🧪',use:'pour',d:'Pour it to make flowers grow'},seedbomb:{n:'Seed Bomb',e:'🟤',use:'throw',d:'Toss it and wildflowers sprout'},
 plantern:{n:'Paper Lantern',e:'🏮',place:'plantern',d:'A leafy lantern to place'},chime:{n:'Wind Chime',e:'🎐',place:'chime',d:'Tinkles in the breeze'},swing:{n:'Rope Swing',e:'🪢',place:'swing',d:'A little swing to place'},
 leafhat:{n:'Leaf Hat',e:'🍃',wear:'leaf',d:'Wear it, or gift it'},crown:{n:'Flower Crown',e:'🌸',wear:'flower',d:'Wear it, or gift it'},scarf:{n:'Grass Scarf',e:'🧣',wear:'scarf',d:'A cosy woven scarf'},
 honey:{n:'Honey Jar',e:'🍯',d:'A sweet gift for a friend'},rope:{n:'Grass Rope',e:'🪢',ing:1,d:'Useful for making things'},
 pebblepal:{n:'Pebble Friend',e:'🪨',d:'A happy little pebble with a face'},bouquet:{n:'Tiny Bouquet',e:'💐',d:'A sweet handful of blooms'},clover:{n:'Lucky Clover',e:'🍀',d:'Brings a cozy feeling'},shellnecklace:{n:'Shell Necklace',e:'📿',d:'Clinks softly'}};
const RECIPES={'berry+petal':'dye_rose','berry+berry':'dye_berry','flower+petal':'dye_sun','herb+moss':'dye_moss','flower+herb':'dye_lav','petal+petal':'dye_peach','cap+twig':'dye_bark',
 'herb+herb':'tea','flower+herb+petal':'btea','flower+herb+shell':'bloom','moss+pebble+seed':'seedbomb','leaf+petal+twig':'plantern','shell+shell+twig':'chime','rope+twig+twig':'swing',
 'grass+leaf+leaf':'leafhat','flower+flower+grass':'crown','grass+grass+moss':'scarf','cap+flower+flower':'honey','grass+grass':'rope','flower+flower':'seeds','berry+herb+seed':'seeds'};
ITEMS9.seeds={n:'Seeds',e:'🫘',mat:'seed',d:'+2 seeds for your garden'};
const CUTE=['pebblepal','bouquet','clover','shellnecklace'];
const ingName=k=>MAT[k]?MAT[k].e+' '+MAT[k].n:ITEMS9[k].e+' '+ITEMS9[k].n;
const have=k=>MAT[k]?(SV.d.mat[k]||0):(SV.d.inv[k]||0);
const take=(k,n=1)=>{if(MAT[k])SV.d.mat[k]-=n;else SV.d.inv[k]-=n};
const give=(k,n=1)=>{if(MAT[k]){SV.d.mat[k]=(SV.d.mat[k]||0)+n;return}if(ITEMS9[k]&&ITEMS9[k].mat){SV.d.mat[ITEMS9[k].mat]+=2;return}SV.d.inv[k]=(SV.d.inv[k]||0)+n;if(ITEMS9[k]&&ITEMS9[k].col&&!SV.d.dyes.includes(k))SV.d.dyes.push(k)};
// ---------- ASMR sounds ----------
const SX9={grind(){for(let i=0;i<6;i++){nburst(320+fx()*200,.22,.06,1.4,i*.2);if(i%2)playB('stone'+(1+(fx()*3|0)),.25,1.4,0)}},
 pour(){playB('water1',.5,.55);playB('water3',.35,.7);nburst(900,.8,.02,.6,.1)},brush(){nburst(4200,.35,.03,.5);nburst(2600,.3,.02,.6,.12)},
 plant(){playB('moss'+(1+(fx()*3|0)),.6,.8);syn(140,.2,.06,'sine',.12,90)},pop(){syn(660,.25,.04,'sine',0,880);syn(990,.3,.025,'sine',.08)},
 warm(){[0,2,4,7].forEach((n,i)=>syn(PENTA[n]*.5,1.6,.035,'sine',i*.18))}};
// ---------- panel UI ----------
const mk9=document.createElement('style');mk9.textContent=`#sMake canvas,#pal8 canvas{position:static;inset:auto;display:inline-block}#sMake #bowl,#sMake #leafC{display:block}
#sMake .parch{max-width:min(94vw,760px);max-height:88vh;overflow:auto;background:rgba(255,248,230,.97)}
#sMake .tabs{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin:6px 0 10px}#sMake .tabs .b{font-size:14px;padding:6px 10px}
.mi{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;width:66px;height:66px;margin:3px;border-radius:14px;background:rgba(240,225,190,.6);border:1px solid rgba(160,120,60,.3);cursor:grab;font-size:12px;color:#5a4a30;user-select:none;vertical-align:top}
.mi canvas{width:34px;height:34px}.mi .e{font-size:26px;line-height:32px}.mi.off{opacity:.35}
#bowl{width:220px;height:150px;margin:6px auto;display:block;touch-action:none}
.rrow{font-size:14px;padding:4px 8px;border-bottom:1px dashed rgba(160,120,60,.3);text-align:left}
.swatch{display:inline-block;width:34px;height:34px;border-radius:50%;margin:3px;border:3px solid transparent;cursor:pointer;vertical-align:middle}.swatch.on{border-color:#6a4a24}
#leafC{touch-action:none;display:block;margin:6px auto;border-radius:12px;cursor:crosshair}`;document.head.appendChild(mk9);
const sMake=document.createElement('div');sMake.className='screen hide dim';sMake.id='sMake';sMake.innerHTML='<div class="parch"><h2 style="margin:4px 0">🧶 Make</h2><div class="tabs" id="mkTabs"></div><div id="mkBody"></div><div style="margin-top:10px"><button class="b n" id="mkClose">Back to the trail</button></div></div>';document.body.appendChild(sMake);
let mkTab='make',bowl=[],lastMade=null;
const bMake=document.createElement('button');bMake.className='b n';bMake.id='bMake';bMake.textContent='🧶';bMake.title='Make (M)';bBuild.before(bMake);bMake.onclick=()=>{S.pop();openMake()};
calmCSS.textContent+=`#bMake{opacity:.55;transform:scale(.82)}`;
function openMake(t){if(state!='play')return;if(BUILD.on)toggleBuild();state='craft';mkTab=t||mkTab;sMake.classList.remove('hide');renderMake()}
function closeMake(){sMake.classList.add('hide');state='play';bowl.forEach(k=>give(k));bowl=[];SV.save()}
$('mkClose').onclick=()=>{S.pop();closeMake()};
addEventListener('keydown',e=>{if(e.key.toLowerCase()=='m'&&!e.repeat){if(state=='play')openMake();else if(state=='craft')closeMake()}});
function tile(k,off,extra=''){const it=ITEMS9[k];const d=document.createElement('div');d.className='mi'+(off?' off':'');d.dataset.k=k;d.draggable=true;
 if(MAT[k]){const c=document.createElement('canvas');c.width=c.height=40;c.getContext('2d').drawImage(MATI[k],0,0);d.appendChild(c);d.insertAdjacentHTML('beforeend',`<div>${MAT[k].n} ${have(k)}</div>`)}else d.innerHTML=`<div class="e">${it.e}</div><div>${it.n.split(' ').slice(-1)[0]} ${extra||have(k)}</div>`;d.title=MAT[k]?MAT[k].n:it.n+' — '+it.d;return d}
function renderMake(){const T=$('mkTabs');T.innerHTML='';for(const[k,l]of[['make','🥣 Mix'],['book','📖 Recipes'],['bag','🎒 Bag'],['paint','🎨 Paint'],['draw','🍃 Leaf canvas']]){const b=document.createElement('button');b.className='b '+(k==mkTab?'':'n');b.textContent=l;b.onclick=()=>{S.pop();mkTab=k;renderMake()};T.appendChild(b)}
 const B=$('mkBody');B.innerHTML='';({make:renderMix,book:renderBook,bag:renderBag,paint:renderPaint,draw:renderDraw})[mkTab](B)}
// ----- Mix -----
function drawBowl(c,t=0,spin=0){const g=c.getContext('2d'),w=c.width,h=c.height;g.clearRect(0,0,w,h);g.save();g.translate(w/2,h*.62);
 g.fillStyle='rgba(60,40,20,.18)';g.beginPath();g.ellipse(0,44,86,12,0,0,TAU);g.fill();const gr=g.createLinearGradient(-80,0,80,0);gr.addColorStop(0,'#8a6a48');gr.addColorStop(.5,'#c8a478');gr.addColorStop(1,'#7a5a38');g.fillStyle=gr;g.beginPath();g.ellipse(0,-6,84,26,0,0,Math.PI);g.quadraticCurveTo(-80,50,0,48);g.quadraticCurveTo(80,50,84,-6);g.fill();
 g.fillStyle='#5a4028';g.beginPath();g.ellipse(0,-6,76,20,0,0,TAU);g.fill();bowl.forEach((k,i)=>{const a=i*2.1+spin*6,r=spin?26:i*24-24;g.save();g.translate(spin?Math.cos(a)*r:r,spin?Math.sin(a)*r*.35-6:-12);g.drawImage(MAT[k]?MATI[k]:mkEmoji(ITEMS9[k].e),-18,-18,36,36);g.restore()});
 g.save();g.translate(40+Math.sin(spin*12)*14,-40);g.rotate(.6+Math.sin(spin*12)*.15);g.fillStyle='#b8a890';g.fillRect(-7,-46,14,50);g.beginPath();g.arc(0,4,10,0,TAU);g.fill();g.restore();g.restore()}
const EMC={};function mkEmoji(e){if(EMC[e])return EMC[e];const c=document.createElement('canvas');c.width=c.height=40;const g=c.getContext('2d');g.font='30px serif';g.textAlign='center';g.textBaseline='middle';g.fillText(e,20,22);return EMC[e]=c}
function renderMix(B){B.innerHTML=`<p class="small" style="margin:2px">Drag or tap 2–3 things into the bowl, then grind. Try anything!</p><canvas id="bowl" width="440" height="300"></canvas>
 <div><button class="b" id="mxGo">🥣 Grind & mix</button> <button class="b n" id="mxClr">↩︎ Empty</button></div><div id="mxRes" style="min-height:26px;margin:6px;font-size:16px;color:#5a4a30">${lastMade||''}</div><div id="mxIng"></div>`;
 const c=$('bowl');drawBowl(c);const ing=$('mxIng');const ks=[...Object.keys(MAT),...Object.keys(ITEMS9).filter(k=>ITEMS9[k].ing)];
 for(const k of ks){const d=tile(k,have(k)<=0);d.onclick=()=>addBowl(k);d.addEventListener('dragstart',e=>e.dataTransfer.setData('text',k));ing.appendChild(d)}
 c.addEventListener('dragover',e=>e.preventDefault());c.addEventListener('drop',e=>{e.preventDefault();addBowl(e.dataTransfer.getData('text'))});
 $('mxClr').onclick=()=>{bowl.forEach(k=>give(k));bowl=[];S.pop();renderMake()};$('mxGo').onclick=grind}
function addBowl(k){if(!k||bowl.length>=3||have(k)<=0){if(bowl.length>=3)toast('The bowl is full',1200);return}take(k);bowl.push(k);playB('rustle',.35,1.4);renderMake()}
function grind(){if(bowl.length<2){toast('Add at least two things',1400);return}const c=$('bowl');SX9.grind();const t0=performance.now();
 (function an(){const k=(performance.now()-t0)/1300;if(k<1&&c.isConnected){drawBowl(c,0,k);requestAnimationFrame(an)}else finishMix()})()}
function finishMix(){const key=[...bowl].sort().join('+');let out=RECIPES[key],msg;
 if(out){const it=ITEMS9[out],isNew=!SV.d.recipes.includes(key);if(isNew)SV.d.recipes.push(key);give(out);SX9.pop();if(isNew)SX9.warm();msg=`${it.e} ${isNew?'New recipe! ':''}You made <b>${it.n}</b>`}
 else if(fx()<.35){out=CUTE[fx()*CUTE.length|0];give(out);SX9.pop();msg=`${ITEMS9[out].e} A happy accident: <b>${ITEMS9[out].n}</b>`}
 else{bowl.forEach(k=>give(k));SX.chime(1);msg='🍂 Nothing yet... your things are back in your bag'}
 bowl=[];SV.save();lastMade=msg;renderMake()}
// ----- Recipe book -----
function renderBook(B){const all=Object.keys(RECIPES);B.innerHTML=`<p class="small">${SV.d.recipes.length}/${all.length} recipes discovered</p>`+all.map(k=>{const kn=SV.d.recipes.includes(k),it=ITEMS9[RECIPES[k]];return`<div class="rrow">${kn?`${it.e} <b>${it.n}</b> = ${k.split('+').map(ingName).join(' + ')}`:`❔ ??? — ${k.split('+').length} ingredients${k.includes('flower')?' (one is a 🌼)':k.includes('shell')?' (one is a 🐚)':''}`}</div>`}).join('')}
// ----- Bag -----
function nearFriend(){if(!G)return null;let best=null,bd=280;for(const f of G.fr||[]){const d=dist(f.x,f.y,G.P.x,G.P.y);if(d<bd){bd=d;best={f,id:f.id}}}for(const n of G.npc||[]){const d=dist(n.x,n.y,G.P.x,G.P.y);if(d<bd){bd=d;best={n,id:n.f.id}}}return best}
function renderBag(B){const ks=Object.keys(SV.d.inv).filter(k=>SV.d.inv[k]>0);if(!ks.length){B.innerHTML='<p>Your bag is empty. Mix something in the bowl!</p>';return}
 B.innerHTML='<p class="small">Tap an item to use it</p><div id="bagG"></div><div id="bagA" style="margin-top:8px"></div>';const g=$('bagG');
 for(const k of ks){const d=tile(k,false);d.onclick=()=>{S.pop();const it=ITEMS9[k],A=$('bagA'),fr=nearFriend();A.innerHTML=`<div style="margin-bottom:6px">${it.e} <b>${it.n}</b> — ${it.d}</div>`;
   const act=(l,fn)=>{const b=document.createElement('button');b.className='b';b.style.margin='3px';b.textContent=l;b.onclick=()=>{S.pop();fn()};A.appendChild(b)};
   if(it.wear)act('Wear',()=>{wear(k)});if(it.use=='drink')act('Sip',()=>{take(k);closeMake();drink()});if(it.use=='pour')act('Pour here',()=>{take(k);closeMake();pourBloom()});if(it.use=='throw')act('Toss',()=>{take(k);closeMake();seedBomb()});
   if(it.place)act('Place',()=>{closeMake();BUILD.k=it.place;if(!BUILD.on)toggleBuild();else{renderPal();ghostAt(G.P.x+50,G.P.y+30)}});
   act(fr?`🎁 Gift to ${FRI[fr.id].n.split(' ')[0]}`:'🎁 Gift (stand near a friend)',()=>{if(!fr){toast('Walk up to a friend first',1600);return}take(k);SV.d.fgift[fr.id]=k;SV.save();closeMake();giftFx(fr)})};g.appendChild(d)}}
function wear(k){const it=ITEMS9[k];if(it.wear=='scarf'){SV.d.look.scarf=SV.d.look.scarf?0:1;toast(SV.d.look.scarf?'🧣 Cosy!':'Scarf off',1400)}else{if(!SV.d.hats.includes(it.wear))SV.d.hats.push(it.wear);SV.d.hat=SV.d.hat==it.wear?'safari':it.wear;toast(`${it.e} ${SV.d.hat==it.wear?'Looking lovely!':'Back to the safari hat'}`,1400)}SV.save();SX9.brush()}
function drink(){emote('☕');SX9.pour();setTimeout(()=>{SX9.warm();toast('Ahh... warm and cosy ☁️',2000)},700);G.P.cozy=6}
function giftFx(fr){const o=fr.f||fr.n;SX9.warm();for(let i=0;i<8;i++)parts.push({x:o.x,y:o.y-30,vx:(fx()-.5)*50,vy:-30-fx()*40,l:1.8,ml:1.8,c:'240,150,170',s:3});if(fr.f)fr.f.joy=1.5;G.giftBubble={id:fr.id,t:3,txt:['Oh! For me? Thank you! 💞','I love it! You\'re the best 💛','How thoughtful... thank you! 🌸'][fx()*3|0]};emote('♥',1)}
// bloom potion / seed bomb: wildflowers sprout (and garden beds nearby grow)
function sprout(cx,cy,n,rad){const R=mulberry((cx*7+cy)|0);let k=0;for(let i=0;i<n*3&&k<n;i++){const a=R()*TAU,r=Math.sqrt(R())*rad,px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r;if(inWater(px,py,10))continue;SV.d.blooms.push({x:Math.round(px),y:Math.round(py),k:R()<.6?'flower':'wildflowers',v:R()*8|0,t:SV.d.playT+k*.25});k++}
 if(SV.d.blooms.length>300)SV.d.blooms.splice(0,SV.d.blooms.length-300);SV.save();syncBuilds()}
function pourBloom(){SX9.pour();emote('💧');const P=G.P;let grew=0;for(const b of SV.d.builds)if(b.k=='bed'&&dist(b.x,b.y,P.x,P.y)<220){(b.plots||[]).forEach(p=>{if(p)p.p-=90});grew=1}sprout(P.x,P.y,grew?4:9,140);setTimeout(()=>toast(grew?'🌱 The garden perks up!':'🌼 Flowers bloom around you',1800),600)}
function seedBomb(){const P=G.P,fd=P.fd||1;SX9.plant();const tx=P.x+fd*120,ty=P.y+30;puff(tx,ty,8,'150,120,80',40,.8,3,20);setTimeout(()=>{sprout(tx,ty,10,110);SX9.pop();toast('🌸 Wildflowers!',1400)},500)}
// ----- Paint -----
const BASECOL=[['none','Natural',null],['oat','Oat','#d8c8a8'],['clay','Clay','#c09070']];
let PAINT={on:false,col:null,pat:'none'};
function palette(){return[...BASECOL,...SV.d.dyes.map(k=>[k,ITEMS9[k].n.replace(' Dye',''),ITEMS9[k].col])]}
function renderPaint(B){const sw=palette().map(([k,n,c])=>`<span class="swatch ${PAINT.col==c?'on':''}" data-c="${c||''}" title="${n}" style="background:${c||'repeating-linear-gradient(45deg,#e8dcc0,#e8dcc0 4px,#cfc0a0 4px,#cfc0a0 8px)'}"></span>`).join('');
 B.innerHTML=`<p class="small">Make dyes in the bowl to unlock more colours (${SV.d.dyes.length}/7).</p><div>${sw}</div>
 <div style="margin:8px">Pattern: ${['none','dots','stripes','hearts'].map(p=>`<button class="b ${PAINT.pat==p?'':'n'}" data-p="${p}" style="font-size:13px;padding:5px 9px">${{none:'Plain',dots:'• Dots',stripes:'≡ Stripes',hearts:'♥ Hearts'}[p]}</button>`).join(' ')}</div>
 <div style="margin:8px"><button class="b" id="pBuild">🖌️ Paint my builds</button></div>
 <div style="margin-top:6px"><b>Lottie</b>: <button class="b n" data-l="hatband">🎩 Hat ribbon</button> <button class="b n" data-l="scarfc">🧣 Scarf</button> <button class="b n" data-l="pack">🎒 Backpack</button></div><canvas id="lotPrev" width="200" height="200" style="width:120px;height:120px;margin-top:6px"></canvas>`;
 B.querySelectorAll('.swatch').forEach(s=>s.onclick=()=>{PAINT.col=s.dataset.c||null;SX9.brush();renderMake()});B.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{PAINT.pat=b.dataset.p;S.pop();renderMake()});
 B.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{const k=b.dataset.l;SV.d.look[k]=PAINT.col;if(k=='scarfc'&&PAINT.col)SV.d.look.scarf=1;SV.save();SX9.brush();renderMake()});
 $('pBuild').onclick=()=>{closeMake();PAINT.on=true;pDone.style.display='block';tut('paint','Tap a build to paint it')};
 const c=$('lotPrev'),g=c.getContext('2d'),im=IMG.lottie_l;if(im){const h=170,w=im.width*h/im.height;g.save();g.translate(100,190);g.scale(-1,1);g.drawImage(im,-w/2,-h,w,h);lookDeco(g,w,h,-1);g.restore()}}
const pDone=document.createElement('button');pDone.className='b';pDone.textContent='✓ Done painting';pDone.style.cssText='position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:22;display:none;opacity:.85';document.body.appendChild(pDone);pDone.onclick=()=>{PAINT.on=false;pDone.style.display='none';S.pop()};
addEventListener('pointerdown',e=>{if(!PAINT.on||e.target!==cv||state!='play')return;e.stopImmediatePropagation();const wx=(e.clientX-W/2)/zoom+cam.x,wy=(e.clientY-H/2)/zoom+cam.y;let best=null,bd=70;for(const b of SV.d.builds){const dd=dist(b.x,b.y-(BK[b.k]&&BK[b.k].flat?0:25),wx,wy);if(dd<bd){bd=dd;best=b}}
 if(best){best.col=PAINT.col;best.pat=PAINT.pat;SV.save();SX9.brush();puff(best.x,best.y-20,4,'240,230,210',20,.8,2.5,10)}},true);
// tinted / patterned build sprites (cached)
const TINT={};function tinted(k,col,pat){const key=k+col+pat;if(TINT[key])return TINT[key];const sp=BSPR[k],c=document.createElement('canvas');c.width=sp.img.width;c.height=sp.img.height;const g=c.getContext('2d');g.drawImage(sp.img,0,0);g.globalCompositeOperation='source-atop';
 if(col){g.globalAlpha=.55;g.fillStyle=col;g.fillRect(0,0,c.width,c.height);g.globalAlpha=1}
 if(pat&&pat!='none'){g.fillStyle='rgba(255,250,240,.55)';g.strokeStyle='rgba(255,250,240,.5)';g.lineWidth=5;if(pat=='dots')for(let y=8;y<c.height;y+=22)for(let x=(y/22%2)*11+6;x<c.width;x+=22){g.beginPath();g.arc(x,y,4,0,TAU);g.fill()}
  else if(pat=='stripes')for(let x=-c.height;x<c.width;x+=22){g.beginPath();g.moveTo(x,0);g.lineTo(x+c.height,c.height);g.stroke()}else{g.font='16px serif';for(let y=14;y<c.height;y+=26)for(let x=(y/26%2)*13+6;x<c.width;x+=26)g.fillText('♥',x,y)}}
 return TINT[key]={img:c,w:sp.w,h:sp.h}}
// ----- Leaf canvas (free draw) -----
const ARTC={};function artImg(i){if(ARTC[i])return ARTC[i];const im=new Image();im.src=SV.d.art[i];return ARTC[i]=im}
let drawCol='#6a5a3a',drawSz=8;
function renderDraw(B){const cols=['#6a5a3a','#3a3a32','#8aa070','#c8a060','#e8dcc0','#ffffff',...SV.d.dyes.map(k=>ITEMS9[k].col)];
 B.innerHTML=`<canvas id="leafC" width="480" height="340" style="width:min(86vw,360px);height:auto"></canvas><div>${cols.map(c=>`<span class="swatch ${c==drawCol?'on':''}" data-c="${c}" style="background:${c}"></span>`).join('')}</div>
 <div style="margin:6px">Brush: ${[4,8,16,28].map(s=>`<button class="b ${s==drawSz?'':'n'}" data-s="${s}" style="font-size:13px;padding:4px 9px">${s<6?'·':s<10?'•':s<20?'●':'⬤'}</button>`).join(' ')} <button class="b n" id="dClr" style="font-size:13px;padding:4px 9px">Clear</button> <button class="b" id="dSave">💾 Keep painting</button></div>
 <div id="artL" style="margin-top:6px"></div>`;
 const c=$('leafC'),g=c.getContext('2d');leafBG(g,c.width,c.height);let last=null,down=false;
 const pos=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height]};
 const dab=(px,py)=>{g.save();leafClip(g,c.width,c.height);const gr=g.createRadialGradient(px,py,0,px,py,drawSz);gr.addColorStop(0,drawCol+'cc');gr.addColorStop(1,drawCol+'00');g.fillStyle=gr;g.beginPath();g.arc(px,py,drawSz,0,TAU);g.fill();g.restore()};
 c.onpointerdown=e=>{down=true;c.setPointerCapture(e.pointerId);last=pos(e);dab(...last);SX9.brush()};c.onpointermove=e=>{if(!down)return;const p=pos(e),d=dist(p[0],p[1],last[0],last[1]),n=Math.max(1,d/(drawSz*.3)|0);for(let i=1;i<=n;i++)dab(lerp(last[0],p[0],i/n),lerp(last[1],p[1],i/n));if(fx()<.08)nburst(4500,.12,.012,.5);last=p};c.onpointerup=()=>down=false;
 B.querySelectorAll('.swatch').forEach(s=>s.onclick=()=>{drawCol=s.dataset.c;B.querySelectorAll('.swatch').forEach(x=>x.classList.toggle('on',x==s))});B.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{drawSz=+b.dataset.s;B.querySelectorAll('[data-s]').forEach(x=>x.className='b '+(x==b?'':'n'))});
 $('dClr').onclick=()=>{leafBG(g,c.width,c.height);S.pop()};$('dSave').onclick=()=>{const s=document.createElement('canvas');s.width=240;s.height=170;s.getContext('2d').drawImage(c,0,0,240,170);SV.d.art.push(s.toDataURL('image/png'));if(SV.d.art.length>12)SV.d.art.shift();SV.save();SX9.warm();toast('🖼️ Painting kept!',1400);renderArtList()};renderArtList()}
function leafClip(g,w,h){g.beginPath();g.moveTo(w*.04,h*.5);g.bezierCurveTo(w*.25,h*.02,w*.75,h*.02,w*.97,h*.5);g.bezierCurveTo(w*.75,h*.98,w*.25,h*.98,w*.04,h*.5);g.clip()}
function leafBG(g,w,h){g.clearRect(0,0,w,h);g.save();leafClip(g,w,h);const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#cfd8a8');gr.addColorStop(1,'#a8b880');g.fillStyle=gr;g.fillRect(0,0,w,h);g.strokeStyle='rgba(250,255,230,.35)';g.lineWidth=3;g.beginPath();g.moveTo(w*.04,h*.5);g.lineTo(w*.97,h*.5);for(let i=1;i<6;i++){g.moveTo(w*i/6.5,h*.5);g.lineTo(w*i/6.5+w*.1,h*.2);g.moveTo(w*i/6.5,h*.5);g.lineTo(w*i/6.5+w*.1,h*.8)}g.stroke();g.restore()}
function renderArtList(){const L=$('artL');if(!L)return;L.innerHTML=SV.d.art.length?'<div class="small">Your paintings — place one as a sign, or hang it in the nearest house:</div>':'';SV.d.art.forEach((u,i)=>{const d=document.createElement('div');d.style.cssText='display:inline-block;margin:4px;text-align:center';d.innerHTML=`<img src="${u}" style="width:96px;border-radius:8px;border:2px solid #b48a4a"><br><button class="b n" style="font-size:12px;padding:3px 7px" data-a="s">🪧 Sign</button><button class="b n" style="font-size:12px;padding:3px 7px" data-a="h">🏡 Hang</button>`;
 d.querySelector('[data-a=s]').onclick=()=>{closeMake();BUILD.k='sign';BUILD.art=i;if(!BUILD.on)toggleBuild();else{renderPal();ghostAt(G.P.x+50,G.P.y+30)}};
 d.querySelector('[data-a=h]').onclick=()=>{const P=G.P;let best=null,bd=320;for(const b of SV.d.builds)if(['cottage','hut','tent'].includes(b.k)){const dd=dist(b.x,b.y,P.x,P.y);if(dd<bd){bd=dd;best=b}}if(!best){toast('Stand near one of your houses',1600);return}best.art=i;SV.save();SX9.warm();toast('🖼️ Hung up with care',1400)};L.appendChild(d)})}
// ---------- new placeables: signs, chimes, paper lanterns, swing, mosaics ----------
(()=>{const mk=(w,h,fn)=>{const c=document.createElement('canvas');c.width=w*2;c.height=h*2;const g=c.getContext('2d');g.scale(2,2);g.translate(w/2,h);fn(g);return{img:c,w,h}};
 BSPR.sign=mk(70,80,g=>{g.fillStyle='#7a5430';g.fillRect(-3,-40,6,40);g.fillStyle='#9a7448';g.fillRect(-32,-78,64,44);g.fillStyle='#cfd8a8';g.fillRect(-28,-74,56,36)});
 BSPR.chime=mk(40,80,g=>{g.strokeStyle='#7a5430';g.lineWidth=3;g.beginPath();g.moveTo(0,0);g.lineTo(0,-70);g.lineTo(14,-70);g.stroke();g.strokeStyle='rgba(120,90,60,.7)';g.lineWidth=1;for(const[a,l]of[[8,18],[14,24],[20,16]]){g.beginPath();g.moveTo(a,-70);g.lineTo(a,-70+l);g.stroke();g.fillStyle='#f0e0cc';g.beginPath();g.ellipse(a,-70+l+4,3,5,0,0,TAU);g.fill()}});
 BSPR.plantern=mk(36,70,g=>{g.strokeStyle='#7a5430';g.lineWidth=3;g.beginPath();g.moveTo(0,0);g.lineTo(0,-46);g.stroke();g.fillStyle='#e8c890';g.beginPath();g.ellipse(0,-54,11,14,0,0,TAU);g.fill();g.strokeStyle='#8aa050';g.lineWidth=2;for(const a of[-6,0,6]){g.beginPath();g.moveTo(a,-67);g.quadraticCurveTo(a*1.6,-54,a,-41);g.stroke()}});
 BSPR.swing=mk(80,90,g=>{g.strokeStyle='#7a5430';g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(-34,0);g.lineTo(-30,-84);g.lineTo(30,-84);g.lineTo(34,0);g.stroke();g.strokeStyle='#c8b070';g.lineWidth=1.6;g.beginPath();g.moveTo(-12,-82);g.lineTo(-12,-24);g.moveTo(12,-82);g.lineTo(12,-24);g.stroke();g.fillStyle='#8a6a3a';g.fillRect(-16,-26,32,6)});
 const tileS=(col)=>mk(16,16,g=>{g.translate(0,-8);g.fillStyle=col;g.beginPath();g.ellipse(0,0,7,5,0,0,TAU);g.fill();g.fillStyle='rgba(255,255,245,.35)';g.beginPath();g.ellipse(-2,-2,3,1.5,0,0,TAU);g.fill()});
 BSPR.mpebble=tileS('#b0a898');BSPR.mpetal=tileS('#e0b0c0')})();
Object.assign(BK,{sign:{n:'Painted Sign',e:'🪧',c:{twig:1},r:16,hidden:1},chime:{n:'Wind Chime',e:'🎐',c:{},inv:'chime',r:12,hidden:1},plantern:{n:'Paper Lantern',e:'🏮',c:{},inv:'plantern',r:12,hidden:1},swing:{n:'Rope Swing',e:'🪢',c:{},inv:'swing',r:30,seat:1,hidden:1},
 mpebble:{n:'Pebble Mosaic',e:'⚪',c:{pebble:1},r:0,flat:1,quick:1,mos:1},mpetal:{n:'Petal Mosaic',e:'🌸',c:{petal:1},r:0,flat:1,quick:1,mos:1}});
// palette hides inventory-only items unless you own them; mosaics snap to a soft 14px lattice
const _rp9=renderPal;renderPal=function(){const hid=Object.keys(BK).filter(k=>BK[k].hidden&&!(BK[k].inv&&SV.d.inv[BK[k].inv]>0)&&!(k=='sign'&&BUILD.k=='sign'));const sv={};hid.forEach(k=>{sv[k]=BK[k];delete BK[k]});_rp9();Object.assign(BK,sv);
 pal.querySelectorAll('[data-k]').forEach(d=>{const k=d.dataset.k;if(BK[k].inv){const n=SV.d.inv[BK[k].inv]||0;d.lastElementChild.textContent=`in bag: ${n}`;d.style.opacity=n?1:.45}})};
const _ga9=ghostAt;ghostAt=function(wx,wy){if(BK[BUILD.k]&&BK[BUILD.k].mos){const near=SV.d.builds.some(b=>BK[b.k]&&BK[b.k].mos&&dist(b.x,b.y,wx,wy)<60);if(near){wx=Math.round(wx/14)*14;wy=Math.round(wy/14)*14}}_ga9(wx,wy);if(BUILD.g&&BK[BUILD.k].inv&&!(SV.d.inv[BK[BUILD.k].inv]>0))BUILD.g.ok=false;if(BUILD.g&&BK[BUILD.k].mos&&SV.d.builds.some(b=>BK[b.k].mos&&dist(b.x,b.y,BUILD.g.x,BUILD.g.y)<6))BUILD.g.ok=false};
const _pl9=place;place=function(){const n0=SV.d.builds.length,k=BUILD.k;_pl9();if(SV.d.builds.length>n0){const b=SV.d.builds[SV.d.builds.length-1];if(BK[k].inv){SV.d.inv[BK[k].inv]--;renderPal()}if(k=='sign')b.art=BUILD.art|0;if(BK[k].mos){b.col=PAINT.col;b.r=0}if(k=='bed')b.plots=[null,null,null];SV.save()}};
const _rm9=removeAt;removeAt=function(wx,wy){const before=SV.d.builds.slice();_rm9(wx,wy);const gone=before.find(b=>!SV.d.builds.includes(b));if(gone&&BK[gone.k].inv)SV.d.inv[BK[gone.k].inv]=(SV.d.inv[BK[gone.k].inv]||0)+1};
// touch: mosaics place straight away on tap
addEventListener('pointerdown',e=>{if(!BUILD.on||e.target!==cv||state!='play'||BUILD.rem||e.pointerType=='mouse'||!BK[BUILD.k].quick)return;e.stopImmediatePropagation();ghostAt((e.clientX-W/2)/zoom+cam.x,(e.clientY-H/2)/zoom+cam.y);place()},true);
// blooms (persistent wildflowers) become decor
const _sb9=syncBuilds;syncBuilds=function(){_sb9();if(!TALL)return;TALL=TALL.filter(d=>!d.bloom);for(const b of SV.d.blooms)TALL.push({k:b.k,v:b.v,x:b.x,y:b.y,s:.7,fl:b.v%2==0,bloom:b});TALL_G=bucket(TALL)};
// ---------- gardening ----------
const CROPS={flower:{n:'Flowers',e:'🌼',g:150,col:'#f0d070'},herb:{n:'Herbs',e:'🌱',g:180,col:'#7aa050'},berry:{n:'Berries',e:'🫐',g:220,col:'#4a5a9a'}};
const stage=p=>p?clamp((SV.d.playT-p.p)/CROPS[p.s].g,0,1):0;
function nearBed(){if(!G)return null;let best=null,bd=70;for(const b of SV.d.builds)if(b.k=='bed'){const d=dist(b.x,b.y,G.P.x,G.P.y);if(d<bd){bd=d;best=b}}return best}
function plant(){const b=nearBed();if(!b)return;b.plots=b.plots||[null,null,null];const i=b.plots.findIndex(p=>!p);if(i<0)return;if(SV.d.mat.seed<=0){toast('No seeds — mix 🌼+🌼, or dig for some',1800);return}SV.d.mat.seed--;const s=['flower','herb','berry'][(SV.d.playT*7+i)%3|0];b.plots[i]={s,p:SV.d.playT};SV.save();SX9.plant();puff(b.x-30+i*30,b.y-10,4,'120,90,50',20,.6,2.5,6);tut('garden','Seeds grow slowly while you play')}
function harvest(){const b=nearBed();if(!b||!b.plots)return;let got=[];b.plots.forEach((p,i)=>{if(p&&stage(p)>=1){const m=p.s;SV.d.mat[m]=(SV.d.mat[m]||0)+2;if(fx()<.5)SV.d.mat.seed++;got.push(CROPS[m].e);b.plots[i]=null;floatTxt(b.x-30+i*30,b.y-40,'+2 '+CROPS[m].e)}});if(got.length){SV.save();SX9.plant();SX9.pop();toast('🧺 Harvested '+got.join(' '),1600)}}
const bPlant=mkB('aPlant','🌱 Plant',plant),bHarv=mkB('aHarv','🧺 Harvest',harvest);
// draw beds with crops, painted builds, signs with paintings, house pictures, gifts on friends
const _dd9=drawDecor;drawDecor=function(d,t){if(!d.build)return _dd9(d,t);const b=d.build,sp0=BSPR[b.k];if(!sp0)return;const sp=(b.col||(b.pat&&b.pat!='none'))?tinted(b.k,b.col,b.pat):sp0;
 shadowE(x,b.x,b.y+2,sp.w*.4,sp.w*.11,.35);x.save();x.translate(b.x,b.y);const sq=b.k=='fence'||b.k=='bench'||b.k=='bed';if(BK[b.k].rot&&!sq)x.rotate(b.r*.12);if(sq){const c=Math.cos(b.r);x.scale(Math.max(.35,Math.abs(c)),1);if(c<0)x.scale(-1,1)}
 if(b.k=='swing'){x.drawImage(sp.img,-sp.w/2,-sp.h,sp.w,sp.h)}else if(b.k=='chime'){x.rotate(Math.sin(t/900+b.x)*.03);x.drawImage(sp.img,-sp.w/2,-sp.h,sp.w,sp.h)}else x.drawImage(sp.img,-sp.w/2,-sp.h,sp.w,sp.h);
 if(b.k=='sign'&&SV.d.art[b.art]){const im=artImg(b.art);if(im.complete)x.drawImage(im,-28,-74,56,36)}
 if(b.art!=null&&['cottage','hut','tent'].includes(b.k)&&SV.d.art[b.art]){const im=artImg(b.art);if(im.complete){x.fillStyle='#7a5430';x.fillRect(14,-40,26,20);x.drawImage(im,16,-38,22,16)}}
 if(b.k=='bed'&&b.plots)b.plots.forEach((p,i)=>{if(!p)return;const s=stage(p),px=-28+i*28,py=-16,c=CROPS[p.s];x.save();x.translate(px,py);const sw=Math.sin(t/1100+i)*.05;x.rotate(sw);x.strokeStyle='#5a8a3a';x.lineWidth=2;x.lineCap='round';const h=4+s*20;x.beginPath();x.moveTo(0,0);x.lineTo(0,-h);x.stroke();
  x.fillStyle='#6a9a3a';for(const sd of[-1,1]){x.beginPath();x.ellipse(sd*4,-h*.45,3+s*2,1.6+s,sd*.5,0,TAU);x.fill()}if(s>.6){x.fillStyle=c.col;const r=1.5+(s-.6)*9;if(p.s=='berry')for(const[a,bb]of[[-3,0],[3,1],[0,-3]]){x.beginPath();x.arc(a,-h+bb,r*.55,0,TAU);x.fill()}else{for(let k=0;k<5;k++){x.beginPath();x.ellipse(Math.cos(k*1.26)*r*.7,-h+Math.sin(k*1.26)*r*.7,r*.5,r*.35,k,0,TAU);x.fill()}x.fillStyle='#c08030';x.beginPath();x.arc(0,-h,r*.3,0,TAU);x.fill()}}
  if(s>=1&&Math.sin(t/500+i)>.9){x.fillStyle='rgba(255,250,220,.7)';x.beginPath();x.arc(5,-h-6,1.6,0,TAU);x.fill()}x.restore()});
 x.restore()};
// mosaics: tinted tiles in the ground pass
const _gp9=groundPass;groundPass=function(x0,y0,x1,y1){_gp9(x0,y0,x1,y1);for(const b of SV.d.builds){if(!BK[b.k]||!BK[b.k].mos||b.x<x0-20||b.x>x1+20||b.y<y0-20||b.y>y1+20)continue;x.fillStyle='rgba(40,30,15,.25)';x.beginPath();x.ellipse(b.x+1,b.y+1.5,7,5,0,0,TAU);x.fill();x.fillStyle=b.col||(b.k=='mpetal'?'#e0b0c0':'#b0a898');x.beginPath();x.ellipse(b.x,b.y,7,5,(b.x*.1)%3,0,TAU);x.fill();x.fillStyle='rgba(255,255,245,.3)';x.beginPath();x.ellipse(b.x-2,b.y-2,3,1.5,0,0,TAU);x.fill()}};
// Lottie look: hat ribbon, scarf, backpack patch (drawn over the painted sprite)
function lookDeco(g,w,h,dir){const L=SV.d.look;g.save();if(L.hatband){g.fillStyle=L.hatband;g.globalAlpha=.85;g.beginPath();g.ellipse(w*.06,-h*.80,w*.24,h*.035,-.12,0,TAU);g.fill()}
 if(L.scarf){g.globalAlpha=.9;g.fillStyle=L.scarfc||'#c86a4a';g.beginPath();g.ellipse(w*.14,-h*.56,w*.17,h*.05,.3,0,TAU);g.fill();g.beginPath();g.moveTo(w*.08,-h*.55);g.quadraticCurveTo(-w*.02,-h*.42,w*.02,-h*.36);g.lineTo(w*.08,-h*.38);g.quadraticCurveTo(w*.06,-h*.46,w*.14,-h*.54);g.fill()}
 if(L.pack){g.globalAlpha=.5;g.globalCompositeOperation='multiply';g.fillStyle=L.pack;g.beginPath();g.ellipse(-w*.26,-h*.48,w*.16,h*.17,0,0,TAU);g.fill()}g.restore()}
const _dp9=drawPlayer;drawPlayer=function(P,t){_dp9(P,t);if(!G||!IMG.lottie_l)return;const L=SV.d.look;if(!L.hatband&&!L.scarf&&!L.pack)return;if(P.lastK&&P.lastK.k!='lottie_l')return;
 const im=IMG.lottie_l,h=106,w=im.width*h/im.height,flip=P.lastK?P.lastK.flip:false,hop=P.hop>0?Math.sin(Math.PI*(1-P.hop))*16:0,alt=P.alt||0;x.save();x.translate(P.x,P.y-hop-alt);if(alt>1)x.scale(1+P.flyK*.12,1+P.flyK*.12);x.scale(flip?-1:1,1);lookDeco(x,w,h);x.restore()};
// gifts shown on friends + thank-you bubble
const _dc9=drawCritter;drawCritter=function(id,px,py,h,t,vx,alt=0,joy=0){_dc9(id,px,py,h,t,vx,alt,joy);const fid=id=='butterfly'?'caterpillar':id,gk=SV.d.fgift[fid];if(!gk||!ITEMS9[gk])return;x.save();x.font=`${Math.round(h*.45)}px serif`;x.textAlign='center';const w=ITEMS9[gk].wear;x.fillText(ITEMS9[gk].e,px+(w?0:h*.45),py-alt-(w?h*.95:h*.25));x.restore()};
const _mm9=drawMinimap;drawMinimap=function(){if(G&&G.giftBubble&&state=='play'){const gb=G.giftBubble,f=(G.fr||[]).find(f=>f.id==gb.id)||((G.npc||[]).find(n=>n.f.id==gb.id));if(f&&gb.t>0){x.save();x.setTransform(DPR*zoom,0,0,DPR*zoom,DPR*(W/2-cam.x*zoom),DPR*(H/2-cam.y*zoom));bubble(f.x,f.y-(f.alt||0)-60,gb.txt,Math.min(1,gb.t));x.restore()}}_mm9()};
// ---------- per frame ----------
let ab9=0;const _upd9=update;update=function(dt){_upd9(dt);if(!G||state!='play')return;SV.d.playT+=dt;if(G.giftBubble)G.giftBubble.t-=dt;const P=G.P;
 if(P.cozy>0){P.cozy-=dt;if(fx()<dt*1.5)parts.push({x:P.x+(fx()-.5)*20,y:P.y-90,vx:(fx()-.5)*8,vy:-14,l:1.6,ml:1.6,c:'255,250,240',s:3})}
 // wind chimes ring softly in gusts
 for(const b of SV.d.builds)if(b.k=='chime'&&dist(b.x,b.y,P.x,P.y)<420&&fx()<dt*.35){const i=(b.x+b.y+(performance.now()/1000|0))%PENTA.length|0;SX.crystal(i+2)}
 ab9-=dt;if(ab9<=0){ab9=.2;const b=nearBed(),on=!!b&&!BUILD.on&&!P.fly&&!P.boat;const free=on&&b.plots&&b.plots.some(p=>!p),ripe=on&&b.plots&&b.plots.some(p=>p&&stage(p)>=1);show(bPlant,free);show(bHarv,ripe);
  if(SV.d.recipes.length==0&&G.el>40)tut('make','🧶 Tap Make to mix things in the bowl')}
 if(SV.d.playT%10<dt)SV.save()};
syncBuilds();
window.__v9={openMake,closeMake,addBowl,grind,finishMix,plant,harvest,wear,sprout,giftFx,nearFriend,PAINT,tinted,renderMake,get mkTab(){return mkTab},set mkTab(v){mkTab=v}};

// ===== PWA: service worker (offline + update-on-reload) =====
if('serviceWorker' in navigator&&location.protocol!='file:'){addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').then(r=>{r.update&&r.update()}).catch(()=>{});let had=!!navigator.serviceWorker.controller,re=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(had&&!re&&state!='play'&&state!='craft'){re=true;location.reload()}had=true})})}
// standalone: resume audio when returning to the app
addEventListener('pageshow',()=>{const A=S.ctx&&S.ctx();if(A&&A.state!='running'&&MU.unlocked)A.resume().catch(()=>{})});
