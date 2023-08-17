import { useState, useEffect } from "react";
import { getUrlParameter } from '../utils/helpers'
import useGeolocation from '../hooks/useGeolocation'
import styles from './Location.module.css'
import ActivityComponent from "./ActivityComponent";

const trackMeQueryParam = getUrlParameter('trackme');

const Location = () => {
  
  const [shouldTrack, setShouldTrack] = useState(trackMeQueryParam === 'yes');
  const { location, error } = useGeolocation(shouldTrack);
  const [wakeLock, setWakeLock] = useState(null);
  const [errorWakeLock, setErrorWakeLock] = useState(null);

  async function requestWakeLock() {
    setErrorWakeLock('requestWakeLock')
    if ('wakeLock' in navigator) {
      try {
        const newWakeLock = await navigator.wakeLock.request('screen');
        setWakeLock(newWakeLock);
        setErrorWakeLock(null);
        console.log('Screen wake lock acquired:', newWakeLock);
      } catch (err) {
        setErrorWakeLock(err);
        console.error(`Failed to acquire screen wake lock: ${err.name}`, err);
      }
    } else {
      console.error('Wake Lock API not supported.');
      setErrorWakeLock('Wake Lock API not supported.');
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
    // Function to reacquire wake lock when the page is visible
    const handleVisibilityChange = async () => {
      setErrorWakeLock('handleVisibilityChange')
      if (document.visibilityState === 'visible') {
        setErrorWakeLock('requesting')
        await requestWakeLock();
      } else {
        setErrorWakeLock('requesting else')
        setWakeLock(null);
      }
    };

    // Event listener for visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up event listener
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    setShouldTrack(trackMeQueryParam === 'yes');
    if(trackMeQueryParam === 'yes') {
      setErrorWakeLock('query param yes')
      requestWakeLock();
    } else {
      setErrorWakeLock('query param no')
    }
  }, [trackMeQueryParam]);

  if (!shouldTrack) {
    return <div> </div>;
  }

  // const { latitude, longitude } = location;
  return (
    <div className={styles.locationContainer}>
      <div>
        <h3>User Location</h3>
        <p>Latitude: {location?.latitude}</p>
        <p>Longitude: {location?.longitude}</p>
        <p>Tracking: {shouldTrack ? 'Yes' : 'No'}</p>
        <p>Wake Lock: {wakeLock ? 'Yes' : 'No'}</p>
        <p>Wake Lock Error: {errorWakeLock}</p>
        {error && <p>Error: {error}</p>}
      </div>
      <ActivityComponent />
    </div>
  );
};

export default Location;
