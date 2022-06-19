import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const _ = require('lodash');
import Notiflix from 'notiflix';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener(
  'input',
  _.debounce(e => {
    fetchCountries(e.target.value.trim())
      .then(countries => renderCountryOne(countries))
      .catch(error => {
        if (e.target.value.trim() !== '') {
          console.log(error)
          Notiflix.Notify.failure('Oops, there is no country with that name');
          clearElements(countryList, countryInfo);
          return
        }
      })
  }, 300)
);

function renderCountryOne(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  } else if (countries.length > 1 && countries.length < 10) {
    const markup = countries
      .map(({ name, flags }) => {
        return `<div class = name>
      <img class="flag" src="${flags.svg}" alt="Flag of ${name.official}">
      <p> ${name.official}</p> </div> `;
      })
      .join('');
    countryList.innerHTML = markup;
    clear();
  } else if (countries.length === 1) {
    const markup = countries
      .map(({ name, flags, capital, population, languages }) => {
        return `<div class = name>
      <img class="flag" src="${flags.svg}" alt="Flag of ${name.official}">
      <h1> ${name.official}</h1> </div>

          <p><b>Capital</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          
           <p><b>Languages</b>: ${Object.values(languages).join(',')}</p>
        </li>`;
      })
      .join('');
    countryInfo.innerHTML = markup;
    countryList.innerHTML = '';
  }
}
