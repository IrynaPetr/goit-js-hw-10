const BASE_URL = 'https://restcountries.com/v3.1/name/';
const countriesInfo = 'field=name,capital,population,flags,languages';

export function fetchCountries(name) 
{
  fetch(`${BASE_URL}${name}?${countriesInfo}`).then((res) => {
    if (!res.ok) {
      throw new Error(response.status);
    }
    return res.json();
  })
};


