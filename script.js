'use strict';
/* ===== 在這裡改文字、連結、音樂、密碼 ===== */
const CFG={
bgm:'slo-mo.mp3',
photo: "photo.png",
music:'i-love-you-3000.mp3',
link:'',
linkText:'▶ 在新分頁開啟',
embed:'https://cypom.github.io/photomes/',
pass:'0530',
diaryCode:'1005',
bedNote:'毯子底下有一張小紙條，和一個神奇的箱子，框啷框啷的不知道是什麼：\n\n分針停留的那刻就是鑰匙。\n記得帶著箱子去找小狗。',
diary:['在日記本前來來回回躊躇了許久，\n有太多的話讓我始終不知道該如何在這個特別的日子開口，\n那就……希望我是第一個親口說出祝福的那個人。\n這本日記是為壽星準備的第一個驚喜。\n希望這會是印象深刻、難以忘懷的一天。','聰明的男朋友，\n一定發現了奇怪的地方。','說不定到處看看會發現什麼，\n小狗也可以繼續幫你聞聞嗅嗅。\n但求助女朋友需要一點賄賂！'],
frame:'一直以來，這些都是我珍藏的回憶、繼續走下去的力氣來源。',
shirt:'黑色襯衫之外……\n裡面好像放了神祕的袋子，\n是食物……？\n\n\n沒開封、借放一小時而已！\n（劃重點括號不能刪）',
drawer:['有一個棕色的小布包，\n是刻在我心底的名字'],
plush:'汪汪汪汪汪——\n經檢測，翟家小狗已經五分鐘沒有被摸了，\n請立刻撫摸。',
speaker:'I Love You 3000',
final:'親愛的 ○○：\n\n生日快樂！\n這一路上的每一個回憶，都是因為有你才特別。\n願新的一歲，溫暖、可愛、一切順心。\n\n— 署名'};
/* ======================================= */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const S={state:'identity-check',got:{},open:false,playing:false,mode:'bgm',diaryOK:false,done:false,after:null};
const A={bgm:null,love:null};
const IDS=['diary','frame','shirt','drawer','plush','speaker'];
const cnt=()=>IDS.filter(i=>S.got[i]).length;
const setState=s=>{S.state=s;document.body.dataset.state=s};
const txt=t=>{const d=document.createElement('div');d.textContent=t;return d};
const digits=v=>String(v||'').normalize('NFKC').replace(/\D/g,'');
function toast(t){const e=$('#toast');if(!e)return;e.textContent=t;e.className='show';clearTimeout(toast.t);toast.t=setTimeout(()=>e.className='',2400)}

function mk(src,loop){try{const a=new Audio(src);a.loop=loop;a.preload='auto';return a}catch(e){return null}}
function playA(a){try{const r=a&&a.play();r&&r.catch&&r.catch(()=>{})}catch(e){}}
function startBgm(){if(S.mode!=='bgm')return;if(!A.bgm)A.bgm=mk(CFG.bgm,true);if(A.bgm&&A.bgm.paused)playA(A.bgm)}
document.addEventListener('pointerdown',startBgm);

function dlg(title,node,btns){$('#dt').textContent=title;const b=$('#db');b.className='';void b.offsetWidth;b.className='flip';b.innerHTML='';b.append(node);
const bt=$('#dbtn');bt.innerHTML='';(btns||[{t:'CLOSE',f:closeDlg}]).forEach(x=>{const k=document.createElement('button');k.type='button';k.className='btn';k.textContent=x.t;k.onclick=x.f;bt.append(k)});$('#dlg').hidden=false}
function closeDlg(){$('#dlg').hidden=true;const a=S.after;S.after=null;a&&a()}
function hud(){$('#mem').textContent='MEMORIES\n'+IDS.map(i=>S.got[i]?'▣':'□').join(' ');
const q=[['Explore the room',S.open],['Find the diary',S.got.diary],['Find the photo',S.got.frame],['Find the black shirt',S.got.shirt],['Discover all memories',cnt()===6]];
$('#quest').textContent='QUEST'+(cnt()===6?' COMPLETE':'')+'\n'+q.map(a=>(a[1]?'▣ ':'□ ')+a[0]).join('\n')}
const chk=()=>{if(cnt()===6&&!S.done){S.done=true;complete()}};
const memDone=()=>{S.after=chk};
function found(id,st){if(S.got[id])return;S.got[id]=1;hud();toast('NEW MEMORY FOUND!🐾');if(st)setState(st)}

