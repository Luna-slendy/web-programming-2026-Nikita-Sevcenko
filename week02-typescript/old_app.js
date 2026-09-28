import "./styles.css";

const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");

menuButton.addEventListener("click", () => {
  const isHidden = mainNav.classList.toggle("hidden");

  menuButton.setAttribute("aria-expanded", String(!isHidden));
});


const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

const activeFilterClasses = [
  "bg-[#f0f2f7]",
  "text-[#172033]",
];

const inactiveFilterClasses = [
  "bg-transparent",
  "text-[#6c7485]",
];


filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;


    filterButtons.forEach((item) => {
      item.classList.remove(
        "active",
        ...activeFilterClasses
      );

      item.classList.add(
        ...inactiveFilterClasses
      );
    });


    button.classList.remove(
      ...inactiveFilterClasses
    );

    button.classList.add(
      "active",
      ...activeFilterClasses
    );


    projectCards.forEach((card) => {
      const shouldShow =
        selectedFilter === "all" ||
        card.dataset.status === selectedFilter;

      card.classList.toggle(
        "hidden",
        !shouldShow
      );
    });
  });
});