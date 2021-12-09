import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import styles from "./NavBar.module.css"

export default function NavBar() {
    return (
        <ul className={styles.menu}>
            <li><Link to='/home' className={styles.a}>Home</Link> </li>
            <li><Link to='/create' className={styles.a}>¡Crea tu propia receta!</Link> </li>
            <li><a href="https://www.linkedin.com/in/tomas-contreras-ba965113a/"
            target="_blank" rel="noreferrer" className={styles.a}>LinkedIn</a></li>
            <li> <a href="https://www.google.com"
            target="_blank" rel="noreferrer" className={styles.a}>About me</a></li>
            <li className={styles.slider}></li>
        </ul>
    )
}