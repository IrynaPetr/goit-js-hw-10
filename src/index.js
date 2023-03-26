import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js-fetchCountries/fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchCountryBoxRef = document.querySelector('input#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');


searchCountryBoxRef.addEventListener('input', debounce(onSearchCountryBoxRef, DEBOUNCE_DELAY));

function onSearchCountryBoxRef() {
const name = searchCountryBoxRef.value.trim();
if (name === '') {
   countryListRef.innerHTML = ''; 
   countryInfoRef.innerHTML = '';
  return
}


fetchCountries(name)
.then(countries => {
  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
  if (countries.length === 1) {
    countryListRef.insertAdjacentHTML('beforeend', renderCountryList(countries));
    countryInfoRef.insertAdjacentHTML('beforeend',renderCountryInfo(countries));
  } else if (countries.length >= 10) {
    alertRefineSearch();
  } else {
    countryListRef.insertAdjacentHTML('beforeend', renderCountryList(countries));
  }
})
.catch(alertWrongName);
}
function renderCountryList(countries) {
  if(!Array.isArray(countries)) {
    countries = [countries];
  }
  const markupCountriesCard = countries.map(({ name, flags }) => {
  return `<li class="country-list-item">
            <img class="country-list-flag" src="${flags.svg}" alt="Flags of ${name.official}" width=120px height=70px>
            <h2 class="country-list-name">${name.official}</h2>
          </li>`;
}).join('');
return markupCountriesCard;
}
function renderCountryInfo(countries) {
  if(!Array.isArray(countries)) {
    countries = [countries];
  }
  const markupCountriesCard = countries.map(({ capital, population,languages }) => {
    return `<ul class="country-info-list">
            <li class="country-info-item">
                 <p class="country-text"><b>Capital:</b> ${capital}</p>
                 </li>
             <li class="country-info-item">
                 <p class="country-text"><b>Population:</b> ${population}</p>
                 </li>
             <li class="country-info-item">
                 <p class="country-text"><b>Languages:</b> ${Object.values(languages).join(', ')}</p>
                 </li>
           </ul>`;
  }).join('');
  return markupCountriesCard;
}

function alertWrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function alertRefineSearch() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
};