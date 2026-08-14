function initFishCarousel() {
  const label = document.getElementById("jiaxuan-country-label");
  const photoEl = document.getElementById("jiaxuan-country-photo");
  const prevBtn = document.getElementById("jiaxuan-country-prev");
  const nextBtn = document.getElementById("jiaxuan-country-next");
  const tabs = document.querySelectorAll(".jiaxuan-country-tab");

  if (!label || !photoEl) return;

  const categories = [
    {
      name: "Fishing & Angling",
      photos: [
        "assets/jiaxuan-assets/fish-pose.jpeg",
        "assets/jiaxuan-assets/fish-haul.jpeg"
      ]
    },
    {
      name: "Badminton",
      photos: [
        "assets/jiaxuan-assets/badminton.jpeg"
      ]
    },
    {
      name: "Me",
      photos: [
        "assets/jiaxuan-assets/sitting-pose.jpeg"
      ]
    }
  ];

  let categoryIndex = 0;
  let photoIndex = 0;
  let timer = null;

  function renderImmediately() {
    const current = categories[categoryIndex];
    label.textContent = current.name;
    photoEl.src = current.photos[photoIndex];
    photoEl.alt = `Jia Xuan - ${current.name}`;
    tabs.forEach((tab, i) => tab.classList.toggle("active", i === categoryIndex));
  }

  function renderWithFade() {
    photoEl.classList.add("fading");
    setTimeout(() => {
      renderImmediately();
      photoEl.classList.remove("fading");
    }, 400);
  }

  function advancePhoto() {
    const current = categories[categoryIndex];
    if (photoIndex < current.photos.length - 1) {
      photoIndex++;
    } else {
      categoryIndex = (categoryIndex + 1) % categories.length;
      photoIndex = 0;
    }
    renderWithFade();
  }

  function prevPhoto() {
    if (photoIndex > 0) {
      photoIndex--;
    } else {
      categoryIndex = (categoryIndex - 1 + categories.length) % categories.length;
      photoIndex = categories[categoryIndex].photos.length - 1;
    }
    renderWithFade();
  }

  function goToCategory(index) {
    categoryIndex = index;
    photoIndex = 0;
    renderWithFade();
    startTimer();
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(advancePhoto, 7000);
  }

  if (prevBtn) prevBtn.addEventListener("click", () => { prevPhoto(); startTimer(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { advancePhoto(); startTimer(); });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => goToCategory(parseInt(tab.dataset.index)));
  });

  const titlePrevBtn = document.getElementById("jiaxuan-country-title-prev");
  const titleNextBtn = document.getElementById("jiaxuan-country-title-next");

  if (titlePrevBtn) {
    titlePrevBtn.addEventListener("click", () => {
      goToCategory((categoryIndex - 1 + categories.length) % categories.length);
    });
  }

  if (titleNextBtn) {
    titleNextBtn.addEventListener("click", () => {
      goToCategory((categoryIndex + 1) % categories.length);
    });
  }

  renderImmediately();
  startTimer();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFishCarousel);
} else {
  initFishCarousel();
}