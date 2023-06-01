import { useState, useEffect } from "react";
import { getUrlParameter } from '../utils/helpers'
import useGeolocation from '../hooks/useGeolocation'

const Location = () => {
  const trackMeQueryParam = getUrlParameter('trackme');
  const [shouldTrack, setShouldTrack] = useState(trackMeQueryParam === 'yes');
  const { location, error } = useGeolocation(shouldTrack);
  const [wakeLock, setWakeLock] = useState(null);

  async function requestWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        const newWakeLock = await navigator.wakeLock.request('screen');
        setWakeLock(newWakeLock);
        console.log('Screen wake lock acquired:', newWakeLock);
      } catch (err) {
        console.error(`Failed to acquire screen wake lock: ${err.name}`, err);
      }
    } else {
      console.error('Wake Lock API not supported.');
    }
  }

  async function releaseWakeLock() {
    if (wakeLock !== null) {
      try {
        await wakeLock.release();
        console.log('Screen wake lock released:', wakeLock);
        setWakeLock(null);
      } catch (err) {
        console.error(`Failed to release screen wake lock: ${err.name}`, err);
      }
    }
  }

  useEffect(() => {
    setShouldTrack(trackMeQueryParam === 'yes');
    if(trackMeQueryParam === 'yes') {
      requestWakeLock();
    }
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
      <p>Tracking: {shouldTrack ? 'Yes' : 'No'}</p>
      <p>Wake Lock: {wakeLock ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Location;
