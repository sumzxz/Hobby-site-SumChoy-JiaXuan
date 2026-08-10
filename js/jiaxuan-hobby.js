document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const speciesRows = document.querySelectorAll("tbody tr[data-difficulty]");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filterValue = btn.getAttribute("data-filter");
      speciesRows.forEach((row) => {
        const match = filterValue === "all" || row.getAttribute("data-difficulty") === filterValue;
        row.classList.toggle("species-hidden", !match);
      });
    });
  });

  const fishingFacts = [
    { title: "Singapore's Longest Jetty", text: "Bedok Jetty extends over 250 meters into the East Singapore Strait. Built in the 1960s as a military loading facility, it is now Singapore's most famous deepwater coastal fishing spot." },
    { title: "Razor-Sharp Defense", text: "Barramundi possess razor sharp gill plates. When hooked, they jump out of the water and shake their heads, which can easily slice through standard monofilament lines." },
    { title: "Nighttime Hunters", text: "Fresh squid caught directly off local jetties at night is widely considered the ultimate live bait for landing most fish." },
    { title: "The Camouflage Master", text: "The Orange-Spotted Groupers can alter its skin tone to blend into rocks and corals, ambushing prey by creating a powerful suction with its large mouth." },
    { title: "Surface Speed Demons", text: "Queenfish are high-speed saltwater predators in Singapore currents. Capable of swimming up to 30 km/h, they frequently launch completely out of the water in acrobatic leaps when chasing metal jigs." },
    { title: "High Tide Predators", text: "Diamond Trevally rely on fast coastal currents during high tides to drive small baitfish toward sea walls, making peak high tide the best window to target them." },
  ];

  function displayRandomFact() {
    const i = Math.floor(Math.random() * fishingFacts.length);
    document.getElementById("fact-number").textContent = `#${i + 1}`;
    document.getElementById("fact-title").textContent = fishingFacts[i].title;
    document.getElementById("fact-display").textContent = fishingFacts[i].text;
  }

  displayRandomFact();
  const shuffleBtn = document.getElementById("random-fact-btn");
  if (shuffleBtn) shuffleBtn.addEventListener("click", displayRandomFact);
});