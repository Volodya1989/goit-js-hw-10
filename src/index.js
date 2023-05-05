import "./css/styles.css";
import debounce from "lodash.debounce";
import API from "./fetchCountries.js";

("use strict");
const DEBOUNCE_DELAY = 300;
let nameOfTheSearchedCountry = null;
const inputEl = document.querySelector("input#search-box");
const listOfCountries = document.querySelector("ul.country-list");

function onInput(e) {
  nameOfTheSearchedCountry = e.target.value.trim();

  API.fetchCountries(nameOfTheSearchedCountry, listOfCountries);
}

inputEl.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));
