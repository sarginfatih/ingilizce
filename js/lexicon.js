/* Sözlük: ünite kelimeleri + DICT. Çekimli biçimleri (plays, played, playing, cats, Ali's) köke indirger. */
const LEX = (() => {
  const map = {};
  const add = (en, tr) => { const k = en.toLowerCase(); if (!(k in map)) map[k] = tr; };
  UNITS.forEach(u => u.words.forEach(([en, tr]) => add(en, tr)));
  Object.entries(DICT).forEach(([k, v]) => add(k, v));

  const NAMES = new Set(["mia", "tom", "can", "murat", "ayşe", "ela", "max", "luna", "ben", "ali",
    "elif", "sara", "pip", "emma", "rex", "lucy"]);

  const clean = raw => raw.toLowerCase().replace(/[’‘]/g, "'")
    .replace(/^[^a-zçğıöşüé]+/, "").replace(/[^a-zçğıöşüé]+$/, "");

  function lookup(raw) {
    const w = clean(raw);
    if (!w) return null;
    if (/^[A-ZÇĞİÖŞÜ]/.test(raw) && NAMES.has(w)) return { word: raw, base: raw, tr: "(isim)" };
    if (w.endsWith("'s") && NAMES.has(w.slice(0, -2)))
      return { word: raw, base: raw.slice(0, -2), tr: "(isim)", note: "'s → -nın, -nin (sahiplik)" };
    if (map[w]) return { word: w, base: w, tr: map[w] };
    const tries = [];
    if (w.endsWith("'s")) tries.push([w.slice(0, -2), "'s → -nın, -nin (sahiplik)"]);
    if (w.endsWith("ies")) tries.push([w.slice(0, -3) + "y", "çoğul / 3. tekil -s"]);
    if (w.endsWith("es")) tries.push([w.slice(0, -2), "çoğul / 3. tekil -es"]);
    if (w.endsWith("s")) tries.push([w.slice(0, -1), "çoğul / 3. tekil -s"]);
    if (w.endsWith("ied")) tries.push([w.slice(0, -3) + "y", "geçmiş zaman -ed"]);
    if (w.endsWith("ed")) {
      tries.push([w.slice(0, -2), "geçmiş zaman -ed"]);
      tries.push([w.slice(0, -1), "geçmiş zaman -d"]);
      tries.push([w.slice(0, -3), "geçmiş zaman -ed"]);
    }
    if (w.endsWith("ing")) {
      const b = w.slice(0, -3);
      tries.push([b, "-ing: şu anda yapılıyor"]);
      tries.push([b + "e", "-ing: şu anda yapılıyor"]);
      tries.push([b.slice(0, -1), "-ing: şu anda yapılıyor"]);
    }
    for (const [b, note] of tries) if (map[b]) return { word: w, base: b, tr: map[b], note };
    if (NAMES.has(w)) return { word: raw, base: raw, tr: "(isim)" };
    return { word: w, base: w, tr: null };
  }
  return { lookup, map, clean };
})();
