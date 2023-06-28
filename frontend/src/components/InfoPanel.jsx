import { useState } from 'react';
import styles from './InfoPanel.module.css';
import avatar from '/person-svgrepo-com.svg'
import minimize from '/minimize-svgrepo-com.svg'

function InfoPanel({ center }) {
  const [isMinimized, setMinimized] = useState(false);

  console.log('center', center);
  return (
    <div className={`${styles.infoPanel} ${isMinimized ? styles.minimized : ''}`}>
      <div className={styles.infoHeader}>
        <h1>Subject</h1>
        <button className={styles.button} onClick={() => setMinimized(!isMinimized)}>
          <img src={minimize} alt="minimize" className={styles.minimize} />
        </button>
      </div>
      <div className={styles.avatar}>
        <div className={styles.avatarImage}>
          <img src={avatar} alt="avatar" />
        </div>
        <div className={styles.avatarText}>
          <h2>Sydney</h2>
        </div>
      </div>
      <div className={styles.location}>
        <h3>Location</h3>
        <p>{center.lat.toFixed(5)}, {center.lng.toFixed(5)}</p>
      </div>
      <div className={styles.speed}>
        <h3>Speed</h3>
        {center.speed ? <p>{center.speed} km/h</p> : <p>Unknown</p>}
      </div>
      <div className={styles.activity}>
        <h3>Activity</h3>
        <p>Unknown</p>
      </div>
    </div>
  );
}

export default InfoPanel;
