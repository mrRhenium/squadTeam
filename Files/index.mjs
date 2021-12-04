const saveBtn = document.querySelector(".saveBtn");
const totalTeam = document.querySelector("#totalTeam");
const gamePointBtn = document.querySelector(".gamePointBtn");
const points = document.querySelector("#points");
const gamePoint = document.querySelector("#gamePoint");
const addTeam = document.querySelector(".addBtn");
const teamName = document.querySelector("#playerName");
const nextBtn = document.querySelector(".nextBtn");
const addPlayer = document.querySelector("#addPlayer");
const totalPlayer = document.querySelector("#totalPlayer");

let total = 0;
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  total = totalTeam.value;
  if (total < 3) {
    //check the team is valid or not
    alert("Enter the total no. of team greater than 3");
  } else {
    // disable the total team field after enter the value
    totalPlayer.innerHTML = `Total No. of Players is ${total}`;
    totalTeam.setAttribute("readonly", "true");
    console.log(total);
  }
  return total;
});

gamePointBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (points.value < 3) {
    //check the team is valid or not
    alert("Enter the Game Points greater than 3");
  } else {
    // disable the total team field after enter the value
    gamePoint.innerHTML = `Game Point is ${points.value}`;
    points.setAttribute("readonly", "true");
  }
});

const squad = [];
// add player name in a array which is "squad Array"
addTeam.addEventListener("click", (e) => {
  e.preventDefault();
  if (teamName.value != "" && total != 0) {
    if (squad.length < total) {
      squad[squad.length] = teamName.value;
      addPlayer.innerHTML = `Add Player (${squad.length})`;
    }
    // disable the add field after add all players
    if (squad.length == total) {
      teamName.setAttribute("readonly", "true");
    }
    teamName.value = null;
    console.log(squad);
  } else if (total == squad.length) {
    alert("Player Name is fullfilled !! ");
  } else {
    alert("After fill the required fields");
  }
});

// Go to the next page of our application
nextBtn.addEventListener("click", (e) => {
  // e.preventDefault();
  if (total != 0 && squad.length == total) {
    // squad making process-start

    // Set the player profile as a object
    const playerProfile = [];
    squad.map((item, index) => {
      playerProfile[index] = {
        id: index,
        name: item,
      };
    });
    console.log(playerProfile);

    // document.onclick = () => {
    // };

    // making match squad
    console.log(squad);
    // match making algorithms
    let matchSquad = [];
    for (var i = 0; i < squad.length; i++) {
      for (var j = i + 1; j < squad.length; j++) {
        // matchSquad.push(squadData.squad[i] + "-" + squadData.squad[j]);
        matchSquad[matchSquad.length] = {
          TeamName1: `${squad[i]}`,
          TeamName2: `${squad[j]}`,
        };
      }
    }
    console.log(matchSquad);

    // Shuffle the match Algorithm
    let shuffleMatchSquad = [];
    let limit = matchSquad.length;
    for (var i = 0; i < limit; i++) {
      var randon_index = Math.floor(Math.random() * matchSquad.length);
      shuffleMatchSquad.push(matchSquad[randon_index]);
      matchSquad.splice(randon_index, 1);
    }
    console.log(shuffleMatchSquad);

    // squad making proces-over

    // save to the local Storage
    const data = new Object();
    data.id = 0;
    data.membersName = squad;
    data.matchSquad = shuffleMatchSquad;
    data.gamePoints = points.value;
    data.finalSquad = [];
    for (let i = 0; i < shuffleMatchSquad.length; i++) {
      data.matchSquad[i].over = false;
    }
    localStorage.setItem("tournament", JSON.stringify(data));

    // set the attributes
    nextBtn.setAttribute("href", "Files/squad.html");
  } else {
    alert("Please !! Take the required Procesure");
  }
});
