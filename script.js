/* ---------- EDIT THESE ---------- */
const SECRET_CODE = "011005";           // change to your own secret code
const BIRTHDAY_DATE = "01 • 10 • 2005"; // change to the real date

// One entry per photo/page. Paste a data:image/...;base64,... string into "img"
// (convert a photo at a site like base64.guru, or ask Claude to convert one for you).
// Leave "img" empty to show a placeholder emoji instead.
const PHOTOS = [
   { img: "Nyhed10.jpg", caption: "Little Baby Nihad 🍼" },
  { img: "Nyhed11.jpg", caption: "Mini Nyhed✨" },
  { img: "Nyhed5.jpg", caption: "IT & Zviti🍲" },
  { img: "Nyhed16.jpg", caption: "Nyhed f Netexpo" },
  { img: "Nyhed7.jpg", caption: "Nyhed m3a chef li jamais chaf💻" },
  { img: "Nyhed14.jpg", caption: "ki 9rib mat l IT Manager🗡️" },
  { img: "Nyhed8.jpg", caption: "🤙🏻🤙🏻🤙🏻🤙🏻🤙🏻" }, // new
  { img: "Nyhed12.jpg", caption: "Nihad, the graduate 🎓" }, // new
  
];


const LETTER = `Dear Nyhed,

I don't know if words can really describe how special you are, but I wanted to make something you could keep as a little memory.

Thank you for all the laughs, the random conversations, and every moment that made life a little more fun.

I hope this new year brings you happiness, success, and everything you're wishing for.

You deserve an amazing year. ✨`;
/* --------------------------------- */

