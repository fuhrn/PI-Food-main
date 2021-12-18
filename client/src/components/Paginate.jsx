import React from "react";
import styles from "./Paginate.module.css"


export default function Paginate({ recipesPerPage, recipes, paginate, currentPage }) {

    const pageNum = [];
    for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {
        pageNum.push(i)
    }
    return (
        <div className={styles.center}>
            <ul className={styles.pagination}>
                {
                    pageNum && pageNum.map(num => (
                        <li key={num}>
                            <button key={num} onClick={() => paginate(num)}
                                style={num === currentPage ? { backgroundColor: '#fd684d',color: 'white' ,border: '1px solid #777db8' } : {}}
                            >{num}</button>

                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
// return (
//     <nav className={styles.navContainer}>
//       <ul className={styles.navPages}>
//         {pageNumbers?.map(number => (
//           <li
//             style={number === currentPage ? {backgroundColor: '#3d4a57'} : {}}
//             key={number}>
//             <a onClick={() => paginated(number)}>{number}</a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   )