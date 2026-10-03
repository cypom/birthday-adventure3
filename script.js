function complete(){setState('memories-complete');
 dlg('ALL MEMORIES FOUND.',txt('QUEST COMPLETE.'),[{t:'▶ CONTINUE',f:()=>{closeDlg();$('#stage').classList.add('bright');$('#cake').hidden=false;toast('點擊蛋糕，吹熄蠟燭吧');if(!S.playing)H.speaker()}}])}

/* ---- 窗簾 ---- */
function openCurtain(){if(S.open)return;S.open=true;$('#stage').classList.add('open');$('#openBtn').hidden=true;document.body.classList.add('play');
 setState('room');hud();setTimeout(()=>toast('QUEST STARTED\nFind all the birthday memories.'),1800)}
function toCurtain(){$('#boot').classList.add('gone');setState('curtain');$('#openBtn').hidden=false}

/* ---- 開場密碼 ---- */
function showPw(){if(S.state!=='identity-check')return;setState('password');
 const ok=$('#ok');if(ok)ok.hidden=false;$('#pw').hidden=false;try{$('#pwIn').focus()}catch(e){}}
function checkPw(){if(S.state!=='password')return;
 if(digits($('#pwIn').value)===CFG.pass){$('#pwMsg').style.color='#7dff9b';$('#pwMsg').textContent='ACCESS GRANTED';startBgm();setTimeout(toCurtain,500)}
 else{$('#pwMsg').style.color='#ff6b6b';$('#pwMsg').textContent='ACCESS DENIED';const b=$('#boot .box');b.classList.remove('bad');void b.offsetWidth;b.classList.add('bad');$('#pwIn').value='';$('#pwIn').focus()}}
$('#pwBtn').addEventListener('click',checkPw);
$('#pwIn').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();checkPw()}});

/* ---- 房間點擊 / Hover ---- */
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

/* ---- 縮放 / 時鐘 / 開機 ---- */
function fit(){$('#stage').style.transform=`scale(${Math.min(innerWidth/640,innerHeight/360)})`}
function tick(){const d=new Date();$('#ss').style.transform=`rotate(${d.getSeconds()*6}deg)`;$('#mm').style.transform='rotate(30deg)';$('#hh').style.transform='rotate(302.5deg)'}
function boot(){let p=0;const L={30:'> Detecting player...',60:'> Loading room...',90:'> Preparing birthday quest...'};
 const t=setInterval(()=>{p+=2;const n=Math.floor(p/10);$('#bar').textContent=`[${'█'.repeat(n)}${'░'.repeat(10-n)}] ${p}%`;
  if(L[p])$('#log').textContent+=L[p]+'\n';
  if(p>=100){clearInterval(t);$('#ok').hidden=false;setTimeout(showPw,1000)}},70)}
try{fit();addEventListener('resize',fit);tick();setInterval(tick,1000);hud()}catch(e){console.error(e)}
try{boot()}catch(e){console.error(e);showPw()}
setTimeout(showPw,9000);
