import React from "react";
import { Link } from "react-router-dom";
import styles from './Card.module.css'

export default function Card({ img, name, diet, id }) {
    return (
        <div className={styles.cardContainer}>
            <div className={`${styles.card} ${styles.uClearfix}`}>
                <div className={styles.cardBody}>
                    <h2 className={styles.cardTitle}>{name}</h2>
                    <ul className={`${styles.cardDescription} ${styles.subtle}`}>{diet.map(d => <li key={d.name}>{d.name}</li>)}</ul>
                    <div >
                        <Link to={'/recipe/' + id} className={styles.cardRead}>
                        See recipe details</Link>
                    </div>
                </div>
                <img src={img} alt="not found" width="300px" height="300px" className={styles.cardMedia} />
            </div>
            <div className={styles.cardShadow}></div>
        </div>
    )
}

