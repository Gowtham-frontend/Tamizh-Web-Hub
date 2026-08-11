/* ==========================================================================
   TAMIL WEB APP — SCRIPT
   Sections: 0 helpers  1 loader  2 kolam bg  3 cursor  4 navbar  5 3D hero
   6 magnetic buttons  7 scroll reveal  8 counters  9 render(services,
   portfolio, reviews, pricing, faq)  10 portfolio filter+drag  11 faq
   accordion  12 contact form  13 whatsapp links  14 back-to-top
   ========================================================================== */

(function(){
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const isMobileWidth = () => window.innerWidth <= 860;

  /* ------------------------------------------------------------------ */
  /* 1. LOADER                                                          */
  /* ------------------------------------------------------------------ */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => loader && loader.classList.add("is-hidden"), 500);
  });
  // Safety: hide loader even if 'load' is delayed by slow assets
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("is-hidden");
  }, 3200);

  /* ------------------------------------------------------------------ */
  /* 2. KOLAM GRID BACKGROUND — dot lattice that pulses like a circuit  */
  /* ------------------------------------------------------------------ */
  (function kolamBackground(){
    const canvas = document.getElementById("kolam-bg");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots = [];
    const spacing = isMobileWidth() ? 54 : 68;

    function resize(){
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = document.documentElement.scrollHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = document.documentElement.scrollHeight + "px";
      buildDots();
    }

    function buildDots(){
      dots = [];
      const cols = Math.ceil(w / (spacing * dpr)) + 1;
      const rows = Math.ceil(h / (spacing * dpr)) + 1;
      for (let r = 0; r < rows; r++){
        for (let c = 0; c < cols; c++){
          dots.push({
            x: c * spacing * dpr,
            y: r * spacing * dpr,
            phase: Math.random() * Math.PI * 2,
            speed: 0.4 + Math.random() * 0.6,
            linked: Math.random() > 0.86
          });
        }
      }
    }

    let t = 0;
    function draw(){
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      t += 0.006;
      const scrollY = window.scrollY * dpr;
      const viewTop = scrollY - 200 * dpr;
      const viewBottom = scrollY + window.innerHeight * dpr + 200 * dpr;

      ctx.lineWidth = 1 * dpr;
      for (let i = 0; i < dots.length; i++){
        const d = dots[i];
        if (d.y < viewTop || d.y > viewBottom) continue;
        const pulse = Math.sin(t * d.speed + d.phase);
        const alpha = 0.05 + Math.max(0, pulse) * 0.10;
        const r = (1.1 + Math.max(0, pulse) * 1.3) * dpr;

        if (d.linked){
          ctx.strokeStyle = `rgba(124,108,255,${alpha * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x + spacing * dpr, d.y);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.fillStyle = i % 7 === 0 ? `rgba(23,227,198,${alpha + 0.05})` : `rgba(124,108,255,${alpha})`;
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", debounce(resize, 250));
    if (!prefersReducedMotion) requestAnimationFrame(draw);
  })();

  /* ------------------------------------------------------------------ */
  /* 0. HELPERS                                                         */
  /* ------------------------------------------------------------------ */
  function debounce(fn, wait){
    let tm;
    return function(...args){ clearTimeout(tm); tm = setTimeout(() => fn.apply(this, args), wait); };
  }

  function whatsappLink(){
    const num = (CONFIG && CONFIG.business && CONFIG.business.whatsappNumber) || "918668070454";
    const msg = (CONFIG && CONFIG.business && CONFIG.business.whatsappMessage) || "Hi, I'd like website details.";
    return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
  }

  /* ------------------------------------------------------------------ */
  /* 3. CUSTOM CURSOR                                                   */
  /* ------------------------------------------------------------------ */
  (function cursor(){
    if (isTouch) return;
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    });

    function loop(){
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    }
    loop();

    document.querySelectorAll("a, button, .filter-chip, input, textarea, select").forEach(el => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-active"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-active"));
    });
  })();

  /* ------------------------------------------------------------------ */
  /* 4. NAVBAR + MOBILE MENU                                            */
  /* ------------------------------------------------------------------ */
  (function navbar(){
    const navbar = document.getElementById("navbar");
    const links = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main > section[id]");
    const toggle = document.getElementById("navToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    function onScroll(){
      navbar.classList.toggle("is-scrolled", window.scrollY > 40);
      let current = sections[0] && sections[0].id;
      const pos = window.scrollY + 140;
      sections.forEach(sec => { if (pos >= sec.offsetTop) current = sec.id; });
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${current}`));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toggle.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });

    document.querySelectorAll(".mobile-link").forEach(l => l.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      toggle.classList.remove("is-open");
      document.body.style.overflow = "";
    }));
  })();

  /* ------------------------------------------------------------------ */
  /* 5. 3D HERO — floating laptop scene (Three.js) with mobile fallback */
  /* ------------------------------------------------------------------ */
  (function heroScene(){
    const canvas = document.getElementById("hero-canvas");
    const wrap = document.getElementById("hero-canvas-wrap");
    if (!canvas || !wrap) return;

    // Lightweight fallback for low-power / no-WebGL / reduced-motion devices
    const lowPower = prefersReducedMotion || !window.WebGLRenderingContext;
    if (lowPower){
      wrap.style.background = "radial-gradient(circle at 50% 45%, rgba(124,108,255,0.25), transparent 65%)";
      return;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch(e){
      return; // fallback: plain glow already in CSS
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.4, 7.5);

    function size(){
      const r = wrap.getBoundingClientRect();
      renderer.setSize(r.width, r.height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileWidth() ? 1.5 : 2));
      camera.aspect = r.width / Math.max(r.height, 1);
      camera.updateProjectionMatrix();
    }

    // ----- lights -----
    scene.add(new THREE.AmbientLight(0x8888ff, 0.7));
    const key = new THREE.PointLight(0x7c6cff, 3.2, 20);
    key.position.set(-3, 3, 4);
    scene.add(key);
    const rim = new THREE.PointLight(0x17e3c6, 2.6, 20);
    rim.position.set(3, -2, 3);
    scene.add(rim);

    // ----- laptop group -----
    const laptop = new THREE.Group();

    const baseGeo = new THREE.BoxGeometry(3.4, 0.14, 2.2, 1, 1, 1);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x11142a, metalness: 0.7, roughness: 0.35 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = -0.9;
    laptop.add(base);

    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, -0.83, -1.05);
    screenGroup.rotation.x = -0.28;

    const screenFrameGeo = new THREE.BoxGeometry(3.4, 2.05, 0.1);
    const screenFrameMat = new THREE.MeshStandardMaterial({ color: 0x11142a, metalness: 0.6, roughness: 0.4 });
    const screenFrame = new THREE.Mesh(screenFrameGeo, screenFrameMat);
    screenFrame.position.y = 1.05;
    screenGroup.add(screenFrame);

    const screenMat = new THREE.MeshBasicMaterial({ color: 0x151933 });
    const screenPlane = new THREE.Mesh(new THREE.PlaneGeometry(3.1, 1.78), screenMat);
    screenPlane.position.set(0, 1.05, 0.056);
    screenGroup.add(screenPlane);

    // glowing "website" content on screen: colored bars via small planes
    const barColors = [0x7c6cff, 0x17e3c6, 0xff6bb3, 0x7c6cff, 0x17e3c6];
    const contentGroup = new THREE.Group();
    const heroBar = new THREE.Mesh(
      new THREE.PlaneGeometry(2.7, 0.55),
      new THREE.MeshBasicMaterial({ color: 0x7c6cff, transparent: true, opacity: 0.55 })
    );
    heroBar.position.set(0, 1.42, 0.06);
    contentGroup.add(heroBar);
    for (let i = 0; i < 3; i++){
      const card = new THREE.Mesh(
        new THREE.PlaneGeometry(0.82, 0.5),
        new THREE.MeshBasicMaterial({ color: barColors[i], transparent: true, opacity: 0.4 })
      );
      card.position.set(-0.95 + i * 0.95, 0.72, 0.06);
      contentGroup.add(card);
    }
    screenGroup.add(contentGroup);
    laptop.add(screenGroup);

    laptop.scale.setScalar(1.15);
    scene.add(laptop);

    // ----- floating website cards around laptop -----
    const floatCards = [];
    const cardGeo = new THREE.PlaneGeometry(0.9, 0.6);
    const cardPositions = [
      { p: [-2.6, 1.1, 0.4], c: 0x7c6cff },
      { p: [2.7, 0.6, -0.3], c: 0x17e3c6 },
      { p: [-2.1, -1.4, 0.8], c: 0xff6bb3 },
      { p: [2.3, -1.1, 0.6], c: 0x7c6cff }
    ];
    cardPositions.forEach((cfg, i) => {
      const group = new THREE.Group();
      const mat = new THREE.MeshBasicMaterial({ color: cfg.c, transparent: true, opacity: 0.16, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(cardGeo, mat);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(cardGeo),
        new THREE.LineBasicMaterial({ color: cfg.c, transparent: true, opacity: 0.7 })
      );
      group.add(mesh, edges);
      group.position.set(...cfg.p);
      group.rotation.set(Math.random() * 0.4 - 0.2, Math.random() * 0.6 - 0.3, Math.random() * 0.2 - 0.1);
      scene.add(group);
      floatCards.push({ group, speed: 0.6 + i * 0.15, offset: i * 1.3, baseY: cfg.p[1] });
    });

    // ----- particles -----
    const particleCount = isMobileWidth() ? 60 : 140;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++){
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x9cc9ff, size: 0.028, transparent: true, opacity: 0.55 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ----- interaction: mouse parallax + drag rotate -----
    let targetRotX = 0, targetRotY = 0;
    let curRotX = 0, curRotY = 0;
    let dragging = false, lastX = 0, lastY = 0;
    let manualRotY = 0, manualRotX = 0;

    function onPointerMove(clientX, clientY){
      const r = wrap.getBoundingClientRect();
      const nx = ((clientX - r.left) / r.width) * 2 - 1;
      const ny = ((clientY - r.top) / r.height) * 2 - 1;
      targetRotY = nx * 0.35;
      targetRotX = ny * 0.2;
    }

    wrap.addEventListener("mousemove", (e) => { if (!dragging) onPointerMove(e.clientX, e.clientY); });
    wrap.addEventListener("mouseleave", () => { targetRotX = 0; targetRotY = 0; });

    wrap.addEventListener("mousedown", (e) => { dragging = true; lastX = e.clientX; lastY = e.clientY; wrap.style.cursor = "grabbing"; });
    window.addEventListener("mouseup", () => { dragging = false; wrap.style.cursor = ""; });
    window.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      manualRotY += (e.clientX - lastX) * 0.004;
      manualRotX += (e.clientY - lastY) * 0.003;
      lastX = e.clientX; lastY = e.clientY;
    });

    wrap.addEventListener("touchstart", (e) => {
      if (e.touches[0]){ dragging = true; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; }
    }, { passive: true });
    wrap.addEventListener("touchmove", (e) => {
      if (!dragging || !e.touches[0]) return;
      manualRotY += (e.touches[0].clientX - lastX) * 0.004;
      manualRotX += (e.touches[0].clientY - lastY) * 0.003;
      lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
    }, { passive: true });
    wrap.addEventListener("touchend", () => { dragging = false; }, { passive: true });

    size();
    window.addEventListener("resize", debounce(size, 200));

    let raf;
    const clock = new THREE.Clock();
    function animate(){
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      curRotX += (targetRotX - curRotX) * 0.06;
      curRotY += (targetRotY - curRotY) * 0.06;

      laptop.rotation.y = curRotY + manualRotY + Math.sin(t * 0.25) * 0.04;
      laptop.rotation.x = -curRotX + manualRotX * -1;
      laptop.position.y = Math.sin(t * 0.6) * 0.12;

      floatCards.forEach((f) => {
        f.group.position.y = f.baseY + Math.sin(t * f.speed + f.offset) * 0.25;
        f.group.rotation.y += 0.003;
        f.group.rotation.z = Math.sin(t * 0.3 + f.offset) * 0.08;
      });

      particles.rotation.y = t * 0.02;

      renderer.render(scene, camera);
    }
    animate();

    // pause when off-screen to save battery/CPU
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){ if (!raf) animate(); }
        else { cancelAnimationFrame(raf); raf = null; }
      });
    }, { threshold: 0.05 });
    io.observe(wrap);
  })();

  /* ------------------------------------------------------------------ */
  /* 6. MAGNETIC BUTTONS                                                */
  /* ------------------------------------------------------------------ */
  (function magnetic(){
    if (isTouch || prefersReducedMotion) return;
    document.querySelectorAll(".magnetic").forEach(btn => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });

    // service card spotlight glow following cursor
    document.querySelectorAll(".service-card").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  })();

  /* ------------------------------------------------------------------ */
  /* 7. SCROLL REVEAL                                                   */
  /* ------------------------------------------------------------------ */
  (function reveal(){
    const els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
    els.forEach(el => io.observe(el));
  })();

  /* ------------------------------------------------------------------ */
  /* 8. ANIMATED COUNTERS                                               */
  /* ------------------------------------------------------------------ */
  (function counters(){
    const nums = document.querySelectorAll(".stat-num");
    if (!nums.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count"), 10) || 0;
        const dur = 1400;
        const start = performance.now();
        function tick(now){
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target);
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.6 });
    nums.forEach(n => io.observe(n));
  })();

  /* ------------------------------------------------------------------ */
  /* 9. RENDER DYNAMIC CONTENT FROM CONFIG                              */
  /* ------------------------------------------------------------------ */
  const ICONS = {
    layout: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3 9h18M9 21V9" stroke="currentColor" stroke-width="1.6"/></svg>',
    user: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.6"/><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    cart: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="21" r="1.4" fill="currentColor"/><circle cx="18" cy="21" r="1.4" fill="currentColor"/><path d="M2 3h3l2.4 12.2a2 2 0 002 1.8h8.2a2 2 0 002-1.6L21 8H6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    bolt: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    refresh: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 0115.4-6.4L21 8M21 3v5h-5M21 12a9 9 0 01-15.4 6.4L3 16M3 21v-5h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    search: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.6"/><path d="M21 21l-4.3-4.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    server: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/><rect x="3" y="14" width="18" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="7" r="1" fill="currentColor"/><circle cx="7" cy="17" r="1" fill="currentColor"/></svg>',
    whatsapp: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.32A7.85 7.85 0 0012.05 4a7.94 7.94 0 00-6.9 11.9L4 20l4.24-1.1a7.9 7.9 0 003.8 1h.01a7.94 7.94 0 007.94-7.94 7.9 7.9 0 00-2.4-5.63z"/></svg>'
  };

  function renderServices(){
    const grid = document.getElementById("servicesGrid");
    if (!grid || typeof CONFIG === 'undefined') return;
    grid.innerHTML = CONFIG.services.map(s => `
      <div class="service-card">
        <div class="service-icon">${ICONS[s.icon] || ICONS.layout}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <a href="#contact" class="service-link">Learn More
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    `).join("");
  }

  function renderPortfolio(){
    const track = document.getElementById("portfolioTrack");
    if (!track || typeof CONFIG === 'undefined') return;
    track.innerHTML = CONFIG.portfolio.map(p => `
      <div class="project-card" data-category="${p.category}">
        <div class="project-thumb">
          <div class="thumb-browser-bar"><span></span><span></span><span></span></div>
          <span class="project-cat-tag">${p.category}</span>
          <div class="project-thumb-body"><span></span><span></span><span></span></div>
        </div>
        <div class="project-body">
          <h3>${p.name}</h3>
          <span class="project-tech">${p.tech}</span>
          <p>${p.desc}</p>
          <a href="#contact" class="project-view">View Project
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>
    `).join("");
  }

  function renderReviews(){
    const grid = document.getElementById("reviewsGrid");
    if (!grid || typeof CONFIG === 'undefined') return;
    grid.innerHTML = CONFIG.testimonials.map(t => `
      <div class="review-card">
        <div class="review-top">
          <div class="review-avatar">${t.name.charAt(0)}</div>
          <div>
            <div class="review-name">${t.name}</div>
            <div class="review-business">${t.business}</div>
          </div>
        </div>
        <div class="review-stars">${"★".repeat(t.rating)}${"☆".repeat(5 - t.rating)}</div>
        <p class="review-text">${t.review}</p>
      </div>
    `).join("");
  }

  function renderPricing(){
    const grid = document.getElementById("pricingGrid");
    if (!grid || typeof CONFIG === 'undefined') return;
    grid.innerHTML = CONFIG.pricing.map(p => `
      <div class="price-card ${p.featured ? "featured" : ""}">
        ${p.featured ? '<span class="price-badge">Most Popular</span>' : ""}
        <h3>${p.name}</h3>
        <p class="price-tagline">${p.tagline}</p>
        <div class="price-amount"><span class="num">${p.price}</span><span class="period">${p.period}</span></div>
        <ul class="price-features">
          ${p.features.map(f => `<li>${f}</li>`).join("")}
        </ul>
        <a href="#contact" class="btn ${p.featured ? "btn-primary" : "btn-outline"} magnetic" style="width:100%">
          <span>Get a Free Quote</span>
        </a>
      </div>
    `).join("");
  }

  function renderFAQ(){
    const list = document.getElementById("faqList");
    if (!list || typeof CONFIG === 'undefined') return;
    list.innerHTML = CONFIG.faq.map((f, i) => `
      <div class="faq-item" data-index="${i}">
        <button class="faq-q" aria-expanded="false">
          <span>${f.q}</span>
          <span class="faq-q-icon">+</span>
        </button>
        <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>
      </div>
    `).join("");
  }

  renderServices();
  renderPortfolio();
  renderReviews();
  renderPricing();
  renderFAQ();

  /* ------------------------------------------------------------------ */
  /* 10. PORTFOLIO — filter + drag-to-scroll carousel                   */
  /* ------------------------------------------------------------------ */
  (function portfolioInteractions(){
    const wrap = document.querySelector(".portfolio-track-wrap");
    const track = document.getElementById("portfolioTrack");
    const filters = document.querySelectorAll(".filter-chip");
    if (!wrap || !track) return;

    filters.forEach(chip => {
      chip.addEventListener("click", () => {
        filters.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        const f = chip.getAttribute("data-filter");
        track.querySelectorAll(".project-card").forEach(card => {
          const show = f === "all" || card.getAttribute("data-category") === f;
          card.classList.toggle("is-hidden", !show);
        });
        wrap.scrollLeft = 0;
      });
    });

    let isDown = false, startX, scrollLeft;
    wrap.addEventListener("mousedown", (e) => {
      isDown = true; wrap.classList.add("is-dragging");
      startX = e.pageX - wrap.offsetLeft; scrollLeft = wrap.scrollLeft;
    });
    ["mouseleave", "mouseup"].forEach(evt => wrap.addEventListener(evt, () => { isDown = false; wrap.classList.remove("is-dragging"); }));
    wrap.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - wrap.offsetLeft;
      wrap.scrollLeft = scrollLeft - (x - startX) * 1.4;
    });
  })();

  /* ------------------------------------------------------------------ */
  /* 11. FAQ ACCORDION                                                  */
  /* ------------------------------------------------------------------ */
  (function faqAccordion(){
    const list = document.getElementById("faqList");
    if (!list) return;
    list.addEventListener("click", (e) => {
      const btn = e.target.closest(".faq-q");
      if (!btn) return;
      const item = btn.closest(".faq-item");
      const answer = item.querySelector(".faq-a");
      const isOpen = item.classList.contains("is-open");

      list.querySelectorAll(".faq-item.is-open").forEach(open => {
        if (open !== item){
          open.classList.remove("is-open");
          open.querySelector(".faq-a").style.maxHeight = null;
          open.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        }
      });

      if (isOpen){
        item.classList.remove("is-open");
        answer.style.maxHeight = null;
        btn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  })();

  /* ------------------------------------------------------------------ */
  /* 12. CONTACT FORM                                                   */
  /* ------------------------------------------------------------------ */
  (function contactForm(){
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());

      if (!data.name || !data.phone){
        status.textContent = "தயவுசெய்து Name மற்றும் Phone Number நிரப்பவும்.";
        status.style.color = "#FF6B6B";
        return;
      }

      // Build a WhatsApp message from the form and open it — works with zero backend.
      const lines = [
        `Hi Tamil Web App, New Enquiry:`,
        `Name: ${data.name}`,
        data.business ? `Business: ${data.business}` : null,
        `Phone: ${data.phone}`,
        data.email ? `Email: ${data.email}` : null,
        `Service: ${data.service}`,
        data.message ? `Message: ${data.message}` : null
      ].filter(Boolean).join("\n");

      const num = (CONFIG && CONFIG.business && CONFIG.business.whatsappNumber) || "918668070454";
      const url = `https://wa.me/${num}?text=${encodeURIComponent(lines)}`;

      status.textContent = "Thanks! Opening WhatsApp to confirm your enquiry…";
      status.style.color = "";
      window.open(url, "_blank", "noopener");
      form.reset();
    });
  })();

  /* ------------------------------------------------------------------ */
  /* 13. WHATSAPP LINKS — wire every WhatsApp trigger to CONFIG number  */
  /* ------------------------------------------------------------------ */
  (function wireWhatsapp(){
    const ids = ["heroWhatsapp", "mobileWhatsapp", "formWhatsapp", "infoWhatsapp", "footerWhatsapp", "floatWhatsapp"];
    const url = whatsappLink();
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el){ el.setAttribute("href", url); el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); }
    });
  })();

  /* ------------------------------------------------------------------ */
  /* 14. BACK TO TOP                                                    */
  /* ------------------------------------------------------------------ */
  (function backToTop(){
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    window.addEventListener("scroll", () => {
      btn.classList.toggle("is-visible", window.scrollY > 700);
    }, { passive: true });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  })();

})();
