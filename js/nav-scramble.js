class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.dataset.originalText || this.el.textContent;
    this.el.dataset.originalText = oldText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 10);
      const end = start + Math.floor(Math.random() * 10) + 8;
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.05) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span class="scramble-char">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav-links-group .nav-link").forEach((link) => {
    // Lock each link to its natural rendered width before any scrambling starts
    const naturalWidth = link.getBoundingClientRect().width;
    link.style.width = `${naturalWidth}px`;
    link.style.display = "inline-block";
    link.style.textAlign = "center";

    const originalText = link.textContent;
    const fx = new TextScramble(link);

    link.addEventListener("mouseenter", () => {
      fx.setText(originalText);
    });
  });
});