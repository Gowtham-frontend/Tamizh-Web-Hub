/* ==========================================================================
   TAMIZH WEB HUB — INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky header on scroll ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 60}ms`;
      revealObserver.observe(el);
    });
  }

  /* ---------- Hero 3D stack tilt (desktop only, lightweight) ---------- */
  const heroVisual = document.getElementById('heroVisual');
  const stack3d = document.getElementById('stack3d');
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (heroVisual && stack3d && canHover && !prefersReducedMotion) {
    let rafId = null;

    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rotateY = -14 + x * 16;
        const rotateX = 6 - y * 14;
        stack3d.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      });
    });

    heroVisual.addEventListener('mouseleave', () => {
      stack3d.style.transform = 'rotateY(-14deg) rotateX(6deg)';
    });
  }

  /* ---------- Portfolio filter ---------- */
  const filterTabs = document.getElementById('filterTabs');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterTabs) {
    filterTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      filterTabs.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;
      portfolioCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('is-hidden', !match);
      });
    });
  }

  /* ---------- Contact form → WhatsApp handoff ---------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fields = {
        name: contactForm.querySelector('#cf-name'),
        phone: contactForm.querySelector('#cf-phone'),
        email: contactForm.querySelector('#cf-email'),
        service: contactForm.querySelector('#cf-service'),
        message: contactForm.querySelector('#cf-message'),
      };

      let isValid = true;

      Object.entries(fields).forEach(([key, field]) => {
        const row = field.closest('.form-row');
        const required = field.hasAttribute('required');
        const value = field.value.trim();
        let fieldValid = true;

        if (required && !value) fieldValid = false;
        if (key === 'phone' && value && !/^[0-9+\s-]{7,15}$/.test(value)) fieldValid = false;
        if (key === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) fieldValid = false;

        row.classList.toggle('has-error', !fieldValid);
        if (!fieldValid) isValid = false;
      });

      if (!isValid) {
        formNote.textContent = 'Please check the highlighted fields and try again.';
        formNote.style.color = '#ff8a80';
        return;
      }

      formNote.style.color = '';
      formNote.textContent = 'Opening WhatsApp with your details…';

      const lines = [
        'Hi Tamizh Web Hub, I would like to get in touch.',
        `Name: ${fields.name.value.trim()}`,
        `Phone: ${fields.phone.value.trim()}`,
        `Email: ${fields.email.value.trim()}`,
        `Service: ${fields.service.value}`,
      ];
      if (fields.message.value.trim()) {
        lines.push(`Message: ${fields.message.value.trim()}`);
      }

      const waMessage = encodeURIComponent(lines.join('\n'));
      window.open(`https://wa.me/918668070454?text=${waMessage}`, '_blank', 'noopener');

      contactForm.reset();
      setTimeout(() => {
        formNote.textContent = 'We\u2019ll open WhatsApp with your details pre-filled so you can send it directly.';
      }, 4000);
    });
  }

});
