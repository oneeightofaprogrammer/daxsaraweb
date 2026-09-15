/* ============================================================
   DAXSARA — Shared behavior
   ============================================================ */

/* ---------- The Daxsara Star (two squares rotated 45°) ---------- */
function daxsaraStar({ id = "", stroke = "var(--navy)", fill = "none", strokeWidth = 1.4, size = 100 } = {}) {
  const c = size / 2;
  const s1 = size * 0.62;
  const s2 = size * 0.62;
  return `
  <svg id="${id}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g>
      <rect class="star-sq star-sq--a" x="${c - s1 / 2}" y="${c - s1 / 2}" width="${s1}" height="${s1}"
        fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"
        transform="rotate(0 ${c} ${c})"/>
      <rect class="star-sq star-sq--b" x="${c - s2 / 2}" y="${c - s2 / 2}" width="${s2}" height="${s2}"
        fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"
        transform="rotate(45 ${c} ${c})"/>
    </g>
  </svg>`;
}

function mountStars() {
  document.querySelectorAll("[data-star]").forEach(el => {
    const stroke = el.getAttribute("data-star-stroke") || "var(--navy)";
    const fill = el.getAttribute("data-star-fill") || "none";
    const sw = parseFloat(el.getAttribute("data-star-width") || "1.4");
    el.innerHTML = daxsaraStar({ stroke, fill, strokeWidth: sw });
  });
}

/* ---------- Nav: compact on scroll + mobile menu ---------- */
function initNav() {
  const nav = document.querySelector(".nav");
  const burger = document.querySelector(".nav__burger");
  const menu = document.querySelector(".menu-full");
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle("is-compact", window.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  if (burger && menu) {
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        menu.classList.remove("is-open");
        document.body.style.overflow = "";
      })
    );
  }
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || items.length === 0) {
    items.forEach(el => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach(el => io.observe(el));
}

/* ---------- Opening scroll sequence (homepage only) ---------- */
function initOpening() {
  const section = document.querySelector(".opening");
  if (!section) return;
  const star = section.querySelector(".opening__star");
  const sqA = star ? star.querySelector(".star-sq--a") : null;
  const sqB = star ? star.querySelector(".star-sq--b") : null;
  const lines = Array.from(section.querySelectorAll(".opening__line"));

  const clamp01 = v => Math.max(0, Math.min(1, v));

  function update() {
    const rect = section.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const progress = clamp01((-rect.top) / total);

    if (sqA && sqB) {
      const rot = progress * 45;
      const scale = 0.7 + progress * 0.3;
      sqA.style.transform = `rotate(${rot * 0.0}deg)`;
      sqB.style.transform = `rotate(${45 * clamp01(progress * 1.4)}deg) scale(${scale})`;
      star.style.opacity = String(0.35 + progress * 0.65);
      star.style.transform = `scale(${0.85 + progress * 0.25}) rotate(${progress * 22}deg)`;
    }

    const segments = lines.length;
    lines.forEach((line, i) => {
      const start = i / segments;
      const end = (i + 1) / segments;
      const mid0 = start + (end - start) * 0.18;
      const mid1 = end - (end - start) * 0.28;
      const visible = progress >= mid0 && progress <= mid1;
      line.classList.toggle("is-visible", visible);
    });
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

/* ---------- Timeline (homepage upcoming preview) ---------- */
function renderUpcomingPreview() {
  const el = document.getElementById("upcoming-timeline");
  if (!el || typeof DAXSARA_EVENTS === "undefined") return;
  const upcoming = DAXSARA_EVENTS.filter(e => e.status === "upcoming")
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);
  el.innerHTML = upcoming.map(eventRowHTML).join("");
}

function eventRowHTML(e) {
  return `
  <article class="tl-item" data-reveal>
    <span class="tl-item__node">${daxsaraStar({ stroke: "var(--carmine)", strokeWidth: 2 })}</span>
    <div class="tl-item__date">${e.dateLabel.day}<span class="tl-item__month">${e.dateLabel.month} ${e.dateLabel.year}</span></div>
    <div class="tl-item__body">
      <h3>${e.title}</h3>
      <div class="tl-item__meta"><span class="cat">${e.category}</span><span>${e.city}</span><span>${e.venue}</span></div>
      <p class="tl-item__desc">${e.short}</p>
      <a class="tl-item__link" href="events/${e.slug}.html">View event →</a>
    </div>
  </article>`;
}

/* ---------- Events archive page ---------- */
function renderEventsArchive() {
  const el = document.getElementById("events-archive");
  if (!el || typeof DAXSARA_EVENTS === "undefined") return;
  const buttons = document.querySelectorAll(".archive-filter button");

  function draw(filter) {
    let list = DAXSARA_EVENTS.slice();
    if (filter === "upcoming") list = list.filter(e => e.status === "upcoming");
    else if (filter === "past") list = list.filter(e => e.status === "past");
    list.sort((a, b) =>
      filter === "past" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
    );
    el.innerHTML = list.map(eventRowHTML).join("") || `<p class="type-body">No events in this view yet.</p>`;
    initReveal();
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      draw(btn.dataset.filter);
    });
  });

  draw("all");
}

