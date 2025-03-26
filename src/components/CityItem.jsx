import { Link } from "react-router";
import styles from "./CityItem.module.css";
import { useCities } from "../context/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { id, emoji, cityName, date, position } = city;
  const { lat, lng } = position;
  const { currentCity ,deleteCity } = useCities();
  function handleClick(e) {
    e.preventDefault();
    deleteCity(id)
  }
  return (
    <li>
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles[`cityItem--active`] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
