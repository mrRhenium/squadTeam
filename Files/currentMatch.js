// fetch the tournament Data from the loaclStorage of our browser
let Data = localStorage.getItem("tournament");
Data = JSON.parse(Data);
console.log(Data);

// fetch the application setting file from the loaclStorage of our browser
let setting = localStorage.getItem("Setting");
setting = JSON.parse(setting);
console.log(setting);

// we target the points of playerApoint field
const playerAPoints = document.querySelector("#playerAPoints");
// we target the points of playerBpoint field
const playerBPoints = document.querySelector("#playerBPoints");
// we target the submit btn in current match
const submitBtnId = document.querySelector("#submitBtnId");
// we target the current match's player name
const currentTeam = document.querySelector("#currentMatchNameId");

// Set the team name in fields

// we target the label of player A
const playerA = document.querySelector("#playerA");
// we target the label of player B
const playerB = document.querySelector("#playerB");
// we target the match header part of current match
const matchHeading = document.querySelector(".matchHeading");

// for simplicity we define the mathcSquad constant
let matchSquad = Data.matchSquad;
let matchId;

// in this functionality we define the UI/UX part of the current match html page
for (var i = 0; i < matchSquad.length; i++) {
  if (!matchSquad[i].over) {
    // we set the heading of current match page according to the match category
    if (Data.remainingMatches == -1) {
      matchHeading.innerHTML = `<a>Semi-final Match</a>`;
    } else if (Data.remainingMatches == -3) {
      matchHeading.innerHTML = `<a>Final Match</a>`;
    } else {
      matchHeading.innerHTML = `<a>Match no. ${i + 1}</a>`;
    }

    // set the players name in UI/UX part of tha label field
    currentTeam.innerHTML = `${matchSquad[i].TeamName1} Vs ${matchSquad[i].TeamName2}`;
    playerA.innerHTML = `${matchSquad[i].TeamName1}`;
    playerB.innerHTML = `${matchSquad[i].TeamName2}`;

    // we define the matchId value which is the id of current match btn
    matchId = i;
    // after filling first not over Match we break the for loop
    break;
  } else if (i == matchSquad.length - 1 && matchSquad[i].over) {
    // we awaring the user to alert message that all the matches are over now and make new squad to continoues series
    alert("matches are over");
  }
}

// set the timer functionality in mathes and UI/UX part of the current match
// we target the currentMatchTimeId for reflect the time
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
//
//

// sort the player position according to the winning matches
const findRankAccordingToWinMatches = () => {
  var demo = [...Data.membersProfile];
  Data.playersPositionAccordingToWinMatches = [];
  for (var i = 0; i < demo.length; i++) {
    for (var j = 0; j < demo.length - 1; j++) {
      if (demo[j].winMatches < demo[j + 1].winMatches) {
        var temp = demo[j];
        demo[j] = demo[j + 1];
        demo[j + 1] = temp;
      } else if (demo[j].winMatches == demo[j + 1].winMatches) {
        if (demo[j].totalPoints < demo[j + 1].totalPoints) {
          var temp = demo[j];
          demo[j] = demo[j + 1];
          demo[j + 1] = temp;
        }
      }
    }
  }
  demo.filter((item, index) => {
    Data.playersPositionAccordingToWinMatches.push({
      rank: index,
      name: item.name,
      points: item.totalPoints,
      win: item.winMatches,
      lose: item.loseMatches,
    });
  });
};

// sort the player postion according to the total points in a matches
const findRankAccordingToPoints = () => {
  var demo = [...Data.membersProfile];
  Data.playersPositionAccordingToPoints = [];
  for (var i = 0; i < demo.length; i++) {
    for (var j = 0; j < demo.length - 1; j++) {
      if (demo[j].totalPoints < demo[j + 1].totalPoints) {
        var temp = demo[j];
        demo[j] = demo[j + 1];
        demo[j + 1] = temp;
      } else if (demo[j].totalPoints == demo[j + 1].totalPoints) {
        if (demo[j].winMatches < demo[j + 1].winMatches) {
          var temp = demo[j];
          demo[j] = demo[j + 1];
          demo[j + 1] = temp;
        }
      }
    }
  }
  demo.filter((item, index) => {
    Data.playersPositionAccordingToPoints.push({
      rank: index,
      name: item.name,
      points: item.totalPoints,
      win: item.winMatches,
      lose: item.loseMatches,
    });
  });
};

