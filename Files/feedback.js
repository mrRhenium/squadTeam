const settingContent = document.querySelector(".settingContent");
const feedbackSection = document.querySelector(".feedbackSection");
const feebackBtnFooter = document.querySelector("#feedbackBtnFooter");
const settingBtnFooter = document.querySelector("#settingBtnFooter");

feebackBtnFooter.addEventListener("click", () => {
  feedbackSection.classList.add("feedbackSectionActive");
  settingContent.classList.add("settingContentActive");
});

settingBtnFooter.addEventListener("click", () => {
  feedbackSection.classList.remove("feedbackSectionActive");
  settingContent.classList.remove("settingContentActive");
});
