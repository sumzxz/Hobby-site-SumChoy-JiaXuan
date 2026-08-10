document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const hobbySelect = document.getElementById("hobbySelect");
  const fieldGroups = document.querySelectorAll(".hobby-fields");
  const heroEl = document.getElementById("contact-hero");

  // Backgrounds per hobby — swap these paths to your real images.
  // Jia Xuan: change the "fishing" path below to whichever background you pick.
  const heroBackgrounds = {
    travelling: "assets/sumchoy-assets/image/nature-landscape.jpeg",
    fishing: "assets/jiaxuan-assets/image/fishing-background.jpeg",
  };

  function applyHobbyView(hobby) {
    fieldGroups.forEach((group) => {
      const isMatch = group.dataset.hobby === hobby;
      group.hidden = !isMatch;
      group.querySelectorAll("input, select").forEach((field) => {
        field.disabled = !isMatch; // disabled fields are excluded from submission entirely
      });
    });

    if (heroBackgrounds[hobby]) {
      heroEl.style.backgroundImage = `url("${heroBackgrounds[hobby]}")`;
    }
  }

  // Pre-select hobby from URL, e.g. contact.html?hobby=travelling
  const urlParams = new URLSearchParams(window.location.search);
  const selectedHobby = urlParams.get("hobby");
  if (selectedHobby) hobbySelect.value = selectedHobby;
  applyHobbyView(hobbySelect.value);

  hobbySelect.addEventListener("change", () => applyHobbyView(hobbySelect.value));

  form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add("was-validated");
  });
});