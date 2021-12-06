// Get the json file from the local storage
let tournamentList = localStorage.getItem("tournamentHistory");
tournamentList = JSON.parse(tournamentList);
console.log(tournamentList);

// fetch the tournament Record form the loacal storage to display in page

// set the no of list which is listed in local storage
const tournamentProfileBody = document.querySelector(".tournamentProfileBody");
tournamentList.map((item) => {
  tournamentProfileBody.innerHTML += `<div class="tournamentProfileList"><span class="tntProfItems" style="width: 90%; padding: 0.1rem">
 <a style="transform: translateX(0rem); margin: 0 0"
 >${item[0].date.substr(0, 10)}</a
 ></span
 ></div>`;
});

// set profile of player which is played on the day which is mentioned
const tournamentProfileList = document.querySelectorAll(
  ".tournamentProfileList"
);
for (var i = 0; i < tournamentList.length; i++) {
  tournamentList[i].map((item, index) => {
    if (index > 0) {
      tournamentProfileList[
        i
      ].innerHTML += `<span class="tntProfItems itemFlexbox">
   <a id="rankItems">${item.rank + 1}.</a>
   <a>${item.name}</a>
   <a>Points : ${item.points}</a> </span
 >`;
    }
  });
}
