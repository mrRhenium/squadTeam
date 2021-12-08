const list = document.querySelectorAll(".list");

function activeClass(e) {
  e.preventDefault();
  list.forEach((item) => {
    item.classList.remove("active");
    this.classList.add("active");
  });
}

list.forEach((item) => {
  item.addEventListener("click", activeClass);
});
