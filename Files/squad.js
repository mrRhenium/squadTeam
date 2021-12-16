// We fetch data from local storage to display the info and records of the matches
let Data = localStorage.getItem("tournament");
Data = JSON.parse(Data);
// console.log(Data);

// declare the matchSqauad constant for reducing the code
let matchSquad = Data.matchSquad;

// create multiple Match Boxes with team name which display the upcoming matches and previous matches
// targetin the mathcBoxes's parent div
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

// Changes the style of UI of seminfinals matches just adding the match category field in matchBoxesHeading div
// targeting the heading part of the matchBoxes
const matchBoxesHeading = document.querySelectorAll(".matchBoxesHeading");
Data.matchSquad.filter((item, index) => {
  if (item.matchCategory != "normal") {
    matchBoxesHeading[index].innerHTML = `<div class="matchCategory">
    <a style="font-size: 1rem;margin-top:0.2rem;color:royalblue">${item.matchCategory}</a>
  </div>
  <div class="matchTeamName">
    <a>${item.TeamName1} vs ${item.TeamName2}</a>
  </div>`;
  }
});

// we targeting the startBtn's parent's div in match boxes
const matchStartBtn = document.querySelectorAll(".matchStartBtn");
// we targeting the matchTeamName div in Header part of the match boxes
const matchTeamName = document.querySelectorAll(".matchTeamName");
// we targeting the starat Btn in content part of the match Boxes
const startBtn = document.querySelectorAll(".matchBtn");

// show results of finished matches
for (var i = 0; i < matchSquad.length; i++) {
  if (matchSquad[i].over) {
    matchTeamName[
      i
    ].innerHTML = `<a>${matchSquad[i].TeamName1}-(${matchSquad[i].pointsA}) Vs ${matchSquad[i].TeamName2}-(${matchSquad[i].pointsB})</a> <a class="rematchBtn"><i id="rematch" class="fa fa-undo" aria-hidden="true"></i></a>`;

    // after match is over we pass the result part of the of the match in content part of the match Boxes instead of start Btn and we also add rematch btn for give the chance for rematch to play again that particular match in series of the tournaments
    matchStartBtn[
      i
    ].innerHTML = `<i class="fa fa-trophy" aria-hidden="true" style="color:yellow"></i> <a id="matchResult">${matchSquad[i].winnerName} is won by ${matchSquad[i].margin} Points</a>`;
    // console.log("add");

    // we targeting the rematch btn in content part of the match Boxes div
    const rematch = document.querySelectorAll("#rematch");
    // we define the rematch function through it we can organise the match again
    rematch[i].onclick = () => {
      // set the over false
      Data.matchSquad[i - 1].over = false;
      // set the remaingMatches to previous value
      Data.remainingMatches++;

      // update the profile to previous rank
      Data.playersPositionAccordingToPoints.map((item) => {
        if (item.name == Data.matchSquad[i - 1].winnerName) {
          item.points -= Data.matchSquad[i - 1].margin;
        }
        if (item.name == Data.matchSquad[i - 1].looserName) {
          item.points += Data.matchSquad[i - 1].margin;
        }
      });

      // update the profile to previous rank according to winning mathces and lossing matches
      if (Data.remainingMatches > -1) {
        Data.playersPositionAccordingToWinMatches.map((item) => {
          if (item.name == Data.matchSquad[i - 1].winnerName) {
            item.winMatches--;
          }
          if (item.name == Data.matchSquad[i - 1].looserName) {
            item.loseMatches--;
          }
        });
      }

      // update the totals points and winning and lossing matches in membersProfile unchanged
      Data.membersProfile.map((item) => {
        if (item.name == Data.matchSquad[i - 1].winnerName) {
          item.totalPoints -= Data.matchSquad[i - 1].margin;
          item.winMatches--;
        }
        if (item.name == Data.matchSquad[i - 1].looserName) {
          item.totalPoints += Data.matchSquad[i - 1].margin;
          item.loseMatches--;
        }
      });

      // set changes in local storage
      localStorage.setItem("tournament", JSON.stringify(Data));
      setTimeout(() => {
        window.location.href = `currentMatch.html`;
      }, 1000);
      // console.log(i + "click");
    };
    // rematch functionality ends here

    //
  } else if (!matchSquad[i].over) {
    // we set the start btn functionality that is after clicking the startBtn we redirecting to the currentMatch html page only on that btn which just after over match then we break the loop to avoid other sibling start Btn
    startBtn[i].onclick = () => {
      setTimeout(() => {
        window.location.href = `currentMatch.html`;
      }, 1000);
      console.log(i + "start btn is clicked");
      // startBtn[i].setAttribute("href", "currentMatch.html");
    };
    break;
  }
}
// function ends here

// disable rematch functionality after selection of semi and finalist
const rematchBtn = document.querySelectorAll(".rematchBtn");
if (Data.remainingMatches < 0) {
  for (let i = 0; i < Data.matchSquad.length; i++) {
    if (i != Data.matchSquad.length - 1 || Data.tournamentOver) {
      if (Data.matchSquad[i].over) {
        rematchBtn[i].classList.add("rematchDisable");
        // console.log(i + " this one " + Data.matchSquad[i].over);
      }
    }
  }
}
