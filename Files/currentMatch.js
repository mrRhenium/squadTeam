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
    matchHeading.innerHTML = `<a>Match no. ${i + 1}</a>`;
    currentTeam.innerHTML = `${matchSquad[i].TeamName1} Vs ${matchSquad[i].TeamName2}`;
    playerA.innerHTML = `${matchSquad[i].TeamName1}`;
    playerB.innerHTML = `${matchSquad[i].TeamName2}`;
    matchId = i;
    break;
  } else if (i == matchSquad.length - 1 && matchSquad[i].over) {
    alert("matches are over");
  }
}

let winner = "";
submitBtnId.addEventListener("click", () => {
  if (playerBPoints.value == 0 || playerAPoints.value == 0) {
    alert("Please!! fill the Points Table");
  } else if (playerBPoints.value == playerAPoints.value) {
    alert("Please!! fill the Points Table Correctly");
  } else {
    // find the winner
    if (playerBPoints.value > playerAPoints.value) {
      winner = playerB.innerHTML;
    } else {
      winner = playerA.innerHTML;
    }

    // set the data jsonFile
    Data.matchSquad[matchId].over = true;
    Data.matchSquad[matchId].time = timeSpent;
    Data.matchSquad[matchId].pointsA = playerAPoints.value;
    Data.matchSquad[matchId].pointsB = playerBPoints.value;
    Data.matchSquad[matchId].winnerName = winner;
    Data.matchSquad[matchId].margin = Math.abs(
      playerBPoints.value - playerAPoints.value
    );

    localStorage.setItem("tournament", JSON.stringify(Data));
    submitBtnId.setAttribute("href", "squad.html");
  }
});
