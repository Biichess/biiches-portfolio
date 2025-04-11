
document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";
  }, 2500);

  // Set dark gradient background
  document.body.style.background = "linear-gradient(145deg, #0d0d0d, #1a1a1a)";

  // Smooth scroll
  document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Scroll-triggered animation
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };
  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Drag & drop dengan SortableJS
  new Sortable(document.getElementById("gallery-grid"), {
    animation: 150
  });

  // Modal
  document.querySelectorAll(".gallery-item img").forEach(img => {
    img.addEventListener("click", () => {
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = 0;
      modal.style.left = 0;
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.background = "rgba(0,0,0,0.85)";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.zIndex = 9999;
      modal.innerHTML = `<img src="${img.src}" class="modal-image">`;
      modal.addEventListener("click", () => {
        modal.remove();
      });
      document.body.appendChild(modal);
    });
  });

  // Custom cursor
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  window.addEventListener("mousemove", e => {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
  });

  // Sound FX
  const clickSound = new Audio("assets/click.mp3");
  const hoverSound = new Audio("assets/hover.mp3");
  hoverSound.volume = 0.3;

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", () => clickSound.play());
    el.addEventListener("mouseenter", () => hoverSound.play());
  });
});
