import "./css/styles.css";

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("input#search-box");

inputEl.addEventListener("input", (e) => {
  console.log(e);
});
