const BASE_URL = `https://restcountries.com/v3.1/name/`;

import Notiflix from "notiflix";
Notiflix.Notify.init({
  timeout: 3000,
});

function fetchCountries(countryName, element) {
  return fetch(
    `${BASE_URL}${countryName}?&fields=name,population,languages,capital,flags`
  ).then((r) => {
    if (!r.ok) {
      element.innerHTML = "";
      Notiflix.Notify.failure("Sorry, we can't find country with such name.");
      throw new Error(r.status);
    }
    return r.json();
  });
}

export default { fetchCountries };
