let Data = localStorage.getItem("tournament");
Data = JSON.parse(Data);
console.log(Data);

let matchSquad = Data.matchSquad;
// create multiple Match Boxes with team name
const matchContent = document.querySelector(".matchContent");
matchSquad.map((item, index) => {
  let records = `<div class="matchBoxes">
  <div class="matchBoxesHeading">
    <div class="sr"><a>${index + 1}</a></div>
    <div class="matchTeamName">
      <a>${item.TeamName1} Vs ${item.TeamName2}</a>
    </div>
  </div>
  <div class="matchBoxesBody">
    <!-- when match is over -->
    <div class="winningEmoji"></div>
    <div class="matchStartBtn">
      <button class="matchBtn">Start</button>
    </div>
  </div>
</div>`;
  matchContent.insertAdjacentHTML("beforeend", records);
});

// match starts Algorithms
const startBtn = document.querySelectorAll(".matchBtn");
const matchUI = document.querySelector(".matchContent");
const matchStartUI = document.querySelector(".matchContentPart2");

for (var i = 0; i < matchSquad.length; i++) {
  startBtn[i].addEventListener("click", (e) => {
    e.preventDefault();
    matchUI.classList.toggle("matchUI");
    matchStartUI.classList.toggle("matchStartUI");
  });
}
