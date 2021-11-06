import React from "react";


export default function Paginate({recipesPerPage, recipes, paginate}) {
    
    const pageNum = [];
    for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {
        pageNum.push(i)
    }
    return (
        <nav>
            <ul>
                {
                    pageNum && pageNum.map( num => (
                        <li key={num}>
                            <button onClick={() => paginate(num)}>{num}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}