const LOCK={frame:['diary','太急了不是這裡！汪汪汪汪——'],wardrobe:['frame','我記得哥哥應該更會找東西？'],drawer:['shirt','暫時鎖起來了，也許摸摸小狗可以幫你把鎖撞開。'],plush:['drawer','只有幾個掌印🐾🐾。'],speaker:[null,'好像還沒插上插頭，現在只有會嗷嗚的小狗本人配音。']};
const locked=id=>{const l=LOCK[id];return l?(id==='speaker'?cnt()<4:!S.got[l[0]]):false};

function diaryLock(){const w=document.createElement('div');w.append(txt('不管怎麼翻，日記本都會紋絲不動的，哈！\n（大概是被調皮小狗鎖上了）\n怪盜小狗   留'));
 const i=document.createElement('input');i.type='text';i.className='codein';i.maxLength=4;i.inputMode='numeric';i.placeholder='----';w.append(i);
 const go=()=>{if(digits(i.value)===CFG.diaryCode){S.diaryOK=true;$('#diary').classList.remove('lockd');toast('UNLOCKED!');H.diary()}else{toast('怎麼可以輸入錯誤，不可饒恕！૮ ⸌̣ ﻌ ⸍̣ ა');i.value='';i.focus()}};
 i.onkeydown=e=>{if(e.key==='Enter')go()};
 dlg('LOCKED DIARY',w,[{t:'UNLOCK',f:go},{t:'CLOSE',f:closeDlg}]);setTimeout(()=>i.focus(),60)}

const H={
window(){toast('毛茸茸的小狗很溫暖！小太陽今天是晴朗無雲！')},
diary(){if(!S.diaryOK)return diaryLock();
 found('diary','diary-found');let p=0;const n=CFG.diary.length;
 const show=()=>dlg(`DIARY ${p+1}/${n}`,txt(CFG.diary[p]),[...(p?[{t:'◀ PREV',f:()=>{p--;show()}}]:[]),p<n-1?{t:'NEXT ▶',f:()=>{p++;show()}}:{t:'CLOSE',f:closeDlg}]);
 memDone();show()},
frame(){found('frame','photo-found');
 const w=document.createElement('div');
 if(CFG.frame)w.append(txt(CFG.frame));
 if(CFG.embed){const f=document.createElement('iframe');f.src=CFG.embed;f.allowFullscreen=true;f.style.cssText='width:100%;height:50vh;min-height:220px;border:3px solid #fff;margin-top:10px;background:#fff';w.append(f)}
 const u=CFG.link||CFG.embed;
 if(u){const k=document.createElement('a');k.href=u;k.target='_blank';k.rel='noopener';k.className='btn';k.textContent=CFG.linkText;k.style.cssText='display:inline-block;margin-top:10px;text-decoration:none';w.append(k)}
 dlg('MEMORY',w);memDone()},
wardrobe(){$('#wardrobe').classList.add('open');found('shirt','shirt-found');memDone();
 setTimeout(()=>dlg('NEW ITEM FOUND: Black Shirt',txt(CFG.shirt)),1600)},
drawer(){$('#drawer').classList.add('open');found('drawer');memDone();
 setTimeout(()=>dlg('DRAWER',txt(CFG.drawer)),1000)},
plush(){const p=$('#plush');p.classList.add('shake');setTimeout(()=>p.classList.remove('shake'),650);found('plush');memDone();
 setTimeout(()=>dlg('꒰՞꜆‪⸝⸝⸝⸝‎꜀ ՞꒱و！',txt(CFG.plush)),500)},
speaker(){const s=$('#speaker');
 try{if(!A.love)A.love=mk(CFG.music,true);
  if(S.mode==='bgm'){S.mode='love';if(A.bgm){A.bgm.pause();A.bgm.currentTime=0}}
  if(S.playing){A.love&&A.love.pause();S.playing=false;s.classList.remove('on');toast('MUSIC OFF')}
  else{playA(A.love);S.playing=true;s.classList.add('on');toast('NOW PLAYING\n'+CFG.speaker)}}
 catch(e){toast('NOW PLAYING\n'+CFG.speaker)}
 if(!S.got.speaker){found('speaker');setTimeout(chk,1400)}},
bed(){const b=$('#bed');b.classList.add('lift');setTimeout(()=>b.classList.remove('lift'),1000);
 setTimeout(()=>dlg('NOTE',txt(CFG.bedNote)),600)},
rug(){toast('嗯？卡住了嗎？')},
clock(){toast('神奇時鐘一直停在 10:05！')},
cake(){const c=$('#cake');if(c.classList.contains('out'))return finalCard();
 c.classList.add('out');$('#stage').classList.add('dim');setState('final');toast('HAPPY BIRTHDAY');setTimeout(finalCard,1800)}};
