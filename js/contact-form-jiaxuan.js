document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const hobbySelect = document.getElementById("hobbySelect");
  const fieldGroups = document.querySelectorAll(".hobby-fields");
  const heroEl = document.getElementById("contact-hero");
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const maxDateObj = new Date(today);
  maxDateObj.setFullYear(maxDateObj.getFullYear() + 2);
  const maxDate = maxDateObj.toISOString().split("T")[0];
  dateInputs.forEach((input) => {
    input.setAttribute("min", minDate);
    input.setAttribute("max", maxDate);
  });
  


  const heroBackgrounds = {
    travelling: "assets/sumchoy-assets/image/nature-landscape.jpeg",
    fishing: "assets/jiaxuan-assets/image/fishing-background.jpeg",
  };

  function applyHobbyView(hobby) {
    fieldGroups.forEach((group) => {
      const isMatch = group.dataset.hobby === hobby;
      group.hidden = !isMatch;
      group.querySelectorAll("input, select").forEach((field) => {
        field.disabled = !isMatch;
      });
    });

    if (heroBackgrounds[hobby]) {
      heroEl.style.backgroundImage = `url("${heroBackgrounds[hobby]}")`;
    }
  }


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