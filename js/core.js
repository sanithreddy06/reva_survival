/* REVA Survival Toolkit — shared core */
const $ = (sel) => document.querySelector(sel);

const ROTATING_MSGS = [
  'Detected zero preparation.',
  'Faculty approaching.',
  'Operating on caffeine and luck.',
  'Assignment copied successfully.',
  'Syllabus? Never heard of her.',
  'Last-minute supremacy activated.',
  'Your CGPA is sending distress signals.',
  'Proxy network status: questionable.',
  'Sleep is a social construct.',
  'Unit 3 remains unread. Classic.',
];

const LOADING_MSGS = [
  'Injecting caffeine drivers...',
  'Loading last-minute coping mechanisms...',
  'Bypassing syllabus firewall...',
  'Syncing with WhatsApp study groups...',
  'Downloading false confidence...',
  'Initializing academic denial...',
];

const PANIC_MSGS = [
  'WHY ARE YOU OPENING THIS NOW?',
  'Sleep is no longer an option.',
  'Unit 3 is your only hope.',
  'You had ONE semester.',
  'The exam does not care about your vibes.',
  'Stack Overflow cannot save you now.',
];

const PANIC_INSULTS = [
  'Motivation level: wet sock.',
  'You studied less than the syllabus weightage.',
  'Even ChatGPT is concerned.',
  'Your future self hates you.',
  'Bro really thought Netflix was the move.',
];

const HACK_LINES = [
  '[*] Connecting to REVA mainframe...',
  '[*] Bypassing attendance firewall...',
  '[+] Access granted (jk it\'s fake)',
  '[*] Downloading syllabus... FAILED',
  '[!] ALERT: Your IP has been flagged by HOD',
  '[!] Connection terminated. Nice try.',
];

let audioCtx;
let panicInterval, panicMsgInterval, insultInterval, studyTimerInterval;
let studySeconds = 0;

function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function isSoundEnabled() {
  const el = $('#sound-enabled');
  if (el) return el.checked;
  return localStorage.getItem('reva-sound') !== 'false';
}

function playBeep(freq = 440, duration = 0.1, type = 'square') {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = type;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (_) {}
}

function playSiren() {
  if (!isSoundEnabled()) return;
  for (let i = 0; i < 6; i++) setTimeout(() => playBeep(i % 2 ? 600 : 400, 0.15), i * 200);
}

function playAlert() {
  playBeep(880, 0.08);
  setTimeout(() => playBeep(660, 0.08), 100);
}

function initMatrix() {
  const canvas = $('#matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, drops;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    drops = Array(Math.floor(w / 14)).fill(1);
  }
  const chars = 'アイウエオ01REVAハヒフヘホ';
  function draw() {
    ctx.fillStyle = 'rgba(5, 5, 8, 0.05)';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#00f5ff';
    ctx.font = '14px Share Tech Mono';
    for (let i = 0; i < drops.length; i++) {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 14, drops[i] * 14);
      if (drops[i] * 14 > h && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 50);
}

function initParticles() {
  const container = $('#particles');
  if (!container) return;
  const isMobile = document.body.classList.contains('is-mobile');
  const count = isMobile ? 12 : 35;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.animationDelay = `${Math.random() * 8}s`;
    if (Math.random() > 0.5) {
      p.style.background = 'var(--purple)';
      p.style.boxShadow = 'var(--glow-purple)';
    }
    container.appendChild(p);
  }
}

function initLiveStatus() {
  const panicEl = $('#panic-count');
  const stabilityEl = $('#stability');
  const threatEl = $('#threat-level');
  const levels = ['DEFCON 5', 'DEFCON 4', 'DEFCON 3', 'DEFCON 2', 'DEFCON 1'];
  setInterval(() => {
    if (panicEl) panicEl.textContent = 800 + Math.floor(Math.random() * 200);
    if (stabilityEl) stabilityEl.textContent = `${5 + Math.floor(Math.random() * 20)}%`;
    if (threatEl) threatEl.textContent = levels[Math.min(4, Math.floor(Math.random() * 3) + 1)];
  }, 3000);
}

function initRotatingMsg() {
  const el = $('#rotating-msg');
  if (!el) return;
  el.style.transition = 'opacity 0.3s';
  let idx = 0;
  setInterval(() => {
    el.style.opacity = 0;
    setTimeout(() => {
      idx = (idx + 1) % ROTATING_MSGS.length;
      el.textContent = ROTATING_MSGS[idx];
      el.style.opacity = 1;
    }, 300);
  }, 4000);
}

function initBootBar() {
  const bar = $('#boot-bar');
  const text = $('#loading-text');
  if (!bar) return;
  let progress = 0;
  let msgIdx = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      if (text) text.textContent = 'System ready. Good luck (you need it).';
    }
    bar.style.width = `${progress}%`;
    if (text && Math.random() > 0.7) {
      text.textContent = LOADING_MSGS[msgIdx++ % LOADING_MSGS.length];
    }
  }, 400);
}

