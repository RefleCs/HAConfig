/**
 * Mijn Collectie — overlay patch v1
 * Toont de dialoog (detail / toevoegen / bewerken) altijd over het hele scherm,
 * ongeacht de hoogte of scrollpositie van de kaart. Gebruikt de browser "top layer"
 * (Popover API), zodat niets in het dashboard de overlay kan afknippen.
 * Ongedaan maken: verwijder deze resource uit Dashboards > Resources.
 */
(async () => {
  await customElements.whenDefined('mijn-collectie-card');
  const P = customElements.get('mijn-collectie-card').prototype;
  if (P.__overlayV1) return;
  P.__overlayV1 = true;

  const supported = typeof HTMLElement.prototype.showPopover === 'function';

  const CSS = `
    .overlay {
      position: fixed !important; inset: 0; width: 100vw; height: 100vh; height: 100dvh;
      max-width: none; max-height: none; margin: 0; border: 0; border-radius: 0;
      padding: max(16px, env(safe-area-inset-top)) 16px max(16px, env(safe-area-inset-bottom));
      align-items: center !important; justify-content: center; overflow: hidden;
      background: rgba(0,0,0,0.6); color: inherit;
    }
    .overlay .dlg { display: flex; flex-direction: column; max-height: 100%; }
    .overlay .dlg .dlg-head, .overlay .dlg .dlg-foot { flex-shrink: 0; }
    .overlay .dlg .dlg-body { flex: 1 1 auto; min-height: 0; overflow-y: auto; }
    .toast[popover] {
      position: fixed; inset: auto auto max(24px, env(safe-area-inset-bottom)) 50%; margin: 0;
      width: max-content; max-width: 90vw; overflow: visible;
    }
  `;

  const ensureStyle = card => {
    const sr = card.shadowRoot;
    if (sr.getElementById('mc-overlay-style')) return;
    const s = document.createElement('style');
    s.id = 'mc-overlay-style';
    s.textContent = CSS;
    sr.appendChild(s);
  };

  const origShow = P._showDlg;
  P._showDlg = function (title, body, buttons) {
    origShow.call(this, title, body, buttons);
    ensureStyle(this);
    const ov = this.shadowRoot.getElementById('overlay');
    if (!ov) return;
    if (supported) {
      ov.setAttribute('popover', 'manual');
      try { if (!ov.matches(':popover-open')) ov.showPopover(); } catch (_) {}
    }
    const dlgBody = ov.querySelector('.dlg-body');
    if (dlgBody) dlgBody.scrollTop = 0;
    if (!this._escBound) {
      this._escBound = true;
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && this.shadowRoot.getElementById('overlay')?.classList.contains('open')) this._closeDlg();
      });
    }
  };

  const origClose = P._closeDlg;
  P._closeDlg = function () {
    origClose.call(this);
    const ov = this.shadowRoot.getElementById('overlay');
    if (supported && ov) { try { if (ov.matches(':popover-open')) ov.hidePopover(); } catch (_) {} }
  };

  // Toast moet boven de overlay zichtbaar blijven (bijv. "Opslaan mislukt")
  const origToast = P._toast;
  P._toast = function (msg) {
    const el = this.shadowRoot.getElementById('toast');
    if (!el || !supported) return origToast.call(this, msg);
    ensureStyle(this);
    el.setAttribute('popover', 'manual');
    el.textContent = msg;
    try { if (el.matches(':popover-open')) el.hidePopover(); el.showPopover(); } catch (_) {}
    el.className = 'toast';
    requestAnimationFrame(() => { el.className = 'toast show'; });
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      el.className = 'toast';
      setTimeout(() => { try { if (el.matches(':popover-open')) el.hidePopover(); } catch (_) {} }, 250);
    }, 2800);
  };

  console.info('Mijn Collectie overlay patch v1 actief');
})();
