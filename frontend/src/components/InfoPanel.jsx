import styles from './InfoPanel.module.css';
import avatar from '/person-group-svgrepo-com.svg'

function InfoPanel({ center }) {
  console.log('center', center);
  return (
    <div className={styles.infoPanel}>
      <h1>Tracking</h1>
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
    </div>
  );
}

export default InfoPanel;
