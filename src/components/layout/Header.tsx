import Nav from "./Nav";
import Logo from "../../assets/logo.png";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

export default function Header() {

  return (
    <header className={styles.header}>
      <img className={styles.logo} src={Logo} />

      <nav className={styles.nav}>
        <Nav />
      </nav>

      <div className={styles.actions}>
        <NavLink to="/login" className={styles.login}>
          Login
        </NavLink>

        <NavLink to="/cart" className={styles.cart}>
          🛒
          <span className={styles.badge}>3</span>
        </NavLink>
      </div>

    </header>
  );
}


