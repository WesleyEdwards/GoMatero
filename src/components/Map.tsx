import {GoogleMap, useJsApiLoader, useGoogleMap} from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
import Pin from './Pin';
export const Map = () => {

    const { isLoaded } = useJsApiLoader({
        id: 'goMatero',
        googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY
    })
    const ex:MateSession = {
        id: "basdflkasjd",
        owner:"thisGuy",
        title:"Test",
        date: new Date(),
        description: "Example",
        attendedMembers: ["xd","xsdf"],
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.gCPac5sJedHpVMamZ49zFQHaE8%26pid%3DApi&f=1&ipt=9f46a32b5841041dfd9ef3c8c10625e0635f9bcef8260b05ee23cd1100b3f9a4&ipo=images",
        location: {lat:0, lng:0}
    }
    return ( isLoaded ? (
        <>
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
                        },
                        (err:GeolocationPositionError) => {
                            if (err.code == err.PERMISSION_DENIED) {
                                alert("Please Enable location to automatically pan the map to your position.");
                            }
                        }
                        )
                    }
                }}
            onUnmount={map => {
                // Do nothing for now
            }}></GoogleMap>
            <Pin {...ex}></Pin>
            </> ) : <></>
            
    )
}


export default Map;