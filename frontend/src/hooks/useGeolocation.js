import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const handleSuccess = ({ coords }) => {
    const { latitude, longitude } = coords;
    setLocation({ latitude, longitude });
  };

  const handleError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    const watcher = geo.watchPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });

    return () => geo.clearWatch(watcher); // Clean up on unmount
  }, []);

  return { location, error };
};

export default useGeolocation;
