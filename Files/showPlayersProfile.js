const showProfileBtn = document.querySelector("#showProfileBtn");
const optionsLabel = document.querySelector("#optionsLabel");

let show = false;
showProfileBtn.addEventListener("click", () => {
  if (show) {
    optionsLabel.innerHTML = `According to Matches`;
  } else {
    optionsLabel.innerHTML = `According to Points`;
  }

  const profileList = document.querySelectorAll(".profileList");
  const profileListWinMatches = document.querySelectorAll(
    ".profileListWinMatches"
  );

  for (var i = 0; i < Data.membersProfile.length; i++) {
    profileList[i].classList.toggle("profileListActive");
    profileListWinMatches[i].classList.toggle("profileListWinMatchesActive");
  }
  show = !show;
});

//animation is done by click on pofile btn
document.querySelector("#profileBtnFooter").addEventListener("click", () => {
  // first fall empty the inner html element due to preventing the adding same content more than one on click
  const allProfile = document.querySelector(".allProfile");
  allProfile.innerHTML = "";

  //display and updating the profile array again because any user click on rematch btn so current position of player again changed
  console.log(Data.playersPositionAccordingToPoints);
  Data.playersPositionAccordingToPoints.map((item) => {
    return (allProfile.innerHTML += `<div class="profileList">
  <span><a> Position - ${item.rank + 1}</a></span>
  <span><a>${item.name}</a></span>
  <span><a>Current Points : ${item.points}</a></span>
  </div>`);
  });

  Data.playersPositionAccordingToWinMatches.map((item) => {
    return (allProfile.innerHTML += `<div class="profileListWinMatches">
  <span><a> Position - ${item.rank + 1}</a></span>
  <span><a>${item.name}</a></span>
  <span><a>Matches: Won-(${item.win}) || Lose-(${item.lose})</a></span>
  </div>`);
  });

  document
    .querySelector(".currentPositionCover")
    .classList.add("currentPositionCoverActive");
  document.querySelector(".matchContent").classList.add("matchContentAcive");
});

//animation is done by click on pofile btn
document.querySelector("#listBtnFooter").addEventListener("click", () => {
  document
    .querySelector(".currentPositionCover")
    .classList.remove("currentPositionCoverActive");
  document.querySelector(".matchContent").classList.remove("matchContentAcive");
});