/* ---------- Work grid ---------- */
function renderWorkGrid() {
  const el = document.getElementById("work-grid");
  if (!el || typeof DAXSARA_PROJECTS === "undefined") return;
  el.innerHTML = DAXSARA_PROJECTS.map(
    (p, i) => `
    <article class="work-item" data-reveal>
      <div class="work-item__img">${daxsaraStar({ stroke: "rgba(244,240,230,.5)", fill: "rgba(244,240,230,.04)" })}</div>
      <div>
        <span class="work-item__num">${String(i + 1).padStart(2, "0")}</span>
        <h3>${p.title}</h3>
        <div class="work-item__meta">${p.tag}</div>
        <p class="type-body">${p.summary}</p>
      </div>
    </article>`
  ).join("");
}

/* ---------- Thought list ---------- */
function renderThoughtList() {
  const el = document.getElementById("thought-list");
  if (!el || typeof DAXSARA_THOUGHTS === "undefined") return;
  el.innerHTML = DAXSARA_THOUGHTS.map(
    t => `
    <article class="work-item" data-reveal>
      <div class="work-item__img">${daxsaraStar({ stroke: "rgba(244,240,230,.5)", fill: "rgba(244,240,230,.04)" })}</div>
      <div>
        <span class="work-item__num">${t.dateLabel}</span>
        <h3>${t.title}</h3>
        <p class="type-body">${t.excerpt}</p>
        <a class="view-all" href="thought.html#${t.slug}">Read →</a>
      </div>
    </article>`
  ).join("");
}

/* ---------- Event nest sequence (sequential concepts) ---------- */
function initEventNest() {
  const section = document.querySelector(".event-nest");
  if (!section) return;
  const frames = Array.from(section.querySelectorAll(".event-nest__frame"));
  const lines = Array.from(section.querySelectorAll(".event-nest__line"));
  const tip = section.querySelector(".event-nest__scrolltip");
  const clamp01 = v => Math.max(0, Math.min(1, v));

  function update() {
    const rect = section.getBoundingClientRect();
    const total = Math.max(1, rect.height - window.innerHeight);
    const progress = clamp01((-rect.top) / total);

    frames.forEach((frame, i) => {
      const start = i / (frames.length + 0.5);
      const local = clamp01((progress - start) / 0.55);
      const scale = 0.72 + local * 0.28;
      const opacity = 0.08 + local * 0.42;
      frame.style.transform = `scale(${scale})`;
      frame.style.opacity = String(opacity);
    });

    const n = lines.length || 1;
    lines.forEach((line, i) => {
      const start = i / n;
      const end = (i + 1) / n;
      const mid0 = start + (end - start) * 0.12;
      const mid1 = end - (end - start) * 0.18;
      const visible = progress >= mid0 && progress <= mid1;
      line.classList.toggle("is-visible", visible);
    });

    if (tip) {
      tip.style.opacity = progress > 0.92 ? "0" : "1";
      tip.style.transition = "opacity 400ms ease";
    }
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

/* ---------- Academy development timeline ---------- */
function initAcademyDev() {
  const section = document.querySelector(".academy-dev");
  if (!section) return;
  const stage = section.querySelector(".academy-dev__stage");
  const steps = Array.from(section.querySelectorAll(".academy-dev__step"));
  const tip = section.querySelector(".academy-dev__scrolltip");
  const progressBar = section.querySelector(".academy-dev__progress");
  const indexEl = section.querySelector(".academy-dev__index");
  const clamp01 = v => Math.max(0, Math.min(1, v));
  const n = steps.length || 1;

  function update() {
    const rect = section.getBoundingClientRect();
    const total = Math.max(1, rect.height - window.innerHeight);
    const progress = clamp01((-rect.top) / total);

    if (progressBar) progressBar.style.height = `${progress * 100}%`;

    let active = 0;
    steps.forEach((step, i) => {
      const start = i / n;
      const end = (i + 1) / n;
      const mid0 = start + (end - start) * 0.08;
      const mid1 = end - (end - start) * 0.12;
      const visible = progress >= mid0 && progress <= mid1;
      step.classList.toggle("is-visible", visible);
      if (visible) active = i;
    });

    if (!steps.some(s => s.classList.contains("is-visible"))) {
      active = Math.min(n - 1, Math.floor(progress * n));
      if (steps[active]) steps[active].classList.add("is-visible");
    }

    const shifted = steps[active] && steps[active].hasAttribute("data-shift");
    if (stage) stage.classList.toggle("is-shifted", !!shifted);

    if (indexEl) {
      indexEl.textContent = `${String(active + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
    }

    if (tip) {
      tip.style.opacity = progress > 0.94 ? "0" : "1";
    }
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  mountStars();
  initNav();
  initOpening();
  initEventNest();
  initAcademyDev();
  renderUpcomingPreview();
  renderEventsArchive();
  renderWorkGrid();
  renderThoughtList();
  initReveal();
  if (typeof initI18n === "function") initI18n();
});
