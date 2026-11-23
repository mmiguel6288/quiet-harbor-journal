/* Looping background music for the case app and the practice page.
   Starts on the first user gesture (autoplay rules). Default volume 0.25;
   ducks to 0.08 during TTS; pauses while the mic is listening; crossfades at the loop. */
(function (w) {
  const VOL = 0.25, DUCK = 0.08, FADE = 1.4, KEY = 'extrahour-bgm';
  const state = {
    wanted: true, gestured: false, ready: false,
    tts: false, mic: false,
    cur: 0, xfade: false, timer: 0, tracks: [], src: ''
  };

  function loadWanted() {
    try { const v = localStorage.getItem(KEY); if (v === '0') return false; if (v === '1') return true; } catch (e) {}
    return true;
  }
  function saveWanted() {
    try { localStorage.setItem(KEY, state.wanted ? '1' : '0'); } catch (e) {}
  }
  function pickSrc(base) {
    const a = document.createElement('audio');
    const ogg = a.canPlayType('audio/ogg; codecs=vorbis');
    if (ogg && ogg !== 'no') return base + 'audio/wintry-mansion.ogg';
    return base + 'audio/wintry-mansion.mp3';
  }
  function makeTrack(src) {
    const a = new Audio();
    a.preload = 'auto';
    a.loop = false;
    a.src = src;
    a.volume = 0;
    a.setAttribute('playsinline', '');
    a.setAttribute('aria-hidden', 'true');
    return a;
  }
  function cap() {
    if (!state.wanted) return 0;
    if (state.mic) return 0;
    if (state.tts) return DUCK;
    return VOL;
  }
  function setVol(a, v) { try { a.volume = Math.max(0, Math.min(1, v)); } catch (e) {} }
  function fadeTo(a, to, sec) {
    const from = a.volume, t0 = performance.now(), ms = Math.max(80, sec * 1000);
    return new Promise(res => {
      const step = now => {
        const k = Math.min(1, (now - t0) / ms);
        setVol(a, from + (to - from) * k);
        if (k < 1 && !a._cancelFade) requestAnimationFrame(step);
        else { setVol(a, to); res(); }
      };
      a._cancelFade = false;
      requestAnimationFrame(step);
    });
  }
  function remaining(a) {
    const d = a.duration;
    if (!d || !isFinite(d) || d < 2) return Infinity;
    return Math.max(0, d - a.currentTime);
  }
  function applyCap(sec) {
    const t = cap();
    state.tracks.forEach(a => {
      if (a._cancelFade !== undefined) a._cancelFade = true;
      if (sec) fadeTo(a, a.paused && t === 0 ? 0 : (a.paused ? a.volume : t), sec);
      else setVol(a, t);
    });
  }
  function tick() {
    if (!state.wanted || state.mic || !state.tracks.length) return;
    const a = state.tracks[state.cur];
    const b = state.tracks[1 - state.cur];
    const rem = remaining(a);
    if (!state.xfade && rem <= FADE) {
      state.xfade = true;
      const t = cap();
      try { b.currentTime = 0; } catch (e) {}
      setVol(b, 0);
      const p = b.play();
      if (p && p.catch) p.catch(() => {});
      fadeTo(a, 0, Math.min(FADE, rem || FADE));
      fadeTo(b, t, Math.min(FADE, rem || FADE));
      const ms = Math.max(200, Math.min(FADE, rem || FADE) * 1000);
      setTimeout(() => {
        try { a.pause(); a.currentTime = 0; } catch (e) {}
        setVol(a, 0);
        state.cur = 1 - state.cur;
        state.xfade = false;
      }, ms + 40);
    }
  }
  function armWatch() {
    if (state.timer) return;
    state.timer = setInterval(tick, 200);
  }
  function stopWatch() {
    if (state.timer) { clearInterval(state.timer); state.timer = 0; }
  }
  async function unlock() {
    if (state.unlocked) return;
    for (const a of state.tracks) {
      setVol(a, 0);
      try { await a.play(); a.pause(); a.currentTime = 0; } catch (e) {}
    }
    state.unlocked = true;
  }
  async function start() {
    if (!state.wanted || !state.gestured || !state.tracks.length) return;
    if (state.mic) return;
    await unlock();
    const a = state.tracks[state.cur];
    const t = cap();
    setVol(a, 0);
    try { if (a.paused) { const p = a.play(); if (p && p.catch) p.catch(() => {}); } } catch (e) {}
    fadeTo(a, t, 0.6);
    armWatch();
  }
  function stop(sec) {
    stopWatch();
    state.xfade = false;
    state.tracks.forEach(a => {
      fadeTo(a, 0, sec || 0.3).then(() => { try { a.pause(); } catch (e) {} });
    });
  }
  function syncButtons() {
    const on = state.wanted;
    const icon = on ? '🎵' : '🔇';
    document.querySelectorAll('[data-bgm]').forEach(b => {
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.classList.toggle('on', on);
      const lbl = b.querySelector('.sl, .lbl');
      if (lbl) {
        const cls = lbl.className;
        const word = (lbl.textContent || 'Music').replace(/^\s+/, '') || 'Music';
        b.innerHTML = icon + '<span class="' + cls + '"> ' + word + '</span>';
      } else {
        b.textContent = icon;
      }
    });
  }
  function toggle() {
    state.gestured = true;
    state.wanted = !state.wanted;
    saveWanted();
    syncButtons();
    if (state.wanted) start();
    else stop(0.4);
  }
  function bind(el) {
    if (!el || el._bgmBound) return;
    el._bgmBound = true;
    el.setAttribute('data-bgm', '1');
    el.addEventListener('click', e => { e.preventDefault(); toggle(); });
  }
  function setDuck(on, reason) {
    if (reason !== 'tts' && reason !== 'mic') return;
    state[reason] = !!on;
    if (!state.wanted || !state.gestured) return;
    if (state.mic) {
      // Pause immediately so speech recognition doesn't hear the track.
      stopWatch();
      state.tracks.forEach(a => { setVol(a, 0); try { a.pause(); } catch (e) {} });
      return;
    }
    // Leaving mic-pause: resume from the same spot, then duck or restore.
    const a = state.tracks[state.cur];
    const t = cap();
    if (a && a.paused) {
      setVol(a, 0);
      const p = a.play();
      if (p && p.catch) p.catch(() => {});
      fadeTo(a, t, 0.3);
      armWatch();
    } else {
      applyCap(0.25);
    }
  }
  function onGesture() {
    if (state.gestured) return;
    state.gestured = true;
    if (state.wanted) start();
  }
  function init(opts) {
    if (state.ready) { syncButtons(); document.querySelectorAll(opts && opts.buttons || '#bgmbtn, #bgmiv').forEach(sel => {
      // already inited
    }); }
    const base = (opts && opts.base != null) ? opts.base : '';
    state.wanted = loadWanted();
    state.src = pickSrc(base);
    state.tracks = [makeTrack(state.src), makeTrack(state.src)];
    state.cur = 0;
    state.ready = true;
    const sels = (opts && opts.buttons) || ['#bgmbtn', '#bgmiv'];
    sels.forEach(s => document.querySelectorAll(s).forEach(bind));
    syncButtons();
    document.addEventListener('pointerdown', onGesture, { capture: true, once: true });
    document.addEventListener('keydown', onGesture, { capture: true, once: true });
  }
  function refresh() {
    document.querySelectorAll('#bgmbtn, #bgmiv, [data-bgm]').forEach(bind);
    syncButtons();
  }

  w.CaseBGM = { init, refresh, setDuck, toggle, syncButtons, VOL, DUCK };
})(window);
