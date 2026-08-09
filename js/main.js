document.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-nav a").forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".navbar-wl");
  const hero = document.querySelector(".hero-fullpage");

  if (nav && hero) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            nav.classList.remove("navbar-wl--scrolled");
          } else {
            nav.classList.add("navbar-wl--scrolled");
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(hero);
  }
});