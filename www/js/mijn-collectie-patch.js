/**
 * Mijn Collectie — patch v2 (lookup + scanner)
 * Laadt NA mijn-collectie-card.js. Overschrijft: _lookupBarcode, _lookupByTitle,
 * _toggleScan, _closeScan, _save, _openForm (titel zoeken).
 * Ongedaan maken: verwijder deze resource uit Dashboards > Resources.
 *
 * Bronnen:
 *   Boeken : Open Library -> Google Books
 *   Muziek : MusicBrainz (max 1 req/s, met retry) -> Discogs
 *   Video  : Discogs (EAN -> titel) -> UPCitemdb, daarna OMDb voor metadata/poster
 * Discogs token: input_text.discogs_api_token (optioneel, maar sterk aanbevolen voor DVD/Blu-ray)
 */
(async () => {
  await customElements.whenDefined('mijn-collectie-card');
  const P = customElements.get('mijn-collectie-card').prototype;
  if (P.__patchV2) return;
  P.__patchV2 = true;

  const enc = encodeURIComponent;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const digits = s => String(s || '').replace(/[^0-9Xx]/g, '');
  const year4 = s => (String(s || '').match(/\d{4}/) || [null])[0];
  const esc2 = s => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');

  // ---------- netwerk met trace, retry en MusicBrainz-throttle ----------
  let trace = [];
  async function getJSON(url, name) {
    let lastErr;
    for (let i = 0; i < 2; i++) {
      try {
        const r = await fetch(url);
        if ((r.status === 503 || r.status === 429) && i === 0) { await sleep(1800); continue; }
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return await r.json();
      } catch (e) {
        lastErr = e instanceof TypeError ? new Error('geen verbinding / geblokkeerd (CORS)') : e;
        if (i === 0 && e instanceof TypeError) { await sleep(500); continue; }
        break;
      }
    }
    trace.push(`${name}: ${lastErr.message}`);
    throw lastErr;
  }
  let mbNext = 0;
  async function mbGet(url) {
    const now = Date.now();
    const wait = Math.max(0, mbNext - now);
    mbNext = Math.max(now, mbNext) + 1300;
    if (wait) await sleep(wait);
    return getJSON(url, 'MusicBrainz');
  }
  function imgOk(url, ms = 6000) {
    return new Promise(res => {
      const i = new Image();
      const t = setTimeout(() => res(false), ms);
      i.onload = () => { clearTimeout(t); res(true); };
      i.onerror = () => { clearTimeout(t); res(false); };
      i.src = url;
    });
  }
  const state = (card, ent) => { const s = card._hass?.states?.[ent]?.state; return s && !['unknown', 'unavailable'].includes(s) ? s : null; };
  const discogsToken = card => state(card, 'input_text.discogs_api_token');

  // ---------- Boeken ----------
  async function bookOL(isbn, title) {
    if (isbn) {
      const d = await getJSON(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`, 'OpenLibrary');
      const b = d['ISBN:' + isbn];
      if (!b) return null;
      return {
        title: b.title, year: year4(b.publish_date),
        creator: b.authors?.map(a => a.name).join(', ') || null,
        publisher: b.publishers?.[0]?.name || null,
        genre: b.subjects?.slice(0, 3).map(s => s.name || s).join(', ') || null,
        description: typeof b.description === 'object' ? b.description.value : b.description,
        cover_url: b.cover?.large || b.cover?.medium || null,
      };
    }
    const d = await getJSON(`https://openlibrary.org/search.json?title=${enc(title)}&limit=1&fields=title,author_name,first_publish_year,cover_i,publisher,subject`, 'OpenLibrary');
    const b = d.docs?.[0];
    if (!b) return null;
    return {
      title: b.title, year: b.first_publish_year ? String(b.first_publish_year) : null,
      creator: b.author_name?.slice(0, 3).join(', ') || null,
      publisher: b.publisher?.[0] || null,
      genre: b.subject?.slice(0, 3).join(', ') || null,
      cover_url: b.cover_i ? `https://covers.openlibrary.org/b/id/${b.cover_i}-L.jpg` : null,
    };
  }
  async function bookGoogle(isbn, title) {
    const q = isbn ? 'isbn:' + isbn : 'intitle:' + title;
    const d = await getJSON(`https://www.googleapis.com/books/v1/volumes?q=${enc(q)}&maxResults=1`, 'GoogleBooks');
    const v = d.items?.[0]?.volumeInfo;
    if (!v) return null;
    return {
      title: v.title + (v.subtitle ? ': ' + v.subtitle : ''), year: year4(v.publishedDate),
      creator: v.authors?.join(', ') || null, publisher: v.publisher || null,
      genre: v.categories?.slice(0, 3).join(', ') || null, description: v.description || null,
      cover_url: v.imageLinks?.thumbnail ? v.imageLinks.thumbnail.replace('http://', 'https://') : null,
    };
  }
  async function lookupBook(bc, title) {
    let m = null;
    try { m = await bookOL(bc || null, title); } catch (_) {}
    if (!m) { try { m = await bookGoogle(bc || null, title); } catch (_) {} }
    return m;
  }

  // ---------- Discogs ----------
  async function discogs(card, bc, title) {
    const tok = discogsToken(card);
    if (!tok) return null;
    const q = bc ? `barcode=${enc(bc)}` : `q=${enc(title)}`;
    const d = await getJSON(`https://api.discogs.com/database/search?${q}&type=release&per_page=3&token=${enc(tok)}`, 'Discogs');
    const r = d.results?.[0];
    if (!r) return null;
    const fmts = (r.format || []).join(' ');
    const parts = String(r.title || '').split(/\s+-\s+/);
    const artist = parts.length > 1 ? parts[0].replace(/\s*\(\d+\)$/, '') : null;
    const name = parts.length > 1 ? parts.slice(1).join(' - ') : parts[0];
    const isVideo = /dvd|blu-?ray|hd dvd|vhs|uhd/i.test(fmts);
    return {
      isVideo, name, artist, year: r.year ? String(r.year) : null,
      format: /4k|uhd|ultra hd/i.test(fmts) ? '4K UHD' : /blu-?ray/i.test(fmts) ? 'Blu-ray' : /dvd/i.test(fmts) ? 'DVD' :
        /vinyl|lp\b/i.test(fmts) ? 'Vinyl' : /\bcd\b/i.test(fmts) ? 'CD' : null,
      publisher: r.label?.[0] || null, genre: [...(r.genre || []), ...(r.style || [])].slice(0, 3).join(', ') || null,
      barcode: bc || r.barcode?.[0] || null,
    };
  }

  // ---------- Muziek ----------
  async function mb(query) {
    const d = await mbGet(`https://musicbrainz.org/ws/2/release/?query=${enc(query)}&fmt=json&limit=1`);
    const rel = d.releases?.[0];
    if (!rel) return null;
    const fmt = rel.media?.[0]?.format || '';
    const m = {
      title: rel.title, year: year4(rel.date),
      creator: rel['artist-credit']?.map(a => (a.name || a.artist?.name || '') + (a.joinphrase || '')).join('') || null,
      publisher: rel['label-info']?.[0]?.label?.name || null,
      barcode: rel.barcode || null,
      format: /vinyl|lp|12"|7"/i.test(fmt) ? 'Vinyl' : (/cd/i.test(fmt) ? 'CD' : null),
      cover_url: null,
    };
    const cu = `https://coverartarchive.org/release/${rel.id}/front-500`;
    if (await imgOk(cu)) m.cover_url = cu;
    return m;
  }
  async function lookupMusic(card, bc, title) {
    let m = null;
    try {
      if (bc) {
        const v = [bc];
        if (bc.length === 13 && bc[0] === '0') v.push(bc.slice(1));
        if (bc.length === 12) v.push('0' + bc);
        for (const x of v) { m = await mb('barcode:' + x); if (m) break; }
      } else {
        m = await mb('release:"' + title.replace(/"/g, '') + '"');
      }
    } catch (_) {}
    if (m) return m;
    try {
      const d = await discogs(card, bc, title);
      if (d && !d.isVideo) return { title: d.name, year: d.year, creator: d.artist, publisher: d.publisher, genre: d.genre, format: d.format, barcode: d.barcode };
    } catch (_) {}
    return null;
  }

  // ---------- Film / Serie ----------
  function mapOmdb(d) {
    const na = v => (v && v !== 'N/A' ? v : null);
    return {
      title: d.Title, year: year4(d.Year), creator: na(d.Director), genre: na(d.Genre), description: na(d.Plot),
      cover_url: na(d.Poster), runtime: na(d.Runtime), publisher: na(d.Production), _type: d.Type,
    };
  }
  async function omdb(key, title, type) {
    const base = `https://www.omdbapi.com/?apikey=${key}${type ? '&type=' + type : ''}`;
    let d = await getJSON(`${base}&t=${enc(title)}&plot=short`, 'OMDb');
    if (d.Response !== 'True') {
      if (/api key|limit/i.test(d.Error || '')) { trace.push('OMDb: ' + d.Error); throw new Error('OMDb: ' + d.Error); }
      const s = await getJSON(`${base}&s=${enc(title)}`, 'OMDb');
      if (s.Response !== 'True' || !s.Search?.length) return null;
      d = await getJSON(`https://www.omdbapi.com/?apikey=${key}&i=${s.Search[0].imdbID}&plot=short`, 'OMDb');
      if (d.Response !== 'True') return null;
    }
    return mapOmdb(d);
  }
  function cleanVideoTitle(raw) {
    let fmt = null;
    if (/4k|ultra\s*hd|uhd/i.test(raw)) fmt = '4K UHD';
    else if (/blu-?ray|\bbd\b/i.test(raw)) fmt = 'Blu-ray';
    else if (/dvd/i.test(raw)) fmt = 'DVD';
    const t = raw.replace(/\[[^\]]*\]|\([^)]*\)/g, ' ')
      .replace(/\b(4k|ultra\s*hd|uhd|blu-?ray|dvd|3d|steelbook|widescreen|full\s*screen|special edition|collector'?s edition|director'?s cut|extended edition|region\s*\w+|combo pack|digital copy|disc|bd)\b/gi, ' ')
      .replace(/[+\/|]/g, ' ').replace(/\s+/g, ' ').trim();
    return { title: t, format: fmt };
  }
  async function eanToVideoTitle(card, bc) {
    try {
      const d = await discogs(card, bc, null);
      if (d?.isVideo) { const c = cleanVideoTitle(d.name); return { raw: d.name, title: c.title, format: d.format || c.format, year: d.year, publisher: d.publisher, src: 'Discogs' }; }
    } catch (_) {}
    try {
      const d = await getJSON(`https://api.upcitemdb.com/prod/trial/lookup?upc=${bc}`, 'UPCitemdb');
      const it = d.items?.[0];
      if (it?.title) { const c = cleanVideoTitle(it.title); return { raw: it.title, title: c.title, format: c.format, image: it.images?.[0] || null, src: 'UPCitemdb' }; }
    } catch (_) {}
    return null;
  }
  async function lookupVideo(card, bc, title, cat) {
    const key = card._getOmdbKey();
    const type = cat === 'series' ? 'series' : null;
    if (!bc) {
      if (!key) throw new Error('OMDb API key ontbreekt (input_text.omdb_api_key)');
      return omdb(key, title, type);
    }
    const f = await eanToVideoTitle(card, bc);
    if (!f?.title) return null;
    let m = null;
    if (key) {
      for (const t of [f.title, f.title.split(/\s[-\u2013:]\s/)[0]]) {
        if (t) { try { m = await omdb(key, t, type); } catch (_) {} if (m) break; }
      }
    }
    if (!m) m = { title: f.title, year: f.year, publisher: f.publisher, partial: true, cover_url: f.image || null };
    if (f.format) m.format = f.format;
    return m;
  }

  // ---------- Dispatcher ----------
  P._lookupBarcode = async function (code) { return this._smartLookup(String(code || '').trim(), 'barcode'); };
  P._lookupByTitle = async function () {
    const t = this.shadowRoot.getElementById('f-title')?.value.trim();
    if (!t || t.length < 2) return;
    return this._smartLookup(t, 'title');
  };

  P._smartLookup = async function (q, mode) {
    const sr = this.shadowRoot;
    const msg = sr.getElementById('lookup-msg');
    const say = h => { if (msg) msg.innerHTML = h; };
    const chosen = sr.getElementById('f-cat')?.value || 'movie';
    const bc = mode === 'barcode' ? digits(q) : '';
    if (mode === 'barcode' && bc.length < 8) return;

    const key = mode + '|' + (bc || q) + '|' + chosen;
    if (this._lkKey === key && Date.now() - (this._lkAt || 0) < 3000) return; // dubbele trigger
    this._lkKey = key; this._lkAt = Date.now();
    const tok = (this._lkTok = (this._lkTok || 0) + 1);
    trace = [];
    say('<span class="spin"></span> Opzoeken…');

    const isIsbn = /^97[89]\d{10}$/.test(bc) || /^\d{9}[\dX]$/i.test(bc);
    const kind = c => (c === 'book' ? 'book' : c === 'cd' ? 'music' : 'video');
    let order = [];
    if (isIsbn) order.push('book');
    order.push(kind(chosen));
    ['video', 'music', 'book'].forEach(k => { if (!order.includes(k)) order.push(k); });
    if (mode === 'barcode' && !isIsbn) order = order.filter(k => k !== 'book');

    let meta = null, foundKind = null, fatal = null;
    for (const k of order) {
      say(`<span class="spin"></span> Opzoeken (${{ book: 'boeken', music: 'muziek', video: 'film' }[k]})…`);
      try {
        if (k === 'book') meta = await lookupBook(bc, q);
        else if (k === 'music') meta = await lookupMusic(this, bc, q);
        else meta = await lookupVideo(this, bc, q, chosen);
      } catch (e) { meta = null; if (k === kind(chosen)) fatal = e; }
      if (tok !== this._lkTok) return;
      if (meta) { foundKind = k; break; }
    }

    if (!meta) {
      const t = [...new Set(trace)].join(' · ');
      let hint = '';
      if (mode === 'barcode' && !isIsbn && !discogsToken(this)) hint = ' — tip: voeg een Discogs-token toe (input_text.discogs_api_token) voor DVD/Blu-ray/CD';
      say(`Niet gevonden${t ? ' (' + esc2(t) + ')' : ''}${esc2(hint)} — vul handmatig in`);
      return;
    }

    let cat = chosen;
    if (foundKind === 'book') cat = 'book';
    else if (foundKind === 'music') cat = 'cd';
    else if (cat !== 'movie' && cat !== 'series') cat = meta._type === 'series' ? 'series' : 'movie';
    const catEl = sr.getElementById('f-cat');
    if (catEl && catEl.value !== cat) { catEl.value = cat; this._setCreatorLabel(cat); }

    const overwrite = mode === 'barcode';
    const set = (id, v) => { const el = sr.getElementById(id); if (el && v && (overwrite || !el.value)) el.value = v; };
    const t = sr.getElementById('f-title'); if (t && meta.title) t.value = meta.title;
    set('f-year', meta.year); set('f-creator', meta.creator); set('f-genre', meta.genre); set('f-desc', meta.description);
    if (meta.barcode) { const b = sr.getElementById('f-bc'); if (b && !b.value) b.value = meta.barcode; }
    if (meta.format) { const f = sr.getElementById('f-fmt'); if (f && [...f.options].some(o => o.value === meta.format)) f.value = meta.format; }
    if (meta.cover_url) {
      this._pendingCoverUrl = meta.cover_url;
      const p = sr.getElementById('cover-preview');
      if (p) { p.src = meta.cover_url; p.classList.add('visible'); }
    }
    const label = { book: 'boek', music: 'muziek', video: 'film/serie' }[foundKind];
    say(meta.partial
      ? `✓ Titel gevonden: ${esc2(meta.title)} — geen extra metadata${trace.length ? ' (' + esc2([...new Set(trace)].join(' · ')) + ')' : ''}`
      : `✓ Gevonden (${label}): ${esc2(meta.title)}${meta.year ? ' (' + meta.year + ')' : ''}`);
  };

  // ---------- Titel zoeken in het formulier ----------
  const origOpen = P._openForm;
  P._openForm = function (id) {
    origOpen.call(this, id);
    const sr = this.shadowRoot;
    const t = sr.getElementById('f-title');
    if (!t) return;
    t.placeholder = 'Titel — druk Enter om te zoeken';
    t.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); this._lookupByTitle(); } });
    if (!id) t.addEventListener('change', () => { if (!sr.getElementById('f-bc')?.value) this._lookupByTitle(); });
  };

  // ---------- Scanner ----------
  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s);
    });
  }
  async function loadZXing() {
    if (window.ZXing) return;
    const urls = ['https://cdn.jsdelivr.net/npm/@zxing/library@0.18.6/umd/index.min.js', 'https://unpkg.com/@zxing/library@0.18.6/umd/index.min.js'];
    for (const u of urls) { try { await loadScript(u); if (window.ZXing) return; } catch (_) {} }
    throw new Error('zxing');
  }

  P._closeScan = function () {
    this._scanTok = (this._scanTok || 0) + 1;
    this.shadowRoot.getElementById('scanner-box')?.classList.remove('open');
    if (this._scanStream) { this._scanStream.getTracks().forEach(t => t.stop()); this._scanStream = null; }
    this._codeReader = null;
  };

  P._toggleScan = async function () {
    const sr = this.shadowRoot;
    const box = sr.getElementById('scanner-box');
    if (!box) return;
    if (box.classList.contains('open')) { this._closeScan(); return; }
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      this._toast('Camera werkt alleen via HTTPS — open HA via https://');
      return;
    }
    try {
      this._scanStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false,
      });
    } catch (e) {
      this._toast(e.name === 'NotAllowedError' ? 'Camera geblokkeerd — geef toestemming' : e.name === 'NotFoundError' ? 'Geen camera gevonden' : 'Camera fout: ' + e.name);
      return;
    }
    const vid = sr.getElementById('scanner-vid');
    vid.srcObject = this._scanStream;
    box.classList.add('open');
    try { await vid.play(); } catch (_) {}
    const tok = (this._scanTok = (this._scanTok || 0) + 1);
    const alive = () => this._scanStream && tok === this._scanTok;
    const onCode = text => {
      if (!alive()) return;
      try { navigator.vibrate?.(60); } catch (_) {}
      const el = sr.getElementById('f-bc'); if (el) el.value = text;
      this._closeScan();
      this._lookupBarcode(text);
    };
    const formats = ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128'];

    if ('BarcodeDetector' in window) {
      let det;
      try { det = new BarcodeDetector({ formats }); } catch (_) { det = new BarcodeDetector(); }
      const loop = async () => {
        if (!alive()) return;
        try { const r = await det.detect(vid); if (r.length) return onCode(r[0].rawValue); } catch (_) {}
        setTimeout(loop, 150);
      };
      loop();
      return;
    }

    try { await loadZXing(); }
    catch (_) { this._closeScan(); this._toast('Scanner-bibliotheek niet te laden — typ de barcode'); return; }
    const Z = window.ZXing;
    const reader = new Z.MultiFormatReader();
    const hints = new Map();
    hints.set(Z.DecodeHintType.POSSIBLE_FORMATS, [Z.BarcodeFormat.EAN_13, Z.BarcodeFormat.EAN_8, Z.BarcodeFormat.UPC_A, Z.BarcodeFormat.UPC_E, Z.BarcodeFormat.CODE_128]);
    hints.set(Z.DecodeHintType.TRY_HARDER, true);
    reader.setHints(hints);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const tick = () => {
      if (!alive()) return;
      if (vid.videoWidth) {
        canvas.width = vid.videoWidth; canvas.height = vid.videoHeight;
        ctx.drawImage(vid, 0, 0);
        try {
          const res = reader.decode(new Z.BinaryBitmap(new Z.HybridBinarizer(new Z.HTMLCanvasElementLuminanceSource(canvas))));
          return onCode(res.getText());
        } catch (_) {}
      }
      setTimeout(tick, 200);
    };
    tick();
  };

  // ---------- Opslaan met zichtbare foutmelding ----------
  P._save = async function () {
    const sr = this.shadowRoot;
    const v = id => sr.getElementById(id)?.value || null;
    const title = sr.getElementById('f-title')?.value.trim();
    if (!title) { this._toast('Vul een titel in'); return; }
    const payload = {
      category: v('f-cat'), title, year: v('f-year'), barcode: v('f-bc'), format: v('f-fmt'),
      box_location: v('f-loc'), creator: v('f-creator'), genre: v('f-genre'), description: v('f-desc'),
      cover_url: this._pendingCoverUrl || null,
    };
    try {
      if (this._editId) await this._api('PUT', `media/${this._editId}`, payload);
      else await this._api('POST', 'media', payload);
      const wasEdit = !!this._editId;
      this._closeDlg();
      this._toast(wasEdit ? 'Opgeslagen' : 'Toegevoegd');
      await this._load();
    } catch (e) {
      console.error('Mijn Collectie save error:', e, payload);
      this._toast('Opslaan mislukt: ' + (e?.message || e?.error || e?.body?.message || e?.status_code || 'onbekend'));
    }
  };

  console.info('Mijn Collectie patch v2 actief');
})();
