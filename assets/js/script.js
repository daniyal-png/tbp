// assets/js/script.js

// Load header
fetch('header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header-placeholder').innerHTML = data;
  });

// Load footer
fetch('footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  });

// ======== UPDATED FILTERING LOGIC ========
let selectedFormat = "all";
let selectedNiche = "all";

document.getElementById("apply-filter").addEventListener("click", () => {
  selectedFormat = document.getElementById("format-select").value;
  selectedNiche = document.getElementById("niche-select").value;
  filterPortfolioItems();
});

document.getElementById("clear-filter").addEventListener("click", () => {
  document.getElementById("format-select").value = "all";
  document.getElementById("niche-select").value = "all";
  selectedFormat = "all";
  selectedNiche = "all";
  filterPortfolioItems();
});

function filterPortfolioItems() {
  const items = document.querySelectorAll(".portfolio-item");

  items.forEach(item => {
    const itemFormat = item.getAttribute("data-format");
    const itemNiche = item.getAttribute("data-niche");

    const matchFormat = selectedFormat === "all" || itemFormat === selectedFormat;
    const matchNiche = selectedNiche === "all" || itemNiche === selectedNiche;

    item.style.display = matchFormat && matchNiche ? "block" : "none";
  });
}



// ======== LIGHTBOX DATA ========
const shoots = {
  shoot1: {
    title: "Areeba's Birthday Shoot",
    description: "A colorful and emotional event shoot.",
    media: [
      { type: "image", src: "assets/images/event1-1.jpg" },
      { type: "image", src: "assets/images/event1-2.jpg" },
      { type: "video", src: "assets/videos/video1.mp4" }
    ]
  },
  shoot2: {
    title: "Skincare Ad Campaign",
    description: "Product visuals and motion shots for XYZ Brand.",
    media: [
      { type: "video", src: "https://www.youtube.com/embed/4W5zd-dyP2A?si=R-Qc_SIXMzM_yUMk" },
      { type: "video", src: "https://www.youtube.com/embed/def456" }
    ]
  },
shoot3: {
    title: "video test",
    description: "Product visuals and motion shots for XYZ Brand.",
    media: [
      { type: "video", src: "assets/videos/video1.mp4" }
    ]
  }
  // Add more shoots here
};


// ======== LIGHTBOX FUNCTIONALITY ========
let currentSlide = 0;

const lightbox = document.getElementById("lightbox");
const mediaWrapper = document.getElementById("lightbox-media-wrapper");
const titleElem = document.getElementById("lightbox-title");
const descElem = document.getElementById("lightbox-description");

// Open lightbox on click
document.querySelectorAll(".portfolio-item").forEach(item => {
  item.addEventListener("click", () => {
    const shootId = item.dataset.shoot;
    const shoot = shoots[shootId];

    if (!shoot) return;

    titleElem.textContent = shoot.title;
    descElem.textContent = shoot.description;
    mediaWrapper.innerHTML = "";

    shoot.media.forEach((media, index) => {
      let el;

      if (media.type === "image") {
        el = document.createElement("img");
        el.src = media.src;
      } else if (media.type === "video") {
        if (media.src.includes("youtube.com") || media.src.includes("youtu.be")) {
          el = document.createElement("iframe");
          el.src = media.src;
          el.frameBorder = 0;
          el.allowFullscreen = true;
          el.width = "100%";
          el.height = "500";
        } else {
          el = document.createElement("video");
          el.src = media.src;
          el.controls = true;
          el.width = "100%";
          el.height = "500";
        }
      }

      if (index === 0) {
        el.classList.add("active-slide");
      }

      mediaWrapper.appendChild(el);
    });

    currentSlide = 0;
    lightbox.classList.add("show");
  });
});

// Slide navigation
document.getElementById("prev-slide").addEventListener("click", () => showSlide(-1));
document.getElementById("next-slide").addEventListener("click", () => showSlide(1));

function showSlide(direction) {
  const slides = mediaWrapper.children;
  if (!slides.length) return;

  // Remove current active slide
  slides[currentSlide].classList.remove("active-slide");

  // Calculate next slide index
  const nextSlide = (currentSlide + direction + slides.length) % slides.length;

  // Delay adding the next active slide to allow transition
  setTimeout(() => {
    currentSlide = nextSlide;
    slides[currentSlide].classList.add("active-slide");
  }, 20); // Just enough time for browser to register the removal
}


// Close lightbox
function closeLightbox() {
  lightbox.classList.remove("show");
  setTimeout(() => {
    mediaWrapper.innerHTML = "";
  }, 400);
}


document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.querySelector(".close");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("show")) return;

  switch (e.key) {
    case "ArrowRight": showSlide(1); break;
    case "ArrowLeft": showSlide(-1); break;
    case "Escape": closeLightbox(); break;
  }
});
