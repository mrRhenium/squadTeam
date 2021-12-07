// We fetch data from local storage to set the matches in squad.html
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
    ].innerHTML = `<a>${matchSquad[i].TeamName1}-(${matchSquad[i].pointsA}) Vs ${matchSquad[i].TeamName2}-(${matchSquad[i].pointsB})</a> <a class="rematchBtn"><i id="rematch" class="fa fa-undo" aria-hidden="true"></i></a>`;

    matchStartBtn[
      i
    ].innerHTML = `<i class="fa fa-trophy" aria-hidden="true"></i> <a id="matchResult">${matchSquad[i].winnerName} is won by ${matchSquad[i].margin} Points</a>`;
    console.log("add");

    const rematch = document.querySelectorAll("#rematch");

    // difine the rematch btn
    rematch[i].onclick = () => {
      // set the over false
      Data.matchSquad[i - 1].over = false;
      // set the remaingMatches is pre value
      Data.remainingMatches++;
      // set the profile to previous rank
      Data.playersPosition.map((item) => {
        if (item.name == Data.matchSquad[i - 1].winnerName) {
          item.points -= Data.matchSquad[i - 1].margin;
        }
        if (item.name == Data.matchSquad[i - 1].looserName) {
          item.points += Data.matchSquad[i - 1].margin;
        }
      });
      // set the totals points in membersProfile unchanged
      Data.membersProfile.map((item) => {
        if (item.name == Data.matchSquad[i - 1].winnerName) {
          item.totalPoints -= Data.matchSquad[i - 1].margin;
        }
        if (item.name == Data.matchSquad[i - 1].looserName) {
          item.totalPoints += Data.matchSquad[i - 1].margin;
        }
      });

      // set changes in local storage
      localStorage.setItem("tournament", JSON.stringify(Data));

      window.location.href = `currentMatch.html`;
      console.log(i + "click");
    };
  } else if (!matchSquad[i].over) {
    startBtn[i].onclick = () => {
      console.log(i + " wow ");
      window.location.href = `currentMatch.html`;
      // startBtn[i].setAttribute("href", "currentMatch.html");
    };

    break;
  }
}
// function ends here

// disable rematch functionality after selection of semi and finalist
const rematchBtn = document.querySelectorAll(".rematchBtn");
if (Data.remainingMatches < 0) {
  for (var i = 0; i < Data.matchSquad.length; i++) {
    if (i != Data.matchSquad.length - 1)
      if (Data.matchSquad[i].over)
        rematchBtn[i].classList.add("rematchDisable");
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
