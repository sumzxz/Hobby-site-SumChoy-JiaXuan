const paragraphs = document.querySelectorAll('.manifesto-text p');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.3 });

paragraphs.forEach((p) => observer.observe(p));