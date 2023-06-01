import styles from './Footer.module.css';

function Footer({ isConnected }) {

  isConnected = true;
  
  return (
    <footer className={styles.footer}>
      Tracker Status: {isConnected ? (
        <span className={styles.connected}>Connected</span>
      ) : (
        <span className={styles.disconnected}>Disconnected</span>
      )}
    </footer>
  );
}

export default Footer;
