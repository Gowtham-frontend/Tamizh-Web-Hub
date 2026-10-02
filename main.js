(() => {
  const C = window.TWH || {};
  const $ = (s, r = document) => r.querySelector(s);
  const hasSB = C.SUPABASE_URL && C.SUPABASE_ANON_KEY && window.supabase;
  const sb = hasSB ? window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY) : null;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  /* ---------- Contact links (single config) ---------- */
  const wa = `https://wa.me/${C.WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Tamizh Web Hub, I would like to discuss a website project.')}`;
  $('#waBtn').href = wa;
  $('#mailBtn').href = `mailto:${C.EMAIL}`;

  /* ---------- Services ---------- */
  const icons = {
    monitor:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    layout:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    cart:'<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a1 1 0 001 .8h9.1a1 1 0 001-.8L21 7H6"/>',
    phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    refresh:'<path d="M20 11a8 8 0 10-2.3 5.7M20 4v7h-7"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    wrench:'<path d="M14.7 6.3a4 4 0 005 5L21 13l-8 8-4-4 8-8z"/><path d="M3 21l4-4"/>'
  };
  const services = [
    ['monitor','Business Website Design','Professional multi-page sites that present your brand with confidence.'],
    ['layout','Landing Page Design','Focused single pages built to turn visitors into enquiries.'],
    ['cart','E-Commerce Website Development','Online stores with product catalogues and easy ordering.'],
    ['phone','Responsive Website Development','Layouts that work smoothly on phones, tablets and desktops.'],
    ['refresh','Website Redesign','Give an outdated website a fresh, modern look.'],
    ['globe','Domain & Hosting Setup','We register, connect and launch your website for you.'],
    ['search','Basic SEO Optimization','Clean structure and metadata so customers can find you.'],
    ['wrench','Website Maintenance','Updates, fixes and support after your website goes live.']
  ];
  $('#serviceGrid').innerHTML = services.map(([i,t,d]) =>
    `<article class="card reveal"><svg viewBox="0 0 24 24">${icons[i]}</svg><h3>${t}</h3><p>${d}</p></article>`).join('');

  /* ---------- Projects (Supabase with fallback) ---------- */
  const fallback = [
    {title:'LEAFCORE',industry:'Herbal & Botanical Export',description:'Export-focused catalogue site for herbal and botanical products.',url:'https://leafcore.in'},
    {title:'LG Medical Centre',industry:'Healthcare & Medical',description:'Trusted hospital website with departments, doctors and appointments.',url:''},
    {title:'Cheran Spinner',industry:'Textile & Manufacturing',description:'Corporate website for a spinning mill showcasing capacity and quality.',url:''},
    {title:'Sri Thindal Cafe',industry:'Food & Hospitality',description:'Warm cafe and bakery site with menu highlights and location.',url:''}
  ];
  async function loadProjects() {
    let list = fallback;
    if (sb) {
      const { data, error } = await sb.from('projects').select('*').eq('published', true).order('sort_order');
      if (!error && data && data.length) list = data;
    }
    $('#works').innerHTML = list.map(p => `
      <article class="work reveal">
        <div class="laptop"><div class="screen">${p.image_url ? `<img src="${esc(p.image_url)}" alt="${esc(p.title)} website preview" loading="lazy">` : esc(p.title)}</div></div>
        <div class="base"></div>
        <em>${esc(p.industry)}</em><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>
        ${p.url ? `<a class="btn ghost" href="${esc(p.url)}" target="_blank" rel="noopener">View Project</a>` : `<span class="btn ghost" aria-disabled="true">Link coming soon</span>`}
      </article>`).join('');
    animateReveals();
    bindHover();
  }

  /* ---------- Contact form ---------- */
  $('#form').addEventListener('submit', async e => {
    e.preventDefault();
    const f = e.target, msg = $('#formMsg'), d = Object.fromEntries(new FormData(f));
    if (!d.name.trim()) { msg.textContent = 'Please enter your name.'; return; }
    msg.textContent = 'Sending...';
    if (sb) {
      const { error } = await sb.from('enquiries').insert(d);
      if (error) { msg.textContent = 'Could not send. Please use WhatsApp or email instead.'; return; }
      msg.textContent = 'Thank you! We will contact you soon.'; f.reset();
    } else {
      const body = `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone}\nBusiness: ${d.business}\nRequirements: ${d.requirements}\nMessage: ${d.message}`;
      window.open(`https://wa.me/${C.WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`, '_blank');
      msg.textContent = 'Opening WhatsApp with your details.';
    }
  });

  /* ---------- Menu ---------- */
  const btn = $('#menuBtn'), menu = $('#menu');
  btn.onclick = () => { const o = menu.classList.toggle('open'); btn.setAttribute('aria-expanded', o); };
  menu.querySelectorAll('a').forEach(a => a.onclick = () => { menu.classList.remove('open'); btn.setAttribute('aria-expanded', false); });

  /* ---------- Progress bar ---------- */
  addEventListener('scroll', () => {
    const h = document.documentElement;
    $('#progress').style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  }, { passive: true });

  /* ---------- Cursor, magnetic buttons, tilt ---------- */
  const cur = $('#cursor');
  addEventListener('mousemove', e => { cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; });
  function bindHover() {
    document.querySelectorAll('a,button,.card,.work').forEach(el => {
      el.onmouseenter = () => cur.classList.add('big');
      el.onmouseleave = () => cur.classList.remove('big');
    });
  }
  document.querySelectorAll('.magnetic').forEach(b => {
    b.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`;
    });
    b.addEventListener('mouseleave', () => b.style.transform = '');
  });
  document.addEventListener('mousemove', e => {
    const c = e.target.closest && e.target.closest('.card');
    document.querySelectorAll('.card').forEach(x => { if (x !== c) x.style.transform = ''; });
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.transform = `perspective(700px) rotateX(${-((e.clientY - r.top) / r.height - .5) * 8}deg) rotateY(${((e.clientX - r.left) / r.width - .5) * 8}deg)`;
  });

  /* ---------- GSAP ---------- */
  function animateReveals() {
    if (!window.gsap) { document.querySelectorAll('.reveal').forEach(e => e.style.opacity = 1); return; }
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('.reveal:not(.done)').forEach(el => {
      el.classList.add('done');
      gsap.to(el, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    ScrollTrigger.refresh();
  }
  document.querySelectorAll('.hero h1 .line').forEach(l => l.innerHTML = `<span>${l.textContent}</span>`);
  window.addEventListener('load', () => {
    setTimeout(() => {
      $('#loader').style.cssText = 'opacity:0;pointer-events:none;transition:opacity .6s';
      if (window.gsap) {
        gsap.from('.hero h1 .line span', { yPercent: 110, duration: 1.1, stagger: .12, ease: 'power4.out' });
        gsap.from('.kicker,.sub,.hero .cta', { opacity: 0, y: 24, duration: .9, delay: .5, stagger: .12 });
        gsap.to('#sphere', { yPercent: -8, scrollTrigger: { trigger: '.hero', scrub: true, start: 'top top', end: 'bottom top' } });
        document.querySelectorAll('[data-count]').forEach(n => {
          const o = { v: 0 }, t = +n.dataset.count;
          gsap.to(o, { v: t, duration: 1.6, scrollTrigger: { trigger: n, start: 'top 90%', once: true },
            onUpdate: () => n.textContent = Math.round(o.v) + (n.dataset.suffix || '') });
        });
      }
    }, 1200);
  });

  /* ---------- 3D sphere (canvas) ---------- */
  const cv = $('#sphere'), ctx = cv.getContext('2d');
  let W, pts = [], mx = 0, my = 0, rot = 0;
  const N = 420;
  for (let i = 0; i < N; i++) { const y = 1 - i / (N - 1) * 2, r = Math.sqrt(1 - y * y), t = i * 2.39996; pts.push([Math.cos(t) * r, y, Math.sin(t) * r]); }
  const parts = Array.from({ length: 60 }, () => ({ x: Math.random(), y: Math.random(), s: Math.random() * .0006 + .0002 }));
  function size() { const r = cv.getBoundingClientRect(), d = devicePixelRatio || 1; cv.width = r.width * d; cv.height = r.height * d; W = cv.width; }
  size(); addEventListener('resize', size);
  addEventListener('mousemove', e => { mx = (e.clientX / innerWidth - .5); my = (e.clientY / innerHeight - .5); });
  const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
  (function draw() {
    ctx.clearRect(0, 0, W, W);
    const g = ctx.createRadialGradient(W / 2, W / 2, W * .05, W / 2, W / 2, W * .5);
    g.addColorStop(0, 'rgba(255,107,0,.22)'); g.addColorStop(1, 'rgba(255,107,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, W);
    if (!still) rot += .004;
    const ry = rot + mx * 1.2, rx = my * .8, R = W * .3;
    for (const [x, y, z] of pts) {
      const x1 = x * Math.cos(ry) - z * Math.sin(ry), z1 = x * Math.sin(ry) + z * Math.cos(ry);
      const y2 = y * Math.cos(rx) - z1 * Math.sin(rx), z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
      const k = (z2 + 1) / 2, s = (1.2 + k * 2.4) * (W / 800);
      ctx.fillStyle = `rgba(255,${90 + k * 70 | 0},0,${.15 + k * .85})`;
      ctx.beginPath(); ctx.arc(W / 2 + x1 * R, W / 2 + y2 * R, s, 0, 7); ctx.fill();
    }
    ctx.fillStyle = 'rgba(255,255,255,.5)';
    for (const p of parts) { p.y -= p.s; if (p.y < 0) p.y = 1; ctx.fillRect(p.x * W, p.y * W, 2, 2); }
    requestAnimationFrame(draw);
  })();

  loadProjects();
  bindHover();
})();
