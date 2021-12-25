// this file is defines the current position of the player after each and every matches
//

//
// Namekaran starts here
// we targeting the show profile btn and option label
const showProfileBtn = document.querySelector("#showProfileBtn");
const optionsLabel = document.querySelector("#optionsLabel");
//

//
// show profile functionality defines here in which we changed the heading of this section dynamicly on clicking the show button
let show = false;
showProfileBtn.addEventListener("click", () => {
  if (show) {
    optionsLabel.innerHTML = `According to Matches`;
  } else {
    optionsLabel.innerHTML = `According to Points`;
  }

  // we targeting the the profile list of player according to the matches and points
  const profileList = document.querySelectorAll(".profileList");
  const profileListWinMatches = document.querySelectorAll(
    ".profileListWinMatches"
  );
  //

  // toggling on every click hiding the ranking by points and show the ranking by won matches
  for (var i = 0; i < Data.membersProfile.length; i++) {
    profileList[i].classList.toggle("profileListActive");
    profileListWinMatches[i].classList.toggle("profileListWinMatchesActive");
  }
  show = !show;
});
// ends here
//

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

  // set the ranking according to the won matches
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
// ends here

// end of the script
