let Data = localStorage.getItem("tournament");
Data = JSON.parse(Data);
console.log(Data);

let matchSquad = Data.matchSquad;
// create multiple Match Boxes with team name
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

const matchStartBtn = document.querySelectorAll(".matchStartBtn");
const matchTeamName = document.querySelectorAll(".matchTeamName");
const startBtn = document.querySelectorAll(".matchBtn");
// show results of finished matches
for (var i = 0; i < matchSquad.length; i++) {
  if (matchSquad[i].over) {
    matchTeamName[
      i
    ].innerHTML = `<a>${matchSquad[i].TeamName1}-(${matchSquad[i].pointsA}) Vs ${matchSquad[i].TeamName2}-(${matchSquad[i].pointsB})</a>`;
    matchStartBtn[
      i
    ].innerHTML = `<i class="fa fa-trophy" aria-hidden="true"></i> <a id="matchResult">${matchSquad[i].winnerName} is won by ${matchSquad[i].margin} Points</a>`;
  } else if (!matchSquad[i].over) {
    startBtn[i].onclick = () => {
      startBtn[i].setAttribute("href", "currentMatch.html");
    };
    break;
  }
}

const finalPageBtn = document.querySelector("#finalPageBtn");
let matchOver = 0;
finalPageBtn.addEventListener("click", () => {
  if (matchOver < matchSquad.length) {
    alert("Please!! Complete all the remaining matchs");
  }
});
