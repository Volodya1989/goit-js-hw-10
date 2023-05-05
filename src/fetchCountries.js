const BASE_URL = `https://restcountries.com/v3.1/name/`;
import Notiflix from "notiflix";
Notiflix.Notify.init({
  timeout: 3000,
});

function fetchCountries(name, element) {
  fetch(`${BASE_URL}${name}?&fields=name,population,languages,capital,flags`)
    .then((r) => {
      if (r.status === 404) {
        element.innerHTML = "";
        Notiflix.Notify.failure("Sorry, we can't find country with such name.");

        return Promise.reject("Page Not Found 404 error");
      }
      return r.json();
    })
    .then((data) => {
      if (name.length === 0) {
        element.innerHTML = "";
        return;
      } else if (data.length > 10) {
        element.innerHTML = "";
        return Notiflix.Notify.info(
          "Too many matches found. Please enter a more specific name."
        );
      } else if (data.length === 1) {
        element.innerHTML = "";
        const markup = data
          .map(({ flags, name, capital, population, languages }) => {
            return `<li class="item"><img class="img-item" src=${
              flags.svg
            } alt="flag"  > <p class="country"><strong>${
              name.common
            }</strong></p></h4></li>
            <li class="item"><strong>Capital:</strong> ${capital}</li> <li class="item"><strong>Population:</strong> ${population}</li><li class="item"><strong>Languages:</strong> ${Object.values(
              languages
            )}</li>`;
          })
          .join("");

        return element.insertAdjacentHTML("afterbegin", markup);
      }
      element.innerHTML = "";

      const markup = data
        .map(({ flags, name }) => {
          return `<li class="item"><img class="img-item" src=${flags.svg} alt="flag"  > <p>${name.common}</p></h4></li>`;
        })
        .join("");
      element.insertAdjacentHTML("afterbegin", markup);
    })

    .catch((e) => console.log(e));
}

export default { fetchCountries };
