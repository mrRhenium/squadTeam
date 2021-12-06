let Data = localStorage.getItem("tournament");
Data = JSON.parse(Data);
console.log(Data);

const playerAPoints = document.querySelector("#playerAPoints");
const playerBPoints = document.querySelector("#playerBPoints");
const submitBtnId = document.querySelector("#submitBtnId");
const currentTeam = document.querySelector("#currentMatchNameId");

let timeSpent = 20;

// Set the team name in fields
const playerA = document.querySelector("#playerA");
const playerB = document.querySelector("#playerB");
const matchHeading = document.querySelector(".matchHeading");

let matchSquad = Data.matchSquad;
let matchId;
for (var i = 0; i < matchSquad.length; i++) {
  if (!matchSquad[i].over) {
    if (Data.remainingMatches == 0) {
      matchHeading.innerHTML = `<a>Semi-final Match</a>`;
    } else if (Data.remainingMatches == -1) {
      matchHeading.innerHTML = `<a>Final Match</a>`;
    } else {
      matchHeading.innerHTML = `<a>Match no. ${i + 1}</a>`;
    }
    currentTeam.innerHTML = `${matchSquad[i].TeamName1} Vs ${matchSquad[i].TeamName2}`;
    playerA.innerHTML = `${matchSquad[i].TeamName1}`;
    playerB.innerHTML = `${matchSquad[i].TeamName2}`;
    matchId = i;
    break;
  } else if (i == matchSquad.length - 1 && matchSquad[i].over) {
    alert("matches are over");
  }
}

// set the timer functionality in mathes
const currentMatchTimeId = document.querySelector("#currentMatchTimeId");
let time = 0;
let second = 0;
setInterval(() => {
  second++;
  if (second == 60) {
    time++;
  }
  if (second == 60) {
    second = 0;
  }
  if (second < 9 && time < 9) {
    currentMatchTimeId.innerHTML = `(0${time} : 0${second})`;
  } else if (second < 9 && time > 9) {
    currentMatchTimeId.innerHTML = `(${time} : 0${second})`;
  } else if (second > 9 && time < 9) {
    currentMatchTimeId.innerHTML = `(0${time} : ${second})`;
  } else if (second > 9 && time > 9) {
    currentMatchTimeId.innerHTML = `(${time} : ${second})`;
  }
}, 1000);

// set the currentPosition of players
let position = [];
const findRank = () => {
  for (var i = 0; i < Data.membersProfile.length; i++) {
    let pos = 0;
    let currPoints = -Infinity;
    Data.membersProfile.map((item, index) => {
      if (item.position == "0" && currPoints < item.totalPoints) {
        pos = index;
        currPoints = item.totalPoints;
      }
    });
    Data.membersProfile[pos].position = "1";
    position.push({
      rank: position.length,
      name: Data.membersProfile[pos].name,
      points: Data.membersProfile[pos].totalPoints,
    });
  }
};
console.log(position);

// sumit the page
let winner;
let looser;
let winnerId;
let looserId;
submitBtnId.addEventListener("click", () => {
  if (playerBPoints.value == 0 && playerAPoints.value == 0) {
    alert("Please!! fill the Points Table Correctly");
  } else if (playerBPoints.value == playerAPoints.value) {
    alert("Please!! fill the Points Table Correctly");
  } else {
    // find the winner
    if (playerBPoints.value > playerAPoints.value) {
      winner = playerB.innerHTML;
      looser = playerA.innerHTML;
    } else if (playerBPoints.value < playerAPoints.value) {
      looser = playerB.innerHTML;
      winner = playerA.innerHTML;
    }

    // set the data jsonFile
    Data.membersProfile.filter((item, index) => {
      if (winner == item.name) {
        return (winnerId = index);
      }
    });
    Data.membersProfile.filter((item, index) => {
      if (looser == item.name) {
        return (looserId = index);
      }
    });
    Data.membersProfile[winnerId].totalPoints += Math.abs(
      playerBPoints.value - playerAPoints.value
    );

    Data.membersProfile[looserId].totalPoints -= Math.abs(
      playerBPoints.value - playerAPoints.value
    );

    Data.remainingMatches--;
    Data.matchSquad[matchId].over = true;
    Data.matchSquad[matchId].time = timeSpent;
    Data.matchSquad[matchId].pointsA = playerAPoints.value;
    Data.matchSquad[matchId].pointsB = playerBPoints.value;
    Data.matchSquad[matchId].winnerName = winner;
    Data.matchSquad[matchId].looserName = looser;
    Data.matchSquad[matchId].time = currentMatchTimeId.innerHTML.substr(1, 7);
    Data.matchSquad[matchId].margin = Math.abs(
      playerBPoints.value - playerAPoints.value
    );

    // call position defing function
    if (Data.remainingMatches > -1) {
      findRank();
      Data.playersPosition = position;
      Data.membersProfile.map((item) => {
        item.position = "0";
      });
    }

    // set the Data to local Storage
    localStorage.setItem("tournament", JSON.stringify(Data));
    submitBtnId.setAttribute("href", "squad.html");
  }
});

// demo

//animation is done by click on pofile btn
document.querySelector(".footer").addEventListener("click", () => {
  document
    .querySelector(".matchContentPart2")
    .classList.toggle("matchContentPart2Acive");
  document
    .querySelector(".currentPositionCover")
    .classList.toggle("currentPositionCoverActive");
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
