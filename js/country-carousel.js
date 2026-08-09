document.addEventListener("DOMContentLoaded", () => {
  const label = document.getElementById("country-label");
  const photoEl = document.getElementById("country-photo");
  const prevBtn = document.getElementById("country-prev");
  const nextBtn = document.getElementById("country-next");
  const tabs = document.querySelectorAll(".country-tab");
  if (!label || !photoEl) return;

  const countries = [
    {
      name: "Vietnam",
      photos: [
        "assets/sumchoy-assets/image/Vietnam/vietnam-landscape.jpeg",
        "assets/sumchoy-assets/image/Vietnam/viet-street.jpeg",
        "assets/sumchoy-assets/image/Vietnam/viet-motor.jpeg",
        "assets/sumchoy-assets/image/Vietnam/viet-raincoat.jpeg",
        "assets/sumchoy-assets/image/Vietnam/viet-fluteboy.jpeg",
      ],
    },
    {
      name: "Hong Kong",
      photos: [
      "assets/sumchoy-assets/image/hongkong/hk-boats.jpeg",
      "assets/sumchoy-assets/image/hongkong/hk-building.jpeg",
      "assets/sumchoy-assets/image/hongkong/hk-colours.jpeg",
      "assets/sumchoy-assets/image/hongkong/hk-landscape.jpeg",
      "assets/sumchoy-assets/image/hongkong/hk-street-store.jpeg",
    ],
    },
    {
      name: "China",
      photos: [
        "assets/sumchoy-assets/image/china/china-streets.jpeg",
        "assets/sumchoy-assets/image/china/landscape-nature.jpeg",
        "assets/sumchoy-assets/image/china/shenzhen-streets.jpeg",
        "assets/sumchoy-assets/image/china/shopping-mall.jpeg",
        "assets/sumchoy-assets/image/china/snow-board.jpeg",
      ],
    },
    {
      name: "Japan",
      photos: [
        "assets/sumchoy-assets/image/japan/jap-boat.jpeg",
        "assets/sumchoy-assets/image/japan/jap-dog.jpeg",
        "assets/sumchoy-assets/image/japan/jap-noodle.jpeg",
        "assets/sumchoy-assets/image/japan/jap-outdoor.jpeg",
        "assets/sumchoy-assets/image/japan/jap-snow.jpeg",
      ],
    },
  ];

  let countryIndex = 0;
  let photoIndex = 0;
  let timer = null;

  function renderImmediately() {
    const country = countries[countryIndex];
    label.textContent = country.name;
    photoEl.src = country.photos[photoIndex];
    photoEl.alt = `Sum Choy in ${country.name}`;
    tabs.forEach((tab, i) => tab.classList.toggle("active", i === countryIndex));
  }

  function renderWithFade() {
    photoEl.classList.add("fading");
    setTimeout(() => {
      renderImmediately();
      photoEl.classList.remove("fading");
    }, 400);
  }

  function advancePhoto() {
    const country = countries[countryIndex];
    if (photoIndex < country.photos.length - 1) {
      // more photos left in this country
      photoIndex++;
    } else {
      // last photo — smoothly move on to the next country
      countryIndex = (countryIndex + 1) % countries.length;
      photoIndex = 0;
    }
    renderWithFade();
  }

  function prevPhoto() {
    const country = countries[countryIndex];
    if (photoIndex > 0) {
      photoIndex--;
    } else {
      countryIndex = (countryIndex - 1 + countries.length) % countries.length;
      photoIndex = countries[countryIndex].photos.length - 1;
    }
    renderWithFade();
  }

  function goToCountry(index) {
    countryIndex = index;
    photoIndex = 0;
    renderWithFade();
    startTimer();
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(advancePhoto, 7000);
  }

  prevBtn.addEventListener("click", () => { prevPhoto(); startTimer(); });
  nextBtn.addEventListener("click", () => { advancePhoto(); startTimer(); });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => goToCountry(parseInt(tab.dataset.index)));
  });
  const titlePrevBtn = document.getElementById("country-title-prev");
  const titleNextBtn = document.getElementById("country-title-next");

  function goToNextCountry() {
    goToCountry((countryIndex + 1) % countries.length);
  }
  function goToPrevCountry() {
    goToCountry((countryIndex - 1 + countries.length) % countries.length);
  }

  if (titlePrevBtn) titlePrevBtn.addEventListener("click", goToPrevCountry);
  if (titleNextBtn) titleNextBtn.addEventListener("click", goToNextCountry);

  

  renderImmediately();
  startTimer();
});