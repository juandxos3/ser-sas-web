(() => {
  const nav = document.querySelector('.ser-nav');
  if (!nav) return;
  const toggle = nav.querySelector('.ser-toggle');
  const menu = nav.querySelector('.ser-menu');
  const sub = nav.querySelector('.ser-subtoggle');
  const desktopTrigger = nav.querySelector('.ser-desktop-trigger');
  const header = nav.closest('header');
  const mobile = matchMedia('(max-width: 768px)');
  const backdrop = document.createElement('div');
  backdrop.className = 'ser-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  nav.prepend(backdrop);
  let previousScroll = 0;
  let savedBodyStyles = null;
  const background = [];
  function setOpen(open, restoreFocus = true) {
    open = open && mobile.matches;
    const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
    document.body.classList.toggle('ser-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    menu.inert = mobile.matches && !open;
    if (open && !wasOpen) {
      previousScroll = window.scrollY;
      savedBodyStyles = ['position','top','width'].map(key => [key, document.body.style[key]]);
      Object.assign(document.body.style, {position: 'fixed', top: `-${previousScroll}px`, width: '100%'});
      let branch = nav;
      while (branch.parentElement && branch !== document.body) {
        for (const sibling of branch.parentElement.children) {
          if (sibling !== branch && !['SCRIPT','STYLE','LINK'].includes(sibling.tagName)) {
            background.push([sibling, sibling.inert]);
            sibling.inert = true;
          }
        }
        branch = branch.parentElement;
      }
      menu.querySelector('a').focus({preventScroll: true});
    }
    if (!open) {
      setSubmenu(false);
      if (wasOpen) {
        background.splice(0).forEach(([el, inert]) => { el.inert = inert; });
        savedBodyStyles.forEach(([key, value]) => { document.body.style[key] = value; });
        window.scrollTo({top: previousScroll, behavior: 'instant'});
        if (restoreFocus && mobile.matches) toggle.focus({preventScroll: true});
      }
    }
  }
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  backdrop.addEventListener('click', () => setOpen(false));
  function setSubmenu(open) {
    sub.setAttribute('aria-expanded', String(open));
    sub.setAttribute('aria-label', open ? 'Ocultar servicios' : 'Mostrar servicios');
    desktopTrigger.setAttribute('aria-expanded', String(open));
  }
  sub.addEventListener('click', () => setSubmenu(sub.getAttribute('aria-expanded') !== 'true'));
  desktopTrigger.addEventListener('click', () => setSubmenu(desktopTrigger.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('click', event => {
    if (!desktopTrigger.parentElement.contains(event.target)) setSubmenu(false);
  });
  nav.addEventListener('focusout', event => {
    if (!mobile.matches && !desktopTrigger.parentElement.contains(event.relatedTarget)) setSubmenu(false);
  });
  function updateHeader() {
    if (!document.body.classList.contains('ser-menu-open')) {
      header.classList.toggle('ser-scrolled', window.scrollY > 80);
    }
  }
  window.addEventListener('scroll', updateHeader, {passive: true});
  updateHeader();
  menu.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false, false); });
  document.addEventListener('keydown', event => {
    if (!mobile.matches && event.key === 'Escape' && desktopTrigger.getAttribute('aria-expanded') === 'true') {
      setSubmenu(false); desktopTrigger.focus(); return;
    }
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
    if (event.key === 'Tab') {
      const focusable = [toggle, ...menu.querySelectorAll('a,button')].filter(el => el.getClientRects().length);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  mobile.addEventListener('change', () => setOpen(false, false));
  window.addEventListener('pageshow', () => setOpen(false, false));
  setOpen(false, false);
})();