function go(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// floating hearts on screen 1
const heartsBox = document.querySelector('.hearts');
for(let i=0;i<10;i++){
  const h = document.createElement('span');
  h.textContent = ['🩷','🥳','✨','🤙🏻'][i%3];
  h.style.left = Math.random()*100+'%';
  h.style.animationDelay = (Math.random()*9)+'s';
  h.style.animationDuration = (7+Math.random()*5)+'s';
  heartsBox.appendChild(h);
}



// background music
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');
bgMusic.volume = 0.5;
function playMusic(){
  bgMusic.play().then(()=>{ musicBtn.textContent = '🎵'; }).catch(()=>{ musicBtn.textContent = '🔇'; });
}
musicBtn.addEventListener('click', ()=>{
  if(bgMusic.paused){ playMusic(); } else { bgMusic.pause(); musicBtn.textContent = '🔇'; }
});

// SCREEN 1 -> 2
document.getElementById('pwForm').addEventListener('submit', e=>{
  e.preventDefault();
  const val = document.getElementById('pw').value.trim();
  if(val === SECRET_CODE){
    go('gift-screen');
    document.getElementById('dateReveal').textContent = BIRTHDAY_DATE;
    setTimeout(()=>document.getElementById('dateReveal').classList.add('show'), 300);
  } else {
    const form = document.getElementById('pwForm');
    form.classList.add('shake');
    setTimeout(()=>form.classList.remove('shake'), 400);
  }
});

// SCREEN 2: gift box
document.getElementById('giftBox').addEventListener('click', openGift);
document.getElementById('giftBox').addEventListener('keypress', e=>{ if(e.key==='Enter') openGift(); });
function openGift(){
  const box = document.getElementById('giftBox');
  if(box.classList.contains('opened')) return;
  box.classList.add('opened');
  document.getElementById('giftHint').style.display='none';
  confettiBurst(60);
  setTimeout(()=>{
    document.getElementById('gift-msg').classList.add('show');
    document.getElementById('toCake').style.display='inline-block';
  }, 500);
}
document.getElementById('toCake').addEventListener('click', ()=>go('cake-screen'));

// SCREEN 3: candles
let litCount = 3;
document.querySelectorAll('.candle').forEach(c=>{
  c.addEventListener('click', ()=>{
    if(c.classList.contains('out')) return;
    c.classList.add('out');
    litCount--;
    if(litCount===0){
      confettiBurst(90);
      document.getElementById('cake-msg').classList.add('show');
      document.getElementById('toLetter').style.display='inline-block';
    }
  });
});
document.getElementById('toLetter').addEventListener('click', ()=>{ go('memory-screen'); showMemory(0); });

// SCREEN 3.5: photo memories
let memIndex = 0;
function showMemory(i){
  memIndex = Math.max(0, Math.min(PHOTOS.length-1, i));
  const m = PHOTOS[memIndex];
  document.getElementById('memCounter').textContent = (memIndex+1)+' / '+PHOTOS.length;
  document.getElementById('memCaption').textContent = m.caption;
  const pic = document.getElementById('memPic');
  pic.innerHTML = m.img ? '<img src="'+m.img+'" alt="'+m.caption+'">' : '📸';
  document.getElementById('memPrev').style.visibility = memIndex===0 ? 'hidden' : 'visible';
  document.getElementById('memNext').textContent = memIndex===PHOTOS.length-1 ? "You've found them all →" : 'Next →';
}
document.getElementById('memPrev').addEventListener('click', ()=>showMemory(memIndex-1));
document.getElementById('memNext').addEventListener('click', ()=>{
  if(memIndex===PHOTOS.length-1){ go('letter-screen'); typeLetter(); }
  else showMemory(memIndex+1);
});

// SCREEN 4: typewriter letter
let typed = false;
function typeLetter(){
  if(typed) return; typed = true;
  const el = document.getElementById('letterText');
  let i = 0;
  const speed = 18;
  (function tick(){
    if(i <= LETTER.length){
      el.textContent = LETTER.slice(0,i);
      i++;
      setTimeout(tick, speed);
    } else {
      document.getElementById('cursor').style.display='none';
      document.getElementById('continueBtn').classList.add('show');
    }
  })();
}
document.getElementById('continueBtn').addEventListener('click', ()=>{
  go('final-screen');
  buildStars();
  setTimeout(()=>document.getElementById('oneLastThing').style.opacity=1, 200);
  setTimeout(()=>document.getElementById('clickme').classList.add('show'), 1800);
});

// SCREEN 5: finale
document.getElementById('clickme').addEventListener('click', ()=>{
  document.getElementById('pre-final').style.display='none';
  document.getElementById('finalMsg').classList.add('show');
  document.getElementById('finalDate').textContent = BIRTHDAY_DATE + ' — Forever worth celebrating.';
  confettiBurst(140);
  floatPics();
});
function floatPics(){
  const box = document.getElementById('floatingPics');
  PHOTOS.forEach((m,i)=>{
    const el = document.createElement('div');
    el.className = 'float-pic';
    el.style.left = (10 + Math.random()*70) + '%';
    el.style.top = (10 + Math.random()*60) + '%';
    el.style.setProperty('--r', (Math.random()*16-8)+'deg');
    el.style.animationDelay = (i*0.4) + 's';
    el.innerHTML = '<div class="pic">'+(m.img ? '<img src="'+m.img+'" alt="'+m.caption+'">' : '📸')+'</div>';
    box.appendChild(el);
  });
}
function buildStars(){
  const field = document.getElementById('starfield');
  if(field.childElementCount) return;
  for(let i=0;i<40;i++){
    const s = document.createElement('span');
    s.className='star'; s.textContent='✦';
    s.style.left = Math.random()*100+'%';
    s.style.top = Math.random()*100+'%';
    s.style.fontSize = (0.5+Math.random()*1.2)+'rem';
    s.style.animationDelay = (Math.random()*2)+'s';
    field.appendChild(s);
  }
}

// confetti
function confettiBurst(n){
  const colors = ['#ff8fc0','#c9a6ff','#ffd166','#ffffff','#ff5da2'];
  for(let i=0;i<n;i++){
    const p = document.createElement('div');
    p.className='confetti-piece';
    p.textContent = ['🎉','🤙🏻','✨','🩷','🥳','🎊'][Math.floor(Math.random()*4)];
    p.style.left = Math.random()*100+'vw';
    p.style.fontSize = (0.8+Math.random()*1.1)+'rem';
    p.style.animationDuration = (2.2+Math.random()*1.8)+'s';
    p.style.color = colors[Math.floor(Math.random()*colors.length)];
    document.body.appendChild(p);
    setTimeout(()=>p.remove(), 4200);
  }
}
