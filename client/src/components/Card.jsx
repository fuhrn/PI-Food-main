import React from "react";

export default function Card({img, name, diet}){
    return(
        <div>
            <img src={img} alt="not found" width="200px" height="200px" />
            <h2>{name}</h2>
            <p>{diet.map( d => <li key={d.name}>{d.name}</li>)}</p>
        </div>
    )
}