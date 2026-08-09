document.addEventListener("DOMContentLoaded", () => {
  const pins = document.querySelectorAll(".map-pin");
  const countryLabel = document.getElementById("map-country-label");
  const placeEl = document.getElementById("map-country-place");
  const descEl = document.getElementById("map-country-desc");
  const dateEl = document.getElementById("map-country-date");
  const photoEl = document.getElementById("map-country-photo");
  const galleryHeading = document.getElementById("gallery-heading");
  const galleryGrid = document.getElementById("photo-gallery-grid");
  if (!pins.length) return;

  // One entry per country — fill in your real details/dates/highlights
  const destinations = [
    {
      name: "Vietnam",
      place: "Sa Pa",
      date: "Visited March 2023",
      desc: "Four days trekking between rice terrace villages, sleeping in homestays and eating more sticky rice than I thought possible.",
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
      place: "Aberdeen Harbour",
      date: "Visited [month/year]",
      desc: "[Write 1–2 sentences about this trip — what you did, a highlight moment.]",
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
      place: "[City]",
      date: "Visited [month/year]",
      desc: "[Write 1–2 sentences about this trip.]",
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
      place: "[City]",
      date: "Visited [month/year]",
      desc: "[Write 1–2 sentences about this trip.]",
      photos: [
        "assets/sumchoy-assets/image/japan/jap-boat.jpeg",
        "assets/sumchoy-assets/image/japan/jap-dog.jpeg",
        "assets/sumchoy-assets/image/japan/jap-noodle.jpeg",
        "assets/sumchoy-assets/image/japan/jap-outdoor.jpeg",
        "assets/sumchoy-assets/image/japan/jap-snow.jpeg",
      ],
    },
  ];

  function renderGallery(dest) {
    galleryGrid.innerHTML = "";
    dest.photos.forEach((src) => {
      const col = document.createElement("div");
      col.className = "col-6 col-md-4 col-lg-3";
      col.innerHTML = `<img src="${src}" alt="${dest.name}" class="gallery-thumb">`;
      galleryGrid.appendChild(col);
    });
  }

  function selectDestination(index) {
    const dest = destinations[index];

    pins.forEach((pin) => pin.classList.toggle("active", parseInt(pin.dataset.index) === index));

    countryLabel.textContent = dest.name;
    placeEl.textContent = dest.place;
    descEl.textContent = dest.desc;
    dateEl.textContent = dest.date;
    galleryHeading.textContent = `${dest.name}, in photos`;

    photoEl.classList.add("fading");
    setTimeout(() => {
      photoEl.src = dest.photos[0];
      photoEl.alt = dest.name;
      photoEl.classList.remove("fading");
    }, 300);

    renderGallery(dest);
  }

  pins.forEach((pin) => {
    pin.addEventListener("click", () => selectDestination(parseInt(pin.dataset.index)));
    pin.addEventListener("keypress", (e) => {
      if (e.key === "Enter") selectDestination(parseInt(pin.dataset.index));
    });
  });

  selectDestination(0);
});