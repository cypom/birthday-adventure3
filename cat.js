(function(){try{
 if(document.getElementById('catCur'))return;
 if(window.matchMedia&&!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
 var st=document.createElement('style');
 st.textContent='#catCur{position:fixed;left:0;top:0;width:48px;height:33px;pointer-events:none;z-index:99999;opacity:1;will-change:transform}'
 +'#catCur svg{display:block;width:100%;height:100%;overflow:visible;image-rendering:pixelated}'
 +'#catCur.click{animation:catpop .25s steps(3)}'
 +'@keyframes catpop{50%{filter:brightness(1.8)}}'
 +'html.cat-on,html.cat-on *{cursor:none!important}';
 document.head.appendChild(st);
 var C={K:'#6b6b7a',O:'#1c1c22',P:'#ff8fa3',E:'#9fc4ff'};
 var R0='.'.repeat(10)+'K..K..';
 var R1='.'.repeat(9)+'KOKKOK.';
 var R2A='K'+'.'.repeat(8)+'KOOOOOK';
 var R2B='.'.repeat(9)+'KOOOOOK';
 var R3='K.'+'K'.repeat(8)+'OEOOEK';
 var R4='.K'+'O'.repeat(11)+'PPK';
 var R5='.K'+'O'.repeat(12)+'K.';
 var R6='.K'+'O'.repeat(10)+'KK..';
 var R7='..K'+'O'.repeat(8)+'K....';
 var F=[
  {tail:0,near:[2,11],far:[5,8]},
  {tail:1,near:[4,9],far:[3,10]},
  {tail:0,near:[5,8],far:[2,11]},
  {tail:1,near:[4,9],far:[3,10]},
  {tail:0,near:[4,9],far:[3,10]}
 ];
 function px(x,y,w,h,c){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+c+'"/>'}
 var el=document.createElement('div');el.id='catCur';
 el.innerHTML='<svg viewBox="0 0 16 11" shape-rendering="crispEdges"></svg>';
 document.body.appendChild(el);
 var svg=el.firstChild;
 function draw(i){
  var f=F[i],rows=[R0,R1,f.tail?R2B:R2A,R3,R4,R5,R6,R7],s='';
  f.far.forEach(function(x){s+=px(x,8,1,3,'#3a3a46')});
  rows.forEach(function(row,y){for(var x=0;x<16;x++){var c=row.charAt(x);if(C[c])s+=px(x,y,1,1,C[c])}});
  f.near.forEach(function(x){s+=px(x,8,1,2,C.O)+px(x,10,1,1,C.K)});
  svg.innerHTML=s;
 }
 var NX=43.5,NY=13.5;
 var px0=innerWidth/2,py0=innerHeight/2,dir=1,last=0,frame=4,shown=-1,idle=0;
 function render(){
  el.style.transform='translate('+(px0-NX)+'px,'+(py0-NY)+'px)';
  svg.style.transformOrigin=NX+'px 0';
  svg.style.transform=dir<0?'scaleX(-1)':'none';
 }
 document.documentElement.classList.add('cat-on');
 draw(4);render();
 setInterval(function(){
  var walking=(performance.now()-last)<280,want;
  if(walking){frame=(frame+1)%4;want=frame;idle=0}
  else{idle++;want=(Math.floor(idle/5)%2)?1:4}
  if(want!==shown){shown=want;draw(want)}
 },200);
 window.addEventListener('mousemove',function(e){
  var dx=e.clientX-px0;
  if(Math.abs(dx)>1)dir=dx>0?1:-1;
  px0=e.clientX;py0=e.clientY;last=performance.now();
  el.style.display='block';
  render();
 },true);
 window.addEventListener('mousedown',function(){
  el.classList.remove('click');void el.offsetWidth;el.classList.add('click');
 },true);
 document.addEventListener('mouseleave',function(){el.style.display='none'});
 document.addEventListener('mouseenter',function(){el.style.display='block'});
}catch(e){console.error(e)}})();
