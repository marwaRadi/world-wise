import { NavLink } from "react-router";
import Logo from "./Logo";
import styles from "./AppNav.module.css";
function AppNav() {
  return (
    <>
  
      <Logo />
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="cities">cities</NavLink>
          </li>
          <li>
            <NavLink to="countries">counties</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default AppNav;
