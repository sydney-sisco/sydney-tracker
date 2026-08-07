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
  const [errorWakeLock, setErrorWakeLock] = useState('');

  // Track if the user explicitly requested the lock so we can safely reacquire it
  const [isWakeLockDesired, setIsWakeLockDesired] = useState(false);

  async function requestWakeLock() {
    setErrorWakeLock('requestWakeLock')
    if ('wakeLock' in navigator) {
      try {
        const newWakeLock = await navigator.wakeLock.request('screen');
        setWakeLock(newWakeLock);
        setIsWakeLockDesired(true);
        setErrorWakeLock(null);
        console.log('Screen wake lock acquired:', newWakeLock);
      } catch (err) {
        setErrorWakeLock(err.message || err.toString());
        console.error(`Failed to acquire screen wake lock: ${err.name}`, err);
      }
    } else {
      console.error('Wake Lock API not supported.');
      setErrorWakeLock('Wake Lock API not supported.');
    }
  }

  useEffect(() => {
    // Function to reacquire wake lock when the page becomes visible again
    const handleVisibilityChange = async () => {
      setErrorWakeLock('handleVisibilityChange')
      if (document.visibilityState === 'visible') {
        if (isWakeLockDesired) {
          await requestWakeLock();
        }
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
  }, [isWakeLockDesired]);

  if (!shouldTrack) {
    return <div> </div>;
  }

  return (
    <div className={styles.locationContainer}>
      <div>
        <h3>User Location</h3>
        <p>Latitude: {location?.latitude}</p>
        <p>Longitude: {location?.longitude}</p>
        <p>Tracking: {shouldTrack ? 'Yes' : 'No'}</p>
        <div style={{ margin: '10px 0' }}>
          <button
            onClick={requestWakeLock}
            disabled={!!wakeLock}
          >
            Request Wake Lock
          </button>
        </div>
        <p>Wake Lock: {wakeLock ? 'Yes' : 'No'}</p>
        <p>Wake Lock Error: {errorWakeLock}</p>
        {error && <p>Error: {error}</p>}


      </div>
      <ActivityComponent />
    </div>
  );
};

export default Location;
