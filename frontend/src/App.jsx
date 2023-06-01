import { useState, useEffect } from 'react'
import { ApiTest } from './components/ApiTest'
import { socket } from './utils/socket'
import { SocketTest } from './components/SocketTest'
import { ConnectionState } from './components/ConnectionState'
import futureLogo from '/future.svg'
// import './App.css'
import { MapComponent } from './components/MapComponent'
import Header from './components/Header'
import Footer from './components/Footer'
import styles from './App.module.css'
import BackgroundEffect from './components/BackgroundEffect'
import Location from './components/Location'

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
    <div className={styles.container}>
      <Header />
      {center ? <MapComponent center={center} /> :
        <BackgroundEffect />
      }

      {/* <MapComponent center={center} /> */}
      <Footer isConnected={center} />
      <Location />
    </div>
  );
}

export default App
