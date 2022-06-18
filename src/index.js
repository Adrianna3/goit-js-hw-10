import './css/styles.css';
import {fetchCountries} from './fetchCountries';



const _ = require('lodash');
import Notiflix from 'notiflix';


const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');



searchBox.addEventListener(
  'input',
  _.debounce(e => {
      fetchCountries(e.target.value.trim())
        .then(countries => renderUserCountry(countries))
        .catch(error => console.log(error));
  }, 300)
);

function renderUserCountry(countries) {
  const markup = countries
    .map(countries => {
      return `<li>
          <p><b>Name</b>: ${countries.name}</p>
          <p><b>Capital</b>: ${countries.capital}</p>
          <p><b>Population</b>: ${countries.population}</p>
          <p><b>Flags</b>: ${countries.flags.svg}</p>
          <p><b>Languages</b>: ${countries.languages}</p>
        </li>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}