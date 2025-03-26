import SidBar from "../components/SidBar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map"
import User from "../components/User";
import { useEffect } from "react";
import { useAuth } from "../context/FakeAuthContext";
import { useNavigate, useNavigation } from "react-router";

function AppLayout() {
  const { authenticated } = useAuth()
const navigate= useNavigate()
  useEffect(function () {
    if(!authenticated) navigate('/')
  },[authenticated ,navigate])
  return (
    <div className={styles.app}>
      <SidBar />
      <Map />
      <User/>
    </div>
  );
}

export default AppLayout;
