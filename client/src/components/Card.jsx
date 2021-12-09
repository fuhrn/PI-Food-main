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
                        Ver detalles de la receta</Link>
                    </div>
                </div>
                <img src={img} alt="not found" width="300px" height="300px" className={styles.cardMedia} />
            </div>
            <div className={styles.cardShadow}></div>
        </div>
    )
}

{/* <div class="card-container">
    <div class="card u-clearfix">
        <div class="card-body">
            <h2 class="card-title">New Brunch Recipe</h2>
            <span class="card-description subtle">These last few weeks I have been working hard on a new brunch recipe for you all.</span>
            <div class="card-read">Read</div>
        </div>
        <img src="https://s15.postimg.cc/temvv7u4r/recipe.jpg" alt="" class="card-media" />
    </div>
    <div class="card-shadow"></div>
</div> */}
