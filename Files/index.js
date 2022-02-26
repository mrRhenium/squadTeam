// first page of our application
// 1. make player/Team profile
// 2. set the players match according to the setting
// 3. storing the Data in our browser's local storage

//
// now we set the another json file here "setting" in our local storage of our chrome browser
// this file is fully work on the options selected by the user which is selected in the setting page in our application for the different game type sound like phone setting

// fetch the setting json file from the localStorage of borwser
let setting = localStorage.getItem("Setting");
setting = JSON.parse(setting);
// console.log(setting);

if (!setting) {
  let setting = [
    {
      changes: false,
      sound: true,
      tournamentRankingType: {
        byPoints: true,
        byWinningMatches: false,
      },
      deleteData: false,
    },
  ];
  // now save the setting file in our browser
  localStorage.setItem("Setting", JSON.stringify(setting));
}
console.log(setting);

//
//

//
//
// its fetch the tournamentHistory from the local storage of our browser
let history = localStorage.getItem("tournamentHistory");
history = JSON.parse(history);
// check the history json file present or not in local storage if present that return or if not present then it set the history json file in the local storage of our browser
if (!history) {
  history = [];
  console.log(history);
  localStorage.setItem("tournamentHistory", JSON.stringify(history));
}
// ends here

//
//
//1. function of our code of this page
//
// this saveBtn function set the total no. player/Team who are participating the touranment

// Namkaran goes here
// we target the save btn of total player field
const saveBtn = document.querySelector(".saveBtn");
// we target the input field of total player/Team
const totalTeam = document.querySelector("#totalTeam");
// we target the header part of total player/Team
const totalPlayer = document.querySelector("#totalPlayer");

// next function start here
let total = 0;
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  total = totalTeam.value;

  //check the total no. of player/Team is greater than 3 or not
  if (total < 3) {
    alert("Enter the total no. of team greater than 3");
  } else {
    // display the total no. player/Team is choosen by the user on header of that input box , it is only  for the best UI/ UX of our application
    totalPlayer.innerHTML = `Total No. of Players is ${total}`;

    // disable the total player/team field after enter the value so no one can the it later
    totalTeam.style.backgroundColor = " rgba(0, 0, 0, 0.3)";
    totalTeam.setAttribute("readonly", "true");
    console.log(total);
  }
  return total;
});
// previous function ends here

//
//
//2. function of our code
//
// this function set total no. of Points decided by the user for whole tournament.

// Namkaran goes here
// we targeting the btn of game point field
const gamePointBtn = document.querySelector(".gamePointBtn");
// we targeting the game point input field for receiving upcomping info from the user
const points = document.querySelector("#points");
// we target the game point header part
const gamePoint = document.querySelector("#gamePoint");

// next function starts here
gamePointBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //check the Game points is greater than 3 or not
  if (points.value < 3) {
    alert("Enter the Game Points greater than 3");
  } else {
    // for display the game point in header part for best UI/UX
    gamePoint.innerHTML = `Game Point is ${points.value}`;
    // disable the game point field after enter the value
    points.style.backgroundColor = " rgba(0, 0, 0, 0.3)";
    points.setAttribute("readonly", "true");
  }
});
// previous funtion ends here

//
//
//3. function of our code
//
// this function add the player/Team name by the user through the teamName field and add the name in the "Squad" array for our upcoming functionality

//NamKaran goes here
// we target the add team field btn for save the name of player
const addTeam = document.querySelector(".addBtn");
// we target the player/Team name field for recieving the value from the player
const teamName = document.querySelector("#playerName");
// we target the player/Team field header
const addPlayer = document.querySelector("#addPlayer");

// function starts here
const squad = [];
addTeam.addEventListener("click", (e) => {
  e.preventDefault();
  // short the name to 8 letters due to preventing UI mash up and for best UI/UX

  // if (teamName.value.length > 8) {
  //   var shortName = teamName.value;
  //   teamName.value = shortName.toString().substring(0, 8);
  //   teamName.value += ".";
  //   console.log(teamName.value + "..");
  // }

  if (teamName.value != "" && total != 0) {
    // check the current entered name is unique or not
    let validName = true;
    squad.filter((item) => {
      if (item.name == teamName.value) {
        alert(
          `${teamName.value} is already taken \n Please!! Enter unique Name`
        );
        validName = false;
      }
    });

    // store the player/Team name in form of profile for and that profile send for next funnction and store in local storage
    if (squad.length < total && validName) {
      squad[squad.length] = {
        name: teamName.value,
        totalPoints: 0,
        winMatches: 0,
        loseMatches: 0,
      };

      // display in header part for ensuring that how much player have added in array for tournament
      addPlayer.innerHTML = `Added Player (${squad.length})`;
    }

    // disable the add field after add all players added for the tournament
    // teamName.value = "Fullfilled";
    if (squad.length == total) {
      teamName.style.backgroundColor = " rgba(0, 0, 0, 0.3)";
      teamName.setAttribute("readonly", "true");
    }

    // empty the player/Team field after the btn is clicked
    teamName.value = null;
    console.log(squad);
  } else if (total == 0) {
    // alert goes here for awaring the user that he didn't complete the upper field
    alert("After fill the required fields");
  } else if (total == squad.length) {
    // awaring the user that he/she add the player accoding to the total no. of player decided by the user
    alert("Player Name is fullfilled !! ");
  }
});
// previous function ends here

//
//
// 4.function start here of our code
//
// this function is fully depend upon the important part of our code , after clicking the Next btn
// 1.it will make the player Match array which is mention here "SuadMatch Array"

// Namkaran start here
const nextBtn = document.querySelector(".nextBtn");
nextBtn.addEventListener("click", (e) => {
  // e.preventDefault();

  // for awaring the user that complete the all previous field
  if (total != 0 && squad.length == total && points.value != 0) {
    // squad making process-start

    // // Set the player profile as a object
    // const playerProfile = [];
    // squad.map((item, index) => {
    //   playerProfile[index] = {
    //     id: index,
    //     name: item,
    //   };
    // });
    // console.log(playerProfile);
    // console.log(squad);

    //  this algorithm is set the palyers normal match with each other accoding to the setting value in our code
    let matchSquad = [];
    for (var i = 0; i < squad.length; i++) {
      for (var j = i + 1; j < squad.length; j++) {
        matchSquad[matchSquad.length] = {
          TeamName1: `${squad[i].name}`,
          TeamName2: `${squad[j].name}`,
          matchCategory: "normal",
          over: false,
          rematch: true,
        };
      }
    }
    console.log(matchSquad);

    // this algorithm is set the players match in a random order and storing in the array shuffleMatchSquad
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
    data.membersProfile = squad;
    data.matchSquad = shuffleMatchSquad;
    data.gamePoints = points.value;
    data.playersPositionAccordingToPoints = [];
    data.playersPositionAccordingToWinMatches = [];
    data.tournamentOver = false;
    data.remainingMatches = shuffleMatchSquad.length;

    // set the whole data of our appplication in local storage of user's browser with the name of "tournament"
    localStorage.setItem("tournament", JSON.stringify(data));

    // after doing all functionality we redirect to next page which is called "Squad.html" page for next procesure of our tournaments
    setTimeout(() => {
      window.location.href = "Files/squad.html";
    }, 1000);
    // nextBtn.setAttribute("href", "Files/squad.html");
    //
    //
  } else {
    // for awaring the user that entered the previous fields beforre click the Next button
    alert("Please !! Take the required Procesure");
  }
});
// ends here

// end of the script
