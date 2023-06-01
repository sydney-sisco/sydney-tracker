import styles from './Footer.module.css';

function Footer({ isConnected }) {
  return (
    <footer className={styles.footer}>
      Tracker Status: {isConnected ? (
        <span className={styles.connected}>Connected</span>
      ) : (
        <span className={styles.disconnected}>Offline</span>
      )}
    </footer>
  );
}

export default Footer;
