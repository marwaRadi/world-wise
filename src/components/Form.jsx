// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router";
import { useFormatDate } from "../hooks/useFormatDate";
import useURLGeoLocation from "../hooks/useURLGeoLocation";
import Spinner from "./Spinner";
import Message from "./Message";
import {  useCities } from "../context/CitiesContext";


// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { createNewCity ,isLoading:isLoadingCities } = useCities();
  
  // console.log(
  //   Math.trunc(Date.now() * Math.random())
  //     .toString()
  //     .slice(6)
  // );
  // custom hooks
  const [date, setDate] = useFormatDate();
  const [lat, lng] = useURLGeoLocation();

 async function handleSubmitForm() {
    const createId = function () {
      return Math.trunc(Date.now() * Math.random())
        .toString()
        .slice(6);
    };
if(!cityName) return 
    const city = {
      cityName,
      country,
      notes,
      emoji,
      date,
      position: { lat, lng },
      id: +createId(),
    };
   console.log(city)
    // add a city to the cities'list
   await createNewCity(city)
    // dispatch({ type: 'addCity', payload: city })
    // turn back to the cities component
    navigate('/app/cities')
  }

  useEffect(
    
    function () {
      async function addNewCity() {
    
        try {
          if(!lat && !lng)return
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.city)
            throw new Error(
              "That doesn't seem to be a city . Click somewhere else  "
            );

          setCityName(data.city);
          setCountry(data.countryName);
          setEmoji(data.countryCode);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      addNewCity();
    },
    [lat, lng]
  );
  // loading spinner
  if (isLoading) return <Spinner />;
  // message error
  if (error) return <Message message={error} />;
  // message for position
  if(!lat && !lng) return <Message message='start by clicking somewhere on the map'/>
  return (
    <form
      className={`${styles.form} ${isLoadingCities? styles.loading :""}`}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitForm();
      }}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          type={"add"}
          onclick={() => {
            console.log("add");
          }}
        >
          Add
        </Button>
        <Button
          type={"back"}
          onClickBtn={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
