const images = [
  "/images/img1.webp",
  "/images/img2.webp",
  "/images/img3.webp",
  "/images/img4.webp",
  "/images/img5.webp",
  "/images/img6.webp",
  "/images/img7.webp",
];

// DOM Elements
const imageEl = document.getElementById("gallery-image");
const dotsContainer = document.getElementById("gallery-dots");
const thumbnailContainer = document.getElementById("thumbnail-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const currentIndexEl = document.getElementById("current-index");
const totalImagesEl = document.getElementById("total-images");
const progressBar = document.getElementById("progress-bar");
const fullscreenBtn = document.getElementById("fullscreen-btn");

let activeIndex = 0;
let isTransitioning = false;
let autoPlayInterval = null;

// Set total images count
if (totalImagesEl) {
  totalImagesEl.textContent = images.length;
}

// Create thumbnails
images.forEach((src, index) => {
  const thumb = document.createElement("button");
  thumb.className = `
    flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden 
    border-2 border-transparent transition-all duration-300 
    hover:border-emerald-400 focus:outline-none focus:border-emerald-400
    opacity-50 hover:opacity-100
  `;
  thumb.setAttribute("aria-label", `View image ${index + 1}`);

  const img = document.createElement("img");
  img.src = src;
  img.alt = `Thumbnail ${index + 1}`;
  img.className = "w-full h-full object-cover";

  thumb.appendChild(img);
  thumb.addEventListener("click", () => setActiveImage(index));
  thumbnailContainer.appendChild(thumb);
});

// Create dots (for mobile)
images.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.className = `
    w-2 h-2 rounded-full transition-all duration-300 
    bg-white/30 hover:bg-white/50
  `;
  dot.setAttribute("aria-label", `View image ${index + 1}`);
  dot.addEventListener("click", () => setActiveImage(index));
  dotsContainer.appendChild(dot);
});

const thumbnails = thumbnailContainer.querySelectorAll("button");
const dots = dotsContainer.querySelectorAll("button");

function setActiveImage(index, direction = null) {
  if (isTransitioning) return;

  const previousIndex = activeIndex;
  activeIndex = (index + images.length) % images.length;

  if (previousIndex === activeIndex) return;

  isTransitioning = true;

  // Determine animation direction
  const isNext =
    direction === "next" ||
    (direction === null && activeIndex > previousIndex) ||
    (direction === null &&
      previousIndex === images.length - 1 &&
      activeIndex === 0);

  // Add exit animation
  imageEl.style.transform = isNext
    ? "scale(1.05) translateX(-5%)"
    : "scale(1.05) translateX(5%)";
  imageEl.style.opacity = "0";

  setTimeout(() => {
    // Update image source
    imageEl.src = images[activeIndex];

    // Set entry position
    imageEl.style.transition = "none";
    imageEl.style.transform = isNext
      ? "scale(1.05) translateX(5%)"
      : "scale(1.05) translateX(-5%)";

    // Force reflow
    imageEl.offsetHeight;

    // Animate to final position
    imageEl.style.transition = "all 0.5s ease-out";
    imageEl.style.transform = "scale(1) translateX(0)";
    imageEl.style.opacity = "1";

    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }, 250);

  // Update counter
  if (currentIndexEl) {
    currentIndexEl.textContent = activeIndex + 1;
  }

  // Update progress bar
  if (progressBar) {
    const progress = ((activeIndex + 1) / images.length) * 100;
    progressBar.style.width = `${progress}%`;
  }

  // Update thumbnails
  thumbnails.forEach((thumb, i) => {
    if (i === activeIndex) {
      thumb.classList.remove("opacity-50", "border-transparent");
      thumb.classList.add(
        "opacity-100",
        "border-emerald-500",
        "ring-2",
        "ring-emerald-500/50"
      );
    } else {
      thumb.classList.add("opacity-50", "border-transparent");
      thumb.classList.remove(
        "opacity-100",
        "border-emerald-500",
        "ring-2",
        "ring-emerald-500/50"
      );
    }
  });

  // Update dots
  dots.forEach((dot, i) => {
    if (i === activeIndex) {
      dot.classList.remove("bg-white/30", "w-2");
      dot.classList.add("bg-emerald-500", "w-6");
    } else {
      dot.classList.add("bg-white/30", "w-2");
      dot.classList.remove("bg-emerald-500", "w-6");
    }
  });

  // Scroll thumbnail into view (horizontal only, no page scroll)
  if (thumbnails[activeIndex] && thumbnailContainer) {
    const thumb = thumbnails[activeIndex];
    const container = thumbnailContainer;
    const thumbLeft = thumb.offsetLeft;
    const thumbWidth = thumb.offsetWidth;
    const containerWidth = container.offsetWidth;
    const scrollLeft = thumbLeft - containerWidth / 2 + thumbWidth / 2;

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  }
}

// Arrow controls
prevBtn.addEventListener("click", () => {
  setActiveImage(activeIndex - 1, "prev");
  resetAutoPlay();
});

nextBtn.addEventListener("click", () => {
  setActiveImage(activeIndex + 1, "next");
  resetAutoPlay();
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    setActiveImage(activeIndex - 1, "prev");
    resetAutoPlay();
  }
  if (e.key === "ArrowRight") {
    setActiveImage(activeIndex + 1, "next");
    resetAutoPlay();
  }
});

// Touch/Swipe support
let touchStartX = 0;
let touchEndX = 0;

imageEl.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true }
);

imageEl.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      setActiveImage(activeIndex + 1, "next");
    } else {
      setActiveImage(activeIndex - 1, "prev");
    }
    resetAutoPlay();
  }
}

// Fullscreen functionality
if (fullscreenBtn) {
  fullscreenBtn.addEventListener("click", () => {
    if (imageEl.requestFullscreen) {
      imageEl.requestFullscreen();
    } else if (imageEl.webkitRequestFullscreen) {
      imageEl.webkitRequestFullscreen();
    } else if (imageEl.msRequestFullscreen) {
      imageEl.msRequestFullscreen();
    }
  });
}

// Auto-play functionality
function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    setActiveImage(activeIndex + 1, "next");
  }, 5000);
}

function resetAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }
}

// Pause autoplay on hover
const galleryContainer = document.querySelector(".group");
if (galleryContainer) {
  galleryContainer.addEventListener("mouseenter", () => {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  });

  galleryContainer.addEventListener("mouseleave", () => {
    startAutoPlay();
  });
}

// Initialize
setActiveImage(0);
startAutoPlay();
