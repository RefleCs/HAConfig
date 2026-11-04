/**
 * Mijn Collectie — Lovelace Custom Card v6
 * Geen backend — alles via HA storage API
 *
 * Dashboard YAML:
 *   type: custom:mijn-collectie-card
 *   omdb_entity: input_text.omdb_api_key
 *
 * Vereisten:
 *   - input_text helper aangemaakt met naam omdb_api_key
 *   - Netwerkopslag "mijn_collectie" gemount als Media in HA
 */

const CAT_META = {
  movie:  { label: 'Film',   icon: '🎥', creator: 'Regisseur' },
  series: { label: 'Serie',  icon: '📺', creator: 'Regisseur' },
  book:   { label: 'Boek',   icon: '📚', creator: 'Auteur'    },
  cd:     { label: 'CD',     icon: '💿', creator: 'Artiest'   },
  other:  { label: 'Overig', icon: '📦', creator: 'Maker'     },
};
function cm(cat) { return CAT_META[(cat||'').toLowerCase()] || CAT_META.other; }
function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
const STORAGE_KEY = 'mijn_collectie_v6_cache';
const TPL = document.createElement('template');
TPL.innerHTML = `
<style>
  :host { display: block; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  #root {
    position: relative;
    background: transparent;
    border-radius: var(--ha-card-border-radius, 12px);
    border: none;
    box-shadow: none;
    font-family: var(--mdc-typography-font-family, Roboto, sans-serif);
    font-size: 0.875rem;
    color: var(--primary-text-color);
    min-height: 400px;
    display: flex;
    flex-direction: column;
  }

  .topbar {
    display: flex; align-items: center; gap: 12px;
    padding: 0 4px 14px; flex-shrink: 0; flex-wrap: wrap;
  }
  .app-title {
    font-size: 1.1rem; font-weight: 700; letter-spacing: 0.05em;
    color: var(--primary-text-color); white-space: nowrap; text-transform: uppercase;
  }
  .app-title span { color: var(--c-accent, var(--primary-color, #c8a84b)); }

  .search-wrap { flex: 1; min-width: 160px; position: relative; }
  .search-wrap svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--secondary-text-color); pointer-events: none; opacity: 0.6; }
  .search {
    width: 100%; height: 38px; padding: 0 12px 0 36px;
    background: rgba(255,255,255,0.1); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.15); border-radius: 20px;
    color: var(--primary-text-color); font-family: inherit; font-size: 0.875rem;
    outline: none; transition: border-color 0.15s;
  }
  .search:focus { background: rgba(255,255,255,0.15); border-color: var(--c-accent, var(--primary-color, #c8a84b)); }
  .search::placeholder { color: var(--secondary-text-color); opacity: 0.6; }

  .loc-wrap { position: relative; }
  .loc-sel {
    height: 38px; padding: 0 32px 0 14px;
    background: rgba(255,255,255,0.1); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.15); border-radius: 20px;
    color: var(--primary-text-color); font-family: inherit; font-size: 0.8125rem;
    outline: none; appearance: none; cursor: pointer;
  }
  .loc-wrap svg { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; opacity: 0.5; color: var(--primary-text-color); }

  .btn-add {
    height: 38px; padding: 0 18px;
    background: var(--c-accent, var(--primary-color, #c8a84b));
    color: var(--text-primary-color, #fff); border: none; border-radius: 20px;
    font-family: inherit; font-size: 0.875rem; font-weight: 600;
    cursor: pointer; white-space: nowrap; display: flex; align-items: center; gap: 6px;
    transition: opacity 0.15s; flex-shrink: 0;
  }
  .btn-add:hover { opacity: 0.85; }

  .chipbar {
    display: flex; align-items: center; gap: 6px;
    padding: 0 4px 12px; overflow-x: auto; flex-shrink: 0; scrollbar-width: none;
  }
  .chipbar::-webkit-scrollbar { display: none; }
  .chip {
    display: inline-flex; align-items: center; gap: 5px;
    height: 32px; padding: 0 14px; border-radius: 16px;
    background: rgba(255,255,255,0.08); backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.12);
    color: var(--secondary-text-color); font-family: inherit; font-size: 0.8125rem;
    font-weight: 500; cursor: pointer; white-space: nowrap; user-select: none;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }
  .chip:hover { background: rgba(255,255,255,0.14); color: var(--primary-text-color); }
  .chip.active {
    background: var(--c-accent, var(--primary-color, #c8a84b));
    border-color: var(--c-accent, var(--primary-color, #c8a84b));
    color: var(--text-primary-color, #fff);
  }
  .chip .cnt { font-size: 0.7rem; font-family: monospace; opacity: 0.7; }
  .chip.active .cnt { opacity: 0.85; }
  .spacer { flex: 1; }
  .view-btns { display: flex; gap: 4px; flex-shrink: 0; }
  .vbtn {
    width: 32px; height: 32px; background: rgba(255,255,255,0.08);
    backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,0.12);
    border-radius: 8px; color: var(--secondary-text-color); cursor: pointer;
    display: flex; align-items: center; justify-content: center; font-size: 14px;
    transition: background 0.12s, color 0.12s;
  }
  .vbtn.active {
    background: var(--c-accent, var(--primary-color, #c8a84b));
    border-color: var(--c-accent, var(--primary-color, #c8a84b));
    color: var(--text-primary-color, #fff);
  }

  .count-bar { font-size: 0.75rem; color: var(--secondary-text-color); opacity: 0.6; padding: 0 4px 10px; flex-shrink: 0; }

  .content { flex: 1; overflow-y: auto; padding: 0 2px 8px; }
  .content::-webkit-scrollbar { width: 4px; }
  .content::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }

  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 14px; }
  .g-card {
    background: rgba(255,255,255,0.07); backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
    overflow: hidden; cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
  }
  .g-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); border-color: rgba(255,255,255,0.2); }
  .g-cover { aspect-ratio: 2/3; position: relative; overflow: hidden; background: rgba(0,0,0,0.2); }
  .g-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .g-ph { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: var(--secondary-text-color); opacity: 0.5; }
  .g-ph .ico { font-size: 32px; }
  .g-ph .ttl { font-size: 10px; text-align: center; padding: 0 8px; line-height: 1.3; }
  .g-badge { position: absolute; top: 7px; left: 7px; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; padding: 3px 7px; border-radius: 10px; background: rgba(0,0,0,0.55); backdrop-filter: blur(4px); color: #fff; }
  .g-info { padding: 9px 10px 11px; }
  .g-title { font-size: 0.8125rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--primary-text-color); }
  .g-sub { font-size: 0.75rem; color: var(--secondary-text-color); opacity: 0.7; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .g-loc { font-size: 0.7rem; margin-top: 5px; color: var(--c-accent, var(--primary-color, #c8a84b)); font-family: monospace; }

  .list { display: flex; flex-direction: column; gap: 2px; }
  .l-head, .l-row { display: grid; grid-template-columns: 38px 1fr 70px 56px 110px 32px; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 8px; }
  .l-head { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.8px; color: var(--secondary-text-color); opacity: 0.5; font-weight: 600; padding-bottom: 4px; }
  .l-row { background: rgba(255,255,255,0.05); backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,0.06); cursor: pointer; transition: background 0.12s; }
  .l-row:hover { background: rgba(255,255,255,0.1); }
  .l-thumb { width: 30px; height: 45px; object-fit: cover; border-radius: 4px; display: block; }
  .l-thumb-ph { width: 30px; height: 45px; background: rgba(255,255,255,0.08); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; }
  .lc { font-size: 0.8125rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--primary-text-color); }
  .lc.bold { font-weight: 500; }
  .lc.muted { color: var(--secondary-text-color); opacity: 0.6; font-size: 0.75rem; }
  .lc.accent { color: var(--c-accent, var(--primary-color, #c8a84b)); font-family: monospace; font-size: 0.75rem; }
  .lc.cat { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; color: var(--secondary-text-color); opacity: 0.7; }
  .edit-btn { background: none; border: none; cursor: pointer; color: var(--secondary-text-color); font-size: 14px; padding: 4px; border-radius: 50%; opacity: 0.4; transition: opacity 0.12s, background 0.12s; }
  .edit-btn:hover { opacity: 1; background: rgba(255,255,255,0.1); }

  .empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 20px; gap: 10px; color: var(--secondary-text-color); opacity: 0.4; }
  .empty .ico { font-size: 44px; }
  .empty .txt { font-size: 0.875rem; text-align: center; }

  .overlay {
    display: none; position: absolute; inset: 0;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
    z-index: 10; align-items: flex-start; justify-content: center;
    padding: 20px 16px; overflow-y: auto;
    border-radius: var(--ha-card-border-radius, 12px);
  }
  .overlay.open { display: flex; }

  .dlg {
    background: rgba(30,30,40,0.92); backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.15); border-radius: 16px;
    width: 100%; max-width: 520px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.6); overflow: hidden; color: #f0ede8;
  }
  .dlg-head { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px 14px; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .dlg-head h3 { font-size: 1rem; font-weight: 600; letter-spacing: 0.01em; color: #f0ede8; }
  .dlg-x { background: none; border: none; cursor: pointer; color: rgba(255,255,255,0.45); font-size: 20px; line-height: 1; padding: 4px 6px; border-radius: 6px; transition: background 0.12s, color 0.12s; }
  .dlg-x:hover { background: rgba(255,255,255,0.1); color: #fff; }
  .dlg-body { padding: 16px 20px 8px; }
  .dlg-foot { padding: 12px 20px 18px; display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; border-top: 1px solid rgba(255,255,255,0.08); margin-top: 8px; }

  .form-field { margin-bottom: 14px; }
  .form-field label { display: block; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: rgba(255,255,255,0.45); margin-bottom: 5px; }
  .form-field input, .form-field select, .form-field textarea {
    width: 100%; padding: 9px 12px;
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.14);
    border-radius: 8px; color: #f0ede8; font-family: inherit; font-size: 0.9rem;
    outline: none; transition: border-color 0.15s; appearance: none;
  }
  .form-field input:focus, .form-field select:focus, .form-field textarea:focus { border-color: var(--c-accent, var(--primary-color, #c8a84b)); background: rgba(255,255,255,0.1); }
  .form-field input::placeholder { color: rgba(255,255,255,0.25); }
  .form-field textarea { resize: vertical; min-height: 70px; line-height: 1.5; }
  .form-field select option { background: #1e1e28; color: #f0ede8; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .form-row.full { grid-template-columns: 1fr; }

  .bc-row { display: flex; gap: 8px; align-items: flex-end; }
  .bc-row .form-field { flex: 1; margin-bottom: 0; }
  .scan-btn { height: 38px; width: 40px; flex-shrink: 0; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.14); border-radius: 8px; color: rgba(255,255,255,0.6); font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; transition: border-color 0.15s, color 0.15s; }
  .scan-btn:hover { border-color: var(--c-accent, var(--primary-color, #c8a84b)); color: var(--c-accent, var(--primary-color, #c8a84b)); }
  .scanner-box { display: none; border-radius: 8px; overflow: hidden; margin-bottom: 14px; position: relative; aspect-ratio: 4/3; background: #000; }
  .scanner-box.open { display: block; }
  .scanner-vid { width: 100%; height: 100%; object-fit: cover; display: block; }
  .scan-line { position: absolute; left: 8%; right: 8%; height: 2px; background: var(--c-accent, var(--primary-color, #c8a84b)); box-shadow: 0 0 6px var(--c-accent, var(--primary-color, #c8a84b)); animation: scanAnim 2s ease-in-out infinite; }
  .scan-close { position: absolute; top: 6px; right: 6px; background: rgba(0,0,0,0.6); border: none; color: #fff; border-radius: 5px; padding: 2px 8px; cursor: pointer; font-size: 14px; }
  .lookup-msg { font-size: 0.75rem; color: var(--c-accent, var(--primary-color, #c8a84b)); min-height: 16px; margin: 6px 0 10px; }
  .cover-preview { width: 80px; height: 120px; object-fit: cover; border-radius: 6px; margin-bottom: 14px; display: none; float: right; margin-left: 12px; }
  .cover-preview.visible { display: block; }

  .det-cover { width: 100%; max-height: 220px; object-fit: cover; border-radius: 8px; margin-bottom: 14px; display: block; }
  .det-cover.hidden { display: none; }
  .det-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px; margin-bottom: 14px; }
  .det-fld label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(255,255,255,0.38); display: block; margin-bottom: 2px; }
  .det-fld span { font-size: 0.875rem; color: #f0ede8; }
  .det-desc { font-size: 0.875rem; line-height: 1.65; color: rgba(255,255,255,0.55); }

  .dbtn { height: 36px; padding: 0 18px; border-radius: 8px; font-family: inherit; font-size: 0.875rem; font-weight: 500; cursor: pointer; border: none; transition: opacity 0.15s; }
  .dbtn.primary { background: var(--c-accent, var(--primary-color, #c8a84b)); color: #000; }
  .dbtn.primary:hover { opacity: 0.85; }
  .dbtn.ghost { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.8); border: 1px solid rgba(255,255,255,0.15); }
  .dbtn.ghost:hover { background: rgba(255,255,255,0.14); }
  .dbtn.danger { background: rgba(220,50,40,0.12); color: #ff6b5b; border: 1px solid rgba(220,50,40,0.25); margin-right: auto; }
  .dbtn.danger:hover { background: rgba(220,50,40,0.22); }

  .toast { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%) translateY(60px); background: rgba(20,20,28,0.92); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.12); color: #f0ede8; padding: 8px 20px; border-radius: 20px; font-size: 0.8125rem; z-index: 20; pointer-events: none; transition: transform 0.2s ease; box-shadow: 0 4px 16px rgba(0,0,0,0.4); white-space: nowrap; }
  .toast.show { transform: translateX(-50%) translateY(0); }

  .spin { display: inline-block; width: 11px; height: 11px; border: 2px solid rgba(255,255,255,0.15); border-top-color: var(--c-accent, var(--primary-color, #c8a84b)); border-radius: 50%; animation: spinAnim 0.7s linear infinite; vertical-align: middle; }

  @keyframes scanAnim { 0%,100% { top: 18%; } 50% { top: 74%; } }
  @keyframes spinAnim { to { transform: rotate(360deg); } }
</style>

<div id="root">
  <div class="topbar">
    <span class="app-title" id="app-title">Mijn<span>Collectie</span></span>
    <div class="search-wrap">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.5"/>
        <path d="M9.5 9.5L13 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <input class="search" id="search" type="text" placeholder="Zoeken in collectie...">
    </div>
    <div class="loc-wrap">
      <select class="loc-sel" id="loc-sel"><option value="">Alle dozen</option></select>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>
    </div>
    <button class="btn-add" id="btn-add">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 2a1 1 0 011 1v3h3a1 1 0 110 2H8v3a1 1 0 11-2 0V8H3a1 1 0 110-2h3V3a1 1 0 011-1z"/></svg>
      Toevoegen
    </button>
    <button id="btn-import" style="height:38px;padding:0 14px;background:rgba(255,255,255,0.1);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);border-radius:20px;color:var(--primary-text-color);font-family:inherit;font-size:0.875rem;cursor:pointer;white-space:nowrap;display:flex;align-items:center;gap:6px;flex-shrink:0;">
      📥 XML
    </button>
  </div>

  <div class="chipbar" id="chipbar">
    <button class="chip active" data-cat="">Alles <span class="cnt" id="c-all">0</span></button>
    <button class="chip" data-cat="movie">🎥 Films <span class="cnt" id="c-movie">0</span></button>
    <button class="chip" data-cat="series">📺 Series <span class="cnt" id="c-series">0</span></button>
    <button class="chip" data-cat="book">📚 Boeken <span class="cnt" id="c-book">0</span></button>
    <button class="chip" data-cat="cd">💿 CD's <span class="cnt" id="c-cd">0</span></button>
    <div class="spacer"></div>
    <div class="view-btns">
      <button class="vbtn active" id="vbtn-grid" title="Raster">⊞</button>
      <button class="vbtn" id="vbtn-list" title="Lijst">☰</button>
    </div>
  </div>

  <div class="count-bar" id="count-bar"></div>
  <div class="content" id="content"></div>

  <div class="overlay" id="overlay">
    <div class="dlg" id="dlg"></div>
  </div>
  <div class="toast" id="toast"></div>
</div>
`;

class MijnCollectieCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(TPL.content.cloneNode(true));
    this._items = [];
    this._filtered = [];
    this._cat = '';
    this._q = '';
    this._loc = '';
    this._view = 'grid';
    this._editId = null;
    this._hass = null;
    this._config = {};
    this._ready = false;
    this._scanStream = null;
    this._codeReader = null;
    this._bcTimer = null;
    this._toastTimer = null;
    this._pendingCoverUrl = null;
  }

  connectedCallback() {
    if (this._ready && this._hass && !this._setupDone) {
      setTimeout(() => this._setup(), 0);
    }
  }

  setConfig(config) {
    this._config = config;
    this._ready = true;
    if (this.isConnected) this._setup();
  }

  set hass(hass) {
    const wasNull = !this._hass;
    this._hass = hass;
    if (wasNull && this._ready && !this._setupDone) {
      // Use setTimeout to ensure the element is fully initialized
      setTimeout(() => this._setup(), 0);
    }
  }

  getCardSize() { return 8; }
  static getStubConfig() { return { omdb_entity: 'input_text.omdb_api_key', media_share: 'mijn_collectie' }; }
  static getConfigElement() { return document.createElement('mijn-collectie-card-editor'); }

  // ---- Storage via shell_command (cross-device via NAS share) ----
  // Primary: JSON file on NAS share via HA shell_command service
  // Fallback: localStorage (per-browser cache)

  async _loadFromStorage() {
    // Try HA persistent_notification state trick to read file
    try {
      const result = await this._hass.callWs({
        type: 'call_service',
        domain: 'shell_command',
        service: 'load_mijn_collectie',
        return_response: true,
      });
      if (result?.response?.stdout) {
        const data = JSON.parse(result.response.stdout);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(_) {}
        return data;
      }
    } catch(_) {}
    // Fallback: localStorage cache
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch(_) {}
    return [];
  }

  async _saveToStorage(items) {
    const json = JSON.stringify(items);
    // Always save to localStorage immediately
    try { localStorage.setItem(STORAGE_KEY, json); } catch(_) {}
    // Save to NAS via shell_command
    try {
      // Escape single quotes in JSON for shell safety
      const escaped = json.replace(/'/g, "'\''");
      await this._hass.callService('shell_command', 'save_mijn_collectie', {
        data: escaped,
      });
      return true;
    } catch(e) {
      console.warn('Mijn Collectie: shell_command save failed', e);
      return true; // localStorage succeeded
    }
  }


  // ---- API bridge (calls custom integration endpoints) ----
  async _api(method, path, body) {
    if (!this._hass) throw new Error('Home Assistant (hass) is not available');
    const p = String(path || '').replace(/^\/+/, '');
    const full = p.startsWith('mijn_collectie/') ? p : `mijn_collectie/${p}`;

    // hass.callApi prefixes /api and adds auth automatically
    const m = String(method || 'GET').toUpperCase();
    if (m === 'GET' || m === 'DELETE') {
      return await this._hass.callApi(m, full);
    }
    return await this._hass.callApi(m, full, body || {});
  }
  // ---- Setup ----
  _setup() {
    if (!this._hass || this._setupDone) return;
    this._setupDone = true;

    // Apply config
    const sr = this.shadowRoot;
    const root = sr.getElementById('root');
    if (this._config.accent_color) root.style.setProperty('--c-accent', this._config.accent_color);
    if (this._config.title) {
      const t = sr.getElementById('app-title');
      const half = Math.ceil(this._config.title.length / 2);
      t.innerHTML = `${esc(this._config.title.slice(0, half))}<span>${esc(this._config.title.slice(half))}</span>`;
    }
    if (this._config.columns > 0) {
      const s = document.createElement('style');
      s.textContent = `.grid { grid-template-columns: repeat(${this._config.columns}, 1fr) !important; }`;
      sr.appendChild(s);
    }

    sr.getElementById('search').addEventListener('input', e => { this._q = e.target.value; this._filter(); });
    sr.getElementById('loc-sel').addEventListener('change', e => { this._loc = e.target.value; this._filter(); });
    sr.getElementById('btn-add').addEventListener('click', () => this._openForm(null));
    sr.getElementById('btn-import')?.addEventListener('click', () => this._openImportDialog());
    sr.getElementById('vbtn-grid').addEventListener('click', () => this._setView('grid'));
    sr.getElementById('vbtn-list').addEventListener('click', () => this._setView('list'));
    sr.getElementById('chipbar').addEventListener('click', e => {
      const chip = e.target.closest('.chip[data-cat]');
      if (!chip) return;
      sr.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      this._cat = chip.dataset.cat;
      this._filter();
    });
    sr.getElementById('overlay').addEventListener('click', e => {
      if (e.target === sr.getElementById('overlay')) this._closeDlg();
    });

    this._load();
  }

  async _load() {
    try {
      this._items = await this._api('GET', 'media');
      if (!Array.isArray(this._items)) this._items = [];
    } catch(e) {
      console.error('Mijn Collectie _load error:', e, typeof e, JSON.stringify(e));
      this._items = [];
      const content = this.shadowRoot.getElementById('content');
      if (content) content.innerHTML =
        `<div class="empty"><div class="ico">⚠️</div><div class="txt">Kan API niet bereiken<br><small>${String(e?.message || e?.error || e?.status_code || 'onbekend')}</small></div></div>`;
      return;
    }
    this._updateCounts();
    this._updateLocations();
    this._filter();
  }

  _updateCounts() {
    this.shadowRoot.getElementById('c-all').textContent = this._items.length;
    ['movie','series','book','cd'].forEach(c => {
      const el = this.shadowRoot.getElementById(`c-${c}`);
      if (el) el.textContent = this._items.filter(i => i.category?.toLowerCase() === c).length;
    });
  }

  _updateLocations() {
    const locs = [...new Set(this._items.map(i => i.box_location).filter(Boolean))].sort();
    const sel = this.shadowRoot.getElementById('loc-sel');
    const current = sel.value;
    sel.innerHTML = '<option value="">Alle dozen</option>' +
      locs.map(l => `<option value="${esc(l)}" ${l === current ? 'selected' : ''}>${esc(l)}</option>`).join('');
    // Also refresh datalist in form if open
    const dl = this.shadowRoot.getElementById('loc-dl');
    if (dl) dl.innerHTML = locs.map(l => `<option value="${esc(l)}">`).join('');
  }

  _filter() {
    const q = this._q.toLowerCase();
    this._filtered = this._items.filter(item => {
      if (this._cat && item.category?.toLowerCase() !== this._cat) return false;
      if (q && !item.title?.toLowerCase().includes(q)) return false;
      if (this._loc && item.box_location?.toLowerCase() !== this._loc.toLowerCase()) return false;
      return true;
    });
    this.shadowRoot.getElementById('count-bar').textContent =
      `${this._filtered.length} item${this._filtered.length !== 1 ? 's' : ''}`;
    this._renderItems();
  }

  _setView(v) {
    this._view = v;
    this.shadowRoot.getElementById('vbtn-grid').classList.toggle('active', v === 'grid');
    this.shadowRoot.getElementById('vbtn-list').classList.toggle('active', v === 'list');
    this._renderItems();
  }

  // ---- Render ----
  _coverSrc(item) {
    if (!item.cover_url) return null;
    // If it's a local media path, use HA media URL
    if (item.cover_url.startsWith('/media/') || item.cover_url.startsWith('media/')) {
      return `/api/media_source/local/${item.cover_url.replace(/^\/media\//, '')}`;
    }
    return item.cover_url;
  }

  _renderItems() {
    const content = this.shadowRoot.getElementById('content');
    if (!this._filtered.length) {
      content.innerHTML = `<div class="empty"><div class="ico">📦</div><div class="txt">Geen items gevonden</div></div>`;
      return;
    }
    content.innerHTML = this._view === 'grid'
      ? `<div class="grid">${this._filtered.map(i => this._gridCard(i)).join('')}</div>`
      : `<div class="list">
          <div class="l-head"><div></div><div>Titel</div><div>Categorie</div><div>Jaar</div><div>Locatie</div><div></div></div>
          ${this._filtered.map(i => this._listRow(i)).join('')}
        </div>`;
    content.querySelectorAll('[data-id]').forEach(el => {
      el.addEventListener('click', e => {
        const eb = e.target.closest('.edit-btn[data-eid]');
        eb ? this._openForm(eb.dataset.eid) : this._openDetail(el.dataset.id);
      });
    });
  }

  _gridCard(item) {
    const m = cm(item.category);
    const src = this._coverSrc(item);
    const cover = src
      ? `<img src="${esc(src)}" alt="${esc(item.title)}" loading="lazy" onerror="this.outerHTML='<div class=g-ph><div class=ico>${m.icon}</div><div class=ttl>${esc(item.title)}</div></div>'">`
      : `<div class="g-ph"><div class="ico">${m.icon}</div><div class="ttl">${esc(item.title)}</div></div>`;
    return `<div class="g-card" data-id="${esc(item.id)}">
      <div class="g-cover">${cover}<span class="g-badge">${m.label}</span></div>
      <div class="g-info">
        <div class="g-title" title="${esc(item.title)}">${esc(item.title)}</div>
        <div class="g-sub">${item.year||''}${item.year&&item.creator?' · ':''}${item.creator?esc(item.creator.split(',')[0]):''}</div>
        ${item.box_location?`<div class="g-loc">📦 ${esc(item.box_location)}</div>`:''}
      </div>
    </div>`;
  }

  _listRow(item) {
    const m = cm(item.category);
    const src = this._coverSrc(item);
    const thumb = src
      ? `<img class="l-thumb" src="${esc(src)}" loading="lazy" onerror="this.outerHTML='<div class=l-thumb-ph>${m.icon}</div>'">`
      : `<div class="l-thumb-ph">${m.icon}</div>`;
    return `<div class="l-row" data-id="${esc(item.id)}">
      <div>${thumb}</div>
      <div class="lc bold">${esc(item.title)}</div>
      <div class="lc cat">${m.icon} ${m.label}</div>
      <div class="lc muted">${item.year||'—'}</div>
      <div class="lc accent">${item.box_location||'—'}</div>
      <button class="edit-btn" data-eid="${esc(item.id)}">✏️</button>
    </div>`;
  }

  // ---- Detail ----
  _openDetail(id) {
    const item = this._items.find(i => i.id === id);
    if (!item) return;
    const m = cm(item.category);
    const src = this._coverSrc(item);
    const fields = [
      ['Categorie', m.label], ['Jaar', item.year],
      [m.creator, item.creator], ['Genre', item.genre],
      ['Formaat', item.format], ['Duur', item.runtime],
      ['Uitgever', item.publisher], ['Doos', item.box_location],
    ].filter(([,v]) => v);
    this._showDlg(item.title, `
      ${src ? `<img class="det-cover" src="${esc(src)}" alt="">` : ''}
      <div class="det-grid">${fields.map(([l,v]) =>
        `<div class="det-fld"><label>${l}</label><span>${esc(v)}</span></div>`).join('')}
      </div>
      ${item.description ? `<p class="det-desc">${esc(item.description)}</p>` : ''}
    `, [
      { label: 'Bewerken', cls: 'ghost', cb: () => { this._closeDlg(); setTimeout(() => this._openForm(id), 80); } },
      { label: 'Sluiten', cls: 'ghost', cb: () => this._closeDlg() },
    ]);
  }

  // ---- Add/Edit form ----
  _openForm(id) {
    const item = id ? this._items.find(i => i.id === id) : null;
    this._editId = id || null;
    this._pendingCoverUrl = item?.cover_url || null;
    const cats = ['movie','series','book','cd','other'];
    const fmts = ['','Blu-ray','DVD','4K UHD','Hardcover','Paperback','E-book','CD','Vinyl'];
    const locs = [...new Set(this._items.map(i => i.box_location).filter(Boolean))].sort();

    this._showDlg(item ? 'Item bewerken' : 'Item toevoegen', `
      <div class="bc-row">
        <div class="form-field">
          <label>Barcode / ISBN</label>
          <input type="text" id="f-bc" value="${esc(item?.barcode||'')}" placeholder="Scan of typ barcode">
        </div>
        <button class="scan-btn" id="btn-scan" title="Camera scannen">📷</button>
      </div>
      <div class="scanner-box" id="scanner-box">
        <video class="scanner-vid" id="scanner-vid" autoplay playsinline muted></video>
        <div class="scan-line"></div>
        <button class="scan-close" id="scan-close">×</button>
      </div>
      <div class="lookup-msg" id="lookup-msg"></div>
      <img class="cover-preview ${item?.cover_url ? 'visible' : ''}" id="cover-preview" src="${esc(item?.cover_url||'')}">
      <div class="form-row">
        <div class="form-field">
          <label>Categorie</label>
          <select id="f-cat">${cats.map(c=>`<option value="${c}"${item?.category===c?' selected':''}>${cm(c).label}</option>`).join('')}</select>
        </div>
        <div class="form-field">
          <label>Formaat</label>
          <select id="f-fmt">${fmts.map(f=>`<option value="${f}"${item?.format===f?' selected':''}>${f||'— kies —'}</option>`).join('')}</select>
        </div>
      </div>
      <div class="form-row full">
        <div class="form-field"><label>Titel *</label><input type="text" id="f-title" value="${esc(item?.title||'')}" placeholder="Titel van het item"></div>
      </div>
      <div class="form-row">
        <div class="form-field"><label>Jaar</label><input type="text" id="f-year" value="${esc(item?.year||'')}" placeholder="2024"></div>
        <div class="form-field">
          <label>Doos / locatie</label>
          <input type="text" id="f-loc" value="${esc(item?.box_location||'')}" placeholder="Doos A3, Plank 2…" list="loc-dl">
          <datalist id="loc-dl">${locs.map(l=>`<option value="${esc(l)}">`).join('')}</datalist>
        </div>
      </div>
      <div class="form-row">
        <div class="form-field"><label id="lbl-creator">Regisseur</label><input type="text" id="f-creator" value="${esc(item?.creator||'')}"></div>
        <div class="form-field"><label>Genre</label><input type="text" id="f-genre" value="${esc(item?.genre||'')}"></div>
      </div>
      <div class="form-row full">
        <div class="form-field"><label>Beschrijving</label><textarea id="f-desc">${esc(item?.description||'')}</textarea></div>
      </div>
    `, [
      ...(item ? [{ label: 'Verwijderen', cls: 'danger', cb: () => this._delete() }] : []),
      { label: 'Annuleren', cls: 'ghost', cb: () => this._closeDlg() },
      { label: 'Opslaan', cls: 'primary', cb: () => this._save() },
    ]);

    const sr = this.shadowRoot;
    const catEl = sr.getElementById('f-cat');
    if (catEl) { this._setCreatorLabel(catEl.value); catEl.addEventListener('change', e => this._setCreatorLabel(e.target.value)); }
    sr.getElementById('f-bc')?.addEventListener('input', e => {
      clearTimeout(this._bcTimer);
      if (e.target.value.length >= 8) this._bcTimer = setTimeout(() => this._lookupBarcode(e.target.value), 650);
    });
    sr.getElementById('btn-scan')?.addEventListener('click', () => this._toggleScan());
    sr.getElementById('scan-close')?.addEventListener('click', () => this._closeScan());
  }

  _setCreatorLabel(cat) {
    const el = this.shadowRoot.getElementById('lbl-creator');
    if (el) el.textContent = cm(cat).creator;
  }

  // ---- Metadata lookup (direct from browser) ----
  _getOmdbKey() {
    if (!this._config.omdb_entity) return null;
    const state = this._hass.states[this._config.omdb_entity];
    return state?.state || null;
  }

  async _lookupBarcode(barcode) {
    const sr = this.shadowRoot;
    const cat = sr.getElementById('f-cat')?.value || 'movie';
    const msg = sr.getElementById('lookup-msg');
    if (msg) msg.innerHTML = '<span class="spin"></span> Opzoeken…';

    try {
      let meta = null;

      if (cat === 'movie' || cat === 'series') {
        const key = this._getOmdbKey();
        if (key) {
          const r = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(barcode)}&apikey=${key}`);
          const d = await r.json();
          if (d.Response === 'True') {
            let coverUrl = d.Poster !== 'N/A' ? d.Poster : null;
            meta = { title: d.Title, year: d.Year, creator: d.Director, genre: d.Genre, description: d.Plot, cover_url: coverUrl, runtime: d.Runtime, publisher: d.Production };
          }
        }
      } else if (cat === 'book') {
        const r = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${barcode}&format=json&jscmd=data`);
        const d = await r.json();
        const book = d[`ISBN:${barcode}`];
        if (book) {
          meta = {
            title: book.title,
            year: book.publish_date,
            creator: book.authors?.map(a=>a.name).join(', ') || null,
            publisher: book.publishers?.[0]?.name || null,
            genre: book.subjects?.slice(0,3).map(s=>s.name||s).join(', ') || null,
            description: typeof book.description === 'object' ? book.description.value : book.description,
            cover_url: book.cover?.large || book.cover?.medium || null,
          };
        }
      } else if (cat === 'cd') {
        const r = await fetch(`https://musicbrainz.org/ws/2/release/?query=barcode:${barcode}&fmt=json&limit=1`, { headers: { 'User-Agent': 'MijnCollectieHA/1.0' } });
        const d = await r.json();
        const rel = d.releases?.[0];
        if (rel) {
          meta = { title: rel.title, year: rel.date?.slice(0,4) || null, creator: rel['artist-credit']?.[0]?.artist?.name || null, publisher: rel['label-info']?.[0]?.label?.name || null };
          // Try cover art
          if (rel.id) {
            try {
              const cr = await fetch(`https://coverartarchive.org/release/${rel.id}`);
              const cd = await cr.json();
              meta.cover_url = cd.images?.find(i=>i.front)?.image || cd.images?.[0]?.image || null;
            } catch(_) {}
          }
        }
      }

      if (meta) {
        const set = (id, v) => { const el = sr.getElementById(id); if (el && v) el.value = v; };
        set('f-title', meta.title); set('f-year', meta.year);
        set('f-creator', meta.creator); set('f-genre', meta.genre);
        const d = sr.getElementById('f-desc'); if (d && meta.description) d.value = meta.description;
        if (meta.cover_url) {
          this._pendingCoverUrl = meta.cover_url;
          const preview = sr.getElementById('cover-preview');
          if (preview) { preview.src = meta.cover_url; preview.classList.add('visible'); }
        }
        if (msg) msg.textContent = '✓ Metadata gevonden';
      } else {
        if (msg) msg.textContent = 'Niet gevonden — vul handmatig in';
      }
    } catch(e) {
      if (msg) msg.textContent = 'Lookup mislukt';
    }
  }

  // ---- Cover ophalen via TMDb met fallback naar OMDB ----
  async _fetchCover(tmdbId, imdbId) {
    // Stap 1: TMDb
    const tmdbKey = this._getTmdbKey();
    if (tmdbId && tmdbKey) {
      try {
        const r = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${tmdbKey}&language=nl`);
        const d = await r.json();
        if (d.poster_path) return `https://image.tmdb.org/t/p/w500${d.poster_path}`;
      } catch(_) {}
    }
    // Stap 2: OMDB fallback
    const omdbKey = this._getOmdbKey();
    if (imdbId && omdbKey) {
      try {
        const r = await fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=${omdbKey}`);
        const d = await r.json();
        if (d.Poster && d.Poster !== 'N/A') return d.Poster;
      } catch(_) {}
    }
    return null;
  }

  _getTmdbKey() {
    if (!this._config.tmdb_entity) return null;
    const state = this._hass.states[this._config.tmdb_entity];
    return state?.state || null;
  }

  // ---- XML Import (My Movies export) ----
  async _importXml(xmlText) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'text/xml');
    const movies = doc.querySelectorAll('Movie');
    if (!movies.length) { this._toast('Geen films gevonden in XML'); return []; }
    const items = [];
    for (const m of movies) {
      const getText = sel => m.querySelector(sel)?.textContent?.trim() || null;
      let director = null;
      m.querySelectorAll('Person').forEach(p => {
        if (p.getAttribute('type') === '2') director = p.querySelector('Name')?.textContent?.trim() || null;
      });
      const genres = [...m.querySelectorAll('Genre')].map(g => g.textContent.trim()).filter(Boolean).join(', ') || null;
      let imdbId = null, tmdbId = null;
      m.querySelectorAll('RemoteID').forEach(r => {
        if (r.getAttribute('siteName') === 'IMDB') imdbId = r.textContent.trim();
        if (r.getAttribute('siteName') === 'TMDb') tmdbId = r.textContent.trim();
      });
      const coverUrl = await this._fetchCover(tmdbId, imdbId);
      const title = getText('LanguageSpecific > Title') || getText('Global > OriginalTitle');
      if (!title) continue;
      items.push({
        id: getText('Global > Id') || (Date.now().toString(36) + Math.random().toString(36).slice(2)),
        category: 'movie', title,
        year: getText('Global > Year'),
        creator: director, genre: genres,
        description: getText('LanguageSpecific > Description'),
        runtime: getText('Global > Runningtime') ? getText('Global > Runningtime') + ' min' : null,
        box_location: getText('Personal > Location') || null,
        cover_url: coverUrl, imdb_id: imdbId, tmdb_id: tmdbId,
        added_date: getText('Personal > Added') ? new Date(getText('Personal > Added')).toISOString() : new Date().toISOString(),
        owned: getText('Personal > Group') === 'Owned',
      });
    }
    return items;
  }

  _openImportDialog() {
    this._showDlg('XML Importeren', `
      <div class="form-field">
        <label>My Movies XML bestand</label>
        <input type="file" id="f-xml" accept=".xml" style="color:#f0ede8;padding:8px 0">
      </div>
      <div class="lookup-msg" id="import-msg">Selecteer je Collection.xml exportbestand</div>
      <div id="import-preview" style="font-size:0.75rem;color:rgba(255,255,255,0.5);margin-top:8px"></div>
    `, [
      { label: 'Annuleren', cls: 'ghost', cb: () => this._closeDlg() },
      { label: 'Importeren', cls: 'primary', cb: () => this._doImport() },
    ]);
    this.shadowRoot.getElementById('f-xml')?.addEventListener('change', async e => {
      const file = e.target.files[0];
      if (!file) return;
      const msg = this.shadowRoot.getElementById('import-msg');
      msg.innerHTML = '<span class="spin"></span> Bestand lezen…';
      const text = await file.text();
      const doc = new DOMParser().parseFromString(text, 'text/xml');
      const count = doc.querySelectorAll('Movie').length;
      msg.textContent = `✓ ${count} films gevonden`;
      this.shadowRoot.getElementById('import-preview').textContent = 'Klik Importeren om te starten.';
      this._pendingXml = text;
    });
  }

  async _doImport() {
    if (!this._pendingXml) { this._toast('Selecteer eerst een XML bestand'); return; }
    const msg = this.shadowRoot.getElementById('import-msg');
    if (msg) msg.innerHTML = '<span class="spin"></span> Importeren…';
    try {
      const items = await this._importXml(this._pendingXml);
      if (!items.length) { this._toast('Geen items geïmporteerd'); return; }
      let existing = [];
      try { existing = await this._api('GET', 'media'); } catch(_) {}
      const existingById = new Map(existing.map(i => [i.id, i]));
      let added = 0, updated = 0, failed = 0;
      for (const item of items) {
        if (msg) msg.innerHTML = `<span class="spin"></span> Bezig ${added+updated+failed+1}/${items.length}…`;
        const ex = existingById.get(item.id);
        // Preserve custom fields; if existing cover is broken/missing, use new one
        const coverUrl = item.cover_url || ex?.cover_url || null;
        const payload = { ...item,
          cover_url: coverUrl,
          box_location: ex?.box_location || item.box_location || null,
          lent_to: ex?.lent_to || null, lent_date: ex?.lent_date || null, owner: ex?.owner || null,
        };
        // Retry up to 3 times on failure
        let success = false;
        for (let attempt = 0; attempt < 3 && !success; attempt++) {
          try {
            if (attempt > 0) await new Promise(r => setTimeout(r, 1000 * attempt));
            if (ex) { await this._api('PUT', `media/${item.id}`, payload); }
            else { await this._api('POST', 'media', payload); }
            success = true;
          } catch(e) {
            if (attempt === 2) { console.warn('Import item failed after 3 attempts:', item.title, e); failed++; }
          }
        }
        if (success) { ex ? updated++ : added++; }
      }
      this._pendingXml = null;
      this._closeDlg();
      this._toast(`Geïmporteerd: ${added} nieuw, ${updated} bijgewerkt${failed ? ', '+failed+' mislukt' : ''}`);
      await this._load();
    } catch(e) {
      console.error('Import error:', e);
      this._toast('Importeren mislukt');
    }
  }

  // ---- Also lookup by title for manual entry ----
  async _lookupByTitle() {
    const sr = this.shadowRoot;
    const title = sr.getElementById('f-title')?.value.trim();
    if (!title) return;
    await this._lookupBarcode(title);
  }

  // ---- Camera scanner ----
  async _toggleScan() {
    const box = this.shadowRoot.getElementById('scanner-box');
    if (!box) return;
    if (box.classList.contains('open')) { this._closeScan(); return; }
    try {
      this._scanStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      this.shadowRoot.getElementById('scanner-vid').srcObject = this._scanStream;
      box.classList.add('open');
      if (!window.ZXing) await this._loadScript('https://unpkg.com/@zxing/library@0.18.6/umd/index.min.js');
      this._codeReader = new window.ZXing.BrowserMultiFormatReader();
      this._codeReader.decodeFromVideoElement(this.shadowRoot.getElementById('scanner-vid'), res => {
        if (res) {
          const el = this.shadowRoot.getElementById('f-bc');
          if (el) el.value = res.getText();
          this._closeScan();
          this._lookupBarcode(res.getText());
        }
      });
    } catch(_) { this._toast('Camera niet beschikbaar'); }
  }

  _closeScan() {
    this.shadowRoot.getElementById('scanner-box')?.classList.remove('open');
    if (this._scanStream) { this._scanStream.getTracks().forEach(t => t.stop()); this._scanStream = null; }
    if (this._codeReader) { try { this._codeReader.reset(); } catch(_){} this._codeReader = null; }
  }

  _loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  // ---- Save / Delete ----
  async _save() {
    const sr = this.shadowRoot;
    const title = sr.getElementById('f-title')?.value.trim();
    if (!title) { this._toast('Vul een titel in'); return; }

    const payload = {
      category: sr.getElementById('f-cat')?.value,
      title,
      year: sr.getElementById('f-year')?.value || null,
      barcode: sr.getElementById('f-bc')?.value || null,
      format: sr.getElementById('f-fmt')?.value || null,
      box_location: sr.getElementById('f-loc')?.value || null,
      creator: sr.getElementById('f-creator')?.value || null,
      genre: sr.getElementById('f-genre')?.value || null,
      description: sr.getElementById('f-desc')?.value || null,
      cover_url: this._pendingCoverUrl || null,
    };

    try {
      if (this._editId) {
        await this._api('PUT', `media/${this._editId}`, payload);
      } else {
        await this._api('POST', 'media', payload);
      }
      this._closeDlg();
      this._toast(this._editId ? 'Opgeslagen' : 'Toegevoegd');
      await this._load();
    } catch(e) {
      this._toast('Opslaan mislukt');
    }
  }

  async _delete() {
    if (!this._editId || !confirm('Item verwijderen?')) return;
    try {
      await this._api('DELETE', `media/${this._editId}`);
      this._closeDlg();
      this._toast('Verwijderd');
      await this._load();
    } catch(e) {
      this._toast('Verwijderen mislukt');
    }
  }

  // ---- Dialog ----
  _showDlg(title, bodyHTML, buttons) {
    this._closeScan();
    const dlg = this.shadowRoot.getElementById('dlg');
    dlg.innerHTML = `
      <div class="dlg-head">
        <h3>${esc(title)}</h3>
        <button class="dlg-x" id="dlg-x">✕</button>
      </div>
      <div class="dlg-body">${bodyHTML}</div>
      <div class="dlg-foot" id="dlg-foot"></div>
    `;
    dlg.querySelector('#dlg-x').addEventListener('click', () => this._closeDlg());
    const foot = dlg.querySelector('#dlg-foot');
    buttons.forEach(b => {
      const btn = document.createElement('button');
      btn.className = `dbtn ${b.cls}`;
      btn.textContent = b.label;
      btn.addEventListener('click', b.cb);
      foot.appendChild(btn);
    });
    const overlay = this.shadowRoot.getElementById('overlay');
    overlay.classList.add('open');
    overlay.scrollTop = 0;
  }

  _closeDlg() {
    this._closeScan();
    this._pendingCoverUrl = null;
    this.shadowRoot.getElementById('overlay').classList.remove('open');
  }

  _toast(msg) {
    const el = this.shadowRoot.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.className = 'toast show';
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => { el.className = 'toast'; }, 2800);
  }
}

customElements.define('mijn-collectie-card', MijnCollectieCard);

// ---- Visual config editor ----
class MijnCollectieCardEditor extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._config = {}; }
  setConfig(config) { this._config = { ...config }; this._render(); }
  _fire(config) { this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true })); }
  _render() {
    const c = this._config;
    this.shadowRoot.innerHTML = `
      <style>
        * { box-sizing: border-box; }
        .editor { display: flex; flex-direction: column; gap: 14px; padding: 4px 0; font-family: var(--mdc-typography-font-family, Roboto, sans-serif); }
        .field { display: flex; flex-direction: column; gap: 4px; }
        .field label { font-size: 0.75rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; color: var(--secondary-text-color, rgba(0,0,0,0.6)); }
        .field input, .field select { height: 40px; padding: 0 12px; border: 1px solid var(--divider-color, rgba(0,0,0,0.3)); border-radius: 4px; background: var(--card-background-color, #fff); color: var(--primary-text-color, #212121); font-family: inherit; font-size: 0.9rem; outline: none; width: 100%; }
        .field input:focus, .field select:focus { border-color: var(--primary-color, #03a9f4); }
        .hint { font-size: 0.7rem; color: var(--secondary-text-color, rgba(0,0,0,0.45)); }
        .row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .color-row { display: flex; gap: 8px; }
        .color-row input[type=text] { flex: 1; }
        .color-row input[type=color] { width: 44px; padding: 2px 4px; cursor: pointer; flex-shrink: 0; }
        .reset-btn { height: 40px; padding: 0 12px; border: 1px solid var(--divider-color, rgba(0,0,0,0.2)); border-radius: 4px; background: transparent; color: var(--secondary-text-color); cursor: pointer; font-size: 0.8rem; white-space: nowrap; }
      </style>
      <div class="editor">
        <div class="field">
          <label>OMDb API key entiteit *</label>
          <input type="text" id="e-omdb" value="${c.omdb_entity || 'input_text.omdb_api_key'}" placeholder="input_text.omdb_api_key">
          <div class="hint">Maak een input_text helper aan met je OMDb API key</div>
        </div>
        <div class="field">
          <label>TMDb API key entiteit</label>
          <input type="text" id="e-tmdb" value="${c.tmdb_entity || 'input_text.tmdb_api_key'}" placeholder="input_text.tmdb_api_key">
          <div class="hint">Gratis TMDb API key voor cover art tijdens XML import</div>
        </div>
        <div class="field">
          <label>NAS media share naam *</label>
          <input type="text" id="e-share" value="${c.media_share || 'mijn_collectie'}" placeholder="mijn_collectie">
          <div class="hint">Naam van de netwerkopslag zoals ingesteld in HA Opslag</div>
        </div>
        <div class="row">
          <div class="field">
            <label>Kaart titel</label>
            <input type="text" id="e-title" value="${c.title || ''}" placeholder="MijnCollectie">
          </div>
          <div class="field">
            <label>Grid kolommen</label>
            <select id="e-cols">
              <option value="0" ${!c.columns?'selected':''}>Automatisch</option>
              ${[2,3,4,5,6,7,8].map(n=>`<option value="${n}" ${c.columns==n?'selected':''}>${n} kolommen</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="field">
          <label>Accentkleur</label>
          <div class="color-row">
            <input type="text" id="e-accent-text" value="${c.accent_color || ''}" placeholder="Leeg = HA themakleur">
            <input type="color" id="e-accent-color" value="${c.accent_color || '#c8a84b'}">
            <button class="reset-btn" id="e-accent-reset">Wissen</button>
          </div>
        </div>
      </div>
    `;
    const fire = () => {
      this._config = {
        ...this._config,
        omdb_entity: this.shadowRoot.getElementById('e-omdb').value.trim(),
        tmdb_entity: this.shadowRoot.getElementById('e-tmdb').value.trim() || 'input_text.tmdb_api_key',
        media_share: this.shadowRoot.getElementById('e-share').value.trim() || 'mijn_collectie',
        title: this.shadowRoot.getElementById('e-title').value.trim() || undefined,
        columns: parseInt(this.shadowRoot.getElementById('e-cols').value) || 0,
        accent_color: this.shadowRoot.getElementById('e-accent-text').value.trim() || undefined,
      };
      this._fire(this._config);
    };
    ['e-omdb','e-tmdb','e-share','e-title','e-cols'].forEach(id => this.shadowRoot.getElementById(id).addEventListener('change', fire));
    const cp = this.shadowRoot.getElementById('e-accent-color');
    const ct = this.shadowRoot.getElementById('e-accent-text');
    cp.addEventListener('input', () => { ct.value = cp.value; fire(); });
    ct.addEventListener('change', () => { if (/^#[0-9a-fA-F]{6}$/.test(ct.value)) cp.value = ct.value; fire(); });
    this.shadowRoot.getElementById('e-accent-reset').addEventListener('click', () => { ct.value = ''; this._config = {...this._config, accent_color: undefined}; this._fire(this._config); });
  }
}
customElements.define('mijn-collectie-card-editor', MijnCollectieCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({ type: 'mijn-collectie-card', name: 'Mijn Collectie', description: "Films, series, boeken & cd's" });