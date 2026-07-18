/* ==========================================================================
   AI Projects Portfolio — Behavior
   Vanilla ES6, no dependencies.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initStickyNavbar();
  initMobileNav();
  initScrollReveal();
  initButtonRipple();
  initActiveNavHighlight();
  initFooterYear();
});

/**
 * Hides the full-screen loader once the page (and its assets) are ready,
 * with a small minimum-display time so the animation is never a flash.
 */
function initLoader() {
  const loader = document.querySelector('[data-loader]');
  if (!loader) return;

  const MIN_DISPLAY_MS = 400;
  const start = performance.now();

  const hide = () => {
    const elapsed = performance.now() - start;
    const wait = Math.max(MIN_DISPLAY_MS - elapsed, 0);
    window.setTimeout(() => loader.classList.add('is-hidden'), wait);
  };

  if (document.readyState === 'complete') {
    hide();
  } else {
    window.addEventListener('load', hide, { once: true });
  }
}

/**
 * Adds a background/shadow to the navbar once the page has scrolled past
 * the top, so the glass surface reads clearly against page content.
 */
function initStickyNavbar() {
  const navbar = document.querySelector('[data-navbar]');
  if (!navbar) return;

  const toggleScrolled = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  toggleScrolled();
  window.addEventListener('scroll', toggleScrolled, { passive: true });
}

/**
 * Wires up the hamburger button to reveal/hide the mobile nav menu,
 * and closes the menu whenever a link is chosen.
 */
function initMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const links = document.querySelector('[data-nav-links]');
  if (!toggle || !links) return;

  const closeMenu = () => {
    toggle.classList.remove('is-active');
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Collapse the mobile menu if the viewport grows back to desktop size.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
  });
}

/**
 * Fades and lifts elements marked with [data-reveal] into place as they
 * enter the viewport, using IntersectionObserver for performance.
 */
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/**
 * Creates a Material-style ripple circle at the click point for any
 * element marked with [data-ripple], then removes it after the animation.
 */
function initButtonRipple() {
  const buttons = document.querySelectorAll('[data-ripple]');

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');

      ripple.className = 'btn__ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

      button.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

/**
 * Marks the nav link matching the current page as active, so people can
 * see at a glance whether they're on the ML or DL projects page.
 */
function initActiveNavHighlight() {
  const links = document.querySelectorAll('[data-nav-links] .nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach((link) => {
    const linkPage = link.getAttribute('href').split('#')[0] || 'index.html';
    if (linkPage === currentPage) {
      link.classList.add('is-active');
    }
  });
}

/**
 * Keeps the footer copyright year accurate without a manual edit.
 */
function initFooterYear() {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}