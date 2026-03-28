/* ========================================
   RON PORTFOLIO 2026 — Main Script
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ── Loading Screen ──
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 800);
  });

  // ── Custom Cursor ──
  const cursor = document.getElementById('cursor');
  if (window.matchMedia('(pointer: fine)').matches && cursor) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover states
    const hoverables = document.querySelectorAll('a, button, .gallery-item, .motion-card, .testimonial-card, .wa-screenshot-card, .contact-item, .footer-social-link');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  // ── Navbar Scroll Effect ──
  const navbar = document.getElementById('navbar');
  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ── Mobile Menu ──
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ── Scroll Reveal Animation ──
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Lightbox ──
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      lightboxImg.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ══════════════════════════════════════
  // VIDEO SOUND TOGGLE BUTTONS
  // ══════════════════════════════════════
  document.querySelectorAll('.sound-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.motion-card');
      const video = card.querySelector('video');
      if (!video) return;

      const iconMuted = btn.querySelector('.icon-muted');
      const iconUnmuted = btn.querySelector('.icon-unmuted');

      if (video.muted) {
        video.muted = false;
        if (iconMuted) iconMuted.style.display = 'none';
        if (iconUnmuted) iconUnmuted.style.display = 'block';
      } else {
        video.muted = true;
        if (iconMuted) iconMuted.style.display = 'block';
        if (iconUnmuted) iconUnmuted.style.display = 'none';
      }
    });
  });

  // ── Contact Copy-to-Clipboard ──
  document.getElementById('contact-discord')?.addEventListener('click', () => {
    copyToClipboard('ron_creative#4521', 'Discord ID copied!');
  });

  document.getElementById('contact-email')?.addEventListener('click', () => {
    copyToClipboard('ron.creative@outlook.com', 'Email copied!');
  });

  function copyToClipboard(text, message) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message);
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(message);
    });
  }

  function showToast(message) {
    const existing = document.querySelector('.copy-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      padding: 0.75rem 1.5rem;
      background: rgba(168, 85, 247, 0.9);
      color: white;
      border-radius: 999px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      z-index: 3000;
      backdrop-filter: blur(10px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 8px 30px rgba(168, 85, 247, 0.3);
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Active nav highlighting ──
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  function highlightNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--text-primary)';
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
});
