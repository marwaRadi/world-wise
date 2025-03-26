import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../context/CitiesContext";
function CityList() {
  const { isLoading, cities } = useCities();
  console.log(cities)
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={" 👋Add your first city by clicking on a city on the map"}
      />
    );
  return (
    <>
      {!isLoading && (
        <ul className={styles.cityList}>
          {cities.map((city) => (
            <CityItem city={city} key={city.id} />
          ))}
        </ul>
      )}
    </>
  );
}

export default CityList;
