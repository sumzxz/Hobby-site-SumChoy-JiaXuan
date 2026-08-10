document.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.split("/").pop() || "index.html";
  
  document.querySelectorAll(".navbar-nav a, .nav-links-group a").forEach((link) => {
    // Check relative href matching
    const href = link.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) {
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