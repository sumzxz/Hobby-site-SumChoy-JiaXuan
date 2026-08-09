document.addEventListener("DOMContentLoaded", () => {
  const label = document.getElementById("country-label");
  const photoEl = document.getElementById("country-photo");
  const prevBtn = document.getElementById("country-prev");
  const nextBtn = document.getElementById("country-next");
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
      "assets/sumchoy-assets/image/hongkong/photo1.jpg",
      "assets/sumchoy-assets/image/hongkong/photo2.jpg",
      "assets/sumchoy-assets/image/hongkong/photo3.jpg",
      "assets/sumchoy-assets/image/hongkong/photo4.jpg",
      "assets/sumchoy-assets/image/hongkong/photo5.jpg",
    ],
  },
  {
    name: "China",
    photos: [
      "assets/sumchoy-assets/image/China/photo1.jpg",
      "assets/sumchoy-assets/image/China/photo2.jpg",
      "assets/sumchoy-assets/image/China/photo3.jpg",
      "assets/sumchoy-assets/image/China/photo4.jpg",
      "assets/sumchoy-assets/image/China/photo5.jpg",
    ],
  },
  {
    name: "Japan",
    photos: [
      "assets/sumchoy-assets/image/Japan/photo1.jpg",
      "assets/sumchoy-assets/image/Japan/photo2.jpg",
      "assets/sumchoy-assets/image/Japan/photo3.jpg",
      "assets/sumchoy-assets/image/Japan/photo4.jpg",
      "assets/sumchoy-assets/image/Japan/photo5.jpg",
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

  function nextPhoto() {
    const country = countries[countryIndex];
    photoIndex = (photoIndex + 1) % country.photos.length;
    render();
  }

  function prevPhoto() {
    const country = countries[countryIndex];
    photoIndex = (photoIndex - 1 + country.photos.length) % country.photos.length;
    render();
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(nextPhoto, 7000);
  }

  // Arrows now move photos within the current country
  prevBtn.addEventListener("click", () => {
    prevPhoto();
    startTimer(); // reset the auto-timer so it doesn't jump right after a manual click
  });
  nextBtn.addEventListener("click", () => {
    nextPhoto();
    startTimer();
  });

  render();
  startTimer();
});