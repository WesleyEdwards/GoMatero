import {GoogleMap, useJsApiLoader, useGoogleMap, OverlayView} from '@react-google-maps/api';
import { useCallback, useContext, useEffect, useState } from 'react';
import Pin from './Pin';
import { MateSession } from '../utils/models';
import { AuthContext } from '../context/AuthContext';
export const Map = () => {

    const [sessions, setSessions] = useState<MateSession[]>([]);
    const { api } = useContext(AuthContext);
    useEffect(()=>{
        api.myAttendedSessions()
        .then(sessions => setSessions(sessions))
    },[])

    const { isLoaded } = useJsApiLoader({
        id: 'goMatero',
        googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY
    })

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
            }}>{sessions.map((session)=>{
                return <OverlayView key={session.id} position={session.location} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}><Pin key={session.id} session={session} position={session.location}/></OverlayView>
            })}</GoogleMap>
            </> ) : <></>
            
    )
}


export default Map;