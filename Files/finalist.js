let tournamentHistory = localStorage.getItem("tournamentHistory");
tournamentHistory = JSON.parse(tournamentHistory);
console.log(tournamentHistory);

const playerRank = [{ date: new Date().toISOString() }];
console.log(playerRank[0]);

const finalPageBtn = document.querySelector("#finalPageBtn");
console.log(Data);

if (Data.remainingMatches >= 0) {
  finalPageBtn.innerHTML = "SemiFinalist";
} else if (Data.remainingMatches == -1) {
  finalPageBtn.innerHTML = "Finalist";
} else if (Data.remainingMatches == -2) {
  finalPageBtn.innerHTML = "Finish";
}

let semifinalistArray = [];
let finalistArray = [];
// category making algorithmic function
const categoryDecided = (ctg) => {
  let maxPoints = -Infinity;
  let id;
  Data.membersProfile.map((item, index) => {
    if (maxPoints < item.totalPoints && item.category == "average") {
      maxPoints = item.totalPoints;
      id = index;
    }
    return id;
  });
  if (ctg == "semifinalist") {
    semifinalistArray.push(Data.membersProfile[id].name);
  }
  return (Data.membersProfile[id].category = ctg);
};

let matchOver = false;
// FINAL PAGE FUDNTION
finalPageBtn.addEventListener("click", () => {
  if (Data.remainingMatches <= 0) {
    matchOver = true;
  }
  if (!matchOver) {
    alert("Please!! Complete all the remaining matchs");
  } else if (Data.remainingMatches == 0) {
    categoryDecided("finalist");
    categoryDecided("semifinalist");
    categoryDecided("semifinalist");
    console.log(finalistArray);
    console.log(semifinalistArray);

    // again fill the matchSquad Array
    Data.matchSquad.push({
      TeamName1: `${semifinalistArray[0]}`,
      TeamName2: `${semifinalistArray[1]}`,
      matchCategory: "Semi-final",
    });

    // set some match agian in localStorage
    localStorage.setItem("tournament", JSON.stringify(Data));

    location.reload();
    //
  } else if (Data.remainingMatches == -1) {
    // find out the finalist
    Data.membersProfile.filter((item) => {
      if (item.category == "finalist") {
        finalistArray.push(item.name);
      }
    });
    Data.matchSquad.filter((item) => {
      if (item.matchCategory == "Semi-final") {
        finalistArray.push(item.winnerName);
      }
    });
    Data.matchSquad.push({
      TeamName1: `${finalistArray[0]}`,
      TeamName2: `${finalistArray[1]}`,
      matchCategory: "Final",
    });

    // set some match agian in localStorage
    localStorage.setItem("tournament", JSON.stringify(Data));

    // refresh the web
    location.reload();
  } else if (Data.remainingMatches == -2) {
    // Calculate the ranking of the players

    Data.playersPosition.map((item, index) => {
      playerRank.push({
        name: item.name,
        rank: index,
        points: item.points,
      });
    });

    tournamentHistory.push(playerRank);
    console.log(tournamentHistory);
    //set the player rank in localStorage
    localStorage.setItem(
      "tournamentHistory",
      JSON.stringify(tournamentHistory)
    );

    // Show some message in alert box
    alert("Tournament is over ");
  }
});
