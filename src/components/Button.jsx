import styles from "./Button.module.css";

function Button({ children, type, onClickBtn }) {

  return (
    <button
      onClick={onClickBtn}
      className={`${styles.btn} ${type === "add" ? styles.primary : ""} ${
        type === "back" ? styles.back : ""
      }${type === "position" ? styles.position : ""}`}
    >
      {children}
    </button>
  );
}

export default Button;
