import BackgroundEffect from './BackgroundEffect';
import styles from './InfoPanel.module.css';
import avatar from '/person-svgrepo-com.svg'

function InfoPanel({ center }) {
  console.log('center', center);
  return (
    <div className={styles.infoPanel}>
      <h1>Subject</h1>
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
        <p>0.0 km/h</p>
      </div>
      <div className={styles.activity}>
        <h3>Activity</h3>
        <p>Unknown</p>
      </div>
    </div>
  );
}

export default InfoPanel;
