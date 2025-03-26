import { Outlet } from "react-router";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";
import Footer from "./Footer";

function SidBar() {
  return <div className={styles.sidebar}>
    <AppNav />
    <Outlet />
    <Footer/>

  </div>;
}

export default SidBar;
