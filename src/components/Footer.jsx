import styles from "./Footer.module.css";
const date = new Date();
function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        © Copyright {date.getFullYear()} by WorldWise Inc
      </p>
    </footer>
  );
}

export default Footer;
