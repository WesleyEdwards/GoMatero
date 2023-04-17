import {GoogleMap, useJsApiLoader, useGoogleMap} from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
export const Map = () => {

    const { isLoaded } = useJsApiLoader({
        id: 'goMatero',
        googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY
    })

    return ( isLoaded ? (
        <GoogleMap
            mapContainerStyle={{width:'98vw',height:'90vh'}}
            center = {{lat:41.749837,lng:-111.832160}}
            zoom={10}
            onLoad={map => {
                const bounds = new window.google.maps.LatLngBounds();
                map.fitBounds(bounds);
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position: GeolocationPosition) => {
                            const pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            }; 
                            map.panTo(pos);
                        }
                    )
                }
            }}
            onUnmount={map => {
                // Do nothing for now
            }}></GoogleMap> ) : <></>
    )
}


export default Map;