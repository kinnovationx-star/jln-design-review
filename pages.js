(function(){
/* お問い合わせのデモ：入力 → 確認 → 戻る（入力は残す）→ 完了（thanks.html）。送信・保存はしない */
var form=document.getElementById('l-form');if(!form)return;
var conf=document.getElementById('l-cf'),list=document.getElementById('l-cf-list'),err=document.getElementById('l-err');
var rec=form.querySelector('[data-recruit]'),interest=form.querySelector('[data-interest]');
if(/type=recruit/.test(location.search)&&rec)rec.checked=true;
function sync(){if(interest&&rec){interest.hidden=rec.checked}}
[].forEach.call(form.querySelectorAll('input[type=radio]'),function(x){x.addEventListener('change',sync)});sync();
function bad(box){if(box.hidden)return false;var els=box.querySelectorAll('input,textarea');if(!els.length)return false;var f=els[0];
 if(f.type==='radio'||f.type==='checkbox'){if(!box.hasAttribute('data-req'))return false;return !box.querySelector('input:checked')}
 return f.required&&!f.value.trim()}
function mark(box,b){box.classList.toggle('invalid',b);var m=box.querySelector('.f-err');if(m)m.hidden=!b;[].forEach.call(box.querySelectorAll('input,textarea'),function(x){if(b)x.setAttribute('aria-invalid','true');else x.removeAttribute('aria-invalid')})}
[].forEach.call(form.querySelectorAll('.l-fld'),function(box){box.addEventListener('change',function(){if(box.classList.contains('invalid'))mark(box,bad(box))});box.addEventListener('input',function(){if(box.classList.contains('invalid'))mark(box,bad(box))})});
form.addEventListener('submit',function(ev){ev.preventDefault();var first=null;
 [].forEach.call(form.querySelectorAll('.l-fld'),function(box){var b=bad(box);mark(box,b);if(b&&!first)first=box});
 err.hidden=!first;
 if(first){err.focus();return}
 list.textContent='';
 [].forEach.call(form.querySelectorAll('.l-fld'),function(box){if(box.hidden||box.classList.contains('agree-box'))return;var lab=box.querySelector('[data-name]');var name=lab?lab.getAttribute('data-name'):'';
  var els=box.querySelectorAll('input,textarea'),v;if(els[0].type==='radio'||els[0].type==='checkbox'){v=[].filter.call(els,function(x){return x.checked}).map(function(x){return x.value}).join('、')}else{v=els[0].value}
  var d=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=name;dd.textContent=v||'（未入力）';d.appendChild(dt);d.appendChild(dd);list.appendChild(d)});
 form.hidden=true;conf.hidden=false;var h=conf.querySelector('h2');h.focus();scrollTo(0,conf.getBoundingClientRect().top+scrollY-120)});
document.getElementById('l-cf-back').addEventListener('click',function(){conf.hidden=true;form.hidden=false;var f=form.querySelector('input,textarea');f.focus();scrollTo(0,form.getBoundingClientRect().top+scrollY-120)});
})();