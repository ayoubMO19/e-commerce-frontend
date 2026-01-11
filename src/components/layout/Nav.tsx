import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

export default function Nav() {
  const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Productos", path: "/products" },
    { label: "Contacto", path: "/contact" },
    { label: "Privacidad", path: "/privacy" },
  ];

  return (
    <div className={styles.nav}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            isActive ? styles.active : styles.link
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}
