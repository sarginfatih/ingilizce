'use strict';
/* ============ Durum (ilerleme cihazda saklanır) ============ */
const KEY = 'ingilizce-yolculugu-v1';
const INTERVAL = [0, 1, 2, 4, 8, 16]; // kutu → kaç gün sonra tekrar
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const app = $('#app');

const pad = n => String(n).padStart(2, '0');
const fmt = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = () => fmt(new Date());
const addDays = (ds, n) => { const d = new Date(ds + 'T12:00:00'); d.setDate(d.getDate() + n); return fmt(d); };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a.slice()).slice(0, n);

function defaults() {
  return { units: {}, stories: {}, srs: {}, xp: 0, streak: { count: 0, last: null }, day: { date: null, xp: 0 },
    settings: { rate: 0.85, voice: '', goal: 30, sound: true } };
}
function load() {
  const d = defaults();
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s) return { ...d, ...s, settings: { ...d.settings, ...(s.settings || {}) } };
  } catch (e) {}
  return d;
}
let S = load();
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

function addXP(n) {
  const t = today();
  if (S.day.date !== t) S.day = { date: t, xp: 0 };
  S.day.xp += n; S.xp += n;
  if (S.streak.last !== t) {
    S.streak.count = S.streak.last === addDays(t, -1) ? S.streak.count + 1 : 1;
    S.streak.last = t;
  }
  save();
}
const streakNow = () => (S.streak.last === today() || S.streak.last === addDays(today(), -1)) ? S.streak.count : 0;
const todayXP = () => S.day.date === today() ? S.day.xp : 0;

/* ============ Ses ============ */
let voice = null;
function englishVoices() {
  return ('speechSynthesis' in window ? speechSynthesis.getVoices() : []).filter(v => /^en[-_]/i.test(v.lang));
}
function pickVoice() {
  const vs = englishVoices();
  voice = vs.find(v => v.name === S.settings.voice)
    || vs.find(v => /en[-_]US/i.test(v.lang) && /Samantha|Ava|Aria|Jenny|Google US/i.test(v.name))
    || vs.find(v => /en[-_]US/i.test(v.lang)) || vs.find(v => /en[-_]GB/i.test(v.lang)) || vs[0] || null;
}
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }

function say(text, rate, onend) {
  if (!('speechSynthesis' in window)) { onend && onend(); return; }
  speechSynthesis.cancel();
  let t = String(text).replace(/→/g, ',').replace(/___/g, 'blank');
  // Kısa ifadelerde tek başına "I" harf olarak ("capital I") okunuyor; okunuşuyla değiştir.
  if (t.trim().split(/\s+/).length <= 3) t = t.replace(/(^|[^A-Za-z'’])I(?![A-Za-z'’])/g, '$1eye');
  const u = new SpeechSynthesisUtterance(t);
  u.lang = voice ? voice.lang : 'en-US';
  if (voice) u.voice = voice;
  u.rate = rate || S.settings.rate;
  if (onend) { u.onend = onend; u.onerror = onend; }
  speechSynthesis.speak(u);
}
function stopSpeech() { if ('speechSynthesis' in window) speechSynthesis.cancel(); }

let actx;
function beep(ok) {
  if (!S.settings.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const t = actx.currentTime;
    (ok ? [660, 990] : [260, 200]).forEach((f, k) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = ok ? 'sine' : 'triangle'; o.frequency.value = f;
      const s = t + k * 0.11;
      g.gain.setValueAtTime(0.0001, s); g.gain.exponentialRampToValueAtTime(0.18, s + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, s + 0.2);
      o.connect(g).connect(actx.destination); o.start(s); o.stop(s + 0.22);
    });
  } catch (e) {}
}

// Dokununca seslendir: .say öğeleri (konu anlatımı, kelime kartları, cümleler)
document.addEventListener('click', e => {
  const el = e.target.closest('.say');
  if (el) say(el.dataset.say || el.textContent, el.dataset.slow ? 0.6 : undefined);
});

