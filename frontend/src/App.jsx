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
import {Location} from './components/Location'
import useGeolocation from './hooks/useGeolocation'

function App() {

  const { location, error } = useGeolocation();

  // const { latitude, longitude } = location;

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* <BackgroundEffect /> */}
      <Header />
      <MapComponent />
      <Footer />
      <Location />
    </div>
  );
}

export default App
