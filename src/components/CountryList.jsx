import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import { useCities } from "../context/CitiesContext";
function CountryList() {
  const {isLoading , cities} =useCities()
  const countries = cities.reduce((acc, curr) => {
    if (!acc.map((city) => city.country).includes(curr.country)) {
      return [
        ...acc,
        { country: curr.country, emoji: curr.emoji, id: curr.id },
      ];
    } else {
      return acc;
    }
  }, []);
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message />;
  return (
    <>
      {!isLoading && (
        <ul className={styles.countryList}>
          {countries.map((country) => (
            <CountryItem country={country} key={country.id} />
          ))}
        </ul>
      )}
    </>
  );
}

export default CountryList;
