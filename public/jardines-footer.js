(function () {
  const FOOTER_ID = 'jardines-footer-styles';
  const SITE_BASE = 'https://www.jardinesdelrenacer.com';
  const currentYear = new Date().getFullYear();

  const links = {
    servicios: [
      ['Quienes Somos', '/servicios/quienes-somos'],
      ['Reseña Histórica', '/servicios/resena-historica'],
      ['Trabaja con Nosotros', '/servicios/trabaja-con-nosotros'],
      ['Cotizar Plan', '/cotizar'],
    ],
    atencion: [
      ['Obituarios', '/obituarios'],
      ['Agendar Visita', '/agendar-visita'],
      ['Pagar Plan', '/pagar-plan'],
      ['Contacto', '/contacto'],
    ],
    recursos: [
      ['Planes', '/planes'],
      ['Recorrido 360°', '/recorrido-360'],
      ['Parque Conmemorativo', '/parque-conmemorativo'],
      ['Repatriaciones', '/repatriaciones'],
      ['Florería', '/floreria'],
      ['Aliados Comerciales', '/aliados-comerciales'],
    ],
    soporte: [
      ['Portal Cliente', '/cliente/dashboard'],
      ['Preguntas Frecuentes', '/faq'],
      ['Términos y Condiciones', '/legal/terminos'],
      ['Política de Privacidad', '/legal/privacidad'],
      ['Política de Cookies', '/legal/cookies'],
    ],
  };

  const socials = [
    ['Facebook', 'https://facebook.com/jardinesdelrenacer', 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'],
    ['Instagram', 'https://instagram.com/jardinesdelrenacer', 'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.25-1.67 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1012 18.16 6.16 6.16 0 0012 5.84zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z'],
    ['TikTok', 'https://tiktok.com/@jardinesdelrenacer', 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 11-2.89-2.9c.31 0 .6.05.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 1015.86 15.67v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z'],
    ['LinkedIn', 'https://linkedin.com/company/jardinesdelrenacer', 'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z'],
    ['WhatsApp', 'https://wa.me/573113906052', 'M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 012.89 6.99c0 5.45-4.44 9.88-9.87 9.88M20.46 3.49A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.31-1.65a11.88 11.88 0 005.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.49-8.41z'],
  ];

  function absolutePath(path) {
    if (/^https?:\/\//.test(path)) return path;
    return SITE_BASE + path;
  }

  function renderLinkList(items) {
    return items
      .map(([label, href]) => `<li><a href="${absolutePath(href)}" target="_blank" rel="noopener noreferrer">${label}</a></li>`)
      .join('');
  }

  function ensureStyles() {
    if (document.getElementById(FOOTER_ID)) return;
    const style = document.createElement('style');
    style.id = FOOTER_ID;
    style.textContent = `
      .jdr-footer{position:relative;margin-top:5rem;overflow:hidden;background:linear-gradient(135deg,#3c60a2 0%,#2f4d82 52%,#3c60a2 100%);color:#fff;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Segoe UI",Roboto,Helvetica,Arial,sans-serif}
      .jdr-footer *{box-sizing:border-box}
      .jdr-footer a{color:inherit;text-decoration:none}
      .jdr-footer__inner{position:relative;border-top:1px solid rgba(255,255,255,.2)}
      .jdr-footer__newsletter{border-bottom:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);padding:3.75rem 1.25rem}
      .jdr-footer__container{width:min(1320px,100%);margin:0 auto;padding:0 1.25rem}
      .jdr-footer__newsletter-grid{display:flex;align-items:center;justify-content:space-between;gap:2rem}
      .jdr-footer__eyebrow{margin:0 0 .75rem;font-size:.78rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.72)}
      .jdr-footer__title{margin:0;font-size:clamp(1.85rem,4vw,2.7rem);line-height:1.05;font-weight:850;color:#fff}
      .jdr-footer__text{max-width:34rem;margin:.9rem 0 0;color:rgba(255,255,255,.86);line-height:1.65;font-size:.98rem}
      .jdr-footer__form{display:flex;gap:.7rem;flex-wrap:wrap;justify-content:flex-end}
      .jdr-footer__form input{min-width:9.5rem;border:1px solid rgba(255,255,255,.24);background:rgba(255,255,255,.11);color:#fff;padding:.92rem 1rem;border-radius:8px;outline:none;box-shadow:0 12px 28px rgba(0,0,0,.08)}
      .jdr-footer__form input::placeholder{color:rgba(255,255,255,.62)}
      .jdr-footer__form input:focus{border-color:rgba(255,255,255,.62);background:rgba(255,255,255,.16)}
      .jdr-footer__form button{border:0;border-radius:8px;background:#fff;color:#2f4d82;font-weight:850;letter-spacing:.02em;padding:.92rem 1.45rem;cursor:pointer;box-shadow:0 16px 32px rgba(0,0,0,.14);transition:transform .2s ease,background .2s ease,color .2s ease}
      .jdr-footer__form button:hover{transform:translateY(-1px);background:#eaf0ff;color:#243f70}
      .jdr-footer__main{display:grid;grid-template-columns:1.15fr repeat(4,1fr);gap:2rem;padding:4.75rem 0}
      .jdr-footer__brand-logos{display:flex;align-items:center;gap:.7rem;margin-bottom:1.4rem}
      .jdr-footer__brand-logos img{display:block;object-fit:contain;filter:drop-shadow(0 14px 18px rgba(0,0,0,.16))}
      .jdr-footer__brand-logo{width:5.6rem;height:5.6rem}
      .jdr-footer__anniversary{width:7rem;height:7rem}
      .jdr-footer__brand p{margin:0;color:rgba(255,255,255,.8);font-size:.92rem;line-height:1.7}
      .jdr-footer__column h3{position:relative;display:inline-block;margin:0 0 1.15rem;font-size:.78rem;line-height:1.2;font-weight:850;text-transform:uppercase;letter-spacing:.12em;color:#fff}
      .jdr-footer__column h3:after{content:"";position:absolute;left:0;bottom:-.45rem;width:2.2rem;height:2px;border-radius:999px;background:rgba(255,255,255,.62)}
      .jdr-footer__panel{border:1px solid rgba(255,255,255,.12);background:linear-gradient(135deg,rgba(255,255,255,.12),rgba(255,255,255,.05));border-radius:8px;padding:1.25rem}
      .jdr-footer__panel ul{list-style:none;margin:0;padding:0;display:grid;gap:.78rem}
      .jdr-footer__panel a{display:inline-block;color:rgba(255,255,255,.76);font-size:.9rem;line-height:1.35;transition:color .2s ease,transform .2s ease}
      .jdr-footer__panel a:hover{color:#fff;transform:translateX(4px)}
      .jdr-footer__bottom{border-top:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.16);padding:1.9rem 0}
      .jdr-footer__bottom-grid{display:flex;align-items:center;justify-content:space-between;gap:1.5rem}
      .jdr-footer__copy{margin:0;color:rgba(255,255,255,.9);font-size:.9rem;font-weight:600}
      .jdr-footer__copy strong{color:#fff}
      .jdr-footer__social{display:flex;align-items:center;gap:.75rem}
      .jdr-footer__social a{width:2.75rem;height:2.75rem;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);display:grid;place-items:center;color:rgba(255,255,255,.76);transition:transform .2s ease,background .2s ease,color .2s ease,border-color .2s ease}
      .jdr-footer__social a:hover{transform:translateY(-2px);background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.42);color:#fff}
      .jdr-footer__social svg{width:1.18rem;height:1.18rem;display:block}
      .jdr-footer__credit{font-size:.78rem;color:rgba(255,255,255,.68);font-weight:600}
      .jdr-footer__credit a{padding:.55rem .75rem;border:1px solid rgba(255,255,255,.14);border-radius:8px;background:rgba(255,255,255,.06)}
      .jdr-footer__credit a:hover{background:rgba(255,255,255,.11);color:#fff}
      @media (max-width:1100px){.jdr-footer__newsletter-grid{align-items:flex-start;flex-direction:column}.jdr-footer__form{justify-content:flex-start;width:100%}.jdr-footer__main{grid-template-columns:repeat(2,1fr)}.jdr-footer__brand{grid-column:1/-1}.jdr-footer__bottom-grid{flex-direction:column;text-align:center}}
      @media (max-width:640px){.jdr-footer{margin-top:3.5rem}.jdr-footer__newsletter{padding:2.7rem 0}.jdr-footer__container{padding:0 1rem}.jdr-footer__form{display:grid;grid-template-columns:1fr}.jdr-footer__form input,.jdr-footer__form button{width:100%;min-width:0}.jdr-footer__main{grid-template-columns:1fr;padding:3.4rem 0;gap:1.4rem}.jdr-footer__brand-logo{width:4.8rem;height:4.8rem}.jdr-footer__anniversary{width:6rem;height:6rem}.jdr-footer__social{flex-wrap:wrap;justify-content:center}}
    `;
    document.head.appendChild(style);
  }

  function footerHtml() {
    return `
      <footer class="jdr-footer" aria-label="Pie de página Jardines del Renacer">
        <div class="jdr-footer__inner">
          <section class="jdr-footer__newsletter" aria-label="Suscripción a noticias">
            <div class="jdr-footer__container jdr-footer__newsletter-grid">
              <div>
                <p class="jdr-footer__eyebrow">Jardines del Renacer</p>
                <h2 class="jdr-footer__title">Mantente informado con nuestras noticias</h2>
                <p class="jdr-footer__text">Suscríbete para recibir artículos, eventos y novedades de nuestros servicios. Puedes cancelar en cualquier momento.</p>
              </div>
              <form class="jdr-footer__form" data-jdr-newsletter>
                <input type="text" name="nombre" placeholder="Nombre" autocomplete="given-name">
                <input type="text" name="apellido" placeholder="Apellido" autocomplete="family-name">
                <input type="email" name="email" placeholder="Email *" autocomplete="email" required>
                <button type="submit">Registrarse</button>
              </form>
            </div>
          </section>

          <div class="jdr-footer__container">
            <div class="jdr-footer__main">
              <div class="jdr-footer__brand">
                <a href="${SITE_BASE}" target="_blank" rel="noopener noreferrer" class="jdr-footer__brand-logos" aria-label="Ir al sitio web de Jardines del Renacer">
                  <img class="jdr-footer__brand-logo" src="/log_footer.webp" alt="Jardines del Renacer" loading="lazy">
                  <img class="jdr-footer__anniversary" src="/images/25anos_since.png" alt="25 años Jardines del Renacer" loading="lazy">
                </a>
                <p>Brindamos servicios funerarios con dignidad, respeto y paz eterna para tus seres queridos desde hace más de 30 años.</p>
              </div>
              <div class="jdr-footer__column"><h3>Servicios</h3><div class="jdr-footer__panel"><ul>${renderLinkList(links.servicios)}</ul></div></div>
              <div class="jdr-footer__column"><h3>Atención</h3><div class="jdr-footer__panel"><ul>${renderLinkList(links.atencion)}</ul></div></div>
              <div class="jdr-footer__column"><h3>Recursos</h3><div class="jdr-footer__panel"><ul>${renderLinkList(links.recursos)}</ul></div></div>
              <div class="jdr-footer__column"><h3>Soporte</h3><div class="jdr-footer__panel"><ul>${renderLinkList(links.soporte)}</ul></div></div>
            </div>
          </div>

          <div class="jdr-footer__bottom">
            <div class="jdr-footer__container jdr-footer__bottom-grid">
              <p class="jdr-footer__copy">&copy; ${currentYear} <strong>Jardines del Renacer</strong>. Todos los derechos reservados.</p>
              <div class="jdr-footer__social">
                ${socials.map(([name, href, path]) => `<a href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${name}"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${path}"></path></svg></a>`).join('')}
              </div>
              <div class="jdr-footer__credit"><a href="https://github.com/JuanMonza" target="_blank" rel="noopener noreferrer">Diseñado por Juan Monza</a></div>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  function mount() {
    ensureStyles();
    const targets = document.querySelectorAll('[data-jardines-footer]');
    const nodes = targets.length ? targets : [document.body];
    nodes.forEach((target) => {
      if (target.dataset && target.dataset.footerMounted === 'true') return;
      if (target === document.body) {
        target.insertAdjacentHTML('beforeend', footerHtml());
      } else {
        target.innerHTML = footerHtml();
        target.dataset.footerMounted = 'true';
      }
    });

    document.querySelectorAll('[data-jdr-newsletter]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Gracias por suscribirte. Te mantendremos informado.');
        form.reset();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
