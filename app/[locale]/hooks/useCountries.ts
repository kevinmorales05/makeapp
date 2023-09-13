import { US } from 'country-flag-icons/react/3x2'
import { EC } from 'country-flag-icons/react/3x2'
import { KR } from 'country-flag-icons/react/3x2'
import { LOCALES} from '../constants/client_constants';

// const formattedCountries = countries.map((country) => ({
//   value: country.cca2,
//   label: country.name.common,
//   flag: country.flag,
//   latlng: country.latlng,
//   region: country.region,
// }));
const useCountries = () => {
  // const getAll = () => formattedCountries;
  // const getByValue = (value: string) => {
  //   return formattedCountries.find((item) => item.value === value);
  // }

  const getByFlag = (locale: string) => {
    let flag = EC
    if (locale === LOCALES.ES) flag = EC
    if (locale === LOCALES.EN) flag = US
    if (locale === LOCALES.KO) flag = KR
    return flag
  }

  return {
    // getAll,
    // getByValue,
    getByFlag
  }
};

export default useCountries;
