// this page is direct link to squad.html page
// this is fully depend algorithm which decide
// 1 rank holder to finalist
// 2 and 3 rank holder to semifinalist
// 1 or 2/3 play final match
//on the basis of the total points ******

// fetch the application setting file from the loaclStorage of our browser
let setting = localStorage.getItem("Setting");
setting = JSON.parse(setting);
// console.log(setting);

if (setting[0].tournamentRankingType.byPoints) {
  // Data is define in his sibling script "squad.js" file
  console.log(Data);

  // we get the tournament history json file from the local storage of our Browser
  let tournamentHistory = localStorage.getItem("tournamentHistory");
  tournamentHistory = JSON.parse(tournamentHistory);
  console.log(tournamentHistory);

  // we define the playerRank array which is merge in tournament History json file after the whole match is over
  const playerRank = [{ date: new Date().toISOString() }];
  console.log(playerRank[0]);

  // we targeting the finalPage btn in squad html page for adding clicking functionality for diffrent type of perpose
  const finalPageBtn = document.querySelector("#finalPageBtn");
  //we change the button text after completing every part of tournament like normal mathces and semi and final match.
  if (Data.remainingMatches >= 0) {
    finalPageBtn.innerHTML = "SemiFinalist";
  } else if (Data.remainingMatches == -1 || Data.remainingMatches == -2) {
    finalPageBtn.innerHTML = "Finalist";
  } else if (Data.remainingMatches == -3 || Data.remainingMatches == -4) {
    finalPageBtn.innerHTML = "Finish";
  }

  // On final page btn there is different type of functionality is set for different part of match format
  finalPageBtn.addEventListener("click", () => {
    // get semifinal players
    if (
      Data.remainingMatches == 0 &&
      finalPageBtn.innerHTML == "SemiFinalist"
    ) {
      // function start here

      // ensure the semifinalist will be selected
      Data.remainingMatches--;

      // set the semifinal match in matchSquad array
      Data.matchSquad.push({
        TeamName1: `${Data.playersPositionAccordingToPoints[1].name}`,
        TeamName2: `${Data.playersPositionAccordingToPoints[2].name}`,
        matchCategory: "semi-final",
        over: false,
        rematch: true,
      });

      // set semi-final match again in localStorage of our browser
      localStorage.setItem("tournament", JSON.stringify(Data));
      window.location.reload();

      // end the functionality

      // get the final players
    } else if (
      Data.remainingMatches == -2 &&
      finalPageBtn.innerHTML == "Finalist"
    ) {
      // ensure the finalist are selected
      Data.remainingMatches--;

      // set the final match in matchSquad array
      Data.matchSquad.push({
        TeamName1: `${Data.playersPositionAccordingToPoints[0].name}`,
        TeamName2: `${Data.matchSquad[Data.matchSquad.length - 1].winnerName}`,
        matchCategory: "final",
        over: false,
        rematch: true,
      });

      // set some match again in localStorage
      localStorage.setItem("tournament", JSON.stringify(Data));
      window.location.reload(); //reloading for the display the new matches

      // end of the funcionality

      // set the tournament history profile
    } else if (
      Data.remainingMatches == -4 &&
      finalPageBtn.innerHTML == "Finish"
    ) {
      // Disable the finished btn functionality after one time click
      Data.remainingMatches--;

      // set the player Rank array from playerPosition key in tournament file in local storage
      let rank1Id;
      let rank2Id;
      let rank3Id;
      let lastMatchIndex = Data.matchSquad.length;

      Data.membersProfile.map((item, index) => {
        //get points of 1st player
        if (item.name == Data.matchSquad[lastMatchIndex - 1].winnerName) {
          rank1Id = index;
        }

        // get points of 2nd player
        if (item.name == Data.matchSquad[lastMatchIndex - 1].looserName) {
          rank2Id = index;
        }

        // get points of 3rd player
        if (item.name == Data.matchSquad[lastMatchIndex - 2].looserName) {
          rank3Id = index;
        }
      });

      // set 1st position
      playerRank.push({
        name: Data.matchSquad[lastMatchIndex - 1].winnerName,
        rank: 0,
        points: Data.membersProfile[rank1Id].totalPoints,
        winMatches: Data.membersProfile[rank1Id].winMatches,
        loseMatches: Data.membersProfile[rank1Id].loseMatches,
      });

      // set 2nd position
      playerRank.push({
        name: Data.matchSquad[lastMatchIndex - 1].looserName,
        rank: 1,
        points: Data.membersProfile[rank2Id].totalPoints,
        winMatches: Data.membersProfile[rank2Id].winMatches,
        loseMatches: Data.membersProfile[rank2Id].loseMatches,
      });

      // set 3rd position
      playerRank.push({
        name: Data.matchSquad[lastMatchIndex - 2].looserName,
        rank: 2,
        points: Data.membersProfile[rank3Id].totalPoints,
        winMatches: Data.membersProfile[rank3Id].winMatches,
        loseMatches: Data.membersProfile[rank3Id].loseMatches,
      });

      // set upper than 2 index
      // due to re-assemble the points table after semi and finals
      Data.playersPositionAccordingToPoints.map((item, index) => {
        if (index > 2) {
          playerRank.push({
            name: item.name,
            rank: index,
            points: item.points,
            winMatches: item.winMatches,
            loseMatches: item.loseMatches,
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

      //disable the rematch btn before we go to next page
      // due to this we can preventing the effect like if any one go to tournament page after clicking the fineshed btn and go to the squad page and clicking the rematch btn and
      Data.tournamentOver = true;

      // set tournamentOver field in localStorage
      localStorage.setItem("tournament", JSON.stringify(Data));

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
} else {
  console.log("Ranking is decided by winning Matches");
}
