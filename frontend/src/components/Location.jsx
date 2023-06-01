import { useState, useEffect } from "react";

const Location = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  
  const watchPosition = () => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          console.log(position);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
        },
        (error) => {
          setError(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      return () => {
        // Stop watching the user's position when the component unmounts
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };
  
  useEffect(() => {
    const unsubscribe = watchPosition();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {location.latitude && location.longitude ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export {Location};


