import { useState, useEffect } from "react";
import { getUrlParameter } from '../utils/helpers'
import useGeolocation from '../hooks/useGeolocation'

const Location = () => {
  const trackMeQueryParam = getUrlParameter('trackme');
  const [shouldTrack, setShouldTrack] = useState(trackMeQueryParam === 'yes');
  const { location, error } = useGeolocation(shouldTrack);

  useEffect(() => {
    setShouldTrack(trackMeQueryParam === 'yes');
  }, [trackMeQueryParam]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!location) {
    return <div> </div>;
  }

  const { latitude, longitude } = location;
  return (
    <div>
      <h3>User Location</h3>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
    </div>
  );
};

export default Location;
