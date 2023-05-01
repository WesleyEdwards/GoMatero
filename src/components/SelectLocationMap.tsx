import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { FC, useEffect, useState } from "react";
import { LatLng } from "../utils/models";
import { Spinner } from "./Spinner";
import { Alert } from "@mui/material";

type SelectLocationMapProps = {
  location: LatLng | undefined;
  setLocation: (pos: LatLng) => void;
  width?: number;
};

export const SelectLocationMap: FC<SelectLocationMapProps> = (props) => {
  const { location, setLocation, width = 500 } = props;
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
  }, []);

  if (!isLoaded) return <Spinner />;
  if (!location) {
    return <Alert severity="error">{error ?? "error"}</Alert>;
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        width: `${width}px`,
        height: "500px",
      }}
      options={{
        disableDoubleClickZoom: true,
      }}
      zoom={5}
      onLoad={(map) => {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        map.panTo(location);
      }}
      onDblClick={(e) => {
        if (!e.latLng) return;
        setLocation({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        });
      }}
    >
      <MarkerF position={location} />
    </GoogleMap>
  );
};

export default SelectLocationMap;
