document.addEventListener("DOMContentLoaded", () => {
  const label = document.getElementById("sumchoy-fact-label");
  const subtitleEl = document.getElementById("sumchoy-fact-subtitle");
  const photoEl = document.getElementById("sumchoy-fact-photo");
  const prevBtn = document.getElementById("sumchoy-fact-prev");
  const nextBtn = document.getElementById("sumchoy-fact-next");
  if (!photoEl) return;

  const slides = [
    { src: "assets/sumchoy-assets/image/me/aussie.jpeg", title: "Loves dogs", subtitle: "— Best Doggie Aussie" },
    { src: "assets/sumchoy-assets/image/me/cooking.jpeg", title: "Learning to cook", subtitle: "— Spinach & Basil Pasta" },
    { src: "assets/sumchoy-assets/image/me/exploring-singapore.jpeg", title: "Exploring singapore", subtitle: "— Oldest Dragon Kiln in Singapore" },
    { src: "assets/sumchoy-assets/image/me/guitar.jpeg", title: "Guitar Perfomance", subtitle: "— classical piece" },
    { src: "assets/sumchoy-assets/image/me/spiderman.jpeg", title: "Spider-Man fan", subtitle: "— yes thats me" },
  ];
  let index = 0;
  let timer = null;

  function render() {
    photoEl.classList.add("fading");
    setTimeout(() => {
      const slide = slides[index];
      photoEl.src = slide.src;
      photoEl.alt = slide.title;
      label.textContent = slide.title;
      subtitleEl.textContent = slide.subtitle;
      photoEl.classList.remove("fading");
    }, 300);
  }
  function next() { index = (index + 1) % slides.length; render(); }
  function prev() { index = (index - 1 + slides.length) % slides.length; render(); }
  function startTimer() { clearInterval(timer); timer = setInterval(next, 7000); }

  prevBtn.addEventListener("click", () => { prev(); startTimer(); });
  nextBtn.addEventListener("click", () => { next(); startTimer(); });

  render();
  startTimer();
});

