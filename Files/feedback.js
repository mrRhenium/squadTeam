// this file is fully depend upon the feedback functionality of our applicaions
// we are taking the first Ux from the user for more improvment in our application
//

//
// fetch the feedback josn file from the localStorage if that file is not exit then it make the feedback file
let feedback = localStorage.getItem("Feedback");
feedback = JSON.parse(feedback);
console.log(feedback);
//

//
// to save the feedback file in localStorage if it is not exit
if (!feedback) {
  let feedback = [
    {
      star: null,
      thumb: null,
    },
  ];
  localStorage.setItem("Feedback", JSON.stringify(feedback));
} else {
  // if it is exit then show the recent record on the UI
  const likeInput = document.querySelector("#likeIcon");
  const dislikeInput = document.querySelector("#dislikeIcon");
  if (feedback[0].thumb == "like") {
    likeInput.setAttribute("checked", "");
  } else if (feedback[0].thumb == "dislike") {
    dislikeInput.setAttribute("checked", "");
  }
  //
}
// ends here
//

// Namkaran start here
// we are targeting the footer's icon in our feedback page
const settingContent = document.querySelector(".settingContent");
const feedbackSection = document.querySelector(".feedbackSection");
const feebackBtnFooter = document.querySelector("#feedbackBtnFooter");
const settingBtnFooter = document.querySelector("#settingBtnFooter");
//

//
// open the feedback section with animations of better UI/UX
feebackBtnFooter.addEventListener("click", () => {
  feedbackSection.classList.add("feedbackSectionActive");
  settingContent.classList.add("settingContentActive");
});
settingBtnFooter.addEventListener("click", () => {
  feedbackSection.classList.remove("feedbackSectionActive");
  settingContent.classList.remove("settingContentActive");
});
//ends here
//

//
// storing the 5 star icon in feedstarCover div
const feedStarCover = document.querySelector(".feedStarCover");
for (var i = 0; i < 5; i++) {
  feedStarCover.innerHTML += `
  <input type="radio" name="star" class="star" id="star${i}"/>
  <label for="star${i}" class="fa fa-star" aria-hidden="true">
  </label>`;
}
// end here
//

//
// rating functionality defines here
// we set the rating according to click of the user on star icon
const star = document.querySelectorAll(".star");
star.forEach((item, index) => {
  item.onclick = () => {
    feedback[0].star = star.length - index;
    console.log(feedback[0].star);
  };
  // set the value according to the localStorage
  if (feedback[0].star != null) {
    star[star.length - feedback[0].star].setAttribute("checked", "");
  }
});
// end here
//

//
// we targeting the like and dislike btn
const likeBtn = document.querySelector("#likeBtn");
const dislikeBtn = document.querySelector("#dislikeBtn");
//

// set the functionality of liking and disliking
likeBtn.onclick = () => {
  feedback[0].thumb = "like";
  console.log(feedback[0].thumb);
};
dislikeBtn.onclick = () => {
  feedback[0].thumb = "dislike";
  console.log(feedback[0].thumb);
};
// ends here
//

//
// Namkaran starts here
// we targeting the input and post btn of the feedback section
const feedName = document.querySelector("#feedName");
const feedMsg = document.querySelector("#feedMsg");
const postBtn = document.querySelector("#postBtn");
//

//
//
//we connet our application to the firebase for storing the feedback of the users
//

// define the url of the firebase application for achievign the fetching functionality
const url =
  "https://tournamentorganiserfeedback-default-rtdb.firebaseio.com/feedbackData.json";

// defining the post functionlity in which fetching posting also define in it
postBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  // we appliying if else for validations
  if (!feedback[0].thumb || !feedback[0].star) {
    alert(
      "Please!! \n Gives us the star and like on behalf of Your Experience"
    );
  } else if (feedName.value == "" || feedMsg.value == "") {
    alert("Please!! \n Enter the required fields");
  } else {
    // post the data to the server by using fetch functionality
    try {
      const feedbackData = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: feedName.value,
          message: feedMsg.value,
          star: feedback[0].star,
          impression: feedback[0].thumb,
        }),
      });

      // after submiting the feedback successfully we show the thanks message to the users
      if (feedbackData) {
        alert("Thanks for your Feedback 😍");
        feedName.value = "";
        feedMsg.value = "";
      }
      //

      // set the feedback data in you localstorage
      localStorage.setItem("Feedback", JSON.stringify(feedback));
      //
      //
    } catch (error) {
      console.log(error);
    }
  }
  //
  //
});
// ends here

// end of the script
