import "./css/styles.css";
import debounce from "lodash.debounce";
import API from "./fetchCountries.js";
import Notiflix from "notiflix";
Notiflix.Notify.init({
  timeout: 3000,
});

("use strict");
const DEBOUNCE_DELAY = 300;
let nameOfTheSearchedCountry = null;

const inputEl = document.querySelector("input#search-box");
const listOfCountries = document.querySelector("ul.country-list");

function clearList() {
  listOfCountries.innerHTML = "";
}

function markupForOneCountry(data) {
  return data
    .map(({ flags, name, capital, population, languages }) => {
      return `<li class="item"><img class="img-item" src=${
        flags.svg
      } alt="flag"  > <p class="country"><strong>${
        name.common
      }</strong></p></h4></li>
            <li class="item"><strong>Capital:</strong> ${capital}</li> <li class="item"><strong>Population:</strong> ${population}</li><li class="item"><strong>Languages:</strong> ${Object.values(
        languages
      ).join(", ")}</li>`;
    })
    .join("");
}

function markupOfListOfCountries(data) {
  const markup = data
    .map(({ flags, name }) => {
      return `<li class="item"><img class="img-item" src=${flags.svg} alt="flag"  > <p>${name.common}</p></h4></li>`;
    })
    .join("");
  listOfCountries.insertAdjacentHTML("afterbegin", markup);
}

function onInfoNotification() {
  return Notiflix.Notify.info(
    "Too many matches found. Please enter a more specific name."
  );
}
function onInput(e) {
  nameOfTheSearchedCountry = e.target.value.trim();

  API.fetchCountries(nameOfTheSearchedCountry, listOfCountries)
    .then((data) => {
      if (nameOfTheSearchedCountry.length === 0) {
        clearList();
        return;
      } else if (data.length > 10) {
        clearList();
        return onInfoNotification();
      } else if (data.length === 1) {
        clearList();
        markupForOneCountry(data, listOfCountries);

        return listOfCountries.insertAdjacentHTML(
          "afterbegin",
          markupForOneCountry(data)
        );
      }
      clearList();
      markupOfListOfCountries(data);
    })
    .catch((e) => console.log(e));
}

inputEl.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));
