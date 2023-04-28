import {
  GoogleMap,
  useJsApiLoader,
  useGoogleMap,
} from "@react-google-maps/api";
import { FC, useEffect, useState } from "react";
import { LatLng } from "../utils/models";
import { Spinner } from "./Spinner";
import { Alert } from "@mui/material";

type SelectLocationMapProps = {
  location: LatLng | undefined;
  setLocation: (pos: LatLng) => void;
};
export const SelectLocationMap: FC<SelectLocationMapProps> = (props) => {
  const { location, setLocation } = props;
  const [error, setError] = useState<string>();
  const { isLoaded } = useJsApiLoader({
    id: "goMatero",
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (location === undefined) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        (err) => setError("Please enable location detection.")
      );
    }
  });

  if (!isLoaded) return <Spinner />;
  if (!location) {
    return <Alert severity="error">{error ?? "error"}</Alert>;
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "500px",
        height: "500px",
      }}
      center={{ lat: 41.749837, lng: -111.83216 }}
      zoom={5}
      onLoad={(map) => {
        console.log(location);
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        map.panTo(location);
      }}
      onUnmount={(map) => {
        // Do nothing for now
      }}
    />
  );
};

export default SelectLocationMap;