function initSessionId() {
  const el = $('#session-id');
  if (el) el.textContent = `REVA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function initRandomGlitch() {
  setInterval(() => {
    if (Math.random() > 0.97) {
      document.body.classList.add('glitch-active');
      setTimeout(() => document.body.classList.remove('glitch-active'), 200);
    }
  }, 5000);
}

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIdx = 0;

function initKonami() {
  document.addEventListener('keydown', (e) => {
    if (e.key === KONAMI[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === KONAMI.length) {
        konamiIdx = 0;
        document.body.classList.add('glitch-active');
        setTimeout(() => document.body.classList.remove('glitch-active'), 3000);
        playSiren();
        alert('GOD MODE UNLOCKED\n\nJust kidding. Go study.');
      }
    } else konamiIdx = 0;
  });
}

function termPrint(text) {
  const out = $('#terminal-output');
  if (!out) return;
  const line = document.createElement('div');
  line.textContent = text;
  out.appendChild(line);
  out.scrollTop = out.scrollHeight;
}

function openTerminal() {
  $('#terminal-overlay')?.classList.remove('hidden');
  const out = $('#terminal-output');
  if (out) out.innerHTML = '';
  termPrint('REVA Survival Toolkit Terminal v0.69');
  termPrint('Type "help" for commands.');
  $('#terminal-input')?.focus();
}

function closeTerminal() {
  $('#terminal-overlay')?.classList.add('hidden');
}

function getAttendanceStatus(pct) {
  if (pct >= 95) return 'Bro go home — attendance too high.';
  if (pct >= 85) return "Teacher's pet detected.";
  if (pct >= 75) return 'Operational.';
  if (pct >= 69) return 'Nice. But dangerous.';
  if (pct >= 60) return 'Academic instability detected.';
  if (pct >= 50) return 'Proceed with extreme caution.';
  return 'You are being hunted.';
}

function activatePanic() {
  const overlay = $('#panic-overlay');
  if (!overlay) {
    window.location.href = 'panic.html?auto=1';
    return;
  }
  overlay.classList.remove('hidden');
  document.body.classList.add('panic-active');
  playSiren();
  let hours = 23, mins = 59, secs = 59;
  const countdownEl = $('#panic-countdown');
  panicInterval = setInterval(() => {
    secs--;
    if (secs < 0) { secs = 59; mins--; }
    if (mins < 0) { mins = 59; hours--; }
    if (hours < 0) hours = 0;
    if (countdownEl) {
      countdownEl.textContent = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  }, 1000);
  const rotatePanic = () => { if ($('#panic-message')) $('#panic-message').textContent = PANIC_MSGS[Math.floor(Math.random() * PANIC_MSGS.length)]; };
  rotatePanic();
  panicMsgInterval = setInterval(rotatePanic, 4000);
  const rotateInsult = () => { if ($('#panic-insult')) $('#panic-insult').textContent = PANIC_INSULTS[Math.floor(Math.random() * PANIC_INSULTS.length)]; };
  rotateInsult();
  insultInterval = setInterval(rotateInsult, 5000);
}

function deactivatePanic() {
  $('#panic-overlay')?.classList.add('hidden');
  document.body.classList.remove('panic-active');
  clearInterval(panicInterval);
  clearInterval(panicMsgInterval);
  clearInterval(insultInterval);
}

function startStudyTimer() {
  clearInterval(studyTimerInterval);
  studySeconds = 0;
  studyTimerInterval = setInterval(() => {
    studySeconds++;
    const h = Math.floor(studySeconds / 3600);
    const m = Math.floor((studySeconds % 3600) / 60);
    const s = studySeconds % 60;
    const el = $('#study-timer');
    if (el) el.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    if (studySeconds % 60 === 0) playBeep(523, 0.05);
  }, 1000);
}

function stopStudyTimer() {
  clearInterval(studyTimerInterval);
}

function showHackScreen() {
  const overlay = $('#hack-overlay');
  const pre = $('#hack-text');
  if (!overlay || !pre) return;
  overlay.classList.remove('hidden');
  pre.textContent = '';
  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < HACK_LINES.length) {
      pre.textContent += HACK_LINES[i] + '\n';
      playBeep(300 + i * 50, 0.05);
      i++;
    } else {
      clearInterval(typeInterval);
      setTimeout(() => overlay.classList.add('hidden'), 2000);
    }
  }, 300);
}

function handleTerminalCommand(cmd) {
  const parts = cmd.trim().toLowerCase().split(/\s+/);
  const command = parts[0];
  const cmds = {
    help: () => 'Commands: help, status, panic, hack, clear, whoami, exit, fortune, attendance 45 60',
    status: () => `SYSTEM: UNSTABLE | PANICKING: ${800 + Math.floor(Math.random() * 200)}`,
    panic: () => { activatePanic(); return 'PANIC MODE ACTIVATED.'; },
    hack: () => { showHackScreen(); return 'Fake hack running...'; },
    clear: () => { $('#terminal-output').innerHTML = ''; return ''; },
    whoami: () => 'academically_endangered_student@reva',
    exit: () => { closeTerminal(); return 'Bye.'; },
    fortune: () => 'A surprise test is in your future.',
  };
  if (command === 'attendance' && parts.length >= 3) {
    const pct = Math.round((parseInt(parts[1], 10) / parseInt(parts[2], 10)) * 100);
    return `Attendance: ${pct}% — ${getAttendanceStatus(pct)}`;
  }
  if (cmds[command]) return cmds[command]();
  return `Unknown: ${command}. Type help.`;
}

function initTerminal() {
  document.addEventListener('keydown', (e) => {
    if (e.key === '`') {
      e.preventDefault();
      const term = $('#terminal-overlay');
      if (!term) return;
      term.classList.contains('hidden') ? openTerminal() : closeTerminal();
    }
    if (e.ctrlKey && e.shiftKey && e.key === 'H') {
      e.preventDefault();
      showHackScreen();
    }
  });
  $('#term-close')?.addEventListener('click', closeTerminal);
  $('#terminal-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const input = e.target;
      termPrint(`root@reva:~$ ${input.value}`);
      const result = handleTerminalCommand(input.value);
      if (result) termPrint(result);
      input.value = '';
    }
  });
}