// this functionality run after the clicking the submit button on current match page
let winner;
let looser;
let winnerId;
let looserId;
// this functionality is fully updating the tournament data like match wins and margin current player points
submitBtnId.addEventListener("click", () => {
  if (playerBPoints.value == 0 && playerAPoints.value == 0) {
    alert("Please!! fill the Points Table Correctly");
  } else if (playerBPoints.value == playerAPoints.value) {
    alert("Please!! fill the Points Table Correctly");
  } else {
    //

    // find the name of winner and looser of the current match
    if (playerBPoints.value > playerAPoints.value) {
      winner = playerB.innerHTML;
      looser = playerA.innerHTML;
    } else if (playerBPoints.value < playerAPoints.value) {
      looser = playerB.innerHTML;
      winner = playerA.innerHTML;
    }

    // update the data the in Data json file which is fetched from the localStorage of our browser
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

    //
    //
    Data.membersProfile[winnerId].totalPoints += Math.abs(
      playerBPoints.value - playerAPoints.value
    );
    Data.membersProfile[looserId].totalPoints -= Math.abs(
      playerBPoints.value - playerAPoints.value
    );
    //
    //

    //
    //
    Data.membersProfile[winnerId].winMatches++;
    Data.membersProfile[looserId].loseMatches++;
    //
    //

    Data.remainingMatches--;
    Data.matchSquad[matchId].over = true;
    // Data.matchSquad[matchId].time = timeSpent;
    Data.matchSquad[matchId].pointsA = playerAPoints.value;
    Data.matchSquad[matchId].pointsB = playerBPoints.value;
    Data.matchSquad[matchId].winnerName = winner;
    Data.matchSquad[matchId].looserName = looser;
    Data.matchSquad[matchId].time = currentMatchTimeId.innerHTML.substr(1, 7);
    Data.matchSquad[matchId].margin = Math.abs(
      playerBPoints.value - playerAPoints.value
    );
    //
    //

    // call the fucntion for the sorting the players position according the mathces and totla points
    if (Data.remainingMatches > -1) {
      findRankAccordingToWinMatches();
    }

    if (
      Data.remainingMatches > -1 ||
      setting[0].tournamentRankingType.byWinningMatches
    ) {
      findRankAccordingToPoints();
    }
    //
    //

    // updating the Data to local Storage
    localStorage.setItem("tournament", JSON.stringify(Data));
    //
    //

    // updating the Data to local Storage
    localStorage.setItem("tournament", JSON.stringify(Data));
    submitBtnId.setAttribute("href", "squad.html");
  }
});

// // update  the currentPositionAccordingToPoints object json file in tournament after every match for
// let positionAccordingToPoints = [];
// const findRankAccordingToPoints = () => {
//   for (var i = 0; i < Data.membersProfile.length; i++) {
//     let pos = 0;
//     let currPoints = -Infinity;
//     Data.membersProfile.map((item, index) => {
//       if (item.position == "0" && currPoints < item.totalPoints) {
//         pos = index;
//         currPoints = item.totalPoints;
//       }
//     });
//     Data.membersProfile[pos].position = "1";
//     positionAccordingToPoints.push({
//       rank: positionAccordingToPoints.length,
//       name: Data.membersProfile[pos].name,
//       points: Data.membersProfile[pos].totalPoints,
//       winMatches: Data.membersProfile[pos].winMatches,
//       loseMatches: Data.membersProfile[pos].loseMatches,
//     });
//   }
// };
// console.log("According to points" + positionAccordingToPoints);

// // update  the currentPositionAccordingTowinningMatches object json file in tournament after every match for
// let positionAccordingToWinMatches = [];
// const findRankAccordingToWinMatches = () => {
//   for (var i = 0; i < Data.membersProfile.length; i++) {
//     let pos = 0;
//     let winningMatches = -1;
//     Data.membersProfile.map((item, index) => {
//       if (item.position == "0" && winningMatches < item.winMatches) {
//         pos = index;
//         winningMatches = item.winMatches;
//       }
//     });
//     Data.membersProfile[pos].position = "1";
//     positionAccordingToWinMatches.push({
//       rank: positionAccordingToWinMatches.length,
//       name: Data.membersProfile[pos].name,
//       points: Data.membersProfile[pos].totalPoints,
//       winMatches: Data.membersProfile[pos].winMatches,
//       loseMatches: Data.membersProfile[pos].loseMatches,
//     });
//   }
// };
// console.log("According to win matches" + positionAccordingToWinMatches);
//

//
//
// call positionAccordingToPoints defining function
// if (
//   Data.remainingMatches > -1 ||
//   setting[0].tournamentRankingType.byWinningMatches
// ) {
//   findRankAccordingToPoints();
//   // we updating the player Position object after every match where position is define upper side of the code
//   Data.playersPositionAccordingToPoints = positionAccordingToPoints;
//   // updating the player Position which is position field to 0
//   Data.membersProfile.map((item) => {
//     item.position = "0";
//   });
// }
// //
// //

// // call positionAccordingToPoints defining function
// if (Data.remainingMatches > -1) {
//   findRankAccordingToWinMatches();
//   // we updating the player Position object after every match where position is define upper side of the code
//   Data.playersPositionAccordingToWinMatches = positionAccordingToWinMatches;
//   // updating the player Position which is position field to 0
//   Data.membersProfile.map((item) => {
//     item.position = "0";
//   });
// }
// //
// //
