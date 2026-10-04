(function(){try{
 var WISH_URL='https://script.google.com/macros/s/AKfycbxLmCo0z_ZBmouoFdDA8AOx5tmbg3WUPd6JRiM5ouBPyaWJvM3kCQ0EyqapSqW-2655/exec';
 if(typeof H==='undefined'||typeof dlg!=='function')return;
 var sent=false;
 function blow(){
  var c=$('#cake');c.classList.add('out');
  $('#stage').classList.add('dim');
  setState('final');toast('HAPPY BIRTHDAY');
  setTimeout(finalCard,1800);
 }
 function ask(){
  var w=document.createElement('div');
  w.append(txt('吹蠟燭之前當然要先許願，或寫下想說的話吧！\n生日快樂！'));
  var t=document.createElement('textarea');
  t.maxLength=500;t.rows=5;t.placeholder='在這裡輸入……';
  t.style.cssText='display:block;width:100%;margin-top:12px;padding:10px;font:15px/1.7 "Noto Sans TC",sans-serif;background:#000;color:#7dff9b;border:3px solid #fff;resize:vertical';
  var msg=document.createElement('div');
  msg.style.cssText='color:#ff6b6b;margin-top:8px;min-height:22px';
  w.append(t,msg);
  var busy=false,skipAdded=false;
  function addSkip(){
   if(skipAdded)return;skipAdded=true;
   var k=document.createElement('button');
   k.type='button';k.className='btn';k.textContent='略過';
   k.onclick=function(){closeDlg();blow()};
   $('#dbtn').append(k);
  }
  function go(){
   if(busy)return;
   var v=t.value.trim();
   if(!v){msg.style.color='#ff6b6b';msg.textContent='請先輸入內容。';t.focus();return}
   if(WISH_URL.indexOf('https://')!==0){closeDlg();blow();return}
   busy=true;msg.style.color='#ffe066';msg.textContent='送出中……';
   fetch(WISH_URL,{method:'POST',mode:'no-cors',body:JSON.stringify({text:v})})
    .then(function(){sent=true;closeDlg();blow()})
    .catch(function(){
     busy=false;msg.style.color='#ff6b6b';
     msg.textContent='送出失敗，請檢查網路後再按一次確認。';
     addSkip();
    });
  }
  dlg('WISH',w,[{t:'確認',f:go}]);
  setTimeout(function(){t.focus()},80);
 }
 H.cake=function(){
  var c=$('#cake');
  if(c.classList.contains('out'))return finalCard();
  if(sent)return blow();
  ask();
 };
}catch(e){console.error(e)}})();
