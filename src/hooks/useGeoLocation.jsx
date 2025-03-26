import { useState } from "react";

function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [currPosition, setCurrPosition] = useState(null);

  function getCurrPosition() {
    if (!navigator.geolocation)
      throw new Error("Your browser does not support geolocation ");
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setCurrPosition([lat, lng]);
      setIsLoading(false);
    });
  }

  return { getCurrPosition, currPosition, isLoading };
}

export default useGeoLocation;
