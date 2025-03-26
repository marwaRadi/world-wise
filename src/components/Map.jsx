import { useNavigate, useSearchParams } from "react-router";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useCities } from "../context/CitiesContext";
import { useEffect, useState } from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import Button from "./Button";
function Map() {
  const [mapPosition, setMapPosition] = useState([0, 40]);
  // context 
  const { cities } = useCities();
  // query search 
  const [searchParams] = useSearchParams();
  // geolocation custom hook
  const {
    currPosition,
    isLoading: isLoadingPosition,
    getCurrPosition,
  } = useGeoLocation();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  // useEffect hooks
  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );
  useEffect(
    function () {
      if (currPosition) setMapPosition(currPosition);
    },
    [currPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!currPosition && (
        <Button type={"position"} onClickBtn={getCurrPosition}>
          {isLoadingPosition ? "loading..." : "use your position"}
        </Button>
      )}
      <MapContainer
        style={{ height: `100%` }}
        center={mapPosition}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeMapView position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

export default Map;
function ChangeMapView({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
