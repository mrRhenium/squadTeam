const saveBtn = document.querySelector(".saveBtn");
const totalTeam = document.querySelector("#totalTeam");
const addTeam = document.querySelector(".addBtn");
const teamName = document.querySelector("#playerName");

let total = 0;
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  total = totalTeam.value;
  if (total == 0) {
    //check the team is valid or not
    alert("Enter the total no. of team");
  } else {
    // disable the total team field after enter the value
    totalTeam.setAttribute("readonly", "true");
    console.log(total);
  }
  return total;
});

const squad = [];
// add player name in a array which is "squad Array"
addTeam.addEventListener("click", (e) => {
  e.preventDefault();
  if (squad.length < total) {
    squad[squad.length] = teamName.value;
  } else {
    alert("Player Name is fullfilled !! ");
  }
  // disable the add field after add all players
  if (squad.length == total) {
    teamName.setAttribute("readonly", "true");
  }
  teamName.value = null;
  console.log(squad);
});
