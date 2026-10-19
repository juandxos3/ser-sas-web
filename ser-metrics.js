/* SER S.A.S. — medición de visitas e intención de contacto.
   No añadir valores del formulario ni URLs de WhatsApp con mensajes.
   Si GA4 se configura en GTM en el futuro, retirar esta instalación directa
   para evitar duplicar visitas y eventos. */
(() => {
  'use strict';
  if (!['ser-sas.com', 'www.ser-sas.com'].includes(location.hostname)) return;
  if (window.serMetricsLoaded) return;
  window.serMetricsLoaded = true;

  const measurementId = 'G-MJNK1H135X';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  function cleanUrl(value) {
    try {
      const url = new URL(value);
      return url.origin + url.pathname;
    } catch (_) {
      return '';
    }
  }

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_location: cleanUrl(location.href),
    page_referrer: cleanUrl(document.referrer)
  });

  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(tag);

  function track(name, placement) {
    window.gtag('event', name, {
      send_to: measurementId,
      page_path: location.pathname,
      contact_placement: placement
    });
  }

  document.addEventListener('click', event => {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    let url;
    try { url = new URL(link.href, location.href); } catch (_) { return; }
    const placement = link.closest('.whatsapp-float') ? 'floating' :
      link.closest('footer') ? 'footer' :
      link.closest('.hero') ? 'hero' : 'content';
    if (url.protocol === 'tel:') {
      track('phone_click', placement);
    } else if (url.protocol === 'https:' &&
      ['wa.me', 'api.whatsapp.com'].includes(url.hostname)) {
      track('whatsapp_click', placement);
    }
  });

  document.addEventListener('ser:quote-whatsapp-open', () => {
    track('quote_whatsapp_open', 'contact_form');
  });
})();