function finalCard(){const w=document.createElement('div');w.append(txt('QUEST COMPLETE\nYou found every birthday memory.\n\n'),txt(CFG.final));
 dlg('HAPPY BIRTHDAY!',w,[{t:'↻ RESTART',f:()=>location.reload()},{t:'CLOSE',f:closeDlg}])}
function complete(){setState('memories-complete');
 dlg('ALL MEMORIES FOUND.',txt('100% COMPLETION.'),[{t:'▶ CONTINUE',f:()=>{closeDlg();$('#stage').classList.add('bright');$('#cake').hidden=false;toast('當然沒忘記準備女朋友本人親手做的蛋糕！');if(!S.playing)H.speaker()}}])}

function openCurtain(){if(S.open)return;S.open=true;$('#stage').classList.add('open');$('#openBtn').hidden=true;document.body.classList.add('play');
 setState('room');hud();setTimeout(()=>toast('QUEST STARTED\nFind all the birthday memories.'),1800)}
function toCurtain(){$('#boot').classList.add('gone');setState('curtain');$('#openBtn').hidden=false}

function showPw(){if(S.state!=='identity-check')return;setState('password');
 const ok=$('#ok');if(ok)ok.hidden=false;$('#pw').hidden=false;try{$('#pwIn').focus()}catch(e){}}
function checkPw(){if(S.state!=='password')return;
 if(digits($('#pwIn').value)===CFG.pass){$('#pwMsg').style.color='#7dff9b';$('#pwMsg').textContent='ACCESS GRANTED';startBgm();setTimeout(toCurtain,500)}
 else{$('#pwMsg').style.color='#ff6b6b';$('#pwMsg').textContent='ACCESS DENIED';const b=$('#boot .box');b.classList.remove('bad');void b.offsetWidth;b.classList.add('bad');$('#pwIn').value='';$('#pwIn').focus()}}
$('#pwBtn').addEventListener('click',checkPw);
$('#pwIn').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();checkPw()}});

$('#stage').addEventListener('click',e=>{const o=e.target.closest('.obj');if(!o)return;const id=o.dataset.id;
 try{if(S.state==='curtain'||S.state==='identity-check'||S.state==='password'){if(id==='window'&&S.state==='curtain')openCurtain();return}
  if(!$('#dlg').hidden||S.state==='final'&&id!=='cake')return;
  if(locked(id)){toast(LOCK[id][1]);return}
  H[id]&&H[id]()}catch(err){console.error(err);toast('…')}});
$('#openBtn').addEventListener('click',openCurtain);
$('#restart').addEventListener('click',()=>location.reload());
const HINT={diary:'▶ 🐾🐾🐾🐾🐾',frame:'▶ 模糊的一片牆，好像放了很多照片……',wardrobe:'▶ 好像有被打開的痕跡。',drawer:'▶ 驚喜在這裡嗎……',plush:'▶毛茸茸、有兩個耳朵？',speaker:'▶ 播放音樂',window:'▶ [OPEN] 拉開窗簾',cake:'▶ 呼——不對，吹熄前要先許願！',clock:'▶ 幾點幾分了，為什麼還不摸摸小狗！',bed:'▶ 床上的毯子鼓起來了？'};
$$('.obj').forEach(o=>o.dataset.hint=HINT[o.dataset.id]||'▶ 查看');
$('#stage').addEventListener('mouseover',e=>{const o=e.target.closest('.obj'),h=$('#hint');if(o){h.textContent=o.dataset.hint;h.style.display='block';o.classList.toggle('locked',S.open&&locked(o.dataset.id))}else h.style.display='none'});
$('#stage').addEventListener('mouseleave',()=>$('#hint').style.display='none');

function fit(){$('#stage').style.transform=`scale(${Math.min(innerWidth/640,innerHeight/360)})`}
function tick(){const d=new Date();$('#ss').style.transform=`rotate(${d.getSeconds()*6}deg)`;$('#mm').style.transform='rotate(30deg)';$('#hh').style.transform='rotate(302.5deg)'}
function boot(){let p=0;const L={30:'> Detecting player...',60:'> Loading room...',90:'> Preparing ...'};
 const t=setInterval(()=>{p+=2;const n=Math.floor(p/10);$('#bar').textContent=`[${'█'.repeat(n)}${'░'.repeat(10-n)}] ${p}%`;
  if(L[p])$('#log').textContent+=L[p]+'\n';
  if(p>=100){clearInterval(t);$('#ok').hidden=false;setTimeout(showPw,1000)}},70)}
try{fit();addEventListener('resize',fit);tick();setInterval(tick,1000);hud()}catch(e){console.error(e)}
try{boot()}catch(e){console.error(e);showPw()}
setTimeout(showPw,9000);


