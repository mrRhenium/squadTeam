// fetch the setting json file from the localStorage of borwser
let setting = localStorage.getItem("Setting");
setting = JSON.parse(setting);
console.log(setting);
//
const pointTypeInput = document.querySelector("#pointTypeInput");
const matchTypeInput = document.querySelector("#matchTypeInput");

// set the input radio field according the the setting file in the local Storage
if (setting[0].tournamentRankingType.byPoints) {
  pointTypeInput.click();
  console.log("By points");
} else {
  matchTypeInput.click();
  console.log("By won Matches");
}
//

//change the field type
pointTypeInput.onclick = () => {
  setting[0].changes = !setting[0].changes;
  console.log("by Points");
  setting[0].tournamentRankingType.byWinningMatches = false;
  setting[0].tournamentRankingType.byPoints = true;
};
matchTypeInput.onclick = () => {
  setting[0].changes = !setting[0].changes;
  console.log("by won matches");
  setting[0].tournamentRankingType.byPoints = false;
  setting[0].tournamentRankingType.byWinningMatches = true;
};
//
//delete data button
const deleteYes = document.querySelector("#deleteYes");
const deleteNo = document.querySelector("#deleteNo");
deleteYes.onclick = () => {
  if (
    confirm(
      "Are you Sure \n All the Data including Tounament profile will be Deleted from your Account"
    )
  ) {
    setting[0].changes = !setting[0].changes;
    setting[0].deleteData = true;
    console.log("Yes delete the Data");
  } else {
    deleteNo.click();
    console.log("Ok not Deleted");
  }
};
deleteNo.onclick = () => {
  setting[0].changes = !setting[0].changes;
  setting[0].deleteData = false;
  console.log("Yes delete the Data");
};
//
const saveBtn = document.querySelector("#saveBtn");
const discardBtn = document.querySelector("#discardBtn");
// we redirect the home page without saving anything
discardBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});
// we could save the changes in localStorage
saveBtn.addEventListener("click", () => {
  if (setting[0].changes) {
    if (
      confirm(
        "You Like the chages \n All the data and match record will be Parmanently deleted"
      )
    ) {
      //
      setting[0].changes = false;
      // set the whole data of our appplication in local storage of user's browser with the name of "setting"
      localStorage.setItem("Setting", JSON.stringify(setting));

      // delete the tournament history file
      if (setting[0].deleteData) {
        localStorage.removeItem("tournamentHistory");
      }
      // delete all the current Matches
      localStorage.removeItem("tournament");

      // delete all the current Matches
      localStorage.removeItem("Feedback");

      // alert the user that file is changed
      alert("Changes are Successfully Implemented");

      window.location.reload();
    } else {
      alert("Ok we are Not making any Changes");
      window.location.reload();
    }
  } else {
    alert("Please!! Make some changes \n Then Click Save Button");
  }
});