/* ============ Yardımcılar ============ */
const ALL_WORDS = UNITS.flatMap(u => u.words.map(w => ({ en: w[0], tr: w[1], em: w[2], unit: u.id })));
const unitById = id => UNITS.find(u => u.id === id);
const unitIndex = id => UNITS.findIndex(u => u.id === id);
const tokens = s => s.split(/\s+/).map(t => t.replace(/^[“"(¿¡]+|[.,!?;:”")…]+$/g, '')).filter(Boolean);
const norm = s => s.toLowerCase().replace(/[’]/g, "'").replace(/[.,!?;:“”"…]/g, '').replace(/\s+/g, ' ').trim();
const dueWords = () => Object.entries(S.srs).filter(([, v]) => v.due <= today()).map(([k]) => k);
const nextUnit = () => UNITS.find(u => !(S.units[u.id] && S.units[u.id].done));

function wrapWords(text) {
  let first = true;
  return esc(text).replace(/[A-Za-zÀ-ÿçğıöşüÇĞİÖŞÜ][A-Za-zÀ-ÿçğıöşüÇĞİÖŞÜ'’&#;]*/g, m => {
    const out = `<span class="w"${first ? ' data-first="1"' : ''}>${m}</span>`;
    first = false; return out;
  });
}

function topbar(title, back = '#/') {
  return `<header class="topbar"><a class="back" href="${back}" aria-label="Geri">‹</a><h1>${title}</h1></header>`;
}

/* ============ Yönlendirme ============ */
const routes = { '': home, unit: unitPage, cards: cardsPage, practice: practicePage, review: reviewPage,
  stories: storiesPage, story: storyPage, settings: settingsPage };
function router() {
  stopSpeech(); closeSheet();
  document.body.classList.remove('focus');
  const [r, id] = location.hash.replace(/^#\/?/, '').split('/');
  (routes[r] || home)(id);
  window.scrollTo(0, 0);
  const tab = { '': 'home', unit: 'home', cards: 'home', review: 'review', stories: 'stories', story: 'stories', settings: 'settings' }[r] || 'home';
  $$('.tabbar a').forEach(a => a.classList.toggle('on', a.dataset.tab === tab));
}
window.addEventListener('hashchange', router);

/* ============ Ana sayfa: öğrenme yolu ============ */
function home() {
  const done = UNITS.filter(u => S.units[u.id] && S.units[u.id].done).length;
  const pct = Math.round(done / UNITS.length * 100);
  const nu = nextUnit();
  const due = dueWords().length;
  const goal = S.settings.goal, tx = todayXP();
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const standalone = window.navigator.standalone || matchMedia('(display-mode: standalone)').matches;

  let path = '';
  UNITS.forEach((u, i) => {
    const st = S.units[u.id];
    const cls = st && st.done ? 'done' : (u === nu ? 'next' : '');
    path += `<a class="node ${cls}" href="#/unit/${u.id}">
      <span class="num">${st && st.done ? '✓' : i + 1}</span>
      <span class="ico">${u.icon}</span>
      <span class="txt"><b>${esc(u.title)}</b><small>${esc(u.subtitle)}</small></span>
      <span class="stat">${st && st.done ? '%' + st.best : (u === nu ? 'Sıradaki ▶' : '')}</span></a>`;
    STORIES.filter(s => s.after === u.id).forEach(s => {
      const read = S.stories[s.id];
      path += `<a class="node story ${read ? 'done' : ''}" href="#/story/${s.id}">
        <span class="num">📖</span><span class="ico">${s.icon}</span>
        <span class="txt"><b>${esc(s.title)}</b><small>Hikaye · ${esc(s.trTitle)}</small></span>
        <span class="stat">${read ? '✓ okundu' : ''}</span></a>`;
    });
  });

  app.innerHTML = `
  <header class="hero">
    <div class="hero-top">
      <h1>İngilizce Yolculuğum</h1>
      <div class="chips"><span class="chip">🔥 ${streakNow()} gün</span><span class="chip">⭐ ${S.xp} XP</span></div>
    </div>
    <div class="goal"><div class="goal-lbl">Günlük hedef: ${Math.min(tx, goal)} / ${goal} XP ${tx >= goal ? '✅' : ''}</div>
      <div class="bar"><i style="width:${Math.min(100, tx / goal * 100)}%"></i></div></div>
    <div class="goal"><div class="goal-lbl">A1 seviyesine ilerleme: %${pct} (${done}/${UNITS.length} ünite)</div>
      <div class="bar alt"><i style="width:${pct}%"></i></div></div>
  </header>
  ${isIOS && !standalone ? `<div class="card install">📲 <b>iPad'e yükle:</b> Safari'de <b>Paylaş</b> düğmesine (□↑) dokun → <b>Ana Ekrana Ekle</b>. Uygulama gibi açılır ve internetsiz çalışır.</div>` : ''}
  <div class="actions">
    ${nu ? `<a class="btn primary big" href="#/unit/${nu.id}">${nu.icon} Devam et: ${esc(nu.title)}</a>` : `<div class="card">🏆 Tüm üniteleri bitirdin! Hikayeleri okumaya ve tekrar yapmaya devam et.</div>`}
    ${due ? `<a class="btn review big" href="#/review">🧠 Tekrar zamanı: ${due} kelime</a>` : ''}
  </div>
  <h2 class="sec">Öğrenme Yolu</h2>
  <div class="path">${path}</div>`;
}

/* ============ Ünite sayfası ============ */
function unitPage(id) {
  const u = unitById(id); if (!u) return home();
  const i = unitIndex(id);
  const st = S.units[id];
  app.innerHTML = `
  ${topbar(`${u.icon} ${i + 1}. ${esc(u.title)}`)}
  <p class="lead">${esc(u.subtitle)} ${st && st.done ? `<span class="badge ok">✓ Tamamlandı · en iyi %${st.best}</span>` : ''}</p>
  <section class="card grammar"><h3>📘 Konu Anlatımı</h3>${u.grammar}</section>
  <h2 class="sec">🔤 Kelimeler <small>dokun ve dinle</small></h2>
  <div class="words">${u.words.map(w => `
    <button class="wcard say" data-say="${esc(w[0])}"><span class="em">${w[2] || ''}</span><b>${esc(w[0])}</b><small>${esc(w[1])}</small></button>`).join('')}
  </div>
  <a class="btn secondary" href="#/cards/${id}">🃏 Kelime kartlarıyla çalış</a>
  <h2 class="sec">💬 Örnek Cümleler</h2>
  <ul class="sents">${u.sentences.map(s => `
    <li class="say" data-say="${esc(s[0])}"><span class="spk">🔊</span><span><b>${esc(s[0])}</b><small>${esc(s[1])}</small></span></li>`).join('')}
  </ul>
  <a class="btn primary big" href="#/practice/${id}">✏️ Alıştırmaya başla</a>
  ${i < UNITS.length - 1 ? `<a class="btn ghost" href="#/unit/${UNITS[i + 1].id}">Sonraki ünite: ${esc(UNITS[i + 1].title)} ›</a>` : ''}`;
}

/* ============ Kelime kartları ============ */
function cardsPage(id) {
  const u = unitById(id); if (!u) return home();
  const deck = shuffle(u.words.slice());
  let k = 0, flipped = false;
  function draw() {
    const w = deck[k];
    app.innerHTML = `
    ${topbar(`🃏 ${esc(u.title)}`, `#/unit/${id}`)}
    <p class="lead center">${k + 1} / ${deck.length} · Karta dokun, çevir</p>
    <div class="flash ${flipped ? 'flipped' : ''}" id="flash">
      <div class="em">${w[2] || ''}</div>
      <div class="en">${esc(w[0])}</div>
      <div class="tr">${flipped ? esc(w[1]) : '❔'}</div>
    </div>
    <div class="row center">
      <button class="btn ghost" id="prev" ${k === 0 ? 'disabled' : ''}>‹ Önceki</button>
      <button class="btn secondary say" data-say="${esc(w[0])}">🔊 Dinle</button>
      <button class="btn secondary say" data-slow="1" data-say="${esc(w[0])}">🐢 Yavaş</button>
      <button class="btn primary" id="next">${k === deck.length - 1 ? 'Bitir ✓' : 'Sonraki ›'}</button>
    </div>`;
    $('#flash').onclick = () => { flipped = !flipped; draw(); };
    $('#prev').onclick = () => { k--; flipped = false; draw(); say(deck[k][0]); };
    $('#next').onclick = () => {
      if (k === deck.length - 1) { location.hash = `#/unit/${id}`; return; }
      k++; flipped = false; draw(); say(deck[k][0]);
    };
  }
  draw(); say(deck[0][0]);
}

/* ============ Soru üreticileri ============ */
function wordDistractors(word, field, unitId, n = 3) {
  const same = ALL_WORDS.filter(w => w.unit === unitId), rest = ALL_WORDS.filter(w => w.unit !== unitId);
  const seen = new Set([norm(word[field])]); const out = [];
  for (const w of [...shuffle(same.slice()), ...shuffle(rest.slice())]) {
    const v = norm(w[field]); if (seen.has(v)) continue;
    seen.add(v); out.push(w[field]); if (out.length >= n) break;
  }
  return out;
}
const asWord = (w, unit) => Array.isArray(w) ? { en: w[0], tr: w[1], em: w[2], unit } : w;

function qEnTr(w) { return { type: 'mc', word: w.en, kind: 'entr', label: 'Bu kelimenin anlamı ne?',
  promptHtml: `<div class="big-word say" data-say="${esc(w.en)}">🔊 ${esc(w.en)}</div>`, autoSay: w.en,
  options: shuffle([w.tr, ...wordDistractors(w, 'tr', w.unit)]), answer: w.tr, sayAfter: w.en }; }
function qTrEn(w) { return { type: 'mc', word: w.en, kind: 'tren', label: 'İngilizcesi hangisi?',
  promptHtml: `<div class="big-word tr">${esc(w.tr)}</div>`, optSay: true,
  options: shuffle([w.en, ...wordDistractors(w, 'en', w.unit)]), answer: w.en, sayAfter: w.en }; }
function qListen(w) { return { type: 'mc', word: w.en, kind: 'listen', label: 'Dinle ve duyduğun kelimeyi seç',
  promptHtml: listenBtns(w.en), autoSay: w.en,
  options: shuffle([w.en, ...wordDistractors(w, 'en', w.unit)]), answer: w.en, sayAfter: w.en }; }
function qType(w) { return { type: 'type', word: w.en, label: 'İngilizcesini yaz',
  promptHtml: `<div class="big-word tr">${esc(w.tr)}</div>`, answer: w.en, sayAfter: w.en }; }
function qBuild(s, u, listen) {
  const toks = tokens(s[0]);
  const have = new Set(toks.map(t => t.toLowerCase()));
  const extra = shuffle(u.words.map(w => w[0]).filter(w => !w.includes(' ') && !have.has(w.toLowerCase()))).slice(0, toks.length > 5 ? 3 : 2);
  return { type: 'build', label: listen ? 'Dinle ve cümleyi kur' : 'Bu cümleyi İngilizce kur',
    promptHtml: listen ? listenBtns(s[0]) : `<div class="big-word tr small">${esc(s[1])}</div>`,
    autoSay: listen ? s[0] : null, target: s[0], tr: s[1],
    tiles: shuffle([...toks, ...extra]), sayAfter: s[0] };
}
function qFill(f) {
  return { type: 'fill', label: 'Boşluğu doldur', sentence: f[0], answer: f[1], hint: f[3],
    options: shuffle([f[1], ...f[2]]), sayAfter: f[0].replace('___', f[1]).replace('→', ',') };
}
function listenBtns(text) {
  return `<div class="listen"><button class="lbtn say" data-say="${esc(text)}">🔊</button>
          <button class="lbtn slow say" data-slow="1" data-say="${esc(text)}">🐢</button></div>`;
}

function unitQuestions(u) {
  const W = shuffle(u.words.map(w => asWord(w, u.id)));
  const a = [...W.slice(0, 4).map(qEnTr), ...W.slice(4, 6).map(qTrEn), ...W.slice(6, 8).map(qListen)];
  const Ss = shuffle(u.sentences.slice());
  const b = [...Ss.slice(0, 3).map(s => qBuild(s, u, false)), ...Ss.slice(3, 4).map(s => qBuild(s, u, true)),
    ...pick(u.fills, 4).map(qFill)];
  return [...shuffle(a), ...shuffle(b)];
}

/* ============ Alıştırma oturumu ============ */
function runSession(questions, { title, onAnswer, onFinish }) {
  document.body.classList.add('focus');
  const queue = questions.map(q => ({ q, tries: 0 }));
  const total = questions.length;
  let solved = 0, firstOk = 0, cur, checker, state;

  app.innerHTML = `
  <div class="session">
    <div class="s-top"><button class="x" id="quit" aria-label="Çık">✕</button><div class="bar"><i id="prog"></i></div></div>
    <div class="s-body" id="qbody"></div>
    <div class="s-foot" id="foot"><div class="fb" id="fb"></div><button class="btn primary big" id="go" disabled>Kontrol et</button></div>
  </div>`;
  $('#quit').onclick = () => { if (confirm('Alıştırmadan çıkılsın mı? İlerleme kaydedilmez.')) history.back(); };
  const go = $('#go'), foot = $('#foot'), fb = $('#fb'), body = $('#qbody');

  function next() {
    $('#prog').style.width = (solved / total * 100) + '%';
    if (!queue.length) return finish();
    cur = queue.shift(); state = 'check';
    foot.className = 's-foot'; fb.innerHTML = '';
    go.textContent = 'Kontrol et'; go.disabled = true;
    body.innerHTML = `<p class="q-label">${cur.tries ? '🔁 Tekrar deneyelim: ' : ''}${cur.q.label}</p>`;
    checker = renderQuestion(cur.q, body, ready => { go.disabled = !ready; });
    if (cur.q.autoSay) say(cur.q.autoSay);
  }
  go.onclick = () => {
    if (state === 'check') {
      const r = checker(); if (!r) return;
      state = 'next';
      const q = cur.q;
      if (r.ok) { solved++; if (!cur.tries) firstOk++; }
      else { cur.tries++; if (cur.tries < 2) queue.push(cur); else solved++; }
      if (onAnswer) onAnswer(q, r.ok, cur.tries);
      beep(r.ok);
      foot.className = 's-foot ' + (r.ok ? 'ok' : 'bad');
      fb.innerHTML = r.ok
        ? `<b>${pick(['Harika! 🎉', 'Doğru! 👏', 'Süper! ⭐', 'Çok iyi! 💪'], 1)[0]}</b>`
        : `<b>Doğru cevap:</b> <span class="say" data-say="${esc(q.sayAfter || '')}">${esc(r.correct)} 🔊</span>`;
      go.textContent = 'Devam'; go.disabled = false;
      $('#prog').style.width = (solved / total * 100) + '%';
      if (q.sayAfter) setTimeout(() => say(q.sayAfter), 350);
    } else next();
  };
  function finish() {
    stopSpeech();
    const score = Math.round(firstOk / total * 100);
    const extra = onFinish ? onFinish(score, firstOk, total) : {};
    document.body.classList.remove('focus');
    app.innerHTML = `
    <div class="finish">
      <div class="trophy">${score >= 80 ? '🏆' : score >= 50 ? '🎉' : '💪'}</div>
      <h1>${esc(title)} tamamlandı!</h1>
      <p class="lead">İlk denemede doğru: <b>${firstOk} / ${total}</b> · Başarı <b>%${score}</b></p>
      <p class="xp">+${extra.xp || 0} XP</p>
      ${extra.msg ? `<p>${extra.msg}</p>` : ''}
      <div class="row center">
        <a class="btn primary big" href="${extra.next || '#/'}">${extra.nextLabel || 'Devam ›'}</a>
        <button class="btn ghost" id="again">🔁 Tekrar yap</button>
      </div>
    </div>`;
    $('#again').onclick = () => router();
  }
  next();
}

function renderQuestion(q, body, setReady) {
  const wrap = document.createElement('div'); wrap.className = 'q';
  body.appendChild(wrap);

  if (q.type === 'mc') {
    let chosen = null;
    wrap.innerHTML = `${q.promptHtml}<div class="opts">${q.options.map((o, i) =>
      `<button class="opt" data-i="${i}"><span class="k">${i + 1}</span>${esc(o)}</button>`).join('')}</div>`;
    $$('.opt', wrap).forEach(b => b.onclick = () => {
      if (b.disabled) return;
      $$('.opt', wrap).forEach(x => x.classList.remove('sel')); b.classList.add('sel');
      chosen = q.options[b.dataset.i]; setReady(true);
      if (q.optSay) say(chosen);
    });
    return () => {
      if (chosen == null) return null;
      const ok = chosen === q.answer;
      $$('.opt', wrap).forEach(b => {
        b.disabled = true;
        const v = q.options[b.dataset.i];
        if (v === q.answer) b.classList.add('right'); else if (v === chosen) b.classList.add('wrong');
      });
      return { ok, correct: q.answer };
    };
  }

  if (q.type === 'fill') {
    let chosen = null;
    const parts = q.sentence.split('___');
    wrap.innerHTML = `<div class="fill">${esc(parts[0])}<span class="blank" id="blank">&nbsp;?&nbsp;</span>${esc(parts[1] || '')}</div>
      ${q.hint ? `<p class="hint">🇹🇷 ${esc(q.hint)}</p>` : ''}
      <div class="opts row-opts">${q.options.map((o, i) => `<button class="opt" data-i="${i}">${esc(o)}</button>`).join('')}</div>`;
    $$('.opt', wrap).forEach(b => b.onclick = () => {
      if (b.disabled) return;
      $$('.opt', wrap).forEach(x => x.classList.remove('sel')); b.classList.add('sel');
      chosen = q.options[b.dataset.i]; $('#blank', wrap).textContent = chosen; setReady(true);
    });
    return () => {
      if (chosen == null) return null;
      const ok = chosen === q.answer;
      $('#blank', wrap).classList.add(ok ? 'right' : 'wrong');
      $$('.opt', wrap).forEach(b => {
        b.disabled = true; const v = q.options[b.dataset.i];
        if (v === q.answer) b.classList.add('right'); else if (v === chosen) b.classList.add('wrong');
      });
      return { ok, correct: q.sentence.replace('___', q.answer) };
    };
  }

  if (q.type === 'build') {
    const tiles = q.tiles.map((t, i) => ({ t, i }));
    const picked = [];
    wrap.innerHTML = `${q.promptHtml}<div class="answer-line" id="line"></div><div class="bank" id="bank"></div>`;
    const line = $('#line', wrap), bank = $('#bank', wrap);
    let locked = false;
    function draw() {
      line.innerHTML = picked.map(p => `<button class="tile" data-i="${p.i}">${esc(p.t)}</button>`).join('') || '<span class="ph">Kelimelere dokunarak cümleyi kur</span>';
      bank.innerHTML = tiles.map(p => `<button class="tile ${picked.includes(p) ? 'used' : ''}" data-i="${p.i}">${esc(p.t)}</button>`).join('');
      $$('.tile', line).forEach(b => b.onclick = () => { if (locked) return; picked.splice(picked.findIndex(p => p.i == b.dataset.i), 1); draw(); });
      $$('.tile', bank).forEach(b => b.onclick = () => {
        if (locked) return; const p = tiles.find(x => x.i == b.dataset.i);
        if (picked.includes(p)) return; picked.push(p); say(p.t); draw();
      });
      setReady(picked.length > 0);
    }
    draw();
    return () => {
      if (!picked.length) return null;
      locked = true;
      const ok = norm(picked.map(p => p.t).join(' ')) === norm(tokens(q.target).join(' '));
      line.classList.add(ok ? 'right' : 'wrong');
      return { ok, correct: q.target };
    };
  }

  if (q.type === 'type') {
    wrap.innerHTML = `${q.promptHtml}<input class="typein" id="typein" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="İngilizce yaz...">`;
    const inp = $('#typein', wrap);
    inp.oninput = () => setReady(inp.value.trim().length > 0);
    inp.onkeydown = e => { if (e.key === 'Enter' && inp.value.trim()) $('#go').click(); };
    setTimeout(() => inp.focus(), 50);
    return () => {
      const v = inp.value.trim(); if (!v) return null;
      inp.disabled = true;
      const ok = norm(v) === norm(q.answer);
      inp.classList.add(ok ? 'right' : 'wrong');
      return { ok, correct: q.answer };
    };
  }
}

/* ============ Ünite alıştırması ============ */
function practicePage(id) {
  const u = unitById(id); if (!u) return home();
  const i = unitIndex(id);
  runSession(unitQuestions(u), {
    title: u.title,
    onFinish(score, ok) {
      const prev = S.units[id] || {};
      const first = !prev.done;
      if (score < 50 && first) {
        addXP(5);
        return { xp: 5, msg: 'Üniteyi geçmek için en az <b>%50</b> gerekiyor. Konu anlatımına ve kelimelere bir kez daha bakıp tekrar dene — yapabilirsin! 💪',
          next: `#/unit/${id}`, nextLabel: '📘 Konuya geri dön' };
      }
      S.units[id] = { done: true, best: Math.max(prev.best || 0, score) };
      let added = 0;
      u.words.forEach(([en, tr]) => { if (!S.srs[en]) { S.srs[en] = { tr, box: 1, due: addDays(today(), 1) }; added++; } });
      const xp = 10 + ok + (first ? 10 : 0);
      addXP(xp);
      const story = STORIES.find(s => s.after === id && !S.stories[s.id]);
      const nu = UNITS[i + 1];
      return {
        xp,
        msg: (added ? `🧠 ${added} kelime tekrar listene eklendi.` : '') + (score < 60 ? '<br>Konuyu bir kez daha okuyup tekrar denemek iyi olabilir.' : ''),
        next: story ? `#/story/${story.id}` : nu ? `#/unit/${nu.id}` : '#/',
        nextLabel: story ? `📖 Hikayeyi oku: ${story.title}` : nu ? `Sonraki ünite: ${nu.title} ›` : 'Ana sayfa'
      };
    }
  });
}

/* ============ Tekrar (aralıklı tekrar sistemi) ============ */
function reviewPage(mode) {
  const learned = Object.keys(S.srs);
  if (mode === 'go' || mode === 'free') {
    const list = mode === 'go' ? pick(dueWords(), 15) : pick(learned, 12);
    if (!list.length) { location.hash = '#/review'; return; }
    const qs = list.map(en => {
      const e = S.srs[en], w = ALL_WORDS.find(x => x.en === en) || { en, tr: e.tr, unit: null };
      const kinds = e.box <= 1 ? [qEnTr, qListen] : e.box === 2 ? [qTrEn, qListen, qEnTr] : [qType, qTrEn, qListen];
      return pick(kinds, 1)[0](w);
    });
    const counted = new Set();
    runSession(qs, {
      title: 'Tekrar',
      onAnswer(q, ok) {
        if (mode !== 'go' || counted.has(q.word)) return;
        counted.add(q.word);
        const e = S.srs[q.word]; if (!e) return;
        if (ok) { e.box = Math.min(5, e.box + 1); e.due = addDays(today(), INTERVAL[e.box]); }
        else { e.box = 1; e.due = addDays(today(), 1); }
        save();
      },
      onFinish(score, ok) {
        const xp = 5 + ok; addXP(xp);
        return { xp, next: '#/review', nextLabel: 'Tekrar sayfası' };
      }
    });
    return;
  }
  const due = dueWords();
  const boxes = [1, 2, 3, 4, 5].map(b => learned.filter(k => S.srs[k].box === b).length);
  const names = ['Yeni', 'Öğreniliyor', 'İyi', 'Çok iyi', 'Ustalaştı'];
  app.innerHTML = `
  ${topbar('🧠 Tekrar')}
  <section class="card">
    <p class="lead">Öğrendiğin kelimeler unutmaya başlamadan önce sana tekrar sorulur. Doğru bildikçe kelime üst kutuya çıkar ve daha seyrek sorulur.</p>
    <div class="boxes">${boxes.map((n, i) => `<div class="box b${i + 1}"><b>${n}</b><small>${names[i]}</small></div>`).join('')}</div>
    <p>Toplam <b>${learned.length}</b> kelime · Bugün tekrar edilecek: <b>${due.length}</b></p>
    ${due.length ? `<a class="btn review big" href="#/review/go">Tekrara başla (${Math.min(15, due.length)} kelime)</a>`
      : learned.length ? `<p class="center">✅ Bugünlük tekrar bitti!</p>` : `<p class="center">Henüz kelime yok. Bir ünite tamamlayınca kelimeler buraya gelir.</p>`}
    ${learned.length >= 4 ? `<a class="btn secondary" href="#/review/free">🎲 Serbest pratik (rastgele 12 kelime)</a>` : ''}
  </section>
  ${learned.length ? `<h2 class="sec">Kelimelerim</h2><div class="wordlist">${learned.sort().map(k =>
    `<button class="wl say" data-say="${esc(k)}"><b>${esc(k)}</b> <small>${esc(S.srs[k].tr)}</small><i class="lv b${S.srs[k].box}"></i></button>`).join('')}</div>` : ''}`;
}

/* ============ Hikayeler ============ */
function storiesPage() {
  app.innerHTML = `
  ${topbar('📚 Hikayeler')}
  <p class="lead">Kelimelere dokun, anlamını gör. 🔊 ile cümleyi dinle, <b>TR</b> ile çevirisine bak.</p>
  <div class="path">${STORIES.map(s => {
    const ui = unitIndex(s.after), ready = S.units[s.after] && S.units[s.after].done;
    return `<a class="node story ${S.stories[s.id] ? 'done' : ''}" href="#/story/${s.id}">
      <span class="num">${s.icon}</span>
      <span class="txt"><b>${esc(s.title)}</b><small>${esc(s.trTitle)} · ${ready ? 'hazırsın ✓' : `önerilen: ${ui + 1}. üniteden sonra`}</small></span>
      <span class="stat">${S.stories[s.id] ? '✓' : ''}</span></a>`;
  }).join('')}</div>`;
}

function storyPage(id) {
  const s = STORIES.find(x => x.id === id); if (!s) return storiesPage();
  let showTr = false, playing = false;
  const flat = s.paras.flat();
  let n = 0;
  app.innerHTML = `
  ${topbar(`${s.icon} ${esc(s.title)}`, '#/stories')}
  <p class="lead">${esc(s.trTitle)}</p>
  <div class="row tools">
    <button class="btn primary" id="playall">▶ Tümünü dinle</button>
    <button class="btn secondary" id="trall">🇹🇷 Çevirileri göster</button>
  </div>
  <article class="story" id="story">${s.paras.map(p => `<div class="para">${p.map(([en, tr]) => {
    const k = n++;
    return `<div class="sent" data-k="${k}">
      <button class="sbtn say" data-say="${esc(en)}" aria-label="Dinle">🔊</button>
      <div class="stext"><span class="en">${wrapWords(en)}</span><span class="trl">${esc(tr)}</span></div>
      <button class="sbtn trb" aria-label="Çeviri">TR</button></div>`;
  }).join('')}</div>`).join('')}</article>
  <h2 class="sec">❓ Anladın mı?</h2>
  <div id="quiz">${s.questions.map((q, qi) => {
    const opts = shuffle([q[2], ...q[3]]);
    return `<div class="card quiz" data-q="${qi}"><p><b class="say" data-say="${esc(q[0])}">🔊 ${esc(q[0])}</b><br><small>${esc(q[1])}</small></p>
      <div class="opts">${opts.map(o => `<button class="opt" data-v="${esc(o)}">${esc(o)}</button>`).join('')}</div></div>`;
  }).join('')}</div>
  <div id="qres"></div>`;

  const story = $('#story');
  story.addEventListener('click', e => {
    const w = e.target.closest('.w');
    if (w) { wordSheet(w.textContent, w); return; }
    const t = e.target.closest('.trb');
    if (t) t.closest('.sent').classList.toggle('show');
  });
  $('#trall').onclick = () => {
    showTr = !showTr; story.classList.toggle('alltr', showTr);
    $('#trall').textContent = showTr ? '🇹🇷 Çevirileri gizle' : '🇹🇷 Çevirileri göster';
  };
  $('#playall').onclick = () => {
    if (playing) { playing = false; stopSpeech(); mark(-1); $('#playall').textContent = '▶ Tümünü dinle'; return; }
    playing = true; $('#playall').textContent = '⏹ Durdur';
    const step = k => {
      if (!playing || k >= flat.length || !document.body.contains(story)) {
        playing = false; mark(-1); const b = $('#playall'); if (b) b.textContent = '▶ Tümünü dinle'; return;
      }
      mark(k); say(flat[k][0], undefined, () => setTimeout(() => step(k + 1), 250));
    };
    step(0);
  };
  function mark(k) {
    $$('.sent', story).forEach(el => el.classList.toggle('playing', +el.dataset.k === k));
    const el = $(`.sent[data-k="${k}"]`, story); if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  let answered = 0, right = 0;
  $$('.quiz').forEach(card => {
    const q = s.questions[card.dataset.q];
    $$('.opt', card).forEach(b => b.onclick = () => {
      if (card.dataset.done) return;
      card.dataset.done = 1; answered++;
      const ok = b.dataset.v === q[2]; if (ok) right++;
      beep(ok);
      $$('.opt', card).forEach(x => { x.disabled = true; if (x.dataset.v === q[2]) x.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      if (answered === s.questions.length) {
        const first = !S.stories[id];
        S.stories[id] = { read: true, score: right };
        const xp = first ? 15 + right * 2 : 3; addXP(xp);
        const ni = STORIES.findIndex(x => x.id === id) + 1;
        const nextU = nextUnit();
        $('#qres').innerHTML = `<div class="card finish small"><div class="trophy">📖</div>
          <h3>${right} / ${s.questions.length} doğru · +${xp} XP</h3>
          <div class="row center">${nextU ? `<a class="btn primary" href="#/unit/${nextU.id}">Sıradaki ünite: ${esc(nextU.title)} ›</a>` : ''}
          ${STORIES[ni] ? `<a class="btn secondary" href="#/story/${STORIES[ni].id}">Sonraki hikaye ›</a>` : ''}</div></div>`;
      }
    });
  });
}

/* Kelime kartı (alttan açılan pencere) */
function wordSheet(raw, el) {
  const r = LEX.lookup(raw);
  if (!r) return;
  $$('.w.hl').forEach(x => x.classList.remove('hl')); el.classList.add('hl');
  say(r.word === r.base ? raw : r.word);
  const key = r.base.toLowerCase();
  const canAdd = r.tr && r.tr !== '(isim)' && !S.srs[key] && !S.srs[r.base];
  const sh = $('#sheet');
  sh.innerHTML = `<div class="sheet-in">
    <div class="sh-head"><b class="say" data-say="${esc(r.word)}">🔊 ${esc(raw.replace(/[^A-Za-zÀ-ÿçğıöşüÇĞİÖŞÜ'’]/g, ''))}</b>
      <button class="x" id="shx">✕</button></div>
    ${r.base.toLowerCase() !== r.word.toLowerCase() ? `<p class="base">Kök: <b class="say" data-say="${esc(r.base)}">${esc(r.base)} 🔊</b>${r.note ? ` · <small>${esc(r.note)}</small>` : ''}</p>` : ''}
    <p class="mean">${r.tr ? esc(r.tr) : '<i>Bu kelime sözlükte yok.</i>'}</p>
    ${canAdd ? `<button class="btn secondary" id="shadd">➕ Tekrar listeme ekle</button>` : (S.srs[key] ? '<p class="muted">✓ Bu kelime tekrar listende</p>' : '')}
  </div>`;
  sh.classList.add('open');
  $('#shx').onclick = closeSheet;
  const add = $('#shadd');
  if (add) add.onclick = () => { S.srs[key] = { tr: r.tr, box: 1, due: today() }; save(); add.outerHTML = '<p class="muted">✓ Eklendi</p>'; };
}
function closeSheet() { const sh = $('#sheet'); if (sh) sh.classList.remove('open'); $$('.w.hl').forEach(x => x.classList.remove('hl')); }
document.addEventListener('click', e => {
  const sh = $('#sheet');
  if (sh && sh.classList.contains('open') && !sh.contains(e.target) && !e.target.closest('.w')) closeSheet();
});

/* ============ Ayarlar ============ */
function settingsPage() {
  const vs = englishVoices();
  app.innerHTML = `
  ${topbar('⚙️ Ayarlar')}
  <section class="card form">
    <h3>🔊 Ses</h3>
    <label>Konuşma hızı: <b id="rv">${S.settings.rate.toFixed(2)}</b>
      <input type="range" id="rate" min="0.5" max="1.1" step="0.05" value="${S.settings.rate}"></label>
    <label>Ses (aksan)
      <select id="voice"><option value="">Otomatik</option>${vs.map(v => `<option ${v.name === S.settings.voice ? 'selected' : ''} value="${esc(v.name)}">${esc(v.name)} (${esc(v.lang)})</option>`).join('')}</select></label>
    <button class="btn secondary" id="test">▶ Dene: “Hello, how are you?”</button>
    <p class="muted">${vs.length ? '' : 'Bu cihazda İngilizce ses bulunamadı. '}iPad'de daha doğal ses için: Ayarlar → Erişilebilirlik → Seslendirilen İçerik → Sesler → İngilizce → “Enhanced/Premium” bir ses indir.</p>
    <label class="chk"><input type="checkbox" id="sound" ${S.settings.sound ? 'checked' : ''}> Doğru / yanlış efekt sesleri</label>
  </section>
  <section class="card form">
    <h3>🎯 Günlük hedef</h3>
    <select id="goal">${[10, 20, 30, 50, 80].map(g => `<option ${g === S.settings.goal ? 'selected' : ''} value="${g}">${g} XP / gün</option>`).join('')}</select>
  </section>
  <section class="card form">
    <h3>💾 Yedek</h3>
    <p class="muted">İlerlemen bu cihazda saklanır. Yedeği kopyalayıp Notlar'a yapıştırarak saklayabilirsin.</p>
    <div class="row"><button class="btn secondary" id="exp">📋 Yedeği kopyala</button><button class="btn secondary" id="imp">📥 Yedekten yükle</button></div>
    <textarea id="bk" rows="4" placeholder="Yedek metni buraya yapıştır ve 'Yedekten yükle'ye dokun"></textarea>
    <button class="btn danger" id="reset">🗑️ Tüm ilerlemeyi sıfırla</button>
  </section>
  <p class="muted center">İngilizce Yolculuğum · ${UNITS.length} ünite · ${STORIES.length} hikaye</p>`;
  $('#rate').oninput = e => { S.settings.rate = +e.target.value; $('#rv').textContent = S.settings.rate.toFixed(2); save(); };
  $('#rate').onchange = () => say('This is my speed.');
  $('#voice').onchange = e => { S.settings.voice = e.target.value; save(); pickVoice(); say('Hello, how are you?'); };
  $('#test').onclick = () => say('Hello, how are you?');
  $('#sound').onchange = e => { S.settings.sound = e.target.checked; save(); };
  $('#goal').onchange = e => { S.settings.goal = +e.target.value; save(); };
  $('#exp').onclick = async () => {
    const txt = JSON.stringify(S); $('#bk').value = txt;
    try { await navigator.clipboard.writeText(txt); alert('Yedek panoya kopyalandı.'); }
    catch (e) { $('#bk').select(); alert('Metni seçip kopyala.'); }
  };
  $('#imp').onclick = () => {
    try {
      const d = JSON.parse($('#bk').value);
      if (!d || typeof d !== 'object' || !d.srs) throw 0;
      if (!confirm('Mevcut ilerleme yedekle değiştirilsin mi?')) return;
      S = { ...defaults(), ...d, settings: { ...defaults().settings, ...(d.settings || {}) } }; save(); alert('Yedek yüklendi.'); location.hash = '#/';
    } catch (e) { alert('Yedek metni geçersiz.'); }
  };
  $('#reset').onclick = () => {
    if (confirm('Tüm ilerleme silinecek. Emin misin?') && confirm('Bu işlem geri alınamaz. Sıfırlansın mı?')) {
      S = defaults(); save(); location.hash = '#/';
    }
  };
}

/* ============ Başlat ============ */
router();
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
