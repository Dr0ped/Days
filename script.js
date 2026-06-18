/* ═══════════════════════════════════════
   SERVERS DATA
═══════════════════════════════════════ */
const servers = [
  {
    name: "Minenight",
    role: "Operador",
    status: "active",
    logo: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/51146cdd60a0fd10874a2be761b5bbb23be5716a.png"
  },
  {
    name: "Chowbox",
    role: "Owner",
    status: "active",
    logo: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/eabc2c262f38326f3a3c7663174702b69c496db8.png"
  },
  {
    name: "Minelite",
    role: "Operador",
    status: "retired",
    logo: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/bafecdf2a4d330575819e9f19c12b2fc53a9b7f6.png"
  },
  {
    name: "KameMC",
    role: "Owner",
    status: "retired",
    logo: "https://media.discordapp.net/attachments/1507830616689999882/1514102755717939280/file_000000002f58720eb3049b45bac33d31.png?ex=6a2a2593&is=6a28d413&hm=dcfc747945dda94d5c318d33b8a20f4a3ae885bfe0acfe4fd6d708d1081a642a&=&format=webp&quality=lossless&width=350&height=350"
  },
  {
    name: "Bundercraft",
    role: "Manager",
    status: "retired",
    logo: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/03856731f9136db5ebe08704c87ec94f1c1040ca.png"
  },
  {
    name: "Nightbox",
    role: "Manager",
    status: "retired",
    logo: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/ffde9e179dedaf96542c9b088ab5e37f9ba6caef.png"
  },
  {
    name: "KrakenMC",
    role: "Trial Moderador",
    status: "retired",
    logo: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/281a17f21756b9f164744dd706ba2676f23f2c11.png"
  },
  {
    name: "KarmaMC",
    role: "Soporte",
    status: "retired",
    logo: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/ca3a1e2888697d57dedf942132870ba7cf167f47.png"
  },
  {
    name: "EskMC",
    role: "Manager",
    status: "retired",
    logo: "https://portafolio-th3darks1de.netlify.app/images/eskmc.png"
  },
  {
    name: "PandaMC",
    role: "H-Manager",
    status: "retired",
    logo: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/645deb778bd497a81989012fbba1faef466da9fc.png"
  },
  {
    name: "Glowy",
    role: "Coordinador",
    status: "retired",
    logo: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/af4e90aacdfc656497c18ecc6a2acb381c53cc0d.png"
  }
];

/* ═══════════════════════════════════════
   RENDER SERVERS
═══════════════════════════════════════ */
function renderServers() {
  const grid = document.getElementById('servers-grid');
  if (!grid) return;

  const activeCount  = servers.filter(s => s.status === 'active').length;
  const retiredCount = servers.filter(s => s.status === 'retired').length;

  const ca = document.getElementById('count-all');
  const cac = document.getElementById('count-active');
  const cret = document.getElementById('count-retired');
  if (ca)  ca.textContent  = `(${servers.length})`;
  if (cac) cac.textContent = `(${activeCount})`;
  if (cret) cret.textContent = `(${retiredCount})`;

  servers.forEach((s, i) => {
    const card = document.createElement('div');
    const isRetired = s.status === 'retired';
    card.className = `server-card${isRetired ? ' retired' : ''}`;
    card.dataset.status = s.status;

    const initial = s.name.charAt(0).toUpperCase();
    const fallback = `https://placehold.co/56x56/0d1e28/00ff88?text=${initial}&font=monospace`;

    card.innerHTML = `
      <img
        class="server-logo"
        src="${s.logo}"
        alt="Logo de ${s.name}"
        onerror="this.src='${fallback}'"
        loading="lazy"
      />
      <div class="server-info">
        <div class="server-name">${s.name}</div>
        <div class="server-role">${s.role}</div>
        <span class="server-status ${isRetired ? 'retired' : 'active'}">
          ${isRetired ? '⬤ Retirado' : '⬤ Activo'}
        </span>
      </div>
    `;

    // staggered entry animation setup
    card.style.opacity = '0';
    card.style.transform = 'translateY(18px)';
    card.style.transition = `opacity 0.45s ease ${i * 0.05}s, transform 0.45s ease ${i * 0.05}s, border-color 0.3s, box-shadow 0.3s, transform 0.3s`;

    grid.appendChild(card);
  });

  // Trigger entry animations shortly after render
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.server-card').forEach(c => {
        c.style.opacity = '1';
        c.style.transform = 'translateY(0)';
      });
    });
  });
}

/* ═══════════════════════════════════════
   FILTER SERVERS
═══════════════════════════════════════ */
function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      document.querySelectorAll('.server-card').forEach(card => {
        if (filter === 'all' || card.dataset.status === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ═══════════════════════════════════════
   NAVBAR SCROLL
═══════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ═══════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════ */
function toggleMenu() {
  const links = document.getElementById('nav-links');
  if (links) links.classList.toggle('open');
}

/* ═══════════════════════════════════════
   COPY DISCORD
═══════════════════════════════════════ */
function copyDiscord() {
  const btn = document.getElementById('copy-btn');
  const text = '7miope';

  const doFeedback = () => {
    if (!btn) return;
    btn.textContent = '✓ Copiado';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copiar';
      btn.classList.remove('copied');
    }, 2400);
  };

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(doFeedback).catch(() => fallbackCopy(text, doFeedback));
  } else {
    fallbackCopy(text, doFeedback);
  }
}

function fallbackCopy(text, cb) {
  const el = document.createElement('textarea');
  el.value = text;
  el.style.position = 'fixed';
  el.style.opacity = '0';
  document.body.appendChild(el);
  el.focus();
  el.select();
  try { document.execCommand('copy'); } catch(e) {}
  document.body.removeChild(el);
  cb();
}

/* ═══════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };

  requestAnimationFrame(tick);
}

/* ═══════════════════════════════════════
   SKILL BARS ANIMATION
═══════════════════════════════════════ */
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    bar.style.width = (bar.dataset.width || 0) + '%';
  });
}

/* ═══════════════════════════════════════
   INTERSECTION OBSERVER
═══════════════════════════════════════ */
function initObserver() {
  // Cards fade-in
  const cards = document.querySelectorAll('.acard, .skill-block, .stat-card, .tl-item');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) translateX(0)';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach((c, i) => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(22px)';
    c.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
    cardObserver.observe(c);
  });

  // Counters
  const counterEls = document.querySelectorAll('[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObserver.observe(el));

  // Skill bars
  const skillSection = document.querySelector('.skills');
  if (skillSection) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    skillObserver.observe(skillSection);
  }
}

/* ═══════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
═══════════════════════════════════════ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const links    = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`);
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => obs.observe(s));
}

/* ═══════════════════════════════════════
   CLOSE MOBILE MENU ON LINK CLICK
═══════════════════════════════════════ */
function initMobileClose() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('nav-links');
      if (nav) nav.classList.remove('open');
    });
  });
}

/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderServers();
  initFilters();
  initNavbar();
  initMobileClose();

  setTimeout(() => {
    initObserver();
    initActiveNav();
  }, 100);
});
