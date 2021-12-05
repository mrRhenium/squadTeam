let Data = localStorage.getItem("tournament");
Data = JSON.parse(Data);
console.log(Data);

let matchSquad = Data.matchSquad;

// create multiple Match Boxes with team name
const matchContent = document.querySelector(".matchContent");
matchSquad.map((item, index) => {
  let records = `<div class="matchBoxes">
  <div class="matchBoxesHeading">
  <div class="matchTeamName">
  <a>${index + 1}. ${item.TeamName1} Vs ${item.TeamName2} </a>
  </div>
  </div>
  <div class="matchBoxesBody">
  <!-- when match is over -->
  <div class="matchStartBtn">
  <button><a class="matchBtn">Start</a></button>
  </div>
  </div>
  </div>`;

  matchContent.insertAdjacentHTML("beforeend", records);
});

// Changes the style of ui of seminfinals mathes
const matchBoxesHeading = document.querySelectorAll(".matchBoxesHeading");
Data.matchSquad.filter((item, index) => {
  if (item.matchCategory != "normal") {
    matchBoxesHeading[index].innerHTML = `<div class="matchCategory">
    <a style="font-size: 1rem;margin-top:0.1rem">${item.matchCategory}</a>
  </div>
  <div class="matchTeamName">
    <a>${item.TeamName1} vs ${item.TeamName2}</a>
  </div>`;
  }
});

const matchStartBtn = document.querySelectorAll(".matchStartBtn");
const matchTeamName = document.querySelectorAll(".matchTeamName");
const startBtn = document.querySelectorAll(".matchBtn");

// show results of finished matches
for (var i = 0; i < matchSquad.length; i++) {
  if (matchSquad[i].over) {
    matchTeamName[
      i
    ].innerHTML = `<a>${matchSquad[i].TeamName1}-(${matchSquad[i].pointsA}) Vs ${matchSquad[i].TeamName2}-(${matchSquad[i].pointsB})</a>`;
    matchStartBtn[
      i
    ].innerHTML = `<i class="fa fa-trophy" aria-hidden="true"></i> <a id="matchResult">${matchSquad[i].winnerName} is won by ${matchSquad[i].margin} Points</a>`;
  } else if (!matchSquad[i].over) {
    startBtn[i].onclick = () => {
      startBtn[i].setAttribute("href", "currentMatch.html");
    };
    break;
  }
}

//animation is done by click on pofile btn
document.querySelector(".footer").addEventListener("click", () => {
  document
    .querySelector(".currentPositionCover")
    .classList.toggle("currentPositionCoverActive");
  document.querySelector(".matchContent").classList.toggle("matchContentAcive");
});

//display the profile info on profile photo
const allProfile = document.querySelector(".allProfile");
Data.playersPosition.map((item) => {
  //jadoo
  return (allProfile.innerHTML += `<div class="profileList">
  <span><a> Position - ${item.rank + 1}</a></span>
  <span><a>${item.name}</a></span>
  <span><a>Current Points : ${item.points}</a></span>
</div>`);
});
