document.addEventListener("DOMContentLoaded", () => {
  const pins = document.querySelectorAll(".map-pin");
  const tabs = document.querySelectorAll(".country-tab");
  const titlePrevBtn = document.getElementById("country-title-prev");
  const titleNextBtn = document.getElementById("country-title-next");
  const photoPrevBtn = document.getElementById("country-prev");
  const photoNextBtn = document.getElementById("country-next");

  const label = document.getElementById("country-label");
  const photoEl = document.getElementById("country-photo");

  const mapLabel = document.getElementById("map-country-label");
  const placeEl = document.getElementById("map-country-place");
  const descEl = document.getElementById("map-country-desc");
  const dateEl = document.getElementById("map-country-date");
  const durationEl = document.getElementById("map-country-duration");
  const highlightEl = document.getElementById("map-country-highlight");
  const linkEl = document.getElementById("map-country-link");

  const videoEl = document.getElementById("map-country-video");
  const videoSourceEl = document.getElementById("map-country-video-source");

  const galleryHeading = document.getElementById("gallery-heading");
  const galleryTrack = document.getElementById("photo-gallery-track");

  if (!pins.length) return;

  // ===== ONE data source driving the whole page =====
  const destinations = [
    {
      name: "Vietnam",
      place: "Sa Pa, Ha Giang Loop",
      date: "14 March - 20 March [2023]",
      duration: "6 days",
      highlight: "An unforgettable adventure through Vietnam, from motorbiking the Ha Giang Loop to exploring the streets of Hanoi. Filled with local food, traditional rice wine, and unforgettable moments along the way.",

      desc: "6 days trekking between rice terrace villages, sleeping in homestays and eating more sticky rice than I thought possible.",
      mapsUrl: "https://www.google.com/maps/search/Sa+Pa+Vietnam",
      video: "assets/sumchoy-assets/video/vietnam/motor-mountain.mp4",
      videoCaption: "Motorbiking the Ha Giang Loop",
      photos: [
        "assets/sumchoy-assets/image/Vietnam/vietnam-landscape.jpeg",
        "assets/sumchoy-assets/image/Vietnam/viet-street.jpeg",
        "assets/sumchoy-assets/image/Vietnam/viet-motor.jpeg",
        "assets/sumchoy-assets/image/Vietnam/viet-raincoat.jpeg",
        "assets/sumchoy-assets/image/Vietnam/viet-fluteboy.jpeg",
      ],
    },
    {
      name: "HongKong",
      place: "Aberdeen Harbour",
      date: "16 June - 20 June [2023]",
      duration: "5 days",
      highlight: "Discover the charm of Hong Kong, from wandering through its nostalgic streets to uncovering hidden gems across the city. Feast on an abundance of Michelin-rated local dishes and experience the vibrant culture, flavours, and energy that make Hong Kong unforgettable.",
      desc: "5 days exploring the streets of Hong Kong, eating Michelin-rated local dishes, and discovering hidden gems across the city.",
      mapsUrl: "https://www.google.com/maps/search/Aberdeen+Harbour+Hong+Kong",
      video: "assets/sumchoy-assets/video/hongkong/boat-video.mp4",
      videoCaption: "Exploring Aberdeen Harbour",
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
      place: "Shenzhen",
      date: "10 July - 15 July [2024]",
      duration: "6 days",
      highlight: "Discover the modern energy of Shenzhen, where futuristic skylines meet bustling markets and vibrant street life. Explore the city’s innovative side, indulge in local flavours, and experience the unique blend of technology and tradition.",
      desc: "A futuristic city filled with culture, food, and adventure.",
      mapsUrl: "https://www.google.com/maps/search/China",
      video: "assets/sumchoy-assets/video/china/table-tennis.mp4",
      videoCaption: "Playing Table Tennis in Shenzhen",
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
      place: "Toyama",
      date: "22 January - 27 January [2025]",
      duration: "6 days",
      highlight: "Escape to Toyama, where peaceful mountain landscapes meet traditional Japanese charm. Discover scenic countryside, fresh local seafood, and quiet streets while experiencing a more authentic side of Japan away from the crowds",
      desc: "A peaceful escape into Japan’s mountains, culture, and cuisine.",
      mapsUrl: "https://www.google.com/maps/search/Japan",
      video: "assets/sumchoy-assets/video/japan/mountain-fish.mp4",
      videoCaption: "Exploring Toyama",
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
  let photoTimer = null;

  function renderPhoto() {
    const country = destinations[countryIndex];
    photoEl.classList.add("fading");
    setTimeout(() => {
      photoEl.src = country.photos[photoIndex];
      photoEl.alt = `Sum Choy in ${country.name}`;
      photoEl.classList.remove("fading");
    }, 300);
  }

  function nextPhoto() {
    const country = destinations[countryIndex];
    photoIndex = (photoIndex + 1) % country.photos.length;
    renderPhoto();
  }
  function prevPhoto() {
    const country = destinations[countryIndex];
    photoIndex = (photoIndex - 1 + country.photos.length) % country.photos.length;
    renderPhoto();
  }
  function startPhotoTimer() {
    clearInterval(photoTimer);
    photoTimer = setInterval(nextPhoto, 7000);
  }

  function renderGallery(country) {
    const doubled = [...country.photos, ...country.photos]; // duplicated for seamless loop
    galleryTrack.innerHTML = doubled
      .map((src) => `<img src="${src}" alt="${country.name}" class="gallery-thumb">`)
      .join("");
  }

  // Only fires on COUNTRY change — not on every photo tick
  function renderCountry() {
    const country = destinations[countryIndex];

    label.textContent = country.name;
    mapLabel.textContent = country.name;
    placeEl.textContent = country.place;
    descEl.textContent = country.desc;
    dateEl.textContent = country.date;
    durationEl.textContent = country.duration;
    highlightEl.textContent = country.highlight;
    linkEl.href = country.mapsUrl;
    document.getElementById("video-panel-caption").textContent = country.videoCaption;
    
    
    videoSourceEl.src = country.video;
    videoEl.load();
    videoEl.play().catch(() => {}); // ignore autoplay errors on some browsers

    galleryHeading.textContent = `${country.name}, in photos`;
    renderGallery(country);

    pins.forEach((p) => p.classList.toggle("active", parseInt(p.dataset.index) === countryIndex));
    tabs.forEach((t) => t.classList.toggle("active", parseInt(t.dataset.index) === countryIndex));
  }

  function goToCountry(index) {
    countryIndex = (index + destinations.length) % destinations.length;
    photoIndex = 0;
    renderPhoto();
    renderCountry();
    startPhotoTimer();
  }

  // ===== Event wiring =====
  photoPrevBtn.addEventListener("click", () => { prevPhoto(); startPhotoTimer(); });
  photoNextBtn.addEventListener("click", () => { nextPhoto(); startPhotoTimer(); });
  titlePrevBtn.addEventListener("click", () => goToCountry(countryIndex - 1));
  titleNextBtn.addEventListener("click", () => goToCountry(countryIndex + 1));

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => goToCountry(parseInt(tab.dataset.index)));
  });
  pins.forEach((pin) => {
    pin.addEventListener("click", () => goToCountry(parseInt(pin.dataset.index)));
    pin.addEventListener("keypress", (e) => {
      if (e.key === "Enter") goToCountry(parseInt(pin.dataset.index));
    });
  });

  // Initial paint
  renderPhoto();
  renderCountry();
  startPhotoTimer();
});
const unmuteBtn = document.getElementById("video-unmute-btn");
unmuteBtn.addEventListener("click", () => {
  videoEl.muted = !videoEl.muted;
  unmuteBtn.textContent = videoEl.muted ? "🔇" : "🔊";
});