// ACA FIJARSE BIEN PORQUE CAPAZ HAYA QUE CAMBIAR COMO SE MANDA LA DATA DE LAS INSTRUCCIONES
// DESDE EL FORMULARIO. EL TIPO DE DATO ES STRING, PERO DE LA API VIENE UN ARRAY CON OBJETOS

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { recipeDetail } from "../actions";

export default function RecipeDetail(){
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(recipeDetail(id));
    }, [dispatch]);

    const detailedRecipe = useSelector(state => state.detail)
    const [localR, setLocalR] = useState([]);
    useEffect(() =>{
        setLocalR(detailedRecipe)
    }, [detailedRecipe])
    
    
    return (
        <div>
            {
                detailedRecipe ?
                <div>
                    <h1>{detailedRecipe[0].name}</h1>
                    <img src={detailedRecipe[0].image} />
                    <h3>Puntuación: {detailedRecipe[0].score}</h3>
                    <h3>Nivel de comida saludable: {detailedRecipe[0].healthScore}</h3>
                    <h3>Paso a paso:</h3>

                    <h3>Resumen del plato:</h3><p dangerouslySetInnerHTML={{ __html: detailedRecipe[0].summary }}></p>
                    <h2>Tipos de dieta: {detailedRecipe[0].diets.map(d => d.name + ', ')}</h2>
                    
                </div> :
                <p>Loading...</p>
            }
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )
};

// para healthscore de la bdd
// validate:{
//     min:1,
//     max: 100
// }