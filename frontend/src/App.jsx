import { useState, useEffect } from 'react'
import { socket } from './utils/socket'
// import './App.css'
import { MapComponent } from './components/MapComponent'
import Header from './components/Header'
import Footer from './components/Footer'
import styles from './App.module.css'
import BackgroundEffect from './components/BackgroundEffect'
import Location from './components/Location'
import { LoadScript } from '@react-google-maps/api';


function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [center, setCenter] = useState({ 
    lat: Number(import.meta.env.VITE_CENTER_LAT),
    lng: Number(import.meta.env.VITE_CENTER_LNG),
  });

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onLocationUpdate(location) {

      console.log('location', location);

      if (!location) {
        setCenter(null);
        return;
      }

      setCenter({
        lat: Number(location.lat),
        lng: Number(location.lng),
      });
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('locationUpdate', onLocationUpdate);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('locationUpdate', onLocationUpdate);
    };
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className={styles.container}>
        <Header />
        {center ? <MapComponent center={center} /> : <BackgroundEffect />}
        <Footer isConnected={center} />
        <Location />
      </div>
    </LoadScript>
  );
}

export default App
