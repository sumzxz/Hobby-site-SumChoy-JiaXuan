document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const fish = document.createElement("div");
  fish.className = "fish-cursor";
  fish.innerHTML = `
    <svg viewBox="0 0 60 30" width="34" height="17">
      <path d="M2 15 C10 2, 35 2, 48 15 C35 28, 10 28, 2 15 Z" fill="#2F6E68"/>
      <path d="M48 15 L60 6 L60 24 Z" fill="#2F6E68"/>
      <circle cx="12" cy="13" r="1.6" fill="#fff"/>
    </svg>
  `;
  document.body.appendChild(fish);

  document.body.classList.add("fish-cursor-active");

  let mouseX = 0, mouseY = 0;
  let fishX = 0, fishY = 0;
  let lastTrailTime = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;


    const now = Date.now();
    if (now - lastTrailTime > 60) {
      spawnDroplet(e.clientX, e.clientY);
      lastTrailTime = now;
    }
  });

  function spawnDroplet(x, y) {
    const drop = document.createElement("div");
    drop.className = "water-droplet";
    drop.style.left = `${x}px`;
    drop.style.top = `${y}px`;
    document.body.appendChild(drop);


    drop.addEventListener("animationend", () => drop.remove());
  }

  function animateFish() {
    fishX += (mouseX - fishX) * 0.18;
    fishY += (mouseY - fishY) * 0.18;


    const facingLeft = mouseX < fishX;
    fish.style.transform = `translate(${fishX - 17}px, ${fishY - 9}px) scaleX(${facingLeft ? -1 : 1})`;

    requestAnimationFrame(animateFish);
  }
  animateFish();
});