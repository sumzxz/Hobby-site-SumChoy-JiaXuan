document.addEventListener("DOMContentLoaded", () => {
  const label = document.getElementById("country-label");
  const photoEl = document.getElementById("country-photo");
  const prevBtn = document.getElementById("country-prev");
  const nextBtn = document.getElementById("country-next");
  if (!label || !photoEl) return;

  // Update these paths/filenames to match your real photos —
  // 5 photos listed per country, in whatever order you like.
  const countries = [
    {
      name: "Vietnam",
      photos: [
        "assets/sumchoy/vietnam/photo1.jpg",
        "assets/sumchoy/vietnam/photo2.jpg",
        "assets/sumchoy/vietnam/photo3.jpg",
        "assets/sumchoy/vietnam/photo4.jpg",
        "assets/sumchoy/vietnam/photo5.jpg",
      ],
    },
    {
      name: "Hong Kong",
      photos: [
        "assets/sumchoy/hongkong/photo1.jpg",
        "assets/sumchoy/hongkong/photo2.jpg",
        "assets/sumchoy/hongkong/photo3.jpg",
        "assets/sumchoy/hongkong/photo4.jpg",
        "assets/sumchoy/hongkong/photo5.jpg",
      ],
    },
    {
      name: "China",
      photos: [
        "assets/sumchoy/china/photo1.jpg",
        "assets/sumchoy/china/photo2.jpg",
        "assets/sumchoy/china/photo3.jpg",
        "assets/sumchoy/china/photo4.jpg",
        "assets/sumchoy/china/photo5.jpg",
      ],
    },
    {
      name: "Japan",
      photos: [
        "assets/sumchoy/japan/photo1.jpg",
        "assets/sumchoy/japan/photo2.jpg",
        "assets/sumchoy/japan/photo3.jpg",
        "assets/sumchoy/japan/photo4.jpg",
        "assets/sumchoy/japan/photo5.jpg",
      ],
    },
  ];

  let countryIndex = 0;
  let photoIndex = 0;
  let timer = null;

  function render() {
    const country = countries[countryIndex];
    label.textContent = country.name;
    photoEl.src = country.photos[photoIndex];
    photoEl.alt = `Sum Choy in ${country.name}`;
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      const country = countries[countryIndex];
      photoIndex = (photoIndex + 1) % country.photos.length;
      render();
    }, 7000);
  }

  function goToCountry(newIndex) {
    countryIndex = (newIndex + countries.length) % countries.length;
    photoIndex = 0;
    render();
    startTimer();
  }

  prevBtn.addEventListener("click", () => goToCountry(countryIndex - 1));
  nextBtn.addEventListener("click", () => goToCountry(countryIndex + 1));

  render();
  startTimer();
});