const images = [
  "/Images/img1.webp",
  "/Images/img2.webp",
  "/Images/img3.webp",
  "/Images/img4.webp",
  "/Images/img5.webp",
  "/Images/img6.webp",
  "/Images/img7.webp",
];

const imageEl = document.getElementById("gallery-image");
const dotsContainer = document.getElementById("gallery-dots");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let activeIndex = 0;

// Create dots
images.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.className =
    "w-3 h-3 rounded-full bg-gray-300 transition hover:bg-gray-400";
  dot.setAttribute("aria-label", `View image ${index + 1}`);

  dot.addEventListener("click", () => setActiveImage(index));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll("button");

function setActiveImage(index) {
  activeIndex = (index + images.length) % images.length;
  imageEl.src = images[activeIndex];

  dots.forEach((dot, i) => {
    dot.classList.toggle("bg-gray-800", i === activeIndex);
    dot.classList.toggle("bg-gray-300", i !== activeIndex);
  });
}

// Arrow controls
prevBtn.addEventListener("click", () => {
  setActiveImage(activeIndex - 1);
});

nextBtn.addEventListener("click", () => {
  setActiveImage(activeIndex + 1);
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") setActiveImage(activeIndex - 1);
  if (e.key === "ArrowRight") setActiveImage(activeIndex + 1);
});

// Init
setActiveImage(0);
