// custom cursor
document.addEventListener('mousemove', e => {
  document.documentElement.style.setProperty('--mx', e.clientX + 'px');
  document.documentElement.style.setProperty('--my', e.clientY + 'px');
});

// nav scroll + parallax
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax);
    el.style.transform = `translateY(${window.scrollY * speed}px)`;
  });
});

// burger menu
const burger = document.querySelector('.burger');
const links = document.querySelector('.links');
burger?.addEventListener('click', () => links.classList.toggle('open'));
links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ===== NATURE LEAVES ===== */
(function leaves() {
  const wrap = document.querySelector('.leaves');
  if (!wrap) return;
  const symbols = ['🍂', '🍃', '🌿'];
  const count = 14;
  for (let i = 0; i < count; i++) {
    const leaf = document.createElement('span');
    leaf.className = 'leaf';
    leaf.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.fontSize = (16 + Math.random() * 18) + 'px';
    leaf.style.animationDuration = (8 + Math.random() * 9) + 's';
    leaf.style.animationDelay = (-Math.random() * 12) + 's';
    leaf.style.opacity = (0.35 + Math.random() * 0.4).toFixed(2);
    wrap.appendChild(leaf);
  }
})();

/* ===== PERSISTENT MUSIC ACROSS PAGES ===== */
const music = document.getElementById('bgMusic');
const toggleBtn = document.getElementById('musicToggle');
const favSong = document.getElementById('favSong');
const statusEl = document.getElementById('musicStatus');

function updateMusicUI(playing) {
  toggleBtn?.classList.toggle('playing', playing);
  favSong?.classList.toggle('playing', playing);
  if (toggleBtn) toggleBtn.querySelector('span').textContent = playing ? 'STOP SONG' : 'MY FAV SONG';
  if (statusEl) statusEl.textContent = playing ? 'Playing… tap to stop' : 'Tap to play';
}

if (music) {
  // restore previous position & state
  const savedTime = parseFloat(localStorage.getItem('musicTime') || '0');
  const wasPlaying = localStorage.getItem('musicPlaying') === '1';
  music.addEventListener('loadedmetadata', () => {
    if (savedTime && savedTime < music.duration) music.currentTime = savedTime;
  });
  if (wasPlaying) {
    music.play().then(() => updateMusicUI(true)).catch(() => updateMusicUI(false));
  }

  // keep saving position
  music.addEventListener('timeupdate', () => {
    localStorage.setItem('musicTime', music.currentTime);
  });
  music.addEventListener('play', () => { localStorage.setItem('musicPlaying', '1'); updateMusicUI(true); });
  music.addEventListener('pause', () => { localStorage.setItem('musicPlaying', '0'); updateMusicUI(false); });

  function toggleMusic() {
    if (music.paused) music.play(); else music.pause();
  }
  toggleBtn?.addEventListener('click', toggleMusic);
  favSong?.addEventListener('click', toggleMusic); // click "My Fav Song" box to start/stop
  updateMusicUI(!music.paused && wasPlaying);
}

/* ===== LAST UPDATE ===== */
(function lastUpdate() {
  const el = document.getElementById('lastUpdate');
  if (!el) return;
  const d = new Date(document.lastModified);
  el.textContent = isNaN(d) ? new Date().toLocaleDateString() :
    d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
})();

/* ===== PAGE TRANSITION (saves music before leaving) ===== */
document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    if (music) {
      localStorage.setItem('musicTime', music.currentTime);
      localStorage.setItem('musicPlaying', music.paused ? '0' : '1');
    }
    e.preventDefault();
    document.body.style.transition = 'opacity .4s, filter .4s, transform .4s';
    document.body.style.opacity = '0';
    document.body.style.filter = 'blur(8px)';
    document.body.style.transform = 'translateY(-20px)';
    setTimeout(() => window.location.href = href, 400);
  });
});

