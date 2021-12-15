// fetch the feedback josn file from the localStorage if that file is not exit then it make the feedback file
let feedback = localStorage.getItem("Feedback");
feedback = JSON.parse(feedback);
console.log(feedback);

if (!feedback) {
  let feedback = [
    {
      star: null,
      thumb: null,
    },
  ];
  localStorage.setItem("Feedback", JSON.stringify(feedback));
} else {
  //
  const likeInput = document.querySelector("#likeIcon");
  const dislikeInput = document.querySelector("#dislikeIcon");
  if (feedback[0].thumb == "like") {
    likeInput.setAttribute("checked", "");
  } else if (feedback[0].thumb == "dislike") {
    dislikeInput.setAttribute("checked", "");
  }
  //
}

//start here
const settingContent = document.querySelector(".settingContent");
const feedbackSection = document.querySelector(".feedbackSection");
const feebackBtnFooter = document.querySelector("#feedbackBtnFooter");
const settingBtnFooter = document.querySelector("#settingBtnFooter");

// open the feedback section with animations
feebackBtnFooter.addEventListener("click", () => {
  feedbackSection.classList.add("feedbackSectionActive");
  settingContent.classList.add("settingContentActive");
});

settingBtnFooter.addEventListener("click", () => {
  feedbackSection.classList.remove("feedbackSectionActive");
  settingContent.classList.remove("settingContentActive");
});
//

//
const feedStarCover = document.querySelector(".feedStarCover");
for (var i = 0; i < 5; i++) {
  feedStarCover.innerHTML += `
  <input type="radio" name="star" class="star" id="star${i}"/>
  <label for="star${i}" class="fa fa-star" aria-hidden="true">
  </label>`;
}
// end here

// start here
const star = document.querySelectorAll(".star");
star.forEach((item, index) => {
  item.onclick = () => {
    feedback[0].star = star.length - index;
    console.log(feedback[0].star);
  };
  // set the value according to the localStorage
  star[star.length - feedback[0].star].setAttribute("checked", "");
});
// end here

const likeBtn = document.querySelector("#likeBtn");
const dislikeBtn = document.querySelector("#dislikeBtn");
likeBtn.onclick = () => {
  feedback[0].thumb = "like";
  console.log(feedback[0].thumb);
};
dislikeBtn.onclick = () => {
  feedback[0].thumb = "dislike";
  console.log(feedback[0].thumb);
};
// ends here

// starts here
const url =
  "https://tournamentorganiserfeedback-default-rtdb.firebaseio.com/feedbackData.json";
const feedName = document.querySelector("#feedName");
const feedMsg = document.querySelector("#feedMsg");
const postBtn = document.querySelector("#postBtn");

postBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (feedName.value == "" || feedMsg.value == "") {
    alert("Please!! \n Enter the required fields");
  } else {
    // post the data to the server
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

  if (!feedback[0].thumb || !feedback[0].star) {
    alert(
      "Please!! \n Gives us the star and like on behalf of Your Experience"
    );
  }
  //

  //
});
// ends here
