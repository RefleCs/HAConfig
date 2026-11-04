/**
 * Mijn Collectie — extras patch v1
 *  1. Categorie LP (tab, selectie, labels, teller)
 *  2. Nummerlijst voor CD's en LP's (MusicBrainz -> Discogs), getoond in het detailvenster
 * De nummers worden opgeslagen onderaan het veld Beschrijving (na de regel "--- Nummers ---"),
 * zodat de bestaande opslag ze zonder aanpassing bewaart.
 * Ongedaan maken: verwijder deze resource uit Dashboards > Resources.
 */
(async () => {
  await customElements.whenDefined('mijn-collectie-card');
  const P = customElements.get('mijn-collectie-card').prototype;
  if (P.__extrasV1) return;
  P.__extrasV1 = true;

  const enc = encodeURIComponent;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const esc = s => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const digits = s => String(s || '').replace(/[^0-9Xx]/g, '');
  const isMusic = c => ['cd', 'lp'].includes(String(c || '').toLowerCase());

  // ---------- opslagformaat in beschrijving ----------
  const MARK = '--- Nummers ---';
  const split = d => {
    const s = String(d || ''), i = s.indexOf(MARK);
    return i < 0 ? { text: s.trim(), tracks: '' } : { text: s.slice(0, i).trim(), tracks: s.slice(i + MARK.length).trim() };
  };
  const combine = (text, tracks) => [String(text || '').trim(), tracks ? MARK + '\n' + tracks : ''].filter(Boolean).join('\n\n');
  const countTracks = t => t.split('\n').filter(l => l.trim() && !l.startsWith('#')).length;

  // ---------- CSS ----------
  const CSS = `
    .mc-tracks { margin-top: 14px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px; }
    .mc-tr-title { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(255,255,255,0.38); margin-bottom: 6px; }
    .mc-tr { display: grid; grid-template-columns: 38px 1fr auto; gap: 8px; padding: 5px 0; font-size: 0.85rem; color: #f0ede8; border-bottom: 1px solid rgba(255,255,255,0.04); }
    .mc-tr .n, .mc-tr .t { color: rgba(255,255,255,0.4); font-variant-numeric: tabular-nums; }
    .mc-hd { margin: 12px 0 4px; font-size: 0.75rem; font-weight: 600; color: var(--c-accent, var(--primary-color, #c8a84b)); }
  `;
  const ensureStyle = card => {
    const sr = card.shadowRoot;
    if (sr.getElementById('mc-extras-style')) return;
    const s = document.createElement('style'); s.id = 'mc-extras-style'; s.textContent = CSS; sr.appendChild(s);
  };

  // ---------- LP-categorie ----------
  const LP = { label: 'LP', icon: '📀', creator: 'Artiest' };

  const origCounts = P._updateCounts;
  P._updateCounts = function () {
    origCounts.call(this);
    const sr = this.shadowRoot;
    const bar = sr.getElementById('chipbar');
    if (bar && !bar.querySelector('.chip[data-cat="lp"]')) {
      const chip = document.createElement('button');
      chip.className = 'chip'; chip.dataset.cat = 'lp';
      chip.innerHTML = `${LP.icon} LP's <span class="cnt" id="c-lp">0</span>`;
      const cd = bar.querySelector('.chip[data-cat="cd"]');
      cd ? cd.after(chip) : bar.insertBefore(chip, bar.querySelector('.spacer'));
    }
    const c = sr.getElementById('c-lp');
    if (c) c.textContent = this._items.filter(i => i.category?.toLowerCase() === 'lp').length;
  };

  const origRender = P._renderItems;
  P._renderItems = function () {
    origRender.call(this);
    const sr = this.shadowRoot;
    this._filtered.filter(i => i.category?.toLowerCase() === 'lp').forEach(i => {
      const el = sr.querySelector(`#content [data-id="${CSS_escape(i.id)}"]`);
      if (!el) return;
      const b = el.querySelector('.g-badge'); if (b) b.textContent = LP.label;
      const c = el.querySelector('.lc.cat'); if (c) c.textContent = `${LP.icon} ${LP.label}`;
      el.querySelectorAll('.g-ph .ico, .l-thumb-ph').forEach(x => { if (x.textContent.trim() === '📦') x.textContent = LP.icon; });
    });
  };
  const CSS_escape = s => (window.CSS && CSS.escape ? CSS.escape(String(s)) : String(s).replace(/"/g, '\\"'));

  const origLabel = P._setCreatorLabel;
  P._setCreatorLabel = function (cat) {
    origLabel.call(this, cat);
    if (cat === 'lp') { const el = this.shadowRoot.getElementById('lbl-creator'); if (el) el.textContent = LP.creator; }
  };

  // ---------- Formulier ----------
  const origOpen = P._openForm;
  P._openForm = function (id) {
    origOpen.call(this, id);
    ensureStyle(this);
    const sr = this.shadowRoot;
    const item = id ? this._items.find(i => i.id === id) : null;
    const sel = sr.getElementById('f-cat');
    if (sel && !sel.querySelector('option[value="lp"]')) {
      const o = document.createElement('option'); o.value = 'lp'; o.textContent = LP.label;
      const cd = sel.querySelector('option[value="cd"]');
      cd ? cd.after(o) : sel.appendChild(o);
    }
    if (sel && item?.category?.toLowerCase() === 'lp') { sel.value = 'lp'; this._setCreatorLabel('lp'); }
    sel?.addEventListener('change', () => {
      const f = sr.getElementById('f-fmt');
      if (sel.value === 'lp' && f && !f.value) f.value = 'Vinyl';
    });
    const ta = sr.getElementById('f-desc');
    if (ta) {
      ta.style.minHeight = '150px';
      const lbl = ta.closest('.form-field')?.querySelector('label');
      if (lbl) lbl.textContent = 'Beschrijving / nummers';
    }
  };

  // ---------- Nummers ophalen ----------
  let mbNext = 0;
  async function mbJSON(url) {
    const now = Date.now();
    const wait = Math.max(0, mbNext - now);
    mbNext = Math.max(now, mbNext) + 1400;
    if (wait) await sleep(wait);
    for (let i = 0; i < 3; i++) {
      const r = await fetch(url);
      if (r.status === 503 || r.status === 429) { await sleep(2000 * (i + 1)); continue; }
      if (!r.ok) throw new Error('MusicBrainz HTTP ' + r.status);
      return r.json();
    }
    throw new Error('MusicBrainz HTTP 503');
  }
  const mmss = ms => { const s = Math.round(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };

  function fmtMb(media) {
    const out = [], multi = media.length > 1;
    media.forEach((m, i) => {
      if (multi) out.push(`# ${m.format || 'Disc'} ${m.position || i + 1}${m.title ? ' – ' + m.title : ''}`);
      (m.tracks || []).forEach(t => out.push(`${t.number || t.position}. ${t.title}${t.length ? ` (${mmss(t.length)})` : ''}`));
    });
    return out.join('\n');
  }
  async function tracksMusicBrainz(bc, title, artist) {
    const queries = [];
    if (bc) {
      queries.push('barcode:' + bc);
      if (bc.length === 13 && bc[0] === '0') queries.push('barcode:' + bc.slice(1));
      if (bc.length === 12) queries.push('barcode:0' + bc);
    }
    if (title) queries.push(`release:"${title.replace(/"/g, '')}"` + (artist ? ` AND artist:"${artist.replace(/"/g, '')}"` : ''));
    for (const q of queries) {
      const s = await mbJSON(`https://musicbrainz.org/ws/2/release/?query=${enc(q)}&fmt=json&limit=1`);
      const rel = s.releases?.[0];
      if (!rel) continue;
      const d = await mbJSON(`https://musicbrainz.org/ws/2/release/${rel.id}?inc=recordings&fmt=json`);
      const t = fmtMb(d.media || []);
      if (t) return t;
    }
    return null;
  }

  async function tracksDiscogs(card, bc, title, artist) {
    const tok = card._hass?.states?.['input_text.discogs_api_token']?.state;
    if (!tok || ['unknown', 'unavailable'].includes(tok)) return null;
    const q = bc ? `barcode=${enc(bc)}` : `q=${enc([artist, title].filter(Boolean).join(' '))}`;
    const s = await (await fetch(`https://api.discogs.com/database/search?${q}&type=release&per_page=1&token=${enc(tok)}`)).json();
    const id = s.results?.[0]?.id;
    if (!id) return null;
    const d = await (await fetch(`https://api.discogs.com/releases/${id}?token=${enc(tok)}`)).json();
    const lines = []; let n = 0;
    const add = t => { n++; lines.push(`${t.position || n}. ${t.title}${t.duration ? ` (${t.duration})` : ''}`); };
    (d.tracklist || []).forEach(t => {
      if (t.type_ === 'heading') lines.push('# ' + t.title);
      else if (t.sub_tracks?.length) t.sub_tracks.forEach(add);
      else if (t.type_ === 'track' || !t.type_) add(t);
    });
    return lines.join('\n') || null;
  }

  async function fetchTracks(card, bc, title, artist) {
    bc = digits(bc);
    let t = null;
    try { t = await tracksMusicBrainz(bc, title, artist); } catch (_) {}
    if (!t) { try { t = await tracksDiscogs(card, bc, title, artist); } catch (_) {} }
    return t;
  }

  // automatisch na een geslaagde lookup in het formulier
  async function waitFor(fn, ms = 8000) {
    const t0 = Date.now();
    while (!fn()) { if (Date.now() - t0 > ms) return false; await sleep(50); }
    return true;
  }
  if (await waitFor(() => P.__patchV2)) {
    const origLk = P._smartLookup;
    P._smartLookup = async function (q, mode) {
      const sr = this.shadowRoot;
      const sel = sr.getElementById('f-cat');
      const wasLp = sel?.value === 'lp';
      if (wasLp) sel.value = 'cd'; // zodat de muziekbronnen gebruikt worden
      await origLk.call(this, q, mode);
      const msg = sr.getElementById('lookup-msg');
      const found = msg?.textContent.startsWith('✓');
      if (sel && found && (wasLp || (sel.value === 'cd' && sr.getElementById('f-fmt')?.value === 'Vinyl'))) {
        sel.value = 'lp'; this._setCreatorLabel('lp');
      }
      if (sel && !found && wasLp) sel.value = 'lp';
      if (!found || !isMusic(sel?.value)) return;
      const ta = sr.getElementById('f-desc');
      if (!ta || ta.value.includes(MARK)) return;
      const key = digits(sr.getElementById('f-bc')?.value) + '|' + sr.getElementById('f-title')?.value;
      if (this._trKey === key && Date.now() - (this._trAt || 0) < 5000) return;
      this._trKey = key; this._trAt = Date.now();
      mbNext = Math.max(mbNext, Date.now() + 1300);
      const base = msg.textContent;
      msg.innerHTML = `${esc(base)} · <span class="spin"></span> nummers ophalen…`;
      const t = await fetchTracks(this, sr.getElementById('f-bc')?.value, sr.getElementById('f-title')?.value, sr.getElementById('f-creator')?.value);
      if (!sr.getElementById('f-desc')) return; // dialoog inmiddels gesloten
      if (t) {
        ta.value = combine(split(ta.value).text, t);
        msg.textContent = `${base} · ${countTracks(t)} nummers`;
      } else {
        msg.textContent = `${base} · geen nummers gevonden`;
      }
    };
  }

  // ---------- Detailvenster ----------
  function renderTracks(text) {
    const rows = text.split('\n').map(l => l.trim()).filter(Boolean).map(l => {
      if (l.startsWith('#')) return `<div class="mc-hd">${esc(l.replace(/^#\s*/, ''))}</div>`;
      const m = l.match(/^([A-Za-z]?\d+(?:[-.]\d+)?[A-Za-z]?)\.\s+(.*?)(?:\s+\((\d+:\d{2}(?::\d{2})?)\))?$/);
      return m
        ? `<div class="mc-tr"><span class="n">${esc(m[1])}</span><span>${esc(m[2])}</span><span class="t">${esc(m[3] || '')}</span></div>`
        : `<div class="mc-tr"><span class="n"></span><span>${esc(l)}</span><span></span></div>`;
    });
    return `<div class="mc-tracks"><div class="mc-tr-title">Nummers (${countTracks(text)})</div>${rows.join('')}</div>`;
  }

  const origDetail = P._openDetail;
  P._openDetail = function (id) {
    origDetail.call(this, id);
    ensureStyle(this);
    const item = this._items.find(i => i.id === id);
    const dlg = this.shadowRoot.getElementById('dlg');
    if (!item || !dlg) return;
    if (item.category?.toLowerCase() === 'lp') {
      dlg.querySelectorAll('.det-fld').forEach(f => {
        const l = f.querySelector('label'), s = f.querySelector('span');
        if (l?.textContent === 'Categorie' && s) s.textContent = LP.label;
        if (l?.textContent === 'Maker') l.textContent = LP.creator;
      });
    }
    const { text, tracks } = split(item.description);
    const desc = dlg.querySelector('.det-desc');
    if (desc) { text ? (desc.textContent = text) : desc.remove(); }
    const body = dlg.querySelector('.dlg-body');
    if (tracks && body) body.insertAdjacentHTML('beforeend', renderTracks(tracks));
    else if (isMusic(item.category)) {
      const foot = dlg.querySelector('#dlg-foot');
      const btn = document.createElement('button');
      btn.className = 'dbtn ghost'; btn.textContent = '🎵 Nummers ophalen';
      btn.addEventListener('click', async () => {
        btn.disabled = true; btn.textContent = 'Zoeken…';
        mbNext = Math.max(mbNext, Date.now());
        const t = await fetchTracks(this, item.barcode, item.title, item.creator);
        if (!t) { btn.disabled = false; btn.textContent = '🎵 Nummers ophalen'; this._toast('Geen nummers gevonden'); return; }
        try {
          await this._api('PUT', `media/${id}`, { ...item, description: combine(text, t) });
          await this._load();
          this._openDetail(id);
        } catch (e) {
          btn.disabled = false; btn.textContent = '🎵 Nummers ophalen';
          this._toast('Opslaan mislukt: ' + (e?.message || e?.error || 'onbekend'));
        }
      });
      foot?.insertBefore(btn, foot.firstChild);
    }
  };

  console.info('Mijn Collectie extras patch v1 actief');
})();
