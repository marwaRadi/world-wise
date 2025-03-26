import { createContext, useContext, useEffect, useReducer } from "react";
import supabase from "../services/supabase";
const CitiesContext = createContext();
const BASED_URL = `http://localhost:8000/`;
const initialValue = {
  cities: [],
  currentCity: {},
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };
    default:
      throw new Error("unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialValue
  );

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        // const res = await fetch(`${BASED_URL}cities`);
        // const data = await res.json();

        let { data: cities, error } = await supabase.from("cities").select("*");
        if (error) throw new Error(error);
        dispatch({ type: "cities/loaded", payload: cities });
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (id === currentCity.id) return;
    try {
      dispatch({ type: "loading" });
      // const res = await fetch(`${BASED_URL}cities/${id}`);
      // const data = await res.json();
      const { data, error } = await supabase
        .from("cities")
        .select("*")
        .eq("id", id)
        .single();
      if(error) throw new Error(error.message)
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      console.log(err.message);
    }
  }
  async function createNewCity(city) {
    try {
      dispatch({ type: "loading" });
      // const res = await fetch(`${BASED_URL}cities`, {
      //   method: "POST",
      //   body: JSON.stringify(city),
      //   headers: { "Content-Type": "application/json" },
      // });
      // const data = await res.json();

      const { data, error } = await supabase
        .from("cities")
        .insert(city)
        .select();
      if (error) throw new Error(`city cant be created ${error.message}`);
      dispatch({ type: "city/created", payload: data[0] });
    } catch (err) {
      console.log(err.message);
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      if (!id) throw new Error("Unknown id ");
      // await fetch(`${BASED_URL}cities/${id}`, {
      //   method: "DELETE",
      // });

      const { error } = await supabase.from("cities").delete().eq("id", id);
      if (error) throw new Error(error.message);
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createNewCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("citiesContext was used outside the CitiesProvider ");
  return context;
}
export { CitiesProvider, useCities };
