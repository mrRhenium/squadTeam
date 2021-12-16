let DataForIndex = localStorage.getItem("tournament");
DataForIndex = JSON.parse(DataForIndex);
// console.log(DataForIndex);

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

// its stop the calling of that
// if (
//   /index.html/.test(window.location.href) ||
//   /Files\?squad.html/.test(window.location.href) ||
//   /Files\?tournamentHisory.html/.test(window.location.href)
// ) {
const homeBtnFooter = document.querySelector("#homeBtnFooter");
const listBtnFooter = document.querySelector("#listBtnFooter");
const profileBtnFooter = document.querySelector("#profileBtnFooter");
const historyBtnFooter = document.querySelector("#historyBtnFooter");
// const settingBtnFooter = document.querySelector("#settingBtnFooter");

homeBtnFooter.addEventListener("click", (e) => {
  e.preventDefault();
  setTimeout(() => {
    if (/index.html/.test(window.location.href)) {
      return console.log("index.html");
    } else {
      window.location.href = "../index.html";
      console.log(window.location.href);
    }
  }, 1500);
});

listBtnFooter.addEventListener("click", () => {
  setTimeout(() => {
    if (/squad.html/.test(window.location.href)) {
      return console.log("squad.html");
    } else if (/tournamentHistory.html/.test(window.location.href)) {
      if (DataForIndex) {
        window.location.href = "squad.html";
      } else {
        alert(
          "Please !! \n Firstly Fill required info. in Input boxes \n Then click Next Button"
        );
      }
    } else if (/currentMatch.html/.test(window.location.href)) {
      return console.log("squad.html");
    } else {
      if (DataForIndex) {
        window.location.href = "/Files/squad.html";
      } else {
        alert(
          "Please !! \n Firstly Fill required info. in Input boxes \n Then click Next Button"
        );
      }
    }
  }, 1500);
});

historyBtnFooter.addEventListener("click", () => {
  setTimeout(() => {
    if (/tournamentHistory.html/.test(window.location.href)) {
      return console.log("tournamentHistory.html");
    } else if (/squad.html/.test(window.location.href)) {
      window.location.href = "tournamentHistory.html";
    } else {
      window.location.href = "Files/tournamentHistory.html";
    }
  }, 1500);
});

settingBtnFooter.addEventListener("click", () => {
  setTimeout(() => {
    if (/setting.html/.test(window.location.href)) {
      return console.log("tournamentHistory.html");
    } else if (/tournamentHistory.html/.test(window.location.href)) {
      window.location.href = "setting.html";
    } else {
      window.location.href = "Files/setting.html";
    }
  }, 1500);
});
