// 모든 동적 바인딩/테마/모션/오토프루닝은 이 파일에서 수행됩니다.
// 수정은 data/config.js 한 곳만 하세요.

(function () {
  const cfg = window.SITE || {};
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    // 1) 문서 언어/메타/OG
    if (cfg.site?.lang) document.documentElement.lang = cfg.site.lang;
    if (cfg.site?.title) document.title = cfg.site.title;
    setMeta('description', cfg.site?.description || '');
    setOG({
      'og:title': cfg.site?.ogTitle || cfg.site?.title || '',
      'og:description': cfg.site?.ogDescription || cfg.site?.description || '',
      'og:type': 'website'
    });

    // 2) 파비콘/로고/브랜드
    if (cfg.site?.faviconPath) setFavicon(cfg.site.faviconPath);
    if (cfg.site?.logoPath) $('#logoImg').src = cfg.site.logoPath;
    if (cfg.alt?.logoAlt) $('#logoImg').alt = cfg.alt.logoAlt || '';
    if (cfg.site?.name) $('#brandName').textContent = cfg.site.name;

    // 3) 테마 & 모션 토큰
    injectTheme(cfg.theme);
    applyMotionTokens(cfg.motion);
    enableMotionFlags(cfg.motion, cfg.features);

    // 4) 폰트 로딩 (선택)
    if (cfg.theme?.font?.googleFontURL) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cfg.theme.font.googleFontURL;
      document.head.appendChild(link);
    }

    // 5) 접근성 라벨
    setText('.skip-link', cfg.a11y?.skipToContent || '');
    setAriaLabel('#siteNav', cfg.a11y?.primaryNav || '');
    setAriaLabel('#navToggle', cfg.a11y?.navToggleLabelClosed || '');
    setupNavToggle(cfg.a11y?.navToggleLabelOpen, cfg.a11y?.navToggleLabelClosed);

    // 6) 내비게이션 (초기 렌더)
    buildNav(cfg.nav || []);

    // 7) Hero (안전 프리로드 적용)
    setHeroBackground(cfg.site?.heroBackgroundPath);
    setText('#heroHeadline', cfg.hero?.headline || '');
    setText('#heroSubhead', cfg.hero?.subhead || '');
    setLink('#heroCta', cfg.hero?.ctaHref || '#', cfg.hero?.ctaLabel || '');
    setAriaLabel('#partnerRow', cfg.alt?.partnersRegion || '');
    renderPartners(cfg.partners || [], cfg.alt?.partnerLogoAlt || '');

    // 8) About
    setText('#aboutTitle', cfg.about?.title || '');
    setText('#aboutBody', cfg.about?.body || '');
    if (cfg.about?.imagePath) $('#aboutImg').src = cfg.about.imagePath;
    if (cfg.alt?.aboutImageAlt) $('#aboutImg').alt = cfg.alt.aboutImageAlt || '';
    renderList('#aboutHighlights', cfg.about?.highlights || []);

    // 9) Products
    setText('#productsTitle', cfg.productsSection?.title || '');
    setText('#productsIntro', cfg.productsSection?.intro || '');
    renderProducts(cfg.products || [], cfg.labels?.seeMore || '', cfg.alt?.productImageAlt || '');

    // 10) Process
    setText('#processTitle', cfg.process?.title || '');
    renderProcess(cfg.process?.steps || []);

    // 11) FAQ
    setText('#faqTitle', cfg.faqSection?.title || '');
    renderFAQ(cfg.faq || []);

    // 12) Contact
    setText('#contactTitle', cfg.contact?.title || '');
    setText('#contactIntro', cfg.contact?.intro || '');
    setText('#addrLabel', cfg.labels?.address || '');
    setText('#telLabel', cfg.labels?.phone || '');
    setText('#mailLabel', cfg.labels?.email || '');
    setText('#contactAddress', cfg.contact?.address || '');
    if (cfg.contact?.phone) setLink('#contactPhone', `tel:${cfg.contact.phone}`, cfg.contact.phone);
    if (cfg.contact?.email) {
      setLink('#contactEmail', `mailto:${cfg.contact.email}`, cfg.contact.email);
      setLink('#contactCta', `mailto:${cfg.contact.email}?subject=${encodeURIComponent(cfg.contact?.mailSubject || '')}`, cfg.contact?.ctaLabel || '');
    }

    // 지도(카카오 Roughmap)
    renderMapEmbed(cfg.contact?.mapEmbed);

    // SNS
    renderSocials('#socialLinks', cfg.social || {});

    // 13) 푸터(사업자등록번호 포함)
    const year = new Date().getFullYear();
    const name = cfg.footer?.copyrightName || cfg.site?.name || '';
    const regLabel = cfg.labels?.businessRegNoLabel || '';
    const regNo = cfg.footer?.businessRegNo || '';
    const tail = (regLabel && regNo) ? ` · ${regLabel} ${regNo}` : '';
    if ($('#copyright')) {
      $('#copyright').textContent = (name ? `© ${year} ${name}. All rights reserved.` : '') + tail;
    }
    renderFooterLinks(cfg.footer?.links || []);

    // 14) 스무스 스크롤
    setupSmoothScroll(cfg.settings?.smoothScroll !== false);

    // ====== Auto-hide & Layout Normalize & Nav Pruning ======
    const auto = cfg.settings?.autoHideOnEmpty !== false;

    // Hero 가시성
    const heroHas = ![cfg.hero?.headline, cfg.hero?.subhead, cfg.hero?.ctaLabel, cfg.site?.heroBackgroundPath].every(isEmptyText);
    toggleSection('#home', sectionEnabled('hero') && (heroHas || !auto));

    // 파트너 로고 줄
    const partnersHas = (cfg.partners || []).length > 0;
    if (!sectionEnabled('partners') || (auto && !partnersHas)) { const row = $('#partnerRow'); if (row) row.style.display = 'none'; }

    // About
    const aboutHas = ![cfg.about?.title, cfg.about?.body, cfg.about?.imagePath].every(isEmptyText) ||
                     (cfg.about?.highlights || []).length > 0;
    toggleSection('#about', sectionEnabled('about') && (aboutHas || !auto));
    normalizeTwoCol('#about', '#aboutImg', true);

    // Products
    const productsHas = (cfg.products || []).length > 0;
    toggleSection('#products', sectionEnabled('products') && (productsHas || !auto));

    // Process
    const processHas = (cfg.process?.steps || []).length > 0 || !isEmptyText(cfg.process?.title);
    toggleSection('#process', sectionEnabled('process') && (processHas || !auto));

    // FAQ
    const faqHas = (cfg.faq || []).length > 0 || !isEmptyText(cfg.faqSection?.title);
    toggleSection('#faq', sectionEnabled('faq') && (faqHas || !auto));
    if (auto && isEmptyText(cfg.faqSection?.title)) { const t = $('#faqTitle'); if (t) t.textContent = ''; }

    // Contact (SNS/지도 포함)
    const socialHas = sectionEnabled('social') && Object.values(cfg.social || {}).some(Boolean);
    if (!socialHas) { const s = $('#socialLinks'); if (s) s.style.display = 'none'; }
    const mapEnabled = sectionEnabled('mapEmbed') && !!cfg.contact?.mapEmbed;
    if (!mapEnabled) {
      // #mapEmbed 비어 있으면 1열 정리
      normalizeTwoCol('#contact', '#mapEmbed', false);
    }
    const contactMainFilled = ![cfg.contact?.title, cfg.contact?.intro, cfg.contact?.address, cfg.contact?.phone, cfg.contact?.email].every(isEmptyText);
    const contactHas = contactMainFilled || socialHas || mapEnabled;
    toggleSection('#contact', sectionEnabled('contact') && (contactHas || !auto));

    // 푸터 링크/모달
    if (!sectionEnabled('footerLinks')) { const wrap = $('#footerLinks'); if (wrap) wrap.style.display = 'none'; }
    if (!sectionEnabled('legalDialogs')) { $('#dlgPrivacy')?.remove(); $('#dlgTerms')?.remove(); }

    // 네비게이션: 보이는 섹션만 남기기
    pruneNavByVisibility(cfg.nav || []);

    // 첫/마지막 섹션 여백 마무리
    finalizeVerticalRhythm();

    // ====== Professional Motion: Reveal on scroll ======
    if (cfg.motion?.enabled && cfg.motion?.revealOnScroll) {
      markRevealTargets();
      setupRevealObserver({ once: cfg.motion?.revealOnce !== false });
    }
  }

  /* ====== Meta/OG/Favicon & Theme ====== */
  function setMeta(name, content) {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
    el.setAttribute('content', content);
  }
  function setOG(map) {
    Object.entries(map).forEach(([p, v]) => {
      if (v == null) return;
      let el = document.querySelector(`meta[property="${p}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', p); document.head.appendChild(el); }
      el.setAttribute('content', v);
    });
  }
  function setFavicon(href) {
    let link = document.querySelector('link[rel="icon"]');
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.href = href;
  }
  function injectTheme(theme = {}) {
    const root = document.documentElement;
    // 색상: 키 매핑(bg/background 둘 다 허용)
    const mapKey = (k) => {
      if (k === 'bg' || k === 'background') return 'bg';
      return k;
    };
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([k, v]) => {
        const key = mapKey(k);
        const varName = ({
          primary: '--color-primary',
          onPrimary: '--color-on-primary',
          bg: '--color-bg',
          surface: '--color-surface',
          text: '--color-text',
          muted: '--color-muted'
        })[key];
        if (varName) root.style.setProperty(varName, v);
      });
    }
    if (theme.font?.family) root.style.setProperty('--font-family', theme.font.family);
    if (theme.radii?.lg) root.style.setProperty('--radius-lg', theme.radii.lg);
    if (theme.shadows?.md) root.style.setProperty('--shadow-md', theme.shadows.md);
    if (theme.containerMax) root.style.setProperty('--container-max', theme.containerMax);
    if (theme.spacingBase) root.style.setProperty('--space-base', theme.spacingBase);
  }

  /* ====== Basic Setters ====== */
  function setText(sel, text) { const el = $(sel); if (el && typeof text === 'string') el.textContent = text; }
  function setLink(sel, href, label) { const el = $(sel); if (!el) return; if (href) el.setAttribute('href', href); if (typeof label === 'string') el.textContent = label; }
  function setAriaLabel(sel, label) { const el = $(sel); if (el && typeof label === 'string') el.setAttribute('aria-label', label); }

  /* ====== Builders ====== */
  function buildNav(items) {
    const list = $('#navList'); if (!list) return;
    list.innerHTML = '';
    (items || []).forEach(({ label, href }) => {
      if (!label || !href) return;
      const li = document.createElement('li');
      const a  = document.createElement('a');
      a.textContent = label; a.href = href;
      li.appendChild(a); list.appendChild(li);
    });
  }
  function renderPartners(arr, alt) {
    const row = $('#partnerRow'); if (!row) return;
    row.innerHTML = '';
    (arr || []).forEach(src => {
      const img = document.createElement('img');
      img.src = src; if (alt) img.alt = alt;
      row.appendChild(img);
    });
  }
  function renderList(sel, items) {
    const ul = $(sel); if (!ul) return;
    ul.innerHTML = '';
    (items || []).forEach(t => { const li = document.createElement('li'); li.textContent = t; ul.appendChild(li); });
  }
  function renderProducts(products, defaultBtnLabel, imageAlt) {
    const grid = $('#productGrid'); if (!grid) return;
    grid.innerHTML = '';
    (products || []).forEach(p => {
      const card = document.createElement('article'); card.className = 'card';

      const media = document.createElement('div'); media.className = 'card-media';
      const img = document.createElement('img');
      if (p.imagePath) img.src = p.imagePath;
      if (imageAlt) img.alt = imageAlt;
      media.appendChild(img);

      const body = document.createElement('div'); body.className = 'card-body';
      const h3 = document.createElement('h3'); if (p.name) h3.textContent = p.name;
      const pEl = document.createElement('p'); if (p.summary) pEl.textContent = p.summary;
      const actions = document.createElement('div'); actions.className = 'card-actions';
      const a = document.createElement('a'); a.className = 'btn btn-primary';
      if (p.linkHref) a.href = p.linkHref;
      a.textContent = p.linkLabel || defaultBtnLabel || '';
      actions.appendChild(a);

      body.append(h3, pEl, actions);
      card.append(media, body);
      grid.appendChild(card);
    });
  }
  function renderProcess(steps) {
    const wrap = $('#processList'); if (!wrap) return;
    wrap.innerHTML = '';
    (steps || []).forEach(s => {
      const div = document.createElement('div'); div.className = 'step';
      const h3 = document.createElement('h3'); if (s.title) h3.textContent = s.title;
      const p = document.createElement('p'); if (s.desc) p.textContent = s.desc;
      div.append(h3, p);
      wrap.appendChild(div);
    });
  }
  function renderFAQ(faq) {
    const wrap = $('#faqList'); if (!wrap) return;
    wrap.innerHTML = '';
    (faq || []).forEach(q => {
      const det = document.createElement('details');
      const sum = document.createElement('summary'); if (q.q) sum.textContent = q.q;
      const p = document.createElement('p'); if (q.a) p.textContent = q.a;
      det.append(sum, p);
      wrap.appendChild(det);
    });
  }
  function renderSocials(sel, social) {
    const wrap = $(sel); if (!wrap) return;
    wrap.innerHTML = '';
    Object.entries(social || {}).forEach(([name, url]) => {
      if (!url) return;
      const a = document.createElement('a');
      a.href = url; a.target = '_blank'; a.rel = 'noopener';
      a.textContent = name;
      wrap.appendChild(a);
    });
  }

  /* ====== Footer / Legal ====== */
  function renderFooterLinks(links) {
    const wrap = $('#footerLinks'); if (!wrap) return;
    wrap.innerHTML = '';
    (links || []).forEach(link => {
      if (!link?.label) return;
      const a = document.createElement('a');
      a.textContent = link.label;

      const useInline = (cfg.legal?.useInlineDialogs && sectionEnabled('footerLinks') && sectionEnabled('legalDialogs'));
      if (useInline && link.kind === 'privacy') {
        a.href = '#'; a.addEventListener('click', (e) => { e.preventDefault(); openPrivacy(); });
      } else if (useInline && link.kind === 'terms') {
        a.href = '#'; a.addEventListener('click', (e) => { e.preventDefault(); openTerms(); });
      } else {
        a.href = link.href || '#';
      }
      wrap.appendChild(a);
    });

    // 다이얼로그 내용/버튼 라벨
    const closeLabel = cfg.labels?.close || '닫기';
    if ($('#privacyTitle')) {
      $('#privacyTitle').textContent = cfg.legal?.privacy?.title || '';
      $('#privacyBody').textContent = cfg.legal?.privacy?.content || '';
      $('#privacyClose').textContent = closeLabel;
    }
    if ($('#termsTitle')) {
      $('#termsTitle').textContent = cfg.legal?.terms?.title || '';
      $('#termsBody').textContent = cfg.legal?.terms?.content || '';
      $('#termsClose').textContent = closeLabel;
    }
  }
  function openPrivacy() { $('#dlgPrivacy')?.showModal(); }
  function openTerms()   { $('#dlgTerms')?.showModal(); }

  /* ====== Kakao Roughmap Embed ====== */
  function parseAspect(v) {
    if (typeof v === 'number' && v > 0) return v;
    const m = String(v || '').trim().match(/^(\d+)\s*[:/]\s*(\d+)$/);
    if (m) return parseFloat(m[1]) / parseFloat(m[2]);
    const n = parseFloat(v); return isFinite(n) && n > 0 ? n : (16/9);
  }
  function renderMapEmbed(embed) {
    const wrap = document.querySelector('#mapEmbed');
    if (!wrap || !embed || embed.type !== 'kakao-roughmap' || sectionEnabled('mapEmbed') === false) return;

    // 컨테이너 id는 timestamp로 강제 생성 (불일치 방지)
    const ts = String(embed.timestamp || '').trim();
    if (!ts) return; // timestamp 없으면 종료
    const id = `daumRoughmapContainer${ts}`;

    if (window.SITE?.alt?.mapRegionLabel) {
      wrap.setAttribute('aria-label', window.SITE.alt.mapRegionLabel);
    }

    // 컨테이너 생성
    const container = document.createElement('div');
    container.id = id;
    container.className = 'root_daum_roughmap root_daum_roughmap_landing';
    wrap.innerHTML = '';
    wrap.appendChild(container);

    // roughmapLoader.js가 정적으로 로드될 때까지 대기
    waitForDaumRoughmap().then(() => {
      new daum.roughmap.Lander({
        "timestamp": ts,
        "key": String(embed.key || ''),
        "mapWidth": String(embed.width || 640),
        "mapHeight": String(embed.height || 360)
      }).render();

      // 반응형 + 내부 고정 px 교정
      const ar = parseAspect(embed.aspectRatio) || ((embed.width && embed.height) ? (embed.width / embed.height) : (16/9));
      if (embed.responsive) {
        wrap.dataset.responsive = 'true';
        wrap.style.setProperty('--map-aspect', ar);
      }
      const adjust = () => fixRoughmapInnerSize(container, wrap, ar);
      adjust();
      setTimeout(adjust, 300);
      window.addEventListener('resize', adjust);
      window.addEventListener('orientationchange', adjust);
    }).catch(() => {
      // 로더가 없다면 조용히 패스 (필요 시 콘솔 로그)
      // console.warn('Kakao roughmap loader not available');
    });
  }

  function waitForDaumRoughmap(timeout = 8000, interval = 50) {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      (function check() {
        if (window.daum && window.daum.roughmap) return resolve();
        if (Date.now() - start > timeout) return reject(new Error('timeout'));
        setTimeout(check, interval);
      })();
    });
  }

  /* ====== Auto Hide / Layout Normalize / Nav Pruning ====== */
  function isEmptyText(v) { return v == null || (typeof v === 'string' && v.trim() === ''); }
  function sectionEnabled(name, def = true) {
    const f = (cfg.features ?? {});
    return (name in f) ? !!f[name] : def;
  }
  function toggleSection(sel, show) {
    const el = $(sel);
    if (!el) return;
    el.classList.toggle('hidden', !show);
    el.setAttribute('aria-hidden', String(!show));
  }
  function sectionIsVisible(sel) {
    const el = $(sel); return !!(el && !el.classList.contains('hidden'));
  }
  function pruneNavByVisibility(navCfg) {
    const filtered = (navCfg || []).filter(item => item?.href && sectionIsVisible(item.href));
    const list = $('#navList'); if (!list) return;
    list.innerHTML = '';
    filtered.forEach(({ label, href }) => {
      const li = document.createElement('li'); const a = document.createElement('a');
      a.textContent = label; a.href = href; li.appendChild(a); list.appendChild(li);
    });
  }
  function normalizeTwoCol(sectionSel, mediaSel, isImg = true) {
    const sec = $(sectionSel); if (!sec) return;
    const media = sec.querySelector(mediaSel) || sec.querySelector('.media > *');
    const has = !!(media && ((isImg && media.getAttribute && media.getAttribute('src')) || (!isImg && media.children && media.children.length > 0)));
    if (!has) {
      const cont = sec.querySelector('.container'); cont?.classList.add('one-col');
      sec.querySelector('.media')?.remove();
    }
  }
  function finalizeVerticalRhythm() {
    const visible = Array.from(document.querySelectorAll('main .section'))
      .filter(el => !el.classList.contains('hidden'));
    visible.forEach(el => el.classList.remove('is-first','is-last'));
    if (visible[0]) visible[0].classList.add('is-first');
    if (visible[visible.length - 1]) visible[visible.length - 1].classList.add('is-last');
  }

  /* ====== Motion ====== */
  function applyMotionTokens(m = {}) {
    const r = document.documentElement.style;
    if (m.duration) r.setProperty('--motion-duration', `${m.duration}ms`);
    if (m.easing)   r.setProperty('--motion-ease', m.easing);
    if (m.distance) r.setProperty('--reveal-distance', m.distance);
    if (m.stagger)  r.setProperty('--stagger', `${m.stagger}ms`);
  }
  function enableMotionFlags(m = {}, features = {}) {
    const root = document.documentElement;
    if (m.enabled === false) return;
    if (m.navUnderline) root.classList.add('anim-nav');
    if (m.cardHoverLift) root.classList.add('anim-card');
    if (m.heroKenBurns && (features?.hero ?? true)) root.classList.add('anim-hero-kenburns');
  }
  function markRevealTargets() {
    const groups = [
      ['#home .hero-inner > *'],
      ['#about h2, #about p, #about .checklist li'],
      ['#products h2, #products .section-intro, #productGrid .card'],
      ['#process h2, #process .step'],
      ['#faq #faqTitle, #faq .faq-list > *'],
      ['#contact h2, #contact p, #contact .contact-list > li, #socialLinks a']
    ];
    let idx = 0;
    groups.forEach(([sel]) => {
      document.querySelectorAll(sel).forEach(el => {
        el.classList.add('reveal');
        el.style.setProperty('--i', idx++);
      });
      idx = 0; // 그룹마다 리셋
    });
  }
  function setupRevealObserver({ once = true } = {}) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          if (once) io.unobserve(entry.target);
        } else if (!once) {
          entry.target.classList.remove('is-in');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  /* ====== Hero Background (flicker-free) ====== */
  function setHeroBackground(src) {
    const el = document.querySelector('.hero-bg');
    if (!el || !src) return;

    const url = String(src).trim();
    const test = new Image();

    test.onload = () => {
      el.style.backgroundImage = `url("${url.replace(/"/g, '\\"')}")`;
      document.documentElement.style.setProperty('--hero-bg-url', `url("${url.replace(/"/g, '\\"')}")`);
      el.classList.add('bg-ready');
    };
    test.onerror = () => { /* 실패 시 플레이스홀더 유지 */ };

    try { test.referrerPolicy = 'no-referrer'; } catch(e) {}
    test.src = url;
  }

  /* ====== Interactions ====== */
  function setupNavToggle(labelOpen, labelClosed) {
    const btn = $('#navToggle'); const nav = $('#siteNav');
    btn?.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open && labelOpen) btn.setAttribute('aria-label', labelOpen);
      if (!open && labelClosed) btn.setAttribute('aria-label', labelClosed);
    });
    $$('#siteNav a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false');
      if (labelClosed) btn.setAttribute('aria-label', labelClosed);
    }));
  }
  function setupSmoothScroll(enable = true) {
    if (!enable) return;
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]'); if (!a) return;
      const id = a.getAttribute('href'); if (!id || id === '#') return;
      const target = document.querySelector(id); if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ====== Kakao map inner size fixer ====== */
  function fixRoughmapInnerSize(container, wrap, ar = 16/9) {
    if (!container || !wrap) return;
    let targetH;
    if (CSS.supports('aspect-ratio: 1/1')) {
      targetH = wrap.clientHeight;
    } else {
      targetH = Math.round(wrap.clientWidth / ar);
    }
    container.style.width = '100%';
    container.style.height = targetH + 'px';

    const innerCandidates = container.querySelectorAll('iframe, .wrap_map, .map_container');
    innerCandidates.forEach(el => {
      el.style.width = '100%';
      el.style.height = '100%';
    });
  }
})();
