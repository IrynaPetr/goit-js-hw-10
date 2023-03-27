const BASE_URL = 'https://restcountries.com/v3.1/name/';
const countriesInfo = 'field=name,capital,population,flags.svg,languages';

export function fetchCountries(name) 
{return  fetch(`${BASE_URL}${name}?${countriesInfo}`)
.then((res) => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}


