document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-show");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
});
