import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import btnStye from "../components/Button.module.css";
import { useAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
const navigate = useNavigate();
  const { login, authenticated } = useAuth()
  

  // handle functions
  function handleSubmit(e){
e.preventDefault()
    login(email, password)
    
  }
  useEffect(function () {
  if(authenticated) navigate("/app/cities",{replace:true});
},[authenticated,navigate])
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className={`${btnStye.btn} ${btnStye.primary}`} >Login</button>
        </div>
      </form>
    </main>
  );
}
