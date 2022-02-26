// to set the all functionality related to the footer div like..
// this page is fully work on the navigation functionality of the application

// fetch the tournament record from the localstorage
let DataForIndex = localStorage.getItem("tournament");
DataForIndex = JSON.parse(DataForIndex);
// console.log(DataForIndex);

//
// we targeting the footer item like icons for navigation functionality
const list = document.querySelectorAll(".list");
const indicator = document.querySelector(".indicator");
// this function is only for UI/UX
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
// functionality ends here
//

//
// namkaran starts here
// we targeting the home,list,profle,history icon
const homeBtnFooter = document.querySelector("#homeBtnFooter");
const listBtnFooter = document.querySelector("#listBtnFooter");
const profileBtnFooter = document.querySelector("#profileBtnFooter");
const historyBtnFooter = document.querySelector("#historyBtnFooter");
// ends here
//

//
// navigation functionality defines here
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
        //
        list[1].classList.remove("active");
        list[2].classList.add("active");
        //
        alert(
          "Please !! \n Firstly Fill required info. in Input boxes \n Then click Next Button"
        );
      }
    } else if (/currentMatch.html/.test(window.location.href)) {
      return console.log("squad.html");
    } else {
      if (DataForIndex) {
        window.location.href = "Files/squad.html";
      } else {
        //
        list[1].classList.remove("active");
        list[0].classList.add("active");
        //
        alert(
          "Please !! \n Firstly Fill required info. in Input boxes of home page \n Then click Next Button"
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
// ends here

// ends of the script
