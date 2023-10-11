import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader, InfoBox } from '@react-google-maps/api';
import { Chip } from '@mui/material';

const containerStyle = {
  width: '100%',
  height: '650px'
};

function MyComponent({ locations,handleLocation }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD_6yH-KwGXniV7oQPVangfCjx-veNl3a0"
  });

  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          handleLocation({ lat: latitude, lng: longitude })
        },
        error => {
          console.error(error);
        }
      );
    }
  }, [isLoaded]);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation || { lat: 0, lng: 0 }}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {userLocation && <Marker position={userLocation} map={map} />}
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
          map={map}
          label={{
            text:( "LKR "+String(location.rate)), // Replace 'someValue' witr location object
            color: 'darkblue', 
            fontWeight: 'bold',
            fontSize: '25px', 
            backgroundColor: 'white', 
            padding: '8px',
            borderRadius: '50%'  
          }}
          onClick={() => {
            setSelectedLocation({ ...location, index });
          }}
        />
      ))}
      <>
      {selectedLocation && (
        <InfoBox
          position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          onCloseClick={() => {
            setSelectedLocation(null);
          }}
        >
          <div style={{ backgroundColor: 'white', padding: '10px' }}>
            <h2>{selectedLocation.name}</h2>
            <p>Phone: {selectedLocation.phone}</p>
            <p>Open Time: {selectedLocation.openTime}</p>
            <Chip sx={{ backgroundColor: 'lightgreen', fontSize: 15 }} label={`Rate: ${selectedLocation.rate}`} />
          </div>
        </InfoBox>
      )}
      </>
    </GoogleMap>
  ) : <></>;
}

export default React.memo(MyComponent);
