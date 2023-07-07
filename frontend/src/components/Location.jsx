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
    // Function to reacquire wake lock when the page is visible
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        await requestWakeLock();
      } else {
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
      requestWakeLock();
    }
  }, [trackMeQueryParam]);

  if (!location) {
    return <div> </div>;
  }

  const { latitude, longitude } = location;
  return (
    <div className={styles.locationContainer}>
      <div>
        <h3>User Location</h3>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
        <p>Tracking: {shouldTrack ? 'Yes' : 'No'}</p>
        <p>Wake Lock: {wakeLock ? 'Yes' : 'No'}</p>
        {error && <p>Error: {error}</p>}
      </div>
      <ActivityComponent />
    </div>
  );
};

export default Location;
