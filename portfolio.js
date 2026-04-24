(() => {
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll("[data-nav]");
  const sections = ["home", "about", "stack", "work", "contact"]
    .map((id) => ({ id, el: document.getElementById(id) }))
    .filter((s) => s.el);

  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 12);
    let activeId = sections[0]?.id;
    for (const { id, el } of sections) {
      const r = el.getBoundingClientRect();
      if (r.top <= 140 && r.bottom >= 140) {
        activeId = id;
        break;
      }
    }
    navLinks.forEach((a) => a.classList.toggle("active", a.dataset.nav === activeId));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const burger = document.getElementById("nav-burger");
  const menu = document.getElementById("mobile-menu");
  const setMenu = (open) => {
    if (!burger || !menu) return;
    burger.classList.toggle("open", open);
    menu.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
  };
  if (burger && menu) {
    burger.addEventListener("click", () => {
      setMenu(!menu.classList.contains("open"));
    });
    menu.querySelectorAll("a[href^='#']").forEach((a) => {
      a.addEventListener("click", () => setMenu(false));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("open")) setMenu(false);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = a.getAttribute("href");
      if (!target || target === "#") return;
      const el = document.querySelector(target);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const clock = document.querySelector("[data-clock]");
  if (clock) {
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const d = new Date();
      clock.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };
    tick();
    setInterval(tick, 1000);
  }

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const list = document.getElementById("proj-list");
  const preview = document.getElementById("proj-preview");
  const previewName = document.getElementById("proj-preview-name");
  const previewSpec = document.getElementById("proj-preview-spec");
  if (list && preview && previewName && previewSpec) {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const rows = list.querySelectorAll(".proj-row");
    let hovering = false;
    const move = (e) => {
      preview.style.left = e.clientX + "px";
      preview.style.top = e.clientY + "px";
    };
    if (canHover) {
      list.addEventListener("mousemove", move);
      list.addEventListener("mouseleave", () => {
        hovering = false;
        preview.classList.remove("show");
      });
      rows.forEach((row) => {
        row.addEventListener("mouseenter", () => {
          hovering = true;
          previewName.textContent = row.dataset.name || "";
          previewSpec.textContent = row.dataset.spec || "";
          preview.classList.add("show");
        });
      });
    }
  }
})();
