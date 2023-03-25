import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js-fetchCountries/fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchCountryBoxRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');


const handleCountriesFormSubmit = event => {
  event.preventDefault();
  console.dir(event.target.elements);
}
searchCountryBoxRef.addEventListener('input', debounce(onSearchCountryBoxRef, DEBOUNCE_DELAY));

function onSearchCountryBoxRef() {

};