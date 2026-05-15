/* ============================================================
   Personal Homepage — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Typing Effect ──
  const words = ['前端开发者', '全栈工程师', 'C++ 爱好者', '开源贡献者'];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typingEl = document.getElementById('typingText');

  function type() {
    const current = words[wordIdx];
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIdx === current.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }
  type();

  // ── Nav scroll state ──
  const nav = document.getElementById('nav');
  const backTop = document.getElementById('backTop');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 60);
    backTop.classList.toggle('visible', y > 600);
  });

  // ── Back to top ──
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Mobile nav toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ── Active nav link on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navAs = navLinks.querySelectorAll('a');

  function setActiveLink() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navAs.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', setActiveLink);

  // ── Intersection Observer for reveal animations ──
  const revealEls = document.querySelectorAll(
    '.skill-card, .project-card, .timeline-card, .info-card, .contact-card'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(el);
  });

});
