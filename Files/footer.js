const list = document.querySelectorAll(".list");
const indicator = document.querySelector(".indicator");

function activeClass(e) {
  e.preventDefault();
  list.forEach((item) => {
    item.classList.remove("active");
    this.classList.add("active");
  });

  //   if (/home/.test(this.classList.value)) {
  //     // indicator.style.transform = "translate(55%, -50%)";
  //     console.log("hello");
  //   } else if (/List/.test(this.classList.value)) {
  //     indicator.style.transform = "translate(257%, -50%)";
  //     console.log("list");
  //   } else if (/profile/.test(this.classList.value)) {
  //     indicator.style.transform = "translate(458%, -50%)";
  //     console.log("profile");
  //   } else if (/history/.test(this.classList.value)) {
  //     indicator.style.transform = "translate(664%, -50%)";
  //     console.log("history");
  //   }
}

list.forEach((item) => {
  item.addEventListener("click", activeClass);
});
