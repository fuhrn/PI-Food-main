import React from "react";

export default function Card({img, name, diet, id}){
    return(
        <div>
            <img src={img} alt="not found" />
            <h2>{name}</h2>
            {/* si mando array desde el back, seria solo "d" */}
            <p>{diet.map( d => <li key={d}>{d}</li>)}</p>
        </div>
    )
}