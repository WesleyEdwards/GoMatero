import GoogleMapReact from 'google-map-react';
export const Map = () => {


    return (
        <div style ={{ height: '100vh', width: '100%'}}>
            <GoogleMapReact
            bootstrapURLKeys={{key:""}}>
            </GoogleMapReact>
        </div>
    )
}