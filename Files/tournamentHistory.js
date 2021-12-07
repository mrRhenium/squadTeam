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
 >${item[0].date.substr(0, 10)}</a></span>
 </div>`;
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
   <a>Points : ${item.points}</a> </span>`;
    }
  });
}

// adding speaking btn in all profile list for assitant
for (var i = 0; i < tournamentProfileList.length; i++) {
  let speakbox = `<span
  class="tntProfItems"
  style="min-height: 45px; width: 30%"
  id="speakingBtn"
  ><a style="margin: 0; transform: translateX(0)">Speak</a>
  </span>`;

  tournamentProfileList[i].insertAdjacentHTML("beforeend", speakbox);
}
// ends here

// speaking functionality define here
const startSpeakProfile = (sentence) => {
  const speech = new SpeechSynthesisUtterance();
  speech.lang = "hi-GB";
  speech.text = sentence;
  speech.volume = 1; //0-1
  speech.rate = 0.8; //0.1-10
  speech.pitch = 1; //0-2
  console.log("started speaking");
  speechSynthesis.speak(speech);
};

// speakign functionality goes ends here

// Speaking funcitonality in tournament profile matches history
const speakingBtn = document.querySelectorAll("#speakingBtn");
// assitant scirpt which she speaks to us
let scriptOfAssitant = "";
for (let i = 0; i < tournamentList.length; i++) {
  // which were we selected
  let speakId = 0;

  // we clicked the speak btn in profile selection
  speakingBtn[i].addEventListener("click", () => {
    speakId = i;
    console.log("this one " + speakId);

    scriptOfAssitant += `In the match which took place on ${tournamentList[
      speakId
    ][0].date.substr(0, 10)}
    ,the winner is ${tournamentList[speakId][1].name}`;

    tournamentList[speakId].map((item, index) => {
      let pos = "";
      if (index == 2) pos = "nd";
      else if (index == 3) pos = "rd";
      else pos = "th";

      if (index > 1) {
        return (scriptOfAssitant += ` and ${item.rank + 1}${pos} position got ${
          item.name
        }`);
      }
    });

    scriptOfAssitant += ` soooo  at the laaaast whoo is the hero and winner of our tournament  ${tournamentList[speakId][1].name} congratulationss`;

    // call the function for speaking the selected the profile
    startSpeakProfile(scriptOfAssitant);
    console.log(scriptOfAssitant);

    // again define to null
    scriptOfAssitant = "";
  });
}
