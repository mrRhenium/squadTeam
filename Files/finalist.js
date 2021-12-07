// this page is direct link to squad.html page
// this is fully depend algorithm which decide
// 1 rank holder to finalist
// 2 and 3 rank holder to semifinalist
// 1 or 2/3 play findal match

// Data is define in his sibling script "squad.js" file
console.log(Data);

// we get the tournament history json file in local
// storge
let tournamentHistory = localStorage.getItem("tournamentHistory");
tournamentHistory = JSON.parse(tournamentHistory);
console.log(tournamentHistory);

// we define the playerRank array which is merge in tournament History json file after the whole match is over
const playerRank = [{ date: new Date().toISOString() }];
console.log(playerRank[0]);

const finalPageBtn = document.querySelector("#finalPageBtn");

//we change the button text after every part of tournament
if (Data.remainingMatches >= 0) {
  finalPageBtn.innerHTML = "SemiFinalist";
} else if (Data.remainingMatches == -1 || Data.remainingMatches == -2) {
  finalPageBtn.innerHTML = "Finalist";
} else if (Data.remainingMatches == -3 || Data.remainingMatches == -4) {
  finalPageBtn.innerHTML = "Finish";
}

// final page btn different type of functionality is set
finalPageBtn.addEventListener("click", () => {
  // get semifinal players
  if (Data.remainingMatches == 0 && finalPageBtn.innerHTML == "SemiFinalist") {
    // function start here

    // ensure the semifinalist will be selected
    Data.remainingMatches--;

    // set the semifinal match in matchSquad array
    Data.matchSquad.push({
      TeamName1: `${Data.playersPosition[1].name}`,
      TeamName2: `${Data.playersPosition[2].name}`,
      matchCategory: "semi-final",
      over: false,
      rematch: true,
    });

    // set some match agian in localStorage
    localStorage.setItem("tournament", JSON.stringify(Data));
    window.location.reload();

    // end the functionality

    // get the final players
  } else if (
    Data.remainingMatches == -2 &&
    finalPageBtn.innerHTML == "Finalist"
  ) {
    // disable rematch functionality after selection of semi and finalist
    // Data.matchSquad.map((item) => {
    //   item.rematch = false;
    // });

    // ensure the finalist are selected
    Data.remainingMatches--;

    // set the final match in matchSquad array
    Data.matchSquad.push({
      TeamName1: `${Data.playersPosition[0].name}`,
      TeamName2: `${Data.matchSquad[Data.matchSquad.length - 1].winnerName}`,
      matchCategory: "final",
      over: false,
      rematch: true,
    });

    // set some match agian in localStorage
    localStorage.setItem("tournament", JSON.stringify(Data));
    window.location.reload();

    // end of the funcionality

    // set the tournament history profile
  } else if (
    Data.remainingMatches == -4 &&
    finalPageBtn.innerHTML == "Finish"
  ) {
    // Disable the finished btn functionality after one time click
    Data.remainingMatches--;

    // set the player Rank array from playerPosition key in tournament file in local storage
    let winnerFinalPoints;
    let looserFinalPoints;
    let looserSemiPoints;
    let lastMatchIndex = Data.matchSquad.length;

    Data.membersProfile.map((item) => {
      //get points of 1st player
      if (item.name == Data.matchSquad[lastMatchIndex - 1].winnerName) {
        winnerFinalPoints = item.totalPoints;
      }

      // get points of 2nd player
      if (item.name == Data.matchSquad[lastMatchIndex - 1].looserName) {
        looserFinalPoints = item.totalPoints;
      }

      // get points of 3rd player
      if (item.name == Data.matchSquad[lastMatchIndex - 2].looserName) {
        looserSemiPoints = item.totalPoints;
      }
    });

    // set 1st position
    playerRank.push({
      name: Data.matchSquad[lastMatchIndex - 1].winnerName,
      rank: 0,
      points: winnerFinalPoints,
    });

    // set 2nd position
    playerRank.push({
      name: Data.matchSquad[lastMatchIndex - 1].looserName,
      rank: 1,
      points: looserFinalPoints,
    });

    // set 3rd position
    playerRank.push({
      name: Data.matchSquad[lastMatchIndex - 2].looserName,
      rank: 2,
      points: looserSemiPoints,
    });

    // set upper than 2 index
    // due to re-assemble the points table after semi and finals
    Data.playersPosition.map((item, index) => {
      if (index > 2) {
        playerRank.push({
          name: item.name,
          rank: index,
          points: item.points,
        });
      }
    });

    // put the new touranment detain in tournaments history json file in local storage
    tournamentHistory.push(playerRank);
    console.log(playerRank);
    console.log(tournamentHistory);

    //set the player rank in localStorage
    localStorage.setItem(
      "tournamentHistory",
      JSON.stringify(tournamentHistory)
    );

    // set some match agian in localStorage
    localStorage.setItem("tournament", JSON.stringify(Data));

    //disable the rematch btn before we go to next page
    // due to this we can ensure that after go to tournament page if any one again visit the squad page he/she will not be click the rematch btn of final match
    Data.tournamentOver = true;
    rematchBtn[Data.matchSquad.length - 1].classList.add("rematchDisable");

    // Go to Tournament profile file
    finalPageBtn.setAttribute("href", "tournamentHistory.html");
  } else if (finalPageBtn.innerHTML == "Over") {
    // show some alert message after over the whole tournament
    alert("Tournament is over");

    // Go to Tournament profile file
    finalPageBtn.setAttribute("href", "tournamentHistory.html");
  } else {
    alert("Please!! Finish all the remaining matches");
  }
});
