import countries from 'world-countries';
import { US } from 'country-flag-icons/react/3x2'
import { EC } from 'country-flag-icons/react/3x2'
import { KR } from 'country-flag-icons/react/3x2'


const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));


const useCountries = () => {


  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  }

  const getByFlag = (locale: string) => {
    //default flag
    let flag = EC
    if (locale === "es") flag = EC
    if (locale === "en") flag = US
    if (locale === "ko") flag = KR
    console.log('what is this', locale, 'finale', flag)
    return flag
  }

  return {
    getAll,
    getByValue,
    getByFlag
  }
};

export default useCountries;
