/* Usama Jamal — site interactions
   theme toggle · scroll progress · scrollspy · reveal animations ·
   abstract accordions · mobile nav · back-to-top */

(function () {
  "use strict";

  /* ---------- theme (light/dark) ---------- */

  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");

  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
    root.setAttribute("data-theme", "dark");
  }

  themeToggle.addEventListener("click", () => {
    const dark = root.getAttribute("data-theme") === "dark";
    if (dark) {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });

  /* ---------- scroll progress + header shadow + back-to-top ---------- */

  const progressBar = document.getElementById("progressBar");
  const header = document.getElementById("siteHeader");
  const backToTop = document.getElementById("backToTop");

  function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    progressBar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    header.classList.toggle("scrolled", y > 10);
    backToTop.classList.toggle("visible", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- scrollspy: highlight nav link of section in view ---------- */

  const navLinks = document.querySelectorAll(".nav-link[data-section]");
  const sections = Array.from(navLinks).map((link) =>
    document.getElementById(link.dataset.section)
  );

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) =>
          link.classList.toggle("active", link.dataset.section === entry.target.id)
        );
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );
  sections.forEach((s) => s && spy.observe(s));

  /* ---------- reveal-on-scroll animations ---------- */

  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => revealObserver.observe(el));

  /* ---------- abstract accordions ---------- */

  document.querySelectorAll(".btn-abstract").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.closest(".paper-card").querySelector(".abstract-panel");
      const open = panel.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ---------- mobile nav ---------- */

  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // close the mobile menu after choosing a link
  navMenu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- footer year ---------- */

  document.getElementById("year").textContent = new Date().getFullYear();
})();
