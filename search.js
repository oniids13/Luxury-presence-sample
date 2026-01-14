document.querySelectorAll(".search-tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    document.querySelectorAll(".search-tab").forEach((t) => {
      t.classList.remove("active", "bg-emerald-500", "text-white", "shadow-lg");
      t.classList.add("text-gray-600");
    });
    this.classList.add("active", "bg-emerald-500", "text-white", "shadow-lg");
    this.classList.remove("text-gray-600");
  });
});

// Advanced filters toggle
const advancedToggle = document.getElementById("advanced-toggle");
const advancedFilters = document.getElementById("advanced-filters");
const advancedIcon = document.getElementById("advanced-icon");
const advancedText = document.getElementById("advanced-text");

advancedToggle.addEventListener("click", function () {
  advancedFilters.classList.toggle("hidden");
  if (advancedFilters.classList.contains("hidden")) {
    advancedIcon.innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>';
    advancedText.textContent = "Show Advanced Filters";
  } else {
    advancedIcon.innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>';
    advancedText.textContent = "Hide Advanced Filters";
  }
});
