'use strict';
/* ===== 在這裡改文字、照片、連結、音樂、密碼 ===== */
const CFG={
bgm:'slo-mo.mp3',
music:'i-love-you-3000.mp3',
photo:'photo.png',
link:'',
linkText:'▶ 點我看更多',
embed:'https://cypom.github.io/photomes/',
pass:'0530',
diaryCode:'1005',
bedNote:'毯子底下有一張小紙條，和一個神奇的布包，框啷框啷的不知道是什麼：\n\n「分針停滯的那刻，就是鑰匙。\n記得帶著布包去找小狗。」',
diary:['在日記本前來來回回躊躇了許久，\n有待多的話讓我始終不知道該如何在這個特別的日子開口，\n那就……希望我是第一個親口說出祝福的那個她。\n這本日記，是為壽星準備的第一個驚喜。','翻到這一頁的你，\n一定發現這個房間有點不一樣了。','繼續探索吧，\n每一件物品都藏著一段回憶。'],
frame:'一直以來，這些都是我珍藏的回憶、繼續走下去的力氣來源。',
shirt:'那件黑色襯衫，還留著那天的味道。（請換成相關回憶）',
drawer:'抽屜裡有一張小紙條：「謝謝你一直都在。」',
plush:'你找到我了！我是守護這個房間的小狗。',
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
function found(id,st){if(S.got[id])return;S.got[id]=1;hud();toast('NEW MEMORY FOUND!');if(st)setState(st)}

const LOCK={frame:['diary','先打開日記本吧。'],wardrobe:['frame','也許照片裡有線索……'],drawer:['shirt','抽屜鎖著，衣櫃裡也許有線索。'],plush:['drawer','抽屜裡好像有提示。'],speaker:[null,'再多找幾個回憶，音響才會有反應。']};
const locked=id=>{const l=LOCK[id];return l?(id==='speaker'?cnt()<4:!S.got[l[0]]):false};

function diaryLock(){const w=document.createElement('div');w.append(txt('日記本上了鎖。\n請輸入 4 位數密碼。'));
 const i=document.createElement('input');i.type='text';i.className='codein';i.maxLength=4;i.inputMode='numeric';i.placeholder='----';w.append(i);
 const go=()=>{if(digits(i.value)===CFG.diaryCode){S.diaryOK=true;$('#diary').classList.remove('lockd');toast('UNLOCKED!');H.diary()}else{toast('密碼錯誤');i.value='';i.focus()}};
 i.onkeydown=e=>{if(e.key==='Enter')go()};
 dlg('LOCKED DIARY',w,[{t:'UNLOCK',f:go},{t:'CLOSE',f:closeDlg}]);setTimeout(()=>i.focus(),60)}

const H={
window(){toast('窗外的天氣，很適合過生日。')},
diary(){if(!S.diaryOK)return diaryLock();
 found('diary','diary-found');let p=0;const n=CFG.diary.length;
 const show=()=>dlg(`DIARY ${p+1}/${n}`,txt(CFG.diary[p]),[...(p?[{t:'◀ PREV',f:()=>{p--;show()}}]:[]),p<n-1?{t:'NEXT ▶',f:()=>{p++;show()}}:{t:'CLOSE',f:closeDlg}]);
 memDone();show()},
frame(){found('frame','photo-found');
 const photo = "photo.png";
 const w=document.createElement('div');
 const im=new Image();
 im.className='photo';
 im.alt='memory';
 im.style.cssText='width:100%;max-height:60vh;object-fit:contain;display:block;margin:0 auto 10px;border:3px solid #fff;image-rendering:auto';
 im.onerror=()=>{const p=document.createElement('div');p.className='ph';p.textContent='[ 照片載入失敗 ]\n請確認 '+CFG.photo+' 的檔名或網址';im.replaceWith(p)};
 im.src=CFG.photo;
 w.append(im);
 if(CFG.frame)w.append(txt(CFG.frame));
 if(CFG.embed){const f=document.createElement('iframe');f.src=CFG.embed;f.allowFullscreen=true;f.style.cssText='width:100%;height:240px;border:3px solid #fff;margin-top:10px';w.append(f)}
 if(CFG.link){const k=document.createElement('a');k.href=CFG.link;k.target='_blank';k.rel='noopener';k.className='btn';k.textContent=CFG.linkText;k.style.cssText='display:inline-block;margin-top:10px;text-decoration:none';w.append(k)}
 dlg('MEMORY: PHOTO',w);memDone()},
wardrobe(){$('#wardrobe').classList.add('open');found('shirt','shirt-found');memDone();
 setTimeout(()=>dlg('NEW ITEM FOUND: Black Shirt',txt(CFG.shirt)),1600)},
drawer(){$('#drawer').classList.add('open');found('drawer');memDone();
 setTimeout(()=>dlg('DRAWER',txt(CFG.drawer)),1000)},
plush(){const p=$('#plush');p.classList.add('shake');setTimeout(()=>p.classList.remove('shake'),650);found('plush');memDone();
 setTimeout(()=>dlg('你找到我了！',txt(CFG.plush)),500)},
speaker(){const s=$('#speaker');
 try{if(!A.love)A.love=mk(CFG.music,true);
  if(S.mode==='bgm'){S.mode='love';if(A.bgm){A.bgm.pause();A.bgm.currentTime=0}}
  if(S.playing){A.love&&A.love.pause();S.playing=false;s.classList.remove('on');toast('MUSIC OFF')}
  else{playA(A.love);S.playing=true;s.classList.add('on');toast('NOW PLAYING\n'+CFG.speaker)}}
 catch(e){toast('NOW PLAYING\n'+CFG.speaker)}
 if(!S.got.speaker){found('speaker');setTimeout(chk,1400)}},
bed(){const b=$('#bed');b.classList.add('lift');setTimeout(()=>b.classList.remove('lift'),1000);
 setTimeout(()=>dlg('NOTE',txt(CFG.bedNote)),600)},
rug(){toast('嗯？好像沒有什麼……')},
clock(){toast('時鐘停在 10:05')},
cake(){const c=$('#cake');if(c.classList.contains('out'))return finalCard();
 c.classList.add('out');$('#stage').classList.add('dim');setState('final');toast('HAPPY BIRTHDAY');setTimeout(finalCard,1800)}};
function finalCard(){const w=document.createElement('div');w.append(txt('QUEST COMPLETE\nYou found every birthday memory.\n\n'),txt(CFG.final));
 dlg('HAPPY BIRTHDAY!',w,[{t:'↻ RESTART',f:()=>location.reload()},{t:'CLOSE',f:closeDlg}])}
function complete(){setState('memories-complete');
 dlg('ALL MEMORIES FOUND.',txt('QUEST COMPLETE.'),[{t:'▶ CONTINUE',f:()=>{closeDlg();$('#stage').classList.add('bright');$('#cake').hidden=false;toast('點擊蛋糕，吹熄蠟燭吧');if(!S.playing)H.speaker()}}])}

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
const HINT={diary:'▶ 日記本上了鎖……',frame:'▶ 這張照片……',wardrobe:'▶ 裡面好像藏著什麼。',drawer:'▶ 抽屜……',plush:'▶ 咦，它在動？',speaker:'▶ 播放音樂',window:'▶ [OPEN] 拉開窗簾',cake:'▶ 吹熄蠟燭',clock:'▶ 看看時間',bed:'▶ 毯子底下好像有東西'};
$$('.obj').forEach(o=>o.dataset.hint=HINT[o.dataset.id]||'▶ 查看');
$('#stage').addEventListener('mouseover',e=>{const o=e.target.closest('.obj'),h=$('#hint');if(o){h.textContent=o.dataset.hint;h.style.display='block';o.classList.toggle('locked',S.open&&locked(o.dataset.id))}else h.style.display='none'});
$('#stage').addEventListener('mouseleave',()=>$('#hint').style.display='none');

function fit(){$('#stage').style.transform=`scale(${Math.min(innerWidth/640,innerHeight/360)})`}
function tick(){const d=new Date();$('#ss').style.transform=`rotate(${d.getSeconds()*6}deg)`;$('#mm').style.transform='rotate(30deg)';$('#hh').style.transform='rotate(302.5deg)'}
function boot(){let p=0;const L={30:'> Detecting player...',60:'> Loading room...',90:'> Preparing birthday quest...'};
 const t=setInterval(()=>{p+=2;const n=Math.floor(p/10);$('#bar').textContent=`[${'█'.repeat(n)}${'░'.repeat(10-n)}] ${p}%`;
  if(L[p])$('#log').textContent+=L[p]+'\n';
  if(p>=100){clearInterval(t);$('#ok').hidden=false;setTimeout(showPw,1000)}},70)}
try{fit();addEventListener('resize',fit);tick();setInterval(tick,1000);hud()}catch(e){console.error(e)}
try{boot()}catch(e){console.error(e);showPw()}
setTimeout(showPw,9000);