function initPanicUI() {
  $('#exam-panic-btn')?.addEventListener('click', activatePanic);
  $('#exit-panic')?.addEventListener('click', deactivatePanic);
  $('#start-study-timer')?.addEventListener('click', startStudyTimer);
  $('#stop-study-timer')?.addEventListener('click', stopStudyTimer);
  const soundEl = $('#sound-enabled');
  if (soundEl) {
    soundEl.checked = localStorage.getItem('reva-sound') !== 'false';
    soundEl.addEventListener('change', (e) => {
      localStorage.setItem('reva-sound', e.target.checked ? 'true' : 'false');
    });
  }
  const params = new URLSearchParams(window.location.search);
  if (params.get('auto') === '1') setTimeout(activatePanic, 500);
}

const OVERLAY_HTML = `
<div id="terminal-overlay" class="terminal-overlay hidden" role="dialog" aria-label="Terminal">
  <div class="terminal-window">
    <div class="terminal-header">
      <span class="term-dot red"></span><span class="term-dot yellow"></span><span class="term-dot green"></span>
      <span>reva_survival@root</span>
      <button class="term-close" id="term-close" aria-label="Close">×</button>
    </div>
    <div id="terminal-output" class="terminal-body"></div>
    <div class="terminal-input-line">
      <span class="prompt">root@reva:~$</span>
      <input type="text" id="terminal-input" autocomplete="off" spellcheck="false" />
    </div>
  </div>
</div>
<div id="hack-overlay" class="hack-overlay hidden"><div class="hack-content"><pre id="hack-text"></pre></div></div>
<div id="panic-overlay" class="panic-overlay hidden">
  <div class="panic-content">
    <h2 class="panic-title glitch" data-text="EMERGENCY PROTOCOL">EMERGENCY PROTOCOL</h2>
    <p id="panic-message" class="panic-msg">WHY ARE YOU OPENING THIS NOW?</p>
    <div class="countdown-display" id="panic-countdown">23:59:59</div>
    <div class="panic-timer-section">
      <label>Emergency Study Timer</label>
      <div class="study-timer" id="study-timer">00:00:00</div>
      <button class="btn-neon btn-small" id="start-study-timer">START CRAM</button>
      <button class="btn-neon btn-small btn-red" id="stop-study-timer">ABORT</button>
    </div>
    <p id="panic-insult" class="panic-insult"></p>
    <p class="fake-ai">[FAKE AI]: Unit 3 is your only hope.</p>
    <button class="btn-neon btn-large" id="exit-panic">I ACCEPT MY FATE</button>
  </div>
</div>`;

function ensureOverlays() {
  if (!$('#terminal-overlay')) {
    document.body.insertAdjacentHTML('beforeend', OVERLAY_HTML);
  }
}

function initMobileOptimizations() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches
    || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  if (isMobile) document.body.classList.add('is-mobile');
}

function enforceHttps() {
  const host = location.hostname;
  if (location.protocol === 'http:' && (host.endsWith('saisanithreddy.online') || host.endsWith('github.io'))) {
    location.replace(`https://${host}${location.pathname}${location.search}${location.hash}`);
  }
}

function initCore() {
  enforceHttps();
  ensureOverlays();
  initMobileOptimizations();
  initMatrix();
  initParticles();

  document.querySelectorAll('button, .module-card, .nav-home').forEach((el) => {
    el.style.touchAction = 'manipulation';
  });
  initSessionId();
  initTerminal();
  initKonami();
  initRandomGlitch();
  injectIcons();
  if ($('#panic-count')) initLiveStatus();
  if ($('#rotating-msg')) initRotatingMsg();
  if ($('#boot-bar')) initBootBar();
  initPanicUI();
}

window.REVA = { playAlert, playSiren, playBeep, getAttendanceStatus, activatePanic, deactivatePanic };

document.addEventListener('DOMContentLoaded', initCore);
