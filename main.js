// Portfolio filter
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const items = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      // Active button
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter items
      items.forEach(item => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();
});
